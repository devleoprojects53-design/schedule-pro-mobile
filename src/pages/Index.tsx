import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, BookOpen } from "lucide-react";
import universityLogo from "@/assets/university-logo.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <img src={universityLogo} alt="University Logo" className="h-32 w-32 object-contain animate-fade-in" />
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              University of Baguio
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Schedule Management System
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
            <div className="p-6 bg-card rounded-lg shadow-soft border border-border hover:shadow-strong transition-all">
              <Calendar className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Schedule Planning</h3>
              <p className="text-sm text-muted-foreground">
                Efficiently manage class schedules and time slots
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-lg shadow-soft border border-border hover:shadow-strong transition-all">
              <Users className="h-12 w-12 text-secondary mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Teacher Management</h3>
              <p className="text-sm text-muted-foreground">
                Organize teachers and their subject assignments
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-lg shadow-soft border border-border hover:shadow-strong transition-all">
              <BookOpen className="h-12 w-12 text-accent mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Section Organization</h3>
              <p className="text-sm text-muted-foreground">
                Configure and manage class sections seamlessly
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="mt-8 text-lg px-8"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
