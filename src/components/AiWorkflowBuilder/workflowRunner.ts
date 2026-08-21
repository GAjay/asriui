import type { AiWorkflowEdge, AiWorkflowNode } from "./workflowDefaults";
import { executeBlockScript } from "./workflowScript";

export type WorkflowRunInput = Record<string, unknown>;

export type WorkflowNodeResult = {
  nodeId: string;
  kind: string;
  label: string;
  input: unknown;
  output: unknown;
  error?: string;
};

export type WorkflowRunResult = {
  results: WorkflowNodeResult[];
  output: unknown;
};

type RunWorkflowOptions = {
  nodes: AiWorkflowNode[];
  edges: AiWorkflowEdge[];
  input?: WorkflowRunInput;
};

function getIncomingEdges(nodeId: string, edges: AiWorkflowEdge[]) {
  return edges.filter((edge) => edge.target === nodeId);
}

function getOutgoingEdges(nodeId: string, edges: AiWorkflowEdge[]) {
  return edges.filter((edge) => edge.source === nodeId);
}

function mergeInputs(outputs: unknown[]): unknown {
  if (outputs.length === 0) return {};
  if (outputs.length === 1) return outputs[0];
  return { upstream: outputs };
}

function topologicalOrder(nodes: AiWorkflowNode[], edges: AiWorkflowEdge[]): AiWorkflowNode[] {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const indegree = new Map(nodes.map((node) => [node.id, 0]));

  for (const edge of edges) {
    if (!nodeMap.has(edge.target)) continue;
    indegree.set(edge.target, (indegree.get(edge.target) ?? 0) + 1);
  }

  const triggers = nodes.filter((node) => node.data.kind === "trigger" || (indegree.get(node.id) ?? 0) === 0);
  const queue = [...triggers];
  const visited = new Set<string>();
  const ordered: AiWorkflowNode[] = [];

  while (queue.length > 0) {
    const node = queue.shift();
    if (!node || visited.has(node.id)) continue;
    visited.add(node.id);
    ordered.push(node);

    for (const edge of getOutgoingEdges(node.id, edges)) {
      const target = nodeMap.get(edge.target);
      if (!target || visited.has(target.id)) continue;
      const nextDegree = (indegree.get(target.id) ?? 1) - 1;
      indegree.set(target.id, nextDegree);
      if (nextDegree <= 0) queue.push(target);
    }
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) ordered.push(node);
  }

  return ordered;
}

function runNode(node: AiWorkflowNode, input: unknown): WorkflowNodeResult {
  const config = node.data.config ?? {};

  if (node.data.kind === "block" || node.data.blockId === "script") {
    const script = config.script;
    if (script?.trim()) {
      try {
        const output = executeBlockScript(script, input, { config, node: node.data });
        return {
          nodeId: node.id,
          kind: node.data.kind,
          label: node.data.label,
          input,
          output,
        };
      } catch (error) {
        return {
          nodeId: node.id,
          kind: node.data.kind,
          label: node.data.label,
          input,
          output: input,
          error: error instanceof Error ? error.message : "Script execution failed.",
        };
      }
    }
  }

  if (node.data.kind === "condition") {
    return {
      nodeId: node.id,
      kind: node.data.kind,
      label: node.data.label,
      input,
      output: { matched: true, expression: config.expression ?? "", input },
    };
  }

  if (node.data.kind === "output") {
    return {
      nodeId: node.id,
      kind: node.data.kind,
      label: node.data.label,
      input,
      output: input,
    };
  }

  return {
    nodeId: node.id,
    kind: node.data.kind,
    label: node.data.label,
    input,
    output: input,
  };
}

/** Execute a workflow graph and run block scripts against incoming node data. */
export function runWorkflow({ nodes, edges, input = {} }: RunWorkflowOptions): WorkflowRunResult {
  const ordered = topologicalOrder(nodes, edges);
  const outputs = new Map<string, unknown>();
  const results: WorkflowNodeResult[] = [];

  for (const node of ordered) {
    const parents = getIncomingEdges(node.id, edges);
    const parentOutputs = parents.map((edge) => outputs.get(edge.source)).filter((value) => value !== undefined);
    const nodeInput = node.data.kind === "trigger" ? input : mergeInputs(parentOutputs);
    const result = runNode(node, nodeInput);
    outputs.set(node.id, result.output);
    results.push(result);
  }

  const sinkNodes = nodes.filter((node) => getOutgoingEdges(node.id, edges).length === 0);
  const finalOutput =
    sinkNodes.length === 1
      ? outputs.get(sinkNodes[0]!.id)
      : Object.fromEntries(sinkNodes.map((node) => [node.id, outputs.get(node.id)]));

  return { results, output: finalOutput };
}
