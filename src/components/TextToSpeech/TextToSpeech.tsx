import { forwardRef, useMemo } from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../Icon";
import { getTextContent } from "./textContent";
import type { TextToSpeechProps } from "./TextToSpeech.types";
import { useTextToSpeech } from "./useTextToSpeech";
import styles from "./TextToSpeech.module.css";

export const TextToSpeech = forwardRef<HTMLSpanElement, TextToSpeechProps>(function TextToSpeech(
  {
    className,
    text,
    children,
    lang = "en-US",
    voiceURI,
    rate = 1,
    pitch = 1,
    iconPosition = "end",
    speakLabel = "Listen to this text",
    disabled = false,
    ...rest
  },
  ref,
) {
  const spokenText = useMemo(() => text ?? getTextContent(children), [children, text]);
  const { speak, speaking, supported } = useTextToSpeech({
    text: spokenText,
    lang,
    voiceURI,
    rate,
    pitch,
  });

  const button = (
    <button
      type="button"
      className={cn(styles.button, speaking && styles.buttonActive)}
      aria-label={speakLabel}
      disabled={disabled || !supported || !spokenText.trim()}
      onClick={() => speak()}
    >
      <Icon name={speaking ? "volume" : "speaker"} size="sm" />
    </button>
  );

  return (
    <span ref={ref} className={cn(styles.root, className)} {...rest}>
      {iconPosition === "start" ? button : null}
      {children ? <span className={styles.content}>{children}</span> : null}
      {iconPosition === "end" ? button : null}
    </span>
  );
});

TextToSpeech.displayName = "TextToSpeech";
