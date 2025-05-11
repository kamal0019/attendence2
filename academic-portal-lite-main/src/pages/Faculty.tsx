
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
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, Pencil } from "lucide-react";

const FACULTY_DATA = [
  { id: "FAC001", name: "Dr. Alan Turing", email: "a.turing@college.edu", department: "Computer Science", position: "Professor", joinDate: "2018-09-01", courses: 3 },
  { id: "FAC002", name: "Dr. Jane Goodall", email: "j.goodall@college.edu", department: "Biology", position: "Associate Professor", joinDate: "2017-08-15", courses: 2 },
  { id: "FAC003", name: "Prof. J.K. Rolling", email: "j.rolling@college.edu", department: "English", position: "Assistant Professor", joinDate: "2020-01-10", courses: 2 },
  { id: "FAC004", name: "Dr. Katherine Johnson", email: "k.johnson@college.edu", department: "Mathematics", position: "Professor", joinDate: "2015-09-01", courses: 3 },
  { id: "FAC005", name: "Dr. Richard Feynman", email: "r.feynman@college.edu", department: "Physics", position: "Professor", joinDate: "2016-09-01", courses: 2 },
  { id: "FAC006", name: "Dr. Marie Curie", email: "m.curie@college.edu", department: "Chemistry", position: "Professor", joinDate: "2014-09-01", courses: 3 },
  { id: "FAC007", name: "Dr. Howard Zinn", email: "h.zinn@college.edu", department: "History", position: "Associate Professor", joinDate: "2019-09-01", courses: 2 },
  { id: "FAC008", name: "Dr. Sigmund Freud", email: "s.freud@college.edu", department: "Psychology", position: "Professor", joinDate: "2017-09-01", courses: 2 },
];

export default function Faculty() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"table" | "grid">("table");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [faculty, setFaculty] = useState(FACULTY_DATA);
  const [newFaculty, setNewFaculty] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    position: "",
    joinDate: "",
    courses: 0
  });
  const [selectedFaculty, setSelectedFaculty] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    position: "",
    joinDate: "",
    courses: 0
  });
  const { toast } = useToast();
  
  const filteredFaculty = faculty.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFaculty({
      ...newFaculty,
      [name]: name === 'courses' ? parseInt(value) : value
    });
  };
  
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedFaculty({
      ...selectedFaculty,
      [name]: name === 'courses' ? parseInt(value) : value
    });
  };

  const handleAddFaculty = () => {
    // Add the new faculty to the faculty array
    setFaculty([...faculty, newFaculty]);
    
    toast({
      title: "Faculty added",
      description: `${newFaculty.name} has been added successfully.`,
    });
    
    setIsAddDialogOpen(false);
    // Reset form
    setNewFaculty({
      id: "",
      name: "",
      email: "",
      department: "",
      position: "",
      joinDate: "",
      courses: 0
    });
  };
  
  const handleEditFaculty = () => {
    // Update the faculty in the faculty array
    const updatedFaculty = faculty.map(member => 
      member.id === selectedFaculty.id ? selectedFaculty : member
    );
    
    setFaculty(updatedFaculty);
    
    toast({
      title: "Faculty updated",
      description: `${selectedFaculty.name} has been updated successfully.`,
    });
    
    setIsEditDialogOpen(false);
  };

  const handleViewDetails = (member) => {
    setSelectedFaculty(member);
    setIsDetailsDialogOpen(true);
  };

  const handleEditFacultyClick = (member) => {
    setSelectedFaculty(member);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Faculty</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary">Add Faculty</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Faculty</DialogTitle>
              <DialogDescription>
                Enter the details for the new faculty member. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  Faculty ID
                </Label>
                <Input
                  id="id"
                  name="id"
                  value={newFaculty.id}
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
                  value={newFaculty.name}
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
                  value={newFaculty.email}
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
                  value={newFaculty.department}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <Input
                  id="position"
                  name="position"
                  value={newFaculty.position}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="joinDate" className="text-right">
                  Join Date
                </Label>
                <Input
                  id="joinDate"
                  name="joinDate"
                  type="date"
                  value={newFaculty.joinDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="courses" className="text-right">
                  Courses
                </Label>
                <Input
                  id="courses"
                  name="courses"
                  type="number"
                  min="0"
                  value={newFaculty.courses}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddFaculty}>Save Faculty</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search faculty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Button 
            variant={view === "table" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setView("table")}
          >
            Table
          </Button>
          <Button 
            variant={view === "grid" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setView("grid")}
          >
            Grid
          </Button>
        </div>
      </div>
      
      {/* Edit Faculty Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Faculty</DialogTitle>
            <DialogDescription>
              Update the details for the faculty member. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-id" className="text-right">
                Faculty ID
              </Label>
              <Input
                id="edit-id"
                name="id"
                value={selectedFaculty.id}
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
                value={selectedFaculty.name}
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
                value={selectedFaculty.email}
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
                value={selectedFaculty.department}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-position" className="text-right">
                Position
              </Label>
              <Input
                id="edit-position"
                name="position"
                value={selectedFaculty.position}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-joinDate" className="text-right">
                Join Date
              </Label>
              <Input
                id="edit-joinDate"
                name="joinDate"
                type="date"
                value={selectedFaculty.joinDate}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-courses" className="text-right">
                Courses
              </Label>
              <Input
                id="edit-courses"
                name="courses"
                type="number"
                min="0"
                value={selectedFaculty.courses}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditFaculty}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Faculty Details</DialogTitle>
            <DialogDescription>
              {selectedFaculty.name} - {selectedFaculty.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Email</h4>
              <p>{selectedFaculty.email}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Department</h4>
              <p>{selectedFaculty.department}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Position</h4>
              <p>{selectedFaculty.position}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Join Date</h4>
              <p>{selectedFaculty.joinDate}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Courses</h4>
              <p>{selectedFaculty.courses}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {view === "table" ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    No faculty members found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredFaculty.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.id}</TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>{member.position}</TableCell>
                    <TableCell>{member.courses}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(member)}
                      >
                        <Eye className="mr-1 h-4 w-4" /> View
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditFacultyClick(member)}
                      >
                        <Pencil className="mr-1 h-4 w-4" /> Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFaculty.length === 0 ? (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              No faculty members found.
            </div>
          ) : (
            filteredFaculty.map((member) => (
              <Card key={member.id} className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-2xl font-bold">{member.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-muted-foreground">{member.position}</p>
                    </div>
                    <div className="w-full pt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Department</span>
                        <span className="text-sm font-medium">{member.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Email</span>
                        <span className="text-sm">{member.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Courses</span>
                        <span className="text-sm font-medium">{member.courses}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(member)}
                      >
                        <Eye className="mr-1 h-4 w-4" /> Profile
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditFacultyClick(member)}
                      >
                        <Pencil className="mr-1 h-4 w-4" /> Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
