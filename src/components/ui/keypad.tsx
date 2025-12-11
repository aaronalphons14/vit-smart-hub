import * as React from "react";
import { cn } from "@/lib/utils";
import { EVButton } from "./ev-button";
import { Delete, Check } from "lucide-react";

interface KeypadProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  maxLength?: number;
  className?: string;
}

export function Keypad({ value, onChange, onSubmit, maxLength = 4, className }: KeypadProps) {
  const handleKeyPress = (key: string) => {
    if (value.length < maxLength) {
      onChange(value + key);
    }
  };

  const handleDelete = () => {
    onChange(value.slice(0, -1));
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Display */}
      <div className="flex items-center justify-center gap-3 mb-2">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-4 h-4 rounded-full border-2 transition-all duration-200",
              i < value.length
                ? "bg-primary border-primary glow-primary"
                : "border-muted-foreground/50 bg-transparent"
            )}
          />
        ))}
      </div>

      {/* Keypad grid */}
      <div className="grid grid-cols-3 gap-3">
        {keys.map((key) => (
          <EVButton
            key={key}
            variant="secondary"
            size="xl"
            onClick={() => handleKeyPress(key)}
            className="w-16 h-16 text-xl"
          >
            {key}
          </EVButton>
        ))}
        
        {/* Bottom row */}
        <EVButton
          variant="danger"
          size="xl"
          onClick={handleDelete}
          className="w-16 h-16"
        >
          <Delete className="w-6 h-6" />
        </EVButton>
        
        <EVButton
          variant="secondary"
          size="xl"
          onClick={() => handleKeyPress('0')}
          className="w-16 h-16 text-xl"
        >
          0
        </EVButton>
        
        <EVButton
          variant="electric"
          size="xl"
          onClick={onSubmit}
          disabled={value.length < maxLength}
          className="w-16 h-16"
        >
          <Check className="w-6 h-6" />
        </EVButton>
      </div>
    </div>
  );
}
