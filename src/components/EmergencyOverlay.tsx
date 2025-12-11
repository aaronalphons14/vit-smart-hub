import { AlertOctagon } from "lucide-react";
import { EVButton } from "./ui/ev-button";
import { useCharger } from "@/context/ChargerContext";
import { useNavigate } from "react-router-dom";

export function EmergencyOverlay() {
  const { isEmergencyStop, resetEmergencyStop, logout } = useCharger();
  const navigate = useNavigate();

  if (!isEmergencyStop) return null;

  const handleReset = () => {
    resetEmergencyStop();
    logout();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="animate-emergency inline-block p-8 rounded-full bg-destructive/20 mb-8">
          <AlertOctagon className="w-24 h-24 text-destructive" />
        </div>
        
        <h1 className="font-display text-4xl md:text-6xl text-destructive mb-4 tracking-wider">
          EMERGENCY STOP
        </h1>
        
        <p className="text-xl text-foreground/80 mb-8 max-w-md mx-auto">
          All charging has been stopped immediately. Please ensure safety before resuming.
        </p>
        
        <EVButton
          variant="outline"
          size="xl"
          onClick={handleReset}
          className="border-destructive text-destructive hover:bg-destructive/10"
        >
          Reset System
        </EVButton>
      </div>
    </div>
  );
}
