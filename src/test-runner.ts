import { copyToClipboard } from "@/src/lib/clipboard";
import { exportLaunchPlanToMarkdown } from "@/src/lib/exportMarkdown";
import { generateCustomLaunchAnalysis, sampleProjects } from "@/src/data/mockData";
import { LaunchAnalysis } from "@/src/types";

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${msg}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${msg}`);
  }
}

console.log("\n==========================================");
console.log("RUNNING COMPREHENSIVE EDGE-CASE TEST SUITE");
console.log("==========================================\n");

// --- TEST SUITE 1: Generator edge cases & robustness ---
console.log("Suite 1: Generator edge cases & robustness");

// 1.1 Empty URL / Empty Description
const emptyRes = generateCustomLaunchAnalysis("", "");
assert(!!emptyRes.diagnosis, "Empty URL/desc generates valid diagnosis object");
assert(emptyRes.diagnosis.clarityScore >= 0 && emptyRes.diagnosis.clarityScore <= 100, "Clarity score in [0, 100]");
assert(emptyRes.diagnosis.audienceFitScore >= 0 && emptyRes.diagnosis.audienceFitScore <= 100, "Audience score in [0, 100]");
assert(emptyRes.diagnosis.differentiationScore >= 0 && emptyRes.diagnosis.differentiationScore <= 100, "Diff score in [0, 100]");
assert(emptyRes.diagnosis.launchReadinessScore >= 0 && emptyRes.diagnosis.launchReadinessScore <= 100, "Readiness score in [0, 100]");
assert(emptyRes.channels.length === 5, "5 channels present for empty inputs");
assert(emptyRes.actionPlan.week1.length > 0, "Week 1 action items generated");

// 1.2 Malformed & varied URL formats
const weirdUrls = [
  "   ",
  "https://",
  "http://",
  "github.com",
  "https://github.com/",
  "https://github.com/facebook/react/",
  "https://sub.domain.co.uk/deep/path/?query=1#hash",
  "my-cli-tool",
  "https://my-awesome-app.vercel.app",
  "gitlab.com/group/subgroup/project",
  "http://localhost:3000",
  "git@github.com:user/repo.git"
];

weirdUrls.forEach((url, i) => {
  try {
    const res = generateCustomLaunchAnalysis(url, "A specialized tool");
    assert(
      !res.launchPack.productHunt.tagline.includes("undefined") &&
      !res.launchPack.productHunt.firstComment.includes("undefined") &&
      !res.launchPack.hackerNews.title.includes("undefined"),
      `URL case ${i} ('${url}') has no 'undefined' in output`
    );
  } catch (err: any) {
    assert(false, `URL case ${i} threw error: ${err?.message}`);
  }
});

// 1.3 Extremely long text inputs
const giantText = "Word ".repeat(5000);
try {
  const longRes = generateCustomLaunchAnalysis("https://github.com/heavy/repo", giantText);
  assert(longRes.launchPack.productHunt.tagline.length <= 160, "PH Tagline length safely bounded");
  assert(longRes.launchPack.hackerNews.title.length <= 160, "HN Title length safely bounded");
} catch (err: any) {
  assert(false, `Huge text input threw error: ${err?.message}`);
}

// 1.4 Special characters, script tags, quotes, emojis
const evilText = "<script>alert('xss')</script> 🔥 🚀 \"quotes\" & 'apostrophe' `code`";
try {
  const xssRes = generateCustomLaunchAnalysis(evilText, evilText);
  assert(!!xssRes.launchPack.reddit.postDraft, "Handles evil characters cleanly");
  assert(xssRes.launchPack.reddit.postDraft.length > 10, "Post draft populated with content");
} catch (err: any) {
  assert(false, `Special char injection threw error: ${err?.message}`);
}

// --- TEST SUITE 2: Markdown Exporter Robustness ---
console.log("\nSuite 2: Markdown Export Edge Cases");

try {
  const mockAnalysis: LaunchAnalysis = {
    diagnosis: {
      clarityScore: 0,
      audienceFitScore: 100,
      differentiationScore: 50,
      launchReadinessScore: 75,
      topStrengths: ["Fast build"],
      topIssues: ["Needs docs"],
    },
    channels: [
      { name: "HN", fitScore: 8, strategy: "Show HN", riskLevel: "High" }
    ],
    launchPack: {
      productHunt: { tagline: "Tagline", firstComment: "Comment" },
      hackerNews: { title: "Show HN: App", description: "Details" },
      reddit: { riskWarning: "No spam", postDraft: "Hey Reddit" },
      twitter: { threadHook: "Hook", tweet2: "Body", tweet3: "CTA" },
    },
    actionPlan: {
      week1: ["Task 1"],
      week2: [],
      week3: [],
      week4: [],
    },
  };

  // Mock global document if node
  if (typeof document === "undefined") {
    (global as any).document = {
      createElement: () => ({
        href: "",
        download: "",
        click: () => {},
        setAttribute: () => {},
      }),
      body: {
        appendChild: () => {},
        removeChild: () => {},
      },
    };
    (global as any).URL = {
      createObjectURL: () => "blob:test",
      revokeObjectURL: () => {},
    };
    (global as any).Blob = class {
      constructor(public parts: any[], public opts: any) {}
    };
  }

  exportLaunchPlanToMarkdown("https://github.com/my/project", "A developer app", mockAnalysis);
  assert(true, "Markdown export executed successfully without errors");
} catch (err: any) {
  assert(false, `Markdown exporter threw error: ${err?.message}`);
}

// --- TEST SUITE 3: Sample Projects Data Integrity ---
console.log("\nSuite 3: Sample Projects Data Integrity");
assert(sampleProjects.length >= 4, "At least 4 sample projects available");
sampleProjects.forEach((p, idx) => {
  assert(
    typeof p.url === "string" && p.url.length > 0 &&
    typeof p.name === "string" && p.name.length > 0 &&
    typeof p.description === "string" && p.description.length > 0 &&
    typeof p.tag === "string" && p.tag.length > 0,
    `Sample project ${idx} ('${p.name}') has all required fields`
  );
});

// --- TEST SUITE 4: Clipboard Fallback Helper Test ---
console.log("\nSuite 4: Clipboard Fallback Robustness");
async function testClipboard() {
  const result = await copyToClipboard("test text");
  assert(typeof result === "boolean", "copyToClipboard returns a boolean promise safely in all environments");
}

testClipboard().then(() => {
  console.log(`\n==========================================`);
  console.log(`All Suites Completed: ${passed + failed} tests`);
  console.log(`Passed: ${passed} | Failed: ${failed}`);
  console.log(`==========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
});
