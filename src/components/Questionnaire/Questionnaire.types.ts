import type { SlotClassNames } from "../../utils/slotClassNames";

export type QuestionnaireQuestionType = "text" | "single" | "multiple";

export type QuestionnaireQuestion = {
  id: string;
  prompt: string;
  type: QuestionnaireQuestionType;
  options?: string[];
  required?: boolean;
};

export type QuestionnaireAnswer = string | string[];

export type QuestionnaireAnswers = Record<string, QuestionnaireAnswer>;

export type QuestionnaireClassNames = SlotClassNames<"root" | "prompt" | "actions">;

export interface QuestionnaireProps {
  questions: QuestionnaireQuestion[];
  /** Called when the last question is submitted. */
  onComplete?: (answers: QuestionnaireAnswers) => void | Promise<void>;
  className?: string;
  classNames?: QuestionnaireClassNames;
  nextLabel?: string;
  backLabel?: string;
  submitLabel?: string;
}

export const DEFAULT_QUESTIONNAIRE: QuestionnaireQuestion[] = [
  {
    id: "role",
    prompt: "What are you building?",
    type: "single",
    required: true,
    options: ["Design system", "SaaS product", "Docs site", "Internal tool"],
  },
  {
    id: "needs",
    prompt: "Which layouts do you need?",
    type: "multiple",
    options: ["Landing", "Dashboard", "Forms", "AI tools"],
  },
  {
    id: "notes",
    prompt: "Anything else we should know?",
    type: "text",
  },
];
