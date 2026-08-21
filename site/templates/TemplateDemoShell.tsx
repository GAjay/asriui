import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

/** Demo content wrapper — navigation lives in TemplatesLayout via TemplateDemoNav. */
export function TemplateDemoShell({ children }: Props) {
  return <>{children}</>;
}
