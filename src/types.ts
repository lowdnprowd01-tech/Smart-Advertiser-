export interface LaunchAnalysis {
  diagnosis: {
    clarityScore: number;
    audienceFitScore: number;
    differentiationScore: number;
    launchReadinessScore: number;
    topStrengths: string[];
    topIssues: string[];
  };
  channels: {
    name: string;
    fitScore: number;
    strategy: string;
    riskLevel: "Low" | "Medium" | "High";
  }[];
  launchPack: {
    productHunt: { tagline: string; firstComment: string };
    hackerNews: { title: string; description: string };
    reddit: { postDraft: string; riskWarning: string };
    twitter: { threadHook: string; tweet2: string; tweet3: string };
  };
  actionPlan: {
    week1: string[];
    week2: string[];
    week3: string[];
    week4: string[];
  };
}

export type AppState = "landing" | "processing" | "dashboard";

export interface ProjectMetadata {
  repoUrl: string;
  description: string;
  projectName?: string;
}
