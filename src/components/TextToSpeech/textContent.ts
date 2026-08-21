import { isValidElement, type ReactNode } from "react";

/** Extract speakable plain text from React children. */
export function getTextContent(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (isValidElement(node)) return getTextContent(node.props.children);
  return "";
}
