import { useMemo } from "react";
import { Dropdown } from "../Dropdown";
import { cn } from "../../utils/cn";
import type { AiWorkflowTemplate } from "./workflowTemplates";
import styles from "./AiWorkflowBuilder.module.css";

type Props = {
  templates: AiWorkflowTemplate[];
  activeTemplateId: string;
  onSelect: (templateId: string) => void;
  className?: string;
};

const CATEGORY_LABEL: Record<AiWorkflowTemplate["category"], string> = {
  ai: "AI",
  automation: "Automation",
  ui: "UI",
  messaging: "Messaging",
  blank: "Blank",
};

export function WorkflowTemplatePicker({ templates, activeTemplateId, onSelect, className }: Props) {
  const options = useMemo(
    () =>
      templates.map((template) => ({
        value: template.id,
        label: template.name,
      })),
    [templates],
  );

  return (
    <Dropdown
      className={cn(styles.templatePicker, styles.templateDropdown, className)}
      label="Template"
      size="sm"
      value={activeTemplateId}
      onValueChange={(next) => {
        if (typeof next === "string") onSelect(next);
      }}
      options={options}
      placeholder="Choose a template"
      searchable
      searchPlaceholder="Search templates…"
      placement="bottom-end"
      listMaxHeight="14rem"
    />
  );
}

type GalleryProps = {
  templates: AiWorkflowTemplate[];
  activeTemplateId: string;
  onSelect: (templateId: string) => void;
};

export function WorkflowTemplateGallery({ templates, activeTemplateId, onSelect }: GalleryProps) {
  return (
    <div className={styles.templateGallery}>
      <h3 className={styles.paletteTitle}>Start from a template</h3>
      <p className={styles.templateGalleryLead}>
        Pick an n8n-style base flow, then drag more blocks and wire them together on the canvas.
      </p>
      {templates.map((template) => {
        const isActive = template.id === activeTemplateId;
        return (
          <button
            key={template.id}
            type="button"
            className={cn(styles.templateCard, isActive && styles.templateCardActive)}
            aria-pressed={isActive}
            onClick={() => onSelect(template.id)}
          >
            <span className={styles.templateCardMeta}>
              <span className={styles.templateCardCategory}>{CATEGORY_LABEL[template.category]}</span>
              <span className={styles.templateCardCount}>
                {template.nodes.length} nodes · {template.edges.length} connections
              </span>
            </span>
            <span className={styles.templateCardTitle}>{template.name}</span>
            <span className={styles.templateCardDescription}>{template.description}</span>
          </button>
        );
      })}
    </div>
  );
}
