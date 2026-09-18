import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "energize" | "outline" | "secondary" | "ghost" | "destructive" | "subtle";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variants = {
      default:
        "bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-750 text-white font-semibold hover:from-indigo-500 hover:to-blue-500 shadow-md shadow-indigo-500/25 active:scale-[0.98] border border-indigo-400/30",
      energize:
        "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-extrabold hover:from-amber-400 hover:via-orange-400 hover:to-rose-400 shadow-lg shadow-orange-500/30 active:scale-[0.98] border border-amber-300/60",
      outline:
        "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 shadow-xs active:scale-[0.98]",
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200/90 border border-slate-200 shadow-xs active:scale-[0.98]",
      ghost:
        "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
      destructive:
        "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 shadow-xs",
      subtle:
        "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-12 rounded-xl px-6 text-base font-semibold",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
