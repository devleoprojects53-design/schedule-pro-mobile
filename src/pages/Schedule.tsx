import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, Plus } from "lucide-react";
import universityLogo from "@/assets/university-logo.png";
import { ScheduleGrid } from "@/components/schedule/ScheduleGrid";
import { AddScheduleDialog } from "@/components/schedule/AddScheduleDialog";

const Schedule = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data - will be replaced with Lovable Cloud data
  const sections = ["Section A", "Section B", "Section C"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <img src={universityLogo} alt="University Logo" className="h-10 w-10 object-contain" />
              <div>
                <h1 className="text-xl font-bold">Schedule Projection</h1>
                <p className="text-sm text-muted-foreground">Manage class schedules</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Weekly Schedule</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section} value={section}>
                        {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => setIsAddDialogOpen(true)} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Class
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            <ScheduleGrid />
          </CardContent>
        </Card>
      </main>

      <AddScheduleDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
};

export default Schedule;
