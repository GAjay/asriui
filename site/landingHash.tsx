import type { MouseEvent, ReactNode } from "react";
import { useEffect } from "react";
import { useHref, useLocation } from "react-router-dom";

/** Normalize a landing hash (`features` or `#features`) to the DOM id. */
export function landingSectionId(hash: string) {
  return hash.replace(/^#/, "");
}

export function scrollToLandingSection(id: string, behavior: ScrollBehavior = "smooth") {
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({ behavior, block: "start" });
  return true;
}

/** When `/#section-id` is opened, scroll after the landing sections mount. */
export function useLandingHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    const id = landingSectionId(hash);
    if (!id) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    let attempts = 0;
    let timer = 0;

    const tryScroll = () => {
      if (scrollToLandingSection(id, "auto")) return;
      if (attempts >= 20) return;
      attempts += 1;
      timer = window.setTimeout(tryScroll, 50);
    };

    tryScroll();
    return () => window.clearTimeout(timer);
  }, [hash]);
}

type LandingHashLinkProps = {
  hash: string;
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

/** In-page `#id` on home; basename-safe `/#id` from other routes. */
export function LandingHashLink({ hash, className, children, onClick }: LandingHashLinkProps) {
  const { pathname } = useLocation();
  const id = landingSectionId(hash);
  const routedHref = useHref({ pathname: "/", hash: `#${id}` });
  const href = pathname === "/" ? `#${id}` : routedHref;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (pathname !== "/") return;
    if (scrollToLandingSection(id)) {
      event.preventDefault();
      window.history.replaceState(null, "", `#${id}`);
    }
  }

  return (
    <a className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
