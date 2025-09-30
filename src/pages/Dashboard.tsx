import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, BookOpen, Settings, LogOut } from "lucide-react";
import universityLogo from "@/assets/university-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement Lovable Cloud logout
    navigate("/auth");
  };

  const menuItems = [
    {
      title: "Schedule Projection",
      description: "View and manage class schedules",
      icon: Calendar,
      onClick: () => navigate("/schedule"),
      color: "bg-primary",
    },
    {
      title: "Manage Teachers",
      description: "Add and edit teacher information",
      icon: Users,
      onClick: () => navigate("/tools"),
      color: "bg-secondary",
    },
    {
      title: "Manage Sections",
      description: "Configure class sections",
      icon: BookOpen,
      onClick: () => navigate("/tools"),
      color: "bg-accent",
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: Settings,
      onClick: () => navigate("/tools"),
      color: "bg-muted",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={universityLogo} alt="University Logo" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold">University of Baguio</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Select an option to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-strong transition-all cursor-pointer group"
              onClick={item.onClick}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`${item.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
