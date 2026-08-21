import { describe, expect, it } from "vitest";
import type { AiWorkflowEdge, AiWorkflowNode } from "./workflowDefaults";
import { executeBlockScript } from "./workflowScript";
import { runWorkflow } from "./workflowRunner";

const nodes: AiWorkflowNode[] = [
  {
    id: "trigger-1",
    type: "trigger",
    position: { x: 0, y: 0 },
    data: { kind: "trigger", label: "Trigger", config: { source: "webhook" } },
  },
  {
    id: "block-1",
    type: "block",
    position: { x: 200, y: 0 },
    data: {
      kind: "block",
      label: "Transform",
      blockId: "script",
      config: { script: "return { total: input.amount * 2 };" },
    },
  },
  {
    id: "output-1",
    type: "output",
    position: { x: 400, y: 0 },
    data: { kind: "output", label: "Output", config: { format: "json" } },
  },
];

const edges: AiWorkflowEdge[] = [
  { id: "e1", source: "trigger-1", target: "block-1" },
  { id: "e2", source: "block-1", target: "output-1" },
];

describe("workflowScript", () => {
  it("executes a transform script against incoming data", () => {
    const output = executeBlockScript("return { greeting: `Hi ${input.name}` };", { name: "Ada" }, {
      config: {},
      node: { kind: "block", label: "Script" },
    });

    expect(output).toEqual({ greeting: "Hi Ada" });
  });
});

describe("runWorkflow", () => {
  it("passes trigger input through block scripts", () => {
    const result = runWorkflow({
      nodes,
      edges,
      input: { amount: 5 },
    });

    expect(result.output).toEqual({ total: 10 });
    expect(result.results).toHaveLength(3);
    expect(result.results[1]?.output).toEqual({ total: 10 });
  });
});
