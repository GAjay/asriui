import { Form } from "../Form";
import { cn } from "../../utils/cn";
import type { FeatureRequestProps } from "./FeatureRequest.types";
import { toFeatureRequestValues } from "./FeatureRequest.types";
import styles from "./FeatureRequest.module.css";

const CONFIG = {
  id: "feature-request",
  submitLabel: "Submit feature",
  fields: [
    { name: "title", type: "text" as const, label: "Feature title", required: true, placeholder: "e.g. Kanban board" },
    {
      name: "category",
      type: "select" as const,
      label: "Category",
      required: true,
      defaultValue: "component",
      options: [
        { label: "New component", value: "component" },
        { label: "Docs", value: "docs" },
        { label: "Accessibility", value: "a11y" },
        { label: "Performance", value: "performance" },
      ],
    },
    {
      name: "description",
      type: "textarea" as const,
      label: "What should it do?",
      required: true,
      minLength: 12,
      placeholder: "Describe the problem and the layout you want to ship.",
    },
    { name: "email", type: "email" as const, label: "Email (optional)", placeholder: "you@company.com" },
  ],
};

export function FeatureRequest({
  onSubmit,
  submitLabel = "Submit feature",
  className,
}: FeatureRequestProps) {
  return (
    <div className={cn(styles.root, className)}>
      <Form
        config={{ ...CONFIG, submitLabel }}
        onSubmit={(values) => onSubmit?.(toFeatureRequestValues(values))}
      />
    </div>
  );
}
