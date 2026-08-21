import type { ComponentDoc } from "./types";
import { getComponentMeta } from "./registry";

/** Loads examples on demand so the landing page does not bundle doc previews. */
export async function loadComponentDoc(slug: string): Promise<ComponentDoc | undefined> {
  const meta = getComponentMeta(slug);
  if (!meta) return undefined;
  const { getExamples } = await import("./examples");
  return { ...meta, examples: getExamples(slug) };
}
