import type { ReactNode } from "react";
import type { DatabaseQueryByKey, DatabaseQueryRequest } from "../../config/database.types";

export type ServerQueryStatus = "idle" | "loading" | "success" | "error";

export type ServerQueryFn<T> = () => Promise<T>;

export type ServerQueryInput<T> =
  | ServerQueryFn<T>
  | string
  | DatabaseQueryRequest
  | DatabaseQueryByKey;

export type ServerQueryResult<T> = {
  data: T | undefined;
  error: Error | null;
  status: ServerQueryStatus;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
};

export type UseServerQueryOptions<T> = {
  /**
   * Async function, URL, named query key (`"users"`), `sql:SELECT …`,
   * or `{ sql, params }` / `{ key, params }` when database is configured on AxiomProvider.
   */
  query: ServerQueryInput<T>;
  /** Refetch when this key changes. */
  queryKey?: unknown;
  /** Skip fetching when false. @default true */
  enabled?: boolean;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

export type ServerQueryProps<T> = UseServerQueryOptions<T> & {
  className?: string;
  /** Custom loading UI. Defaults to Loader. */
  loading?: ReactNode;
  /** Custom error UI. Receives error and refetch. */
  error?: ReactNode | ((error: Error, refetch: () => void) => ReactNode);
  /** Full control over every state. Overrides loading/error/children. */
  renderStatus?: (result: ServerQueryResult<T>) => ReactNode;
  /** Called with server data on success. */
  children?: (data: T, helpers: { refetch: () => void }) => ReactNode;
};
