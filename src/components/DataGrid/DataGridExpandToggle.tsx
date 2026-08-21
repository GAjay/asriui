import { cn } from "../../utils/cn";
import styles from "./DataGrid.module.css";

type Props = {
  expanded: boolean;
  onToggle: () => void;
  label?: string;
};

export function DataGridExpandToggle({ expanded, onToggle, label = "Toggle row details" }: Props) {
  return (
    <button
      type="button"
      className={styles.expandButton}
      aria-expanded={expanded}
      aria-label={label}
      onClick={onToggle}
    >
      <svg
        className={cn(styles.expandIcon, expanded && styles.expandIconOpen)}
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );
}
