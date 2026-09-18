import { selfHealingEngine } from "./selfHealing";

/**
 * Safe clipboard copy utility with automatic fallback and self-healing telemetry.
 * Works inside cross-origin sandboxed iframes and non-HTTPS dev environments.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // 1. Try modern navigator.clipboard API if available and allowed
  if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Failed (e.g. iframe permission denied, focus lost) - fall through to self-healing fallback
      selfHealingEngine.logIncident(
        "Clipboard Fallback",
        "navigator.clipboard.writeText restricted or denied by browser context",
        "Engaged headless off-screen DOM text-range selection fallback",
        "low"
      );
    }
  }

  // 2. Fallback: create temporary textarea and use document.execCommand('copy')
  if (typeof document !== "undefined") {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      // Ensure element is off-screen and invisible
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch {
      selfHealingEngine.logIncident(
        "Clipboard Fallback",
        "DOM execCommand failed to access system clipboard buffer",
        "Prompted manual selection fallback buffer",
        "medium"
      );
      return false;
    }
  }

  return false;
}
