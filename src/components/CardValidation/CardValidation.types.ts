import type { HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type CardValidationClassNames = SlotClassNames<
  "root" | "fields" | "row" | "brand" | "preview" | "message"
>;

/** Detected card network from the number prefix (IIN/BIN). */
export type CardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "diners"
  | "jcb"
  | "unionpay"
  | "unknown";

/** Field values for {@link CardValidation}. */
export type CardValidationValues = {
  /** Digits only (no spaces). */
  number: string;
  /** MMYY digits only (4 chars when complete). */
  expiry: string;
  /** Digits only. */
  cvc: string;
  /** Optional cardholder name. */
  name: string;
};

/** Per-field validation errors. Empty string / undefined means valid. */
export type CardValidationErrors = Partial<Record<keyof CardValidationValues, string>>;

export type CardValidationLabels = {
  number?: string;
  expiry?: string;
  cvc?: string;
  name?: string;
};

export type CardValidationPlaceholders = {
  number?: string;
  expiry?: string;
  cvc?: string;
  name?: string;
};

export interface CardValidationProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onSubmit"> {
  /**
   * Controlled values. Prefer digits-only for number/expiry/cvc.
   * When omitted, the component manages state internally.
   */
  values?: Partial<CardValidationValues>;
  /** Initial values for uncontrolled mode. */
  defaultValues?: Partial<CardValidationValues>;
  /** Called whenever any field changes (digits-only for number/expiry/cvc). */
  onChange?: (values: CardValidationValues) => void;
  /**
   * Called after blur/submit validation with current errors.
   * Empty object means the card payload is valid.
   */
  onValidate?: (errors: CardValidationErrors, values: CardValidationValues) => void;
  /**
   * When true, shows a compact card preview (brand + masked number).
   * @default true
   */
  showPreview?: boolean;
  /**
   * Include cardholder name field.
   * @default true
   */
  showName?: boolean;
  /** Override field labels. */
  labels?: CardValidationLabels;
  /** Override placeholders. */
  placeholders?: CardValidationPlaceholders;
  /**
   * Disable all inputs.
   * @default false
   */
  disabled?: boolean;
  /**
   * Mark fields as required (default true for number/expiry/cvc).
   * @default true
   */
  required?: boolean;
  /** Force external errors (e.g. from server). Merged over local validation. */
  errors?: CardValidationErrors;
  /**
   * Validate on every change after the first blur/submit attempt.
   * @default "blur"
   */
  validateOn?: "blur" | "change";
  /** Optional helper text under the group when there is no error. */
  helperText?: ReactNode;
  classNames?: CardValidationClassNames;
}
