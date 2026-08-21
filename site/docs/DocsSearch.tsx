import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { filterDocsSearch, getDocsSearchIndex } from "./docsSearchIndex";
import styles from "./DocsSearch.module.css";

type Props = {
  className?: string;
};

function useResultsPosition(anchorRef: React.RefObject<HTMLElement | null>, open: boolean) {
  const [position, setPosition] = useState<CSSProperties>({});

  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return undefined;

    const update = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPosition({
        position: "fixed",
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
        zIndex: 1200,
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [anchorRef, open]);

  return position;
}

export function DocsSearch({ className }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inputId = useId();
  const listId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [open, setOpen] = useState(false);

  const index = useMemo(() => getDocsSearchIndex(), []);
  const trimmedQuery = query.trim();
  const results = useMemo(
    () => filterDocsSearch(trimmedQuery, index).slice(0, 8),
    [index, trimmedQuery],
  );
  const showResults = open && trimmedQuery.length > 0;
  const resultsStyle = useResultsPosition(formRef, showResults);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (formRef.current?.contains(target)) return;
      const panel = document.getElementById(listId);
      if (panel?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [listId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const goTo = (href: string) => {
    setOpen(false);
    setQuery("");
    navigate(href);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const first = results[0];
    if (first) goTo(first.href);
  };

  const resultsPanel =
    showResults && typeof document !== "undefined"
      ? createPortal(
          <div
            id={listId}
            className={styles.results}
            style={resultsStyle}
            role="listbox"
            aria-label="Search results"
          >
            {results.length === 0 ? (
              <p className={styles.empty}>No matches for “{trimmedQuery}”.</p>
            ) : (
              results.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={false}
                  className={styles.result}
                  onClick={() => goTo(item.href)}
                >
                  <span className={styles.resultTitle}>{item.title}</span>
                  <span className={styles.resultMeta}>
                    {item.kind === "guide" ? "Guide" : item.kind === "template" ? "Template" : "Component"} · {item.subtitle}
                  </span>
                </button>
              ))
            )}
          </div>,
          document.body,
        )
      : null;

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} data-open={showResults || undefined}>
      <form ref={formRef} className={styles.form} role="search" onSubmit={onSubmit}>
        <label className={styles.srOnly} htmlFor={inputId}>
          Search documentation
        </label>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          id={inputId}
          className={styles.input}
          type="search"
          placeholder="Search docs..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          role="combobox"
          aria-controls={listId}
          aria-expanded={showResults}
          aria-autocomplete="list"
          autoComplete="off"
          enterKeyHint="search"
        />
      </form>
      {resultsPanel}
    </div>
  );
}
