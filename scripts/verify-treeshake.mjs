import { build } from "esbuild";
import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const fixtures = resolve(root, "scripts/fixtures");

const cases = [
  {
    name: "barrel Button only",
    entry: resolve(fixtures, "barrel-button.tsx"),
    mustNotInclude: ["ListItem", "Workspace settings", "Card.Title"],
  },
  {
    name: "subpath button",
    entry: resolve(fixtures, "subpath-button.tsx"),
    mustNotInclude: ["ListItem", "ListItem.js", "Input.js", "Card.js"],
  },
  {
    name: "subpath list-item",
    entry: resolve(fixtures, "subpath-list-item.tsx"),
    mustNotInclude: ["Button.js", "Saving...", "Card.js"],
  },
];

async function bundle(entry, outfile) {
  await mkdir(dirname(outfile), { recursive: true });
  await build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    format: "esm",
    platform: "browser",
    packages: "external",
    jsx: "automatic",
    logLevel: "silent",
  });
}

let failed = false;

for (const testCase of cases) {
  const outfile = resolve(root, `.tmp-treeshake/${testCase.name.replace(/\s+/g, "-")}.js`);
  await bundle(testCase.entry, outfile);
  const output = await readFile(outfile, "utf8");

  let caseFailed = false;
  for (const needle of testCase.mustNotInclude) {
    if (output.includes(needle)) {
      console.error(`✗ ${testCase.name}: output unexpectedly includes "${needle}"`);
      caseFailed = true;
      failed = true;
    }
  }

  if (!caseFailed) {
    console.log(`✓ ${testCase.name}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log("Tree-shake verification passed.");
