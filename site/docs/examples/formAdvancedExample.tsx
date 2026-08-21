import { useState } from "react";
import { Button } from "../../../src/components/Button";
import { Callout } from "../../../src/components/Callout";
import { Form, useForm } from "../../../src/components/Form";
import type { FormValues } from "../../../src/components/Form";

const CATEGORY_OPTIONS = {
  software: [
    { label: "License", value: "license" },
    { label: "Support", value: "support" },
  ],
  services: [
    { label: "Onboarding", value: "onboarding" },
    { label: "Training", value: "training" },
  ],
};

export const FORM_ADVANCED_CODE = `const form = useForm(config);

<Form config={config} onSubmit={(values) => console.log(values)} />

// Or headless:
<Button onClick={() => form.handleSubmit(save)}>Save</Button>`;

export function FormAdvancedExample() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const headless = useForm({
    fields: [
      { name: "note", type: "text", label: "Quick note", placeholder: "From useForm hook" },
    ],
  });

  return (
    <div style={{ display: "grid", gap: "1.5rem", maxWidth: 480 }}>
      <Form
        config={{
          submitLabel: "Create profile",
          fields: [
            { name: "accountType", type: "select", label: "Account type", required: true, options: [
              { label: "Personal", value: "personal" },
              { label: "Business", value: "business" },
            ]},
            {
              name: "company",
              type: "text",
              label: "Company name",
              showWhen: { field: "accountType", equals: "business" },
              required: true,
            },
            {
              name: "category",
              type: "select",
              label: "Category",
              required: true,
              options: [
                { label: "Software", value: "software" },
                { label: "Services", value: "services" },
              ],
            },
            {
              name: "product",
              type: "select",
              label: "Product",
              required: true,
              optionsFrom: {
                dependsOn: "category",
                load: async (category) => CATEGORY_OPTIONS[String(category) as keyof typeof CATEGORY_OPTIONS] ?? [],
              },
            },
            {
              name: "avatar",
              type: "image",
              label: "Profile image",
              required: true,
              multiple: false,
            },
          ],
        }}
        onSubmit={(values) => setSubmitted(values)}
      />

      <div>
        <Button size="sm" variant="outline" onClick={() => headless.handleSubmit((values) => setSubmitted(values))}>
          Submit headless note via useForm
        </Button>
      </div>

      {submitted ? (
        <Callout variant="success" title="Submitted values">
          {JSON.stringify(
            Object.fromEntries(
              Object.entries(submitted).map(([key, value]) => [
                key,
                Array.isArray(value) ? value.map((file) => file.name) : value,
              ]),
            ),
            null,
            2,
          )}
        </Callout>
      ) : null}
    </div>
  );
}
