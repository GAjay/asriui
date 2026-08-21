import { useCallback, useMemo, useState } from "react";
import type { FormConfig, FormErrors, FormFieldConfig, FormFieldValue, FormValues, FormValidateOn } from "./Form.types";
import { getVisibleFields, isFieldVisible } from "./fieldUtils";
import { buildInitialValues, validateField, validateForm } from "./validate";

type UseFormOptions = {
  initialValues?: FormValues;
  validateOn?: FormValidateOn;
};

export function useForm(config: FormConfig, options: UseFormOptions = {}) {
  const { initialValues, validateOn = "blur" } = options;

  const [values, setValuesState] = useState<FormValues>(() =>
    buildInitialValues(config.fields, initialValues),
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const visibleFields = useMemo(() => getVisibleFields(config.fields, values), [config.fields, values]);

  const setValues = useCallback((next: FormValues) => {
    setValuesState(next);
  }, []);

  const getValues = useCallback(() => values, [values]);

  const validateSingleField = useCallback(
    (field: FormFieldConfig, nextValues: FormValues) => {
      if (!isFieldVisible(field, nextValues)) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field.name];
          return next;
        });
        return;
      }

      const error = validateField(field, nextValues, config.fields);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) next[field.name] = error;
        else delete next[field.name];
        return next;
      });
    },
    [config.fields],
  );

  const setFieldValue = useCallback(
    (name: string, value: FormFieldValue) => {
      const field = config.fields.find((item) => item.name === name);
      if (!field) return;

      const nextValues = { ...values, [name]: value };
      setValuesState(nextValues);
      setTouched((prev) => ({ ...prev, [name]: true }));

      if (submitted && validateOn === "change") {
        validateSingleField(field, nextValues);
        const dependentFields = config.fields.filter(
          (item) =>
            item.matches === field.name ||
            item.notEqual === field.name ||
            item.uniqueAmong?.includes(field.name) ||
            item.showWhen?.field === field.name ||
            item.optionsFrom?.dependsOn === field.name,
        );
        for (const dependent of dependentFields) {
          validateSingleField(dependent, nextValues);
        }
      }
    },
    [config.fields, submitted, validateOn, validateSingleField, values],
  );

  const handleFieldBlur = useCallback(
    (field: FormFieldConfig) => {
      setTouched((prev) => ({ ...prev, [field.name]: true }));
      if (submitted && validateOn === "blur") {
        validateSingleField(field, values);
      }
    },
    [submitted, validateOn, validateSingleField, values],
  );

  const validate = useCallback(() => {
    const nextErrors = validateForm(getVisibleFields(config.fields, values), values);
    setErrors(nextErrors);
    return nextErrors;
  }, [config.fields, values]);

  const reset = useCallback(
    (overrides?: FormValues) => {
      const nextValues = buildInitialValues(config.fields, overrides ?? initialValues);
      setValuesState(nextValues);
      setErrors({});
      setTouched({});
      setSubmitted(false);
    },
    [config.fields, initialValues],
  );

  const handleSubmit = useCallback(
    async (onSubmit?: (values: FormValues) => void | Promise<void>) => {
      setSubmitted(true);
      const nextErrors = validateForm(getVisibleFields(config.fields, values), values);
      setErrors(nextErrors);
      setTouched(Object.fromEntries(config.fields.map((field) => [field.name, true])));
      if (Object.keys(nextErrors).length > 0) return undefined;
      await onSubmit?.(values);
      return values;
    },
    [config.fields, values],
  );

  return {
    values,
    errors,
    touched,
    submitted,
    visibleFields,
    setFieldValue,
    setValues,
    getValues,
    handleFieldBlur,
    validate,
    reset,
    handleSubmit,
  };
}
