import { useNavigate } from "react-router-dom";
import { Badge, Breadcrumb, Timeline } from "axiom-ui";
import { DocPageShell } from "./DocPageShell";
import { ROADMAP_MILESTONES, ROADMAP_PHASES, ROADMAP_USE_CASES } from "./roadmapData";
import styles from "./GuidesPage.module.css";

const TOC = [
  { id: "use-cases", label: "Use cases" },
  { id: "milestones", label: "Milestones" },
  { id: "phases", label: "What's next" },
] as const;

const ROADMAP_TOC = TOC.map((item) => ({ ...item }));

export function RoadmapPage() {
  const navigate = useNavigate();

  return (
    <DocPageShell toc={ROADMAP_TOC}>
      <article className={styles.page}>
        <Breadcrumb
          className={styles.breadcrumb}
          showBack
          onBack={() => navigate("/docs/getting-started")}
          items={[
            { label: "Docs", href: "/docs/getting-started" },
            { label: "Guides", href: "/docs/roadmap" },
            { label: "Roadmap", current: true },
          ]}
        />

        <header className={styles.header} id="overview">
          <p className={styles.kicker}>Guides</p>
          <h1 className={styles.title}>Product roadmap</h1>
          <p className={styles.lead}>
            AxiomUI helps teams ship accessible, tree-shakable React interfaces faster — from dashboards and forms to
            docs sites and marketing pages. This roadmap shows what we solve today and what is coming next.
          </p>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>Open source (MIT)</span>
            <span className={styles.metaBadge}>Built in public</span>
            <span className={styles.metaBadge}>Feedback welcome</span>
          </div>
        </header>

        <section className={styles.section} id="use-cases">
          <h2 className={styles.sectionTitle}>Problems we solve</h2>
          <p className={styles.prose}>
            Each use case maps to real components you can import today. Open a component page for live examples and API
            reference.
          </p>
          <div className={styles.useCaseGrid}>
            {ROADMAP_USE_CASES.map((useCase) => (
              <article key={useCase.id} className={styles.useCaseCard}>
                <p className={styles.useCaseLabel}>Use case</p>
                <h3>{useCase.title}</h3>
                <p className={styles.useCaseProblem}>
                  <strong>Problem:</strong> {useCase.problem}
                </p>
                <p className={styles.useCaseSolution}>
                  <strong>How AxiomUI helps:</strong> {useCase.solution}
                </p>
                <div className={styles.chipRow}>
                  {useCase.components.map((name) => (
                    <span key={name} className={styles.chip}>
                      {name}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="milestones">
          <h2 className={styles.sectionTitle}>Milestones</h2>
          <p className={styles.prose}>
            Major capabilities shipped and in flight. Status uses the same Timeline pattern you can drop into your own
            apps.
          </p>
          <div className={styles.timelinePanel}>
            <Timeline>
              {ROADMAP_MILESTONES.map((step) => (
                <Timeline.Item
                  key={step.id}
                  title={step.title}
                  date={step.date}
                  status={step.status}
                  description={step.description}
                >
                  <div className={styles.chipRow} style={{ marginTop: "0.5rem" }}>
                    {step.highlights.map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </section>

        <section className={styles.section} id="phases">
          <h2 className={styles.sectionTitle}>What&apos;s next</h2>
          <p className={styles.prose}>
            Priorities may shift based on community feedback. Open an issue or discussion if a use case is missing from
            this list.
          </p>
          <div className={styles.phaseGrid}>
            {ROADMAP_PHASES.map((phase) => (
              <article key={phase.id} className={styles.phaseCard}>
                <h3>{phase.label}</h3>
                <p className={styles.phaseTime}>{phase.timeframe}</p>
                <ul className={styles.phaseList}>
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </article>
    </DocPageShell>
  );
}
