import type { Edge, Node } from "@xyflow/react";
import type { AiWorkflowNodeData, AiWorkflowNodeKind } from "./AiWorkflowBuilder.types";
import {
  DEFAULT_INTEGRATION_BLOCKS,
  findBlockDefinition,
  findComponentItem,
  type AiWorkflowBlockDefinition,
  type AiWorkflowComponentItem,
} from "./workflowCatalog";

export type AiWorkflowNode = Node<AiWorkflowNodeData, AiWorkflowNodeKind>;
export type AiWorkflowEdge = Edge;

export type AiWorkflowPaletteItem = {
  kind: AiWorkflowNodeKind;
  label: string;
  description: string;
  defaultConfig?: Record<string, string>;
};

export const AI_WORKFLOW_PALETTE: AiWorkflowPaletteItem[] = [
  {
    kind: "trigger",
    label: "Trigger",
    description: "Start the workflow from chat, webhook, or schedule.",
    defaultConfig: { source: "chat" },
  },
  {
    kind: "prompt",
    label: "Prompt",
    description: "System or user prompt template sent to the model.",
    defaultConfig: { template: "You are a helpful assistant." },
  },
  {
    kind: "model",
    label: "Model",
    description: "LLM provider, model name, and generation settings.",
    defaultConfig: { provider: "openai", model: "gpt-4.1-mini", temperature: "0.2" },
  },
  {
    kind: "tool",
    label: "Tool",
    description: "Function or API the agent can call.",
    defaultConfig: { name: "search_docs", description: "Search product documentation." },
  },
  {
    kind: "condition",
    label: "Condition",
    description: "Branch on model output, score, or metadata.",
    defaultConfig: { expression: "output.confidence > 0.8" },
  },
  {
    kind: "output",
    label: "Output",
    description: "Return a response or hand off to another system.",
    defaultConfig: { format: "markdown" },
  },
];

export function createWorkflowNode(
  kind: AiWorkflowNodeKind,
  index: number,
  position?: { x: number; y: number },
): AiWorkflowNode {
  const template = AI_WORKFLOW_PALETTE.find((item) => item.kind === kind) ?? AI_WORKFLOW_PALETTE[0]!;
  return {
    id: `${kind}-${Date.now()}-${index}`,
    type: kind,
    position: position ?? { x: 60 + (index % 3) * 220, y: 60 + Math.floor(index / 3) * 150 },
    data: {
      kind,
      label: template.label,
      description: template.description,
      config: { ...template.defaultConfig },
    },
  };
}

export function createComponentWorkflowNode(
  slug: string,
  index: number,
  components: AiWorkflowComponentItem[],
  position?: { x: number; y: number },
): AiWorkflowNode | null {
  const item = findComponentItem(slug, components);
  if (!item) return null;

  return {
    id: `component-${slug}-${Date.now()}-${index}`,
    type: "component",
    position: position ?? { x: 60 + (index % 3) * 220, y: 60 + Math.floor(index / 3) * 150 },
    data: {
      kind: "component",
      label: item.name,
      description: item.description,
      componentSlug: item.slug,
      config: { ...item.defaultConfig },
    },
  };
}

export function createBlockWorkflowNode(
  blockId: string,
  index: number,
  blocks: AiWorkflowBlockDefinition[],
  position?: { x: number; y: number },
): AiWorkflowNode | null {
  const item = findBlockDefinition(blockId, blocks);
  if (!item) return null;

  return {
    id: `block-${blockId}-${Date.now()}-${index}`,
    type: "block",
    position: position ?? { x: 60 + (index % 3) * 220, y: 60 + Math.floor(index / 3) * 150 },
    data: {
      kind: "block",
      label: item.label,
      description: item.description,
      blockId: item.id,
      config: { ...item.defaultConfig },
    },
  };
}

export { DEFAULT_INTEGRATION_BLOCKS };
export type { AiWorkflowBlockDefinition, AiWorkflowComponentItem };

export {
  AI_WORKFLOW_TEMPLATES,
  DEFAULT_WORKFLOW_TEMPLATE_ID,
  DEFAULT_AI_WORKFLOW_NODES,
  DEFAULT_AI_WORKFLOW_EDGES,
  getWorkflowTemplate,
  cloneWorkflowTemplate,
} from "./workflowTemplates";
export type { AiWorkflowTemplate, AiWorkflowTemplateCategory } from "./workflowTemplates";
