import { useState } from "react";
import { Breadcrumb } from "../../../src/components/Breadcrumb";
import { Menu } from "../../../src/components/Menu";
import { Dropdown } from "../../../src/components/Dropdown";
import { DatePicker } from "../../../src/components/DatePicker";
import { Tooltip } from "../../../src/components/Tooltip";
import { Link } from "../../../src/components/Link";
import { Badge } from "../../../src/components/Badge";
import { Button } from "../../../src/components/Button";
import { Card } from "../../../src/components/Card";
import { Widget } from "../../../src/components/Widget";
import { Metric } from "../../../src/components/Metric";
import { Separator } from "../../../src/components/Separator";
import { Callout } from "../../../src/components/Callout";
import { Quote } from "../../../src/components/Quote";
import { TextToSpeech } from "../../../src/components/TextToSpeech";
import { Checkbox } from "../../../src/components/Checkbox";
import { Radio, RadioGroup } from "../../../src/components/Radio";
import { CheckboxCard } from "../../../src/components/CheckboxCard";
import { RadioCard, RadioCardGroup } from "../../../src/components/RadioCard";
import { Reset } from "../../../src/components/Reset";
import { Hidden, Visible } from "../../../src/components/Visible";
import { Dialog } from "../../../src/components/Dialog";
import { FlowChart } from "../../../src/components/FlowChart";
import { Form } from "../../../src/components/Form";
import { Page } from "../../../src/components/Page";
import { EXAMPLE_CONTACT_PAGE, EXAMPLE_DASHBOARD_PAGE } from "../../../src/components/Page/examples";
import { CardValidation } from "../../../src/components/CardValidation";
import { Input } from "../../../src/components/Input";
import { Label } from "../../../src/components/Label";
import { List, ListItem } from "../../../src/components/ListItem";
import { MonacoEditor } from "../../../src/components/MonacoEditor";
import { ScrollArea } from "../../../src/components/ScrollArea";
import { Skeleton } from "../../../src/components/Skeleton";
import { Switch } from "../../../src/components/Switch";
import { Tabs } from "../../../src/components/Tabs";
import { DataGrid } from "../../../src/components/DataGrid";
import { LoginForm } from "../../../src/components/Auth";
import { Calendar } from "../../../src/components/Calendar";
import { ServerQuery } from "../../../src/components/ServerQuery";
import { ToastProvider, toast } from "../../../src/components/Toast";
import {
  TOAST_SHOWCASE_CODE,
  ToastShowcaseExample,
} from "./toastShowcaseExample";
import { Table } from "../../../src/components/Table";
import { Accordion } from "../../../src/components/Accordion";
import { VirtualList } from "../../../src/components/VirtualList";
import {
  EDITABLE_DATA_GRID_CODE,
  EditableDataGridExample,
} from "./editableDataGridExample";
import {
  DATA_GRID_SERVER_CODE,
  DataGridFilterPaginationExample,
  DataGridServerExample,
} from "./dataGridServerExample";
import { FORM_ADVANCED_CODE, FormAdvancedExample } from "./formAdvancedExample";
import { CodeBlock } from "../../../src/components/CodeBlock";
import { Markdown } from "../../../src/components/Markdown";
import { Grid } from "../../../src/components/Grid";
import { Container } from "../../../src/components/Container";
import { Flex } from "../../../src/components/Flex";
import { ThemeSwitch } from "../../../src/components/ThemeSwitch";
import { AspectRatio } from "../../../src/components/AspectRatio";
import { Image } from "../../../src/components/Image";
import { Loader } from "../../../src/components/Loader";
import { PageLayout } from "../../../src/components/PageLayout";
import { Hero } from "../../../src/components/Hero";
import { Slider } from "../../../src/components/Slider";
import { Timeline } from "../../../src/components/Timeline";
import { SideNav } from "../../../src/components/SideNav";
import { Icon } from "../../../src/components/Icon";
import { Typography } from "../../../src/components/Typography";
import { ColorPalette } from "../../../src/components/ColorPalette";
import { AiChat } from "../../../src/components/AiChat";
import { AiWorkflowBuilder } from "../../../src/components/AiWorkflowBuilder";
import { AiSummarizer } from "../../../src/components/AiSummarizer";
import { AiDataAnalyst } from "../../../src/components/AiDataAnalyst";
import { AiFormFiller } from "../../../src/components/AiFormFiller";
import { AiSearch } from "../../../src/components/AiSearch";
import { AiOrchestrator } from "../../../src/components/AiOrchestrator";
import { ContextMenu } from "../../../src/components/ContextMenu";
import { FeatureRequest } from "../../../src/components/FeatureRequest";
import { Questionnaire, DEFAULT_QUESTIONNAIRE } from "../../../src/components/Questionnaire";
import { AI_CHAT_QUEUE_CODE, AiChatQueueExample } from "./aiChatQueueExample";
import type { DocExample } from "../types";

function flex(children: React.ReactNode) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      {children}
    </div>
  );
}

function ThemeSwitchDemo() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <div data-theme={theme} style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <ThemeSwitch theme={theme} onThemeChange={setTheme} animation="ripple" showLabel />
      <span style={{ fontSize: 13, color: "var(--asriui-color-muted-foreground)" }}>{theme} mode</span>
    </div>
  );
}

export const componentExamples: Record<string, DocExample[]> = {
  button: [
    {
      id: "button-variants",
      title: "Variants",
      description: "Five visual styles for different emphasis levels.",
      code: `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`,
      preview: flex(
        <>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </>,
      ),
    },
    {
      id: "button-sizes",
      title: "Sizes",
      description: "Three size scales for dense UIs and hero CTAs.",
      code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
      preview: flex(
        <>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </>,
      ),
    },
    {
      id: "button-loading",
      title: "Loading",
      description: "Disables interaction and shows a spinner with aria-busy.",
      code: `<Button loading>Saving…</Button>
<Button variant="outline" loading>Processing</Button>`,
      preview: flex(
        <>
          <Button loading>Saving…</Button>
          <Button variant="outline" loading>
            Processing
          </Button>
        </>,
      ),
    },
    {
      id: "button-analytics",
      title: "GTM tracking",
      description:
        "Wrap the app in AsriUIProvider with analytics.gtmId. Override events per button with trackEvent and trackLabel.",
      code: `<AsriUIProvider config={{ analytics: { enabled: true, gtmId: "GTM-XXXX" } }}>
  <Button trackEvent="cta_save" trackLabel="Save profile">
    Save
  </Button>
</AsriUIProvider>`,
      preview: (
        <Button trackEvent="cta_save" trackLabel="Save profile">
          Save
        </Button>
      ),
    },
  ],
  link: [
    {
      id: "link-variants",
      title: "Variants",
      description: "Default, muted, and button-styled links for inline navigation.",
      code: `<Link href="/docs">Documentation</Link>
<Link href="/settings" variant="muted">Settings</Link>
<Link href="/upgrade" variant="button">Upgrade</Link>`,
      preview: flex(
        <>
          <Link href="/docs">Documentation</Link>
          <Link href="/settings" variant="muted">
            Settings
          </Link>
          <Link href="/upgrade" variant="button">
            Upgrade
          </Link>
        </>,
      ),
    },
    {
      id: "link-external",
      title: "External links",
      description:
        "Absolute URLs and target=_blank show an external icon and announce “opens in new tab” to assistive tech.",
      code: `<Link href="https://example.com" target="_blank">
  External docs
</Link>`,
      preview: (
        <Link href="https://example.com" target="_blank">
          External docs
        </Link>
      ),
    },
    {
      id: "link-analytics",
      title: "GTM tracking",
      description: "Per-link overrides mirror Button tracking props.",
      code: `<Link
  href="/pricing"
  trackEvent="nav_pricing"
  trackLabel="Pricing"
  trackPayload={{ section: "header" }}
>
  Pricing
</Link>`,
      preview: (
        <Link href="/pricing" trackEvent="nav_pricing" trackLabel="Pricing">
          Pricing
        </Link>
      ),
    },
  ],
  breadcrumb: [
    {
      id: "breadcrumb-trail",
      title: "Trail with back",
      description: "Declarative items API with a back control for nested docs and settings views.",
      code: `<Breadcrumb
  showBack
  onBack={() => history.back()}
  items={[
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components" },
    { label: "Button", current: true },
  ]}
/>`,
      preview: (
        <Breadcrumb
          showBack
          onBack={() => undefined}
          items={[
            { label: "Docs", href: "/docs" },
            { label: "Components", href: "/docs/components" },
            { label: "Button", current: true },
          ]}
        />
      ),
    },
    {
      id: "breadcrumb-compound",
      title: "Compound layout",
      description: "Compose Back, List, Item, and Separator for full control. Default separator is /.",
      code: `<Breadcrumb>
  <Breadcrumb.Back label="Back" />
  <Breadcrumb.List>
    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item current>Settings</Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>`,
      preview: (
        <Breadcrumb>
          <Breadcrumb.Back label="Back" onClick={() => undefined} />
          <Breadcrumb.List>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item current>Settings</Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
      ),
    },
    {
      id: "breadcrumb-custom-separator",
      title: "Custom separator",
      description: "Override the default slash with text or any icon via the separator prop.",
      code: `<Breadcrumb
  separator="›"
  items={[
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components" },
    { label: "Button", current: true },
  ]}
/>

{/* Or per-separator in compound API */}
<Breadcrumb.Separator>•</Breadcrumb.Separator>`,
      preview: (
        <div style={{ display: "grid", gap: 12 }}>
          <Breadcrumb
            separator="›"
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Components", href: "/docs/components" },
              { label: "Button", current: true },
            ]}
          />
          <Breadcrumb>
            <Breadcrumb.List>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Separator>•</Breadcrumb.Separator>
              <Breadcrumb.Item current>Profile</Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb>
        </div>
      ),
    },
  ],
  menu: [
    {
      id: "menu-basic",
      title: "Action menu",
      description: "Dropdown with items, separator, and destructive action styling.",
      code: `<Menu>
  <Menu.Trigger>Options</Menu.Trigger>
  <Menu.Content aria-label="Row actions">
    <Menu.Item onSelect={() => edit()}>Edit</Menu.Item>
    <Menu.Separator />
    <Menu.Item destructive onSelect={() => remove()}>Delete</Menu.Item>
  </Menu.Content>
</Menu>`,
      preview: (
        <Menu>
          <Menu.Trigger>Options</Menu.Trigger>
          <Menu.Content aria-label="Row actions">
            <Menu.Item>Edit</Menu.Item>
            <Menu.Separator />
            <Menu.Item destructive>Delete</Menu.Item>
          </Menu.Content>
        </Menu>
      ),
    },
    {
      id: "menu-groups",
      title: "Grouped menu",
      description: "Organize related links with Menu.Group and Menu.Label.",
      code: `<Menu placement="bottom-end">
  <Menu.Trigger>Menu</Menu.Trigger>
  <Menu.Content>
    <Menu.Group label="Account">
      <Menu.Item>Profile</Menu.Item>
      <Menu.Item>Settings</Menu.Item>
    </Menu.Group>
  </Menu.Content>
</Menu>`,
      preview: (
        <Menu placement="bottom-end">
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Group label="Account">
              <Menu.Item>Profile</Menu.Item>
              <Menu.Item>Settings</Menu.Item>
            </Menu.Group>
            <Menu.Separator />
            <Menu.Group label="Support">
              <Menu.Item>Docs</Menu.Item>
            </Menu.Group>
          </Menu.Content>
        </Menu>
      ),
    },
  ],
  dropdown: [
    {
      id: "dropdown-basic",
      title: "Basic dropdown",
      description: "Single-select field with an options array.",
      code: `<Dropdown
  label="Country"
  placeholder="Select a country"
  value={country}
  onValueChange={setCountry}
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
  ]}
/>`,
      preview: (
        <Dropdown
          label="Country"
          placeholder="Select a country"
          defaultValue="us"
          options={[
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom" },
            { value: "ca", label: "Canada" },
          ]}
        />
      ),
    },
    {
      id: "dropdown-searchable",
      title: "Searchable with scroll",
      description: "Type to filter options. Long lists scroll inside the panel.",
      code: `<Dropdown
  label="Country"
  searchable
  placeholder="Type to filter countries"
  listMaxHeight="12rem"
  value={country}
  onValueChange={setCountry}
  options={countries}
/>`,
      preview: (
        <Dropdown
          label="Country"
          searchable
          placeholder="Type to filter countries"
          listMaxHeight="12rem"
          options={[
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom" },
            { value: "ca", label: "Canada" },
            { value: "de", label: "Germany" },
            { value: "fr", label: "France" },
            { value: "es", label: "Spain" },
            { value: "it", label: "Italy" },
            { value: "jp", label: "Japan" },
            { value: "au", label: "Australia" },
            { value: "br", label: "Brazil" },
            { value: "in", label: "India" },
            { value: "mx", label: "Mexico" },
          ]}
        />
      ),
    },
    {
      id: "dropdown-size-sm",
      title: "Compact size",
      description: "Use size=\"sm\" for toolbars and dense layouts.",
      code: `<Dropdown
  size="sm"
  searchable
  placeholder="Template"
  options={templates}
/>`,
      preview: (
        <Dropdown
          size="sm"
          searchable
          placeholder="Template"
          defaultValue="blank"
          options={[
            { value: "blank", label: "Blank canvas" },
            { value: "support", label: "Support agent" },
            { value: "notify", label: "Omnichannel notify" },
          ]}
        />
      ),
    },
    {
      id: "dropdown-multiple",
      title: "Multiple select",
      description: "Set multiple to choose several options. The menu stays open until you click outside.",
      code: `<Dropdown
  multiple
  label="Teams"
  placeholder="Select teams"
  value={teams}
  onValueChange={setTeams}
  options={[
    { value: "design", label: "Design" },
    { value: "eng", label: "Engineering" },
    { value: "ops", label: "Operations" },
  ]}
/>`,
      preview: (
        <Dropdown
          multiple
          label="Teams"
          placeholder="Select teams"
          defaultValue={["eng"]}
          options={[
            { value: "design", label: "Design" },
            { value: "eng", label: "Engineering" },
            { value: "ops", label: "Operations" },
            { value: "sales", label: "Sales" },
          ]}
        />
      ),
    },
  ],
  "date-picker": [
    {
      id: "date-picker-single",
      title: "Single date",
      description: "Type a date or pick from the calendar. Past dates are blocked.",
      code: `<DatePicker
  label="Appointment"
  disablePast
  dateFormat="us"
  value={date}
  onValueChange={setDate}
/>`,
      preview: <DatePicker label="Appointment" disablePast dateFormat="us" />,
    },
    {
      id: "date-picker-range",
      title: "Date range",
      description: "Select a start and end date with range highlighting.",
      code: `<DatePicker
  label="Travel dates"
  mode="range"
  disablePast
  rangeValue={range}
  onRangeValueChange={setRange}
/>`,
      preview: <DatePicker label="Travel dates" mode="range" disablePast />,
    },
    {
      id: "date-picker-datetime",
      title: "Date and time",
      description: "Datetime precision with typed input and time fields.",
      code: `<DatePicker
  label="Meeting"
  precision="datetime"
  dateFormat="iso"
  defaultValue={new Date()}
/>`,
      preview: (
        <DatePicker
          label="Meeting"
          precision="datetime"
          dateFormat="iso"
          defaultValue={new Date(2026, 7, 11, 14, 30)}
        />
      ),
    },
  ],
  tooltip: [
    {
      id: "tooltip-basic",
      title: "Default tooltip",
      description: "Shows help text on hover and keyboard focus.",
      code: `<Tooltip>
  <Tooltip.Trigger>
    <Button variant="outline">Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>Install with pnpm add asriui</Tooltip.Content>
</Tooltip>`,
      preview: (
        <Tooltip>
          <Tooltip.Trigger>
            <Button variant="outline">Hover me</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Install with pnpm add asriui</Tooltip.Content>
        </Tooltip>
      ),
    },
    {
      id: "tooltip-placement",
      title: "Placement",
      description: "Position the tooltip on any side of the trigger.",
      code: `<Tooltip>
  <Tooltip.Trigger>
    <Button size="sm" variant="ghost">Right</Button>
  </Tooltip.Trigger>
  <Tooltip.Content placement="right">Opens to the right</Tooltip.Content>
</Tooltip>`,
      preview: (
        <div style={{ display: "flex", gap: "1rem", padding: "2rem" }}>
          {(["top", "bottom", "left", "right"] as const).map((placement) => (
            <Tooltip key={placement}>
              <Tooltip.Trigger>
                <Button size="sm" variant="ghost">
                  {placement}
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content placement={placement}>Tooltip on {placement}</Tooltip.Content>
            </Tooltip>
          ))}
        </div>
      ),
    },
  ],
  input: [
    {
      id: "input-default",
      title: "Default",
      description: "Label, placeholder, and helper text with automatic ARIA wiring.",
      code: `<Input
  label="Email"
  placeholder="you@company.com"
  helperText="We'll never share your email."
  required
/>`,
      preview: (
        <Input
          label="Email"
          placeholder="you@company.com"
          helperText="We'll never share your email."
          required
        />
      ),
    },
    {
      id: "input-error",
      title: "Validation error",
      description: "Error message replaces helper text and sets aria-invalid.",
      code: `<Input
  label="Email"
  error="Enter a valid email address"
  defaultValue="not-an-email"
/>`,
      preview: (
        <Input label="Email" error="Enter a valid email address" defaultValue="not-an-email" />
      ),
    },
    {
      id: "input-affixes",
      title: "Prefix & suffix",
      description: "Inline affixes for currency, units, or icons.",
      code: `<Input label="Amount" prefix="$" suffix="USD" placeholder="0.00" />`,
      preview: <Input label="Amount" prefix="$" suffix="USD" placeholder="0.00" />,
    },
  ],
  card: [
    {
      id: "card-basic",
      title: "Basic card",
      description: "Compound layout with header, content, and footer slots.",
      code: `<Card>
  <Card.Header><Card.Title>Account</Card.Title></Card.Header>
  <Card.Content>Manage workspace settings.</Card.Content>
  <Card.Footer>
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </Card.Footer>
</Card>`,
      preview: (
        <Card>
          <Card.Header>
            <Card.Title>Account</Card.Title>
          </Card.Header>
          <Card.Content>Manage workspace settings.</Card.Content>
          <Card.Footer>
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </Card.Footer>
        </Card>
      ),
    },
    {
      id: "card-billing",
      title: "Billing summary",
      description: "Cards work well for settings panels and billing overviews.",
      code: `<Card>
  <Card.Header><Card.Title>Plan</Card.Title></Card.Header>
  <Card.Content>Pro — $29/mo</Card.Content>
</Card>`,
      preview: (
        <Card>
          <Card.Header>
            <Card.Title>Plan</Card.Title>
          </Card.Header>
          <Card.Content>Pro — $29/mo · Renews Apr 1</Card.Content>
        </Card>
      ),
    },
  ],
  widget: [
    {
      id: "widget-iframe",
      title: "Partner iframe",
      description: "Sandboxed webview for hosted partner pages and widgets.",
      code: `<Widget
  src="https://partner.example/widget"
  title="Partner widget"
  height={280}
/>`,
      preview: (
        <div style={{ width: 420 }}>
          <Widget
            html={`<!doctype html><html><body style="margin:0;font-family:system-ui,sans-serif;padding:16px;"><strong>Partner widget</strong><p style="margin:8px 0 0;color:#64748b;font-size:13px;">Loaded in an isolated iframe — no page wiring required.</p></body></html>`}
            title="Partner widget"
            height={120}
          />
        </div>
      ),
    },
    {
      id: "widget-script",
      title: "Ad / script slot",
      description: "Drop in a vendor script with slot id and data attributes.",
      code: `<Widget
  mode="script"
  scriptSrc="https://cdn.vendor.com/ads.js"
  slotId="ad-slot-1"
  attrs={{ "data-ad-client": "ca-pub-xxx" }}
  height={90}
/>`,
      preview: (
        <div style={{ width: 420 }}>
          <Widget
            mode="script"
            html={`<!doctype html><html><body style="margin:0;font-family:system-ui,sans-serif;padding:16px;background:#f8fafc;"><div style="border:1px dashed #cbd5e1;border-radius:8px;padding:12px;font-size:13px;color:#475569;">Script mount point with <code>slotId</code> and <code>data-*</code> attrs for ad networks.</div></body></html>`}
            title="Ad slot preview"
            height={90}
          />
        </div>
      ),
    },
  ],
  metric: [
    {
      id: "metric-quote",
      title: "Live quote",
      description: "Hero price tile with symbol, change, and session range.",
      code: `<Metric variant="quote" trend="up" live>
  <Metric.Symbol>BTC/USD</Metric.Symbol>
  <Metric.Value value={68420.5} format="currency" />
  <Metric.Change value={3.54} />
  <Metric.Hint>24h high $69,120 · low $66,480</Metric.Hint>
</Metric>`,
      preview: (
        <div style={{ width: 300 }}>
          <Metric variant="quote" trend="up" live>
            <Metric.Symbol>BTC/USD</Metric.Symbol>
            <Metric.Value value={68420.5} format="currency" />
            <Metric.Change value={3.54} />
            <Metric.Hint>24h high $69,120 · low $66,480</Metric.Hint>
          </Metric>
        </div>
      ),
    },
    {
      id: "metric-market-grid",
      title: "Market summary",
      description: "Volume, high, and low tiles for trading dashboards.",
      code: `<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
  <Metric trend="up">
    <Metric.Label>24h Volume</Metric.Label>
    <Metric.Value value={28400000000} format="compact" />
    <Metric.Change value={12.4} />
  </Metric>
  <Metric trend="up">
    <Metric.Label>24h High</Metric.Label>
    <Metric.Value value={69120} format="currency" />
  </Metric>
  <Metric trend="down">
    <Metric.Label>24h Low</Metric.Label>
    <Metric.Value value={66480} format="currency" />
  </Metric>
</div>`,
      preview: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(140px, 1fr))", gap: 12, width: 460 }}>
          <Metric trend="up">
            <Metric.Label>24h Volume</Metric.Label>
            <Metric.Value value={28400000000} format="compact" />
            <Metric.Change value={12.4} />
          </Metric>
          <Metric trend="up">
            <Metric.Label>24h High</Metric.Label>
            <Metric.Value value={69120} format="currency" />
          </Metric>
          <Metric trend="down">
            <Metric.Label>24h Low</Metric.Label>
            <Metric.Value value={66480} format="currency" />
          </Metric>
        </div>
      ),
    },
    {
      id: "metric-compact",
      title: "Ticker row",
      description: "Compact pair row for watchlists and portfolio headers.",
      code: `<Metric variant="compact" trend="down">
  <Metric.Label>ETH/USD</Metric.Label>
  <div>
    <Metric.Value value={3421.18} format="currency" />
    <Metric.Change value={-1.82} />
  </div>
</Metric>`,
      preview: (
        <div style={{ width: 360 }}>
          <Metric variant="compact" trend="down">
            <Metric.Label>ETH/USD</Metric.Label>
            <div>
              <Metric.Value value={3421.18} format="currency" />
              <Metric.Change value={-1.82} />
            </div>
          </Metric>
        </div>
      ),
    },
  ],
  separator: [
    {
      id: "separator-basic",
      title: "Section divider",
      code: `<Separator />`,
      preview: (
        <div style={{ width: 280 }}>
          <p style={{ margin: 0 }}>Section A</p>
          <Separator />
          <p style={{ margin: 0 }}>Section B</p>
        </div>
      ),
    },
  ],
  callout: [
    {
      id: "callout-warning",
      title: "Warning callout",
      code: `<Callout variant="warning" title="Heads up">Market data may be delayed.</Callout>`,
      preview: (
        <div style={{ width: 360 }}>
          <Callout variant="warning" title="Heads up">
            Market data may be delayed.
          </Callout>
        </div>
      ),
    },
  ],
  quote: [
    {
      id: "quote-basic",
      title: "Pull quote",
      code: `<Quote footer="— Ada Lovelace">That brain of mine is something more than merely mortal.</Quote>`,
      preview: (
        <div style={{ width: 360 }}>
          <Quote footer="— Ada Lovelace">That brain of mine is something more than merely mortal.</Quote>
        </div>
      ),
    },
  ],
  "text-to-speech": [
    {
      id: "text-to-speech-basic",
      title: "Speak wrapped text",
      description: "Click the speaker icon to read the content aloud.",
      code: `<TextToSpeech lang="en-US">
  AsriUI ships accessible components with motion, theming, and builder-ready workflows.
</TextToSpeech>`,
      preview: (
        <div style={{ maxWidth: 420 }}>
          <TextToSpeech lang="en-US">
            AsriUI ships accessible components with motion, theming, and builder-ready workflows.
          </TextToSpeech>
        </div>
      ),
    },
  ],
  checkbox: [
    {
      id: "checkbox-basic",
      title: "Labeled checkbox",
      code: `<Checkbox label="Email alerts" description="Daily summary at 9am" defaultChecked />`,
      preview: <Checkbox label="Email alerts" description="Daily summary at 9am" defaultChecked />,
    },
  ],
  radio: [
    {
      id: "radio-group",
      title: "Radio group",
      code: `<Radio.Group defaultValue="pro">\n  <Radio value="starter" label="Starter" />\n  <Radio value="pro" label="Pro" />\n</Radio.Group>`,
      preview: (
        <RadioGroup defaultValue="pro">
          <Radio value="starter" label="Starter" />
          <Radio value="pro" label="Pro" />
        </RadioGroup>
      ),
    },
  ],
  "checkbox-card": [
    {
      id: "checkbox-card-basic",
      title: "Feature card",
      code: `<CheckboxCard title="Priority support" description="24/7 chat" defaultChecked />`,
      preview: (
        <div style={{ width: 280 }}>
          <CheckboxCard title="Priority support" description="24/7 chat" defaultChecked />
        </div>
      ),
    },
  ],
  "radio-card": [
    {
      id: "radio-card-group",
      title: "Shipping options",
      code: `<RadioCard.Group defaultValue="standard">\n  <RadioCard value="standard" title="Standard" description="5–7 days" />\n  <RadioCard value="express" title="Express" description="2 days" />\n</RadioCard.Group>`,
      preview: (
        <div style={{ width: 320, display: "grid", gap: 8 }}>
          <RadioCardGroup defaultValue="standard">
            <RadioCard value="standard" title="Standard" description="5–7 days" />
            <RadioCard value="express" title="Express" description="2 days" />
          </RadioCardGroup>
        </div>
      ),
    },
  ],
  reset: [
    {
      id: "reset-basic",
      title: "Reset preview state",
      code: `<Reset.Root defaults={{ size: "md" }}>\n  {({ values, setValue }) => (\n    <>\n      <Button size={values.size}>Preview</Button>\n      <Reset.Trigger />\n    </>\n  )}\n</Reset.Root>`,
      preview: (
        <Reset.Root defaults={{ size: "md" as "sm" | "md" | "lg" }}>
          {({ values, setValue }) => (
            <div style={{ display: "grid", gap: 8 }}>
              <Button size={values.size}>Preview button</Button>
              <Button variant="outline" size="sm" onClick={() => setValue("size", "lg")}>
                Make large
              </Button>
              <Reset.Trigger />
            </div>
          )}
        </Reset.Root>
      ),
    },
  ],
  visible: [
    {
      id: "visible-basic",
      title: "Toggle visibility",
      code: `<Visible when={open}>Panel content</Visible>`,
      preview: (
        <div style={{ width: 280, display: "grid", gap: 8 }}>
          <Visible when>
            <Callout variant="info" title="Visible">
              This block is shown with <code>when=true</code>.
            </Callout>
          </Visible>
          <Hidden when>
            <Callout variant="danger" title="Hidden">
              Hidden when <code>when=true</code>.
            </Callout>
          </Hidden>
        </div>
      ),
    },
  ],
  "list-item": [
    {
      id: "list-item-basic",
      title: "Settings list",
      description: "Interactive rows with media, description, and trailing content.",
      code: `<List aria-label="Settings">
  <ListItem title="General" description="Timezone" media="G" trailing="›" interactive selected />
  <ListItem title="Members" description="12 users" media="M" trailing="12" interactive />
</List>`,
      preview: (
        <List aria-label="Settings">
          <ListItem
            title="General"
            description="Timezone, language"
            media="G"
            trailing="›"
            interactive
            selected
          />
          <ListItem
            title="Members"
            description="Invite and manage"
            media="M"
            trailing="12"
            interactive
          />
        </List>
      ),
    },
  ],
  badge: [
    {
      id: "badge-variants",
      title: "Variants",
      code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Failed</Badge>`,
      preview: flex(
        <>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Failed</Badge>
        </>,
      ),
    },
  ],
  label: [
    {
      id: "label-basic",
      title: "With input",
      code: `<Label htmlFor="name" required>Name</Label>
<Input id="name" placeholder="Jane Doe" />`,
      preview: (
        <div style={{ display: "grid", gap: 8, maxWidth: 320 }}>
          <Label htmlFor="name" required>
            Name
          </Label>
          <Input id="name" placeholder="Jane Doe" />
        </div>
      ),
    },
  ],
  switch: [
    {
      id: "switch-basic",
      title: "Controlled",
      description: "Pair with Label for accessible toggle groups.",
      code: `const [on, setOn] = useState(false);
<Switch id="notify" checked={on} onCheckedChange={setOn} />
<Label htmlFor="notify">Notifications</Label>`,
      preview: <SwitchPreview />,
    },
  ],
  tabs: [
    {
      id: "tabs-basic",
      title: "Account settings",
      code: `<Tabs defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account settings</Tabs.Content>
  <Tabs.Content value="password">Password settings</Tabs.Content>
</Tabs>`,
      preview: (
        <Tabs defaultValue="account" style={{ width: "100%", maxWidth: 400 }}>
          <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="password">Password</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="account">Make changes to your account.</Tabs.Content>
          <Tabs.Content value="password">Change your password.</Tabs.Content>
        </Tabs>
      ),
    },
    {
      id: "tabs-underline",
      title: "Underline variant",
      description: "Bottom-line active indicator with animated tab panel transitions.",
      code: `<Tabs defaultValue="account" variant="underline">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account settings</Tabs.Content>
  <Tabs.Content value="password">Password settings</Tabs.Content>
</Tabs>`,
      preview: (
        <Tabs defaultValue="account" variant="underline" style={{ width: "100%", maxWidth: 400 }}>
          <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="password">Password</Tabs.Trigger>
            <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="account">Make changes to your account.</Tabs.Content>
          <Tabs.Content value="password">Change your password.</Tabs.Content>
          <Tabs.Content value="billing">Update billing details.</Tabs.Content>
        </Tabs>
      ),
    },
    {
      id: "tabs-pills",
      title: "Pills variant",
      description: "Individual pill triggers without a segmented container.",
      code: `<Tabs defaultValue="account" variant="pills">...</Tabs>`,
      preview: (
        <Tabs defaultValue="account" variant="pills" style={{ width: "100%", maxWidth: 400 }}>
          <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="password">Password</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="account">Account panel</Tabs.Content>
          <Tabs.Content value="password">Password panel</Tabs.Content>
        </Tabs>
      ),
    },
  ],
  accordion: [
    {
      id: "accordion-single",
      title: "Single collapsible",
      description: "One open section at a time with optional leading icons and end meta.",
      code: `<Accordion type="single" collapsible defaultValue="faq-1">
  <Accordion.Item value="faq-1">
    <Accordion.Trigger icon={<Icon name="sparkles" size="sm" />}>
      What is AsriUI?
    </Accordion.Trigger>
    <Accordion.Content>
      A design system and React component library for product teams.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`,
      preview: (
        <Accordion type="single" collapsible defaultValue="faq-1" style={{ width: "100%", maxWidth: 420 }}>
          <Accordion.Item value="faq-1">
            <Accordion.Trigger icon={<Icon name="sparkles" size="sm" aria-hidden />}>
              What is AsriUI?
            </Accordion.Trigger>
            <Accordion.Content>
              A design system and React component library for product teams.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="faq-2">
            <Accordion.Trigger endContent="3 steps">How do I get started?</Accordion.Trigger>
            <Accordion.Content>Install the package, add AsriUIProvider, and import components.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      ),
    },
    {
      id: "accordion-bordered",
      title: "Bordered multiple",
      description: "Keep multiple sections open with bordered styling.",
      code: `<Accordion type="multiple" variant="bordered" defaultValue={["billing"]}>
  <Accordion.Item value="account">
    <Accordion.Trigger>Account</Accordion.Trigger>
    <Accordion.Content>Profile settings</Accordion.Content>
  </Accordion.Item>
</Accordion>`,
      preview: (
        <Accordion type="multiple" variant="bordered" defaultValue={["billing"]} style={{ width: "100%", maxWidth: 420 }}>
          <Accordion.Item value="account">
            <Accordion.Trigger startContent={<Icon name="check" size="sm" aria-hidden />}>
              Account
            </Accordion.Trigger>
            <Accordion.Content>Manage profile details and security settings.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="billing">
            <Accordion.Trigger endContent={<Badge variant="secondary">Pro</Badge>}>Billing</Accordion.Trigger>
            <Accordion.Content>Update payment method and download invoices.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      ),
    },
  ],
  dialog: [
    {
      id: "dialog-confirm",
      title: "Confirmation",
      description: "Shorthand title and description on Content with portal and focus trap.",
      code: `<Dialog>
  <Dialog.Trigger>Delete</Dialog.Trigger>
  <Dialog.Content
    title="Are you sure?"
    description="This cannot be undone."
  >
    <Dialog.Footer>
      <Dialog.Close>Cancel</Dialog.Close>
      <Button variant="danger">Delete</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>`,
      preview: <DialogPreview />,
    },
  ],
  "scroll-area": [
    {
      id: "scroll-area-container",
      title: "Container scroll",
      description: "Fixed-height region with a custom vertical scrollbar.",
      code: `<ScrollArea height={220} type="always" label="Updates">
  {items.map((item) => (
    <p key={item}>{item}</p>
  ))}
</ScrollArea>`,
      preview: (
        <ScrollArea height={220} type="always" label="Updates" style={{ width: "100%", maxWidth: 360 }}>
          {Array.from({ length: 12 }, (_, index) => (
            <p key={index} style={{ margin: "0 0 0.75rem" }}>
              Update {index + 1}: deployment completed successfully.
            </p>
          ))}
        </ScrollArea>
      ),
    },
    {
      id: "scroll-area-page",
      title: "Page scroll",
      description: "Wrap your app shell to style document scrolling.",
      code: `<ScrollArea page type="hover">
  <App />
</ScrollArea>`,
      preview: (
        <ScrollArea height={220} type="always" label="Page preview" style={{ width: "100%", maxWidth: 360 }}>
          {Array.from({ length: 16 }, (_, index) => (
            <p key={index} style={{ margin: "0 0 0.75rem" }}>
              Page section {index + 1}
            </p>
          ))}
        </ScrollArea>
      ),
    },
    {
      id: "scroll-area-intersection",
      title: "Intersection observer",
      description:
        "Place ScrollArea.Sentinel at the end of a list to load more when it enters the viewport. Uses the scroll container as root automatically.",
      code: `<ScrollArea height={220} type="always" label="Feed">
  {items.map((item) => (
    <p key={item}>{item}</p>
  ))}
  <ScrollArea.Sentinel
    rootMargin="120px"
    onIntersect={() => loadMore()}
  />
</ScrollArea>`,
      preview: (
        <ScrollArea height={220} type="always" label="Feed" style={{ width: "100%", maxWidth: 360 }}>
          {Array.from({ length: 8 }, (_, index) => (
            <p key={index} style={{ margin: "0 0 0.75rem" }}>
              Post {index + 1}
            </p>
          ))}
          <ScrollArea.Sentinel rootMargin="40px" />
        </ScrollArea>
      ),
    },
  ],
  skeleton: [
    {
      id: "skeleton-variants",
      title: "Variants",
      description: "Text, circular, rounded, and rectangular shapes.",
      code: `<Skeleton variant="text" width="80%" />
<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="rounded" height={100} />`,
      preview: (
        <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 320 }}>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="55%" />
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Skeleton variant="circular" width={48} height={48} />
            <div style={{ flex: 1, display: "grid", gap: 8 }}>
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="45%" />
            </div>
          </div>
          <Skeleton variant="rounded" height={80} />
        </div>
      ),
    },
    {
      id: "skeleton-presets",
      title: "Presets",
      description: "Ready-made profile and card loading layouts.",
      code: `<Skeleton.Profile />
<Skeleton.Card />`,
      preview: (
        <div style={{ display: "grid", gap: 20, width: "100%", maxWidth: 360 }}>
          <Skeleton.Profile />
          <Skeleton.Card />
        </div>
      ),
    },
    {
      id: "skeleton-list",
      title: "List loading",
      description: "Compose skeletons while async data loads.",
      code: `{[1, 2, 3].map((i) => (
  <Skeleton.Profile key={i} />
))}`,
      preview: (
        <div style={{ display: "grid", gap: 16, width: "100%" }}>
          <Skeleton.Profile />
          <Skeleton.Profile />
          <Skeleton.Profile />
        </div>
      ),
    },
  ],
  "virtual-list": [
    {
      id: "virtual-list-basic",
      title: "Transaction feed",
      code: `<VirtualList
  items={rows}
  itemHeight={44}
  height={220}
  renderItem={(row) => row}
/>`,
      preview: (
        <VirtualList
          items={Array.from({ length: 200 }, (_, i) => `Transaction #${i + 1}`)}
          itemHeight={40}
          height={220}
          renderItem={(row) => row}
        />
      ),
    },
  ],
  table: [
    {
      id: "table-bordered",
      title: "Bordered inventory",
      code: `<Table variant="bordered" scrollable>
  <Table.Header>
    <Table.Row>
      <Table.Head>Component</Table.Head>
      <Table.Head>Status</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Button</Table.Cell>
      <Table.Cell>Stable</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
      preview: (
        <Table variant="bordered" scrollable>
          <Table.Header>
            <Table.Row>
              <Table.Head>Component</Table.Head>
              <Table.Head>Status</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Button</Table.Cell>
              <Table.Cell>Stable</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>DataGrid</Table.Cell>
              <Table.Cell>Beta</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      ),
    },
  ],
  "data-grid": [
    {
      id: "data-grid-native",
      title: "Native sortable grid",
      description: "Client-side sorting with the built-in table engine — no extra dependencies.",
      code: `<DataGrid
  columns={[
    { id: "name", header: "Name", accessor: "name", sortable: true },
    { id: "status", header: "Status", accessor: "status" },
  ]}
  rows={rows}
  getRowId={(row) => row.id}
  height={240}
/>`,
      preview: (
        <DataGrid
          columns={[
            { id: "name", header: "Component", accessor: "name", sortable: true },
            { id: "status", header: "Status", accessor: "status", sortable: true },
          ]}
          rows={[
            { id: "button", name: "Button", status: "Stable" },
            { id: "dialog", name: "Dialog", status: "Stable" },
            { id: "data-grid", name: "DataGrid", status: "Beta" },
          ]}
          getRowId={(row) => row.id}
          height={220}
          defaultSort={{ columnId: "name", direction: "asc" }}
        />
      ),
    },
    {
      id: "data-grid-export",
      title: "Excel export",
      description: "Export grid data to CSV or Microsoft Excel (.xlsx). Excel requires peer dependency xlsx.",
      code: `<DataGrid
  columns={columns}
  rows={rows}
  exportable={{ csv: true, excel: true, filename: "report" }}
/>`,
      preview: (
        <DataGrid
          columns={[
            { id: "name", header: "Product", accessor: "name", sortable: true },
            { id: "qty", header: "Qty", accessor: "qty" },
          ]}
          rows={[
            { id: "1", name: "License", qty: 12 },
            { id: "2", name: "Support", qty: 4 },
          ]}
          getRowId={(row) => row.id}
          height={220}
          exportable={{ csv: true, excel: true, filename: "inventory" }}
        />
      ),
    },
    {
      id: "data-grid-editable",
      title: "Editable grid with validation",
      description:
        "Inline editing with required, pattern, unique, min/max rules, expandable row details, pagination, VirtualList for large datasets, and CSV/Excel export.",
      code: EDITABLE_DATA_GRID_CODE,
      preview: <EditableDataGridExample />,
    },
    {
      id: "data-grid-filter-pagination",
      title: "Column filters and pagination",
      description: "Filter each column independently. Matching rows are paginated.",
      code: `<DataGrid
  columns={[
    { id: "name", header: "Product", accessor: "name", filterable: true },
    {
      id: "status",
      header: "Status",
      accessor: "status",
      filterable: {
        type: "select",
        options: [
          { label: "Active", value: "Active" },
          { label: "Trial", value: "Trial" },
        ],
      },
    },
  ]}
  rows={rows}
  filter={{ global: false, columnFilters: true }}
  pagination={{ pageSize: 5 }}
/>`,
      preview: <DataGridFilterPaginationExample />,
    },
    {
      id: "data-grid-server",
      title: "Server-side filter, sort, and pagination",
      description: "Enable `serverSide` and `pagination.mode=\"server\"` — parent fetches each page.",
      code: DATA_GRID_SERVER_CODE,
      preview: <DataGridServerExample />,
    },
  ],
  toast: [
    {
      id: "toast-showcase",
      title: "Config-driven page",
      description:
        "Pass a configuration array to ToastShowcase — it wraps ToastProvider and renders trigger buttons for each toast.",
      code: TOAST_SHOWCASE_CODE,
      preview: <ToastShowcaseExample />,
    },
    {
      id: "toast-variants",
      title: "Variants",
      description:
        "Each variant has its own accent color, tinted background, and icon. Override globally with ToastProvider variants or per toast with accentColor, backgroundColor, and icon.",
      code: `// Global variant theme
<ToastProvider
  variants={{
    success: { accent: "#10b981", background: "#ecfdf5" },
    error: { accent: "#ef4444" },
  }}
>
  <App />
</ToastProvider>

// Per-toast override
toast({
  variant: "info",
  title: "Custom",
  accentColor: "#7c3aed",
  icon: <MyIcon />,
});`,
      preview: (
        <ToastProvider position="bottom-right" showProgress>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <Button variant="outline" onClick={() => toast.success("Saved", { description: "Your profile was updated." })}>
              Success
            </Button>
            <Button variant="outline" onClick={() => toast.error("Upload failed", { description: "Try again in a minute." })}>
              Error
            </Button>
            <Button variant="outline" onClick={() => toast.warning("Storage almost full")}>
              Warning
            </Button>
            <Button variant="outline" onClick={() => toast.info("New version available")}>
              Info
            </Button>
          </div>
        </ToastProvider>
      ),
    },
    {
      id: "toast-action",
      title: "Action button",
      description: "Add a single action such as Undo or Get support. The toast dismisses after the action by default.",
      code: `toast({
  variant: "error",
  title: "Sync failed",
  description: "We could not reach the server.",
  action: {
    label: "Get support",
    onClick: () => openSupportChat(),
  },
});`,
      preview: (
        <ToastProvider position="bottom-right" showProgress>
          <Button
            variant="outline"
            onClick={() =>
              toast({
                variant: "error",
                title: "Sync failed",
                description: "We could not reach the server.",
                action: { label: "Get support", onClick: () => undefined },
              })
            }
          >
            Show with action
          </Button>
        </ToastProvider>
      ),
    },
    {
      id: "toast-progress",
      title: "Progress bar",
      description: "Enable or disable the bottom auto-dismiss progress bar on the provider or per toast.",
      code: `<ToastProvider showProgress={false}>
  <App />
</ToastProvider>

toast.info("Heads up", { showProgress: true });`,
      preview: (
        <ToastProvider position="bottom-right" showProgress={false}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <Button
              variant="outline"
              onClick={() => toast.info("No progress bar", { description: "Provider has showProgress={false}." })}
            >
              Without bar
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.success("With bar", {
                  description: "Per-toast showProgress overrides the provider.",
                  showProgress: true,
                })
              }
            >
              Override on
            </Button>
          </div>
        </ToastProvider>
      ),
    },
  ],
  auth: [
    {
      id: "auth-login",
      title: "Login with OAuth",
      description: "Microsoft, Google, GitHub, and Apple buttons plus email form.",
      code: `<LoginForm
  onSubmit={signInWithEmail}
  onOAuth={(provider) => signInWithProvider(provider)}
/>`,
      preview: (
        <LoginForm
          providers={["microsoft", "google"]}
          onSubmit={() => undefined}
          onOAuth={() => undefined}
        />
      ),
    },
  ],
  calendar: [
    {
      id: "calendar-booking",
      title: "Multi-slot booking",
      description: "Pick a day, then select multiple time slots. Supports booked slots and per-day overrides.",
      code: `import { useState } from "react";
import { Calendar, type CalendarSlotSelection } from "asriui/calendar";

export function BookingCalendar() {
  const [selection, setSelection] = useState<CalendarSlotSelection[]>([]);

  return (
    <Calendar
      value={selection}
      onValueChange={setSelection}
      booked={[{ date: "2026-08-12", slotId: "09:00" }]}
      maxSelections={5}
      defaultMonth={new Date(2026, 7, 1)}
      daySlots={{
        "2026-08-15": [
          { id: "10:00", label: "10:00 AM", start: "10:00", end: "11:00" },
          { id: "14:00", label: "02:00 PM", start: "14:00", end: "15:00" },
        ],
      }}
    />
  );
}`,
      preview: (
        <Calendar
          defaultMonth={new Date(2026, 7, 1)}
          defaultActiveDate="2026-08-11"
          booked={[{ date: "2026-08-12", slotId: "09:00" }]}
          maxSelections={5}
        />
      ),
    },
  ],
  "server-query": [
    {
      id: "server-query-database",
      title: "Config-level database queries",
      description:
        "Set database once on AsriUIProvider — then use named keys, sql: strings, or { sql, params } in ServerQuery.",
      code: `<AsriUIProvider
  config={{
    database: {
      baseUrl: "https://api.example.com",
      queryEndpoint: "/query",
      headers: { Authorization: "Bearer …" },
      queries: {
        users: "SELECT id, name FROM users LIMIT 50",
        stats: { path: "/dashboard/stats", method: "GET" },
      },
    },
  }}
>
  <ServerQuery query="users">{(rows) => <DataGrid data={rows} />}</ServerQuery>
  <ServerQuery query={{ sql: "SELECT * FROM orders WHERE status = :status", params: { status: "open" } }}>
    {(orders) => <OrdersList items={orders} />}
  </ServerQuery>
</AsriUIProvider>`,
      preview: (
        <ServerQuery<{ count: number }>
          query={async () => ({ count: 128 })}
          queryKey="demo-db"
        >
          {(data) => (
            <p style={{ margin: 0 }}>
              Named query ready — example count: <strong>{data.count}</strong>. Configure <code>database</code> on
              AsriUIProvider, then use <code>query=&quot;users&quot;</code> or <code>sql:SELECT …</code>.
            </p>
          )}
        </ServerQuery>
      ),
    },
    {
      id: "server-query-user",
      title: "Fetch and render",
      description: "Pass a URL or async function — ServerQuery handles loading, errors, and retry.",
      code: `import { ServerQuery } from "asriui/server-query";
import { Card, Badge } from "asriui";

<ServerQuery query="https://api.example.com/users/1" queryKey="profile">
  {(user, { refetch }) => (
    <Card>
      <Card.Header>
        <Card.Title>{user.name}</Card.Title>
      </Card.Header>
      <Card.Content>
        <p>{user.email}</p>
        <Badge variant="secondary">{user.company.name}</Badge>
        <button type="button" onClick={refetch}>Refresh</button>
      </Card.Content>
    </Card>
  )}
</ServerQuery>`,
      preview: (
        <ServerQuery<{ name: string; email: string; company: { name: string } }>
          query="https://jsonplaceholder.typicode.com/users/1"
          queryKey="docs-user"
        >
          {(user) => (
            <Card style={{ maxWidth: 360 }}>
              <Card.Header>
                <Card.Title>{user.name}</Card.Title>
              </Card.Header>
              <Card.Content>
                <p style={{ margin: "0 0 0.5rem" }}>{user.email}</p>
                <Badge variant="secondary">{user.company.name}</Badge>
              </Card.Content>
            </Card>
          )}
        </ServerQuery>
      ),
    },
    {
      id: "server-query-status",
      title: "Custom states",
      description: "Use renderStatus for full control over loading, error, and success UI.",
      code: `<ServerQuery
  query={fetchStats}
  renderStatus={({ data, isLoading, error, refetch }) => {
    if (isLoading) return <Loader showLabel label="Loading stats" />;
    if (error) return <button onClick={refetch}>Retry</button>;
    return <Stats data={data} />;
  }}
>
  {() => null}
</ServerQuery>`,
      preview: (
        <ServerQuery<{ users: number; revenue: string }>
          query={async () => {
            await new Promise((resolve) => setTimeout(resolve, 600));
            return { users: 3842, revenue: "$48.2k" };
          }}
          queryKey="demo-stats"
          renderStatus={({ data, isLoading, error, refetch }) => {
            if (isLoading) return <Loader variant="dots" showLabel label="Loading stats" />;
            if (error) {
              return (
                <Button size="sm" variant="outline" onClick={refetch}>
                  Retry
                </Button>
              );
            }
            return (
              <div style={{ display: "flex", gap: "1rem" }}>
                <Card>
                  <Card.Content>
                    <strong>{data?.users}</strong>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--asriui-color-muted-foreground)" }}>
                      Active users
                    </p>
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <strong>{data?.revenue}</strong>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--asriui-color-muted-foreground)" }}>
                      Revenue
                    </p>
                  </Card.Content>
                </Card>
              </div>
            );
          }}
        />
      ),
    },
  ],
  form: [
    {
      id: "form-json",
      title: "JSON configuration",
      description:
      "Define fields declaratively — supports required, regex, min/max length, cross-field match, unique values, and custom rules.",
      code: `const config = {
  fields: [
    {
      name: "username",
      type: "text",
      label: "Username",
      rules: [
        { type: "required" },
        { type: "pattern", value: "^[a-z0-9_]+$", message: "Use lowercase letters, numbers, or underscores" },
        { type: "notOneOf", values: ["admin", "root"], message: "That username is reserved" },
      ],
    },
    { name: "password", type: "password", label: "Password", required: true, minLength: 8 },
    { name: "confirm", type: "password", label: "Confirm password", matches: "password" },
  ],
};
<Form config={config} onSubmit={save} />`,
      preview: (
        <Form
          config={{
            fields: [
              {
                name: "username",
                type: "text",
                label: "Username",
                rules: [
                  { type: "required" },
                  {
                    type: "pattern",
                    value: "^[a-z0-9_]+$",
                    message: "Use lowercase letters, numbers, or underscores",
                  },
                ],
              },
              { name: "password", type: "password", label: "Password", required: true, minLength: 8 },
              { name: "confirm", type: "password", label: "Confirm password", matches: "password" },
            ],
          }}
          onSubmit={() => undefined}
        />
      ),
    },
    {
      id: "form-validation-rules",
      title: "Validation rules",
      description: "Regex, allowed values, numeric bounds, and unique field checks via JSON rules.",
      code: `{ name: "slug", type: "text", label: "Slug",
  pattern: "^[a-z0-9-]+$",
  patternMessage: "Use lowercase letters, numbers, and hyphens",
  uniqueAmong: ["name"] }`,
      preview: (
        <Form
          config={{
            fields: [
              { name: "name", type: "text", label: "Name", required: true },
              {
                name: "slug",
                type: "text",
                label: "Slug",
                pattern: "^[a-z0-9-]+$",
                patternMessage: "Use lowercase letters, numbers, and hyphens",
                uniqueAmong: ["name"],
              },
            ],
          }}
          onSubmit={() => undefined}
        />
      ),
    },
    {
      id: "form-advanced",
      title: "useForm, conditional fields, image upload",
      description:
        "Conditional `showWhen`, API-driven `optionsFrom`, image drag-and-drop, and headless `useForm` submit.",
      code: FORM_ADVANCED_CODE,
      preview: <FormAdvancedExample />,
    },
  ],
  page: [
    {
      id: "page-contact-json",
      title: "Contact page from JSON",
      description: "Pass a PageConfig — layout, header, and form blocks render automatically.",
      code: `import { Page } from "asriui/page";

const config = {
  layout: { variant: "centered", contentMaxWidth: "36rem" },
  header: {
    badge: "Support",
    title: "Contact us",
    description: "We reply within one business day.",
  },
  blocks: [
    {
      id: "contact-form",
      type: "form",
      config: {
        submitLabel: "Send message",
        fields: [
          { name: "name", type: "text", label: "Full name", required: true },
          { name: "email", type: "email", label: "Work email", required: true },
        ],
      },
    },
  ],
};

<Page config={config} onFormSubmit={(id, values) => console.log(id, values)} />`,
      preview: (
        <div style={{ width: "100%", maxWidth: 420 }}>
          <Page
            config={EXAMPLE_CONTACT_PAGE}
            onFormSubmit={async () => {
              toast.success("Message sent");
            }}
          />
        </div>
      ),
    },
    {
      id: "page-dashboard-json",
      title: "Dashboard from JSON",
      description: "Sidebar shell with stats, table, and timeline — still one config object.",
      code: `<Page config={dashboardConfig} onAction={(event) => console.log(event)} />`,
      preview: (
        <div style={{ width: "100%", maxHeight: 420, overflow: "auto", border: "1px solid var(--lp-border)" }}>
          <Page
            config={EXAMPLE_DASHBOARD_PAGE}
            onAction={(event) => {
              toast.info(`${event.type}: ${event.id}`);
            }}
          />
        </div>
      ),
    },
  ],
  "card-validation": [
    {
      id: "card-validation-basic",
      title: "Checkout card fields",
      description: "Formats the number, detects brand, and validates Luhn + expiry + CVC.",
      code: `import { CardValidation } from "asriui/card-validation";

<CardValidation
  helperText="Try 4242 4242 4242 4242 — Visa test card."
  onChange={(values) => console.log(values)}
/>`,
      preview: (
        <div style={{ width: "100%", maxWidth: 420 }}>
          <CardValidation helperText="Try 4242 4242 4242 4242 — Visa test card." />
        </div>
      ),
    },
    {
      id: "card-validation-amex",
      title: "Amex (15-digit + CID)",
      description: "Amex uses 4-6-5 formatting and a 4-digit CID.",
      code: `<CardValidation
  defaultValues={{ number: "378282246310005" }}
  showName={false}
/>`,
      preview: (
        <div style={{ width: "100%", maxWidth: 420 }}>
          <CardValidation defaultValues={{ number: "378282246310005" }} showName={false} />
        </div>
      ),
    },
  ],
  "error-boundary": [
    {
      id: "error-boundary-info",
      title: "Usage",
      description: "Wrap any subtree to catch render errors and show fallback UI.",
      code: `<ErrorBoundary monitoringUrl="/api/errors">
  <App />
</ErrorBoundary>`,
      preview: (
        <p style={{ margin: 0, fontSize: 14, color: "var(--lp-muted-fg)", lineHeight: 1.6 }}>
          ErrorBoundary catches render errors, displays a fallback, and optionally POSTs
          error details to your monitoring endpoint via <code>AsriUIProvider</code>.
        </p>
      ),
    },
  ],
  "monaco-editor": [
    {
      id: "monaco-json",
      title: "JSON editor",
      code: `<MonacoEditor language="json" defaultValue='{"theme":"light"}' height={180} />`,
      preview: <MonacoEditor language="json" defaultValue={'{\n  "theme": "light"\n}'} height={160} />,
    },
  ],
  "flow-chart": [
    {
      id: "flow-chart-basic",
      title: "Default graph",
      code: `<FlowChart height={220} showMiniMap showControls />`,
      preview: <FlowChart height={200} />,
    },
  ],
  "code-block": [
    {
      id: "code-block-basic",
      title: "Syntax highlighting",
      description: "VS Code dark theme with colored tokens — no Monaco required.",
      code: `<CodeBlock
  code={\`const greeting = "Hello";\`}
  language="tsx"
  showCopy
/>`,
      preview: (
        <CodeBlock
          code={`import { Button } from "asriui/button";

export function App() {
  return <Button>Get started</Button>;
}`}
          showCopy
          filename="App.tsx"
        />
      ),
    },
    {
      id: "code-block-lines",
      title: "Line numbers",
      code: `<CodeBlock code={source} lineNumbers showCopy />`,
      preview: (
        <CodeBlock
          code={`function sum(a: number, b: number) {
  return a + b;
}`}
          lineNumbers
          showCopy
        />
      ),
    },
  ],
  markdown: [
    {
      id: "markdown-basic",
      title: "Docs & release notes",
      description: "Headings, lists, links, tables, and fenced CodeBlock — zero markdown deps.",
      code: `<Markdown
  source={\`# Hello

- Accessible
- Themeable

\\\`\\\`\\\`tsx
import { Markdown } from "asriui/markdown";
\\\`\\\`\\\`
\`}
/>`,
      preview: (
        <Markdown
          source={`# Hello AsriUI

Render **docs** and *changelogs* with theme tokens.

- Headings & lists
- Inline \`code\`
- [Safe links](https://example.com)

| Prop | Default |
| --- | --- |
| showCodeCopy | true |

\`\`\`tsx
import { Markdown } from "asriui/markdown";
\`\`\`
`}
        />
      ),
    },
    {
      id: "markdown-children",
      title: "String children",
      code: `<Markdown>{"Install with \`pnpm add asriui\`."}</Markdown>`,
      preview: <Markdown>{"Install with `pnpm add asriui`, then wrap your app in **AsriUIProvider**."}</Markdown>,
    },
  ],
  "side-nav": [
    {
      id: "side-nav-basic",
      title: "Grouped links",
      description: "Left border accent on hover and active state.",
      code: `<SideNav>
  <SideNav.Group label="Components">
    <SideNav.List>
      <SideNav.Item>
        <SideNav.Link href="/button" active>Button</SideNav.Link>
      </SideNav.Item>
    </SideNav.List>
  </SideNav.Group>
</SideNav>`,
      preview: (
        <div style={{ maxWidth: 220, padding: 12, background: "var(--asriui-color-muted)", borderRadius: 8 }}>
          <SideNav>
            <SideNav.Group label="Components">
              <SideNav.List>
                <SideNav.Item>
                  <SideNav.Link href="#" active>
                    Button
                  </SideNav.Link>
                </SideNav.Item>
                <SideNav.Item>
                  <SideNav.Link href="#">Input</SideNav.Link>
                </SideNav.Item>
                <SideNav.Item>
                  <SideNav.Link href="#">Card</SideNav.Link>
                </SideNav.Item>
              </SideNav.List>
            </SideNav.Group>
          </SideNav>
        </div>
      ),
    },
    {
      id: "side-nav-collapsible",
      title: "Collapsible groups",
      description: "Collapse sections with animated chevrons, or collapse the whole sidebar with Toggle.",
      code: `<SideNav collapsible>
  <SideNav.Toggle />
  <SideNav.Group label="Components" collapsible defaultOpen>
    <SideNav.List>
      <SideNav.Item>
        <SideNav.Link href="/button" active>Button</SideNav.Link>
      </SideNav.Item>
    </SideNav.List>
  </SideNav.Group>
</SideNav>`,
      preview: (
        <div style={{ maxWidth: 220, padding: 12, background: "var(--asriui-color-muted)", borderRadius: 8 }}>
          <SideNav collapsible>
            <SideNav.Toggle />
            <SideNav.Group label="Components" collapsible defaultOpen>
              <SideNav.List>
                <SideNav.Item>
                  <SideNav.Link href="#" active>
                    Button
                  </SideNav.Link>
                </SideNav.Item>
                <SideNav.Item>
                  <SideNav.Link href="#">Input</SideNav.Link>
                </SideNav.Item>
              </SideNav.List>
            </SideNav.Group>
            <SideNav.Group label="Layout" collapsible defaultOpen={false}>
              <SideNav.List>
                <SideNav.Item>
                  <SideNav.Link href="#">Card</SideNav.Link>
                </SideNav.Item>
              </SideNav.List>
            </SideNav.Group>
          </SideNav>
        </div>
      ),
    },
    {
      id: "side-nav-hamburger",
      title: "Hamburger hide",
      description:
        "Animated hamburger ↔ close icon. With collapseMode=\"hidden\", clicking hides the whole sidenav and leaves the toggle to reopen.",
      code: `<SideNav collapsible collapseMode="hidden">
  <SideNav.Toggle variant="hamburger" />
  <SideNav.Header>
    <strong>App</strong>
  </SideNav.Header>
  <SideNav.Group label="Pages" collapsible defaultOpen>
    <SideNav.List>
      <SideNav.Item>
        <SideNav.Link href="/dashboard" active>Dashboard</SideNav.Link>
      </SideNav.Item>
      <SideNav.Item>
        <SideNav.Link href="/settings">Settings</SideNav.Link>
      </SideNav.Item>
    </SideNav.List>
  </SideNav.Group>
</SideNav>`,
      preview: (
        <div
          style={{
            display: "flex",
            gap: 12,
            width: "100%",
            maxWidth: 420,
            padding: 12,
            background: "var(--asriui-color-muted)",
            borderRadius: 8,
          }}
        >
          <SideNav collapsible collapseMode="hidden" style={{ width: 200 }}>
            <SideNav.Toggle variant="hamburger" />
            <SideNav.Header>
              <strong>App</strong>
            </SideNav.Header>
            <SideNav.Group label="Pages" collapsible defaultOpen>
              <SideNav.List>
                <SideNav.Item>
                  <SideNav.Link href="#" active>
                    Dashboard
                  </SideNav.Link>
                </SideNav.Item>
                <SideNav.Item>
                  <SideNav.Link href="#">Settings</SideNav.Link>
                </SideNav.Item>
                <SideNav.Item>
                  <SideNav.Link href="#">Billing</SideNav.Link>
                </SideNav.Item>
              </SideNav.List>
            </SideNav.Group>
          </SideNav>
          <div style={{ flex: 1, fontSize: 13, color: "var(--asriui-color-muted-foreground)", paddingTop: 4 }}>
            Click the hamburger to hide the sidenav. Open state shows an X.
          </div>
        </div>
      ),
    },
    {
      id: "side-nav-menus",
      title: "Multiple menus with icons",
      description: "Switch between top-level menus via an icon rail. Groups and links accept custom icons.",
      code: `<SideNav>
  <SideNav.Menus defaultMenu="docs">
    <SideNav.Menu id="docs" label="Docs" icon={<Icon name="sparkles" size="sm" />}>
      <SideNav.Group label="Components" icon={<Icon name="grid" size="sm" />} collapsible>
        <SideNav.List>
          <SideNav.Item>
            <SideNav.Link href="/button" icon={<Icon name="check" size="sm" />} active>
              Button
            </SideNav.Link>
          </SideNav.Item>
        </SideNav.List>
      </SideNav.Group>
    </SideNav.Menu>
    <SideNav.Menu id="settings" label="Settings" icon={<Icon name="package" size="sm" />}>
      <SideNav.List>
        <SideNav.Item>
          <SideNav.Link href="/profile">Profile</SideNav.Link>
        </SideNav.Item>
      </SideNav.List>
    </SideNav.Menu>
  </SideNav.Menus>
</SideNav>`,
      preview: (
        <div style={{ maxWidth: 260, padding: 12, background: "var(--asriui-color-muted)", borderRadius: 8 }}>
          <SideNav>
            <SideNav.Menus defaultMenu="docs">
              <SideNav.Menu id="docs" label="Docs" icon={<Icon name="sparkles" size="sm" aria-hidden />}>
                <SideNav.Group label="Components" icon={<Icon name="grid" size="sm" aria-hidden />} collapsible>
                  <SideNav.List>
                    <SideNav.Item>
                      <SideNav.Link href="#" icon={<Icon name="check" size="sm" aria-hidden />} active>
                        Button
                      </SideNav.Link>
                    </SideNav.Item>
                  </SideNav.List>
                </SideNav.Group>
              </SideNav.Menu>
              <SideNav.Menu id="settings" label="Settings" icon={<Icon name="package" size="sm" aria-hidden />}>
                <SideNav.List>
                  <SideNav.Item>
                    <SideNav.Link href="#">Profile</SideNav.Link>
                  </SideNav.Item>
                </SideNav.List>
              </SideNav.Menu>
            </SideNav.Menus>
          </SideNav>
        </div>
      ),
    },
    {
      id: "side-nav-submenu",
      title: "Nested submenu levels",
      description: "Nest links under SideNav.Submenu for deeper menu hierarchies.",
      code: `<SideNav>
  <SideNav.List>
    <SideNav.Submenu label="Form" icon={<Icon name="form" size="sm" />} defaultOpen>
      <SideNav.Item>
        <SideNav.Link href="/button">Button</SideNav.Link>
      </SideNav.Item>
      <SideNav.Item>
        <SideNav.Link href="/input">Input</SideNav.Link>
      </SideNav.Item>
    </SideNav.Submenu>
  </SideNav.List>
</SideNav>`,
      preview: (
        <div style={{ maxWidth: 220, padding: 12, background: "var(--asriui-color-muted)", borderRadius: 8 }}>
          <SideNav>
            <SideNav.List>
              <SideNav.Submenu label="Form" icon={<Icon name="form" size="sm" aria-hidden />} defaultOpen>
                <SideNav.Item>
                  <SideNav.Link href="#" active>
                    Button
                  </SideNav.Link>
                </SideNav.Item>
                <SideNav.Item>
                  <SideNav.Link href="#">Input</SideNav.Link>
                </SideNav.Item>
              </SideNav.Submenu>
            </SideNav.List>
          </SideNav>
        </div>
      ),
    },
    {
      id: "side-nav-virtual",
      title: "Virtualized list",
      description: "Enable virtualization for large navigation lists. Only visible rows are mounted.",
      code: `const items = routes.map((route) => ({
  id: route.id,
  label: route.label,
  href: route.href,
}));

<SideNav>
  <SideNav.Group label="Routes" collapsible defaultOpen>
    <SideNav.VirtualList
      items={items}
      itemHeight={36}
      height={280}
      getItemKey={(item) => item.id}
      renderItem={(item) => (
        <SideNav.Link href={item.href}>{item.label}</SideNav.Link>
      )}
    />
  </SideNav.Group>
</SideNav>`,
      preview: (
        <div style={{ maxWidth: 220, padding: 12, background: "var(--asriui-color-muted)", borderRadius: 8 }}>
          <SideNav>
            <SideNav.Group label="Routes" collapsible defaultOpen>
              <SideNav.VirtualList
                items={Array.from({ length: 120 }, (_, index) => ({
                  id: `route-${index}`,
                  label: `Route ${index + 1}`,
                  href: `#route-${index}`,
                }))}
                itemHeight={36}
                height={160}
                getItemKey={(item) => item.id}
                renderItem={(item) => <SideNav.Link href={item.href}>{item.label}</SideNav.Link>}
              />
            </SideNav.Group>
          </SideNav>
        </div>
      ),
    },
  ],
  "page-layout": [
    {
      id: "page-layout-sidebar",
      title: "Sidebar layout",
      description: "Two-column shell with sticky sidebar.",
      code: `<PageLayout variant="sidebar">
  <PageLayout.Sidebar><SideNav>...</SideNav></PageLayout.Sidebar>
  <PageLayout.Main>
    <PageLayout.Content maxWidth="48rem">{children}</PageLayout.Content>
  </PageLayout.Main>
</PageLayout>`,
      preview: (
        <div style={{ border: "1px solid var(--asriui-color-border)", borderRadius: 8, overflow: "hidden" }}>
          <PageLayout variant="sidebar" style={{ minHeight: 180 }}>
            <PageLayout.Sidebar>
              <SideNav>
                <SideNav.List>
                  <SideNav.Item>
                    <SideNav.Link href="#" active>
                      Docs
                    </SideNav.Link>
                  </SideNav.Item>
                  <SideNav.Item>
                    <SideNav.Link href="#">Settings</SideNav.Link>
                  </SideNav.Item>
                </SideNav.List>
              </SideNav>
            </PageLayout.Sidebar>
            <PageLayout.Main>
              <PageLayout.Content>
                <p style={{ margin: 0, fontSize: 14 }}>Main content area</p>
              </PageLayout.Content>
            </PageLayout.Main>
          </PageLayout>
        </div>
      ),
    },
    {
      id: "page-layout-docs",
      title: "Docs layout",
      description: "Sidebar + content + sticky aside for table of contents.",
      code: `<PageLayout variant="docs">
  <PageLayout.Sidebar>...</PageLayout.Sidebar>
  <PageLayout.Main>
    <PageLayout.Content>{article}</PageLayout.Content>
    <PageLayout.Aside>{toc}</PageLayout.Aside>
  </PageLayout.Main>
</PageLayout>`,
      preview: (
        <div style={{ border: "1px solid var(--asriui-color-border)", borderRadius: 8, overflow: "hidden" }}>
          <PageLayout variant="docs" style={{ minHeight: 180 }}>
            <PageLayout.Sidebar>
              <SideNav>
                <SideNav.List>
                  <SideNav.Item>
                    <SideNav.Link href="#" active>
                      API
                    </SideNav.Link>
                  </SideNav.Item>
                </SideNav.List>
              </SideNav>
            </PageLayout.Sidebar>
            <PageLayout.Main>
              <PageLayout.Content>
                <p style={{ margin: 0, fontSize: 14 }}>Article</p>
              </PageLayout.Content>
              <PageLayout.Aside>
                <p style={{ margin: 0, fontSize: 12, opacity: 0.65 }}>TOC</p>
              </PageLayout.Aside>
            </PageLayout.Main>
          </PageLayout>
        </div>
      ),
    },
    {
      id: "page-layout-centered",
      title: "Centered layout",
      description: "Single centered column for marketing, about, and contact pages.",
      code: `<PageLayout variant="centered" contentMaxWidth="48rem">
  <PageLayout.Main>
    <PageLayout.Content>{children}</PageLayout.Content>
  </PageLayout.Main>
</PageLayout>`,
      preview: (
        <div style={{ border: "1px solid var(--asriui-color-border)", borderRadius: 8, overflow: "hidden" }}>
          <PageLayout variant="centered" contentMaxWidth="28rem" style={{ minHeight: 120, padding: "1rem 0" }}>
            <PageLayout.Main>
              <PageLayout.Content>
                <p style={{ margin: 0, fontSize: 14, textAlign: "center" }}>Centered content</p>
              </PageLayout.Content>
            </PageLayout.Main>
          </PageLayout>
        </div>
      ),
    },
  ],
  hero: [
    {
      id: "hero-full",
      title: "Full text",
      description: "Centered copy on an animated dotted background.",
      code: `<Hero variant="full" align="center" background="dotted" animated>
  <Hero.Copy>
    <Hero.Eyebrow>AsriUI</Hero.Eyebrow>
    <Hero.Title>The React kit for product teams</Hero.Title>
    <Hero.Description>Accessible components you own.</Hero.Description>
    <Hero.Actions>
      <Button>Browse docs</Button>
    </Hero.Actions>
  </Hero.Copy>
</Hero>`,
      preview: (
        <Hero variant="full" align="center" size="md" background="dotted" animated>
          <Hero.Copy>
            <Hero.Eyebrow>AsriUI</Hero.Eyebrow>
            <Hero.Title as="h2">The React kit for product teams</Hero.Title>
            <Hero.Description>Accessible components you own.</Hero.Description>
            <Hero.Actions>
              <Button>Browse docs</Button>
            </Hero.Actions>
          </Hero.Copy>
        </Hero>
      ),
    },
    {
      id: "hero-right-text",
      title: "Right text + slider",
      description: "Split layout with copy on the right and a compound Slider in Hero.Media.",
      code: `<Hero variant="split" textSide="right" background="glow" animated>
  <Hero.Copy>
    <Hero.Title>Copy on the right</Hero.Title>
    <Hero.Description>Media sits on the left.</Hero.Description>
  </Hero.Copy>
  <Hero.Media>
    <Slider>
      <Slider.Track>
        <Slider.Slide>One</Slider.Slide>
        <Slider.Slide>Two</Slider.Slide>
      </Slider.Track>
      <Slider.Controls>
        <Slider.Prev />
        <Slider.Dots />
        <Slider.Next />
      </Slider.Controls>
    </Slider>
  </Hero.Media>
</Hero>`,
      preview: (
        <Hero variant="split" textSide="right" size="md" background="glow" animated>
          <Hero.Copy>
            <Hero.Eyebrow>Launch</Hero.Eyebrow>
            <Hero.Title as="h2">Copy on the right</Hero.Title>
            <Hero.Description>Pair a slider or visual on the left.</Hero.Description>
            <Hero.Actions>
              <Button size="sm">Get started</Button>
            </Hero.Actions>
          </Hero.Copy>
          <Hero.Media>
            <Slider>
              <Slider.Track>
                <Slider.Slide>
                  <div style={{ padding: "2.5rem 1rem", textAlign: "center" }}>One</div>
                </Slider.Slide>
                <Slider.Slide>
                  <div style={{ padding: "2.5rem 1rem", textAlign: "center" }}>Two</div>
                </Slider.Slide>
              </Slider.Track>
              <Slider.Controls>
                <Slider.Prev />
                <Slider.Dots />
                <Slider.Next />
              </Slider.Controls>
            </Slider>
          </Hero.Media>
        </Hero>
      ),
    },
  ],
  slider: [
    {
      id: "slider-default",
      title: "Track, arrows, and dots",
      description: "Compound carousel — drag the track, or use Prev, Next, and Dots.",
      code: `<Slider>
  <Slider.Track>
    <Slider.Slide>First</Slider.Slide>
    <Slider.Slide>Second</Slider.Slide>
  </Slider.Track>
  <Slider.Controls>
    <Slider.Prev />
    <Slider.Dots />
    <Slider.Next />
  </Slider.Controls>
</Slider>`,
      preview: (
        <div style={{ width: "100%", maxWidth: 420 }}>
          <Slider>
            <Slider.Track>
              <Slider.Slide>
                <div style={{ padding: "2.75rem 1rem", textAlign: "center" }}>First</div>
              </Slider.Slide>
              <Slider.Slide>
                <div style={{ padding: "2.75rem 1rem", textAlign: "center" }}>Second</div>
              </Slider.Slide>
            </Slider.Track>
            <Slider.Controls>
              <Slider.Prev />
              <Slider.Dots />
              <Slider.Next />
            </Slider.Controls>
          </Slider>
        </div>
      ),
    },
  ],
  grid: [
    {
      id: "grid-fixed",
      title: "Fixed columns",
      description: "Two-column grid for galleries and card layouts.",
      code: `<Grid variant="fixed" columns={2} gap="md">
  <Card>...</Card>
  <Card>...</Card>
</Grid>`,
      preview: (
        <Grid variant="fixed" columns={2} gap="md" style={{ width: "100%" }}>
          <div style={{ padding: 16, background: "var(--asriui-color-muted)", borderRadius: 8 }}>A</div>
          <div style={{ padding: 16, background: "var(--asriui-color-muted)", borderRadius: 8 }}>B</div>
          <div style={{ padding: 16, background: "var(--asriui-color-muted)", borderRadius: 8 }}>C</div>
          <div style={{ padding: 16, background: "var(--asriui-color-muted)", borderRadius: 8 }}>D</div>
        </Grid>
      ),
    },
    {
      id: "grid-auto",
      title: "Auto-fill",
      description:
        "Responsive columns that wrap based on min width. Cards animate smoothly when the layout reflows on resize.",
      code: `<Grid variant="auto" minColumnWidth={140} gap="sm">
  {items.map((item) => (
    <Card key={item.id}>{item.title}</Card>
  ))}
</Grid>`,
      preview: (
        <Grid variant="auto" minColumnWidth={120} gap="sm" style={{ width: "100%" }}>
          {["Forms", "Layout", "Data", "Docs"].map((item) => (
            <div
              key={item}
              style={{ padding: 12, background: "var(--asriui-color-muted)", borderRadius: 8, fontSize: 13 }}
            >
              {item}
            </div>
          ))}
        </Grid>
      ),
    },
  ],
  container: [
    {
      id: "container-basic",
      title: "Constrained content",
      description: "Center content with a max-width size token and horizontal padding.",
      code: `<Container size="md" padding="md">
  <h2>Readable column</h2>
  <p>Body copy stays within a comfortable measure.</p>
</Container>`,
      preview: (
        <Container size="md" padding="sm" style={{ border: "1px dashed var(--asriui-color-border)", borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 14 }}>Container size=&quot;md&quot;</p>
        </Container>
      ),
    },
  ],
  flex: [
    {
      id: "flex-toolbar",
      title: "Toolbar row",
      description: "Horizontal flex with space-between and gap tokens.",
      code: `<Flex align="center" justify="between" gap="md">
  <span>Filters</span>
  <Button size="sm">Export</Button>
</Flex>`,
      preview: (
        <Flex align="center" justify="between" gap="md" style={{ width: "100%" }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Filters</span>
          <Button size="sm">Export</Button>
        </Flex>
      ),
    },
    {
      id: "flex-stack",
      title: "Vertical stack",
      code: `<Flex direction="column" gap="sm">
  <Input label="Name" />
  <Button>Continue</Button>
</Flex>`,
      preview: (
        <Flex direction="column" gap="sm" style={{ width: "100%", maxWidth: 280 }}>
          <Input label="Name" placeholder="Ada Lovelace" />
          <Button size="sm">Continue</Button>
        </Flex>
      ),
    },
  ],
  "theme-switch": [
    {
      id: "theme-switch-basic",
      title: "Ripple toggle",
      description: "Default circular reveal. Try other animations via the animation prop.",
      code: `<ThemeSwitch theme={theme} onThemeChange={setTheme} animation="ripple" showLabel />`,
      preview: <ThemeSwitchDemo />,
    },
  ],
  "aspect-ratio": [
    {
      id: "aspect-ratio-video",
      title: "16:9 media frame",
      code: `<AspectRatio ratio={16 / 9}>
  <Image src="/hero.jpg" alt="Hero" />
</AspectRatio>`,
      preview: (
        <div style={{ width: "100%", maxWidth: 320 }}>
          <AspectRatio ratio={16 / 9}>
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, var(--asriui-color-muted), var(--asriui-color-border))",
                display: "grid",
                placeItems: "center",
                fontSize: 13,
                color: "var(--asriui-color-muted-foreground)",
              }}
            >
              16:9
            </div>
          </AspectRatio>
        </div>
      ),
    },
  ],
  image: [
    {
      id: "image-responsive",
      title: "Responsive srcSet",
      description: "One base path generates multiple width variants for lazy loading.",
      code: `<Image
  src="/assets/photo.jpg"
  alt="Gallery"
  widths={[400, 800, 1200]}
  srcPattern="suffix"
/>`,
      preview: (
        <div style={{ width: "100%", maxWidth: 320 }}>
          <AspectRatio ratio={4 / 3}>
            <Image
              src="https://picsum.photos/seed/asriui-docs/1200/900"
              alt="Gallery sample"
              widths={[320, 640]}
              srcPattern="query"
              sizes="320px"
            />
          </AspectRatio>
        </div>
      ),
    },
    {
      id: "image-cache",
      title: "On-device cache",
      description: "Cache Storage keeps the image local. refetchInterval controls when it revalidates in the background.",
      code: `<Image
  src="/assets/photo.jpg"
  alt="Gallery"
  cache
  refetchInterval={60 * 60 * 1000}
/>`,
      preview: (
        <div style={{ width: "100%", maxWidth: 320 }}>
          <AspectRatio ratio={4 / 3}>
            <Image
              src="https://picsum.photos/seed/asriui-cache/1200/900"
              alt="Cached gallery sample"
              widths={[320, 640]}
              srcPattern="query"
              sizes="320px"
              cache
              refetchInterval={60 * 60 * 1000}
            />
          </AspectRatio>
        </div>
      ),
    },
  ],
  loader: [
    {
      id: "loader-variants",
      title: "Variants",
      description: "Spinner, bouncing dots, and ring indicators with accessible labels.",
      code: `<Loader variant="spinner" label="Loading" showLabel />
<Loader variant="dots" size="sm" />
<Loader variant="ring" size="lg" />`,
      preview: (
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <Loader variant="spinner" showLabel label="Spinner" />
          <Loader variant="dots" />
          <Loader variant="ring" size="lg" />
        </div>
      ),
    },
    {
      id: "loader-sizes",
      title: "Sizes",
      code: `<Loader size="sm" />
<Loader size="md" />
<Loader size="lg" />`,
      preview: (
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Loader size="sm" />
          <Loader size="md" />
          <Loader size="lg" />
        </div>
      ),
    },
  ],
  timeline: [
    {
      id: "timeline-roadmap",
      title: "Product roadmap",
      description: "Mark steps as complete, active, or upcoming with connector lines.",
      code: `<Timeline>
  <Timeline.Item title="Alpha" status="complete" date="Shipped" />
  <Timeline.Item title="Beta" status="active" date="Now" />
  <Timeline.Item title="GA" status="default" date="Soon" />
</Timeline>`,
      preview: (
        <div style={{ maxWidth: 360 }}>
          <Timeline>
            <Timeline.Item
              title="Core components"
              date="Shipped"
              status="complete"
              description="Button, Input, Card, Dialog, and more."
            />
            <Timeline.Item
              title="Docs & layouts"
              date="Shipped"
              status="complete"
              description="PageLayout, SideNav, CodeBlock."
            />
            <Timeline.Item
              title="Advanced tooling"
              date="Now"
              status="active"
              description="Monaco, React Flow, JSON forms."
            />
            <Timeline.Item
              title="Select & DatePicker"
              date="Soon"
              status="default"
              description="More form primitives coming."
            />
          </Timeline>
        </div>
      ),
    },
    {
      id: "timeline-horizontal-config",
      title: "Horizontal with config",
      description: "Pass items and statusColors to auto-build a horizontal progress timeline.",
      code: `<Timeline
  orientation="horizontal"
  items={[
    { id: "1", title: "Install", date: "Step 1", status: "complete" },
    { id: "2", title: "Configure", date: "Step 2", status: "complete" },
    { id: "3", title: "Ship", date: "Step 3", status: "active" },
  ]}
  statusColors={{
    complete: { dot: "#059669", dotBorder: "#059669" },
    active: { dot: "#0284c7", dotBorder: "#0284c7" },
  }}
/>`,
      preview: (
        <Timeline
          orientation="horizontal"
          animateOnView={false}
          items={[
            { id: "1", title: "Install", date: "Step 1", status: "complete", description: "pnpm add asriui" },
            { id: "2", title: "Configure", date: "Step 2", status: "complete", description: "Wrap with AsriUIProvider" },
            { id: "3", title: "Ship", date: "Step 3", status: "active", description: "Deploy to production" },
          ]}
          statusColors={{
            complete: { dot: "#059669", dotBorder: "#059669" },
            active: { dot: "#0284c7", dotBorder: "#0284c7" },
          }}
        />
      ),
    },
  ],
  icon: [
    {
      id: "icon-sizes",
      title: "Sizes",
      description: "Four size presets for inline and standalone use.",
      code: `<Icon name="sparkles" size="sm" />
<Icon name="sparkles" size="md" />
<Icon name="sparkles" size="lg" />
<Icon name="sparkles" size="xl" />`,
      preview: flex(
        <>
          <Icon name="sparkles" size="sm" />
          <Icon name="sparkles" size="md" />
          <Icon name="sparkles" size="lg" />
          <Icon name="sparkles" size="xl" />
        </>,
      ),
    },
    {
      id: "icon-labeled",
      title: "Accessible label",
      description: "Pass label when the icon conveys meaning without text.",
      code: `<Icon name="accessibility" label="Accessibility features" />`,
      preview: <Icon name="accessibility" label="Accessibility features" />,
    },
    {
      id: "icon-custom",
      title: "Custom SVG & images",
      description: "Pass library icons as children or use src for raster images.",
      code: `{/* lucide-react, react-icons, etc. */}
<Icon label="Launch">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3l9 18-9-4-9 4 9-18z" fill="currentColor" />
  </svg>
</Icon>

<Icon src="/logo.png" label="Logo" />`,
      preview: flex(
        <>
          <Icon label="Custom SVG">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3l9 18-9-4-9 4 9-18z" fill="currentColor" />
            </svg>
          </Icon>
          <Icon
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23000'/%3E%3C/svg%3E"
            label="Image icon"
          />
        </>,
      ),
    },
  ],
  typography: [
    {
      id: "typography-scale",
      title: "Type scale",
      description: "Semantic heading and body presets.",
      code: `<Typography.H1>Heading 1</Typography.H1>
<Typography.H2>Heading 2</Typography.H2>
<Typography.Lead>Lead paragraph for intros.</Typography.Lead>
<Typography.P>Body copy with comfortable line height.</Typography.P>
<Typography.Muted>Muted helper text</Typography.Muted>`,
      preview: (
        <div style={{ display: "grid", gap: 8, maxWidth: 480 }}>
          <Typography.H1>Heading 1</Typography.H1>
          <Typography.H2>Heading 2</Typography.H2>
          <Typography.Lead>Lead paragraph for intros.</Typography.Lead>
          <Typography.P>Body copy with comfortable line height.</Typography.P>
          <Typography.Muted>Muted helper text</Typography.Muted>
        </div>
      ),
    },
  ],
  "color-palette": [
    {
      id: "palette-default",
      title: "Default tokens",
      description: "Click a swatch to copy the CSS variable name.",
      code: `<ColorPalette />`,
      preview: <ColorPalette columns={4} />,
    },
  ],
  "ai-chat": [
    {
      id: "ai-chat-queue",
      title: "Message queue",
      description:
        "Queue follow-up prompts while a task runs. useAiChatQueue processes one task at a time and starts the next when the previous finishes.",
      code: AI_CHAT_QUEUE_CODE,
      preview: <AiChatQueueExample />,
    },
    {
      id: "ai-chat-basic",
      title: "Chat shell",
      description: "Messages, suggestions, and prompt input with keyboard send.",
      code: `<AiChat>
  <AiChat.Messages>
    <AiChat.Message messageRole="assistant">How can I help you build today?</AiChat.Message>
  </AiChat.Messages>
  <AiChat.Suggestions suggestions={["Show docs", "Create form"]} onSelect={setPrompt} />
  <AiChat.Prompt value={prompt} onValueChange={setPrompt} onSubmit={send} />
</AiChat>`,
      preview: <AiChatPreview />,
    },
  ],
  "ai-workflow-builder": [
    {
      id: "ai-workflow-default",
      title: "Support agent flow",
      description: "Palette, canvas, inspector, and run controls for designing AI workflows.",
      code: `<AiWorkflowBuilder
  className="support-workflow"
  onRun={({ nodes, edges }) => console.log({ nodes, edges })}
/>`,
      preview: (
        <div style={{ width: "100%", maxWidth: 1100 }}>
          <AiWorkflowBuilder height={420} />
        </div>
      ),
    },
  ],
  "ai-summarizer": [
    {
      id: "ai-summarizer-default",
      title: "Summarize text",
      description: "Condense articles or tickets into bullets or a paragraph.",
      code: `<AiSummarizer source={text} onSourceChange={setText} demo />`,
      preview: (
        <AiSummarizer
          source="AsriUI ships accessible React components with tree-shakable subpath imports, live docs, and PWA-ready site templates."
          demo
        />
      ),
    },
  ],
  "ai-data-analyst": [
    {
      id: "ai-data-analyst-default",
      title: "Ask in natural language",
      description: "Returns KPI metrics, a bar chart, and a breakdown table.",
      code: `<AiDataAnalyst query={query} onQueryChange={setQuery} demo />`,
      preview: <AiDataAnalyst query="Show revenue by region" demo />,
    },
  ],
  "ai-form-filler": [
    {
      id: "ai-form-filler-default",
      title: "Fill from instructions",
      description: "Maps free-form text onto a field schema preview.",
      code: `<AiFormFiller prompt={prompt} fields={fields} demo />`,
      preview: (
        <AiFormFiller
          prompt="Name is Ada Lovelace, email ada@example.com, company Analytical Engines"
          fields={[
            { name: "name", type: "text", label: "Full name" },
            { name: "email", type: "email", label: "Email" },
            { name: "company", type: "text", label: "Company" },
          ]}
          demo
        />
      ),
    },
  ],
  "ai-search": [
    {
      id: "ai-search-default",
      title: "Semantic search",
      description: "Rank docs corpus items by natural-language relevance.",
      code: `<AiSearch query={query} items={corpus} demo />`,
      preview: (
        <AiSearch
          query="dark mode forms"
          items={[
            { id: "1", title: "Theming", description: "CSS variables and data-theme", tags: ["docs"] },
            { id: "2", title: "Form validation", description: "JSON-driven forms", tags: ["form"] },
          ]}
          demo
        />
      ),
    },
  ],
  "ai-orchestrator": [
    {
      id: "ai-orchestrator-default",
      title: "Multi-tool shell",
      description: "Tabs for each AI tool plus a pipeline that runs all steps.",
      code: `<AiOrchestrator searchItems={corpus} demo />`,
      preview: (
        <AiOrchestrator
          searchItems={[
            { id: "1", title: "DataGrid filters", description: "Server-side pagination", tags: ["data"] },
          ]}
          demo
        />
      ),
    },
  ],
  "context-menu": [
    {
      id: "context-menu-default",
      title: "Right-click menu",
      description: "Replace the browser menu with Copy layout, Add feature, and Questionnaire actions.",
      code: `<ContextMenu>
  <ContextMenu.Trigger>
    <div>Right-click this area</div>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item onSelect={copy}>Copy layout</ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item>Add feature</ContextMenu.Item>
    <ContextMenu.Item>Questionnaire</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu>`,
      preview: (
        <ContextMenu>
          <ContextMenu.Trigger>
            <div
              style={{
                padding: "1.5rem",
                border: "1px dashed var(--asriui-color-border, #d4d4d8)",
                borderRadius: 12,
                minWidth: 220,
              }}
            >
              Right-click this area
            </div>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy layout</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Add feature</ContextMenu.Item>
            <ContextMenu.Item>Questionnaire</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu>
      ),
    },
  ],
  "feature-request": [
    {
      id: "feature-request-default",
      title: "Feature intake",
      description: "Title, category, description, and optional email.",
      code: `<FeatureRequest onSubmit={(values) => console.log(values)} />`,
      preview: <FeatureRequest onSubmit={() => undefined} />,
    },
  ],
  questionnaire: [
    {
      id: "questionnaire-default",
      title: "Stepped questions",
      description: "Text, single-choice, and multiple-choice steps.",
      code: `<Questionnaire questions={DEFAULT_QUESTIONNAIRE} onComplete={save} />`,
      preview: <Questionnaire questions={DEFAULT_QUESTIONNAIRE} />,
    },
  ],
};

function SwitchPreview() {
  const [on, setOn] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Switch id="doc-switch" checked={on} onCheckedChange={setOn} />
      <Label htmlFor="doc-switch">Email notifications</Label>
    </div>
  );
}

function DialogPreview() {
  return (
    <Dialog>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog.Content
        title="Delete project?"
        description="This action cannot be undone."
      >
        <Dialog.Footer>
          <Dialog.Close>Cancel</Dialog.Close>
          <Button variant="danger">Delete</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}

function AiChatPreview() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<string[]>(["How can I help you build today?"]);

  function send(value: string) {
    setMessages((prev) => [...prev, value, "Here’s a starting point — wire this to your model API."]);
    setPrompt("");
  }

  return (
    <div style={{ maxWidth: 420, width: "100%" }}>
      <AiChat label="Assistant demo">
        <AiChat.Messages>
          {messages.map((message, index) => (
            <AiChat.Message key={`${index}-${message}`} messageRole={index % 2 === 0 ? "assistant" : "user"}>
              {message}
            </AiChat.Message>
          ))}
        </AiChat.Messages>
        <AiChat.Suggestions
          suggestions={["Show component docs", "Create a form"]}
          onSelect={setPrompt}
        />
        <AiChat.Prompt value={prompt} onValueChange={setPrompt} onSubmit={send} />
      </AiChat>
    </div>
  );
}

export function getExamples(slug: string): DocExample[] {
  return componentExamples[slug] ?? [];
}
