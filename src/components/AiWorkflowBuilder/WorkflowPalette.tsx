import type { DragEvent } from "react";
import { useMemo, useState } from "react";
import { cn } from "../../utils/cn";
import type { AiWorkflowNodeKind } from "./AiWorkflowBuilder.types";
import { AI_WORKFLOW_PALETTE } from "./workflowDefaults";
import {
  ASRIUI_COMPONENT_PALETTE,
  DEFAULT_INTEGRATION_BLOCKS,
  WORKFLOW_DRAG_MIME,
  createCustomBlockDefinition,
  encodeWorkflowDragPayload,
  type AiWorkflowBlockDefinition,
  type AiWorkflowComponentItem,
} from "./workflowCatalog";
import type { AiWorkflowTemplate } from "./workflowTemplates";
import { WorkflowTemplateGallery } from "./WorkflowTemplatePicker";
import styles from "./AiWorkflowBuilder.module.css";

type PaletteSection = "start" | "workflow" | "components" | "blocks";

type Props = {
  enableDragDrop?: boolean;
  showComponentPalette?: boolean;
  showBlockPalette?: boolean;
  showTemplateGallery?: boolean;
  templates?: AiWorkflowTemplate[];
  activeTemplateId?: string;
  onSelectTemplate?: (templateId: string) => void;
  components?: AiWorkflowComponentItem[];
  blocks?: AiWorkflowBlockDefinition[];
  customBlocks?: AiWorkflowBlockDefinition[];
  onCustomBlocksChange?: (blocks: AiWorkflowBlockDefinition[]) => void;
  onAddNode: (kind: AiWorkflowNodeKind) => void;
  onAddComponent: (slug: string) => void;
  onAddBlock: (blockId: string) => void;
  className?: string;
};

function startPaletteDrag(event: DragEvent, payload: Parameters<typeof encodeWorkflowDragPayload>[0]) {
  event.dataTransfer.setData(WORKFLOW_DRAG_MIME, encodeWorkflowDragPayload(payload));
  event.dataTransfer.effectAllowed = "move";
}

export function WorkflowPalette({
  enableDragDrop = true,
  showComponentPalette = true,
  showBlockPalette = true,
  showTemplateGallery = true,
  templates = [],
  activeTemplateId,
  onSelectTemplate,
  components = ASRIUI_COMPONENT_PALETTE,
  blocks = DEFAULT_INTEGRATION_BLOCKS,
  customBlocks = [],
  onCustomBlocksChange,
  onAddNode,
  onAddComponent,
  onAddBlock,
  className,
}: Props) {
  const [section, setSection] = useState<PaletteSection>("start");
  const [query, setQuery] = useState("");
  const [customName, setCustomName] = useState("");
  const [customDescription, setCustomDescription] = useState("");

  const allBlocks = useMemo(() => [...blocks, ...customBlocks], [blocks, customBlocks]);

  const filteredComponents = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return components;
    return components.filter(
      (item) =>
        item.name.toLowerCase().includes(normalized) ||
        item.slug.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized),
    );
  }, [components, query]);

  const filteredBlocks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return allBlocks;
    return allBlocks.filter(
      (item) =>
        item.label.toLowerCase().includes(normalized) ||
        item.id.toLowerCase().includes(normalized) ||
        (item.category ?? "").toLowerCase().includes(normalized),
    );
  }, [allBlocks, query]);

  const handleAddCustomBlock = () => {
    if (!customName.trim()) return;
    const next = createCustomBlockDefinition(customName, customDescription);
    onCustomBlocksChange?.([...customBlocks, next]);
    setCustomName("");
    setCustomDescription("");
    setSection("blocks");
    onAddBlock(next.id);
  };

  return (
    <aside className={cn(styles.palette, className)} aria-label="Workflow node palette">
      <div className={styles.paletteTabs} role="tablist" aria-label="Palette sections">
        {showTemplateGallery ? (
          <button
            type="button"
            role="tab"
            aria-selected={section === "start"}
            className={cn(styles.paletteTab, section === "start" && styles.paletteTabActive)}
            onClick={() => setSection("start")}
          >
            Start
          </button>
        ) : null}
        <button
          type="button"
          role="tab"
          aria-selected={section === "workflow"}
          className={cn(styles.paletteTab, section === "workflow" && styles.paletteTabActive)}
          onClick={() => setSection("workflow")}
        >
          AI
        </button>
        {showComponentPalette ? (
          <button
            type="button"
            role="tab"
            aria-selected={section === "components"}
            className={cn(styles.paletteTab, section === "components" && styles.paletteTabActive)}
            onClick={() => setSection("components")}
          >
            UI
          </button>
        ) : null}
        {showBlockPalette ? (
          <button
            type="button"
            role="tab"
            aria-selected={section === "blocks"}
            className={cn(styles.paletteTab, section === "blocks" && styles.paletteTabActive)}
            onClick={() => setSection("blocks")}
          >
            Blocks
          </button>
        ) : null}
      </div>

      {section !== "workflow" && section !== "start" ? (
        <label className={styles.paletteSearch}>
          <span className={styles.fieldLabel}>Search</span>
          <input
            className={styles.fieldInput}
            value={query}
            placeholder={section === "components" ? "Search components…" : "Search blocks…"}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      ) : null}

      {section === "start" && showTemplateGallery && onSelectTemplate && activeTemplateId ? (
        <WorkflowTemplateGallery
          templates={templates}
          activeTemplateId={activeTemplateId}
          onSelect={onSelectTemplate}
        />
      ) : null}

      {section === "workflow" ? (
        <div className={styles.paletteSection}>
          <h3 className={styles.paletteTitle}>Workflow nodes</h3>
          {AI_WORKFLOW_PALETTE.map((item) => (
            <button
              key={item.kind}
              type="button"
              className={styles.paletteItem}
              aria-label={`Add ${item.label} node`}
              draggable={enableDragDrop}
              onDragStart={
                enableDragDrop
                  ? (event) => startPaletteDrag(event, { type: "workflow", kind: item.kind })
                  : undefined
              }
              onClick={() => onAddNode(item.kind)}
            >
              <span className={styles.paletteLabel}>{item.label}</span>
              <span className={styles.paletteDescription}>{item.description}</span>
            </button>
          ))}
        </div>
      ) : null}

      {section === "components" && showComponentPalette ? (
        <div className={styles.paletteSection}>
          <h3 className={styles.paletteTitle}>AsriUI components</h3>
          {filteredComponents.length === 0 ? (
            <p className={styles.paletteEmpty}>No components match your search.</p>
          ) : (
            filteredComponents.map((item) => (
              <button
                key={item.slug}
                type="button"
                className={styles.paletteItem}
                aria-label={`Add ${item.name} component node`}
                draggable={enableDragDrop}
                onDragStart={
                  enableDragDrop
                    ? (event) => startPaletteDrag(event, { type: "component", slug: item.slug })
                    : undefined
                }
                onClick={() => onAddComponent(item.slug)}
              >
                <span className={styles.paletteLabel}>{item.name}</span>
                <span className={styles.paletteMeta}>{item.category}</span>
                <span className={styles.paletteDescription}>{item.description}</span>
              </button>
            ))
          )}
        </div>
      ) : null}

      {section === "blocks" && showBlockPalette ? (
        <div className={styles.paletteSection}>
          <h3 className={styles.paletteTitle}>Integration blocks</h3>
          {filteredBlocks.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.paletteItem}
              aria-label={`Add ${item.label} block`}
              draggable={enableDragDrop}
              onDragStart={
                enableDragDrop
                  ? (event) => startPaletteDrag(event, { type: "block", id: item.id })
                  : undefined
              }
              onClick={() => onAddBlock(item.id)}
            >
              <span className={styles.paletteLabel}>{item.label}</span>
              <span className={styles.paletteMeta}>{item.category ?? "integration"}</span>
              <span className={styles.paletteDescription}>{item.description}</span>
            </button>
          ))}

          <div className={styles.customBlockForm}>
            <h4 className={styles.customBlockTitle}>Add custom block</h4>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Name</span>
                <input
                  className={styles.fieldInput}
                  value={customName}
                  placeholder="WhatsApp follow-up"
                  onChange={(event) => setCustomName(event.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Description</span>
                <textarea
                  className={styles.fieldTextarea}
                  value={customDescription}
                  placeholder="What does this block do?"
                  onChange={(event) => setCustomDescription(event.target.value)}
                />
              </label>
              <button type="button" className={styles.button} onClick={handleAddCustomBlock}>
                Add block
              </button>
            </div>
        </div>
      ) : null}
    </aside>
  );
}
