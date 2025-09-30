import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Mock data
const mockTeachers = [
  { id: 1, name: "Dr. Smith", subjects: ["Mathematics", "Statistics"] },
  { id: 2, name: "Prof. Johnson", subjects: ["Physics", "Chemistry"] },
  { id: 3, name: "Ms. Davis", subjects: ["English", "Literature"] },
];

export const TeacherManagement = () => {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [newTeacherName, setNewTeacherName] = useState("");

  const handleAddTeacher = () => {
    if (!newTeacherName.trim()) {
      toast.error("Please enter a teacher name");
      return;
    }
    
    const newTeacher = {
      id: teachers.length + 1,
      name: newTeacherName,
      subjects: []
    };
    
    setTeachers([...teachers, newTeacher]);
    setNewTeacherName("");
    toast.success("Teacher added successfully!");
  };

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
    toast.success("Teacher removed");
  };

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
          <CardTitle>Current Teachers</CardTitle>
          <CardDescription>{teachers.length} teachers registered</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teachers.map((teacher) => (
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
                    {teacher.subjects.length === 0 && (
                      <span className="text-sm text-muted-foreground">No subjects assigned</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
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
    </div>
  );
};
