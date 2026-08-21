#!/usr/bin/env node
/**
 * Resolve the public site URL, Vite base path, and optional custom domain
 * for GitHub Pages / custom-domain deploys. Writes GitHub Actions outputs when
 * GITHUB_OUTPUT is set.
 *
 * Priority:
 * 1. Repository variables (SITE_URL, SITE_DOMAIN, BASE_PATH)
 * 2. GitHub Pages metadata from actions/configure-pages (PAGES_*)
 * 3. Default project Pages URL for this repository
 */
import { appendFileSync } from "node:fs";

function isGitHubPagesHost(host) {
  return !host || host === "github.io" || host.endsWith(".github.io");
}

function isCustomDomainHost(host) {
  return host && !isGitHubPagesHost(host);
}

function normalizeBasePath(value) {
  if (!value || value === "/" || value === "") return "/";
  let path = value.startsWith("/") ? value : `/${value}`;
  if (!path.endsWith("/")) path += "/";
  return path;
}

function parseHost(value) {
  return (value || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
}

const owner = process.env.GITHUB_REPOSITORY_OWNER || "";
const repo = (process.env.GITHUB_REPOSITORY || "").split("/")[1] || "";

const hasExplicitUrl = !!(process.env.SITE_URL || process.env.VITE_SITE_URL);
const hasExplicitBase = !!(process.env.BASE_PATH || process.env.VITE_BASE_PATH);
const hasExplicitDomain = !!process.env.SITE_DOMAIN;

let siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || "").replace(/\/$/, "");
let basePath = process.env.BASE_PATH || process.env.VITE_BASE_PATH || "";
let domain = parseHost(process.env.SITE_DOMAIN);

const pagesBaseUrl = (process.env.PAGES_BASE_URL || "").replace(/\/$/, "");
const pagesBasePath = process.env.PAGES_BASE_PATH || "";
const pagesHost = parseHost(process.env.PAGES_HOST);

if (!domain && isCustomDomainHost(pagesHost)) {
  domain = pagesHost;
}

if (domain && !siteUrl) {
  siteUrl = `https://${domain}`;
}

if (!siteUrl && pagesBaseUrl && !hasExplicitUrl) {
  siteUrl = pagesBaseUrl;
}

if (!siteUrl) {
  if (repo && repo === `${owner}.github.io`) {
    siteUrl = `https://${owner}.github.io`;
    if (!hasExplicitBase) basePath = basePath || "/";
  } else if (owner && repo) {
    siteUrl = `https://${owner}.github.io/${repo}`;
    if (!hasExplicitBase) basePath = basePath || `/${repo}/`;
  } else {
    siteUrl = "https://asriui.dev";
    if (!hasExplicitBase) basePath = basePath || "/";
  }
}

if (!hasExplicitBase) {
  if (isCustomDomainHost(domain) || isCustomDomainHost(pagesHost)) {
    basePath = "/";
  } else if (pagesBasePath) {
    basePath = normalizeBasePath(pagesBasePath);
  } else if (!basePath) {
    try {
      const parsed = new URL(siteUrl.includes("://") ? siteUrl : `https://${siteUrl}`);
      basePath =
        parsed.pathname && parsed.pathname !== "/"
          ? normalizeBasePath(parsed.pathname)
          : "/";
      siteUrl = `${parsed.origin}${parsed.pathname === "/" ? "" : parsed.pathname}`.replace(/\/$/, "");
    } catch {
      basePath = "/";
    }
  }
}

basePath = normalizeBasePath(basePath);

if (!domain && siteUrl) {
  try {
    const host = new URL(siteUrl.includes("://") ? siteUrl : `https://${siteUrl}`).hostname;
    if (isCustomDomainHost(host)) {
      domain = host;
    }
  } catch {
    domain = "";
  }
}

const lines = [`site_url=${siteUrl}`, `base_path=${basePath}`, `site_domain=${domain}`];

for (const line of lines) console.log(line);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `${lines.join("\n")}\n`);
}
