import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "low" | "medium" | "high" | "success" | "warning";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs",
    secondary:
      "bg-slate-100 text-slate-700 border border-slate-200 shadow-xs",
    outline:
      "text-slate-700 border border-slate-300 bg-white shadow-xs",
    low:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs",
    medium:
      "bg-amber-50 text-amber-800 border border-amber-200 shadow-xs",
    high:
      "bg-rose-50 text-rose-700 border border-rose-200 shadow-xs",
    success:
      "bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs font-bold",
    warning:
      "bg-amber-100 text-amber-900 border border-amber-300 shadow-xs font-bold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
