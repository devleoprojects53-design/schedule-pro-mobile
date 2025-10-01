import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import universityLogo from "@/assets/university-logo.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-2xl opacity-50"></div>
              <img src={universityLogo} alt="University Logo" className="h-32 w-32 object-contain relative z-10 animate-fade-in drop-shadow-2xl" />
            </div>
          </div>
          
          <div className="space-y-4 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Modern Schedule Management</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text leading-tight">
              University of Baguio
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Schedule Management System
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
            <div className="p-8 bg-card/95 backdrop-blur-sm rounded-xl shadow-soft border-2 border-border hover-lift group animate-fade-in transition-all">
              <div className="relative w-fit mx-auto mb-4">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl"></div>
                <div className="relative bg-primary/10 p-3 rounded-lg">
                  <Calendar className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">Schedule Planning</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Efficiently manage class schedules and time slots with our intuitive interface
              </p>
            </div>
            
            <div className="p-8 bg-card/95 backdrop-blur-sm rounded-xl shadow-soft border-2 border-border hover-lift group animate-fade-in transition-all" style={{ animationDelay: '0.1s' }}>
              <div className="relative w-fit mx-auto mb-4">
                <div className="absolute inset-0 bg-secondary/20 rounded-lg blur-xl"></div>
                <div className="relative bg-secondary/10 p-3 rounded-lg">
                  <Users className="h-12 w-12 text-secondary" />
                </div>
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">Teacher Management</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Organize teachers and their subject assignments seamlessly
              </p>
            </div>
            
            <div className="p-8 bg-card/95 backdrop-blur-sm rounded-xl shadow-soft border-2 border-border hover-lift group animate-fade-in transition-all" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-fit mx-auto mb-4">
                <div className="absolute inset-0 bg-accent/20 rounded-lg blur-xl"></div>
                <div className="relative bg-accent/10 p-3 rounded-lg">
                  <BookOpen className="h-12 w-12 text-accent" />
                </div>
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">Section Organization</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Configure and manage class sections with powerful tools
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="mt-8 text-lg px-8 bg-gradient-to-r from-primary via-secondary to-accent hover:scale-105 transition-all shadow-2xl group animate-scale-in"
            onClick={() => navigate("/auth")}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
