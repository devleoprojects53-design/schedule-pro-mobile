import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const GRADE_LEVELS = ["7", "8", "9", "10", "11", "12"];

// Mock data
const mockTeachers = [
  { id: 1, name: "Dr. Smith", subjects: ["Mathematics"], gradeLevels: ["9", "10"] },
  { id: 2, name: "Prof. Johnson", subjects: ["Physics"], gradeLevels: ["11", "12"] },
  { id: 3, name: "Ms. Davis", subjects: ["English"], gradeLevels: ["7", "8"] },
];

type Teacher = {
  id: number;
  name: string;
  subjects: string[];
  gradeLevels: string[];
};

export const TeacherManagement = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [newTeacherName, setNewTeacherName] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editName, setEditName] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editGradeLevels, setEditGradeLevels] = useState<string[]>([]);

  const handleAddTeacher = () => {
    if (!newTeacherName.trim()) {
      toast.error("Please enter a teacher name");
      return;
    }
    
    const newTeacher = {
      id: teachers.length + 1,
      name: newTeacherName,
      subjects: [],
      gradeLevels: []
    };
    
    setTeachers([...teachers, newTeacher]);
    setNewTeacherName("");
    toast.success("Teacher added successfully!");
  };

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
    toast.success("Teacher removed");
  };

  const handleEditClick = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setEditName(teacher.name);
    setEditSubject(teacher.subjects[0] || "");
    setEditGradeLevels(teacher.gradeLevels);
  };

  const handleSaveEdit = () => {
    if (!editingTeacher) return;
    
    setTeachers(teachers.map(t => 
      t.id === editingTeacher.id 
        ? { ...t, name: editName, subjects: editSubject ? [editSubject] : [], gradeLevels: editGradeLevels }
        : t
    ));
    setEditingTeacher(null);
    toast.success("Teacher updated successfully!");
  };

  const toggleGradeLevel = (grade: string) => {
    setEditGradeLevels(prev => 
      prev.includes(grade) 
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const filteredTeachers = selectedGrade === "all" 
    ? teachers 
    : teachers.filter(t => t.gradeLevels.includes(selectedGrade));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Teacher</CardTitle>
          <CardDescription>Enter teacher information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label htmlFor="teacherName" className="sr-only">Teacher Name</Label>
              <Input
                id="teacherName"
                placeholder="Enter teacher name"
                value={newTeacherName}
                onChange={(e) => setNewTeacherName(e.target.value)}
              />
            </div>
            <Button onClick={handleAddTeacher} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Teacher
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <CardTitle>Current Teachers</CardTitle>
              <CardDescription>{filteredTeachers.length} teachers {selectedGrade !== "all" && `for Grade ${selectedGrade}`}</CardDescription>
            </div>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {GRADE_LEVELS.map(grade => (
                  <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-3"
              >
                <div className="flex-1">
                  <h4 className="font-semibold">{teacher.name}</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {teacher.subjects.map((subject, idx) => (
                      <Badge key={idx} variant="secondary">{subject}</Badge>
                    ))}
                    {teacher.gradeLevels.map((grade) => (
                      <Badge key={grade} variant="outline">Grade {grade}</Badge>
                    ))}
                    {teacher.subjects.length === 0 && (
                      <span className="text-sm text-muted-foreground">No subjects assigned</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(teacher)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTeacher(teacher.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingTeacher} onOpenChange={() => setEditingTeacher(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>Update teacher information, subject, and grade levels</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Teacher Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-subject">Subject</Label>
              <Input
                id="edit-subject"
                value={editSubject}
                onChange={(e) => setEditSubject(e.target.value)}
                placeholder="e.g., Mathematics"
              />
            </div>
            <div className="space-y-2">
              <Label>Grade Levels</Label>
              <div className="flex flex-wrap gap-2">
                {GRADE_LEVELS.map(grade => (
                  <Button
                    key={grade}
                    type="button"
                    variant={editGradeLevels.includes(grade) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleGradeLevel(grade)}
                  >
                    Grade {grade}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTeacher(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
