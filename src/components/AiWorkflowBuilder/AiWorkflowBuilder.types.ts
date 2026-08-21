import type { Dispatch, HTMLAttributes, SetStateAction } from "react";
import type { OmitMotionDomConflicts } from "../../motion/domProps";
import type { AiWorkflowEdge, AiWorkflowNode } from "./workflowDefaults";
import type { AiWorkflowBlockDefinition, AiWorkflowComponentItem } from "./workflowCatalog";
import type { AiWorkflowTemplate } from "./workflowTemplates";
import type { WorkflowRunInput, WorkflowRunResult } from "./workflowRunner";

export type AiWorkflowNodeKind =
  | "trigger"
  | "prompt"
  | "model"
  | "tool"
  | "condition"
  | "output"
  | "component"
  | "block";

export type AiWorkflowConfigField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number" | "script";
  options?: { value: string; label: string }[];
  placeholder?: string;
};

export type AiWorkflowNodeData = {
  kind: AiWorkflowNodeKind;
  label: string;
  description?: string;
  config?: Record<string, string>;
  /** AsriUI component slug when kind is `component`. */
  componentSlug?: string;
  /** Integration block id when kind is `block`. */
  blockId?: string;
};

export type AiWorkflowClassNames = {
  root?: string;
  toolbar?: string;
  palette?: string;
  canvas?: string;
  inspector?: string;
};

export interface AiWorkflowBuilderProps
  extends OmitMotionDomConflicts<Omit<HTMLAttributes<HTMLDivElement>, "onChange">> {
  /** Custom class name for the builder root. */
  className?: string;
  /** Slot class name overrides. */
  classNames?: AiWorkflowClassNames;
  /** Workflow nodes rendered on the canvas. */
  nodes?: AiWorkflowNode[];
  /** Connections between workflow nodes. */
  edges?: AiWorkflowEdge[];
  /** Called when nodes are added, moved, removed, or updated. */
  onNodesChange?: (nodes: AiWorkflowNode[]) => void;
  /** Called when edges are added or removed. */
  onEdgesChange?: (edges: AiWorkflowEdge[]) => void;
  /** Fires when the user clicks Run workflow. */
  onRun?: (workflow: {
    nodes: AiWorkflowNode[];
    edges: AiWorkflowEdge[];
    result?: WorkflowRunResult;
  }) => void;
  /** Execute block scripts and pass `result` to `onRun`. @default false */
  executeOnRun?: boolean;
  /** Initial input passed to trigger nodes when `executeOnRun` is enabled. */
  runInput?: WorkflowRunInput;
  /** Canvas height. @default 560 */
  height?: string | number;
  /** Show the React Flow minimap. @default true */
  showMiniMap?: boolean;
  /** Show the React Flow zoom controls. @default true */
  showControls?: boolean;
  /** Show the node palette. @default true */
  showPalette?: boolean;
  /** Show AsriUI components in the palette. @default true */
  showComponentPalette?: boolean;
  /** Show integration blocks in the palette. @default true */
  showBlockPalette?: boolean;
  /** Allow drag-and-drop from the palette onto the canvas. @default true */
  enableDragDrop?: boolean;
  /** Show the selected-node inspector. @default true */
  showInspector?: boolean;
  /** Show the top toolbar. @default true */
  showToolbar?: boolean;
  /** AsriUI components available in the palette. */
  components?: AiWorkflowComponentItem[];
  /** Extra UI components merged into the palette. */
  customComponents?: AiWorkflowComponentItem[];
  /** Built-in and custom integration blocks. */
  blocks?: AiWorkflowBlockDefinition[];
  /** User-defined blocks merged with `blocks`. */
  customBlocks?: AiWorkflowBlockDefinition[];
  /** Called when the user adds a custom block from the palette. */
  onCustomBlocksChange?: (blocks: AiWorkflowBlockDefinition[]) => void;
  /** Starter templates shown in the Start tab and toolbar picker. */
  templates?: AiWorkflowTemplate[];
  /** Active template id. @default "support-agent" */
  templateId?: string;
  /** Show the template gallery and toolbar picker. @default true */
  showTemplates?: boolean;
  /** Called when the user loads a different base template. */
  onTemplateChange?: (templateId: string, workflow: { nodes: AiWorkflowNode[]; edges: AiWorkflowEdge[] }) => void;
  /** Accessible label for the builder region. @default "AI workflow builder" */
  label?: string;
}

export type UseAiWorkflowBuilderOptions = {
  initialNodes?: AiWorkflowNode[];
  initialEdges?: AiWorkflowEdge[];
  templateId?: string;
  components?: AiWorkflowComponentItem[];
  customComponents?: AiWorkflowComponentItem[];
  blocks?: AiWorkflowBlockDefinition[];
  customBlocks?: AiWorkflowBlockDefinition[];
};

export type UseAiWorkflowBuilderResult = {
  nodes: AiWorkflowNode[];
  edges: AiWorkflowEdge[];
  selectedNodeId: string | null;
  setNodes: Dispatch<SetStateAction<AiWorkflowNode[]>>;
  setEdges: Dispatch<SetStateAction<AiWorkflowEdge[]>>;
  addNode: (kind: AiWorkflowNodeKind) => void;
  addComponentNode: (slug: string, position?: { x: number; y: number }) => void;
  addBlockNode: (blockId: string, position?: { x: number; y: number }) => void;
  updateNode: (id: string, patch: Partial<AiWorkflowNodeData>) => void;
  removeNode: (id: string) => void;
  reset: () => void;
  loadTemplate: (templateId: string) => void;
  selectNode: (id: string | null) => void;
  activeTemplateId: string;
};

export type { WorkflowRunInput, WorkflowRunResult, WorkflowNodeResult } from "./workflowRunner";
