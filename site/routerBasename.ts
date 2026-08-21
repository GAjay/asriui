/** React Router basename (`undefined` when the app is served from `/`). */
export function getRouterBasename(): string | undefined {
  const base = import.meta.env.BASE_URL;
  if (!base || base === "/") return undefined;
  return base.replace(/\/$/, "");
}
