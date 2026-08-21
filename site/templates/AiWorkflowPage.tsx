import { useState } from "react";
import { Badge, Callout, PageLayout, Typography, toast } from "axiom-ui";
import { AiWorkflowBuilder } from "../../src/components/AiWorkflowBuilder";
import type { WorkflowRunResult } from "../../src/components/AiWorkflowBuilder";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

export function AiWorkflowPage() {
  const [lastResult, setLastResult] = useState<WorkflowRunResult | null>(null);

  return (
    <PageLayout variant="centered" contentMaxWidth="72rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <TemplateDemoShell title="AI workflow builder">
            <header className={styles.workflowHeader}>
              <Badge variant="secondary">Builders</Badge>
              <h1 className={styles.heroTitle}>AI workflow studio</h1>
              <p className={styles.heroLead}>
                Design n8n-style flows with AI nodes, Axiom UI components, and integration blocks. Pick a base
                template, connect steps on the canvas, add scripts to transform data, then run the workflow.
              </p>
            </header>

            <AiWorkflowBuilder
              className={styles.workflowBuilder}
              templateId="omnichannel-notify"
              height={560}
              executeOnRun
              runInput={{ event: "order.shipped", channel: "whatsapp", customer: "Ada Lovelace" }}
              onRun={({ result }) => {
                setLastResult(result ?? null);
                toast.success("Workflow executed", {
                  description: result ? "Block scripts ran across connected nodes." : "Graph exported for your backend.",
                });
              }}
            />

            {lastResult ? (
              <Callout variant="info" title="Last run output" className={styles.workflowResult}>
                <Typography variant="p">
                  Final payload from the connected graph. Wire <code>onRun</code> to your orchestrator in production.
                </Typography>
                <pre className={styles.workflowResultCode}>{JSON.stringify(lastResult.output, null, 2)}</pre>
              </Callout>
            ) : null}
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
