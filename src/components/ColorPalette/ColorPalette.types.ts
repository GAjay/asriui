export type ColorSwatch = {
  /** Display label for the swatch. */
  name: string;
  /** CSS color value. */
  value: string;
  /** Optional token name shown in UI. */
  token?: string;
  /** Foreground color for contrast preview text. */
  foreground?: string;
};

export interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Swatches to display. Uses AsriUI defaults when omitted. */
  colors?: ColorSwatch[];
  /** Show copy-to-clipboard button. @default true */
  copyable?: boolean;
  /** Column count on wide screens. @default 4 */
  columns?: number;
}

export interface ColorSwatchProps extends React.HTMLAttributes<HTMLButtonElement> {
  swatch: ColorSwatch;
  copyable?: boolean;
}
