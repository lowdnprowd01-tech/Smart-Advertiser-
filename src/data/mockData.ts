import { LaunchAnalysis } from "@/src/types";

export const defaultLaunchAnalysis: LaunchAnalysis = {
  diagnosis: {
    clarityScore: 88,
    audienceFitScore: 82,
    differentiationScore: 68,
    launchReadinessScore: 79,
    topStrengths: [
      "Immediate 'aha!' value proposition: Devs understand the workflow bottleneck in under 5 seconds",
      "Robust developer ergonomics with zero runtime overhead and copy-paste integration",
      "Native dark mode CLI & UI assets matching modern developer tool aesthetic (Linear/Vercel standard)",
      "High organic viral coefficient through shareable project health badges and benchmark reports",
    ],
    topIssues: [
      "README lacks an interactive GIF/video demonstrating the end-to-end command in under 10s",
      "Pricing/licensing positioning is ambiguous between open-core, hosted cloud, and community tier",
      "Self-hosted documentation does not clearly list system prerequisites or Docker one-liner",
    ],
  },
  channels: [
    {
      name: "Hacker News (Show HN)",
      fitScore: 9,
      strategy:
        "Focus strictly on technical architecture, performance benchmarks, and self-hostability. Zero marketing buzzwords or generic hype.",
      riskLevel: "High",
    },
    {
      name: "Product Hunt",
      fitScore: 8,
      strategy:
        "Coordinate hunter launch for Tuesday 12:01 AM PT. Highlight indie hacker story, demo GIF, and exclusive launch week founder perk.",
      riskLevel: "Low",
    },
    {
      name: "Reddit (r/selfhosted, r/webdev)",
      fitScore: 8,
      strategy:
        "Post transparent engineering retrospective with architecture breakdown, GitHub link, and request genuine feedback on repo issues.",
      riskLevel: "Medium",
    },
    {
      name: "X / Twitter",
      fitScore: 9,
      strategy:
        "Build-in-public hook highlighting a frustrating developer problem solved with 1 terminal command, paired with a high-framerate mp4 demo.",
      riskLevel: "Low",
    },
    {
      name: "LinkedIn",
      fitScore: 6,
      strategy:
        "Target engineering managers and lead architects focusing on team developer velocity, CI pipeline savings, and open-source transparency.",
      riskLevel: "Low",
    },
  ],
  launchPack: {
    productHunt: {
      tagline: "Turn messy repos into battle-tested developer launches in minutes",
      firstComment:
        "Hey Product Hunt! 👋\n\nI built LaunchPilot because 90% of incredible open-source and indie developer projects die in obscurity simply because launching on HN, Reddit, and Product Hunt requires completely different technical dialects.\n\nLaunchPilot scans your repo, parses your codebase's core utilities, and creates a tailored channel distribution plan—warning you about Reddit shadowbans, HN buzzword traps, and optimal launch schedules.\n\nEverything is free for open-source creators during launch week. We'd love your honest feedback, critique, and feature requests below!",
    },
    hackerNews: {
      title: "Show HN: LaunchPilot – Automated launch strategy and channel audit for repos",
      description:
        "Hi HN, I'm the creator of LaunchPilot.\n\nOver the past two years building developer tools, I noticed that technical founders (myself included) often struggle to translate raw code architecture into clear technical distribution without triggering community spam filters.\n\nI built LaunchPilot to evaluate repo readiness (clarity, technical differentiation, self-hosting friction) and draft platform-native posts that respect community guidelines (no fluff, straight code samples and benchmarks).\n\nBuilt with React, TypeScript, and open API heuristics. The architecture breakdown and benchmarks are linked in the README.\n\nI'm hanging out all day to answer technical questions about how we parse repository metadata and analyze launch friction. Would love your critical feedback.",
    },
    reddit: {
      postDraft:
        "[r/webdev & r/selfhosted]\n\nTitle: I spent 3 months building an open launch strategist for indie devs after my last project got 0 upvotes\n\nHey everyone,\n\nLast year I spent 6 months building a tool, posted a generic marketing link to Reddit, and promptly got downvoted into oblivion for 'promotional spam'. I realized I didn't understand what technical communities actually care about: real architecture, honest tradeoffs, and reproducible benchmarks.\n\nTo solve this for myself, I wrote LaunchPilot. It inspects your repository, tells you what's confusing about your README, highlights your highest-fit channels, and generates draft posts tailored specifically for developer subreddits.\n\nCheck out the GitHub repo here: [YOUR_REPO_URL]\n\nNo paywalls, no email gates for the open repo analysis. What features would make this more useful for your own open-source releases?",
      riskWarning:
        "CRITICAL: Do not post links without engaging in the comments. Reddit moderators immediately remove accounts with under 10% comment-to-submission ratios. Always disclose that you are the creator and invite critical code feedback.",
    },
    twitter: {
      threadHook:
        "Most developer tools don't fail because the code is bad.\n\nThey fail because the developer spent 6 months building and 6 minutes explaining it to the world.\n\nHere is the exact distribution playbook we used to reach 10,000+ developers (and the mistakes to avoid): 🧵👇",
      tweet2:
        "1/ The 'README Paradox'\n\nDevelopers will judge your entire 10,000-line codebase within 8 seconds of scanning your README.\n\nIf you don't have:\n• An immediate 1-line value hook\n• A 5-second animated GIF of the tool in action\n• A single copy-paste install command\n\n80% of visitors leave immediately.",
      tweet3:
        "2/ Stop cross-posting identical PR copy.\n\nHN hates marketing jargon.\nReddit bans unsolicited promotional links.\nProduct Hunt rewards community momentum.\n\nTailor your angle to each room's culture. If you want an automated audit of your repo's launch readiness, try LaunchPilot (link in bio) 🚀",
    },
  },
  actionPlan: {
    week1: [
      "Benchmark competitor READMEs and rewrite your H1/tagline to emphasize one specific outcome",
      "Record a crisp 10-second terminal GIF or UI screencast with zero intro fluff",
      "Add a one-line curl/npx install command directly above the fold",
      "Set up an open Discord or GitHub Discussions community for early feedback",
    ],
    week2: [
      "Engage authentically on 3 relevant subreddits (r/webdev, r/reactjs, r/selfhosted) answering questions",
      "Publish an engineering deep-dive blog post on your technical stack decisions",
      "Reach out to 10 power users or contributors for private beta testing & quotes",
      "Verify all OpenGraph image cards and Twitter meta tags render cleanly",
    ],
    week3: [
      "Deploy Product Hunt launch teaser page and schedule launch day for Tuesday midnight PT",
      "Finalize Show HN submission text with zero marketing hype and clear benchmarks",
      "Prepare automated release notes and v1.0 GitHub Release tag",
      "Coordinate with early testers to provide thoughtful initial comments on launch day",
    ],
    week4: [
      "Launch Day: Post Show HN at 8:00 AM ET / 5:00 AM PT; monitor and reply to every comment within 10 minutes",
      "Cross-publish technical breakdown on Dev.to and Hashnode with canonical URL links",
      "Publish retrospective thread on X with real traffic numbers, conversion metrics, and lessons learned",
      "Triage incoming GitHub issues and ship rapid v1.0.1 patch to demonstrate active maintenance",
    ],
  },
};

export const sampleProjects = [
  {
    name: "turbosql / turbodb",
    url: "https://github.com/turbosql/turbodb",
    description: "Ultra-fast embedded SQLite replica engine for serverless edge runtimes.",
    tag: "Database / Backend",
  },
  {
    name: "calcom / cal.com",
    url: "https://github.com/calcom/cal.com",
    description: "Open source scheduling infrastructure for everyone.",
    tag: "Open Source SaaS",
  },
  {
    name: "shadcn / ui",
    url: "https://github.com/shadcn-ui/ui",
    description: "Beautifully designed components that you can copy and paste into your apps.",
    tag: "UI Library / DevTool",
  },
  {
    name: "supabase / supabase",
    url: "https://github.com/supabase/supabase",
    description: "The open source Firebase alternative. Build a backend in less than 2 minutes.",
    tag: "Fullstack / Cloud",
  },
];

export function generateCustomLaunchAnalysis(repoUrl: string, description: string): LaunchAnalysis {
  const cleanUrl = (repoUrl || "").trim();

  // Extract clean repo/app name without protocol or trailing slashes
  let sanitized = cleanUrl.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  // Remove domain like github.com/ or gitlab.com/ if present
  sanitized = sanitized.replace(/^(?:www\.)?github\.com\//i, "").replace(/^(?:www\.)?gitlab\.com\//i, "");

  const parts = sanitized.split("/").filter(Boolean);
  const repoName = parts.length >= 2 ? parts.slice(-2).join("/") : (parts[0] || "your-project");
  const shortName = repoName.split("/").pop() || "project";

  const rawDesc = (description || "").trim();
  const desc = rawDesc || `An innovative developer tool built for modern engineering workflows.`;
  const descPreview = desc.length > 50 ? desc.slice(0, 50).trim() + "..." : desc;

  const isDevTool =
    cleanUrl.toLowerCase().includes("ui") ||
    cleanUrl.toLowerCase().includes("cli") ||
    cleanUrl.toLowerCase().includes("tool") ||
    cleanUrl.toLowerCase().includes("lib") ||
    desc.toLowerCase().includes("component") ||
    desc.toLowerCase().includes("cli") ||
    desc.toLowerCase().includes("engine");

  const isSaaS =
    cleanUrl.toLowerCase().includes("app") ||
    cleanUrl.toLowerCase().includes("saas") ||
    desc.toLowerCase().includes("saas") ||
    desc.toLowerCase().includes("platform") ||
    desc.toLowerCase().includes("cloud");

  return {
    diagnosis: {
      clarityScore: isDevTool ? 91 : isSaaS ? 84 : 86,
      audienceFitScore: isDevTool ? 88 : 83,
      differentiationScore: isSaaS ? 72 : 76,
      launchReadinessScore: 81,
      topStrengths: [
        `Clear focus on developer ergonomics for ${shortName}`,
        `Modern, clean interface and streamlined installation path`,
        `High organic shareability among technical creators and indie hackers`,
        `Strong alignment with current ecosystem shifts and open-source standards`,
      ],
      topIssues: [
        `README needs a crisp 8-second interactive visual demo above the fold`,
        `Self-hosting and licensing model could be clearer for enterprise and indie users`,
        `Call-to-action (CTA) button contrast can be boosted on mobile viewports`,
      ],
    },
    channels: [
      {
        name: "Hacker News (Show HN)",
        fitScore: isDevTool ? 10 : 8,
        strategy:
          `Lead with technical implementation details, architecture tradeoffs, and why existing tools fell short. Avoid marketing speak.`,
        riskLevel: "High",
      },
      {
        name: "Product Hunt",
        fitScore: isSaaS ? 9 : 8,
        strategy:
          `Highlight the founder origin story, launch offer, and immediate problem solved. Schedule launch for Tuesday midnight PT.`,
        riskLevel: "Low",
      },
      {
        name: "Reddit (r/webdev, r/SideProject)",
        fitScore: 8,
        strategy:
          `Share an honest 'what I learned building ${shortName}' engineering writeup with source code link and request bug reports.`,
        riskLevel: "Medium",
      },
      {
        name: "X / Twitter",
        fitScore: 9,
        strategy:
          `Post an engaging video hook demonstrating the core feature in 5 seconds with a build-in-public retrospective thread.`,
        riskLevel: "Low",
      },
      {
        name: "LinkedIn",
        fitScore: isSaaS ? 8 : 6,
        strategy:
          `Target technical leads, engineering managers, and solo founders focusing on productivity multipliers and team velocity.`,
        riskLevel: "Low",
      },
    ],
    launchPack: {
      productHunt: {
        tagline: `${shortName}: The fastest way to solve ${descPreview.toLowerCase()}`,
        firstComment: `Hey Product Hunt community! 👋\n\nI built ${shortName} (${cleanUrl || "https://github.com/" + repoName}) to address a workflow frustration that cost our team countless hours every week.\n\nKey Highlights:\n• Minimal setup: Get started in under 60 seconds\n• Developer-first ergonomics: Built with modern web standards\n• Zero lock-in and high reliability\n\nWe would love your honest feedback, critique, and feature requests. What should we build next?`,
      },
      hackerNews: {
        title: `Show HN: ${shortName} – ${desc.length > 55 ? desc.slice(0, 55).trim() + "..." : desc}`,
        description: `Hi HN,\n\nI built ${shortName} (${cleanUrl || "https://github.com/" + repoName}) because existing solutions either felt bloated or required too much proprietary configuration.\n\nUnder the hood, we designed this to be lean, fast, and simple to integrate.\n\nCode, benchmarks, and architectural design docs are all in the repository. I would love to hear HN's thoughts on our approach, edge cases we should consider, and how you would improve the API.`,
      },
      reddit: {
        postDraft: `[r/SideProject & r/webdev]\n\nTitle: I built ${shortName} to make ${descPreview.toLowerCase()} easier. Would love honest feedback!\n\nHey Reddit,\n\nI've been working on ${shortName} over the last few months. The main problem I was trying to solve was reducing the cognitive load when working on this workflow.\n\nRepo/App: ${cleanUrl || "https://github.com/" + repoName}\n\nKey features:\n• Fast execution without complex dependencies\n• Open and clean architecture\n\nI'd appreciate any brutally honest feedback on the UI, docs, and potential blind spots. Thanks!`,
        riskWarning: `Warning: Reddit communities strictly enforce anti-self-promotion rules. Ensure you have contributed helpful comments before posting, respond to every question personally, and never use vote rings.`,
      },
      twitter: {
        threadHook: `We just launched ${shortName} 🚀\n\nIt was built to fix a major headache in modern dev workflows: ${desc.length > 80 ? desc.slice(0, 80).trim() + "..." : desc}\n\nHere is how we built it, the numbers, and what we learned along the way: 🧵👇`,
        tweet2: `1/ The problem with existing setups is too much configuration and slow feedback loops.\n\nWith ${shortName}, you get a working workflow in under a minute with zero guesswork.`,
        tweet3: `2/ Check out the live project here: ${cleanUrl || "https://github.com/" + repoName}\n\nRTs appreciated! If you're building developer tools, tell me what you're working on below and I'll test it out 👇`,
      },
    },
    actionPlan: defaultLaunchAnalysis.actionPlan,
  };
}
