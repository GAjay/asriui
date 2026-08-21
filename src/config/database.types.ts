/** Database / server query configuration for AxiomProvider. */
export type DatabaseNamedQuery = {
  /** SQL sent to the query endpoint. */
  sql?: string;
  /** REST path relative to baseUrl (e.g. /users). */
  path?: string;
  /** HTTP method when using path. @default "GET" */
  method?: "GET" | "POST";
};

export type DatabaseConfig = {
  /** API base URL for queries (e.g. https://api.example.com). */
  baseUrl?: string;
  /** Direct SQL endpoint path. @default "/query" */
  queryEndpoint?: string;
  /**
   * Named queries — use as `query="users"` in ServerQuery.
   * Value can be a SQL string, URL path, or `{ sql, path, method }`.
   */
  queries?: Record<string, string | DatabaseNamedQuery>;
  /** Default request headers (e.g. Authorization). */
  headers?: Record<string, string>;
  /** Fetch credentials. @default "same-origin" */
  credentials?: RequestCredentials;
};

export type DatabaseQueryRequest = {
  sql: string;
  params?: Record<string, unknown>;
};

export type DatabaseQueryByKey = {
  key: string;
  params?: Record<string, unknown>;
};
