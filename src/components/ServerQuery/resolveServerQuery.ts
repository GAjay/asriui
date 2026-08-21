import type { DatabaseConfig, DatabaseNamedQuery, DatabaseQueryRequest } from "../../config/database.types";
import type { ServerQueryInput } from "./ServerQuery.types";

function joinUrl(base: string, path: string) {
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function isAbsoluteUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

function requestInit(database: DatabaseConfig, init?: RequestInit): RequestInit {
  return {
    credentials: database.credentials ?? "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...database.headers,
      ...init?.headers,
    },
    ...init,
  };
}

export async function executeDatabaseQuery<T>(
  database: DatabaseConfig,
  request: DatabaseQueryRequest,
): Promise<T> {
  if (!database.baseUrl) {
    throw new Error(
      "[axiom-ui] database.baseUrl is required for direct SQL queries. Set it on AxiomProvider config.",
    );
  }

  const endpoint = database.queryEndpoint ?? "/query";
  const url = joinUrl(database.baseUrl, endpoint);

  return fetchJson<T>(
    url,
    requestInit(database, {
      method: "POST",
      body: JSON.stringify(request),
    }),
  );
}

function resolveNamedQuery(
  database: DatabaseConfig,
  key: string,
  params?: Record<string, unknown>,
): () => Promise<unknown> {
  const definition = database.queries?.[key];
  if (!definition) {
    throw new Error(`[axiom-ui] Unknown database query key "${key}". Add it to config.database.queries.`);
  }

  if (typeof definition === "string") {
    if (isAbsoluteUrl(definition) || definition.startsWith("/")) {
      const url = definition.startsWith("/") && database.baseUrl ? joinUrl(database.baseUrl, definition) : definition;
      return () => fetchJson(url, requestInit(database));
    }

    return () => executeDatabaseQuery(database, { sql: definition, params });
  }

  return resolveNamedQueryObject(database, definition, params);
}

function resolveNamedQueryObject(
  database: DatabaseConfig,
  definition: DatabaseNamedQuery,
  params?: Record<string, unknown>,
) {
  if (definition.sql) {
    return () => executeDatabaseQuery(database, { sql: definition.sql!, params });
  }

  if (definition.path) {
    const url = database.baseUrl
      ? joinUrl(database.baseUrl, definition.path)
      : definition.path.startsWith("/")
        ? definition.path
        : `/${definition.path}`;

    const method = definition.method ?? "GET";
    return () =>
      fetchJson(
        url,
        requestInit(database, {
          method,
          body: method === "POST" ? JSON.stringify({ params }) : undefined,
        }),
      );
  }

  throw new Error("[axiom-ui] Named database query must include sql or path.");
}

export function resolveServerQueryFn<T>(
  query: ServerQueryInput<T>,
  database?: DatabaseConfig,
): () => Promise<T> {
  if (typeof query === "function") {
    return query;
  }

  if (typeof query === "object" && query !== null) {
    if ("sql" in query) {
      const request = query as DatabaseQueryRequest;
      return () => {
        if (!database?.baseUrl) {
          throw new Error(
            "[axiom-ui] database.baseUrl is required for SQL queries. Set it on AxiomProvider config.",
          );
        }
        return executeDatabaseQuery<T>(database, request);
      };
    }

    if ("key" in query) {
      const keyed = query as { key: string; params?: Record<string, unknown> };
      if (!database) {
        throw new Error(
          `[axiom-ui] database config is required for query key "${keyed.key}". Set config.database on AxiomProvider.`,
        );
      }
      return resolveNamedQuery(database, keyed.key, keyed.params) as () => Promise<T>;
    }
  }

  if (typeof query === "string") {
    if (query.startsWith("sql:")) {
      const sql = query.slice(4).trim();
      return () => {
        if (!database?.baseUrl) {
          throw new Error("[axiom-ui] database.baseUrl is required for sql: queries.");
        }
        return executeDatabaseQuery<T>(database, { sql });
      };
    }

    if (database?.queries?.[query]) {
      return resolveNamedQuery(database, query) as () => Promise<T>;
    }

    if (isAbsoluteUrl(query) || query.startsWith("/")) {
      const url =
        query.startsWith("/") && database?.baseUrl ? joinUrl(database.baseUrl, query) : query;
      return () => fetchJson<T>(url, requestInit(database ?? {}));
    }

    if (database?.baseUrl) {
      return () => fetchJson<T>(joinUrl(database.baseUrl!, query), requestInit(database));
    }

    return () => fetchJson<T>(query);
  }

  throw new Error("[axiom-ui] Invalid ServerQuery input.");
}
