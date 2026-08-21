import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { ScrollArea } from "./ScrollArea";
import { useScrollIntersection } from "./useScrollIntersection";

type ObserverRecord = {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  elements: Set<Element>;
};

function createIntersectionObserverMock() {
  const observers: ObserverRecord[] = [];

  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null;
    readonly rootMargin: string;
    readonly thresholds: ReadonlyArray<number>;

    constructor(
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit,
    ) {
      this.root = options?.root ?? null;
      this.rootMargin = options?.rootMargin ?? "0px";
      this.thresholds = Array.isArray(options?.threshold)
        ? options.threshold
        : [options?.threshold ?? 0];
      observers.push({ callback, options, elements: new Set() });
    }

    observe(element: Element) {
      const record = observers[observers.length - 1];
      record?.elements.add(element);
    }

    unobserve(element: Element) {
      for (const record of observers) {
        record.elements.delete(element);
      }
    }

    disconnect() {
      observers.length = 0;
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  return {
    MockIntersectionObserver,
    observers,
    trigger(entry: Partial<IntersectionObserverEntry> & { target: Element; isIntersecting: boolean }) {
      for (const record of observers) {
        if (!record.elements.has(entry.target)) continue;
        record.callback(
          [
            {
              boundingClientRect: entry.boundingClientRect as DOMRectReadOnly,
              intersectionRatio: entry.intersectionRatio ?? (entry.isIntersecting ? 1 : 0),
              intersectionRect: entry.intersectionRect as DOMRectReadOnly,
              isIntersecting: entry.isIntersecting,
              rootBounds: entry.rootBounds ?? null,
              target: entry.target,
              time: entry.time ?? Date.now(),
            },
          ],
          record as unknown as IntersectionObserver,
        );
      }
    },
  };
}

const mock = createIntersectionObserverMock();

describe("ScrollArea intersection observer", () => {
  const originalObserver = globalThis.IntersectionObserver;

  beforeEach(() => {
    mock.observers.length = 0;
    vi.stubGlobal("IntersectionObserver", mock.MockIntersectionObserver);
  });

  afterEach(() => {
    vi.stubGlobal("IntersectionObserver", originalObserver);
    mock.observers.length = 0;
  });

  it("observes sentinel with the scroll viewport as root", async () => {
    const onIntersect = vi.fn();

    render(
      <ScrollArea height={160} label="Feed" data-testid="scroll-area">
        <div>Row</div>
        <ScrollArea.Sentinel onIntersect={onIntersect} data-testid="sentinel" />
      </ScrollArea>,
    );

    const viewport = screen.getByRole("region", { name: "Feed" });
    const sentinel = screen.getByTestId("sentinel");

    await waitFor(() => {
      expect(mock.observers.length).toBeGreaterThan(0);
    });

    const observer = mock.observers[mock.observers.length - 1];
    expect(observer?.options?.root).toBe(viewport);

    mock.trigger({ target: sentinel, isIntersecting: true });
    expect(onIntersect).toHaveBeenCalledTimes(1);
  });

  it("uses window root in page mode", async () => {
    const onIntersect = vi.fn();

    render(
      <ScrollArea page data-testid="page-scroll">
        <ScrollArea.Sentinel onIntersect={onIntersect} data-testid="sentinel" />
      </ScrollArea>,
    );

    await waitFor(() => {
      expect(mock.observers.length).toBeGreaterThan(0);
    });

    const observer = mock.observers[mock.observers.length - 1];
    expect(observer?.options?.root).toBeNull();
  });

  it("supports useScrollIntersection on custom elements", async () => {
    const onChange = vi.fn();

    function Marker() {
      const ref = useScrollIntersection({ onChange });
      return <div ref={ref} data-testid="marker" />;
    }

    render(
      <ScrollArea height={160} label="Markers">
        <Marker />
      </ScrollArea>,
    );

    const marker = screen.getByTestId("marker");

    await waitFor(() => {
      expect(mock.observers.length).toBeGreaterThan(0);
    });

    mock.trigger({ target: marker, isIntersecting: true });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: marker }), true);
  });
});
