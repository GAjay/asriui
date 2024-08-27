import { ValidationError } from "yup";

export type TouchedFields<T> = Partial<Record<keyof T, boolean>>;
export type ErrorFields<T> = Partial<Record<keyof T, string>>;

export default function serializeYupErrors<T>(
  err: ValidationError,
  touchedFields?: TouchedFields<T>
) {
  return err.inner.reduce((acc: ErrorFields<T>, val: ValidationError) => {
    const fieldName = val.path as keyof T | undefined;

    if (touchedFields) {
      if (fieldName && touchedFields[fieldName]) acc[fieldName] = val.message;
    } else {
      if (fieldName) acc[fieldName] = val.message;
    }

    return acc;
  }, {});
}