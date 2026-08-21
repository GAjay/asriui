import type { DataGridColumn, DataGridValidationRule } from "./DataGrid.types";
import { getRawValue } from "./DataGrid.utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function columnLabel<T>(column: DataGridColumn<T>) {
  return typeof column.header === "string" ? column.header : column.id;
}

function ruleMessage<T>(rule: DataGridValidationRule, column: DataGridColumn<T>) {
  if (rule.message) return rule.message;
  const label = columnLabel(column);

  switch (rule.type) {
    case "required":
      return `${label} is required`;
    case "email":
      return "Enter a valid email address";
    case "pattern":
      return `${label} format is invalid`;
    case "unique":
      return `${label} must be unique`;
    case "minLength":
      return `${label} must be at least ${rule.value} characters`;
    case "maxLength":
      return `${label} must be at most ${rule.value} characters`;
    case "min":
      return `${label} must be at least ${rule.value}`;
    case "max":
      return `${label} must be at most ${rule.value}`;
    case "oneOf":
      return `${label} must be one of the allowed values`;
    default:
      return `${label} is invalid`;
  }
}

/** Merge column shorthand props into explicit validation rules. */
export function resolveColumnRules<T>(column: DataGridColumn<T>): DataGridValidationRule[] {
  const rules: DataGridValidationRule[] = [...(column.rules ?? [])];
  const hasRule = (type: DataGridValidationRule["type"]) => rules.some((rule) => rule.type === type);

  if (column.required && !hasRule("required")) {
    rules.unshift({ type: "required" });
  }

  if (column.unique && !hasRule("unique")) {
    rules.push({ type: "unique" });
  }

  if (column.pattern && !hasRule("pattern")) {
    const value =
      column.pattern instanceof RegExp ? column.pattern.source : String(column.pattern);
    const flags = column.pattern instanceof RegExp ? column.pattern.flags : undefined;
    rules.push({ type: "pattern", value, flags });
  }

  if (column.minLength != null && !hasRule("minLength")) {
    rules.push({ type: "minLength", value: column.minLength });
  }

  if (column.maxLength != null && !hasRule("maxLength")) {
    rules.push({ type: "maxLength", value: column.maxLength });
  }

  if (column.min != null && !hasRule("min")) {
    rules.push({ type: "min", value: column.min });
  }

  if (column.max != null && !hasRule("max")) {
    rules.push({ type: "max", value: column.max });
  }

  return rules;
}

export function validateDataGridCell<T>(
  value: unknown,
  column: DataGridColumn<T>,
  row: T,
  rows: T[],
  rowIndex: number,
): string | null {
  const rules = resolveColumnRules(column);
  const text = String(value ?? "").trim();

  for (const rule of rules) {
    switch (rule.type) {
      case "required":
        if (text.length === 0) return ruleMessage(rule, column);
        break;
      case "email":
        if (text.length > 0 && !EMAIL_REGEX.test(text)) return ruleMessage(rule, column);
        break;
      case "pattern": {
        if (text.length === 0) break;
        const regex =
          rule.value instanceof RegExp
            ? rule.value
            : new RegExp(rule.value, rule.flags);
        if (!regex.test(text)) return ruleMessage(rule, column);
        break;
      }
      case "minLength":
        if (text.length > 0 && text.length < rule.value) return ruleMessage(rule, column);
        break;
      case "maxLength":
        if (text.length > rule.value) return ruleMessage(rule, column);
        break;
      case "min": {
        const numeric = Number(value);
        if (text.length > 0 && (!Number.isFinite(numeric) || numeric < rule.value)) {
          return ruleMessage(rule, column);
        }
        break;
      }
      case "max": {
        const numeric = Number(value);
        if (text.length > 0 && (!Number.isFinite(numeric) || numeric > rule.value)) {
          return ruleMessage(rule, column);
        }
        break;
      }
      case "oneOf":
        if (text.length > 0 && !rule.values.includes(text)) return ruleMessage(rule, column);
        break;
      case "unique": {
        if (text.length === 0) break;
        const duplicates = rows.filter((entry, index) => {
          if (index === rowIndex) return false;
          return String(getRawValue(entry, column) ?? "").trim() === text;
        });
        if (duplicates.length > 0) return ruleMessage(rule, column);
        break;
      }
      case "custom": {
        const message = rule.validate(value, { row, rows, columnId: column.id, rowIndex });
        if (message) return message;
        break;
      }
      default:
        break;
    }
  }

  return null;
}

export function validateDataGridRow<T>(
  row: T,
  rowIndex: number,
  columns: DataGridColumn<T>[],
  rows: T[],
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const column of columns) {
    const value = getRawValue(row, column);
    const message = validateDataGridCell(value, column, row, rows, rowIndex);
    if (message) errors[column.id] = message;
  }

  return errors;
}
