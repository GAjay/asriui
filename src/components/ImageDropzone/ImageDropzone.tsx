import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../Icon";
import type { ImageDropzoneProps } from "./ImageDropzone.types";
import styles from "./ImageDropzone.module.css";

function mergeFiles(existing: File[], incoming: File[], multiple: boolean) {
  if (!multiple) return incoming.slice(0, 1);
  const seen = new Set(existing.map((file) => `${file.name}-${file.size}`));
  const next = [...existing];
  for (const file of incoming) {
    const key = `${file.name}-${file.size}`;
    if (!seen.has(key)) {
      seen.add(key);
      next.push(file);
    }
  }
  return next;
}

export function ImageDropzone({
  className,
  value = [],
  onChange,
  accept = "image/*",
  multiple = false,
  disabled = false,
  label = "Drop images here or click to upload",
  helperText,
  error,
  id,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previews, setPreviews] = useState<Array<{ key: string; url: string }>>([]);

  useEffect(() => {
    const entries = value.map((file) => ({
      key: `${file.name}-${file.size}-${file.lastModified}`,
      url: URL.createObjectURL(file),
    }));
    setPreviews(entries);
    return () => {
      for (const entry of entries) URL.revokeObjectURL(entry.url);
    };
  }, [value]);

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const incoming = Array.from(fileList).filter((file) => file.type.startsWith("image/") || accept === "image/*");
      if (!incoming.length) return;
      onChange?.(mergeFiles(value, incoming, multiple));
    },
    [accept, multiple, onChange, value],
  );

  const removeAt = (index: number) => {
    const next = value.filter((_, itemIndex) => itemIndex !== index);
    onChange?.(next);
  };

  return (
    <div className={cn(styles.root, className)}>
      <div
        className={cn(
          styles.zone,
          dragActive && styles.zoneActive,
          disabled && styles.zoneDisabled,
          error && styles.zoneError,
        )}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragActive(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragActive(false);
          if (!disabled) addFiles(event.dataTransfer.files);
        }}
        onClick={() => {
          if (!disabled) inputRef.current?.click();
        }}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (!disabled) inputRef.current?.click();
          }
        }}
        aria-disabled={disabled || undefined}
      >
        <Icon name="image" size="md" className={styles.icon} />
        <p className={styles.label}>{label}</p>
        <p className={styles.hint}>{multiple ? "PNG, JPG, or WebP" : "One image file"}</p>
        <input
          ref={inputRef}
          id={id}
          type="file"
          className={styles.input}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          onChange={(event) => {
            if (event.target.files) addFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </div>

      {previews.length > 0 ? (
        <ul className={styles.previewList}>
          {previews.map((preview, index) => (
            <li key={preview.key} className={styles.previewItem}>
              <img src={preview.url} alt="" className={styles.previewImage} />
              <button
                type="button"
                className={styles.removeButton}
                aria-label="Remove image"
                disabled={disabled}
                onClick={(event) => {
                  event.stopPropagation();
                  removeAt(index);
                }}
              >
                <Icon name="x" size="sm" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {helperText && !error ? <p className={styles.helper}>{helperText}</p> : null}
      {error ? <p className={styles.error} role="alert">{error}</p> : null}
    </div>
  );
}

ImageDropzone.displayName = "ImageDropzone";
