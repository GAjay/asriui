import { useEffect, useMemo, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { Label } from "../Label";
import { Switch } from "../Switch";
import { ImageDropzone } from "../ImageDropzone";
import type { FormFieldConfig, FormFieldOption, FormFieldValue, FormProps } from "./Form.types";
import { isFileList } from "./fieldUtils";
import { useForm } from "./useForm";
import styles from "./Form.module.css";
import { cn } from "../../utils/cn";

function FormFieldRenderer({
  field,
  value,
  error,
  options,
  optionsLoading,
  onValueChange,
  onBlur,
  classNames,
}: {
  field: FormFieldConfig;
  value: FormFieldValue | undefined;
  error?: string;
  options?: FormFieldOption[];
  optionsLoading?: boolean;
  onValueChange: (value: FormFieldValue) => void;
  onBlur: () => void;
  classNames?: FormProps["classNames"];
}) {
  if (field.type === "switch") {
    return (
      <div className={cn(styles.switchRow, classNames?.switchRow)}>
        <Label htmlFor={field.name}>{field.label}</Label>
        <Switch
          id={field.name}
          checked={Boolean(value)}
          onCheckedChange={(checked) => onValueChange(checked)}
        />
        {error ? <p role="alert">{error}</p> : null}
      </div>
    );
  }

  if (field.type === "image") {
    const files = isFileList(value) ? value : [];
    return (
      <div className={cn(styles.field, classNames?.field)}>
        <Label htmlFor={field.name} required={field.required}>{field.label}</Label>
        <ImageDropzone
          id={field.name}
          value={files}
          accept={field.accept ?? "image/*"}
          multiple={field.multiple}
          helperText={field.helperText}
          error={error}
          onChange={(next) => onValueChange(next)}
        />
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={cn(styles.field, classNames?.field)}>
        <Label htmlFor={field.name} required={field.required}>{field.label}</Label>
        <textarea
          id={field.name}
          className={cn(styles.textarea, classNames?.textarea)}
          placeholder={field.placeholder}
          value={String(value ?? "")}
          onChange={(event) => onValueChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
        />
        {error ? <p className={cn(styles.message, classNames?.message)} role="alert">{error}</p> : null}
      </div>
    );
  }

  if (field.type === "select") {
    const selectOptions = options ?? field.options ?? [];
    return (
      <div className={cn(styles.field, classNames?.field)}>
        <Label htmlFor={field.name} required={field.required}>{field.label}</Label>
        <select
          id={field.name}
          className={cn(styles.select, classNames?.select)}
          value={String(value ?? "")}
          disabled={optionsLoading}
          onChange={(event) => onValueChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
        >
          <option value="">{optionsLoading ? "Loading…" : "Select…"}</option>
          {selectOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error ? <p className={cn(styles.message, classNames?.message)} role="alert">{error}</p> : null}
      </div>
    );
  }

  return (
    <Input
      id={field.name}
      type={field.type === "password" ? "password" : field.type}
      label={field.label}
      placeholder={field.placeholder}
      helperText={field.helperText}
      error={error}
      required={field.required}
      value={String(value ?? "")}
      onChange={(event) => onValueChange(event.target.value)}
      onBlur={onBlur}
    />
  );
}

/**
 * JSON-configured form with built-in validation (Formik-style ergonomics without extra deps).
 */
export function Form({
  config,
  initialValues,
  onSubmit,
  loading = false,
  validateOn = "blur",
  className,
  classNames,
}: FormProps) {
  const form = useForm(config, { initialValues, validateOn });
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, FormFieldOption[]>>({});
  const [optionsLoading, setOptionsLoading] = useState<Record<string, boolean>>({});

  const optionsFromFields = useMemo(
    () => config.fields.filter((field) => field.optionsFrom),
    [config.fields],
  );

  const optionsFromKey = optionsFromFields
    .map((field) => `${field.name}:${String(form.values[field.optionsFrom!.dependsOn] ?? "")}`)
    .join("|");

  useEffect(() => {
    let cancelled = false;

    for (const field of optionsFromFields) {
      const source = field.optionsFrom!;
      const dependentValue = form.values[source.dependsOn];

      void (async () => {
        setOptionsLoading((prev) => ({ ...prev, [field.name]: true }));
        try {
          const loaded = await source.load(dependentValue, form.values);
          if (cancelled) return;
          setDynamicOptions((prev) => ({ ...prev, [field.name]: loaded }));
        } finally {
          if (!cancelled) {
            setOptionsLoading((prev) => ({ ...prev, [field.name]: false }));
          }
        }
      })();
    }

    return () => {
      cancelled = true;
    };
  }, [optionsFromFields, optionsFromKey, form.values]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await form.handleSubmit(onSubmit);
  };

  return (
    <form
      id={config.id}
      className={cn(styles.root, classNames?.root, className)}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={cn(styles.fields, classNames?.fields)}>
        {form.visibleFields.map((field) => {
          const error = form.touched[field.name] ? form.errors[field.name] : undefined;
          return (
            <FormFieldRenderer
              key={field.name}
              field={field}
              value={form.values[field.name]}
              error={error}
              options={dynamicOptions[field.name]}
              optionsLoading={optionsLoading[field.name]}
              onValueChange={(next) => form.setFieldValue(field.name, next)}
              onBlur={() => form.handleFieldBlur(field)}
              classNames={classNames}
            />
          );
        })}
      </div>
      <div className={cn(styles.actions, classNames?.actions)}>
        <Button type="submit" loading={loading}>
          {config.submitLabel ?? "Submit"}
        </Button>
      </div>
    </form>
  );
}

Form.displayName = "Form";
