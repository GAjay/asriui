import { lazy, Suspense, useState } from "react";
import { cn } from "../../utils/cn";
import type { MonacoEditorProps } from "./MonacoEditor.types";
import styles from "./MonacoEditor.module.css";

const LazyEditor = lazy(() => import("@monaco-editor/react"));

/**
 * Lazy-loaded Monaco code editor — plug-and-play with JSON/TS editing.
 */
export function MonacoEditor({
  language = "json",
  value,
  defaultValue = "",
  onChange,
  height = "320px",
  theme = "vs-dark",
  readOnly = false,
  className,
  options,
}: MonacoEditorProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const editorValue = value ?? uncontrolled;

  return (
    <div className={cn(styles.shell, className)}>
      <Suspense fallback={<div className={styles.fallback}>Loading editor…</div>}>
        <LazyEditor
          height={height}
          language={language}
          theme={theme}
          value={editorValue}
          onChange={(next) => {
            const val = next ?? "";
            if (value === undefined) setUncontrolled(val);
            onChange?.(val);
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            readOnly,
            scrollBeyondLastLine: false,
            ...options,
          }}
        />
      </Suspense>
    </div>
  );
}

MonacoEditor.displayName = "MonacoEditor";
