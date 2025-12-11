import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { EVButton } from "@/components/ui/ev-button";
import { Keypad } from "@/components/ui/keypad";
import { Battery, Zap, StopCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCharger } from "@/context/ChargerContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ActiveChargingPage() {
  const [showStopConfirm, setShowStopConfirm] = useState(false);
  const [showCodeEntry, setShowCodeEntry] = useState(false);
  const [stopCode, setStopCode] = useState("");
  const navigate = useNavigate();
  const { chargingSession, stopCharging, logout } = useCharger();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (!chargingSession) return 0;
    const totalSeconds = chargingSession.duration * 60;
    return ((totalSeconds - chargingSession.remainingSeconds) / totalSeconds) * 100;
  };

  const handleStopRequest = () => {
    setShowStopConfirm(true);
  };

  const handleConfirmStop = () => {
    setShowStopConfirm(false);
    setShowCodeEntry(true);
  };

  const handleStopWithCode = () => {
    const success = stopCharging(stopCode);
    if (success) {
      toast.success("Charging stopped");
      setShowCodeEntry(false);
      logout();
      navigate('/');
    } else {
      toast.error("Invalid code");
      setStopCode("");
    }
  };

  // Handle charging complete
  useEffect(() => {
    if (chargingSession && !chargingSession.isActive && chargingSession.remainingSeconds === 0) {
      // Charging completed naturally
    }
  }, [chargingSession]);

  const handleComplete = () => {
    logout();
    navigate('/');
  };

  // If charging is complete
  if (chargingSession && !chargingSession.isActive && chargingSession.remainingSeconds === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          <div className="text-center animate-scale-in">
            <div className="inline-block p-8 rounded-full bg-success/20 mb-8 glow-success">
              <CheckCircle2 className="w-24 h-24 text-success" />
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl text-success mb-4">
              CHARGE COMPLETE
            </h2>
            
            <p className="text-muted-foreground mb-8">
              Your vehicle has been fully charged. Thank you for using VIT Smart EV Charger.
            </p>
            
            <EVButton
              variant="success"
              size="xl"
              onClick={handleComplete}
            >
              Done
            </EVButton>
          </div>
        </main>
      </div>
    );
  }

  // Active charging view
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="text-center animate-fade-in">
          <div className="inline-block p-6 rounded-full bg-success/20 mb-6 animate-charging">
            <Zap className="w-16 h-16 text-success" />
          </div>
          
          <h2 className="font-display text-2xl text-success mb-2 tracking-wider">
            CHARGING IN PROGRESS
          </h2>
          
          {/* Timer */}
          <div className="font-display text-6xl md:text-7xl text-foreground my-8">
            {formatTime(chargingSession?.remainingSeconds ?? 0)}
          </div>
          
          {/* Progress bar */}
          <div className="w-full max-w-xs mx-auto mb-8">
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-charging transition-all duration-1000 rounded-full"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {Math.round(getProgress())}% Complete
            </p>
          </div>
          
          {/* Session info */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
              <Battery className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">
                {chargingSession?.duration} min session
              </span>
            </div>
          </div>
          
          {/* Stop button */}
          <EVButton
            variant="danger"
            size="xl"
            onClick={handleStopRequest}
          >
            <StopCircle className="w-5 h-5" />
            Stop Charging
          </EVButton>
        </div>
      </main>

      {/* Stop confirmation dialog */}
      <AlertDialog open={showStopConfirm} onOpenChange={setShowStopConfirm}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Stop Charging?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to stop charging before the session is complete?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-display">No</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmStop}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-display"
            >
              Yes, Stop
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Code entry dialog */}
      <Dialog open={showCodeEntry} onOpenChange={setShowCodeEntry}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-center">
              Confirm Stop
            </DialogTitle>
            <DialogDescription className="text-center">
              Enter your code to stop charging
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center pt-4">
            <Keypad
              value={stopCode}
              onChange={setStopCode}
              onSubmit={handleStopWithCode}
              maxLength={4}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
