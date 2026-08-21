import { useId } from "react";
import { cn } from "../../utils/cn";
import type { DataGridColumn, DataGridColumnEditor } from "./DataGrid.types";
import { getColumnEditorType } from "./DataGrid.features";
import styles from "./DataGrid.module.css";

type Props<T> = {
  column: DataGridColumn<T>;
  value: unknown;
  editable: boolean;
  error?: string;
  /** Use icon tooltip instead of inline message (for fixed-height virtual rows). */
  compactError?: boolean;
  onChange: (value: unknown) => void;
  onFocus?: () => void;
  onBlur: () => void;
  /** Fired after select value changes (discrete commit). */
  onCommit?: () => void;
};

function toInputValue(value: unknown) {
  if (value == null) return "";
  return String(value);
}

function CellErrorMessage({
  error,
  inputId,
  compact,
}: {
  error: string;
  inputId: string;
  compact: boolean;
}) {
  if (compact) {
    return (
      <>
        <span className={styles.cellErrorIcon} title={error} aria-label={error}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
        </span>
        <span id={`${inputId}-error`} className={styles.srOnly}>
          {error}
        </span>
      </>
    );
  }

  return (
    <span id={`${inputId}-error`} className={styles.cellError} role="alert">
      {error}
    </span>
  );
}

export function DataGridEditableCell<T>({
  column,
  value,
  editable,
  error,
  compactError = false,
  onChange,
  onFocus,
  onBlur,
  onCommit,
}: Props<T>) {
  const inputId = useId();
  const editor = getColumnEditorType(column) as DataGridColumnEditor | null;

  if (!editable || !editor) {
    return <span className={styles.cellValue}>{toInputValue(value) || "—"}</span>;
  }

  const common = {
    id: inputId,
    className: cn(styles.cellInput, error && styles.cellInputError),
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${inputId}-error` : undefined,
    onFocus,
    onBlur,
  };

  if (editor === "select") {
    return (
      <div className={styles.cellEditor}>
        <div className={styles.cellInputWrap}>
          <select
            {...common}
            value={toInputValue(value)}
            onChange={(event) => {
              onChange(event.target.value);
              onCommit?.();
            }}
          >
            <option value="">Select…</option>
            {(column.editor?.options ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && compactError ? (
            <CellErrorMessage error={error} inputId={inputId} compact />
          ) : null}
        </div>
        {error && !compactError ? (
          <CellErrorMessage error={error} inputId={inputId} compact={false} />
        ) : null}
      </div>
    );
  }

  return (
    <div className={styles.cellEditor}>
      <div className={styles.cellInputWrap}>
        <input
          {...common}
          type={editor === "number" ? "number" : editor === "email" ? "email" : "text"}
          value={toInputValue(value)}
          placeholder={column.editor?.placeholder}
          onChange={(event) =>
            onChange(editor === "number" ? event.target.valueAsNumber : event.target.value)
          }
        />
        {error && compactError ? (
          <CellErrorMessage error={error} inputId={inputId} compact />
        ) : null}
      </div>
      {error && !compactError ? (
        <CellErrorMessage error={error} inputId={inputId} compact={false} />
      ) : null}
    </div>
  );
}
