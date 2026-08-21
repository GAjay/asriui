import { useEffect } from "react";
import { SITE_NAME } from "../siteMeta";
import { absoluteOgImage } from "./seoUtils";

export type PageSeoOptions = {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
};

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  if (!content) return;
  let el = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageSeo({
  title,
  description,
  canonical,
  keywords,
  ogType = "website",
  ogImage,
  noindex = false,
}: PageSeoOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const image = ogImage ? absoluteOgImage(ogImage) : undefined;

    upsertMeta("name", "description", description);
    if (keywords) upsertMeta("name", "keywords", keywords);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", "en_US");
    if (canonical) upsertMeta("property", "og:url", canonical);
    if (image) upsertMeta("property", "og:image", image);

    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    if (image) upsertMeta("name", "twitter:image", image);

    if (canonical) upsertLink("canonical", canonical);

    return () => {
      document.title = previousTitle;
    };
  }, [canonical, description, keywords, noindex, ogImage, ogType, title]);
}
