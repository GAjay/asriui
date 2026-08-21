import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Breadcrumb, Tabs } from "axiom-ui";
import { DocPageShell } from "./DocPageShell";
import {
  CHANGELOG_CHANGE_LABELS,
  CHANGELOG_RELEASES,
  CHANGELOG_SECTION_ORDER,
  type ChangelogChangeType,
  type ChangelogRelease,
} from "./changelogData";
import styles from "./GuidesPage.module.css";

const TOC = [
  { id: "releases", label: "Release notes" },
  { id: "history", label: "All releases" },
  { id: "publishing", label: "How we release" },
] as const;

const CHANGE_TYPE_CLASS: Record<ChangelogChangeType, string> = {
  added: styles.changeGroupTitleAdded ?? "",
  changed: styles.changeGroupTitleChanged ?? "",
  fixed: styles.changeGroupTitleFixed ?? "",
  deprecated: styles.changeGroupTitleDeprecated ?? "",
  removed: styles.changeGroupTitleRemoved ?? "",
  security: styles.changeGroupTitleSecurity ?? "",
};

function ReleaseNotes({ release }: { release: ChangelogRelease }) {
  return (
    <div className={styles.releaseNote}>
      <div className={styles.releaseHeader}>
        <h2 className={styles.releaseVersion}>{release.version}</h2>
        <span className={styles.releaseDate}>{release.date}</span>
        {release.label ? <Badge variant="secondary">{release.label}</Badge> : null}
      </div>
      <p className={styles.releaseSummary}>{release.summary}</p>
      {CHANGELOG_SECTION_ORDER.map((type) => {
        const items = release.sections[type];
        if (!items?.length) return null;
        return (
          <div key={type} className={styles.changeGroup}>
            <h3 className={`${styles.changeGroupTitle} ${CHANGE_TYPE_CLASS[type]}`}>
              {CHANGELOG_CHANGE_LABELS[type]}
            </h3>
            <ul className={styles.changeList}>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function ReleasesPage() {
  const navigate = useNavigate();
  const defaultVersion = CHANGELOG_RELEASES[0]?.version ?? "Unreleased";
  const [activeVersion, setActiveVersion] = useState(defaultVersion);

  return (
    <DocPageShell toc={TOC.map((item) => ({ ...item }))}>
      <article className={styles.page}>
        <Breadcrumb
          className={styles.breadcrumb}
          showBack
          onBack={() => navigate("/docs/getting-started")}
          items={[
            { label: "Docs", href: "/docs/getting-started" },
            { label: "Guides", href: "/docs/releases" },
            { label: "Releases", current: true },
          ]}
        />

        <header className={styles.header}>
          <p className={styles.kicker}>Guides</p>
          <h1 className={styles.title}>Releases</h1>
          <p className={styles.lead}>
            Version history for AxiomUI. Releases follow{" "}
            <a href="https://semver.org/" target="_blank" rel="noreferrer">
              Semantic Versioning
            </a>
            . We use{" "}
            <a href="https://github.com/changesets/changesets" target="_blank" rel="noreferrer">
              Changesets
            </a>{" "}
            to manage npm publishes.
          </p>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>Keep a Changelog format</span>
            <span className={styles.metaBadge}>Updated each release</span>
          </div>
        </header>

        <section className={styles.section} id="releases">
          <h2 className={styles.sectionTitle}>Release notes</h2>
          <Tabs
            className={styles.changelogTabs}
            value={activeVersion}
            onValueChange={setActiveVersion}
            variant="underline"
          >
            <Tabs.List aria-label="Release versions">
              {CHANGELOG_RELEASES.map((release) => (
                <Tabs.Trigger key={release.version} value={release.version}>
                  {release.version}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {CHANGELOG_RELEASES.map((release) => (
              <Tabs.Content key={release.version} value={release.version}>
                <ReleaseNotes release={release} />
              </Tabs.Content>
            ))}
          </Tabs>
        </section>

        <section className={styles.section} id="history">
          <h2 className={styles.sectionTitle}>All releases</h2>
          <p className={styles.prose}>Quick overview of every published and upcoming version.</p>
          <div className={styles.allReleases}>
            {CHANGELOG_RELEASES.map((release) => (
              <article key={release.version} className={styles.compactRelease}>
                <h3>
                  {release.version}{" "}
                  <span className={styles.releaseDate} style={{ fontWeight: 400 }}>
                    · {release.date}
                  </span>
                </h3>
                <p>{release.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="publishing">
          <h2 className={styles.sectionTitle}>How we release</h2>
          <p className={styles.prose}>
            Contributors add a changeset when opening a PR (<code>.changeset/*.md</code>). On merge to main, CI can
            version packages and publish to npm. Notes on this page and <code>CHANGELOG.md</code> in the
            repository are updated together.
          </p>
          <p className={styles.prose}>
            To propose a feature for a future release, check the <a href="/docs/roadmap">roadmap</a> and open a GitHub
            discussion or issue with your use case.
          </p>
        </section>
      </article>
    </DocPageShell>
  );
}
