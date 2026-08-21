import { useState } from "react";
import { Badge, Form, PageLayout, Typography } from "asriui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

const CONTACT_FORM = {
  fields: [
    { name: "name", type: "text" as const, label: "Full name", required: true },
    { name: "email", type: "email" as const, label: "Work email", required: true },
    {
      name: "topic",
      type: "select" as const,
      label: "Topic",
      required: true,
      options: [
        { label: "Sales", value: "sales" },
        { label: "Support", value: "support" },
        { label: "Partnerships", value: "partnerships" },
      ],
    },
    {
      name: "message",
      type: "textarea" as const,
      label: "Message",
      required: true,
      minLength: 12,
      placeholder: "Tell us how we can help…",
    },
  ],
};

const CONTACT_INFO = [
  { title: "Email", body: "hello@asriui.dev" },
  { title: "Office", body: "221B Builder Street, San Francisco" },
  { title: "Hours", body: "Mon–Fri, 9am–6pm PT" },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageLayout variant="centered" contentMaxWidth="56rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <TemplateDemoShell title="Contact page">
            <header className={styles.hero}>
              <Badge variant="secondary">Contact</Badge>
              <h1 className={styles.heroTitle}>Let&apos;s talk</h1>
              <p className={styles.heroLead}>
                Questions about components, licensing, or enterprise support? Send a message and we&apos;ll respond
                within one business day.
              </p>
            </header>

            <div className={styles.contactShell}>
              <section aria-label="Contact form">
                {submitted ? (
                  <div className={styles.infoCard}>
                    <Typography variant="h3">Thanks — we got your message.</Typography>
                    <Typography variant="muted">This demo resets on refresh. Wire onSubmit to your API in production.</Typography>
                  </div>
                ) : (
                  <Form
                    config={CONTACT_FORM}
                    onSubmit={async () => {
                      setSubmitted(true);
                    }}
                  />
                )}
              </section>

              <aside className={styles.infoStack} aria-label="Contact information">
                {CONTACT_INFO.map((item) => (
                  <div key={item.title} className={styles.infoCard}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                ))}
              </aside>
            </div>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
