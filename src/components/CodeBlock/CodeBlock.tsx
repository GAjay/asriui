import { forwardRef, useCallback, useMemo, useState } from "react";
import { cn } from "../../utils/cn";
import type { CodeBlockProps } from "./CodeBlock.types";
import { tokenizeCode } from "./highlight";
import styles from "./CodeBlock.module.css";

/**
 * VS Code-style code block with lightweight syntax highlighting.
 * Black editor background with colored tokens — zero dependencies.
 */
export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(function CodeBlock(
  {
    code,
    language = "tsx",
    showCopy = false,
    filename,
    lineNumbers = false,
    className,
    ...rest
  },
  ref,
) {
  const [copied, setCopied] = useState(false);
  const tokens = useMemo(() => tokenizeCode(code, language), [code, language]);
  const lines = useMemo(() => code.split("\n"), [code]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  }, [code]);

  const highlighted = (
    <code className={styles.code}>
      {tokens.map((token, index) => (
        <span key={`${index}-${token.value}`} className={styles[token.type]}>
          {token.value}
        </span>
      ))}
    </code>
  );

  const showToolbar = showCopy || filename;

  return (
    <div className={cn(styles.root, className)}>
      {showToolbar ? (
        <div className={styles.toolbar}>
          {filename ? <span className={styles.filename}>{filename}</span> : <span />}
          {showCopy ? (
            <button type="button" className={styles.copyBtn} onClick={handleCopy}>
              {copied ? "Copied" : "Copy"}
            </button>
          ) : null}
        </div>
      ) : null}

      {lineNumbers ? (
        <div className={styles.withLines}>
          <ol className={styles.lineNumbers} aria-hidden="true">
            {lines.map((_, i) => (
              <li key={i}>{i + 1}</li>
            ))}
          </ol>
          <div className={styles.codeCol}>{highlighted}</div>
        </div>
      ) : (
        <pre ref={ref} className={styles.pre} {...rest}>
          {highlighted}
        </pre>
      )}
    </div>
  );
});

CodeBlock.displayName = "CodeBlock";
