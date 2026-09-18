import { LaunchAnalysis } from "@/src/types";

export function exportLaunchPlanToMarkdown(
  repoUrl: string,
  description: string,
  data: LaunchAnalysis
): void {
  const repoName = repoUrl.replace(/^https?:\/\//, "").replace(/^(github\.com\/)/, "");

  const content = `# LaunchPilot Strategy Report: ${repoName}
*Target URL:* ${repoUrl}
*Generated on:* ${new Date().toLocaleDateString()}

${description ? `> **Project Description:** ${description}\n` : ""}

---

## 1. Launch Diagnosis Scores
- **Clarity Score:** ${data.diagnosis.clarityScore}/100
- **Audience Fit Score:** ${data.diagnosis.audienceFitScore}/100
- **Differentiation Score:** ${data.diagnosis.differentiationScore}/100
- **Launch Readiness Score:** ${data.diagnosis.launchReadinessScore}/100

### Top Strengths
${data.diagnosis.topStrengths.map((s) => `- [x] ${s}`).join("\n")}

### Critical Issues to Fix Before Launch
${data.diagnosis.topIssues.map((i) => `- [ ] ${i}`).join("\n")}

---

## 2. Promotion Opportunity Map
| Channel | Fit Score | Risk Level | Recommended Strategy |
| :--- | :---: | :---: | :--- |
${data.channels
  .map(
    (c) =>
      `| **${c.name}** | ${c.fitScore}/10 | ${c.riskLevel} | ${c.strategy} |`
  )
  .join("\n")}

---

## 3. The Launch Pack

### Product Hunt
**Tagline:** ${data.launchPack.productHunt.tagline}

**Maker First Comment:**
\`\`\`text
${data.launchPack.productHunt.firstComment}
\`\`\`

### Hacker News (Show HN)
**Title:** ${data.launchPack.hackerNews.title}

**Submission Text:**
\`\`\`text
${data.launchPack.hackerNews.description}
\`\`\`

### Reddit
**Advisory Warning:**
> ${data.launchPack.reddit.riskWarning}

**Post Draft:**
\`\`\`text
${data.launchPack.reddit.postDraft}
\`\`\`

### X / Twitter Thread
**Tweet 1 (The Hook):**
\`\`\`text
${data.launchPack.twitter.threadHook}
\`\`\`

**Tweet 2:**
\`\`\`text
${data.launchPack.twitter.tweet2}
\`\`\`

**Tweet 3 (Call to Action):**
\`\`\`text
${data.launchPack.twitter.tweet3}
\`\`\`

---

## 4. 30-Day Action Plan

### Week 1: Foundation & First Impressions
${data.actionPlan.week1.map((item) => `- [ ] ${item}`).join("\n")}

### Week 2: Community Seeding & Technical Content
${data.actionPlan.week2.map((item) => `- [ ] ${item}`).join("\n")}

### Week 3: Launch Asset Assembly & Beta Outing
${data.actionPlan.week3.map((item) => `- [ ] ${item}`).join("\n")}

### Week 4: Launch Day & Post-Launch Feedback Loops
${data.actionPlan.week4.map((item) => `- [ ] ${item}`).join("\n")}

---
*Created with LaunchPilot — AI Growth Strategist for Indie Developers*
`;

  // Safe file name derivation
  const safeBaseName = (repoName || "project").replace(/[^a-zA-Z0-9_-]/g, "_");
  const filename = `launchpilot-${safeBaseName}.md`;

  try {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    if (typeof link.setAttribute === "function") {
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  } catch (err) {
    console.error("Failed to download Markdown file:", err);
  }
}
