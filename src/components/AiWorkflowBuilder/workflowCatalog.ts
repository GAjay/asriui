import type { AiWorkflowConfigField, AiWorkflowNodeKind } from "./AiWorkflowBuilder.types";

export type AiWorkflowComponentItem = {
  slug: string;
  name: string;
  category: string;
  description: string;
  defaultConfig?: Record<string, string>;
  configFields?: AiWorkflowConfigField[];
};

export type AiWorkflowBlockDefinition = {
  id: string;
  label: string;
  description: string;
  category?: string;
  defaultConfig?: Record<string, string>;
  configFields?: AiWorkflowConfigField[];
  /** When true, the inspector exposes a script editor for transforming incoming run data. @default true */
  supportsScript?: boolean;
};

export type WorkflowPaletteDragPayload =
  | { type: "workflow"; kind: AiWorkflowNodeKind }
  | { type: "component"; slug: string }
  | { type: "block"; id: string };

export const WORKFLOW_DRAG_MIME = "application/axiom-workflow-node";

export function encodeWorkflowDragPayload(payload: WorkflowPaletteDragPayload): string {
  return JSON.stringify(payload);
}

export function decodeWorkflowDragPayload(value: string): WorkflowPaletteDragPayload | null {
  try {
    const parsed = JSON.parse(value) as WorkflowPaletteDragPayload;
    if (!parsed || typeof parsed !== "object" || !("type" in parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

const variantField = (key = "variant"): AiWorkflowConfigField => ({
  key,
  label: "Variant",
  type: "select",
  options: [
    { value: "primary", label: "Primary" },
    { value: "secondary", label: "Secondary" },
    { value: "outline", label: "Outline" },
    { value: "ghost", label: "Ghost" },
  ],
});

/** Curated Axiom UI components commonly used in AI-driven UI workflows. */
export const AXIOM_UI_COMPONENT_PALETTE: AiWorkflowComponentItem[] = [
  {
    slug: "button",
    name: "Button",
    category: "form",
    description: "Action trigger with variants and loading state.",
    defaultConfig: { variant: "primary", label: "Continue" },
    configFields: [variantField(), { key: "label", label: "Label", type: "text" }],
  },
  {
    slug: "input",
    name: "Input",
    category: "form",
    description: "Single-line text field with label and validation.",
    defaultConfig: { label: "Email", placeholder: "you@company.com", type: "email" },
    configFields: [
      { key: "label", label: "Label", type: "text" },
      { key: "placeholder", label: "Placeholder", type: "text" },
      { key: "type", label: "Input type", type: "select", options: [
        { value: "text", label: "Text" },
        { value: "email", label: "Email" },
        { value: "password", label: "Password" },
        { value: "search", label: "Search" },
      ] },
    ],
  },
  {
    slug: "form",
    name: "Form",
    category: "form",
    description: "JSON-driven form with built-in validation.",
    defaultConfig: { submitLabel: "Submit", schema: "contact-form" },
    configFields: [
      { key: "schema", label: "Schema id", type: "text" },
      { key: "submitLabel", label: "Submit label", type: "text" },
    ],
  },
  {
    slug: "card",
    name: "Card",
    category: "layout",
    description: "Content container with header, body, and footer slots.",
    defaultConfig: { title: "Summary", padding: "md" },
    configFields: [
      { key: "title", label: "Title", type: "text" },
      { key: "padding", label: "Padding", type: "select", options: [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
      ] },
    ],
  },
  {
    slug: "dialog",
    name: "Dialog",
    category: "feedback",
    description: "Modal overlay for confirmations and focused tasks.",
    defaultConfig: { title: "Confirm action", confirmLabel: "Confirm" },
    configFields: [
      { key: "title", label: "Title", type: "text" },
      { key: "confirmLabel", label: "Confirm label", type: "text" },
    ],
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "navigation",
    description: "Switch between related panels without leaving the page.",
    defaultConfig: { defaultTab: "overview", tabs: "Overview,Details" },
    configFields: [
      { key: "tabs", label: "Tab labels (comma-separated)", type: "text" },
      { key: "defaultTab", label: "Default tab", type: "text" },
    ],
  },
  {
    slug: "data-grid",
    name: "DataGrid",
    category: "data",
    description: "Sortable, filterable table for structured records.",
    defaultConfig: { dataSource: "orders", pageSize: "10" },
    configFields: [
      { key: "dataSource", label: "Data source", type: "text" },
      { key: "pageSize", label: "Page size", type: "text" },
    ],
  },
  {
    slug: "metric",
    name: "Metric",
    category: "data",
    description: "Trading-style KPI tile with symbol, value, and change.",
    defaultConfig: { symbol: "AAPL", label: "Last price", value: "182.40" },
    configFields: [
      { key: "symbol", label: "Symbol", type: "text" },
      { key: "label", label: "Label", type: "text" },
      { key: "value", label: "Value", type: "text" },
    ],
  },
  {
    slug: "callout",
    name: "Callout",
    category: "feedback",
    description: "Highlighted notice for info, success, warning, or danger.",
    defaultConfig: { tone: "info", title: "Heads up", message: "Review before continuing." },
    configFields: [
      { key: "tone", label: "Tone", type: "select", options: [
        { value: "info", label: "Info" },
        { value: "success", label: "Success" },
        { value: "warning", label: "Warning" },
        { value: "danger", label: "Danger" },
      ] },
      { key: "title", label: "Title", type: "text" },
      { key: "message", label: "Message", type: "textarea" },
    ],
  },
  {
    slug: "ai-chat",
    name: "AiChat",
    category: "ai",
    description: "Conversational UI surface for model replies.",
    defaultConfig: { placeholder: "Ask anything…", model: "gpt-4.1-mini" },
    configFields: [
      { key: "placeholder", label: "Placeholder", type: "text" },
      { key: "model", label: "Model", type: "text" },
    ],
  },
  {
    slug: "page-layout",
    name: "PageLayout",
    category: "layout",
    description: "App shell with sidebar, centered, or docs layouts.",
    defaultConfig: { variant: "sidebar", contentMaxWidth: "72rem" },
    configFields: [
      { key: "variant", label: "Layout", type: "select", options: [
        { value: "sidebar", label: "Sidebar" },
        { value: "centered", label: "Centered" },
        { value: "full", label: "Full width" },
      ] },
      { key: "contentMaxWidth", label: "Content max width", type: "text" },
    ],
  },
  {
    slug: "toast",
    name: "Toast",
    category: "feedback",
    description: "Transient notification after an action completes.",
    defaultConfig: { tone: "success", message: "Saved successfully." },
    configFields: [
      { key: "tone", label: "Tone", type: "select", options: [
        { value: "success", label: "Success" },
        { value: "error", label: "Error" },
        { value: "info", label: "Info" },
      ] },
      { key: "message", label: "Message", type: "textarea" },
    ],
  },
  {
    slug: "widget",
    name: "Widget",
    category: "embed",
    description: "Embed iframe, script, or HTML for third-party content.",
    defaultConfig: { mode: "iframe", src: "https://example.com/embed" },
    configFields: [
      { key: "mode", label: "Mode", type: "select", options: [
        { value: "iframe", label: "Iframe" },
        { value: "script", label: "Script" },
        { value: "html", label: "Inline HTML" },
      ] },
      { key: "src", label: "Source URL", type: "text" },
    ],
  },
  {
    slug: "typography",
    name: "Typography",
    category: "content",
    description: "Semantic text styles for headings and body copy.",
    defaultConfig: { variant: "h2", text: "Section title" },
    configFields: [
      { key: "variant", label: "Variant", type: "select", options: [
        { value: "h1", label: "Heading 1" },
        { value: "h2", label: "Heading 2" },
        { value: "h3", label: "Heading 3" },
        { value: "body", label: "Body" },
        { value: "muted", label: "Muted" },
      ] },
      { key: "text", label: "Text", type: "textarea" },
    ],
  },
];

/** Built-in integration blocks for messaging and external hand-offs. */
export const DEFAULT_INTEGRATION_BLOCKS: AiWorkflowBlockDefinition[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    category: "messaging",
    description: "Send a WhatsApp message to a phone number.",
    defaultConfig: { to: "+15551234567", template: "order_update", language: "en" },
    configFields: [
      { key: "to", label: "Phone number", type: "text", placeholder: "+15551234567" },
      { key: "template", label: "Template name", type: "text" },
      { key: "language", label: "Language code", type: "text" },
    ],
  },
  {
    id: "slack",
    label: "Slack",
    category: "messaging",
    description: "Post a message to a Slack channel or thread.",
    defaultConfig: { channel: "#support", message: "New AI workflow event" },
    configFields: [
      { key: "channel", label: "Channel", type: "text" },
      { key: "message", label: "Message", type: "textarea" },
    ],
  },
  {
    id: "email",
    label: "Email",
    category: "messaging",
    description: "Send a transactional email from the workflow.",
    defaultConfig: { to: "user@example.com", subject: "Workflow update", body: "Hello from Axiom UI." },
    configFields: [
      { key: "to", label: "Recipient", type: "text" },
      { key: "subject", label: "Subject", type: "text" },
      { key: "body", label: "Body", type: "textarea" },
    ],
  },
  {
    id: "sms",
    label: "SMS",
    category: "messaging",
    description: "Send a text message via your SMS provider.",
    defaultConfig: { to: "+15551234567", body: "Your code is 123456" },
    configFields: [
      { key: "to", label: "Phone number", type: "text" },
      { key: "body", label: "Message", type: "textarea" },
    ],
  },
  {
    id: "webhook",
    label: "Webhook",
    category: "integration",
    description: "POST workflow output to an external HTTP endpoint.",
    defaultConfig: { url: "https://api.example.com/hooks/workflow", method: "POST", script: "return input;" },
    configFields: [
      { key: "url", label: "URL", type: "text" },
      { key: "method", label: "Method", type: "select", options: [
        { value: "POST", label: "POST" },
        { value: "PUT", label: "PUT" },
        { value: "PATCH", label: "PATCH" },
      ] },
    ],
  },
  {
    id: "script",
    label: "Script",
    category: "logic",
    description: "Transform incoming workflow data with JavaScript before passing it downstream.",
    defaultConfig: {
      script: `// input = upstream data\n// context.config = node config\nreturn input;`,
    },
    configFields: [{ key: "script", label: "Script", type: "script" }],
    supportsScript: true,
  },
];

export function findComponentItem(
  slug: string,
  components: AiWorkflowComponentItem[] = AXIOM_UI_COMPONENT_PALETTE,
): AiWorkflowComponentItem | undefined {
  return components.find((item) => item.slug === slug);
}

export function findBlockDefinition(
  id: string,
  blocks: AiWorkflowBlockDefinition[] = DEFAULT_INTEGRATION_BLOCKS,
): AiWorkflowBlockDefinition | undefined {
  return blocks.find((item) => item.id === id);
}

export function createCustomBlockDefinition(name: string, description: string): AiWorkflowBlockDefinition {
  const id = `custom-${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "block"}-${Date.now()}`;
  return {
    id,
    label: name.trim() || "Custom block",
    description: description.trim() || "Custom integration block.",
    category: "custom",
    defaultConfig: {
      endpoint: "",
      script: `// Transform incoming data for this block\nreturn input;`,
    },
    configFields: [
      { key: "endpoint", label: "Endpoint", type: "text", placeholder: "https://api.example.com/action" },
      { key: "script", label: "Run script", type: "script" },
    ],
    supportsScript: true,
  };
}
