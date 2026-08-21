import { useEffect, useState } from "react";

const DEFAULT_OFFSET = 112;

/** Highlights the TOC entry for the section nearest the top of the viewport. */
export function useTocScrollSpy(sectionIds: string[], offset = DEFAULT_OFFSET) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const idsKey = sectionIds.join("|");

  useEffect(() => {
    const ids = idsKey ? idsKey.split("|") : [];
    if (!ids.length) {
      setActiveId("");
      return undefined;
    }

    const resolveActive = () => {
      let current = ids[0]!;
      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    setActiveId(ids[0]!);
    resolveActive();
    window.addEventListener("scroll", resolveActive, { passive: true });
    window.addEventListener("resize", resolveActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", resolveActive);
      window.removeEventListener("resize", resolveActive);
    };
  }, [idsKey, offset]);

  return activeId;
}
