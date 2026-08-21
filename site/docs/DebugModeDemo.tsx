import { useState } from "react";
import { ErrorBoundary, Button, Badge } from "asriui";
import { useAsriUIDebug } from "../../src/config";
import styles from "./DebugModeDemo.module.css";

function BrokenPreview(): never {
  throw new Error("Render crash — caught by ErrorBoundary");
}

export function DebugModeDemo() {
  const debug = useAsriUIDebug();
  const [crash, setCrash] = useState(false);
  const [logs, setLogs] = useState(() => debug.getLogs());

  const refresh = () => setLogs(debug.getLogs());

  if (!debug.enabled) {
    return (
      <div className={styles.shell}>
        <p className={styles.note}>
          Debug mode is off. Set <code>debug: true</code> on <code>AsriUIProvider</code> (this docs
          site enables it automatically in development).
        </p>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <div className={styles.toolbar}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            debug.logError(new Error("Manual debug error from docs demo"));
            refresh();
          }}
        >
          Log manual error
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setCrash(true);
            refresh();
          }}
        >
          Trigger render error
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            debug.clearLogs();
            setCrash(false);
            refresh();
          }}
        >
          Clear logs
        </Button>
      </div>

      <div className={styles.grid}>
        <div className={styles.panel}>
          <p className={styles.panelLabel}>What you will see</p>
          <ul className={styles.list}>
            <li>Toast notification with the error message</li>
            <li>
              Collapsed console group: <code>[AsriUI Debug] …</code>
            </li>
            <li>ErrorBoundary fallback with stack trace when debug is on</li>
            <li>In-memory log entries via <code>useAsriUIDebug().getLogs()</code></li>
          </ul>
        </div>

        <div className={styles.panel}>
          <p className={styles.panelLabel}>Live boundary</p>
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <div className={styles.fallback}>
                <Badge variant="destructive">ErrorBoundary</Badge>
                <p className={styles.fallbackTitle}>{error.message}</p>
                {error.stack ? <pre className={styles.stack}>{error.stack}</pre> : null}
                <Button
                  size="sm"
                  onClick={() => {
                    setCrash(false);
                    reset();
                    refresh();
                  }}
                >
                  Reset preview
                </Button>
              </div>
            )}
          >
            {crash ? <BrokenPreview /> : <p className={styles.ok}>No errors — preview is healthy.</p>}
          </ErrorBoundary>
        </div>
      </div>

      <div className={styles.logs}>
        <div className={styles.logsHead}>
          <p className={styles.panelLabel}>Captured logs</p>
          <Badge variant="secondary">{logs.length}</Badge>
        </div>
        {logs.length ? (
          <ul className={styles.logList}>
            {logs.slice(0, 4).map((entry) => (
              <li key={entry.id} className={styles.logItem}>
                <span className={styles.logSource}>{entry.source}</span>
                <strong>{entry.message}</strong>
                <span className={styles.logMeta}>{new Date(entry.timestamp).toLocaleTimeString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>Trigger an error above to populate the debug log.</p>
        )}
      </div>
    </div>
  );
}
