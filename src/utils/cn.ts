/**
 * Joins class names, filtering out falsy values.
 * Intentionally minimal — no runtime dependency.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
