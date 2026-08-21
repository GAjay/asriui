import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAxiomConfigOptional } from "../../config/AxiomContext";
import type { DatabaseConfig, DatabaseQueryRequest } from "../../config/database.types";
import { executeDatabaseQuery, resolveServerQueryFn } from "./resolveServerQuery";
import type { ServerQueryResult, ServerQueryStatus, UseServerQueryOptions } from "./ServerQuery.types";

function toError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

export function useServerQuery<T>({
  query,
  queryKey,
  enabled = true,
  initialData,
  onSuccess,
  onError,
}: UseServerQueryOptions<T>): ServerQueryResult<T> {
  const axiomConfig = useAxiomConfigOptional();
  const database = axiomConfig?.database;

  const [status, setStatus] = useState<ServerQueryStatus>(initialData !== undefined ? "success" : "idle");
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [fetchId, setFetchId] = useState(0);

  const queryFn = useMemo(() => resolveServerQueryFn(query, database), [database, query]);
  const serializedKey = useMemo(() => JSON.stringify(queryKey ?? null), [queryKey]);

  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  const refetch = useCallback(() => {
    setFetchId((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setStatus(initialData !== undefined ? "success" : "idle");
      return;
    }

    let cancelled = false;
    setStatus("loading");
    setError(null);

    void queryFn()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setStatus("success");
        onSuccessRef.current?.(result);
      })
      .catch((reason) => {
        if (cancelled) return;
        const nextError = toError(reason);
        setError(nextError);
        setStatus("error");
        onErrorRef.current?.(nextError);
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, fetchId, initialData, queryFn, serializedKey]);

  return {
    data,
    error,
    status,
    isIdle: status === "idle",
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    refetch,
  };
}

/** Run a one-off SQL query using AxiomProvider database config. */
export function useAxiomDatabase() {
  const database = useAxiomConfigOptional()?.database;

  const executeQuery = useCallback(
    <T,>(request: DatabaseQueryRequest) => {
      if (!database?.baseUrl) {
        throw new Error("[axiom-ui] database.baseUrl is required. Set config.database on AxiomProvider.");
      }
      return executeDatabaseQuery<T>(database, request);
    },
    [database],
  );

  return {
    database: database as DatabaseConfig | undefined,
    executeQuery,
    isConfigured: Boolean(database?.baseUrl),
  };
}
