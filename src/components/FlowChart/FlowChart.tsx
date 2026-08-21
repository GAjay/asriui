import { lazy, Suspense, useCallback, useState } from "react";
import {
  applyEdgeChanges,
  applyNodeChanges,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { cn } from "../../utils/cn";
import type { FlowChartEdge, FlowChartNode, FlowChartProps } from "./FlowChart.types";
import styles from "./FlowChart.module.css";

const LazyFlow = lazy(() =>
  import("./FlowChartInner").then((m) => ({ default: m.FlowChartInner })),
);

const DEFAULT_NODES: FlowChartNode[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Start" } },
  { id: "2", position: { x: 200, y: 80 }, data: { label: "Process" } },
  { id: "3", position: { x: 400, y: 0 }, data: { label: "End" } },
];

const DEFAULT_EDGES: FlowChartEdge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

/**
 * Configurable React Flow chart builder with sensible defaults.
 */
export function FlowChart({
  nodes: nodesProp,
  edges: edgesProp,
  onNodesChange,
  onEdgesChange,
  height = "400px",
  showMiniMap = true,
  showControls = true,
  className,
}: FlowChartProps) {
  const [nodes, setNodes] = useState<FlowChartNode[]>(nodesProp ?? DEFAULT_NODES);
  const [edges, setEdges] = useState<FlowChartEdge[]>(edgesProp ?? DEFAULT_EDGES);

  const handleNodesChange = useCallback(
    (changes: NodeChange<FlowChartNode>[]) => {
      setNodes((current) => {
        const next = applyNodeChanges(changes, current);
        onNodesChange?.(next);
        return next;
      });
    },
    [onNodesChange],
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange<FlowChartEdge>[]) => {
      setEdges((current) => {
        const next = applyEdgeChanges(changes, current);
        onEdgesChange?.(next);
        return next;
      });
    },
    [onEdgesChange],
  );

  return (
    <div className={cn(styles.shell, className)} style={{ height }}>
      <Suspense fallback={<div className={styles.fallback}>Loading flow chart…</div>}>
        <LazyFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          showMiniMap={showMiniMap}
          showControls={showControls}
        />
      </Suspense>
    </div>
  );
}

FlowChart.displayName = "FlowChart";
