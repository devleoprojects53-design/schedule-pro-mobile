import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import universityLogo from "@/assets/university-logo.png";
import { TeacherManagement } from "@/components/tools/TeacherManagement";
import { SectionManagement } from "@/components/tools/SectionManagement";
import { SubjectManagement } from "@/components/tools/SubjectManagement";

const Tools = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src={universityLogo} alt="University Logo" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold">Admin Tools</h1>
              <p className="text-sm text-muted-foreground">Manage system resources</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>System Management</CardTitle>
            <CardDescription>Configure teachers, sections, and subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="teachers" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="teachers">Teachers</TabsTrigger>
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
              </TabsList>
              
              <TabsContent value="teachers" className="mt-6">
                <TeacherManagement />
              </TabsContent>
              
              <TabsContent value="sections" className="mt-6">
                <SectionManagement />
              </TabsContent>
              
              <TabsContent value="subjects" className="mt-6">
                <SubjectManagement />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Tools;
