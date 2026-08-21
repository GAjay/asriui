import "@testing-library/jest-dom/vitest";

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];

  disconnect(): void {}
  observe(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve(): void {}
}

global.IntersectionObserver = IntersectionObserverMock;

if (typeof global.PointerEvent === "undefined") {
  class PointerEventMock extends MouseEvent {
    readonly pointerId: number;
    constructor(type: string, props?: PointerEventInit) {
      super(type, props);
      this.pointerId = props?.pointerId ?? 0;
    }
  }
  global.PointerEvent = PointerEventMock as typeof PointerEvent;
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("prefers-reduced-motion: reduce") ? false : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
