import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react";
import type { FlowChartEdge, FlowChartNode } from "./FlowChart.types";

type Props = {
  nodes: FlowChartNode[];
  edges: FlowChartEdge[];
  onNodesChange: (changes: NodeChange<FlowChartNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<FlowChartEdge>[]) => void;
  showMiniMap: boolean;
  showControls: boolean;
};

export function FlowChartInner({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  showMiniMap,
  showControls,
}: Props) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Background />
      {showControls ? <Controls /> : null}
      {showMiniMap ? <MiniMap /> : null}
    </ReactFlow>
  );
}
