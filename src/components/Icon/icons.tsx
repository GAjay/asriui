import type { SVGProps } from "react";

export type IconName =
  | "accessibility"
  | "package"
  | "puzzle"
  | "sparkles"
  | "form"
  | "rocket"
  | "palette"
  | "type"
  | "image"
  | "bot"
  | "send"
  | "check"
  | "copy"
  | "chevron-left"
  | "chevron-right"
  | "grid"
  | "code"
  | "menu"
  | "x"
  | "speaker"
  | "volume";

type PathDef = {
  viewBox?: string;
  paths: Array<{ d: string; fillRule?: "evenodd"; clipRule?: "evenodd" }>;
};

export const ICONS: Record<IconName, PathDef> = {
  accessibility: {
    paths: [
      {
        d: "M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-1 6.5a1 1 0 0 1 1 1V11h2V9.5a1 1 0 1 1 2 0V11h1.2a1 1 0 0 1 .98 1.2l-.6 3a1 1 0 0 1-.98.8H14v4.5a1 1 0 1 1-2 0V16H9v4.5a1 1 0 1 1-2 0V16H5.4a1 1 0 0 1-.98-.8l-.6-3A1 1 0 0 1 5.8 11H7V9.5a1 1 0 0 1 1-1Z",
      },
    ],
  },
  package: {
    paths: [
      { d: "M12 3 3 7.5 12 12l9-4.5L12 3Z" },
      { d: "M3 12.5 12 17l9-4.5" },
      { d: "M3 17.5 12 22l9-4.5" },
    ],
  },
  puzzle: {
    paths: [
      {
        d: "M8 4a2 2 0 0 1 2-2h1v1a2 2 0 1 0 4 0V2h1a2 2 0 0 1 2 2v1h1a2 2 0 0 1 0 4h-1v3h1a2 2 0 0 1 0 4h-1v1a2 2 0 0 1-2 2h-1v-1a2 2 0 1 0-4 0v1H10a2 2 0 0 1-2-2v-1H7a2 2 0 0 1 0-4h1V9H7a2 2 0 0 1 0-4h1V4Z",
      },
    ],
  },
  sparkles: {
    paths: [
      { d: "m12 3 1.2 3.6L17 7.8l-3.8 1.2L12 12.6 10.8 9 7 7.8l3.8-1.2L12 3Z" },
      { d: "M5 14l.7 2.1L8 17l-2.3.7L5 20l-.7-2.3L2 17l2.3-.9L5 14Z" },
      { d: "M18 13l.9 2.7L22 17l-2.7.8L18 21l-.9-2.7L14 17l2.7-.8L18 13Z" },
    ],
  },
  form: {
    paths: [
      { d: "M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" },
      { d: "M8 8h8M8 12h8M8 16h5" },
    ],
  },
  rocket: {
    paths: [
      { d: "M12 3c3 2.5 5 6 5 10a5 5 0 0 1-10 0c0-4 2-7.5 5-10Z" },
      { d: "M9 14l-2 5 3-1 2-2-3-2Z" },
      { d: "M12 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" },
    ],
  },
  palette: {
    paths: [
      {
        d: "M12 2a10 10 0 1 0 0 20h1.8a2.2 2.2 0 0 0 0-4.4H12a1.6 1.6 0 1 1 0-3.2h.4a2.2 2.2 0 0 0 0-4.4H12A10 10 0 0 0 12 2Z",
      },
      { d: "M7.5 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM10 6.8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM14.5 7.2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM16.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" },
    ],
  },
  type: {
    paths: [
      { d: "M6 5h12M12 5v14M8 19h8" },
    ],
  },
  image: {
    paths: [
      { d: "M5 5h14v14H5V5Z" },
      { d: "m5 15 4-4 3 3 2-2 5 5" },
      { d: "M9 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" },
    ],
  },
  bot: {
    paths: [
      { d: "M8 8h8v9H8V8Z" },
      { d: "M10 5h4v3h-4V5Z" },
      { d: "M9 12h2M13 12h2M10 15h4" },
      { d: "M5 11H3M21 11h-2" },
    ],
  },
  send: {
    paths: [{ d: "m4 12 16-7-4 16-2-7-7-2 16-7Z" }],
  },
  check: {
    paths: [{ d: "m5 12 4 4 10-10" }],
  },
  copy: {
    paths: [
      { d: "M9 9h8v10H9V9Z" },
      { d: "M7 15H5V5h10v2" },
    ],
  },
  "chevron-left": {
    paths: [{ d: "m14 6-6 6 6 6" }],
  },
  "chevron-right": {
    paths: [{ d: "m10 6 6 6-6 6" }],
  },
  grid: {
    paths: [
      { d: "M4 4h6v6H4V4ZM14 4h6v6h-6V4ZM4 14h6v6H4v-6ZM14 14h6v6h-6v-6Z" },
    ],
  },
  code: {
    paths: [
      { d: "m8 8-4 4 4 4" },
      { d: "m16 8 4 4-4 4" },
      { d: "M13 6l-2 12" },
    ],
  },
  menu: {
    paths: [
      { d: "M4 7h16" },
      { d: "M4 12h16" },
      { d: "M4 17h16" },
    ],
  },
  x: {
    paths: [
      { d: "M6 6l12 12" },
      { d: "M18 6 6 18" },
    ],
  },
  speaker: {
    paths: [
      { d: "M11 5 6 9H3v6h3l5 4V5Z" },
      { d: "M15.5 9a3.5 3.5 0 0 1 0 6" },
    ],
  },
  volume: {
    paths: [
      { d: "M8 9.5v5l-3.5 3H3v-11h2.5L8 9.5Z" },
      { d: "M15.5 8.5a4.5 4.5 0 0 1 0 7" },
      { d: "M18 6a7.5 7.5 0 0 1 0 12" },
    ],
  },
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function IconSvg({ name, ...props }: IconSvgProps) {
  const def = ICONS[name];
  return (
    <svg
      viewBox={def.viewBox ?? "0 0 24 24"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {def.paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          fillRule={path.fillRule}
          clipRule={path.clipRule}
        />
      ))}
    </svg>
  );
}
