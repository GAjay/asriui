import type { FormErrors, FormFieldConfig, FormFieldValue, FormValidationRule, FormValues } from "./Form.types";
import { isFileList } from "./fieldUtils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/.+/i;

function fieldLabel(fields: FormFieldConfig[], name: string) {
  return fields.find((field) => field.name === name)?.label ?? name;
}

function stringValue(value: FormFieldValue | undefined) {
  if (isFileList(value)) return "";
  return String(value ?? "").trim();
}

function numberValue(value: FormFieldValue | undefined) {
  if (isFileList(value)) return NaN;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function defaultMessage(rule: FormValidationRule, label: string, fields: FormFieldConfig[]): string {
  switch (rule.type) {
    case "required":
      return `${label} is required`;
    case "email":
      return "Enter a valid email address";
    case "url":
      return "Enter a valid URL";
    case "minLength":
      return `${label} must be at least ${rule.value} characters`;
    case "maxLength":
      return `${label} must be at most ${rule.value} characters`;
    case "min":
      return `${label} must be at least ${rule.value}`;
    case "max":
      return `${label} must be at most ${rule.value}`;
    case "pattern":
      return `${label} format is invalid`;
    case "matches":
      return `${label} must match ${fieldLabel(fields, rule.field)}`;
    case "notEqual":
      return `${label} must be different from ${fieldLabel(fields, rule.field)}`;
    case "oneOf":
      return `${label} must be one of the allowed values`;
    case "notOneOf":
      return `${label} uses a disallowed value`;
    case "unique":
      return `${label} must be unique`;
    default:
      return `${label} is invalid`;
  }
}

/** Merge legacy field props and explicit `rules` into one validation list. */
export function resolveFieldRules(field: FormFieldConfig): FormValidationRule[] {
  const rules: FormValidationRule[] = [...(field.rules ?? [])];
  const hasRule = (type: FormValidationRule["type"]) => rules.some((rule) => rule.type === type);

  if (field.required && !hasRule("required")) {
    rules.unshift({ type: "required" });
  }

  if (field.minLength != null && !hasRule("minLength")) {
    rules.push({ type: "minLength", value: field.minLength });
  }

  if (field.maxLength != null && !hasRule("maxLength")) {
    rules.push({ type: "maxLength", value: field.maxLength });
  }

  if (field.min != null && !hasRule("min")) {
    rules.push({ type: "min", value: field.min });
  }

  if (field.max != null && !hasRule("max")) {
    rules.push({ type: "max", value: field.max });
  }

  if (field.pattern && !hasRule("pattern")) {
    rules.push({
      type: "pattern",
      value: field.pattern,
      flags: field.patternFlags,
      message: field.patternMessage,
    });
  }

  if (field.matches && !hasRule("matches")) {
    rules.push({ type: "matches", field: field.matches, message: field.matchesMessage });
  }

  if (field.notEqual && !hasRule("notEqual")) {
    rules.push({ type: "notEqual", field: field.notEqual, message: field.notEqualMessage });
  }

  if (field.uniqueAmong?.length && !hasRule("unique")) {
    rules.push({ type: "unique", fields: field.uniqueAmong });
  }

  if (field.type === "email" && !hasRule("email")) {
    rules.push({ type: "email" });
  }

  return rules;
}

function runRule(
  rule: FormValidationRule,
  field: FormFieldConfig,
  value: FormFieldValue | undefined,
  values: FormValues,
  fields: FormFieldConfig[],
): string | undefined {
  const label = field.label;
  const message = (custom?: string) => custom ?? defaultMessage(rule, label, fields);

  if (field.type === "switch") {
    if (rule.type === "required" && value !== true) {
      return message(rule.message ?? `${label} must be enabled`);
    }
    return undefined;
  }

  if (field.type === "image") {
    if (rule.type === "required" && (!isFileList(value) || value.length === 0)) {
      return message(rule.message);
    }
    return undefined;
  }

  const str = stringValue(value);

  switch (rule.type) {
    case "required":
      if (!str) return message(rule.message);
      return undefined;

    case "email":
      if (str && !EMAIL_REGEX.test(str)) return message(rule.message);
      return undefined;

    case "url":
      if (str && !URL_REGEX.test(str)) return message(rule.message);
      return undefined;

    case "minLength":
      if (str && str.length < rule.value) return message(rule.message);
      return undefined;

    case "maxLength":
      if (str && str.length > rule.value) return message(rule.message);
      return undefined;

    case "min": {
      if (!str) return undefined;
      const num = numberValue(value);
      if (Number.isNaN(num) || num < rule.value) return message(rule.message);
      return undefined;
    }

    case "max": {
      if (!str) return undefined;
      const num = numberValue(value);
      if (Number.isNaN(num) || num > rule.value) return message(rule.message);
      return undefined;
    }

    case "pattern": {
      if (!str) return undefined;
      try {
        const regex = new RegExp(rule.value, rule.flags);
        if (!regex.test(str)) return message(rule.message);
      } catch {
        return undefined;
      }
      return undefined;
    }

    case "matches": {
      if (!str) return undefined;
      const other = stringValue(values[rule.field]);
      if (str !== other) return message(rule.message);
      return undefined;
    }

    case "notEqual": {
      if (!str) return undefined;
      const other = stringValue(values[rule.field]);
      if (str === other) return message(rule.message);
      return undefined;
    }

    case "oneOf":
      if (str && !rule.values.includes(str)) return message(rule.message);
      return undefined;

    case "notOneOf":
      if (str && rule.values.includes(str)) return message(rule.message);
      return undefined;

    case "unique": {
      if (!str) return undefined;
      const compareFields = rule.fields ?? fields.map((item) => item.name);
      const duplicates = compareFields.filter(
        (name) => name !== field.name && stringValue(values[name]) === str,
      );
      if (duplicates.length > 0) return message(rule.message);
      return undefined;
    }

    default:
      return undefined;
  }
}

export function validateField(
  field: FormFieldConfig,
  values: FormValues,
  fields: FormFieldConfig[],
): string | undefined {
  const value = values[field.name];
  const rules = resolveFieldRules(field);

  for (const rule of rules) {
    const error = runRule(rule, field, value, values, fields);
    if (error) return error;
  }

  if (field.validate) {
    const customError = field.validate(value, values);
    if (customError) return customError;
  }

  return undefined;
}

export function buildInitialValues(
  fields: FormFieldConfig[],
  overrides?: FormValues,
): FormValues {
  const values: FormValues = {};
  for (const field of fields) {
    if (overrides && field.name in overrides) {
      values[field.name] = overrides[field.name]!;
      continue;
    }
    if (field.type === "switch") {
      values[field.name] = field.defaultValue ?? false;
    } else if (field.type === "image") {
      values[field.name] = Array.isArray(field.defaultValue) ? field.defaultValue : [];
    } else {
      values[field.name] = (field.defaultValue as string) ?? "";
    }
  }
  return values;
}

export function validateForm(fields: FormFieldConfig[], values: FormValues): FormErrors {
  const errors: FormErrors = {};

  for (const field of fields) {
    const error = validateField(field, values, fields);
    if (error) errors[field.name] = error;
  }

  return errors;
}
