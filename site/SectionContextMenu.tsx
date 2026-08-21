import { useState } from "react";
import { ContextMenu } from "../src/components/ContextMenu";
import { Dialog } from "../src/components/Dialog";
import { FeatureRequest } from "../src/components/FeatureRequest";
import { Questionnaire, DEFAULT_QUESTIONNAIRE } from "../src/components/Questionnaire";
import { toast } from "../src/components/Toast";
import { SECTION_LAYOUTS } from "./sectionLayouts";

type SectionContextMenuProps = {
  layoutCode: string;
};

async function copyCode(code: string, title: string) {
  try {
    await navigator.clipboard.writeText(code);
    toast.success(title, { description: "Paste it into your React app." });
  } catch {
    toast.error("Could not copy");
  }
}

export function SectionContextMenu({ layoutCode }: SectionContextMenuProps) {
  const [dialog, setDialog] = useState<"feature" | "questionnaire" | null>(null);

  return (
    <>
      <ContextMenu>
        <ContextMenu.Trigger attach="parent" />
        <ContextMenu.Content>
          <ContextMenu.Item onSelect={() => void copyCode(layoutCode, "Layout copied")}>
            Copy layout
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item onSelect={() => setDialog("feature")}>Add feature</ContextMenu.Item>
          <ContextMenu.Item onSelect={() => setDialog("questionnaire")}>Questionnaire</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>

      <Dialog open={dialog === "feature"} onOpenChange={(open) => !open && setDialog(null)}>
        <Dialog.Content
          title="Add a feature"
          description="Request a layout or component. You can also copy this form into your app."
        >
          <FeatureRequest
            onSubmit={(values) => {
              toast.success("Feature captured", { description: values.title });
              setDialog(null);
            }}
          />
          <p style={{ margin: "0.75rem 0 0", fontSize: "0.8rem" }}>
            <button
              type="button"
              onClick={() => void copyCode(SECTION_LAYOUTS.featureRequest, "Feature request layout copied")}
              style={{ all: "unset", cursor: "pointer", textDecoration: "underline" }}
            >
              Copy FeatureRequest layout
            </button>
          </p>
        </Dialog.Content>
      </Dialog>

      <Dialog open={dialog === "questionnaire"} onOpenChange={(open) => !open && setDialog(null)}>
        <Dialog.Content
          title="Questionnaire"
          description="A stepped survey you can drop into onboarding or research flows."
        >
          <Questionnaire
            questions={DEFAULT_QUESTIONNAIRE}
            onComplete={() => {
              toast.success("Answers saved");
              setDialog(null);
            }}
          />
          <p style={{ margin: "0.75rem 0 0", fontSize: "0.8rem" }}>
            <button
              type="button"
              onClick={() => void copyCode(SECTION_LAYOUTS.questionnaire, "Questionnaire layout copied")}
              style={{ all: "unset", cursor: "pointer", textDecoration: "underline" }}
            >
              Copy Questionnaire layout
            </button>
          </p>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
