import type { FormFieldConfig, FormFieldValue, FormValues } from "./Form.types";

/** Whether a field should render based on `showWhen` and current values. */
export function isFieldVisible(field: FormFieldConfig, values: FormValues): boolean {
  const rule = field.showWhen;
  if (!rule) return true;

  const current = values[rule.field];

  if (rule.equals !== undefined && current !== rule.equals) return false;
  if (rule.notEquals !== undefined && current === rule.notEquals) return false;

  const asString = String(current ?? "");
  if (rule.oneOf && !rule.oneOf.includes(asString)) return false;
  if (rule.notOneOf && rule.notOneOf.includes(asString)) return false;

  return true;
}

export function getVisibleFields(fields: FormFieldConfig[], values: FormValues): FormFieldConfig[] {
  return fields.filter((field) => isFieldVisible(field, values));
}

export function isFileList(value: FormFieldValue | undefined): value is File[] {
  return Array.isArray(value) && value.every((entry) => entry instanceof File);
}
