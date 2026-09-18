import React from "react";
import { cn } from "@/src/lib/utils";

interface CircularScoreProps {
  score: number;
  label: string;
  description?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  id?: string;
}

export const CircularScore: React.FC<CircularScoreProps> = ({
  score,
  label,
  description,
  size = 110,
  strokeWidth = 9,
  className,
  id,
}) => {
  const safeScore = Number.isFinite(score) ? score : 0;
  const clampedScore = Math.min(Math.max(0, Math.round(safeScore)), 100);
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  // Color logic: Green > 70, Yellow 40-70, Red < 40
  let colorTheme = {
    stroke: "#10b981", // emerald-500
    text: "text-emerald-600",
    bgGlow: "rgba(16, 185, 129, 0.08)",
    border: "border-emerald-200",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold",
    statusText: "Strong",
  };

  if (clampedScore < 40) {
    colorTheme = {
      stroke: "#f43f5e", // rose-500
      text: "text-rose-600",
      bgGlow: "rgba(244, 63, 94, 0.08)",
      border: "border-rose-200",
      badge: "bg-rose-50 text-rose-700 border-rose-200 font-bold",
      statusText: "Needs Work",
    };
  } else if (clampedScore <= 70) {
    colorTheme = {
      stroke: "#f59e0b", // amber-500
      text: "text-amber-600",
      bgGlow: "rgba(245, 158, 11, 0.08)",
      border: "border-amber-200",
      badge: "bg-amber-50 text-amber-800 border-amber-200 font-bold",
      statusText: "Moderate",
    };
  }

  return (
    <div
      id={id}
      className={cn(
        "flex flex-col items-center justify-between p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-indigo-200 group",
        className
      )}
    >
      <div className="flex items-center justify-between w-full mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
          {label}
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
            colorTheme.badge
          )}
        >
          {colorTheme.statusText}
        </span>
      </div>

      <div className="relative flex items-center justify-center my-1">
        <svg
          width={size}
          height={size}
          className="rotate-[-90deg] transition-all duration-700"
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorTheme.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              "text-3xl font-black tracking-tight font-mono",
              colorTheme.text
            )}
          >
            {clampedScore}
          </span>
          <span className="text-[10px] text-slate-400 font-mono -mt-0.5 font-medium">/ 100</span>
        </div>
      </div>

      {description && (
        <p className="text-xs text-slate-500 text-center mt-3 line-clamp-2 leading-relaxed font-sans">
          {description}
        </p>
      )}
    </div>
  );
};
