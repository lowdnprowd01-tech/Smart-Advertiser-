/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { AppState, LaunchAnalysis } from "@/src/types";
import { defaultLaunchAnalysis, generateCustomLaunchAnalysis } from "@/src/data/mockData";
import { Navbar } from "@/src/components/Navbar";
import { HeroInputView } from "@/src/components/HeroInputView";
import { ProcessingView } from "@/src/components/ProcessingView";
import { DashboardView } from "@/src/components/DashboardView";
import { exportLaunchPlanToMarkdown } from "@/src/lib/exportMarkdown";

export default function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [repoUrl, setRepoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [analysisData, setAnalysisData] = useState<LaunchAnalysis>(defaultLaunchAnalysis);

  const handleStartGenerate = (url: string, desc: string) => {
    setRepoUrl(url);
    setDescription(desc);
    setAppState("processing");
  };

  const handleProcessingComplete = () => {
    // Generate tailored realistic mock analysis strictly matching LaunchAnalysis interface
    const generated = generateCustomLaunchAnalysis(repoUrl, description);
    setAnalysisData(generated);
    setAppState("dashboard");

    // Celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#f59e0b", "#10b981", "#f97316", "#06b6d4"],
      });
    } catch {
      // ignore in environments where canvas may not be available
    }
  };

  const handleNewAnalysis = () => {
    setAppState("landing");
  };

  const handleExport = () => {
    exportLaunchPlanToMarkdown(repoUrl, description, analysisData);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation */}
      <Navbar
        onNewAnalysis={handleNewAnalysis}
        showActions={appState === "dashboard"}
        onExport={handleExport}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {appState === "landing" && (
          <HeroInputView
            onGenerate={handleStartGenerate}
            initialRepoUrl={repoUrl}
            initialDescription={description}
          />
        )}

        {appState === "processing" && (
          <ProcessingView
            repoUrl={repoUrl}
            onComplete={handleProcessingComplete}
          />
        )}

        {appState === "dashboard" && (
          <DashboardView
            data={analysisData}
            repoUrl={repoUrl}
            description={description}
            onNewAnalysis={handleNewAnalysis}
            onExport={handleExport}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} LaunchPilot — AI Launch Strategist for Indie Devs</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Real-Time Heuristics & Self-Healing Guard
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
