import type { SVGProps } from "react";
import { cn } from "../../utils/cn";

type ToastIconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ className, children, ...props }: ToastIconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ToastDefaultIcon(props: ToastIconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
    </BaseIcon>
  );
}

export function ToastSuccessIcon(props: ToastIconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </BaseIcon>
  );
}

export function ToastErrorIcon(props: ToastIconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </BaseIcon>
  );
}

export function ToastWarningIcon(props: ToastIconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4M12 17h.01" />
    </BaseIcon>
  );
}

export function ToastInfoIcon(props: ToastIconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </BaseIcon>
  );
}
