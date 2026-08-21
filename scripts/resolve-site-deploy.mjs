#!/usr/bin/env node
/**
 * Resolve the public site URL, Vite base path, and optional custom domain
 * for GitHub Pages / any-domain deploys. Writes GitHub Actions outputs when
 * GITHUB_OUTPUT is set.
 */
import { appendFileSync } from "node:fs";

const owner = process.env.GITHUB_REPOSITORY_OWNER || "";
const repo = (process.env.GITHUB_REPOSITORY || "").split("/")[1] || "";

let siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || "").replace(/\/$/, "");
let basePath = process.env.BASE_PATH || process.env.VITE_BASE_PATH || "";
let domain = (process.env.SITE_DOMAIN || "").replace(/^https?:\/\//, "").replace(/\/$/, "");

if (domain && !siteUrl) {
  siteUrl = `https://${domain}`;
}

if (!siteUrl) {
  if (repo && repo === `${owner}.github.io`) {
    siteUrl = `https://${owner}.github.io`;
    basePath = basePath || "/";
  } else if (owner && repo) {
    siteUrl = `https://${owner}.github.io/${repo}`;
    basePath = basePath || `/${repo}/`;
  } else {
    siteUrl = "https://axiom-ui.dev";
    basePath = basePath || "/";
  }
}

if (!basePath) {
  try {
    const parsed = new URL(siteUrl.includes("://") ? siteUrl : `https://${siteUrl}`);
    basePath = parsed.pathname && parsed.pathname !== "/" ? `${parsed.pathname.replace(/\/$/, "")}/` : "/";
    siteUrl = `${parsed.origin}${parsed.pathname === "/" ? "" : parsed.pathname}`.replace(/\/$/, "");
  } catch {
    basePath = "/";
  }
}

if (basePath !== "/" && !basePath.startsWith("/")) basePath = `/${basePath}`;
if (basePath !== "/" && !basePath.endsWith("/")) basePath += "/";

if (!domain) {
  try {
    const host = new URL(siteUrl.includes("://") ? siteUrl : `https://${siteUrl}`).hostname;
    if (host && !host.endsWith(".github.io") && host !== "github.io") {
      domain = host;
    }
  } catch {
    domain = "";
  }
}

const lines = [
  `site_url=${siteUrl}`,
  `base_path=${basePath}`,
  `site_domain=${domain}`,
];

for (const line of lines) console.log(line);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `${lines.join("\n")}\n`);
}
