import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Reset scroll position when navigating docs routes; honor in-page hash links. */
export function useDocsScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const scrollToHash = () => {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
      };
      requestAnimationFrame(scrollToHash);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);
}
