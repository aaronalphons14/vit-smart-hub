import { useState } from "react";
import { Header } from "@/components/Header";
import { EVButton } from "@/components/ui/ev-button";
import { Keypad } from "@/components/ui/keypad";
import { ArrowLeft, Battery, Clock, LogOut } from "lucide-react";
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

export default function ChargingMenuPage() {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const navigate = useNavigate();
  const { durations, currentUser, startCharging, logout, userCodes, adminCode } = useCharger();

  const durationOptions = [
    { key: 'short', label: `${durations.short} min`, value: durations.short },
    { key: 'medium', label: `${durations.medium} min`, value: durations.medium },
    { key: 'long', label: `${durations.long} min`, value: durations.long },
  ];

  const handleSelectDuration = (duration: number) => {
    setSelectedDuration(duration);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    const isValid = confirmCode === adminCode || userCodes.includes(confirmCode);
    
    if (isValid && selectedDuration && currentUser) {
      startCharging(selectedDuration, currentUser);
      toast.success("Charging started!");
      navigate('/charging/active');
    } else {
      toast.error("Invalid code");
      setConfirmCode("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.info("Logged out successfully");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-4">
            <Battery className="w-4 h-4" />
            <span className="font-display text-sm">User: {currentUser}</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
            Select Charging Duration
          </h2>
          <p className="text-muted-foreground text-sm">
            Choose how long you want to charge
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs mb-10">
          {durationOptions.map((option, index) => (
            <EVButton
              key={option.key}
              variant="outline"
              size="xl"
              onClick={() => handleSelectDuration(option.value)}
              className="w-full animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Clock className="w-5 h-5" />
              {option.label}
            </EVButton>
          ))}
        </div>

        <EVButton
          variant="ghost"
          size="lg"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </EVButton>
      </main>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-center">
              Confirm Charging
            </DialogTitle>
            <DialogDescription className="text-center">
              Re-enter your code to start {selectedDuration} minutes of charging
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center pt-4">
            <Keypad
              value={confirmCode}
              onChange={setConfirmCode}
              onSubmit={handleConfirm}
              maxLength={4}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
