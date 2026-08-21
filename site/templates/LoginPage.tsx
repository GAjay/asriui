import { Link } from "react-router-dom";
import { LoginForm, PageLayout, toast, type OAuthProvider } from "asriui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

export function LoginPage() {
  const handleOAuth = (provider: OAuthProvider) => {
    toast.info(`Redirecting to ${provider}`, {
      description: "Wire onOAuth to your identity provider in production.",
    });
  };

  return (
    <PageLayout variant="centered" contentMaxWidth="32rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <TemplateDemoShell title="Login page">
            <div className={styles.loginShell}>
              <LoginForm
                title="Welcome back"
                description="Sign in with Microsoft, Google, GitHub, Apple, or your email."
                onSubmit={async () => {
                  toast.success("Signed in", { description: "Demo credentials accepted." });
                }}
                onOAuth={handleOAuth}
                providers={["microsoft", "google", "github", "apple"]}
                footer={
                  <>
                    Don&apos;t have an account?{" "}
                    <Link to="/templates/pricing" style={{ color: "var(--asriui-color-primary)" }}>
                      View plans
                    </Link>
                  </>
                }
              />
            </div>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
