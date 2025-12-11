import { Zap } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-center gap-3 py-6">
      <div className="p-3 rounded-full bg-primary/20 glow-primary">
        <Zap className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h1 className="font-display text-2xl md:text-3xl tracking-wider text-gradient-electric">
          VIT SMART EV
        </h1>
        <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">
          CHARGER
        </p>
      </div>
    </header>
  );
}
