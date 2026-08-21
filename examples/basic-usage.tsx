import { useState } from "react";
import { Button, Card, Input } from "asriui";
import "asriui/style.css";

/**
 * Minimal usage example for asriui.
 * Run Storybook for the full interactive playground.
 */
export function ExampleApp() {
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  return (
    <div data-theme="light" className="asriui-root" style={{ padding: 24, maxWidth: 480 }}>
      <Card>
        <Card.Header>
          <Card.Title>Account</Card.Title>
        </Card.Header>
        <Card.Content>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            helperText="We'll use this for notifications."
          />
        </Card.Content>
        <Card.Footer>
          <Button
            variant="outline"
            onClick={() => setEmail("")}
          >
            Clear
          </Button>
          <Button
            loading={saving}
            onClick={() => {
              setSaving(true);
              window.setTimeout(() => setSaving(false), 1000);
            }}
          >
            Save
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
