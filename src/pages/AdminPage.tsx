import { useState } from "react";
import { Header } from "@/components/Header";
import { EVButton } from "@/components/ui/ev-button";
import { ArrowLeft, Monitor, Settings, LogOut, Users, Clock, Battery } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AdminView = 'menu' | 'monitor' | 'settings';

export default function AdminPage() {
  const [view, setView] = useState<AdminView>('menu');
  const [editDurations, setEditDurations] = useState({ short: 30, medium: 60, long: 90 });
  const navigate = useNavigate();
  const { allSessions, durations, setDurations, logout } = useCharger();

  const handleSaveDurations = () => {
    setDurations(editDurations);
    toast.success("Durations updated successfully");
    setView('menu');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.info("Logged out successfully");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (view === 'monitor') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 px-6 pb-20 max-w-2xl mx-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl text-foreground flex items-center gap-2">
              <Monitor className="w-6 h-6 text-primary" />
              Active Sessions
            </h2>
            <EVButton variant="ghost" size="sm" onClick={() => setView('menu')}>
              <ArrowLeft className="w-4 h-4" />
              Back
            </EVButton>
          </div>

          {allSessions.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-block p-6 rounded-full bg-muted mb-4">
                <Users className="w-12 h-12 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No active charging sessions</p>
            </div>
          ) : (
            <div className="space-y-4">
              {allSessions.map((session, index) => (
                <div
                  key={session.userId}
                  className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                        <Battery className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="font-display text-foreground">{session.userId}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.duration} min session
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-display ${
                      session.isActive 
                        ? 'bg-success/20 text-success' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {session.isActive ? 'Charging' : 'Complete'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Time Remaining
                    </div>
                    <span className="font-display text-xl text-foreground">
                      {formatTime(session.remainingSeconds)}
                    </span>
                  </div>
                  
                  <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-charging rounded-full transition-all"
                      style={{ 
                        width: `${((session.duration * 60 - session.remainingSeconds) / (session.duration * 60)) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  if (view === 'settings') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 px-6 pb-20 max-w-md mx-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl text-foreground flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" />
              Duration Settings
            </h2>
            <EVButton variant="ghost" size="sm" onClick={() => setView('menu')}>
              <ArrowLeft className="w-4 h-4" />
              Back
            </EVButton>
          </div>

          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-lg bg-card border border-border">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="short" className="font-display text-sm text-muted-foreground mb-2 block">
                    Short Duration (minutes)
                  </Label>
                  <Input
                    id="short"
                    type="number"
                    value={editDurations.short}
                    onChange={(e) => setEditDurations({ ...editDurations, short: parseInt(e.target.value) || 0 })}
                    className="bg-secondary border-border font-display text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="medium" className="font-display text-sm text-muted-foreground mb-2 block">
                    Medium Duration (minutes)
                  </Label>
                  <Input
                    id="medium"
                    type="number"
                    value={editDurations.medium}
                    onChange={(e) => setEditDurations({ ...editDurations, medium: parseInt(e.target.value) || 0 })}
                    className="bg-secondary border-border font-display text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="long" className="font-display text-sm text-muted-foreground mb-2 block">
                    Long Duration (minutes)
                  </Label>
                  <Input
                    id="long"
                    type="number"
                    value={editDurations.long}
                    onChange={(e) => setEditDurations({ ...editDurations, long: parseInt(e.target.value) || 0 })}
                    className="bg-secondary border-border font-display text-lg"
                  />
                </div>
              </div>
            </div>
            
            <EVButton
              variant="electric"
              size="xl"
              onClick={handleSaveDurations}
              className="w-full"
            >
              Save Changes
            </EVButton>
          </div>
        </main>
      </div>
    );
  }

  // Admin menu
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/20 text-warning mb-4">
            <Settings className="w-4 h-4" />
            <span className="font-display text-sm">Admin Mode</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
            Administrator Panel
          </h2>
          <p className="text-muted-foreground text-sm">
            Monitor and configure the charging station
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <EVButton
            variant="outline"
            size="xl"
            onClick={() => setView('monitor')}
            className="w-full animate-fade-in"
          >
            <Monitor className="w-5 h-5" />
            Monitor Charging
          </EVButton>

          <EVButton
            variant="outline"
            size="xl"
            onClick={() => {
              setEditDurations(durations);
              setView('settings');
            }}
            className="w-full animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <Settings className="w-5 h-5" />
            Modify Durations
          </EVButton>

          <EVButton
            variant="ghost"
            size="xl"
            onClick={handleLogout}
            className="w-full animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <LogOut className="w-5 h-5" />
            Exit
          </EVButton>
        </div>
      </main>
    </div>
  );
}
