import { useCallback } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { AiWorkflowNodeKind } from "./AiWorkflowBuilder.types";
import type { AiWorkflowEdge, AiWorkflowNode } from "./workflowDefaults";
import { workflowNodeTypes } from "./WorkflowNode";
import { WORKFLOW_DRAG_MIME, decodeWorkflowDragPayload } from "./workflowCatalog";

type DropPayload =
  | { type: "workflow"; kind: AiWorkflowNodeKind }
  | { type: "component"; slug: string }
  | { type: "block"; id: string };

type Props = {
  nodes: AiWorkflowNode[];
  edges: AiWorkflowEdge[];
  enableDragDrop?: boolean;
  showMiniMap?: boolean;
  showControls?: boolean;
  onNodesChange: (nodes: AiWorkflowNode[]) => void;
  onEdgesChange: (edges: AiWorkflowEdge[]) => void;
  onSelectNode: (id: string | null) => void;
  onDropPaletteItem: (payload: DropPayload, position: { x: number; y: number }) => void;
};

function FlowCanvas({
  nodes,
  edges,
  enableDragDrop = true,
  showMiniMap = true,
  showControls = true,
  onNodesChange,
  onEdgesChange,
  onSelectNode,
  onDropPaletteItem,
}: Props) {
  const { screenToFlowPosition } = useReactFlow();

  const handleNodesChange = (changes: NodeChange<AiWorkflowNode>[]) => {
    onNodesChange(applyNodeChanges(changes, nodes));
  };

  const handleEdgesChange = (changes: EdgeChange<AiWorkflowEdge>[]) => {
    onEdgesChange(applyEdgeChanges(changes, edges));
  };

  const handleConnect = (connection: Connection) => {
    onEdgesChange(addEdge({ ...connection, animated: true, id: `e-${connection.source}-${connection.target}` }, edges));
  };

  const onDragOver = useCallback(
    (event: React.DragEvent) => {
      if (!enableDragDrop) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    [enableDragDrop],
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      if (!enableDragDrop) return;
      event.preventDefault();
      const payload = decodeWorkflowDragPayload(event.dataTransfer.getData(WORKFLOW_DRAG_MIME));
      if (!payload) return;
      onDropPaletteItem(payload, screenToFlowPosition({ x: event.clientX, y: event.clientY }));
    },
    [enableDragDrop, onDropPaletteItem, screenToFlowPosition],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={workflowNodeTypes}
      onNodesChange={handleNodesChange}
      onEdgesChange={handleEdgesChange}
      onConnect={handleConnect}
      onSelectionChange={({ nodes: selectedNodes }) => onSelectNode(selectedNodes[0]?.id ?? null)}
      onDragOver={onDragOver}
      onDrop={onDrop}
      fitView
      proOptions={{ hideAttribution: true }}
    >
      <Background gap={18} size={1} />
      {showControls ? <Controls /> : null}
      {showMiniMap ? <MiniMap pannable zoomable /> : null}
    </ReactFlow>
  );
}

export function AiWorkflowBuilderInner(props: Props) {
  return (
    <ReactFlowProvider>
      <FlowCanvas {...props} />
    </ReactFlowProvider>
  );
}
