
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, Pencil, Trash2 } from "lucide-react";

const INITIAL_STUDENTS_DATA = [
  { id: "STU001", name: "John Smith", email: "john.smith@college.edu", major: "Computer Science", gpa: 3.8, year: "Senior" },
  { id: "STU002", name: "Emma Johnson", email: "emma.j@college.edu", major: "Biology", gpa: 3.9, year: "Junior" },
  { id: "STU003", name: "Michael Brown", email: "m.brown@college.edu", major: "Engineering", gpa: 3.5, year: "Sophomore" },
  { id: "STU004", name: "Sophia Davis", email: "sophia.d@college.edu", major: "Psychology", gpa: 3.7, year: "Freshman" },
  { id: "STU005", name: "William Miller", email: "w.miller@college.edu", major: "Business", gpa: 3.2, year: "Senior" },
  { id: "STU006", name: "Olivia Wilson", email: "o.wilson@college.edu", major: "Art History", gpa: 3.6, year: "Junior" },
  { id: "STU007", name: "James Taylor", email: "j.taylor@college.edu", major: "Physics", gpa: 4.0, year: "Senior" },
  { id: "STU008", name: "Ava Anderson", email: "a.anderson@college.edu", major: "Chemistry", gpa: 3.4, year: "Sophomore" },
  { id: "STU009", name: "Benjamin Thomas", email: "b.thomas@college.edu", major: "Mathematics", gpa: 3.8, year: "Freshman" },
  { id: "STU010", name: "Charlotte White", email: "c.white@college.edu", major: "English", gpa: 3.5, year: "Senior" },
];

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [students, setStudents] = useState(INITIAL_STUDENTS_DATA);
  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    email: "",
    major: "",
    gpa: 0.0,
    year: ""
  });
  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    name: "",
    email: "",
    major: "",
    gpa: 0.0,
    year: ""
  });
  const { toast } = useToast();
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: name === 'gpa' ? parseFloat(value) : value
    });
  };
  
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedStudent({
      ...selectedStudent,
      [name]: name === 'gpa' ? parseFloat(value) : value
    });
  };

  const handleAddStudent = () => {
    // Add the new student to the students array
    setStudents([...students, newStudent]);
    
    // Show toast notification
    toast({
      title: "Student added",
      description: `${newStudent.name} has been added successfully.`,
    });
    
    setIsAddDialogOpen(false);
    // Reset form
    setNewStudent({
      id: "",
      name: "",
      email: "",
      major: "",
      gpa: 0.0,
      year: ""
    });
  };
  
  const handleEditStudent = () => {
    // Update the student in the students array
    const updatedStudents = students.map(student => 
      student.id === selectedStudent.id ? selectedStudent : student
    );
    
    setStudents(updatedStudents);
    
    toast({
      title: "Student updated",
      description: `${selectedStudent.name} has been updated successfully.`,
    });
    
    setIsEditDialogOpen(false);
  };

  const handleDeleteStudent = () => {
    // Remove the student from the students array
    const updatedStudents = students.filter(student => student.id !== selectedStudent.id);
    setStudents(updatedStudents);
    
    toast({
      title: "Student deleted",
      description: `${selectedStudent.name} has been removed successfully.`,
      variant: "destructive",
    });
    
    setIsDeleteDialogOpen(false);
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsDetailsDialogOpen(true);
  };

  const handleEditStudentClick = (student) => {
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteStudentClick = (student) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Students</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary">Add Student</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter the details for the new student. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  Student ID
                </Label>
                <Input
                  id="id"
                  name="id"
                  value={newStudent.id}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newStudent.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newStudent.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="major" className="text-right">
                  Major
                </Label>
                <Input
                  id="major"
                  name="major"
                  value={newStudent.major}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gpa" className="text-right">
                  GPA
                </Label>
                <Input
                  id="gpa"
                  name="gpa"
                  type="number"
                  step="0.1"
                  min="0"
                  max="4.0"
                  value={newStudent.gpa}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <Input
                  id="year"
                  name="year"
                  value={newStudent.year}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddStudent}>Save Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center py-4">
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update the details for the student. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-id" className="text-right">
                Student ID
              </Label>
              <Input
                id="edit-id"
                name="id"
                value={selectedStudent.id}
                onChange={handleEditInputChange}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={selectedStudent.name}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={selectedStudent.email}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-major" className="text-right">
                Major
              </Label>
              <Input
                id="edit-major"
                name="major"
                value={selectedStudent.major}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-gpa" className="text-right">
                GPA
              </Label>
              <Input
                id="edit-gpa"
                name="gpa"
                type="number"
                step="0.1"
                min="0"
                max="4.0"
                value={selectedStudent.gpa}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-year" className="text-right">
                Year
              </Label>
              <Input
                id="edit-year"
                name="year"
                value={selectedStudent.year}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditStudent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              {selectedStudent.name} - {selectedStudent.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Email</h4>
              <p>{selectedStudent.email}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Major</h4>
              <p>{selectedStudent.major}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">GPA</h4>
              <p>{selectedStudent.gpa}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Year</h4>
              <p>{selectedStudent.year}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the student
              record for {selectedStudent.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteStudent}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Major</TableHead>
              <TableHead>GPA</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  No students found.
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.major}</TableCell>
                  <TableCell>{student.gpa}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewDetails(student)}
                    >
                      <Eye className="mr-1 h-4 w-4" /> View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditStudentClick(student)}
                    >
                      <Pencil className="mr-1 h-4 w-4" /> Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteStudentClick(student)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="mr-1 h-4 w-4" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
