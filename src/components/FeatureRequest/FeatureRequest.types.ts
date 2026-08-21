import type { FormValues } from "../Form/Form.types";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type FeatureRequestValues = {
  title: string;
  category: string;
  description: string;
  email?: string;
};

export type FeatureRequestClassNames = SlotClassNames<"root" | "form">;

export interface FeatureRequestProps {
  /** Called with a validated feature request. */
  onSubmit?: (values: FeatureRequestValues) => void | Promise<void>;
  /** Override the submit button label. @default "Submit feature" */
  submitLabel?: string;
  className?: string;
  classNames?: FeatureRequestClassNames;
}

export function toFeatureRequestValues(values: FormValues): FeatureRequestValues {
  return {
    title: String(values.title ?? ""),
    category: String(values.category ?? "component"),
    description: String(values.description ?? ""),
    email: values.email ? String(values.email) : undefined,
  };
}
