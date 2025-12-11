import { Header } from "@/components/Header";
import { EVButton } from "@/components/ui/ev-button";
import { ArrowLeft, Zap, Clock, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Fast Charging",
      description: "Efficient power delivery for quick turnaround"
    },
    {
      icon: Clock,
      title: "Flexible Duration",
      description: "Choose from 30, 60, or 90 minute sessions"
    },
    {
      icon: Shield,
      title: "Secure Access",
      description: "Personal codes ensure authorized usage only"
    },
    {
      icon: Users,
      title: "Admin Control",
      description: "Full monitoring and configuration options"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-6 pb-20 max-w-2xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
            About VIT Smart EV Charger
          </h2>
          <p className="text-muted-foreground">
            A modern EV charging solution designed for the VIT community, 
            providing reliable and eco-friendly charging infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <EVButton
            variant="outline"
            size="lg"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </EVButton>
        </div>
      </main>
    </div>
  );
}
