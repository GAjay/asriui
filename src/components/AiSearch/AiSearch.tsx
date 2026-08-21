import { useCallback, useState } from "react";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { demoSemanticSearch } from "../AiTools/demoNlp";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Loader } from "../Loader";
import type { AiSearchProps } from "./AiSearch.types";
import shared from "../AiTools/AiTools.module.css";
import styles from "./AiSearch.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<"root" | "query" | "results">();

export function AiSearch({
  query,
  onQueryChange,
  items = [],
  results: resultsProp,
  onSearch,
  loading: loadingProp,
  demo = true,
  queryLabel = "Search in natural language",
  queryPlaceholder = "e.g. How do I add dark mode to forms?",
  actionLabel = "Search",
  emptyLabel = "No semantic matches yet.",
  className,
  classNames,
  ...rest
}: AiSearchProps) {
  const [internalResults, setInternalResults] = useState(resultsProp ?? []);
  const [internalLoading, setInternalLoading] = useState(false);
  const results = resultsProp ?? internalResults;
  const loading = loadingProp ?? internalLoading;

  const run = useCallback(async () => {
    if (!query.trim()) return;
    setInternalLoading(true);
    try {
      if (onSearch) {
        await onSearch(query, items);
      } else if (demo) {
        setInternalResults(demoSemanticSearch(query, items));
      }
    } finally {
      setInternalLoading(false);
    }
  }, [demo, items, onSearch, query]);

  return (
    <SlotClassNamesProvider classNames={classNames}>
      <div
        className={cn(shared.panel, styles.root, useSlotClassName("root"), className)}
        role="search"
        aria-label="AI semantic search"
        {...rest}
      >
        <label className={shared.title} htmlFor="ai-search-query">{queryLabel}</label>
        <div className={shared.promptRow}>
          <input
            id="ai-search-query"
            className={cn(shared.promptInput, useSlotClassName("query"))}
            value={query}
            onChange={(event) => onQueryChange?.(event.target.value)}
            placeholder={queryPlaceholder}
            onKeyDown={(event) => {
              if (event.key === "Enter") void run();
            }}
          />
          <Button onClick={() => void run()} disabled={loading || !query.trim()} loading={loading}>
            {actionLabel}
          </Button>
        </div>
        {loading ? <Loader size="sm" label="Searching" /> : null}

        <ul className={cn(shared.resultList, useSlotClassName("results"))} aria-live="polite">
          {results.length
            ? results.map((entry) => (
                <li key={entry.item.id} className={shared.resultItem}>
                  <div className={styles.resultTitleRow}>
                    {entry.item.href ? (
                      <a href={entry.item.href} className={styles.resultLink}>{entry.item.title}</a>
                    ) : (
                      <strong>{entry.item.title}</strong>
                    )}
                    <span className={shared.score}>{Math.round(entry.score * 100)}% match</span>
                  </div>
                  {entry.snippet ? <p className={styles.snippet}>{entry.snippet}</p> : null}
                  {entry.item.tags?.length ? (
                    <div className={styles.tags}>
                      {entry.item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))
            : (
              <li className={shared.empty}>{emptyLabel}</li>
            )}
        </ul>
      </div>
    </SlotClassNamesProvider>
  );
}
