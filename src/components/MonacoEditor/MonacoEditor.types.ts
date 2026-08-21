/**
 * Props for the {@link MonacoEditor} code editor.
 *
 * Lazy-loads the Monaco editor bundle on first render. Requires
 * `@monaco-editor/react` as a peer dependency.
 *
 * @example
 * ```tsx
 * <MonacoEditor
 *   language="json"
 *   defaultValue='{"theme":"light"}'
 *   onChange={setConfig}
 *   height={400}
 * />
 * ```
 */
export type MonacoEditorProps = {
  /**
   * Monaco language identifier (e.g. `"json"`, `"typescript"`, `"css"`).
   * @default "json"
   */
  language?: string;
  /** Controlled editor value. */
  value?: string;
  /** Initial value for uncontrolled usage. */
  defaultValue?: string;
  /** Called on every content change with the full editor string. */
  onChange?: (value: string) => void;
  /**
   * Editor container height.
   * @default "320px"
   */
  height?: string | number;
  /**
   * Monaco color theme.
   * @default "vs-dark"
   */
  theme?: "vs-dark" | "light";
  /**
   * Prevents editing when true.
   * @default false
   */
  readOnly?: boolean;
  /** CSS class on the editor shell wrapper. */
  className?: string;
  /** Passthrough Monaco `IStandaloneEditorConstructionOptions`. */
  options?: Record<string, unknown>;
};
