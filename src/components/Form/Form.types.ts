import type { ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type FormClassNames = SlotClassNames<
  "root" | "fields" | "field" | "switchRow" | "textarea" | "select" | "message" | "actions"
>;

/** Supported field control types in {@link FormConfig}. */
export type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "textarea"
  | "switch"
  | "select"
  | "image";

/** Submitted / stored value for a single field. */
export type FormFieldValue = string | boolean | File[];

/** Option entry for `select` field types. */
export type FormFieldOption = {
  /** Display label in the dropdown. */
  label: string;
  /** Submitted value when this option is selected. */
  value: string;
};

/** Built-in validation rule definitions for {@link FormFieldConfig}. */
export type FormValidationRule =
  | { type: "required"; message?: string }
  | { type: "email"; message?: string }
  | { type: "url"; message?: string }
  | { type: "minLength"; value: number; message?: string }
  | { type: "maxLength"; value: number; message?: string }
  | { type: "min"; value: number; message?: string }
  | { type: "max"; value: number; message?: string }
  | {
      type: "pattern";
      value: string;
      flags?: string;
      message?: string;
    }
  | { type: "matches"; field: string; message?: string }
  | { type: "notEqual"; field: string; message?: string }
  | { type: "oneOf"; values: string[]; message?: string }
  | { type: "notOneOf"; values: string[]; message?: string }
  | { type: "unique"; fields?: string[]; message?: string };

/** Conditional visibility rule for a field. */
export type FormFieldShowWhen = {
  field: string;
  equals?: string | boolean;
  notEquals?: string | boolean;
  oneOf?: string[];
  notOneOf?: string[];
};

/** Load select options from an API when a dependency field changes. */
export type FormFieldOptionsFrom = {
  dependsOn: string;
  load: (dependentValue: FormFieldValue | undefined, values: FormValues) => Promise<FormFieldOption[]>;
};

/** When to re-validate fields after the first submit attempt. */
export type FormValidateOn = "submit" | "blur" | "change";

/**
 * JSON-serializable field definition for {@link Form}.
 *
 * Define forms declaratively without JSX — ideal for CMS-driven
 * or runtime-generated UIs.
 */
export type FormFieldConfig = {
  /** Unique field name used as the form key and input `id`. */
  name: string;
  /** Control type determining which input is rendered. */
  type: FormFieldType;
  /** Visible label above the field. */
  label: string;
  /** Placeholder text for text-based inputs. */
  placeholder?: string;
  /** Assistive text shown below the field when valid. */
  helperText?: string;
  /**
   * When true, field must have a value before submit.
   * @default false
   */
  required?: boolean;
  /** Minimum string length for text-based fields. */
  minLength?: number;
  /** Maximum string length for text-based fields. */
  maxLength?: number;
  /** Minimum numeric value for text-based fields. */
  min?: number;
  /** Maximum numeric value for text-based fields. */
  max?: number;
  /** Regex pattern string (without slashes) for custom validation. */
  pattern?: string;
  /** Optional RegExp flags, e.g. `i` for case-insensitive pattern matching. */
  patternFlags?: string;
  /** Custom error message when `pattern` validation fails. */
  patternMessage?: string;
  /** Field name this value must match (e.g. confirm password). */
  matches?: string;
  /** Custom error message for `matches` validation. */
  matchesMessage?: string;
  /** Field name this value must differ from. */
  notEqual?: string;
  /** Custom error message for `notEqual` validation. */
  notEqualMessage?: string;
  /** Field names whose values must not duplicate this field. */
  uniqueAmong?: string[];
  /**
   * Explicit validation rules. Merged with shorthand props like `required` and `pattern`.
   * Ideal for CMS JSON configs that need regex, allowed values, and cross-field checks.
   */
  rules?: FormValidationRule[];
  /**
   * Programmatic validator for advanced cases not covered by `rules`.
   * Return an error message string or undefined when valid.
   */
  validate?: (value: FormFieldValue | undefined, values: FormValues) => string | undefined;
  /** Options array — required when `type` is `"select"`. */
  options?: FormFieldOption[];
  /** Fetch options when `dependsOn` field changes (e.g. category → subcategory). */
  optionsFrom?: FormFieldOptionsFrom;
  /** Show this field only when `showWhen` matches current values. */
  showWhen?: FormFieldShowWhen;
  /** Accepted MIME types / extensions for `image` fields. @default "image/*" */
  accept?: string;
  /** Allow multiple files for `image` fields. */
  multiple?: boolean;
  /** Initial value. Use `boolean` for switch fields, `File[]` for image fields. */
  defaultValue?: string | boolean | File[];
};

/**
 * Top-level JSON configuration for {@link Form}.
 *
 * @example
 * ```json
 * {
 *   "id": "signup",
 *   "submitLabel": "Create account",
 *   "fields": [
 *     { "name": "email", "type": "email", "label": "Email", "required": true }
 *   ]
 * }
 * ```
 */
export type FormConfig = {
  /** HTML `id` attribute on the `<form>` element. */
  id?: string;
  /** Ordered list of field definitions to render. */
  fields: FormFieldConfig[];
  /**
   * Label for the submit button.
   * @default "Submit"
   */
  submitLabel?: string;
};

/** Submitted form values keyed by field name. */
export type FormValues = Record<string, FormFieldValue>;

/** Validation error messages keyed by field name. */
export type FormErrors = Record<string, string>;

/**
 * Props for the {@link Form} component.
 *
 * Provides Formik-style validation ergonomics using a JSON config object.
 * No external form library required.
 */
export interface FormProps {
  /** JSON configuration describing all fields and submit label. */
  config: FormConfig;
  /** Initial values that override field `defaultValue` entries. */
  initialValues?: FormValues;
  /**
   * Called with validated values after a successful submit.
   * Not called when validation errors exist.
   */
  onSubmit?: (values: FormValues) => void | Promise<void>;
  /**
   * Shows loading spinner on the submit button.
   * @default false
   */
  loading?: boolean;
  /**
   * When to re-validate fields after the first submit attempt.
   * @default "blur"
   */
  validateOn?: FormValidateOn;
  /** Additional CSS class on the form element. */
  className?: string;
  /** Override class names for form slots — merged with each part's `className`. */
  classNames?: FormClassNames;
  children?: ReactNode;
}
