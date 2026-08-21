import type { CodeLanguage, CodeToken, CodeTokenType } from "./CodeBlock.types";

const KEYWORDS = new Set([
  "import",
  "export",
  "from",
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "type",
  "interface",
  "extends",
  "default",
  "async",
  "await",
  "new",
  "true",
  "false",
  "null",
  "undefined",
  "as",
  "typeof",
]);

type Rule = { type: CodeTokenType; pattern: RegExp };

const RULES: Rule[] = [
  { type: "comment", pattern: /^\/\/[^\n]*/ },
  { type: "comment", pattern: /^\/\*[\s\S]*?\*\// },
  { type: "string", pattern: /^"(?:\\.|[^"\\])*"/ },
  { type: "string", pattern: /^'(?:\\.|[^'\\])*'/ },
  { type: "string", pattern: /^`(?:\\.|[^`\\])*`/ },
  { type: "tag", pattern: /^<\/?[A-Za-z][\w.-]*/ },
  { type: "attr", pattern: /^[a-zA-Z_][\w-]*(?==)/ },
  { type: "number", pattern: /^\d+\.?\d*/ },
  { type: "operator", pattern: /^[{}()[\];,.<>=/]+/ },
  { type: "plain", pattern: /^[^\s"'`/<>{}\][();,.=]+/ },
  { type: "plain", pattern: /^\s+/ },
];

function classifyWord(word: string, language: CodeLanguage): CodeTokenType {
  if (KEYWORDS.has(word)) return "keyword";
  if (language === "json" && /^"[^"]+"$/.test(word)) return "string";
  if (/^[A-Z]/.test(word)) return "function";
  return "plain";
}

/** Lightweight tokenizer for VS Code-style syntax colors. No external deps. */
export function tokenizeCode(code: string, language: CodeLanguage = "tsx"): CodeToken[] {
  const tokens: CodeToken[] = [];
  let i = 0;

  while (i < code.length) {
    const rest = code.slice(i);
    let matched = false;

    for (const rule of RULES) {
      const match = rest.match(rule.pattern);
      if (!match) continue;

      const type = rule.type;
      const value = match[0];

      if (type === "plain" && /^\s+$/.test(value)) {
        tokens.push({ type: "plain", value });
      } else if (type === "plain") {
        tokens.push({ type: classifyWord(value, language), value });
      } else {
        tokens.push({ type, value });
      }

      i += value.length;
      matched = true;
      break;
    }

    if (!matched) {
      tokens.push({ type: "plain", value: code[i] ?? "" });
      i += 1;
    }
  }

  return tokens;
}
