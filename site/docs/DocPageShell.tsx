import type { ReactNode } from "react";
import { PageLayout } from "axiom-ui";
import { cn } from "../../src/utils/cn";
import { BackToTop } from "./BackToTop";
import { useTocScrollSpy } from "./useTocScrollSpy";
import styles from "./DocPageShell.module.css";

export type TocItem = {
  id: string;
  label: string;
};

type Props = {
  children: ReactNode;
  toc: TocItem[];
};

export function DocPageShell({ children, toc }: Props) {
  const sectionIds = toc.map((item) => item.id);
  const activeId = useTocScrollSpy(sectionIds);

  return (
    <>
      <PageLayout.Content maxWidth="48rem" className={styles.content}>
        {children}
      </PageLayout.Content>
      {toc.length > 0 ? (
        <PageLayout.Aside className={styles.toc} aria-label="On this page">
          <p className={styles.tocLabel}>On this page</p>
          <nav>
            <ul className={styles.tocList}>
              {toc.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <a
                      className={cn(styles.tocLink, isActive && styles.tocLinkActive)}
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </PageLayout.Aside>
      ) : null}
      <BackToTop />
    </>
  );
}
