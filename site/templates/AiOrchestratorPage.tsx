import { Badge, Callout, PageLayout, Typography } from "asriui";
import { AiOrchestrator } from "../../src/components/AiOrchestrator";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

const SEARCH_CORPUS = [
  {
    id: "docs-theme",
    title: "Theming with CSS variables",
    description: "Toggle light and dark mode with data-theme on the document root.",
    tags: ["docs", "theme"],
    href: "/docs/styling",
  },
  {
    id: "docs-form",
    title: "JSON-driven forms",
    description: "Build forms from field config with validation and conditional visibility.",
    tags: ["form", "validation"],
    href: "/docs/components/form",
  },
  {
    id: "docs-datagrid",
    title: "DataGrid filters and server mode",
    description: "Column filters, pagination, and server-side row fetching.",
    tags: ["data", "table"],
    href: "/docs/components/data-grid",
  },
  {
    id: "docs-ai-chat",
    title: "AiChat message queue",
    description: "Queue prompts while the assistant is busy with useAiChatQueue.",
    tags: ["ai", "chat"],
    href: "/docs/components/ai-chat",
  },
];

export function AiOrchestratorPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="72rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <TemplateDemoShell title="AI orchestrator">
            <header className={styles.workflowHeader}>
              <Badge variant="secondary">Builders</Badge>
              <h1 className={styles.heroTitle}>AI orchestrator studio</h1>
              <p className={styles.heroLead}>
                One shell routes natural language to summarizer, data analyst, form filler, and semantic
                search. Use the pipeline tab to run all four in sequence, then wire each handler to your
                model or vector index in production.
              </p>
            </header>

            <AiOrchestrator
              className={styles.workflowBuilder}
              searchItems={SEARCH_CORPUS}
              demo
            />

            <Callout variant="info" title="Production wiring" className={styles.workflowResult}>
              <Typography variant="p">
                Replace demo handlers with <code>onSummarize</code>, <code>onAnalyze</code>,
                <code>onFillForm</code>, <code>onSearch</code>, or a single <code>onRunPipeline</code> that
                calls your orchestration backend.
              </Typography>
            </Callout>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
