import type { MenuPlacement } from "./Menu.types";

const VIEWPORT_MARGIN = 8;
const GAP = 6;

export type MenuCoords = {
  top: number;
  left: number;
};

/**
 * Positions a fixed menu panel relative to its trigger.
 * Always returns `left` (never `right`) so width/clamp math stays predictable.
 * Flips horizontally when the preferred alignment would push the panel off-screen.
 */
export function computeMenuPosition(
  trigger: HTMLElement,
  content: HTMLElement,
  placement: MenuPlacement,
  gap = GAP,
): MenuCoords {
  const triggerRect = trigger.getBoundingClientRect();
  const height = content.offsetHeight || content.getBoundingClientRect().height;
  const width = Math.max(
    content.offsetWidth || content.getBoundingClientRect().width,
    1,
  );
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  let preferred: MenuPlacement = placement;
  const spaceBelow = viewportH - triggerRect.bottom - gap - VIEWPORT_MARGIN;
  const spaceAbove = triggerRect.top - gap - VIEWPORT_MARGIN;

  if (preferred.startsWith("bottom") && height > spaceBelow && spaceAbove > spaceBelow) {
    preferred = preferred === "bottom-end" ? "top-end" : "top-start";
  } else if (preferred.startsWith("top") && height > spaceAbove && spaceBelow > spaceAbove) {
    preferred = preferred === "top-end" ? "bottom-end" : "bottom-start";
  }

  let isEnd = preferred.endsWith("end");
  const isTop = preferred.startsWith("top");

  let top = isTop ? triggerRect.top - gap - height : triggerRect.bottom + gap;
  top = Math.min(
    Math.max(top, VIEWPORT_MARGIN),
    Math.max(VIEWPORT_MARGIN, viewportH - height - VIEWPORT_MARGIN),
  );

  const startLeft = triggerRect.left;
  const endLeft = triggerRect.right - width;
  let left = isEnd ? endLeft : startLeft;

  const overflowsLeft = left < VIEWPORT_MARGIN;
  const overflowsRight = left + width > viewportW - VIEWPORT_MARGIN;

  // Flip horizontal alignment when the preferred side can't fit.
  if (isEnd && overflowsLeft && startLeft + width <= viewportW - VIEWPORT_MARGIN) {
    left = startLeft;
    isEnd = false;
  } else if (!isEnd && overflowsRight && endLeft >= VIEWPORT_MARGIN) {
    left = endLeft;
    isEnd = true;
  } else if (!isEnd && overflowsRight) {
    // Prefer end-align even if it still needs clamping — keeps the panel nearer the trigger.
    left = endLeft;
  }

  const maxLeft = Math.max(VIEWPORT_MARGIN, viewportW - width - VIEWPORT_MARGIN);
  left = Math.min(Math.max(left, VIEWPORT_MARGIN), maxLeft);

  return { top, left };
}
