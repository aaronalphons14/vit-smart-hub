import { AlertOctagon } from "lucide-react";
import { EVButton } from "./ui/ev-button";
import { useCharger } from "@/context/ChargerContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function EmergencyStop() {
  const { triggerEmergencyStop, isEmergencyStop, chargingSession } = useCharger();

  // Only show when charging is active (timer is running)
  if (isEmergencyStop || !chargingSession?.isActive) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <EVButton
            variant="emergency"
            size="icon-lg"
            className="rounded-full shadow-2xl"
          >
            <AlertOctagon className="w-8 h-8" />
          </EVButton>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-card border-destructive">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-destructive flex items-center gap-2">
              <AlertOctagon className="w-6 h-6" />
              EMERGENCY STOP
            </AlertDialogTitle>
            <AlertDialogDescription className="text-foreground/80">
              This will immediately stop all charging sessions. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-display">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={triggerEmergencyStop}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-display"
            >
              CONFIRM EMERGENCY STOP
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
