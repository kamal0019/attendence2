
import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, Pencil } from "lucide-react";

const INITIAL_COURSES_DATA = [
  { id: "CS101", title: "Introduction to Computer Science", department: "Computer Science", credits: 3, instructor: "Dr. Alan Turing", students: 45, schedule: "MWF 10:00-11:00" },
  { id: "BIO201", title: "Cell Biology", department: "Biology", credits: 4, instructor: "Dr. Jane Goodall", students: 32, schedule: "TR 13:00-14:30" },
  { id: "ENG110", title: "Creative Writing", department: "English", credits: 3, instructor: "Prof. J.K. Rolling", students: 28, schedule: "MW 15:00-16:30" },
  { id: "MATH240", title: "Linear Algebra", department: "Mathematics", credits: 4, instructor: "Dr. Katherine Johnson", students: 38, schedule: "MWF 9:00-10:00" },
  { id: "PHYS205", title: "Introduction to Quantum Mechanics", department: "Physics", credits: 4, instructor: "Dr. Richard Feynman", students: 25, schedule: "TR 10:30-12:00" },
  { id: "CHEM101", title: "General Chemistry", department: "Chemistry", credits: 4, instructor: "Dr. Marie Curie", students: 50, schedule: "MWF 13:00-14:00" },
  { id: "HIST150", title: "World History", department: "History", credits: 3, instructor: "Dr. Howard Zinn", students: 42, schedule: "TR 15:00-16:30" },
  { id: "PSYCH101", title: "Introduction to Psychology", department: "Psychology", credits: 3, instructor: "Dr. Sigmund Freud", students: 55, schedule: "MWF 11:00-12:00" },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [courses, setCourses] = useState(INITIAL_COURSES_DATA);
  const [newCourse, setNewCourse] = useState({
    id: "",
    title: "",
    department: "",
    credits: 3,
    instructor: "",
    students: 0,
    schedule: ""
  });
  const [selectedCourse, setSelectedCourse] = useState({
    id: "",
    title: "",
    department: "",
    credits: 3,
    instructor: "",
    students: 0,
    schedule: ""
  });
  const { toast } = useToast();
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: name === 'credits' || name === 'students' ? Number(value) : value
    });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedCourse({
      ...selectedCourse,
      [name]: name === 'credits' || name === 'students' ? Number(value) : value
    });
  };

  const handleAddCourse = () => {
    // Add the new course to the courses array
    setCourses([...courses, newCourse]);
    
    toast({
      title: "Course added",
      description: `${newCourse.title} has been added successfully.`,
    });
    
    setIsAddDialogOpen(false);
    // Reset form
    setNewCourse({
      id: "",
      title: "",
      department: "",
      credits: 3,
      instructor: "",
      students: 0,
      schedule: ""
    });
  };

  const handleEditCourse = () => {
    // Update the course in the courses array
    const updatedCourses = courses.map(course => 
      course.id === selectedCourse.id ? selectedCourse : course
    );
    
    setCourses(updatedCourses);
    
    toast({
      title: "Course updated",
      description: `${selectedCourse.title} has been updated successfully.`,
    });
    
    setIsEditDialogOpen(false);
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setIsDetailsDialogOpen(true);
  };

  const handleEditCourseClick = (course) => {
    setSelectedCourse(course);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary">Add Course</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Enter the details for the new course. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  Course ID
                </Label>
                <Input
                  id="id"
                  name="id"
                  value={newCourse.id}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={newCourse.title}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Input
                  id="department"
                  name="department"
                  value={newCourse.department}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="credits" className="text-right">
                  Credits
                </Label>
                <Input
                  id="credits"
                  name="credits"
                  type="number"
                  value={newCourse.credits}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="instructor" className="text-right">
                  Instructor
                </Label>
                <Input
                  id="instructor"
                  name="instructor"
                  value={newCourse.instructor}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="students" className="text-right">
                  Students
                </Label>
                <Input
                  id="students"
                  name="students"
                  type="number"
                  value={newCourse.students}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schedule" className="text-right">
                  Schedule
                </Label>
                <Input
                  id="schedule"
                  name="schedule"
                  value={newCourse.schedule}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddCourse}>Save Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Course Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
              <DialogDescription>
                Update the details for the course. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-id" className="text-right">
                  Course ID
                </Label>
                <Input
                  id="edit-id"
                  name="id"
                  value={selectedCourse.id}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  name="title"
                  value={selectedCourse.title}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right">
                  Department
                </Label>
                <Input
                  id="edit-department"
                  name="department"
                  value={selectedCourse.department}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-credits" className="text-right">
                  Credits
                </Label>
                <Input
                  id="edit-credits"
                  name="credits"
                  type="number"
                  value={selectedCourse.credits}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-instructor" className="text-right">
                  Instructor
                </Label>
                <Input
                  id="edit-instructor"
                  name="instructor"
                  value={selectedCourse.instructor}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-students" className="text-right">
                  Students
                </Label>
                <Input
                  id="edit-students"
                  name="students"
                  type="number"
                  value={selectedCourse.students}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-schedule" className="text-right">
                  Schedule
                </Label>
                <Input
                  id="edit-schedule"
                  name="schedule"
                  value={selectedCourse.schedule}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleEditCourse}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Course Details</DialogTitle>
              <DialogDescription>
                {selectedCourse.title} - {selectedCourse.id}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Department</h4>
                <p>{selectedCourse.department}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Credits</h4>
                <p>{selectedCourse.credits}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Instructor</h4>
                <p>{selectedCourse.instructor}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Students Enrolled</h4>
                <p>{selectedCourse.students}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Schedule</h4>
                <p>{selectedCourse.schedule}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center py-4">
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No courses found.
          </div>
        ) : (
          filteredCourses.map((course) => (
            <Card key={course.id} className="hover-scale">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>Course ID: {course.id}</CardDescription>
                  </div>
                  <div className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded-md font-medium">
                    {course.credits} Credits
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Department</span>
                    <span className="text-sm font-medium">{course.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Instructor</span>
                    <span className="text-sm font-medium">{course.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Students</span>
                    <span className="text-sm font-medium">{course.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Schedule</span>
                    <span className="text-sm font-medium">{course.schedule}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <div className="flex justify-end w-full gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewDetails(course)}
                  >
                    <Eye className="mr-1 h-4 w-4" /> Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditCourseClick(course)}
                  >
                    <Pencil className="mr-1 h-4 w-4" /> Edit
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
