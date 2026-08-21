import { forwardRef, lazy, Suspense, useCallback, useMemo, useState } from "react";
import { cn } from "../../utils/cn";
import type { AiWorkflowBuilderProps, AiWorkflowNodeData, AiWorkflowNodeKind } from "./AiWorkflowBuilder.types";
import {
  AI_WORKFLOW_TEMPLATES,
  DEFAULT_WORKFLOW_TEMPLATE_ID,
  cloneWorkflowTemplate,
  getWorkflowTemplate,
  createBlockWorkflowNode,
  createComponentWorkflowNode,
  createWorkflowNode,
  type AiWorkflowEdge,
  type AiWorkflowNode,
} from "./workflowDefaults";
import { WorkflowInspector } from "./WorkflowInspector";
import { WorkflowPalette } from "./WorkflowPalette";
import { WorkflowTemplatePicker } from "./WorkflowTemplatePicker";
import { runWorkflow } from "./workflowRunner";
import {
  AXIOM_UI_COMPONENT_PALETTE,
  DEFAULT_INTEGRATION_BLOCKS,
  type AiWorkflowBlockDefinition,
} from "./workflowCatalog";
import styles from "./AiWorkflowBuilder.module.css";

const LazyCanvas = lazy(() =>
  import("./AiWorkflowBuilderInner").then((module) => ({ default: module.AiWorkflowBuilderInner })),
);

export const AiWorkflowBuilder = forwardRef<HTMLDivElement, AiWorkflowBuilderProps>(function AiWorkflowBuilder(
  {
    className,
    classNames,
    nodes: nodesProp,
    edges: edgesProp,
    onNodesChange,
    onEdgesChange,
    onRun,
    executeOnRun = false,
    runInput,
    height = 560,
    showMiniMap = true,
    showControls = true,
    showPalette = true,
    showComponentPalette = true,
    showBlockPalette = true,
    enableDragDrop = true,
    showInspector = true,
    showToolbar = true,
    components = AXIOM_UI_COMPONENT_PALETTE,
    customComponents = [],
    blocks = DEFAULT_INTEGRATION_BLOCKS,
    customBlocks: customBlocksProp,
    onCustomBlocksChange,
    templates = AI_WORKFLOW_TEMPLATES,
    templateId: templateIdProp,
    showTemplates = true,
    onTemplateChange,
    label = "AI workflow builder",
    ...rest
  },
  ref,
) {
  const initialTemplateId = templateIdProp ?? DEFAULT_WORKFLOW_TEMPLATE_ID;
  const initialTemplate = getWorkflowTemplate(initialTemplateId) ?? getWorkflowTemplate(DEFAULT_WORKFLOW_TEMPLATE_ID)!;
  const initialWorkflow = useMemo(
    () =>
      nodesProp && edgesProp
        ? { nodes: nodesProp, edges: edgesProp }
        : cloneWorkflowTemplate(initialTemplate),
    [edgesProp, initialTemplate, nodesProp],
  );

  const [nodes, setNodes] = useState<AiWorkflowNode[]>(initialWorkflow.nodes);
  const [edges, setEdges] = useState<AiWorkflowEdge[]>(initialWorkflow.edges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeTemplateId, setActiveTemplateId] = useState(initialTemplateId);
  const [customBlocks, setCustomBlocks] = useState<AiWorkflowBlockDefinition[]>(customBlocksProp ?? []);

  const allComponents = useMemo(() => [...components, ...customComponents], [components, customComponents]);
  const allBlocks = useMemo(() => [...blocks, ...customBlocks], [blocks, customBlocks]);

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  );

  const syncNodes = useCallback(
    (next: AiWorkflowNode[]) => {
      setNodes(next);
      onNodesChange?.(next);
    },
    [onNodesChange],
  );

  const syncEdges = useCallback(
    (next: AiWorkflowEdge[]) => {
      setEdges(next);
      onEdgesChange?.(next);
    },
    [onEdgesChange],
  );

  const appendNode = useCallback(
    (nextNode: AiWorkflowNode | null) => {
      if (!nextNode) return;
      syncNodes([...nodes, nextNode]);
      setSelectedNodeId(nextNode.id);
    },
    [nodes, syncNodes],
  );

  const addNode = useCallback(
    (kind: AiWorkflowNodeKind, position?: { x: number; y: number }) => {
      appendNode(createWorkflowNode(kind, nodes.length, position));
    },
    [appendNode, nodes.length],
  );

  const addComponentNode = useCallback(
    (slug: string, position?: { x: number; y: number }) => {
      appendNode(createComponentWorkflowNode(slug, nodes.length, allComponents, position));
    },
    [appendNode, allComponents, nodes.length],
  );

  const addBlockNode = useCallback(
    (blockId: string, position?: { x: number; y: number }) => {
      appendNode(createBlockWorkflowNode(blockId, nodes.length, allBlocks, position));
    },
    [allBlocks, appendNode, nodes.length],
  );

  const handleDropPaletteItem = useCallback(
    (
      payload:
        | { type: "workflow"; kind: AiWorkflowNodeKind }
        | { type: "component"; slug: string }
        | { type: "block"; id: string },
      position: { x: number; y: number },
    ) => {
      if (payload.type === "workflow") addNode(payload.kind, position);
      if (payload.type === "component") addComponentNode(payload.slug, position);
      if (payload.type === "block") addBlockNode(payload.id, position);
    },
    [addBlockNode, addComponentNode, addNode],
  );

  const updateNode = useCallback(
    (id: string, patch: Partial<AiWorkflowNodeData>) => {
      syncNodes(
        nodes.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  ...patch,
                  config: { ...node.data.config, ...patch.config },
                },
              }
            : node,
        ),
      );
    },
    [nodes, syncNodes],
  );

  const removeNode = useCallback(
    (id: string) => {
      syncNodes(nodes.filter((node) => node.id !== id));
      syncEdges(edges.filter((edge) => edge.source !== id && edge.target !== id));
      setSelectedNodeId((current) => (current === id ? null : current));
    },
    [edges, nodes, syncEdges, syncNodes],
  );

  const loadTemplate = useCallback(
    (templateId: string) => {
      const template = getWorkflowTemplate(templateId);
      if (!template) return;
      const next = cloneWorkflowTemplate(template);
      syncNodes(next.nodes);
      syncEdges(next.edges);
      setActiveTemplateId(templateId);
      setSelectedNodeId(null);
      onTemplateChange?.(templateId, next);
    },
    [onTemplateChange, syncEdges, syncNodes],
  );

  const resetWorkflow = useCallback(() => {
    loadTemplate(activeTemplateId);
  }, [activeTemplateId, loadTemplate]);

  const handleCustomBlocksChange = useCallback(
    (next: AiWorkflowBlockDefinition[]) => {
      setCustomBlocks(next);
      onCustomBlocksChange?.(next);
    },
    [onCustomBlocksChange],
  );

  const handleRun = useCallback(() => {
    const payload = { nodes, edges };
    if (!executeOnRun) {
      onRun?.(payload);
      return;
    }
    const result = runWorkflow({ nodes, edges, input: runInput });
    onRun?.({ ...payload, result });
  }, [edges, executeOnRun, nodes, onRun, runInput]);

  const layoutClass = !showPalette && !showInspector ? styles.compact : undefined;

  return (
    <div
      ref={ref}
      className={cn(styles.root, layoutClass, classNames?.root, className)}
      role="region"
      aria-label={label}
      {...rest}
    >
      {showToolbar ? (
        <div className={cn(styles.toolbar, classNames?.toolbar)}>
          <div>
            <p className={styles.toolbarTitle}>AI workflow builder</p>
            <p className={styles.toolbarMeta}>
              {nodes.length} nodes · {edges.length} connections
            </p>
          </div>
          <div className={styles.toolbarActions}>
            {showTemplates ? (
              <WorkflowTemplatePicker
                templates={templates}
                activeTemplateId={activeTemplateId}
                onSelect={loadTemplate}
              />
            ) : null}
            <button type="button" className={styles.button} onClick={resetWorkflow}>
              Reset
            </button>
            <button
              type="button"
              className={cn(styles.button, styles.buttonPrimary)}
              onClick={handleRun}
            >
              Run workflow
            </button>
          </div>
        </div>
      ) : null}

      {showPalette ? (
        <WorkflowPalette
          className={classNames?.palette}
          enableDragDrop={enableDragDrop}
          showComponentPalette={showComponentPalette}
          showBlockPalette={showBlockPalette}
          showTemplateGallery={showTemplates}
          templates={templates}
          activeTemplateId={activeTemplateId}
          onSelectTemplate={loadTemplate}
          components={allComponents}
          blocks={blocks}
          customBlocks={customBlocks}
          onCustomBlocksChange={handleCustomBlocksChange}
          onAddNode={addNode}
          onAddComponent={addComponentNode}
          onAddBlock={addBlockNode}
        />
      ) : null}

      <div className={cn(styles.canvas, classNames?.canvas)} style={{ height }}>
        <Suspense fallback={<div className={styles.fallback}>Loading workflow canvas…</div>}>
          <LazyCanvas
            nodes={nodes}
            edges={edges}
            enableDragDrop={enableDragDrop}
            showMiniMap={showMiniMap}
            showControls={showControls}
            onNodesChange={syncNodes}
            onEdgesChange={syncEdges}
            onSelectNode={setSelectedNodeId}
            onDropPaletteItem={handleDropPaletteItem}
          />
        </Suspense>
      </div>

      {showInspector ? (
        selectedNode ? (
          <WorkflowInspector
            node={selectedNode}
            components={allComponents}
            blocks={allBlocks}
            onUpdate={(patch) => updateNode(selectedNode.id, patch)}
            onRemove={() => removeNode(selectedNode.id)}
          />
        ) : (
          <aside className={cn(styles.inspector, classNames?.inspector)} aria-label="Workflow node inspector">
            <h3 className={styles.inspectorTitle}>Node inspector</h3>
            <p className={styles.inspectorEmpty}>
              Select a node to edit AI steps, Axiom UI components, or integration blocks. Drag items from the palette
              onto the canvas.
            </p>
          </aside>
        )
      ) : null}
    </div>
  );
});

AiWorkflowBuilder.displayName = "AiWorkflowBuilder";
