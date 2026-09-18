import React from "react";
import { Rocket, Sparkles, RefreshCw, Share2, Download, Check, ShieldCheck, Activity } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { copyToClipboard } from "@/src/lib/clipboard";
import { selfHealingEngine } from "@/src/lib/selfHealing";

interface NavbarProps {
  onNewAnalysis?: () => void;
  showActions?: boolean;
  onExport?: () => void;
  onOpenSelfHealing?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNewAnalysis,
  showActions = false,
  onExport,
  onOpenSelfHealing,
}) => {
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [incidentCount, setIncidentCount] = React.useState(0);

  React.useEffect(() => {
    setIncidentCount(selfHealingEngine.getIncidents().length);
    const unsub = selfHealingEngine.subscribe(() => {
      setIncidentCount(selfHealingEngine.getIncidents().length);
    });
    return unsub;
  }, []);

  const handleShare = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <header
      id="app-navbar"
      className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo with energized vivid gradient */}
        <div
          onClick={onNewAnalysis}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-400 flex items-center justify-center shadow-md shadow-indigo-500/20 border border-white group-hover:scale-105 transition-transform duration-200">
            <Rocket className="w-5 h-5 text-white font-black stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 font-sans">
                Launch<span className="text-indigo-600">Pilot</span>
              </span>
              <Badge
                variant="outline"
                className="text-[10px] py-0 px-2 font-mono text-indigo-700 border-indigo-200 bg-indigo-50 font-bold"
              >
                PRO AI
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
              AI Growth Strategist & Launch Intelligence
            </p>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Autonomous Self-Healing Status Trigger */}
          <button
            id="btn-self-healing-trigger"
            onClick={onOpenSelfHealing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-all text-xs font-mono shadow-xs group cursor-pointer"
            title="Open Self-Healing Diagnostics & Security Monitor"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-semibold">Self-Healing:</span>
            <span className="text-emerald-700 font-extrabold">Active</span>
            {incidentCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold">
                {incidentCount}
              </span>
            )}
          </button>

          {showActions && (
            <>
              <Button
                id="btn-export-plan"
                variant="outline"
                size="sm"
                onClick={onExport}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                Export Markdown
              </Button>

              <Button
                id="btn-share-plan"
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied URL</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="hidden sm:inline">Share</span>
                  </>
                )}
              </Button>

              <Button
                id="btn-new-analysis"
                variant="energize"
                size="sm"
                onClick={onNewAnalysis}
                className="inline-flex items-center gap-1.5 text-xs font-bold"
              >
                <RefreshCw className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                <span>New Launch</span>
              </Button>
            </>
          )}

          {!showActions && (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Verified & Guarded
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
