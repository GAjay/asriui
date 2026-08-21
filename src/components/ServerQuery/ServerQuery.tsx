import { Button } from "../Button";
import { Loader } from "../Loader";
import { cn } from "../../utils/cn";
import type { ServerQueryProps } from "./ServerQuery.types";
import { useServerQuery } from "./useServerQuery";
import styles from "./ServerQuery.module.css";

function DefaultLoading() {
  return <Loader variant="dots" size="sm" label="Loading data" showLabel />;
}

function DefaultError({ error, refetch }: { error: Error; refetch: () => void }) {
  return (
    <div className={styles.fallback} role="alert">
      <p className={styles.errorTitle}>Could not load data</p>
      <p className={styles.errorMessage}>{error.message}</p>
      <Button size="sm" variant="outline" onClick={refetch}>
        Try again
      </Button>
    </div>
  );
}

/**
 * Fetches server data and renders children when ready — loading and error states built in.
 */
export function ServerQuery<T>({
  query,
  queryKey,
  enabled,
  initialData,
  onSuccess,
  onError,
  className,
  loading,
  error,
  renderStatus,
  children,
}: ServerQueryProps<T>) {
  const result = useServerQuery<T>({
    query,
    queryKey,
    enabled,
    initialData,
    onSuccess,
    onError,
  });

  if (renderStatus) {
    return <div className={cn(styles.root, className)}>{renderStatus(result)}</div>;
  }

  if (result.isLoading && result.data === undefined) {
    return <div className={cn(styles.root, className)}>{loading ?? <DefaultLoading />}</div>;
  }

  if (result.isError && result.data === undefined) {
    const errorNode =
      typeof error === "function"
        ? error(result.error ?? new Error("Request failed"), result.refetch)
        : (error ?? <DefaultError error={result.error ?? new Error("Request failed")} refetch={result.refetch} />);

    return <div className={cn(styles.root, className)}>{errorNode}</div>;
  }

  if (result.data !== undefined && children) {
    return (
      <div className={cn(styles.root, className)}>
        {children(result.data, { refetch: result.refetch })}
      </div>
    );
  }

  return null;
}

ServerQuery.displayName = "ServerQuery";
