#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const SITE_URL = (process.env.VITE_SITE_URL || process.env.SITE_URL || "https://gajay.github.io/asriui").replace(
  /\/$/,
  "",
);

const DOC_GUIDES = [
  "getting-started",
  "styling",
  "theme",
  "typography",
  "tokens",
  "branding",
  "templates",
  "roadmap",
  "releases",
];

const TEMPLATE_SLUGS = [
  "watch-landing",
  "about",
  "contact",
  "pricing",
  "dashboard",
  "analytics",
  "billing",
  "team",
  "login",
  "onboarding",
  "shop",
  "cart",
  "checkout",
  "settings",
  "inbox",
  "json-page",
  "ai-workflow",
  "ai-orchestrator",
];

function urlEntry(loc, priority, changefreq = "weekly") {
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function main() {
  const registryPath = resolve(root, "site/docs/registry.ts");
  const registry = await readFile(registryPath, "utf8");
  const componentSlugs = [...registry.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);

  const urls = [
    urlEntry(`${SITE_URL}/`, "1.0"),
    urlEntry(`${SITE_URL}/about`, "0.8"),
    urlEntry(`${SITE_URL}/llms.txt`, "0.3", "monthly"),
    ...DOC_GUIDES.map((slug) =>
      urlEntry(`${SITE_URL}/docs/${slug}`, slug === "getting-started" ? "0.9" : "0.75"),
    ),
    ...componentSlugs.map((slug) => urlEntry(`${SITE_URL}/docs/components/${slug}`, "0.7")),
    urlEntry(`${SITE_URL}/templates`, "0.8", "monthly"),
    ...TEMPLATE_SLUGS.map((slug) => urlEntry(`${SITE_URL}/templates/${slug}`, "0.65", "monthly")),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  await writeFile(resolve(root, "public/sitemap.xml"), xml, "utf8");

  try {
    await writeFile(resolve(root, "site-dist/sitemap.xml"), xml, "utf8");
  } catch {
    // site-dist may not exist before first build
  }

  console.log(`Wrote sitemap with ${urls.length} URLs → public/sitemap.xml`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
