import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, CodeBlock } from "axiom-ui";
import { ComponentApiTable } from "./ComponentApiTable";
import { ComponentPerformanceMetrics } from "./ComponentPerformanceMetrics";
import { DocExampleBlock } from "./DocExampleBlock";
import { DocPageShell } from "./DocPageShell";
import { DocPageSkeleton } from "./DocPageSkeleton";
import { getComponentApi } from "./componentApi";
import { getComponentMeta } from "./registry";
import { loadComponentDoc } from "./loadComponentDoc";
import type { ComponentDoc } from "./types";
import styles from "./ComponentDocPage.module.css";

export function ComponentDocPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState<ComponentDoc | undefined>();
  const meta = slug ? getComponentMeta(slug) : undefined;
  const api = slug ? getComponentApi(slug) : undefined;

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setDoc(undefined);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    void loadComponentDoc(slug).then((loaded) => {
      if (cancelled) return;
      setDoc(loaded);
      window.setTimeout(() => setLoading(false), 180);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const toc = useMemo(() => {
    if (!doc) return [];
    const items = [
      { id: "installation", label: "Installation" },
      { id: "overview", label: "Overview" },
      { id: "performance", label: "Performance" },
      ...doc.examples.map((ex) => ({ id: ex.id, label: ex.title })),
      { id: "api-reference", label: "API Reference" },
    ];
    return items;
  }, [doc]);

  if (!meta) {
    return <Navigate to="/docs/components/button" replace />;
  }

  if (loading || !doc) {
    return <DocPageSkeleton />;
  }

  return (
    <DocPageShell toc={toc}>
      <article className={styles.page}>
        <Breadcrumb
          className={styles.breadcrumb}
          showBack
          onBack={() => navigate(-1)}
          items={[
            { label: "Docs", href: "/docs/getting-started" },
            { label: "Components", href: "/docs/components/button" },
            { label: doc.name, current: true },
          ]}
        />
        <header className={styles.header}>
          <p className={styles.kicker}>Components / {doc.name}</p>
          <h1 className={styles.title}>{doc.name}</h1>
          <p className={styles.lead}>{api?.summary ?? doc.description}</p>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>Tree-shakable</span>
            <span className={styles.metaBadge}>Accessible</span>
            <span className={styles.metaBadge}>TypeScript</span>
            {api ? <code className={styles.importBadge}>{api.importPath}</code> : null}
          </div>
        </header>

        <section id="installation" className={styles.section}>
          <h2 className={styles.sectionTitle}>Installation</h2>
          <CodeBlock
            code={`pnpm add axiom-ui framer-motion

import { ${api?.exportName ?? doc.name} } from "${api?.importPath ?? `axiom-ui/${doc.slug}`}";
import "axiom-ui/style.css";`}
            language="bash"
            showCopy
            filename="terminal"
          />
        </section>

        <section id="overview" className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          {api ? <p className={styles.prose}>{api.description}</p> : null}
          <p className={styles.prose}>{doc.description}</p>
          {doc.whenToUse ? (
            <div className={styles.callout}>
              <p className={styles.calloutLabel}>When to use</p>
              <p className={styles.calloutText}>{doc.whenToUse}</p>
            </div>
          ) : null}
          {api?.accessibility ? (
            <div className={styles.a11yBlock}>
              <p className={styles.calloutLabel}>Accessibility</p>
              <p className={styles.calloutText}>{api.accessibility}</p>
            </div>
          ) : null}
          {doc.related && doc.related.length > 0 ? (
            <div className={styles.related}>
              <span className={styles.relatedLabel}>Related</span>
              {doc.related.map((rel) => (
                <Link key={rel} className={styles.relatedLink} to={`/docs/components/${rel}`}>
                  {rel}
                </Link>
              ))}
            </div>
          ) : null}
        </section>

        <section id="performance" className={styles.section}>
          <h2 className={styles.sectionTitle}>Performance</h2>
          <ComponentPerformanceMetrics slug={doc.slug} />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Examples</h2>
          {doc.examples.map((example) => (
            <DocExampleBlock
              key={example.id}
              id={example.id}
              title={example.title}
              description={example.description}
              code={example.code}
              preview={example.preview}
            />
          ))}
        </section>

        {api ? (
          <section id="api-reference" className={styles.section}>
            <h2 className={styles.sectionTitle}>API Reference</h2>
            <ComponentApiTable api={api} />
          </section>
        ) : null}
      </article>
    </DocPageShell>
  );
}

export function DocsIndex() {
  return <Navigate to="/docs/getting-started" replace />;
}
