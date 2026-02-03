import { Header } from "@/components/Header";
import { EVButton } from "@/components/ui/ev-button";
import { LogIn, Info, Power } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Welcome
          </h2>
          <p className="text-muted-foreground max-w-md">
            Smart EV charging for VIT community. Fast, reliable, and eco-friendly.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <EVButton
            variant="electric"
            size="xl"
            onClick={() => navigate('/login')}
            className="w-full"
          >
            <LogIn className="w-5 h-5" />
            Login
          </EVButton>

          <EVButton
            variant="outline"
            size="xl"
            onClick={() => navigate('/about')}
            className="w-full"
          >
            <Info className="w-5 h-5" />
            About
          </EVButton>

          <EVButton
            variant="secondary"
            size="xl"
            onClick={() => window.close()}
            className="w-full"
          >
            <Power className="w-5 h-5" />
            Exit
          </EVButton>
        </div>
      </main>

      <footer className="text-center py-4 text-muted-foreground text-sm">
        © 2026 VIT Smart EV Charger
      </footer>
    </div>
  );
}
