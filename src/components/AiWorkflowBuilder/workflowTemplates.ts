import type { AiWorkflowEdge, AiWorkflowNode } from "./workflowDefaults";

export type AiWorkflowTemplateCategory = "ai" | "automation" | "ui" | "messaging" | "blank";

export type AiWorkflowTemplate = {
  id: string;
  name: string;
  description: string;
  category: AiWorkflowTemplateCategory;
  nodes: AiWorkflowNode[];
  edges: AiWorkflowEdge[];
};

const edge = (id: string, source: string, target: string): AiWorkflowEdge => ({
  id,
  source,
  target,
  animated: true,
});

/** Classic support chatbot: trigger → prompt → model → reply. */
const SUPPORT_AGENT_NODES: AiWorkflowNode[] = [
  {
    id: "trigger-1",
    type: "trigger",
    position: { x: 40, y: 140 },
    data: {
      kind: "trigger",
      label: "User message",
      description: "Starts when a user sends a chat message.",
      config: { source: "chat" },
    },
  },
  {
    id: "prompt-1",
    type: "prompt",
    position: { x: 260, y: 100 },
    data: {
      kind: "prompt",
      label: "Support prompt",
      description: "Guides tone and boundaries for the assistant.",
      config: { template: "Answer using only the provided knowledge base." },
    },
  },
  {
    id: "model-1",
    type: "model",
    position: { x: 480, y: 140 },
    data: {
      kind: "model",
      label: "GPT-4.1 mini",
      description: "Primary generation step.",
      config: { provider: "openai", model: "gpt-4.1-mini", temperature: "0.2" },
    },
  },
  {
    id: "output-1",
    type: "output",
    position: { x: 700, y: 140 },
    data: {
      kind: "output",
      label: "Reply",
      description: "Send the final answer back to the user.",
      config: { format: "markdown" },
    },
  },
];

const SUPPORT_AGENT_EDGES: AiWorkflowEdge[] = [
  edge("e-trigger-prompt", "trigger-1", "prompt-1"),
  edge("e-prompt-model", "prompt-1", "model-1"),
  edge("e-model-output", "model-1", "output-1"),
];

/** Route AI output to WhatsApp, email, or Slack based on a condition. */
const OMNICHANNEL_NODES: AiWorkflowNode[] = [
  {
    id: "trigger-webhook",
    type: "trigger",
    position: { x: 40, y: 180 },
    data: {
      kind: "trigger",
      label: "Webhook event",
      description: "Incoming event from your app or CRM.",
      config: { source: "webhook" },
    },
  },
  {
    id: "prompt-route",
    type: "prompt",
    position: { x: 240, y: 140 },
    data: {
      kind: "prompt",
      label: "Routing prompt",
      description: "Classify the event and pick the best channel.",
      config: { template: "Classify urgency and preferred contact channel from the payload." },
    },
  },
  {
    id: "model-route",
    type: "model",
    position: { x: 460, y: 180 },
    data: {
      kind: "model",
      label: "Classifier model",
      description: "Scores channel fit and message draft.",
      config: { provider: "openai", model: "gpt-4.1-mini", temperature: "0" },
    },
  },
  {
    id: "condition-channel",
    type: "condition",
    position: { x: 680, y: 180 },
    data: {
      kind: "condition",
      label: "Channel router",
      description: "Branch to WhatsApp, email, or Slack.",
      config: { expression: "output.channel" },
    },
  },
  {
    id: "block-whatsapp",
    type: "block",
    position: { x: 920, y: 40 },
    data: {
      kind: "block",
      label: "WhatsApp",
      description: "Send a WhatsApp message to a phone number.",
      blockId: "whatsapp",
      config: { to: "+15551234567", template: "order_update", language: "en" },
    },
  },
  {
    id: "block-email",
    type: "block",
    position: { x: 920, y: 180 },
    data: {
      kind: "block",
      label: "Email",
      description: "Send a transactional email from the workflow.",
      blockId: "email",
      config: { to: "user@example.com", subject: "Workflow update", body: "Hello from AsriUI." },
    },
  },
  {
    id: "block-slack",
    type: "block",
    position: { x: 920, y: 320 },
    data: {
      kind: "block",
      label: "Slack",
      description: "Post a message to a Slack channel or thread.",
      blockId: "slack",
      config: { channel: "#alerts", message: "New AI workflow event" },
    },
  },
];

const OMNICHANNEL_EDGES: AiWorkflowEdge[] = [
  edge("e-omni-trigger-prompt", "trigger-webhook", "prompt-route"),
  edge("e-omni-prompt-model", "prompt-route", "model-route"),
  edge("e-omni-model-condition", "model-route", "condition-channel"),
  edge("e-omni-condition-whatsapp", "condition-channel", "block-whatsapp"),
  edge("e-omni-condition-email", "condition-channel", "block-email"),
  edge("e-omni-condition-slack", "condition-channel", "block-slack"),
];

/** Compose AI replies into AsriUI surfaces. */
const UI_COMPOSER_NODES: AiWorkflowNode[] = [
  {
    id: "trigger-chat",
    type: "trigger",
    position: { x: 40, y: 160 },
    data: {
      kind: "trigger",
      label: "Chat message",
      description: "User opens the assistant panel.",
      config: { source: "chat" },
    },
  },
  {
    id: "prompt-ui",
    type: "prompt",
    position: { x: 240, y: 120 },
    data: {
      kind: "prompt",
      label: "UI composer prompt",
      description: "Ask the model to return UI-friendly structured output.",
      config: { template: "Return a headline, summary, and primary action label." },
    },
  },
  {
    id: "model-ui",
    type: "model",
    position: { x: 440, y: 160 },
    data: {
      kind: "model",
      label: "GPT-4.1 mini",
      description: "Generates content for UI blocks.",
      config: { provider: "openai", model: "gpt-4.1-mini", temperature: "0.3" },
    },
  },
  {
    id: "component-aichat",
    type: "component",
    position: { x: 640, y: 60 },
    data: {
      kind: "component",
      label: "AiChat",
      description: "Conversational UI surface for model replies.",
      componentSlug: "ai-chat",
      config: { placeholder: "Ask anything…", model: "gpt-4.1-mini" },
    },
  },
  {
    id: "component-card",
    type: "component",
    position: { x: 640, y: 200 },
    data: {
      kind: "component",
      label: "Card",
      description: "Content container with header, body, and footer slots.",
      componentSlug: "card",
      config: { title: "AI summary", padding: "md" },
    },
  },
  {
    id: "component-toast",
    type: "component",
    position: { x: 860, y: 130 },
    data: {
      kind: "component",
      label: "Toast",
      description: "Transient notification after an action completes.",
      componentSlug: "toast",
      config: { tone: "success", message: "Workflow rendered in the app." },
    },
  },
  {
    id: "output-ui",
    type: "output",
    position: { x: 1060, y: 160 },
    data: {
      kind: "output",
      label: "Render UI",
      description: "Mount composed components in the host app.",
      config: { format: "json" },
    },
  },
];

const UI_COMPOSER_EDGES: AiWorkflowEdge[] = [
  edge("e-ui-trigger-prompt", "trigger-chat", "prompt-ui"),
  edge("e-ui-prompt-model", "prompt-ui", "model-ui"),
  edge("e-ui-model-aichat", "model-ui", "component-aichat"),
  edge("e-ui-model-card", "model-ui", "component-card"),
  edge("e-ui-aichat-toast", "component-aichat", "component-toast"),
  edge("e-ui-card-toast", "component-card", "component-toast"),
  edge("e-ui-toast-output", "component-toast", "output-ui"),
];

/** Qualify leads with a tool call, then notify sales or send nurture email. */
const LEAD_QUALIFICATION_NODES: AiWorkflowNode[] = [
  {
    id: "trigger-lead",
    type: "trigger",
    position: { x: 40, y: 170 },
    data: {
      kind: "trigger",
      label: "Form submit",
      description: "New lead captured from a landing page form.",
      config: { source: "webhook" },
    },
  },
  {
    id: "prompt-lead",
    type: "prompt",
    position: { x: 240, y: 130 },
    data: {
      kind: "prompt",
      label: "Qualification rubric",
      description: "Score fit, budget, and timeline from the lead payload.",
      config: { template: "Score the lead from 0-100 and explain the decision briefly." },
    },
  },
  {
    id: "model-lead",
    type: "model",
    position: { x: 440, y: 170 },
    data: {
      kind: "model",
      label: "Scoring model",
      description: "Produces score and recommended next step.",
      config: { provider: "openai", model: "gpt-4.1-mini", temperature: "0.1" },
    },
  },
  {
    id: "tool-crm",
    type: "tool",
    position: { x: 640, y: 170 },
    data: {
      kind: "tool",
      label: "CRM lookup",
      description: "Function or API the agent can call.",
      config: { name: "lookup_crm", description: "Fetch account history and open opportunities." },
    },
  },
  {
    id: "condition-lead",
    type: "condition",
    position: { x: 840, y: 170 },
    data: {
      kind: "condition",
      label: "Qualified?",
      description: "Route hot leads to Slack, others to nurture email.",
      config: { expression: "output.score >= 70" },
    },
  },
  {
    id: "block-lead-slack",
    type: "block",
    position: { x: 1060, y: 80 },
    data: {
      kind: "block",
      label: "Slack alert",
      description: "Notify sales in #inbound.",
      blockId: "slack",
      config: { channel: "#inbound", message: "Hot lead ready for follow-up" },
    },
  },
  {
    id: "block-lead-email",
    type: "block",
    position: { x: 1060, y: 260 },
    data: {
      kind: "block",
      label: "Nurture email",
      description: "Send a welcome sequence email.",
      blockId: "email",
      config: { to: "lead@example.com", subject: "Thanks for reaching out", body: "We will be in touch soon." },
    },
  },
];

const LEAD_QUALIFICATION_EDGES: AiWorkflowEdge[] = [
  edge("e-lead-trigger-prompt", "trigger-lead", "prompt-lead"),
  edge("e-lead-prompt-model", "prompt-lead", "model-lead"),
  edge("e-lead-model-tool", "model-lead", "tool-crm"),
  edge("e-lead-tool-condition", "tool-crm", "condition-lead"),
  edge("e-lead-condition-slack", "condition-lead", "block-lead-slack"),
  edge("e-lead-condition-email", "condition-lead", "block-lead-email"),
];

/** Scheduled digest with WhatsApp alert and dashboard grid update. */
const ORDER_UPDATES_NODES: AiWorkflowNode[] = [
  {
    id: "trigger-schedule",
    type: "trigger",
    position: { x: 40, y: 150 },
    data: {
      kind: "trigger",
      label: "Hourly schedule",
      description: "Runs every hour to sync order status.",
      config: { source: "schedule" },
    },
  },
  {
    id: "tool-orders",
    type: "tool",
    position: { x: 240, y: 150 },
    data: {
      kind: "tool",
      label: "Fetch orders",
      description: "Pull latest orders from the API.",
      config: { name: "get_orders", description: "Returns orders updated in the last hour." },
    },
  },
  {
    id: "model-summary",
    type: "model",
    position: { x: 440, y: 150 },
    data: {
      kind: "model",
      label: "Summarize changes",
      description: "Create an operator-friendly digest.",
      config: { provider: "openai", model: "gpt-4.1-mini", temperature: "0.2" },
    },
  },
  {
    id: "block-orders-whatsapp",
    type: "block",
    position: { x: 640, y: 60 },
    data: {
      kind: "block",
      label: "WhatsApp ops",
      description: "Ping the on-call number with urgent changes.",
      blockId: "whatsapp",
      config: { to: "+15559876543", template: "ops_digest", language: "en" },
    },
  },
  {
    id: "component-grid",
    type: "component",
    position: { x: 640, y: 220 },
    data: {
      kind: "component",
      label: "DataGrid",
      description: "Refresh the orders table in the admin UI.",
      componentSlug: "data-grid",
      config: { dataSource: "orders", pageSize: "25" },
    },
  },
  {
    id: "block-webhook",
    type: "block",
    position: { x: 860, y: 150 },
    data: {
      kind: "block",
      label: "Webhook",
      description: "POST digest to an external system.",
      blockId: "webhook",
      config: { url: "https://api.example.com/hooks/orders", method: "POST" },
    },
  },
];

const ORDER_UPDATES_EDGES: AiWorkflowEdge[] = [
  edge("e-orders-trigger-tool", "trigger-schedule", "tool-orders"),
  edge("e-orders-tool-model", "tool-orders", "model-summary"),
  edge("e-orders-model-whatsapp", "model-summary", "block-orders-whatsapp"),
  edge("e-orders-model-grid", "model-summary", "component-grid"),
  edge("e-orders-whatsapp-webhook", "block-orders-whatsapp", "block-webhook"),
  edge("e-orders-grid-webhook", "component-grid", "block-webhook"),
];

export const AI_WORKFLOW_TEMPLATES: AiWorkflowTemplate[] = [
  {
    id: "support-agent",
    name: "Support agent",
    description: "Chat trigger, prompt, model, and reply output — the fastest way to ship a support bot.",
    category: "ai",
    nodes: SUPPORT_AGENT_NODES,
    edges: SUPPORT_AGENT_EDGES,
  },
  {
    id: "omnichannel-notify",
    name: "Omnichannel notify",
    description: "Classify events with AI, then branch to WhatsApp, email, or Slack like an n8n router.",
    category: "messaging",
    nodes: OMNICHANNEL_NODES,
    edges: OMNICHANNEL_EDGES,
  },
  {
    id: "ui-composer",
    name: "AI UI composer",
    description: "Generate content, render AiChat + Card components, and confirm with a toast.",
    category: "ui",
    nodes: UI_COMPOSER_NODES,
    edges: UI_COMPOSER_EDGES,
  },
  {
    id: "lead-qualification",
    name: "Lead qualification",
    description: "Score inbound leads, call CRM, and route hot prospects to Slack or nurture email.",
    category: "automation",
    nodes: LEAD_QUALIFICATION_NODES,
    edges: LEAD_QUALIFICATION_EDGES,
  },
  {
    id: "order-updates",
    name: "Order updates",
    description: "Scheduled sync that summarizes orders, alerts ops on WhatsApp, and refreshes a DataGrid.",
    category: "automation",
    nodes: ORDER_UPDATES_NODES,
    edges: ORDER_UPDATES_EDGES,
  },
  {
    id: "blank",
    name: "Blank canvas",
    description: "Start from scratch and connect your own triggers, models, UI blocks, and integrations.",
    category: "blank",
    nodes: [],
    edges: [],
  },
];

export const DEFAULT_WORKFLOW_TEMPLATE_ID = "support-agent";

export function getWorkflowTemplate(id: string): AiWorkflowTemplate | undefined {
  return AI_WORKFLOW_TEMPLATES.find((template) => template.id === id);
}

export function cloneWorkflowTemplate(template: AiWorkflowTemplate): {
  nodes: AiWorkflowNode[];
  edges: AiWorkflowEdge[];
} {
  return {
    nodes: template.nodes.map((node) => ({
      ...node,
      data: { ...node.data, config: node.data.config ? { ...node.data.config } : undefined },
    })),
    edges: template.edges.map((edge) => ({ ...edge })),
  };
}

/** Back-compat exports used as the default builder state. */
export const DEFAULT_AI_WORKFLOW_NODES = SUPPORT_AGENT_NODES;
export const DEFAULT_AI_WORKFLOW_EDGES = SUPPORT_AGENT_EDGES;
