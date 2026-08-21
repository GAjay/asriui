import { useCallback, useMemo, useState } from "react";
import type { UseAiWorkflowBuilderOptions, UseAiWorkflowBuilderResult, AiWorkflowNodeKind } from "./AiWorkflowBuilder.types";
import {
  createBlockWorkflowNode,
  createComponentWorkflowNode,
  createWorkflowNode,
  AI_WORKFLOW_TEMPLATES,
  DEFAULT_WORKFLOW_TEMPLATE_ID,
  cloneWorkflowTemplate,
  getWorkflowTemplate,
  type AiWorkflowEdge,
  type AiWorkflowNode,
} from "./workflowDefaults";
import { ASRIUI_COMPONENT_PALETTE, DEFAULT_INTEGRATION_BLOCKS } from "./workflowCatalog";

export function useAiWorkflowBuilder({
  initialNodes,
  initialEdges,
  templateId = DEFAULT_WORKFLOW_TEMPLATE_ID,
  components = ASRIUI_COMPONENT_PALETTE,
  customComponents = [],
  blocks = DEFAULT_INTEGRATION_BLOCKS,
  customBlocks = [],
}: UseAiWorkflowBuilderOptions = {}): UseAiWorkflowBuilderResult {
  const starterTemplate = getWorkflowTemplate(templateId) ?? getWorkflowTemplate(DEFAULT_WORKFLOW_TEMPLATE_ID)!;
  const starterWorkflow = useMemo(() => {
    if (initialNodes && initialEdges) {
      return { nodes: initialNodes, edges: initialEdges };
    }
    return cloneWorkflowTemplate(starterTemplate);
  }, [initialEdges, initialNodes, starterTemplate]);

  const [nodes, setNodes] = useState<AiWorkflowNode[]>(starterWorkflow.nodes);
  const [edges, setEdges] = useState<AiWorkflowEdge[]>(starterWorkflow.edges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeTemplateId, setActiveTemplateId] = useState(templateId);

  const allComponents = useMemo(() => [...components, ...(customComponents ?? [])], [components, customComponents]);
  const allBlocks = useMemo(() => [...blocks, ...customBlocks], [blocks, customBlocks]);

  const addNode = useCallback((kind: AiWorkflowNodeKind, position?: { x: number; y: number }) => {
    setNodes((current) => {
      const next = createWorkflowNode(kind, current.length, position);
      setSelectedNodeId(next.id);
      return [...current, next];
    });
  }, []);

  const addComponentNode = useCallback(
    (slug: string, position?: { x: number; y: number }) => {
      setNodes((current) => {
        const next = createComponentWorkflowNode(slug, current.length, allComponents, position);
        if (!next) return current;
        setSelectedNodeId(next.id);
        return [...current, next];
      });
    },
    [allComponents],
  );

  const addBlockNode = useCallback(
    (blockId: string, position?: { x: number; y: number }) => {
      setNodes((current) => {
        const next = createBlockWorkflowNode(blockId, current.length, allBlocks, position);
        if (!next) return current;
        setSelectedNodeId(next.id);
        return [...current, next];
      });
    },
    [allBlocks],
  );

  const updateNode = useCallback((id: string, patch: Partial<AiWorkflowNode["data"]>) => {
    setNodes((current) =>
      current.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...patch, config: { ...node.data.config, ...patch.config } } } : node,
      ),
    );
  }, []);

  const removeNode = useCallback((id: string) => {
    setNodes((current) => current.filter((node) => node.id !== id));
    setEdges((current) => current.filter((edge) => edge.source !== id && edge.target !== id));
    setSelectedNodeId((current) => (current === id ? null : current));
  }, []);

  const loadTemplate = useCallback((nextTemplateId: string) => {
    const template = getWorkflowTemplate(nextTemplateId);
    if (!template) return;
    const next = cloneWorkflowTemplate(template);
    setNodes(next.nodes);
    setEdges(next.edges);
    setActiveTemplateId(nextTemplateId);
    setSelectedNodeId(null);
  }, []);

  const reset = useCallback(() => {
    loadTemplate(activeTemplateId);
  }, [activeTemplateId, loadTemplate]);

  return {
    nodes,
    edges,
    selectedNodeId,
    setNodes,
    setEdges,
    addNode,
    addComponentNode,
    addBlockNode,
    updateNode,
    removeNode,
    reset,
    loadTemplate,
    selectNode: setSelectedNodeId,
    activeTemplateId,
  };
}

export { AI_WORKFLOW_TEMPLATES, DEFAULT_WORKFLOW_TEMPLATE_ID };
