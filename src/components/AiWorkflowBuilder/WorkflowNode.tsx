import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { cn } from "../../utils/cn";
import type { AiWorkflowNodeData } from "./AiWorkflowBuilder.types";
import styles from "./AiWorkflowBuilder.module.css";

type WorkflowNodeType = Node<AiWorkflowNodeData>;

function nodeKindLabel(data: AiWorkflowNodeData) {
  if (data.kind === "component") return data.componentSlug ?? "component";
  if (data.kind === "block") return data.blockId ?? "block";
  return data.kind;
}

export function WorkflowNode({ data, selected }: NodeProps<WorkflowNodeType>) {
  const showTarget = data.kind !== "trigger";
  const showSource = data.kind !== "output";

  return (
    <div className={cn(styles.node, styles[data.kind], selected && styles.nodeSelected)}>
      {showTarget ? <Handle type="target" position={Position.Left} /> : null}
      <span className={styles.nodeKind}>{nodeKindLabel(data)}</span>
      <p className={styles.nodeTitle}>{data.label}</p>
      {data.description ? <p className={styles.nodeDescription}>{data.description}</p> : null}
      {showSource ? <Handle type="source" position={Position.Right} /> : null}
    </div>
  );
}

export const workflowNodeTypes = {
  trigger: WorkflowNode,
  prompt: WorkflowNode,
  model: WorkflowNode,
  tool: WorkflowNode,
  condition: WorkflowNode,
  output: WorkflowNode,
  component: WorkflowNode,
  block: WorkflowNode,
};
