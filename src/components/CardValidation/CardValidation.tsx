import { useCallback, useId, useMemo, useState } from "react";
import { Input } from "../Input";
import { cn } from "../../utils/cn";
import type { CardBrand, CardValidationErrors, CardValidationProps, CardValidationValues } from "./CardValidation.types";
import {
  cvcLength,
  detectCardBrand,
  digitsOnly,
  EMPTY_CARD_VALUES,
  formatCardNumber,
  formatExpiry,
  maxNumberLength,
  mergeCardValues,
  normalizeCardValues,
  validateCardValues,
} from "./validate";
import styles from "./CardValidation.module.css";

const BRAND_LABEL: Record<CardBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  discover: "Discover",
  diners: "Diners",
  jcb: "JCB",
  unionpay: "UnionPay",
  unknown: "Card",
};

function maskPreviewNumber(digits: string, brand: CardBrand): string {
  const formatted = formatCardNumber(digits.padEnd(maxNumberLength(brand), "•"), brand);
  if (!digits) return brand === "amex" ? "•••• •••••• •••••" : "•••• •••• •••• ••••";
  return formatted;
}

/**
 * Payment card fields with Luhn validation, expiry checks, CVC rules, and brand detection.
 */
export function CardValidation({
  values: controlledValues,
  defaultValues,
  onChange,
  onValidate,
  showPreview = true,
  showName = true,
  labels,
  placeholders,
  disabled = false,
  required = true,
  errors: externalErrors,
  validateOn = "blur",
  helperText,
  className,
  classNames,
  ...rest
}: CardValidationProps) {
  const reactId = useId();
  const [uncontrolled, setUncontrolled] = useState<CardValidationValues>(() =>
    normalizeCardValues(defaultValues),
  );
  const [touched, setTouched] = useState<Partial<Record<keyof CardValidationValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [localErrors, setLocalErrors] = useState<CardValidationErrors>({});

  const isControlled = controlledValues !== undefined;
  const values = useMemo(
    () =>
      isControlled
        ? mergeCardValues(EMPTY_CARD_VALUES, controlledValues ?? {})
        : uncontrolled,
    [controlledValues, isControlled, uncontrolled],
  );

  const brand = detectCardBrand(values.number);
  const expectedCvc = cvcLength(brand);

  const mergedErrors: CardValidationErrors = {
    ...localErrors,
    ...externalErrors,
  };

  const setValues = useCallback(
    (next: CardValidationValues) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const runValidation = useCallback(
    (nextValues: CardValidationValues) => {
      const nextErrors = validateCardValues(nextValues, {
        required,
        requireName: showName && required,
      });
      setLocalErrors(nextErrors);
      onValidate?.(nextErrors, nextValues);
      return nextErrors;
    },
    [onValidate, required, showName],
  );

  const updateField = useCallback(
    (field: keyof CardValidationValues, raw: string) => {
      let patch: Partial<CardValidationValues>;
      if (field === "number") {
        patch = { number: digitsOnly(raw).slice(0, maxNumberLength(detectCardBrand(raw))) };
      } else if (field === "expiry") {
        patch = { expiry: digitsOnly(raw).slice(0, 4) };
      } else if (field === "cvc") {
        patch = { cvc: digitsOnly(raw).slice(0, expectedCvc) };
      } else {
        patch = { name: raw.slice(0, 64) };
      }

      const next = mergeCardValues(values, patch);
      setValues(next);
      setTouched((prev) => ({ ...prev, [field]: true }));

      if (submitted && validateOn === "change") {
        runValidation(next);
      }
    },
    [expectedCvc, runValidation, setValues, submitted, validateOn, values],
  );

  const handleBlur = useCallback(
    (field: keyof CardValidationValues) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setSubmitted(true);
      if (validateOn === "blur" || validateOn === "change") {
        runValidation(values);
      }
    },
    [runValidation, validateOn, values],
  );

  const showError = (field: keyof CardValidationValues) =>
    Boolean((touched[field] || submitted) && mergedErrors[field]);

  const fieldError = (field: keyof CardValidationValues) =>
    showError(field) ? mergedErrors[field] : undefined;

  return (
    <div
      {...rest}
      className={cn(styles.root, classNames?.root, className)}
      data-card-brand={brand}
      role="group"
      aria-labelledby={`${reactId}-legend`}
    >
      <span id={`${reactId}-legend`} className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        Card details
      </span>

      {showPreview ? (
        <div className={cn(styles.preview, classNames?.preview)} aria-hidden="true">
          <div className={styles.previewTop}>
            <span className={cn(styles.brand, classNames?.brand)}>{BRAND_LABEL[brand]}</span>
          </div>
          <p className={styles.previewNumber}>{maskPreviewNumber(values.number, brand)}</p>
          <div className={styles.previewMeta}>
            <div>
              Name
              <strong>{values.name.trim() || "YOUR NAME"}</strong>
            </div>
            <div>
              Expires
              <strong>{values.expiry.length >= 4 ? formatExpiry(values.expiry) : "MM/YY"}</strong>
            </div>
          </div>
        </div>
      ) : null}

      <div className={cn(styles.fields, classNames?.fields)}>
        {showName ? (
          <Input
            label={labels?.name ?? "Name on card"}
            placeholder={placeholders?.name ?? "Full name"}
            autoComplete="cc-name"
            name="cc-name"
            value={values.name}
            disabled={disabled}
            required={required}
            error={fieldError("name")}
            motion={false}
            onChange={(event) => updateField("name", event.target.value)}
            onBlur={() => handleBlur("name")}
          />
        ) : null}

        <Input
          label={labels?.number ?? "Card number"}
          placeholder={placeholders?.number ?? (brand === "amex" ? "3782 822463 10005" : "4242 4242 4242 4242")}
          inputMode="numeric"
          autoComplete="cc-number"
          name="cc-number"
          value={formatCardNumber(values.number, brand)}
          disabled={disabled}
          required={required}
          error={fieldError("number")}
          suffix={<span className={styles.brand}>{BRAND_LABEL[brand]}</span>}
          motion={false}
          onChange={(event) => updateField("number", event.target.value)}
          onBlur={() => handleBlur("number")}
        />

        <div className={cn(styles.row, classNames?.row)}>
          <Input
            label={labels?.expiry ?? "Expiry"}
            placeholder={placeholders?.expiry ?? "MM/YY"}
            inputMode="numeric"
            autoComplete="cc-exp"
            name="cc-exp"
            value={formatExpiry(values.expiry)}
            disabled={disabled}
            required={required}
            error={fieldError("expiry")}
            motion={false}
            onChange={(event) => updateField("expiry", event.target.value)}
            onBlur={() => handleBlur("expiry")}
          />
          <Input
            label={labels?.cvc ?? (brand === "amex" ? "CID" : "CVC")}
            placeholder={placeholders?.cvc ?? (brand === "amex" ? "1234" : "123")}
            inputMode="numeric"
            autoComplete="cc-csc"
            name="cc-csc"
            value={values.cvc}
            disabled={disabled}
            required={required}
            error={fieldError("cvc")}
            motion={false}
            onChange={(event) => updateField("cvc", event.target.value)}
            onBlur={() => handleBlur("cvc")}
          />
        </div>
      </div>

      {helperText && !Object.keys(mergedErrors).length ? (
        <p className={cn(styles.message, classNames?.message)}>{helperText}</p>
      ) : null}
    </div>
  );
}
