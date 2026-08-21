import { Accordion, Badge, Button, PageLayout, Typography } from "axiom-ui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    description: "For side projects and prototypes.",
    features: ["MIT license", "Core components", "Community support"],
    cta: "Get started",
    variant: "outline" as const,
    featured: false,
  },
  {
    name: "Pro",
    price: "$24",
    description: "For product teams shipping weekly.",
    features: ["Everything in Starter", "Page templates", "Priority examples", "Email support"],
    cta: "Start trial",
    variant: "primary" as const,
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For orgs with compliance needs.",
    features: ["SSO & audit logs", "Dedicated support", "Custom SLAs", "Design review"],
    cta: "Contact sales",
    variant: "outline" as const,
    featured: false,
  },
];

const FAQ = [
  {
    id: "billing",
    title: "Can I switch plans later?",
    content: "Yes. Upgrade or downgrade any time — billing prorates automatically in this demo flow.",
  },
  {
    id: "license",
    title: "What license do templates use?",
    content: "All page templates ship under the same MIT license as AxiomUI. Copy, modify, and ship in production.",
  },
  {
    id: "support",
    title: "Do you offer implementation help?",
    content: "Pro and Enterprise tiers include onboarding sessions to adapt templates to your routing and brand tokens.",
  },
];

export function PricingPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="60rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <TemplateDemoShell title="Pricing page">
            <header className={styles.hero}>
              <Badge variant="secondary">Pricing</Badge>
              <h1 className={styles.heroTitle}>Simple plans that scale with you</h1>
              <p className={styles.heroLead}>
                Start with the free tier, then unlock templates and support when your team is ready to ship faster.
              </p>
            </header>

            <section className={styles.section} aria-label="Pricing tiers">
              <div className={styles.pricingGrid}>
                {PLANS.map((plan) => (
                  <article
                    key={plan.name}
                    className={plan.featured ? `${styles.priceCard} ${styles.priceCardFeatured}` : styles.priceCard}
                  >
                    <div>
                      <Typography variant="h3">{plan.name}</Typography>
                      <p className={styles.prose}>{plan.description}</p>
                    </div>
                    <p className={styles.price}>
                      {plan.price}
                      {plan.price !== "Custom" ? <span> / month</span> : null}
                    </p>
                    <ul className={styles.featureList}>
                      {plan.features.map((feature) => (
                        <li key={feature}>✓ {feature}</li>
                      ))}
                    </ul>
                    <Button variant={plan.variant} style={{ width: "100%" }}>
                      {plan.cta}
                    </Button>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <Typography variant="h2" className={styles.sectionTitle}>
                FAQ
              </Typography>
              <Accordion type="single" collapsible defaultValue="billing">
                {FAQ.map((item) => (
                  <Accordion.Item key={item.id} value={item.id}>
                    <Accordion.Trigger>{item.title}</Accordion.Trigger>
                    <Accordion.Content>{item.content}</Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion>
            </section>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
