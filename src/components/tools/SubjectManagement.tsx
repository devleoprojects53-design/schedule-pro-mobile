import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const GRADE_LEVELS = ["7", "8", "9", "10", "11", "12"];

type Subject = {
  id: number;
  name: string;
  gradeLevels: string[];
};

const mockSubjects: Subject[] = [
  { id: 1, name: "Mathematics", gradeLevels: ["7", "8", "9", "10", "11", "12"] },
  { id: 2, name: "Physics", gradeLevels: ["9", "10", "11", "12"] },
  { id: 3, name: "Chemistry", gradeLevels: ["9", "10", "11", "12"] },
  { id: 4, name: "English", gradeLevels: ["7", "8", "9", "10", "11", "12"] },
  { id: 5, name: "Computer Science", gradeLevels: ["9", "10", "11", "12"] },
];

export const SubjectManagement = () => {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [newSubject, setNewSubject] = useState("");
  const [newGradeLevels, setNewGradeLevels] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editName, setEditName] = useState("");
  const [editGradeLevels, setEditGradeLevels] = useState<string[]>([]);

  const handleAddSubject = () => {
    if (!newSubject.trim()) {
      toast.error("Please enter a subject name");
      return;
    }

    if (newGradeLevels.length === 0) {
      toast.error("Please select at least one grade level");
      return;
    }
    
    const newSubjectObj = {
      id: subjects.length + 1,
      name: newSubject,
      gradeLevels: newGradeLevels
    };
    
    setSubjects([...subjects, newSubjectObj]);
    setNewSubject("");
    setNewGradeLevels([]);
    toast.success("Subject added successfully!");
  };

  const handleDeleteSubject = (id: number) => {
    setSubjects(subjects.filter(s => s.id !== id));
    toast.success("Subject removed");
  };

  const handleEditClick = (subject: Subject) => {
    setEditingSubject(subject);
    setEditName(subject.name);
    setEditGradeLevels(subject.gradeLevels);
  };

  const handleSaveEdit = () => {
    if (!editingSubject) return;
    
    setSubjects(subjects.map(s => 
      s.id === editingSubject.id 
        ? { ...s, name: editName, gradeLevels: editGradeLevels }
        : s
    ));
    setEditingSubject(null);
    toast.success("Subject updated successfully!");
  };

  const toggleGradeLevel = (grade: string, isNew: boolean = false) => {
    if (isNew) {
      setNewGradeLevels(prev => 
        prev.includes(grade) 
          ? prev.filter(g => g !== grade)
          : [...prev, grade]
      );
    } else {
      setEditGradeLevels(prev => 
        prev.includes(grade) 
          ? prev.filter(g => g !== grade)
          : [...prev, grade]
      );
    }
  };

  const filteredSubjects = selectedGrade === "all" 
    ? subjects 
    : subjects.filter(s => s.gradeLevels.includes(selectedGrade));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Subject</CardTitle>
          <CardDescription>Create a subject and assign it to grade levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subjectName">Subject Name</Label>
              <Input
                id="subjectName"
                placeholder="Enter subject name (e.g., Advanced Mathematics)"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
            </div>
            <div>
              <Label>Grade Levels</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {GRADE_LEVELS.map(grade => (
                  <Button
                    key={grade}
                    type="button"
                    variant={newGradeLevels.includes(grade) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleGradeLevel(grade, true)}
                  >
                    Grade {grade}
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={handleAddSubject} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <CardTitle>Current Subjects</CardTitle>
              <CardDescription>{filteredSubjects.length} subjects {selectedGrade !== "all" && `for Grade ${selectedGrade}`}</CardDescription>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                className="flex flex-col gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{subject.name}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {subject.gradeLevels.map(grade => (
                        <Badge key={grade} variant="secondary" className="text-xs">
                          Grade {grade}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(subject)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSubject(subject.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingSubject} onOpenChange={() => setEditingSubject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription>Update subject name and grade levels</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-subject-name">Subject Name</Label>
              <Input
                id="edit-subject-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
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
                    onClick={() => toggleGradeLevel(grade, false)}
                  >
                    Grade {grade}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSubject(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
