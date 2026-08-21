import { useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { cn } from "../../utils/cn";
import { OAuthButton } from "./OAuthButton";
import type { LoginFormProps, OAuthProvider } from "./Auth.types";
import styles from "./Auth.module.css";

const DEFAULT_PROVIDERS: OAuthProvider[] = ["microsoft", "google", "github", "apple"];

/**
 * Email/password login form with social OAuth buttons.
 *
 * Wire `onOAuth` to your identity provider redirect — e.g. Microsoft Entra ID,
 * Google OAuth, GitHub Apps, or Sign in with Apple.
 */
export function LoginForm({
  onSubmit,
  onOAuth,
  providers = DEFAULT_PROVIDERS,
  showRemember = true,
  title = "Sign in",
  description = "Use your work email or continue with a provider.",
  footer,
  loading = false,
  className,
  ...rest
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit?.({ email, password, remember });
  };

  return (
    <div className={cn(styles.loginCard, className)}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}
      </header>

      {onOAuth ? (
        <div className={styles.oauthStack}>
          {providers.map((provider) => (
            <OAuthButton
              key={provider}
              provider={provider}
              disabled={loading}
              onClick={() => onOAuth(provider)}
            />
          ))}
        </div>
      ) : null}

      {onOAuth && onSubmit ? <div className={styles.divider}>or</div> : null}

      {onSubmit ? (
        <form className={styles.form} onSubmit={handleSubmit} {...rest}>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {showRemember ? (
            <div className={styles.rememberRow}>
              <label className={styles.remember}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
                Remember me
              </label>
            </div>
          ) : null}
          <Button type="submit" loading={loading} style={{ width: "100%" }}>
            Sign in
          </Button>
        </form>
      ) : null}

      {footer ? <footer className={styles.footer}>{footer}</footer> : null}
    </div>
  );
}

LoginForm.displayName = "LoginForm";
