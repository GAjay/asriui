import { toast } from "axiom-ui";
import { Page } from "../../src/components/Page";
import { EXAMPLE_DASHBOARD_PAGE } from "../../src/components/Page/examples";
import { TemplateDemoShell } from "./TemplateDemoShell";

/** Live demo: entire screen driven by PageConfig JSON. */
export function JsonPageDemo() {
  return (
    <TemplateDemoShell title="JSON Page builder">
      <Page
        config={EXAMPLE_DASHBOARD_PAGE}
        onAction={(event) => {
          toast.info(`${event.type}: ${event.id}`);
        }}
        onFormSubmit={async (formId, values) => {
          toast.success(`Submitted ${formId}`, {
            description: JSON.stringify(values),
          });
        }}
      />
    </TemplateDemoShell>
  );
}
