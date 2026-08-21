import type { WidgetMountOptions } from "./Widget.types";

function resolveHost(host: HTMLElement | string): HTMLElement | null {
  if (typeof host === "string") return document.getElementById(host);
  return host;
}

function toCssSize(value?: number | string): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

/**
 * Mount an embed widget without React — useful for static pages or CMS snippets.
 * Returns a cleanup function that removes the mount node.
 */
export function mountWidget(host: HTMLElement | string, options: WidgetMountOptions): () => void {
  const target = resolveHost(host);
  if (!target) {
    throw new Error("mountWidget: host element not found");
  }

  const mode =
    options.mode === "auto" || !options.mode
      ? options.scriptSrc
        ? "script"
        : "iframe"
      : options.mode;

  const surface = document.createElement("div");
  surface.className = "asriui-widget";
  surface.style.width = toCssSize(options.width) ?? "100%";
  const height = toCssSize(options.height);
  if (height) {
    surface.style.height = height;
  }

  if (mode === "script") {
    if (!options.scriptSrc) {
      throw new Error("mountWidget: scriptSrc is required for script mode");
    }

    if (options.slotId) surface.id = options.slotId;
    Object.entries(options.attrs ?? {}).forEach(([key, value]) => {
      surface.setAttribute(key, value);
    });

    const script = document.createElement("script");
    script.src = options.scriptSrc;
    script.async = true;
    script.dataset.asriuiWidget = options.scriptSrc;
    script.addEventListener("load", () => options.onLoad?.(), { once: true });
    script.addEventListener("error", () => {
      options.onError?.(new Error(`Failed to load widget script: ${options.scriptSrc}`));
    }, { once: true });
    surface.appendChild(script);
  } else {
    const frame = document.createElement("iframe");
    frame.title = options.title ?? "Embedded widget";
    frame.loading = options.loading ?? "lazy";
    frame.setAttribute(
      "sandbox",
      options.sandbox ?? "allow-scripts allow-same-origin allow-popups allow-forms",
    );
    frame.style.width = "100%";
    frame.style.height = "100%";
    frame.style.border = "0";

    if (options.html) {
      frame.srcdoc = options.html;
      frame.addEventListener("load", () => options.onLoad?.(), { once: true });
    } else if (options.src) {
      frame.src = options.src;
      frame.addEventListener("load", () => options.onLoad?.(), { once: true });
      frame.addEventListener("error", () => {
        options.onError?.(new Error(`Failed to load widget iframe: ${options.src}`));
      }, { once: true });
    } else {
      throw new Error("mountWidget: src or html is required for iframe mode");
    }

    surface.appendChild(frame);
  }

  target.replaceChildren(surface);

  return () => {
    surface.remove();
  };
}
