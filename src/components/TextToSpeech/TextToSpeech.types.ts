import type { HTMLAttributes, ReactNode } from "react";
import type { OmitMotionDomConflicts } from "../../motion/domProps";

export type TextToSpeechIconPosition = "start" | "end";

export interface TextToSpeechProps
  extends OmitMotionDomConflicts<Omit<HTMLAttributes<HTMLSpanElement>, "children">> {
  /** Custom class name for the wrapper. */
  className?: string;
  /** Text to speak. When omitted, text is derived from `children`. */
  text?: string;
  /** Wrapped content to display and speak. */
  children?: ReactNode;
  /** BCP 47 language code for speech synthesis. @default "en-US" */
  lang?: string;
  /** Installed voice URI from `speechSynthesis.getVoices()` for explicit voice selection. */
  voiceURI?: string;
  /** Speech rate. @default 1 */
  rate?: number;
  /** Speech pitch. @default 1 */
  pitch?: number;
  /** Place the speaker control before or after the text. @default "end" */
  iconPosition?: TextToSpeechIconPosition;
  /** Accessible label for the speak button. */
  speakLabel?: string;
  /** Disable the speak button. */
  disabled?: boolean;
}
