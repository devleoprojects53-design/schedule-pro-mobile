import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const mockSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "English",
  "Literature",
  "History",
  "Biology",
  "Computer Science"
];

export const SubjectManagement = () => {
  const [subjects, setSubjects] = useState(mockSubjects);
  const [newSubject, setNewSubject] = useState("");

  const handleAddSubject = () => {
    if (!newSubject.trim()) {
      toast.error("Please enter a subject name");
      return;
    }
    
    if (subjects.includes(newSubject)) {
      toast.error("Subject already exists");
      return;
    }
    
    setSubjects([...subjects, newSubject]);
    setNewSubject("");
    toast.success("Subject added successfully!");
  };

  const handleDeleteSubject = (subject: string) => {
    setSubjects(subjects.filter(s => s !== subject));
    toast.success("Subject removed");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Subject</CardTitle>
          <CardDescription>Create a new subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label htmlFor="subjectName" className="sr-only">Subject Name</Label>
              <Input
                id="subjectName"
                placeholder="Enter subject name"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
            </div>
            <Button onClick={handleAddSubject} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Subjects</CardTitle>
          <CardDescription>{subjects.length} subjects available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {subjects.map((subject) => (
              <div
                key={subject}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-sm">{subject}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteSubject(subject)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
