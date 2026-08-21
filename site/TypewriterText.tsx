import { useEffect, useMemo, useState } from "react";
import styles from "./TypewriterText.module.css";

type Props = {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
};

const ACCENT_CLASSES = [
  styles.accentA,
  styles.accentB,
  styles.accentC,
  styles.accentD,
  styles.accentE,
] as const;

/**
 * Typewriter cycling text for hero headlines.
 */
export function TypewriterText({
  phrases,
  typingSpeed = 55,
  deletingSpeed = 35,
  pauseMs = 1800,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(() => phrases[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  const longestPhrase = useMemo(
    () => phrases.reduce((max, phrase) => (phrase.length > max.length ? phrase : max), ""),
    [phrases],
  );

  const accentClass = ACCENT_CLASSES[index % ACCENT_CLASSES.length];

  useEffect(() => {
    const current = phrases[index % phrases.length] ?? "";
    const doneTyping = text === current;
    const doneDeleting = deleting && text === "";

    let timeout = typingSpeed;

    if (!deleting && doneTyping) {
      timeout = pauseMs;
    } else if (deleting) {
      timeout = deletingSpeed;
    }

    const timer = window.setTimeout(() => {
      if (!deleting && doneTyping) {
        setDeleting(true);
        return;
      }

      if (deleting && doneDeleting) {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
        return;
      }

      const next = deleting
        ? current.slice(0, Math.max(0, text.length - 1))
        : current.slice(0, text.length + 1);
      setText(next);
    }, timeout);

    return () => window.clearTimeout(timer);
  }, [deleting, deletingSpeed, index, pauseMs, phrases, text, typingSpeed]);

  return (
    <span
      className={[styles.root, accentClass, className].filter(Boolean).join(" ")}
      aria-live="polite"
    >
      <span className={styles.measure} aria-hidden="true">
        {longestPhrase}
      </span>
      <span className={styles.track}>
        <span className={styles.text}>{text}</span>
        <span className={styles.cursor} aria-hidden="true">
          |
        </span>
      </span>
    </span>
  );
}
