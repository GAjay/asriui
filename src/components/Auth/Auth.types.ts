import type { ButtonHTMLAttributes, FormHTMLAttributes, ReactNode } from "react";

/** Supported OAuth / social login providers. */
export type OAuthProvider = "microsoft" | "google" | "github" | "apple";

export type OAuthButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  /** Identity provider. */
  provider: OAuthProvider;
  /** Button label. Defaults to "Continue with {Provider}". */
  label?: ReactNode;
  /** Show provider brand icon. @default true */
  showIcon?: boolean;
  /** Full-width button. @default true */
  block?: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
  remember?: boolean;
};

export type LoginFormProps = Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  /** Called when email/password form is submitted. */
  onSubmit?: (credentials: LoginCredentials) => void | Promise<void>;
  /** Called when a social login button is clicked. */
  onOAuth?: (provider: OAuthProvider) => void | Promise<void>;
  /** Enabled OAuth providers. @default all */
  providers?: OAuthProvider[];
  /** Show remember-me checkbox. @default true */
  showRemember?: boolean;
  /** Form title. */
  title?: ReactNode;
  /** Form subtitle. */
  description?: ReactNode;
  /** Footer slot — e.g. sign-up link. */
  footer?: ReactNode;
  loading?: boolean;
};
