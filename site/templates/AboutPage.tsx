import { Badge, PageLayout, Typography } from "asriui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

const VALUES = [
  {
    title: "Accessible first",
    description: "Every layout uses semantic landmarks, readable type scale, and focus-friendly spacing.",
  },
  {
    title: "Composable",
    description: "Built from PageLayout, Card, Grid, and Typography — swap sections without rewriting the shell.",
  },
  {
    title: "Theme aware",
    description: "Uses design tokens so light and dark modes stay consistent across marketing pages.",
  },
];

const TEAM = [
  { name: "Alex Rivera", role: "Design systems", initials: "AR" },
  { name: "Jordan Lee", role: "Frontend", initials: "JL" },
  { name: "Sam Patel", role: "Product", initials: "SP" },
  { name: "Casey Kim", role: "Engineering", initials: "CK" },
];

export function AboutPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="56rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <TemplateDemoShell title="About page">
            <header className={styles.hero}>
              <Badge variant="secondary">Company</Badge>
              <h1 className={styles.heroTitle}>We build tools developers love</h1>
              <p className={styles.heroLead}>
                AsriUI helps teams ship polished interfaces faster with accessible components, flexible layouts,
                and copy-paste page templates.
              </p>
            </header>

            <section className={styles.section}>
              <Typography variant="h2" className={styles.sectionTitle}>
                Our mission
              </Typography>
              <p className={styles.prose}>
                We believe great developer experience and great user experience are the same goal. Our mission is to
                remove layout busywork so you can focus on product logic, while keeping accessibility and performance
                non-negotiable.
              </p>
            </section>

            <section className={styles.section}>
              <Typography variant="h2" className={styles.sectionTitle}>
                What we value
              </Typography>
              <div className={styles.valueGrid}>
                {VALUES.map((value) => (
                  <article key={value.title} className={styles.valueCard}>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <Typography variant="h2" className={styles.sectionTitle}>
                The team
              </Typography>
              <div className={styles.teamGrid}>
                {TEAM.map((member) => (
                  <article key={member.name} className={styles.teamCard}>
                    <div className={styles.avatar} aria-hidden="true">
                      {member.initials}
                    </div>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </article>
                ))}
              </div>
            </section>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
