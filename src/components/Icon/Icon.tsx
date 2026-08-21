import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { IconSvg } from "./icons";
import type { IconProps } from "./Icon.types";
import styles from "./Icon.module.css";

function isImageProps(props: IconProps): props is IconProps & { src: string } {
  return "src" in props && typeof props.src === "string";
}

function isBuiltinProps(props: IconProps): props is IconProps & { name: NonNullable<IconProps["name"]> } {
  return "name" in props && props.name !== undefined;
}

/** Accessible icon with built-in glyphs, custom SVG children, or image sources. */
export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(props, ref) {
  const { size = "md", label, className } = props;
  const decorative = !label;

  if (isImageProps(props)) {
    const { src, alt, objectFit = "contain", size: _size, label: _label, className: _className, ...imageRest } =
      props;
    const imageAlt = alt ?? label ?? "";

    return (
      <span
        ref={ref}
        className={cn(styles.root, styles[size], className)}
        aria-hidden={decorative && !imageAlt ? true : undefined}
        {...imageRest}
      >
        <img
          src={src}
          alt={imageAlt}
          className={styles.image}
          style={{ objectFit }}
          draggable={false}
        />
      </span>
    );
  }

  if (isBuiltinProps(props)) {
    const { name, size: _size, label: _label, className: _className, ...builtinRest } = props;

    return (
      <span
        ref={ref}
        className={cn(styles.root, styles[size], className)}
        role={decorative ? undefined : "img"}
        aria-hidden={decorative ? true : undefined}
        aria-label={label}
        {...builtinRest}
      >
        <IconSvg name={name} className={styles.svg} />
      </span>
    );
  }

  const { children, size: _size, label: _label, className: _className, ...customRest } = props;

  return (
    <span
      ref={ref}
      className={cn(styles.root, styles[size], styles.custom, className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={label}
      {...customRest}
    >
      {children}
    </span>
  );
});

Icon.displayName = "Icon";

export type { IconName } from "./icons";
