#!/usr/bin/env node
/**
 * Prepare site-dist for GitHub Pages or any static host:
 * - .nojekyll so GitHub does not run Jekyll
 * - 404.html SPA fallback for client-side routes
 * - CNAME when SITE_DOMAIN is set (custom domain)
 * - robots.txt sitemap URL aligned with VITE_SITE_URL
 */
import { copyFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = resolve(root, "site-dist");
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || "https://axiom-ui.dev").replace(
  /\/$/,
  "",
);
const domain = (process.env.SITE_DOMAIN || "").replace(/^https?:\/\//, "").replace(/\/$/, "");

async function main() {
  try {
    await writeFile(resolve(dist, ".nojekyll"), "", "utf8");
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      console.log("site-dist not found; skip GitHub Pages prep");
      return;
    }
    throw error;
  }

  await copyFile(resolve(dist, "index.html"), resolve(dist, "404.html"));

  if (domain && !domain.endsWith(".github.io")) {
    await writeFile(resolve(dist, "CNAME"), `${domain}\n`, "utf8");
    console.log(`Wrote CNAME → ${domain}`);
  }

  try {
    const robotsPath = resolve(dist, "robots.txt");
    let robots = await readFile(robotsPath, "utf8");
    robots = robots.replace(/Sitemap:\s+\S+/i, `Sitemap: ${siteUrl}/sitemap.xml`);
    if (!/Sitemap:/i.test(robots)) {
      robots = `${robots.trim()}\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
    }
    await writeFile(robotsPath, robots, "utf8");
  } catch {
    await writeFile(resolve(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`, "utf8");
  }

  console.log("Prepared site-dist for GitHub Pages (404.html, .nojekyll)");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
