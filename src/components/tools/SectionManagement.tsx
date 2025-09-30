import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const mockSections = ["Section A", "Section B", "Section C"];

export const SectionManagement = () => {
  const [sections, setSections] = useState(mockSections);
  const [newSection, setNewSection] = useState("");

  const handleAddSection = () => {
    if (!newSection.trim()) {
      toast.error("Please enter a section name");
      return;
    }
    
    if (sections.includes(newSection)) {
      toast.error("Section already exists");
      return;
    }
    
    setSections([...sections, newSection]);
    setNewSection("");
    toast.success("Section added successfully!");
  };

  const handleDeleteSection = (section: string) => {
    setSections(sections.filter(s => s !== section));
    toast.success("Section removed");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Section</CardTitle>
          <CardDescription>Create a new class section</CardDescription>
        </CardHeader>
        <CardContent>
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
            <Button onClick={handleAddSection} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Sections</CardTitle>
          <CardDescription>{sections.length} sections available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {sections.map((section) => (
              <div
                key={section}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium">{section}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteSection(section)}
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
