import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const GRADE_LEVELS = ["7", "8", "9", "10", "11", "12"];

type Section = {
  id: number;
  name: string;
  gradeLevel: string;
};

const mockSections: Section[] = [
  { id: 1, name: "Section A", gradeLevel: "7" },
  { id: 2, name: "Section B", gradeLevel: "7" },
  { id: 3, name: "Section A", gradeLevel: "8" },
  { id: 4, name: "Section B", gradeLevel: "8" },
];

export const SectionManagement = () => {
  const [sections, setSections] = useState<Section[]>(mockSections);
  const [newSection, setNewSection] = useState("");
  const [newGradeLevel, setNewGradeLevel] = useState<string>("7");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editName, setEditName] = useState("");
  const [editGradeLevel, setEditGradeLevel] = useState("");

  const handleAddSection = () => {
    if (!newSection.trim()) {
      toast.error("Please enter a section name");
      return;
    }
    
    const newSectionObj = {
      id: sections.length + 1,
      name: newSection,
      gradeLevel: newGradeLevel
    };
    
    setSections([...sections, newSectionObj]);
    setNewSection("");
    toast.success("Section added successfully!");
  };

  const handleDeleteSection = (id: number) => {
    setSections(sections.filter(s => s.id !== id));
    toast.success("Section removed");
  };

  const handleEditClick = (section: Section) => {
    setEditingSection(section);
    setEditName(section.name);
    setEditGradeLevel(section.gradeLevel);
  };

  const handleSaveEdit = () => {
    if (!editingSection) return;
    
    setSections(sections.map(s => 
      s.id === editingSection.id 
        ? { ...s, name: editName, gradeLevel: editGradeLevel }
        : s
    ));
    setEditingSection(null);
    toast.success("Section updated successfully!");
  };

  const filteredSections = selectedGrade === "all" 
    ? sections 
    : sections.filter(s => s.gradeLevel === selectedGrade);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Section</CardTitle>
          <CardDescription>Create a new class section for a specific grade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Label htmlFor="sectionName" className="sr-only">Section Name</Label>
                <Input
                  id="sectionName"
                  placeholder="Enter section name (e.g., Section D)"
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                />
              </div>
              <Select value={newGradeLevel} onValueChange={setNewGradeLevel}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {GRADE_LEVELS.map(grade => (
                    <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddSection} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <CardTitle>Current Sections</CardTitle>
              <CardDescription>{filteredSections.length} sections {selectedGrade !== "all" && `for Grade ${selectedGrade}`}</CardDescription>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredSections.map((section) => (
              <div
                key={section.id}
                className="flex flex-col gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{section.name}</p>
                    <p className="text-sm text-muted-foreground">Grade {section.gradeLevel}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(section)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSection(section.id)}
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

      <Dialog open={!!editingSection} onOpenChange={() => setEditingSection(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>Update section name and grade level</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-section-name">Section Name</Label>
              <Input
                id="edit-section-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-grade">Grade Level</Label>
              <Select value={editGradeLevel} onValueChange={setEditGradeLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {GRADE_LEVELS.map(grade => (
                    <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSection(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
