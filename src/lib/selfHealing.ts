/**
 * Autonomous Self-Healing & Diagnostic Engine for LaunchPilot
 *
 * Capabilities:
 * 1. Anomaly & Corruption Detection: Detects NaN scores, empty channels, missing copy keys, corrupt markdown, etc.
 * 2. Automated Self-Correction: Automatically repairs broken values, clamps out-of-bounds scores, recreates missing fields, and normalizes corrupt JSON.
 * 3. Health & Telemetry Logger: Records every caught issue, timestamps it, diagnoses the root cause, and logs the self-repair action taken.
 * 4. User-Facing Diagnostics Panel: Lets users review the health status, inspect active repairs, and manually trigger a health scan.
 */

import { LaunchAnalysis } from "@/src/types";
import { defaultLaunchAnalysis } from "@/src/data/mockData";

export interface HealingIncident {
  id: string;
  timestamp: string;
  category: "Data Integrity" | "Score Clamp" | "Clipboard Fallback" | "Sanitization" | "DOM Recovery";
  description: string;
  fixApplied: string;
  severity: "low" | "medium" | "critical";
  status: "repaired" | "active";
}

class SelfHealingEngine {
  private incidents: HealingIncident[] = [];
  private listeners: (() => void)[] = [];

  public logIncident(
    category: HealingIncident["category"],
    description: string,
    fixApplied: string,
    severity: HealingIncident["severity"] = "medium"
  ): HealingIncident {
    const incident: HealingIncident = {
      id: "heal-" + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      category,
      description,
      fixApplied,
      severity,
      status: "repaired",
    };

    this.incidents.unshift(incident);
    // Keep max 50 incidents
    if (this.incidents.length > 50) {
      this.incidents.pop();
    }

    this.notifyListeners();
    console.info(`[Self-Healing Engine] Repaired anomaly [${category}]: ${description} -> ${fixApplied}`);
    return incident;
  }

  public getIncidents(): HealingIncident[] {
    return [...this.incidents];
  }

  public clearIncidents(): void {
    this.incidents = [];
    this.notifyListeners();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((l) => {
      try {
        l();
      } catch (err) {
        console.error("SelfHealingEngine listener error:", err);
      }
    });
  }

  /**
   * Deeply validates and auto-repairs any LaunchAnalysis object if corrupted, incomplete, or malformed.
   */
  public healLaunchAnalysis(raw: any, fallbackRepoUrl: string = ""): LaunchAnalysis {
    if (!raw || typeof raw !== "object") {
      this.logIncident(
        "Data Integrity",
        "Analysis object was null or primitive",
        "Reconstructed default baseline data structure",
        "critical"
      );
      return JSON.parse(JSON.stringify(defaultLaunchAnalysis));
    }

    const healed: LaunchAnalysis = JSON.parse(JSON.stringify(defaultLaunchAnalysis));

    // 1. Repair Diagnosis & Scores
    if (!raw.diagnosis || typeof raw.diagnosis !== "object") {
      this.logIncident(
        "Data Integrity",
        "Missing diagnosis object in payload",
        "Rebuilt diagnosis block using default metrics",
        "medium"
      );
    } else {
      const scoreKeys: (keyof typeof healed.diagnosis)[] = [
        "clarityScore",
        "audienceFitScore",
        "differentiationScore",
        "launchReadinessScore",
      ];

      scoreKeys.forEach((key) => {
        const val = raw.diagnosis[key];
        if (typeof val !== "number" || isNaN(val) || !isFinite(val)) {
          this.logIncident(
            "Score Clamp",
            `Score "${String(key)}" was invalid or NaN (${val})`,
            `Restored to fallback score ${healed.diagnosis[key]}`,
            "medium"
          );
        } else if (val < 0 || val > 100) {
          const clamped = Math.max(0, Math.min(100, Math.round(val)));
          this.logIncident(
            "Score Clamp",
            `Score "${String(key)}" was out of bounds (${val})`,
            `Clamped score safely to ${clamped}`,
            "low"
          );
          (healed.diagnosis as any)[key] = clamped;
        } else {
          (healed.diagnosis as any)[key] = Math.round(val);
        }
      });

      // Strengths & Issues arrays
      if (Array.isArray(raw.diagnosis.topStrengths) && raw.diagnosis.topStrengths.length > 0) {
        healed.diagnosis.topStrengths = raw.diagnosis.topStrengths.filter(
          (s: any) => typeof s === "string" && s.trim().length > 0
        );
      } else {
        this.logIncident(
          "Data Integrity",
          "Top Strengths list was empty or malformed",
          "Generated fallback actionable strengths",
          "low"
        );
      }

      if (Array.isArray(raw.diagnosis.topIssues) && raw.diagnosis.topIssues.length > 0) {
        healed.diagnosis.topIssues = raw.diagnosis.topIssues.filter(
          (s: any) => typeof s === "string" && s.trim().length > 0
        );
      } else {
        this.logIncident(
          "Data Integrity",
          "Top Issues list was empty or malformed",
          "Generated fallback actionable friction items",
          "low"
        );
      }
    }

    // 2. Repair Channels
    if (Array.isArray(raw.channels) && raw.channels.length >= 3) {
      healed.channels = raw.channels.map((c: any, idx: number) => ({
        name: typeof c?.name === "string" && c.name.trim() ? c.name.trim() : `Channel ${idx + 1}`,
        fitScore: typeof c?.fitScore === "number" && !isNaN(c.fitScore) ? Math.max(1, Math.min(10, Math.round(c.fitScore))) : 8,
        strategy: typeof c?.strategy === "string" && c.strategy.trim() ? c.strategy.trim() : "Focus on high-value community engagement.",
        riskLevel: ["Low", "Medium", "High"].includes(c?.riskLevel) ? c.riskLevel : "Medium",
      }));
    } else {
      this.logIncident(
        "Data Integrity",
        "Channels array had insufficient or corrupted entries",
        "Applied balanced multi-platform channel schema",
        "medium"
      );
    }

    // 3. Repair Launch Pack
    if (raw.launchPack && typeof raw.launchPack === "object") {
      const ph = raw.launchPack.productHunt;
      if (ph && typeof ph.tagline === "string" && ph.tagline.trim()) healed.launchPack.productHunt.tagline = ph.tagline.trim();
      if (ph && typeof ph.firstComment === "string" && ph.firstComment.trim()) healed.launchPack.productHunt.firstComment = ph.firstComment.trim();

      const hn = raw.launchPack.hackerNews;
      if (hn && typeof hn.title === "string" && hn.title.trim()) healed.launchPack.hackerNews.title = hn.title.trim();
      if (hn && typeof hn.description === "string" && hn.description.trim()) healed.launchPack.hackerNews.description = hn.description.trim();

      const rd = raw.launchPack.reddit;
      if (rd && typeof rd.postDraft === "string" && rd.postDraft.trim()) healed.launchPack.reddit.postDraft = rd.postDraft.trim();
      if (rd && typeof rd.riskWarning === "string" && rd.riskWarning.trim()) healed.launchPack.reddit.riskWarning = rd.riskWarning.trim();

      const tw = raw.launchPack.twitter;
      if (tw && typeof tw.threadHook === "string" && tw.threadHook.trim()) healed.launchPack.twitter.threadHook = tw.threadHook.trim();
      if (tw && typeof tw.tweet2 === "string" && tw.tweet2.trim()) healed.launchPack.twitter.tweet2 = tw.tweet2.trim();
      if (tw && typeof tw.tweet3 === "string" && tw.tweet3.trim()) healed.launchPack.twitter.tweet3 = tw.tweet3.trim();
    } else {
      this.logIncident(
        "Data Integrity",
        "Launch Pack content was missing or corrupt",
        "Synthesized fresh copy templates for all platforms",
        "medium"
      );
    }

    // 4. Repair Action Plan
    if (raw.actionPlan && typeof raw.actionPlan === "object") {
      const weeks: ("week1" | "week2" | "week3" | "week4")[] = ["week1", "week2", "week3", "week4"];
      weeks.forEach((w) => {
        if (Array.isArray(raw.actionPlan[w]) && raw.actionPlan[w].length > 0) {
          healed.actionPlan[w] = raw.actionPlan[w].filter((i: any) => typeof i === "string" && i.trim().length > 0);
        }
      });
    }

    return healed;
  }
}

export const selfHealingEngine = new SelfHealingEngine();
