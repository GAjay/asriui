type ScriptContext = {
  config: Record<string, string>;
  node: {
    kind: string;
    label: string;
    blockId?: string;
    componentSlug?: string;
  };
};

const DEFAULT_SCRIPT = "return input;";

/** Execute a user-authored block script against incoming workflow data. */
export function executeBlockScript(script: string, input: unknown, context: ScriptContext): unknown {
  const source = script.trim() || DEFAULT_SCRIPT;
  const runner = new Function("input", "context", `"use strict";\n${source}`);
  return runner(input, context);
}

export const BLOCK_SCRIPT_PLACEHOLDER = `// input = data from upstream nodes
// context.config = this block's config
// return the value passed to downstream nodes
return input;`;
