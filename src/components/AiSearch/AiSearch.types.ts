import type { HTMLAttributes } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type AiSearchItem = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  href?: string;
};

export type AiSearchResult = {
  item: AiSearchItem;
  score: number;
  snippet?: string;
};

export type AiSearchClassNames = SlotClassNames<"root" | "query" | "results">;

export interface AiSearchProps extends Omit<HTMLAttributes<HTMLDivElement>, "results"> {
  query: string;
  onQueryChange?: (value: string) => void;
  /** Corpus to search (controlled results still use `results` prop). */
  items?: AiSearchItem[];
  results?: AiSearchResult[];
  onSearch?: (query: string, items: AiSearchItem[]) => void | Promise<void>;
  loading?: boolean;
  demo?: boolean;
  queryLabel?: string;
  queryPlaceholder?: string;
  actionLabel?: string;
  emptyLabel?: string;
  classNames?: AiSearchClassNames;
}
