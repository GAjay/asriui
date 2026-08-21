import type { Edge, Node } from "@xyflow/react";

/** Node type alias for {@link FlowChart}. Re-exports `@xyflow/react` `Node`. */
export type FlowChartNode = Node;

/** Edge type alias for {@link FlowChart}. Re-exports `@xyflow/react` `Edge`. */
export type FlowChartEdge = Edge;

/**
 * Props for the {@link FlowChart} component.
 *
 * Wraps `@xyflow/react` with sensible defaults: background grid, zoom controls,
 * and minimap. Lazy-loads the flow canvas on first render.
 *
 * Requires `@xyflow/react` as a peer dependency.
 *
 * @example
 * ```tsx
 * <FlowChart
 *   height={500}
 *   nodes={[{ id: "1", position: { x: 0, y: 0 }, data: { label: "Start" } }]}
 *   edges={[]}
 * />
 * ```
 */
export interface FlowChartProps {
  /** Initial graph nodes. Defaults to a three-node demo graph. */
  nodes?: FlowChartNode[];
  /** Initial graph edges connecting nodes. */
  edges?: FlowChartEdge[];
  /** Called when nodes are added, moved, or removed. */
  onNodesChange?: (nodes: FlowChartNode[]) => void;
  /** Called when edges are added or removed. */
  onEdgesChange?: (edges: FlowChartEdge[]) => void;
  /**
   * Canvas container height.
   * @default "400px"
   */
  height?: string | number;
  /**
   * Show the bottom-right minimap overview.
   * @default true
   */
  showMiniMap?: boolean;
  /**
   * Show zoom and fit-view controls.
   * @default true
   */
  showControls?: boolean;
  /** CSS class on the chart shell wrapper. */
  className?: string;
}
