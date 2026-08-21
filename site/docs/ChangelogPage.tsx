import { Navigate } from "react-router-dom";

/** @deprecated Use ReleasesPage at /docs/releases */
export function ChangelogPage() {
  return <Navigate to="/docs/releases" replace />;
}
