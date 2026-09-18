import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Radar,
  Gauge,
  Github,
  Globe,
  X,
  Lock,
  Zap,
  CheckCircle2,
  TrendingUp,
  Star,
  Check,
  Calendar,
  Layers,
} from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { sampleProjects } from "@/src/data/mockData";
import { validateAndSanitizeUrl, sanitizeInput, rateLimiter } from "@/src/lib/security";
import { selfHealingEngine } from "@/src/lib/selfHealing";

import happyDeveloperImg from "@/src/assets/images/happy_developer_1789718069763.jpg";
import launchIllustrationImg from "@/src/assets/images/launch_illustration_1789718080381.jpg";
import smilingFounderImg from "@/src/assets/images/smiling_founder_1789718095766.jpg";

interface HeroInputViewProps {
  onGenerate: (repoUrl: string, description: string) => void;
  initialRepoUrl?: string;
  initialDescription?: string;
}

export const HeroInputView: React.FC<HeroInputViewProps> = ({
  onGenerate,
  initialRepoUrl = "",
  initialDescription = "",
}) => {
  const [repoUrl, setRepoUrl] = useState(initialRepoUrl);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState("");
  const [securityNotice, setSecurityNotice] = useState<string | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // 1. Rate limiter check to mitigate abuse
    const rateCheck = rateLimiter.checkLimit();
    if (!rateCheck.allowed) {
      setError(`Rate limit safeguard: Please wait ${rateCheck.retryAfterSeconds}s before generating another plan.`);
      return;
    }

    // 2. Strict URL validation & SSRF avoidance
    const urlValidation = validateAndSanitizeUrl(repoUrl);
    if (!urlValidation.isValid) {
      setError(urlValidation.error || "Please provide a valid GitHub repo or web application URL.");
      return;
    }

    // 3. HTML and XSS sanitization
    const sanitizedDesc = sanitizeInput(description);
    if (description && description !== sanitizedDesc) {
      selfHealingEngine.logIncident(
        "Sanitization",
        "Filtered unsafe HTML/script tags from project description",
        "Sanitized payload using XSS rules",
        "medium"
      );
      setSecurityNotice("Unsafe formatting detected in description and sanitized automatically.");
    }

    setError("");
    onGenerate(urlValidation.cleanUrl, sanitizedDesc);
  };

  const handleSelectSample = (sample: (typeof sampleProjects)[0]) => {
    setRepoUrl(sample.url);
    setDescription(sample.description);
    setError("");
    setSecurityNotice(null);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">
      {/* Radiant, colorful ambient glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-gradient-to-r from-indigo-200/40 via-sky-200/30 to-amber-200/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-rose-200/30 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-emerald-200/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top Banner Chip */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 bg-white/95 text-indigo-800 text-xs font-semibold mb-6 shadow-xs backdrop-blur-md">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-bold text-indigo-700">LaunchPilot 2.0</span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-600 font-medium">Turn Your Code Into A Top-Ranked Launch</span>
        <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 ml-0.5" />
      </div>

      {/* Main Header Text */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1
          id="hero-headline"
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] mb-4 font-sans"
        >
          Launch your software with ease. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500">
            Zero marketing stress. Real traction.
          </span>
        </h1>
        <p
          id="hero-subheadline"
          className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          You wrote amazing code. Now let LaunchPilot handle the launch strategy.
          Get deep heuristic diagnosis, anti-spam channel intelligence, and ready-to-publish launch copy in seconds.
        </p>
      </div>

      {/* Dual Column: Left Input Card & Right Visual Life-Like Showcase */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Input Form (5 cols on lg) */}
        <div className="lg:col-span-6 w-full flex flex-col">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl shadow-xl shadow-indigo-500/5 backdrop-blur-md relative overflow-hidden transition-all"
          >
            {/* Colorful top bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-600" />
                <span>GitHub Repo or Web URL</span>
              </span>
              <span className="text-[11px] text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full font-mono font-bold">
                Required
              </span>
            </div>

            {/* URL Input */}
            <div className="relative flex items-center mb-3">
              <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
                {repoUrl.includes("github.com") ? (
                  <Github className="w-5 h-5 text-indigo-600" />
                ) : (
                  <Globe className="w-5 h-5 text-emerald-600" />
                )}
              </div>
              <Input
                id="repo-url-input"
                type="text"
                placeholder="https://github.com/username/repo or https://myapp.com"
                value={repoUrl}
                onChange={(e) => {
                  setRepoUrl(e.target.value);
                  if (error) setError("");
                  if (securityNotice) setSecurityNotice(null);
                }}
                className="pl-11 pr-10 h-13 text-sm sm:text-base font-mono bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:border-indigo-600 focus-visible:ring-indigo-500/20 rounded-xl"
                autoFocus
              />
              {repoUrl.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setRepoUrl("");
                    setError("");
                    setSecurityNotice(null);
                  }}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Clear input"
                  aria-label="Clear URL input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {error && (
              <p className="text-xs text-rose-700 font-semibold mb-3 flex items-center gap-1.5 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{error}</span>
              </p>
            )}
            {securityNotice && (
              <p className="text-xs text-amber-800 font-medium mb-3 flex items-center gap-1.5 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{securityNotice}</span>
              </p>
            )}

            {/* Brief Description */}
            <div className="space-y-1.5 mb-5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="repo-desc-textarea"
                  className="text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Product Positioning (optional)
                </label>
                <span className="text-[11px] text-slate-400 font-medium">
                  Refines angle & copy hooks
                </span>
              </div>
              <Textarea
                id="repo-desc-textarea"
                placeholder="What does your project solve? E.g., 'A blazing-fast lightweight vector database for SQLite and Edge workers...'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="bg-slate-50 border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-indigo-600 focus-visible:ring-indigo-500/20 rounded-xl"
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </div>

            {/* Submit Action Button */}
            <Button
              id="btn-generate-plan"
              type="submit"
              size="lg"
              variant="energize"
              className="w-full h-13 text-base font-extrabold flex items-center justify-center gap-2 rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 cursor-pointer"
            >
              <span>Generate Launch Plan & Diagnosis</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Button>

            {/* Guarantee Pills */}
            <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-100 text-center">
              <div className="flex flex-col items-center justify-center py-1 text-slate-600 text-[11px] font-medium">
                <Gauge className="w-4 h-4 text-emerald-600 mb-0.5" />
                <span>Heuristic Audit</span>
              </div>
              <div className="flex flex-col items-center justify-center py-1 text-slate-600 text-[11px] font-medium">
                <Radar className="w-4 h-4 text-indigo-600 mb-0.5" />
                <span>Channel Scores</span>
              </div>
              <div className="flex flex-col items-center justify-center py-1 text-slate-600 text-[11px] font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-600 mb-0.5" />
                <span>Anti-Spam Shield</span>
              </div>
            </div>
          </form>

          {/* Quick-test Sample buttons */}
          <div className="mt-5 p-4 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs">
            <p className="text-[11px] text-slate-500 uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Or click a live sample to test in 1-click:</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {sampleProjects.map((sample) => (
                <button
                  key={sample.name}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-800 border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer shadow-2xs group"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  <span className="font-bold text-slate-800 group-hover:text-indigo-900">{sample.name}</span>
                  <span className="text-[10px] text-slate-400">({sample.tag})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Life-Like Showcase (6 cols on lg) */}
        <div className="lg:col-span-6 flex flex-col gap-6 w-full">
          {/* Card 1: Happy Developer With Big Smile typing into laptop */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xl shadow-indigo-500/5 relative overflow-hidden group">
            {/* Visual Photo */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-inner bg-slate-100">
              <img
                src={happyDeveloperImg}
                alt="Happy software developer smiling warmly while typing on laptop with successful launch metrics"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              
              {/* Floating Success Notification Badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-emerald-200/80 rounded-xl px-3 py-1.5 shadow-md flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-800 font-sans">
                  Show HN: #1 Frontpage
                </span>
                <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                  +420 upvotes
                </span>
              </div>

              {/* Floating Stress-Free Badge */}
              <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white rounded-xl px-3 py-1.5 shadow-md flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">Marketing Stress: 0%</span>
              </div>
            </div>

            {/* Context & Caption */}
            <div className="mt-4 px-1 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Built for developers who'd rather write code than agonizing over marketing
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automates positioning, copy hook angles, and multi-channel timing in seconds.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-amber-500 shrink-0 ml-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Life-like 3D Launch Illustration with Before/After */}
          <div className="bg-gradient-to-br from-indigo-50 via-white to-sky-50 rounded-3xl border border-indigo-100 p-5 shadow-lg shadow-indigo-500/5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden shadow-md shrink-0 bg-indigo-100">
                <img
                  src={launchIllustrationImg}
                  alt="3D vibrant illustration of an effortless software launch workflow"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full sm:w-3/5">
                <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full mb-1.5">
                  <TrendingUp className="w-3 h-3 text-indigo-600" />
                  <span>How LaunchPilot Changes The Game</span>
                </div>
                <h2 className="text-base font-bold text-slate-900 leading-snug mb-2">
                  From confusing repo to viral launch pack
                </h2>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Product Hunt:</strong> Catchy tagline, Maker comment, bulletproof media list</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Hacker News:</strong> Genuine "Show HN" format with zero hype or marketing fluff</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Reddit:</strong> Subreddit-specific angles engineered to survive moderation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof & Smiling Founder Testimonial */}
      <div className="w-full max-w-4xl mx-auto mb-14 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center gap-5">
        <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-indigo-400 shadow-md">
          <img
            src={smilingFounderImg}
            alt="Smiling tech founder"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
            <span className="text-xs font-bold text-slate-700 ml-1">5.0 Star Launch Strategy</span>
          </div>
          <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
            "I spent three weeks building my developer utility and dreaded launch day because I hate writing self-promotional posts. LaunchPilot generated the exact Show HN text and Reddit angles that got us 650 GitHub stars in 48 hours."
          </p>
          <p className="text-xs text-slate-500 font-medium mt-1">
            — Marcus Vance, Open-Source Creator & Solo Founder
          </p>
        </div>
      </div>

      {/* 3 Value Pillars */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
            <Gauge className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">1. Deep Heuristic Diagnosis</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Scores your value proposition clarity, audience targeting precision, differentiation, and overall launch readiness before going public.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-4">
            <Radar className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">2. Channel Fit Intelligence</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Ranks Product Hunt, Hacker News, Reddit subreddits, X/Twitter, and Dev.to with custom risk levels, mod rules, and expected reach.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
            <Calendar className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">3. 30-Day Launch Action Plan</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A step-by-step pre-launch checklist, launch day execution sprint, and post-launch compounding calendar with interactive task tracking.
          </p>
        </div>
      </div>
    </div>
  );
};
