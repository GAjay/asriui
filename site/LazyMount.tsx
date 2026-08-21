import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyMountProps = {
  children: ReactNode;
  /** Reserve space before content mounts to limit layout shift. */
  minHeight?: number | string;
  /** IntersectionObserver root margin — load slightly before entering view. */
  rootMargin?: string;
  className?: string;
};

/**
 * Defers rendering children until the slot is near the viewport.
 * Keeps above-the-fold work small on the landing page.
 */
export function LazyMount({
  children,
  minHeight = "24rem",
  rootMargin = "280px 0px",
  className,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div
      ref={ref}
      className={className}
      style={visible ? undefined : { minHeight }}
      data-lazy-mount={visible ? "loaded" : "pending"}
    >
      {visible ? children : null}
    </div>
  );
}
