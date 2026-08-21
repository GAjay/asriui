import { useMemo } from "react";
import { SITE_AUTHOR } from "../author";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "../siteMeta";
import { LANDING_FAQ } from "./landingFaq";
import { absoluteOgImage, absoluteSiteUrl } from "./seoUtils";
import { usePageSeo } from "./usePageSeo";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LandingSeo() {
  const canonical = absoluteSiteUrl("/");
  const ogImage = absoluteOgImage("/pwa-512x512.png");
  const title = `${SITE_NAME} — ${SITE_TAGLINE}`;

  usePageSeo({
    title,
    description: SITE_DESCRIPTION,
    canonical,
    keywords: SITE_KEYWORDS,
    ogImage,
  });

  const structuredData = useMemo(() => {
    const websiteId = `${SITE_URL}/#website`;
    const organizationId = `${SITE_URL}/#organization`;
    const webpageId = `${SITE_URL}/#webpage`;
    const softwareId = `${SITE_URL}/#software`;

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": organizationId,
          name: SITE_NAME,
          url: SITE_URL,
          logo: ogImage,
          email: SITE_AUTHOR.email,
          founder: {
            "@type": "Person",
            name: SITE_AUTHOR.name,
            url: SITE_AUTHOR.linkedIn,
          },
          sameAs: [SITE_AUTHOR.github, SITE_AUTHOR.linkedIn, SITE_AUTHOR.buyMeACoffee],
        },
        {
          "@type": "WebSite",
          "@id": websiteId,
          name: SITE_NAME,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          publisher: { "@id": organizationId },
          inLanguage: "en-US",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}/docs?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@type": "WebPage",
          "@id": webpageId,
          url: canonical,
          name: title,
          description: SITE_DESCRIPTION,
          isPartOf: { "@id": websiteId },
          about: { "@id": softwareId },
          inLanguage: "en-US",
        },
        {
          "@type": "SoftwareApplication",
          "@id": softwareId,
          name: SITE_NAME,
          applicationCategory: "DeveloperApplication",
          applicationSubCategory: "UI component library",
          operatingSystem: "Web",
          softwareVersion: "0.0.0",
          license: "https://opensource.org/licenses/MIT",
          isAccessibleForFree: true,
          downloadUrl: SITE_AUTHOR.github,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: SITE_DESCRIPTION,
          url: SITE_URL,
          author: { "@id": organizationId },
          featureList: [
            "Accessible React components",
            "TypeScript and CSS Modules",
            "Tree-shakable subpath imports",
            "Framer Motion presets",
            "Docs with live examples",
            "Page templates",
            "PWA-ready docs site",
          ],
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/#faq`,
          mainEntity: LANDING_FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
      ],
    };
  }, [canonical, ogImage, title]);

  return <JsonLd data={structuredData} />;
}
