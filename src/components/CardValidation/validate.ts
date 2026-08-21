import type { CardBrand, CardValidationErrors, CardValidationValues } from "./CardValidation.types";

const EMPTY: CardValidationValues = {
  number: "",
  expiry: "",
  cvc: "",
  name: "",
};

/** Strip everything except digits. */
export function digitsOnly(value: string): string {
  return value.replace(/\D+/g, "");
}

/**
 * Format a card number with spaces for display.
 * Amex uses 4-6-5; others use 4-4-4-4.
 */
export function formatCardNumber(digits: string, brand: CardBrand = detectCardBrand(digits)): string {
  const clean = digitsOnly(digits).slice(0, maxNumberLength(brand));
  if (brand === "amex") {
    const parts = [clean.slice(0, 4), clean.slice(4, 10), clean.slice(10, 15)].filter(Boolean);
    return parts.join(" ");
  }
  return clean.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

/** Format expiry as MM/YY. */
export function formatExpiry(digits: string): string {
  const clean = digitsOnly(digits).slice(0, 4);
  if (clean.length <= 2) return clean;
  return `${clean.slice(0, 2)}/${clean.slice(2)}`;
}

/** Expected PAN length for a brand. */
export function maxNumberLength(brand: CardBrand): number {
  if (brand === "amex") return 15;
  if (brand === "diners") return 14;
  return 16;
}

/** Expected CVC length for a brand. */
export function cvcLength(brand: CardBrand): number {
  return brand === "amex" ? 4 : 3;
}

/**
 * Detect card brand from IIN/BIN prefixes.
 * Order matters — more specific ranges first.
 */
export function detectCardBrand(number: string): CardBrand {
  const n = digitsOnly(number);
  if (!n) return "unknown";
  if (/^3[47]/.test(n)) return "amex";
  if (/^3(0[0-5]|[68])/.test(n)) return "diners";
  if (/^6(?:011|5)/.test(n)) return "discover";
  if (/^(?:2131|1800|35)/.test(n)) return "jcb";
  if (/^62/.test(n)) return "unionpay";
  if (/^5[1-5]/.test(n) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(n)) return "mastercard";
  if (/^4/.test(n)) return "visa";
  return "unknown";
}

/** Luhn checksum — returns true when the number is structurally valid. */
export function luhnCheck(number: string): boolean {
  const digits = digitsOnly(number);
  if (digits.length < 12) return false;

  let sum = 0;
  let alternate = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i]);
    if (Number.isNaN(n)) return false;
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

function parseExpiry(expiry: string): { month: number; year: number } | null {
  const clean = digitsOnly(expiry);
  if (clean.length !== 4) return null;
  const month = Number(clean.slice(0, 2));
  const year = Number(clean.slice(2, 4));
  if (month < 1 || month > 12) return null;
  return { month, year: 2000 + year };
}

/** True when expiry is a real future (or current) month. */
export function isExpiryValid(expiry: string, now = new Date()): boolean {
  const parsed = parseExpiry(expiry);
  if (!parsed) return false;
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  if (parsed.year > currentYear) return true;
  if (parsed.year < currentYear) return false;
  return parsed.month >= currentMonth;
}

export function normalizeCardValues(
  partial?: Partial<CardValidationValues>,
): CardValidationValues {
  return {
    number: digitsOnly(partial?.number ?? ""),
    expiry: digitsOnly(partial?.expiry ?? "").slice(0, 4),
    cvc: digitsOnly(partial?.cvc ?? ""),
    name: (partial?.name ?? "").trimStart(),
  };
}

/**
 * Validate card fields. Returns only keys that have errors.
 */
export function validateCardValues(
  values: Partial<CardValidationValues>,
  options: { requireName?: boolean; required?: boolean } = {},
): CardValidationErrors {
  const required = options.required !== false;
  const current = normalizeCardValues(values);
  const brand = detectCardBrand(current.number);
  const errors: CardValidationErrors = {};

  if (!current.number) {
    if (required) errors.number = "Card number is required";
  } else if (current.number.length < maxNumberLength(brand)) {
    errors.number = "Enter the full card number";
  } else if (!luhnCheck(current.number)) {
    errors.number = "Card number is invalid";
  }

  if (!current.expiry) {
    if (required) errors.expiry = "Expiry is required";
  } else if (current.expiry.length < 4) {
    errors.expiry = "Use MM/YY";
  } else if (!isExpiryValid(current.expiry)) {
    errors.expiry = "Card is expired";
  }

  const expectedCvc = cvcLength(brand);
  if (!current.cvc) {
    if (required) errors.cvc = "Security code is required";
  } else if (current.cvc.length < expectedCvc) {
    errors.cvc = brand === "amex" ? "Enter 4-digit CID" : "Enter 3-digit CVC";
  }

  if (options.requireName) {
    if (!current.name.trim()) {
      errors.name = "Name on card is required";
    } else if (current.name.trim().length < 2) {
      errors.name = "Enter the name on the card";
    }
  }

  return errors;
}

export function mergeCardValues(
  base: CardValidationValues,
  patch: Partial<CardValidationValues>,
): CardValidationValues {
  return normalizeCardValues({ ...base, ...patch });
}

export { EMPTY as EMPTY_CARD_VALUES };
