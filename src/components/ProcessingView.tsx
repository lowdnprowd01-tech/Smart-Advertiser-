import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Circle, Terminal, Sparkles, Rocket } from "lucide-react";
import { Progress } from "@/src/components/ui/progress";

const STEPS = [
  "Scanning repository architecture & metadata...",
  "Synthesizing product positioning & value hook...",
  "Scoring launch readiness & community fit...",
  "Generating multi-channel promotion strategy...",
  "Composing platform-tailored launch copy...",
];

interface ProcessingViewProps {
  repoUrl: string;
  onComplete: () => void;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({
  repoUrl,
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let completed = false;

    // Check off one by one every 1.4 seconds
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const next = prev + 1;
        if (next >= STEPS.length) {
          clearInterval(interval);
          if (!completed) {
            completed = true;
            timeoutId = setTimeout(() => {
              onComplete();
            }, 600);
          }
          return STEPS.length;
        }
        return next;
      });
    }, 1400);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [onComplete]);

  const progressPercent = Math.min(
    Math.round(((currentStepIndex) / (STEPS.length)) * 100),
    100
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-gradient-to-r from-indigo-200/50 via-sky-200/40 to-amber-200/50 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Terminal Header Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-2xl shadow-indigo-500/10 overflow-hidden relative">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400" />

          {/* Top terminal bar */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-mono text-slate-700 flex items-center gap-1.5 font-bold">
                <Rocket className="w-4 h-4 text-indigo-600" />
                <span>launchpilot // heuristic-engine</span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              <span>Analyzing</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Target Repo Target Info */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
              <div className="overflow-hidden">
                <p className="text-[11px] uppercase tracking-wider text-indigo-600 font-bold mb-0.5 font-mono">
                  Target Project
                </p>
                <p className="text-xs sm:text-sm font-mono text-slate-800 font-bold truncate max-w-[320px]">
                  {repoUrl}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-mono font-black text-indigo-600">
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Progress Bar with Vivid Energizing Gradient */}
            <div className="mb-8">
              <Progress
                value={progressPercent}
                max={100}
                indicatorColor="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400"
                className="h-2.5 bg-slate-100 border border-slate-200"
              />
            </div>

            {/* Vertical List of Steps */}
            <div className="space-y-3">
              {STEPS.map((stepText, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div
                    key={stepText}
                    className={`flex items-center gap-3.5 p-3.5 rounded-xl transition-all duration-300 ${
                      isCurrent
                        ? "bg-indigo-50/70 border border-indigo-200 text-slate-900 shadow-xs"
                        : isCompleted
                        ? "bg-slate-50/80 border border-emerald-200/80 text-slate-700"
                        : "bg-transparent border border-transparent text-slate-400"
                    }`}
                  >
                    {/* Status Icon */}
                    <div className="shrink-0 flex items-center justify-center">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-in zoom-in-50 duration-200" />
                      ) : isCurrent ? (
                        <div className="relative flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                          <span className="absolute w-2 h-2 rounded-full bg-indigo-400/40 animate-ping" />
                        </div>
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300" />
                      )}
                    </div>

                    {/* Step label */}
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium tracking-tight ${
                          isCompleted
                            ? "text-slate-800 font-semibold"
                            : isCurrent
                            ? "text-indigo-900 font-bold"
                            : "text-slate-400"
                        }`}
                      >
                        {stepText}
                      </p>
                    </div>

                    {/* Step badge */}
                    {isCompleted && (
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        Done
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full animate-pulse">
                        Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom footnote */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500 font-sans font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Optimizing against HN, Reddit & Product Hunt guidelines</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
