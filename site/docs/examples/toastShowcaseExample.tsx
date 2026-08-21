import { ToastShowcase, type ToastShowcaseItem } from "../../../src/components/Toast";

/** Pass this config to ToastShowcase — buttons and toasts are generated automatically. */
export const TOAST_SHOWCASE_ITEMS: ToastShowcaseItem[] = [
  {
    label: "Success",
    toast: {
      variant: "success",
      title: "Saved",
      description: "Your profile was updated.",
    },
  },
  {
    label: "Error",
    toast: {
      variant: "error",
      title: "Upload failed",
      description: "Try again in a minute.",
    },
  },
  {
    label: "Warning",
    toast: {
      variant: "warning",
      title: "Storage almost full",
      description: "Free up space to keep syncing.",
    },
  },
  {
    label: "Info",
    toast: {
      variant: "info",
      title: "New version available",
      description: "Refresh to get the latest features.",
    },
  },
  {
    label: "With action",
    buttonVariant: "ghost",
    toast: {
      variant: "error",
      title: "Sync failed",
      description: "We could not reach the server.",
      action: { label: "Get support", onClick: () => undefined },
    },
  },
];

export const TOAST_SHOWCASE_CODE = `import { ToastShowcase } from "asriui/toast";

const items = [
  {
    label: "Success",
    toast: { variant: "success", title: "Saved", description: "Your profile was updated." },
  },
  {
    label: "Error",
    toast: { variant: "error", title: "Upload failed", description: "Try again." },
  },
];

export function NotificationsDemo() {
  return (
    <ToastShowcase
      title="Try each notification"
      description="Pass items — the page builds itself."
      items={items}
      columns={2}
      position="bottom-right"
      showProgress
    />
  );
}`;

export function ToastShowcaseExample() {
  return (
    <ToastShowcase
      title="Try each notification"
      description="Config-driven — add or remove items in the array."
      items={TOAST_SHOWCASE_ITEMS}
      columns={3}
      position="bottom-right"
      showProgress
    />
  );
}
