import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const evButtonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg font-display text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary",
        electric:
          "bg-gradient-electric text-primary-foreground hover:opacity-90 glow-primary animate-pulse-glow",
        charging:
          "bg-gradient-charging text-success-foreground hover:opacity-90 glow-success animate-charging",
        danger:
          "bg-gradient-danger text-destructive-foreground hover:opacity-90 glow-destructive",
        emergency:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 glow-destructive animate-emergency border-2 border-destructive-foreground/20",
        outline:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 glow-primary",
        ghost:
          "text-foreground hover:bg-secondary hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
        success:
          "bg-success text-success-foreground hover:bg-success/90 glow-success",
        warning:
          "bg-warning text-warning-foreground hover:bg-warning/90 glow-warning",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        xl: "h-16 px-10 py-5 text-lg",
        icon: "h-12 w-12",
        "icon-lg": "h-16 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface EVButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof evButtonVariants> {
  asChild?: boolean;
}

const EVButton = React.forwardRef<HTMLButtonElement, EVButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(evButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
EVButton.displayName = "EVButton";

export { EVButton, evButtonVariants };
