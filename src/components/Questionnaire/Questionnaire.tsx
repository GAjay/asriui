import { useMemo, useState } from "react";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Input } from "../Input";
import { Radio, RadioGroup } from "../Radio";
import { cn } from "../../utils/cn";
import type { QuestionnaireAnswer, QuestionnaireProps } from "./Questionnaire.types";
import styles from "./Questionnaire.module.css";

export function Questionnaire({
  questions,
  onComplete,
  className,
  nextLabel = "Next",
  backLabel = "Back",
  submitLabel = "Submit answers",
}: QuestionnaireProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuestionnaireAnswer>>({});
  const [error, setError] = useState("");

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const value = question ? answers[question.id] : undefined;

  const progress = useMemo(() => {
    if (!questions.length) return "0 / 0";
    return `${index + 1} / ${questions.length}`;
  }, [index, questions.length]);

  if (!question) {
    return (
      <div className={cn(styles.root, className)}>
        <p className={styles.empty}>No questions to show.</p>
      </div>
    );
  }

  const current = question;

  function setAnswer(next: QuestionnaireAnswer) {
    setAnswers((state) => ({ ...state, [current.id]: next }));
    setError("");
  }

  function validate() {
    if (!current.required) return true;
    if (current.type === "multiple") {
      return Array.isArray(value) && value.length > 0;
    }
    return Boolean(typeof value === "string" ? value.trim() : value);
  }

  async function goNext() {
    if (!validate()) {
      setError("Please answer this question to continue.");
      return;
    }
    if (isLast) {
      await onComplete?.(answers);
      return;
    }
    setIndex((current) => current + 1);
  }

  return (
      <div className={cn(styles.root, className)} role="group" aria-label="Questionnaire">
        <p className={styles.progress}>{progress}</p>
        <p className={styles.prompt}>{current.prompt}</p>

        {current.type === "text" ? (
          <Input
            label="Your answer"
            value={typeof value === "string" ? value : ""}
            onChange={(event) => setAnswer(event.target.value)}
          />
        ) : null}

        {current.type === "single" ? (
          <RadioGroup
            name={current.id}
            value={typeof value === "string" ? value : ""}
            onValueChange={setAnswer}
          >
            {(current.options ?? []).map((option) => (
              <Radio key={option} value={option} label={option} />
            ))}
          </RadioGroup>
        ) : null}

        {current.type === "multiple" ? (
          <div className={styles.stack}>
            {(current.options ?? []).map((option) => {
              const selected = Array.isArray(value) ? value : [];
              return (
                <Checkbox
                  key={option}
                  label={option}
                  checked={selected.includes(option)}
                  onCheckedChange={(checked) => {
                    setAnswer(checked ? [...selected, option] : selected.filter((item) => item !== option));
                  }}
                />
              );
            })}
          </div>
        ) : null}

        {error ? (
          <p className={styles.error} role="alert">
            {error}
          </p>
        ) : null}

        <div className={styles.actions}>
          <Button variant="secondary" disabled={index === 0} onClick={() => setIndex((current) => Math.max(0, current - 1))}>
            {backLabel}
          </Button>
          <Button onClick={() => void goNext()}>{isLast ? submitLabel : nextLabel}</Button>
        </div>
      </div>
  );
}
