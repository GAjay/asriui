import type { AiWorkflowConfigField, AiWorkflowNodeData } from "./AiWorkflowBuilder.types";
import type { AiWorkflowNode } from "./workflowDefaults";
import {
  findBlockDefinition,
  findComponentItem,
  type AiWorkflowBlockDefinition,
  type AiWorkflowComponentItem,
} from "./workflowCatalog";
import { BLOCK_SCRIPT_PLACEHOLDER } from "./workflowScript";
import styles from "./AiWorkflowBuilder.module.css";

type Props = {
  node: AiWorkflowNode;
  components: AiWorkflowComponentItem[];
  blocks: AiWorkflowBlockDefinition[];
  onUpdate: (patch: Partial<AiWorkflowNodeData>) => void;
  onRemove: () => void;
};

function ConfigFields({
  fields,
  config,
  onChange,
}: {
  fields: AiWorkflowConfigField[];
  config: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <>
      {fields.map((field) => (
        <label key={field.key} className={styles.field}>
          <span className={styles.fieldLabel}>{field.label}</span>
          {field.type === "textarea" || field.type === "script" ? (
            <textarea
              className={field.type === "script" ? styles.fieldScript : styles.fieldTextarea}
              value={config[field.key] ?? ""}
              placeholder={field.placeholder}
              onChange={(event) => onChange(field.key, event.target.value)}
            />
          ) : field.type === "select" ? (
            <select
              className={styles.fieldSelect}
              value={config[field.key] ?? field.options?.[0]?.value ?? ""}
              onChange={(event) => onChange(field.key, event.target.value)}
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              className={styles.fieldInput}
              value={config[field.key] ?? ""}
              placeholder={field.placeholder}
              onChange={(event) => onChange(field.key, event.target.value)}
            />
          )}
        </label>
      ))}
    </>
  );
}

export function WorkflowInspector({ node, components, blocks, onUpdate, onRemove }: Props) {
  const config = node.data.config ?? {};

  const updateConfig = (key: string, value: string) => {
    onUpdate({ config: { ...config, [key]: value } });
  };

  const componentItem =
    node.data.kind === "component" && node.data.componentSlug
      ? findComponentItem(node.data.componentSlug, components)
      : undefined;

  const blockItem =
    node.data.kind === "block" && node.data.blockId
      ? findBlockDefinition(node.data.blockId, blocks)
      : undefined;

  return (
    <div className={styles.inspector}>
      <h3 className={styles.inspectorTitle}>Node inspector</h3>

      {node.data.kind === "component" ? (
        <p className={styles.inspectorMeta}>
          Axiom UI · <code>{node.data.componentSlug}</code>
        </p>
      ) : null}

      {node.data.kind === "block" ? (
        <p className={styles.inspectorMeta}>
          Integration · <code>{node.data.blockId}</code>
        </p>
      ) : null}

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Label</span>
        <input
          className={styles.fieldInput}
          value={node.data.label}
          onChange={(event) => onUpdate({ label: event.target.value })}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Description</span>
        <textarea
          className={styles.fieldTextarea}
          value={node.data.description ?? ""}
          onChange={(event) => onUpdate({ description: event.target.value })}
        />
      </label>

      {node.data.kind === "prompt" ? (
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Prompt template</span>
          <textarea
            className={styles.fieldTextarea}
            value={config.template ?? ""}
            onChange={(event) => updateConfig("template", event.target.value)}
          />
        </label>
      ) : null}

      {node.data.kind === "model" ? (
        <>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Provider</span>
            <input
              className={styles.fieldInput}
              value={config.provider ?? ""}
              onChange={(event) => updateConfig("provider", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Model</span>
            <input
              className={styles.fieldInput}
              value={config.model ?? ""}
              onChange={(event) => updateConfig("model", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Temperature</span>
            <input
              className={styles.fieldInput}
              value={config.temperature ?? ""}
              onChange={(event) => updateConfig("temperature", event.target.value)}
            />
          </label>
        </>
      ) : null}

      {node.data.kind === "tool" ? (
        <>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Tool name</span>
            <input
              className={styles.fieldInput}
              value={config.name ?? ""}
              onChange={(event) => updateConfig("name", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Description</span>
            <textarea
              className={styles.fieldTextarea}
              value={config.description ?? ""}
              onChange={(event) => updateConfig("description", event.target.value)}
            />
          </label>
        </>
      ) : null}

      {node.data.kind === "condition" ? (
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Expression</span>
          <input
            className={styles.fieldInput}
            value={config.expression ?? ""}
            onChange={(event) => updateConfig("expression", event.target.value)}
          />
        </label>
      ) : null}

      {node.data.kind === "trigger" ? (
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Source</span>
          <select
            className={styles.fieldSelect}
            value={config.source ?? "chat"}
            onChange={(event) => updateConfig("source", event.target.value)}
          >
            <option value="chat">Chat message</option>
            <option value="webhook">Webhook</option>
            <option value="schedule">Schedule</option>
          </select>
        </label>
      ) : null}

      {node.data.kind === "output" ? (
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Format</span>
          <select
            className={styles.fieldSelect}
            value={config.format ?? "markdown"}
            onChange={(event) => updateConfig("format", event.target.value)}
          >
            <option value="markdown">Markdown</option>
            <option value="json">JSON</option>
            <option value="text">Plain text</option>
          </select>
        </label>
      ) : null}

      {componentItem?.configFields?.length ? (
        <ConfigFields fields={componentItem.configFields} config={config} onChange={updateConfig} />
      ) : null}

      {blockItem?.configFields?.length ? (
        <ConfigFields fields={blockItem.configFields} config={config} onChange={updateConfig} />
      ) : null}

      {node.data.kind === "block" && (blockItem?.supportsScript ?? true) && !blockItem?.configFields?.some((field) => field.key === "script") ? (
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Run script on incoming data</span>
          <textarea
            className={styles.fieldScript}
            value={config.script ?? ""}
            placeholder={BLOCK_SCRIPT_PLACEHOLDER}
            onChange={(event) => updateConfig("script", event.target.value)}
          />
        </label>
      ) : null}

      {node.data.kind === "component" || node.data.kind === "block" ? (
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Raw config (JSON)</span>
          <textarea
            className={styles.fieldTextarea}
            value={JSON.stringify(config, null, 2)}
            onChange={(event) => {
              try {
                const parsed = JSON.parse(event.target.value) as Record<string, string>;
                onUpdate({ config: parsed });
              } catch {
                // Keep editing until JSON is valid.
              }
            }}
          />
        </label>
      ) : null}

      <button type="button" className={styles.button} onClick={onRemove}>
        Remove node
      </button>
    </div>
  );
}
