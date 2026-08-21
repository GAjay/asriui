import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Form, PageLayout, Typography, toast } from "asriui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

const STEPS = [
  { id: "workspace", title: "Workspace", body: "Name your team and choose a URL." },
  { id: "profile", title: "Profile", body: "Tell teammates who you are." },
  { id: "invite", title: "Invite", body: "Bring collaborators in." },
] as const;

const WORKSPACE_FORM = {
  submitLabel: "Continue",
  fields: [
    { name: "name", type: "text" as const, label: "Workspace name", required: true, placeholder: "Acme Studio" },
    {
      name: "slug",
      type: "text" as const,
      label: "URL slug",
      required: true,
      placeholder: "acme",
    },
  ],
};

const PROFILE_FORM = {
  submitLabel: "Continue",
  fields: [
    { name: "fullName", type: "text" as const, label: "Your name", required: true },
    {
      name: "role",
      type: "select" as const,
      label: "Role",
      required: true,
      options: [
        { label: "Founder", value: "founder" },
        { label: "Engineer", value: "engineer" },
        { label: "Designer", value: "designer" },
        { label: "Other", value: "other" },
      ],
    },
  ],
};

const INVITE_FORM = {
  submitLabel: "Finish setup",
  fields: [
    {
      name: "emails",
      type: "textarea" as const,
      label: "Invite emails",
      required: false,
      placeholder: "teammate@company.com, another@company.com",
    },
  ],
};

export function OnboardingPage() {
  const [step, setStep] = useState(0);
  const current = STEPS[step]!;

  return (
    <PageLayout variant="centered" contentMaxWidth="36rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <TemplateDemoShell title="Onboarding page">
            <div className={styles.onboardShell}>
              <header className={styles.onboardHeader}>
                <Badge variant="secondary">Auth</Badge>
                <h1 className={styles.dashboardTitle}>Set up your workspace</h1>
                <Typography variant="muted">{current.body}</Typography>
              </header>

              <ol className={styles.onboardSteps} aria-label="Onboarding progress">
                {STEPS.map((item, index) => (
                  <li
                    key={item.id}
                    className={styles.onboardStep}
                    data-active={index === step ? "true" : undefined}
                    data-done={index < step ? "true" : undefined}
                  >
                    <span className={styles.onboardStepIndex}>{index + 1}</span>
                    <span className={styles.onboardStepLabel}>{item.title}</span>
                  </li>
                ))}
              </ol>

              <div className={styles.panel}>
                {step === 0 ? (
                  <Form
                    config={WORKSPACE_FORM}
                    onSubmit={async () => {
                      setStep(1);
                      toast.success("Workspace saved");
                    }}
                  />
                ) : null}
                {step === 1 ? (
                  <Form
                    config={PROFILE_FORM}
                    onSubmit={async () => {
                      setStep(2);
                      toast.success("Profile saved");
                    }}
                  />
                ) : null}
                {step === 2 ? (
                  <Form
                    config={INVITE_FORM}
                    onSubmit={async () => {
                      toast.success("You're in", { description: "Redirect to dashboard in your app." });
                    }}
                  />
                ) : null}
              </div>

              <div className={styles.onboardFooter}>
                {step > 0 ? (
                  <Button variant="outline" onClick={() => setStep((value) => value - 1)}>
                    Back
                  </Button>
                ) : (
                  <span />
                )}
                <Link to="/templates/login" className={styles.bannerLink}>
                  Already have an account?
                </Link>
              </div>
            </div>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
