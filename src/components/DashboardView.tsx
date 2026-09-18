import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Calendar,
  ExternalLink,
  MessageSquare,
  TrendingUp,
  Flame,
  Globe,
  Share2,
  ListTodo,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Info,
  Layers,
  ChevronRight,
  Target,
  FileText,
  Star,
  Zap,
} from "lucide-react";
import { LaunchAnalysis } from "@/src/types";
import { CircularScore } from "@/src/components/ui/circular-score";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/src/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/src/components/ui/tabs";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { copyToClipboard } from "@/src/lib/clipboard";

import happyDeveloperImg from "@/src/assets/images/happy_developer_1789718069763.jpg";
import launchIllustrationImg from "@/src/assets/images/launch_illustration_1789718080381.jpg";

interface DashboardViewProps {
  data: LaunchAnalysis;
  repoUrl: string;
  description?: string;
  onNewAnalysis: () => void;
  onExport: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  data,
  repoUrl,
  description,
  onNewAnalysis,
  onExport,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  // Store completed action items by key (e.g. "week1-0")
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const handleCopy = async (text: string, key: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
      }, 2000);
    }
  };

  const toggleTask = (taskKey: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskKey]: !prev[taskKey],
    }));
  };

  // Calculate total action plan progress safely
  const week1Count = data.actionPlan?.week1?.length || 0;
  const week2Count = data.actionPlan?.week2?.length || 0;
  const week3Count = data.actionPlan?.week3?.length || 0;
  const week4Count = data.actionPlan?.week4?.length || 0;
  const totalActionTasks = week1Count + week2Count + week3Count + week4Count;

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const actionProgressPercent = totalActionTasks > 0 ? Math.round((completedCount / totalActionTasks) * 100) : 0;

  // Derive repo title safely
  const cleanUrl = (repoUrl || "").trim();
  const repoName =
    cleanUrl.replace(/^https?:\/\//i, "").replace(/^(?:www\.)?(?:github\.com\/|gitlab\.com\/)/i, "").replace(/\/+$/, "") ||
    "Project";

  const targetExternalHref = cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")
    ? cleanUrl
    : `https://${cleanUrl}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Project Overview Header Banner */}
      <div
        id="dashboard-header"
        className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-lg shadow-indigo-500/5 relative overflow-hidden backdrop-blur-md"
      >
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-amber-100/40 rounded-full blur-2xl pointer-events-none -z-10" />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge
                variant="outline"
                className="bg-indigo-50 text-indigo-700 border-indigo-200 font-mono text-xs font-bold"
              >
                Strategy Report
              </Badge>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200 font-mono text-xs font-bold"
              >
                Guarded & Verified
              </Badge>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-mono">
                Generated {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span>{repoName}</span>
              <a
                href={targetExternalHref}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:text-indigo-800 transition-colors p-1 rounded-lg hover:bg-indigo-50"
                title="Open Project"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </h1>

            {description ? (
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                {description}
              </p>
            ) : (
              <p className="text-xs text-slate-500 font-mono">
                Repo target: {repoUrl}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="text-xs h-9 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold"
            >
              Export Report
            </Button>
            <Button
              variant="energize"
              size="sm"
              onClick={onNewAnalysis}
              className="text-xs h-9 font-bold"
            >
              Analyze Another Repo
            </Button>
          </div>
        </div>
      </div>

      {/* SECTION A: Launch Diagnosis (Top of page) */}
      <section id="section-launch-diagnosis" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Section A: Launch Diagnosis</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Automated heuristics evaluating clarity, audience fit, market differentiation, and release friction.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> &gt;70 Strong
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 40-70 Moderate
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> &lt;40 Risk
            </span>
          </div>
        </div>

        {/* 4 Circular Progress Bars / Sleek Score Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <CircularScore
            id="score-clarity"
            score={data.diagnosis.clarityScore}
            label="Clarity"
            description="How quickly a technical visitor grasps the core utility and setup command in 5 seconds."
          />
          <CircularScore
            id="score-audience-fit"
            score={data.diagnosis.audienceFitScore}
            label="Audience Fit"
            description="Precision of target developer archetype matching current open-source and indie trends."
          />
          <CircularScore
            id="score-differentiation"
            score={data.diagnosis.differentiationScore}
            label="Differentiation"
            description="Uniqueness compared to existing alternatives, legacy toolchains, or standard libraries."
          />
          <CircularScore
            id="score-launch-readiness"
            score={data.diagnosis.launchReadinessScore}
            label="Launch Readiness"
            description="Overall completeness of assets, documentation, community links, and installation ergonomics."
          />
        </div>

        {/* Two columns below the scores: "Top Strengths" and "Critical Issues" */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Top Strengths Column */}
          <Card id="card-top-strengths" className="border-emerald-200 bg-white shadow-sm">
            <CardHeader className="pb-3 border-b border-emerald-50 bg-emerald-50/40">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Top Strengths</span>
                </CardTitle>
                <Badge variant="low" className="font-mono text-[11px] bg-emerald-100 text-emerald-800 border-emerald-300">
                  {data.diagnosis.topStrengths.length} Highlights
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-600">
                Core selling points and structural advantages to emphasize in your promotional copy.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3">
                {data.diagnosis.topStrengths.map((strength, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs sm:text-sm text-slate-800 font-medium"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Critical Issues Column */}
          <Card id="card-critical-issues" className="border-amber-200 bg-white shadow-sm">
            <CardHeader className="pb-3 border-b border-amber-50 bg-amber-50/40">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-amber-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Critical Issues</span>
                </CardTitle>
                <Badge variant="medium" className="font-mono text-[11px] bg-amber-100 text-amber-900 border-amber-300">
                  {data.diagnosis.topIssues.length} Needs Work
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-600">
                Friction points that could lead to bounce rates, downvotes, or missed conversions.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3">
                {data.diagnosis.topIssues.map((issue, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/50 border border-amber-100 text-xs sm:text-sm text-slate-800 font-medium"
                  >
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{issue}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SECTION B: Promotion Opportunity Map */}
      <section id="section-promotion-opportunity" className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>Section B: Promotion Opportunity Map</span>
            </h2>
            <span className="text-xs text-indigo-700 font-mono font-bold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              {data.channels.length} Evaluated Channels
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Channel fit analysis based on developer community culture, mod tolerances, and conversion potential.
          </p>
        </div>

        {/* Grid of cards for different channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.channels.map((channel) => {
            // Risk level variant
            const riskVariant =
              channel.riskLevel === "Low"
                ? "low"
                : channel.riskLevel === "Medium"
                ? "medium"
                : "high";

            // Fit score color
            const fitScoreColor =
              channel.fitScore >= 8
                ? "text-emerald-600"
                : channel.fitScore >= 6
                ? "text-amber-600"
                : "text-rose-600";

            return (
              <Card
                key={channel.name}
                className="flex flex-col justify-between border-slate-200/90 hover:border-indigo-300 bg-white hover:shadow-md transition-all duration-200 group shadow-sm rounded-2xl"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {channel.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-slate-500 font-mono">
                          Fit Score:
                        </span>
                        <span
                          className={`text-sm font-extrabold font-mono ${fitScoreColor}`}
                        >
                          {channel.fitScore} / 10
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                        Risk Level
                      </span>
                      <Badge variant={riskVariant} className="font-mono text-[11px]">
                        {channel.riskLevel} Risk
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <p className="text-[11px] uppercase tracking-wider text-indigo-700 font-bold mb-1">
                      Recommended Strategy
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {channel.strategy}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SECTION C: The Launch Pack */}
      <section id="section-launch-pack" className="space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <span>Section C: The Launch Pack</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Pre-drafted, platform-native copy crafted to avoid trigger filters and spark authentic discussions.
            </p>
          </div>
          <Badge variant="outline" className="text-xs font-mono text-emerald-700 border-emerald-200 bg-emerald-50 font-bold">
            Copy-Ready Content
          </Badge>
        </div>

        {/* Tabbed interface containing generated copy */}
        <Card className="border-slate-200/90 bg-white shadow-md rounded-3xl overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <Tabs defaultValue="productHunt" className="w-full">
              <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex gap-1.5 mb-6 bg-slate-100 border border-slate-200 p-1.5 rounded-2xl">
                <TabsTrigger value="productHunt" className="text-xs sm:text-sm font-bold">
                  Product Hunt
                </TabsTrigger>
                <TabsTrigger value="hackerNews" className="text-xs sm:text-sm font-bold">
                  Hacker News
                </TabsTrigger>
                <TabsTrigger value="reddit" className="text-xs sm:text-sm font-bold">
                  Reddit
                </TabsTrigger>
                <TabsTrigger value="twitter" className="text-xs sm:text-sm font-bold">
                  X / Twitter
                </TabsTrigger>
              </TabsList>

              {/* Product Hunt Tab */}
              <TabsContent value="productHunt" className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                      Tagline (Max 60 chars)
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopy(data.launchPack.productHunt.tagline, "ph-tagline")
                      }
                      className="h-8 text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-semibold"
                    >
                      {copiedKey === "ph-tagline" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                          <span>Copy Tagline</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 font-mono">
                    {data.launchPack.productHunt.tagline}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                      Maker First Comment
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopy(
                          data.launchPack.productHunt.firstComment,
                          "ph-comment"
                        )
                      }
                      className="h-8 text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-semibold"
                    >
                      {copiedKey === "ph-comment" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                          <span>Copy First Comment</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {data.launchPack.productHunt.firstComment}
                  </pre>
                </div>
              </TabsContent>

              {/* Hacker News Tab */}
              <TabsContent value="hackerNews" className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
                      Show HN Title
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopy(data.launchPack.hackerNews.title, "hn-title")
                      }
                      className="h-8 text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-semibold"
                    >
                      {copiedKey === "hn-title" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                          <span>Copy Title</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 font-mono">
                    {data.launchPack.hackerNews.title}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                      Show HN Text / First Comment
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopy(
                          data.launchPack.hackerNews.description,
                          "hn-desc"
                        )
                      }
                      className="h-8 text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-semibold"
                    >
                      {copiedKey === "hn-desc" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                          <span>Copy Post</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {data.launchPack.hackerNews.description}
                  </pre>
                </div>
              </TabsContent>

              {/* Reddit Tab */}
              <TabsContent value="reddit" className="space-y-6">
                {/* Risk Warning Alert Box */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
                      Anti-Spam & Moderator Advisory
                    </span>
                    <p className="text-xs text-amber-800 leading-relaxed font-medium">
                      {data.launchPack.reddit.riskWarning}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                      Subreddit Post Draft
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopy(data.launchPack.reddit.postDraft, "reddit-draft")
                      }
                      className="h-8 text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-semibold"
                    >
                      {copiedKey === "reddit-draft" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                          <span>Copy Post Draft</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {data.launchPack.reddit.postDraft}
                  </pre>
                </div>
              </TabsContent>

              {/* X / Twitter Tab */}
              <TabsContent value="twitter" className="space-y-6">
                <div className="space-y-4">
                  {/* Tweet 1 (Hook) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 font-mono">
                        Tweet 1 • The Hook
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleCopy(
                            data.launchPack.twitter.threadHook,
                            "twitter-1"
                          )
                        }
                        className="h-8 text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-semibold"
                      >
                        {copiedKey === "twitter-1" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                            <span>Copy Hook</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed">
                      {data.launchPack.twitter.threadHook}
                    </pre>
                  </div>

                  {/* Tweet 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                        Tweet 2 • The Problem / Context
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleCopy(data.launchPack.twitter.tweet2, "twitter-2")
                        }
                        className="h-8 text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-semibold"
                      >
                        {copiedKey === "twitter-2" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                            <span>Copy Tweet 2</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed">
                      {data.launchPack.twitter.tweet2}
                    </pre>
                  </div>

                  {/* Tweet 3 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                        Tweet 3 • The Solution & CTA
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleCopy(data.launchPack.twitter.tweet3, "twitter-3")
                        }
                        className="h-8 text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-semibold"
                      >
                        {copiedKey === "twitter-3" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                            <span>Copy Tweet 3</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed">
                      {data.launchPack.twitter.tweet3}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Visual Showcase: Real Developer Launch Benchmarks & Advice */}
      <section className="bg-gradient-to-r from-indigo-50 via-white to-amber-50 rounded-3xl border border-indigo-100 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/10] shadow-md">
            <img
              src={happyDeveloperImg}
              alt="Smiling developer happily deploying code"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Real Founder Case Study</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Proven Launch Day Secrets</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              How Top Developers Win Community Trust
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              <p>
                <strong>1. First 60 Minutes:</strong> Reply to every single Hacker News and Product Hunt comment immediately with polite, transparent answers. Early engagement signals positive momentum to platform algorithms.
              </p>
              <p>
                <strong>2. Reddit Golden Rule:</strong> Never post a bare link. Always offer the full architecture summary and self-host instructions directly in text. If readers can't learn something without leaving Reddit, they will downvote.
              </p>
              <p>
                <strong>3. The Follow-up Cycle:</strong> Turn bug reports into public git commits within 4 hours. Nothing earns developer loyalty faster than an author fixing an issue live during launch day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: 30-Day Action Plan */}
      <section id="section-action-plan" className="space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <span>Section D: 30-Day Action Plan</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Chronological milestones from pre-launch positioning to post-launch developer community momentum.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-2xl text-xs font-mono shadow-xs">
            <span className="text-slate-500 font-medium">Execution Progress:</span>
            <span className="font-extrabold text-indigo-600">
              {completedCount} / {totalActionTasks} ({actionProgressPercent}%)
            </span>
          </div>
        </div>

        {/* Timeline UI showing Week 1 to Week 4 milestones */}
        <div className="space-y-6">
          {[
            {
              weekNum: "Week 1",
              title: "Foundation & First Impressions",
              badge: "Pre-Launch",
              items: data.actionPlan.week1,
              keyPrefix: "week1",
            },
            {
              weekNum: "Week 2",
              title: "Community Seeding & Technical Content",
              badge: "Validation",
              items: data.actionPlan.week2,
              keyPrefix: "week2",
            },
            {
              weekNum: "Week 3",
              title: "Launch Asset Assembly & Beta Outing",
              badge: "Go-To-Market Prep",
              items: data.actionPlan.week3,
              keyPrefix: "week3",
            },
            {
              weekNum: "Week 4",
              title: "Launch Day & Post-Launch Feedback Loops",
              badge: "Execution & Momentum",
              items: data.actionPlan.week4,
              keyPrefix: "week4",
            },
          ].map((week, wIdx) => {
            const weekCompletedCount = week.items.filter(
              (_, idx) => completedTasks[`${week.keyPrefix}-${idx}`]
            ).length;
            const isWeekAllDone = weekCompletedCount === week.items.length;

            return (
              <Card
                key={week.weekNum}
                className={`border-slate-200/90 transition-all rounded-3xl overflow-hidden ${
                  isWeekAllDone ? "border-emerald-300 bg-emerald-50/20" : "bg-white shadow-sm"
                }`}
              >
                <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center font-mono font-bold text-xs text-indigo-700">
                        0{wIdx + 1}
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-slate-900">
                          {week.weekNum}: {week.title}
                        </CardTitle>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[11px] font-mono bg-white text-slate-700 border-slate-200">
                        {week.badge}
                      </Badge>
                      <span className="text-xs font-mono text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                        {weekCompletedCount}/{week.items.length} Done
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-4">
                  <div className="space-y-2.5">
                    {week.items.map((taskText, idx) => {
                      const taskKey = `${week.keyPrefix}-${idx}`;
                      const isDone = !!completedTasks[taskKey];

                      return (
                        <div
                          key={taskKey}
                          onClick={() => toggleTask(taskKey)}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                            isDone
                              ? "bg-emerald-50 border-emerald-200 text-emerald-900 line-through"
                              : "bg-slate-50/60 border-slate-200/80 hover:border-indigo-300 text-slate-800 hover:bg-indigo-50/30"
                          }`}
                        >
                          <div className="shrink-0 mt-0.5">
                            <input
                              type="checkbox"
                              checked={isDone}
                              onChange={() => {}} // handled by parent div click
                              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                          </div>
                          <span className="text-xs sm:text-sm leading-relaxed font-medium">
                            {taskText}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};
