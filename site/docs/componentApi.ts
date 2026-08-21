export type PropDoc = {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
};

export type PropGroup = {
  title: string;
  props: PropDoc[];
};

export type ComponentApiDoc = {
  slug: string;
  /** One-line summary shown in the page header. */
  summary: string;
  /** Extended description (mirrors interface JSDoc). */
  description: string;
  /** npm subpath import. */
  importPath: string;
  /** Named export(s) to import. */
  exportName: string;
  /** Accessibility notes for the component. */
  accessibility?: string;
  /** Usage code example. */
  usage: string;
  /** Flat prop list (legacy / simple components). */
  props: PropDoc[];
  /** Grouped props for compound components. */
  propGroups?: PropGroup[];
};

/** Shared GTM tracking props for interactive components. */
const analyticsTrackProps: PropDoc[] = [
  {
    name: "track",
    type: "boolean",
    defaultValue: "true",
    description: "Set to false to skip GTM dataLayer push for this instance.",
  },
  {
    name: "trackEvent",
    type: "string",
    description: "Override the default event name (e.g. axiom_button_click).",
  },
  {
    name: "trackLabel",
    type: "string",
    description: "Human-readable label sent with the event payload.",
  },
  {
    name: "trackPayload",
    type: "Record<string, unknown>",
    description: "Extra key/value pairs merged into the dataLayer event.",
  },
];

/** API reference synced with JSDoc in src/components type definition files. */
export const componentApiDocs: ComponentApiDoc[] = [
  {
    slug: "button",
    summary: "Accessible action trigger with variants, loading state, motion, and GTM analytics.",
    description:
      "The Button component extends the native `<button>` element with design-system variants, a loading spinner, and optional Framer Motion interactions. When wrapped in `AxiomProvider` with analytics enabled, click events are automatically pushed to the GTM dataLayer as `axiom_button_click`.",
    importPath: "axiom-ui/button",
    exportName: "Button",
    accessibility:
      "Uses semantic `<button>`. Loading state sets `aria-busy` and `aria-disabled`. Focus ring via `:focus-visible`. Supports keyboard activation (Enter / Space).",
    usage: `import { Button } from "axiom-ui/button";

<Button variant="primary" size="md" onClick={save}>
  Save changes
</Button>`,
    props: [
      { name: "variant", type: "ButtonVariant", defaultValue: '"primary"', description: "Visual style: primary, secondary, outline, ghost, or danger." },
      { name: "size", type: "ButtonSize", defaultValue: '"md"', description: "Size scale: sm (32px), md (40px), lg (48px)." },
      { name: "loading", type: "boolean", defaultValue: "false", description: "Shows spinner, disables clicks, sets aria-busy." },
      { name: "motion", type: "boolean", defaultValue: "true", description: "Spring hover/tap animation. Respects prefers-reduced-motion." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Native disabled attribute." },
      { name: "type", type: '"button" | "submit" | "reset"', defaultValue: '"button"', description: "HTML button type." },
      { name: "children", type: "ReactNode", description: "Button label or content." },
      ...analyticsTrackProps,
    ],
  },
  {
    slug: "link",
    summary: "Accessible anchor with GTM tracking and external-link affordances.",
    description:
      "Link extends the native `<a>` element with design-system variants, automatic external-link detection, and GTM click tracking. When `target=\"_blank\"` or the href is an absolute URL, an external icon is shown and screen readers hear an “opens in new tab” hint.",
    importPath: "axiom-ui/link",
    exportName: "Link",
    accessibility:
      "Uses semantic `<a>`. External links set `rel=\"noopener noreferrer\"`. New-tab links get an accessible name suffix unless `aria-label` is provided.",
    usage: `import { Link } from "axiom-ui/link";

<Link href="/docs">Documentation</Link>

<Link href="https://example.com" target="_blank" trackEvent="outbound_docs">
  External docs
</Link>`,
    props: [
      { name: "href", type: "string", required: true, description: "Destination URL or path." },
      {
        name: "variant",
        type: "LinkVariant",
        defaultValue: '"default"',
        description: "Visual style: default, muted, or button.",
      },
      {
        name: "external",
        type: "boolean",
        description: "Force external treatment. Auto-detected for http(s) URLs and target=_blank.",
      },
      {
        name: "showExternalIcon",
        type: "boolean",
        defaultValue: "true when external",
        description: "Show external-link icon for outbound navigation.",
      },
      { name: "target", type: "string", description: "Standard anchor target (e.g. _blank)." },
      { name: "rel", type: "string", description: "Defaults to noopener noreferrer for new-tab links." },
      { name: "children", type: "ReactNode", description: "Link label or content." },
      ...analyticsTrackProps.map((prop) =>
        prop.name === "trackEvent"
          ? { ...prop, description: "Override the default event name (e.g. axiom_link_click)." }
          : prop,
      ),
    ],
  },
  {
    slug: "breadcrumb",
    summary: "Navigation trail with optional back control and current-page semantics.",
    description:
      "Breadcrumb helps users orient themselves in nested views. Use the declarative `items` API or compound `Breadcrumb.List`, `Breadcrumb.Item`, `Breadcrumb.Separator`, and `Breadcrumb.Back` parts. The back control defaults to browser history when no handler is provided.",
    importPath: "axiom-ui/breadcrumb",
    exportName: "Breadcrumb",
    accessibility:
      "Renders a `nav` landmark with an ordered list. The current page uses `aria-current=\"page\"`. Separators are hidden from assistive technology.",
    usage: `import { Breadcrumb } from "axiom-ui/breadcrumb";

<Breadcrumb
  showBack
  items={[
    { label: "Docs", href: "/docs" },
    { label: "Button", current: true },
  ]}
/>`,
    props: [
      { name: "showBack", type: "boolean", defaultValue: "false", description: "Render a back button before the trail." },
      { name: "backLabel", type: "string", defaultValue: '"Back"', description: "Accessible label for the back control." },
      { name: "onBack", type: "() => void", description: "Back handler. Defaults to history.back()." },
      { name: "backHref", type: "string", description: "Render back control as a link instead of a button." },
      { name: "items", type: "BreadcrumbItemConfig[]", description: "Declarative trail items." },
      {
        name: "separator",
        type: "ReactNode",
        defaultValue: '"/"',
        description: "Separator between crumbs. Pass text (e.g. ›) or a custom icon element.",
      },
    ],
    propGroups: [
      {
        title: "Breadcrumb.Item",
        props: [
          { name: "href", type: "string", description: "Destination for non-current crumbs." },
          { name: "current", type: "boolean", defaultValue: "false", description: "Marks the current page." },
        ],
      },
      {
        title: "Breadcrumb.Separator",
        props: [
          {
            name: "children",
            type: "ReactNode",
            defaultValue: '"/"',
            description: "Custom separator content. Defaults to slash.",
          },
        ],
      },
    ],
  },
  {
    slug: "menu",
    summary: "Dropdown menu with keyboard navigation and grouped items.",
    description:
      "Menu is a compound dropdown for action lists and compact navigation. Combine Menu.Trigger, Menu.Content, Menu.Item, Menu.Group, Menu.Label, and Menu.Separator. Supports controlled open state, placement, and per-slot classNames.",
    importPath: "axiom-ui/menu",
    exportName: "Menu",
    accessibility:
      "Trigger exposes aria-expanded and aria-controls. Content uses role=\"menu\" with menuitem buttons. Arrow keys, Home, End, and Escape are supported.",
    usage: `import { Menu } from "axiom-ui/menu";

<Menu>
  <Menu.Trigger>Options</Menu.Trigger>
  <Menu.Content aria-label="Row actions">
    <Menu.Item onSelect={() => edit()}>Edit</Menu.Item>
    <Menu.Separator />
    <Menu.Item destructive onSelect={() => remove()}>Delete</Menu.Item>
  </Menu.Content>
</Menu>`,
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Initial open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when open state changes." },
      { name: "placement", type: "MenuPlacement", defaultValue: '"bottom-start"', description: "bottom-start | bottom-end | top-start | top-end" },
      { name: "closeOnSelect", type: "boolean", defaultValue: "true", description: "Close after an item is selected." },
      { name: "classNames", type: "MenuClassNames", description: "Per-slot class overrides." },
    ],
    propGroups: [
      {
        title: "Menu.Item",
        props: [
          { name: "onSelect", type: "(event: Event) => void", description: "Called when the item is activated." },
          { name: "destructive", type: "boolean", defaultValue: "false", description: "Destructive styling." },
          { name: "disabled", type: "boolean", defaultValue: "false", description: "Disable the item." },
        ],
      },
    ],
  },
  {
    slug: "tooltip",
    summary: "Contextual label on hover or keyboard focus.",
    description:
      "Tooltip is a compound component for short help text. Combine Tooltip.Trigger and Tooltip.Content with configurable placement, delay, and per-slot classNames.",
    importPath: "axiom-ui/tooltip",
    exportName: "Tooltip",
    accessibility:
      "Trigger sets aria-describedby when open. Content uses role=\"tooltip\". Shows on hover and focus; hides on blur and pointer leave.",
    usage: `import { Tooltip } from "axiom-ui/tooltip";

<Tooltip>
  <Tooltip.Trigger>
    <Button variant="outline">Copy</Button>
  </Tooltip.Trigger>
  <Tooltip.Content placement="top">Copy install command</Tooltip.Content>
</Tooltip>`,
    props: [
      { name: "delayDuration", type: "number", defaultValue: "200", description: "Delay before showing (ms)." },
      { name: "skipDelayDuration", type: "number", defaultValue: "0", description: "Delay before hiding (ms)." },
      { name: "classNames", type: "TooltipClassNames", description: "Per-slot class overrides." },
    ],
    propGroups: [
      {
        title: "Tooltip.Content",
        props: [
          { name: "placement", type: "TooltipPlacement", defaultValue: '"top"', description: "top | bottom | left | right" },
          { name: "sideOffset", type: "number", defaultValue: "8", description: "Gap from the trigger in pixels." },
        ],
      },
    ],
  },
  {
    slug: "dropdown",
    summary: "Select-style dropdown for one or many values.",
    description:
      "Dropdown is a listbox-style control for single or multiple selection. Pass an options array for simple usage, or compose Dropdown.Trigger, Dropdown.Content, and Dropdown.Item for grouped layouts. Set multiple to toggle several options. Enable searchable to type and filter options; long lists scroll inside the panel.",
    importPath: "axiom-ui/dropdown",
    exportName: "Dropdown",
    accessibility:
      "Trigger uses aria-haspopup=\"listbox\" and aria-expanded. Searchable mode uses role=\"combobox\". Items use role=\"option\" with aria-selected. Arrow keys, Home, End, and Escape are supported.",
    usage: `import { Dropdown } from "axiom-ui/dropdown";

<Dropdown
  label="Country"
  searchable
  placeholder="Type to filter countries"
  listMaxHeight="12rem"
  value={country}
  onValueChange={setCountry}
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
  ]}
/>`,
    props: [
      { name: "multiple", type: "boolean", defaultValue: "false", description: "Allow selecting more than one option. value and onValueChange then use string[]." },
      { name: "value", type: "string | string[]", description: "Controlled selected value (string[] when multiple)." },
      { name: "defaultValue", type: "string | string[]", description: "Initial value for uncontrolled usage." },
      { name: "onValueChange", type: "(value: string | string[]) => void", description: "Called when selection changes." },
      { name: "options", type: "DropdownOption[]", description: "Shortcut option list." },
      { name: "placeholder", type: "string", defaultValue: '"Select an option"', description: "Shown when empty." },
      { name: "searchable", type: "boolean", defaultValue: "false", description: "Type in the trigger to filter options." },
      { name: "searchPlaceholder", type: "string", description: "Placeholder for the searchable input." },
      { name: "listMaxHeight", type: "number | string", defaultValue: '"16rem"', description: "Max height of the scrollable options list." },
      { name: "portal", type: "boolean", defaultValue: "true", description: "Render the panel in a portal to avoid clipping." },
      { name: "placement", type: "DropdownPlacement", defaultValue: '"bottom-start"', description: "Panel placement." },
      { name: "size", type: "DropdownSize", defaultValue: '"md"', description: "Trigger height preset: sm for compact toolbars, md for forms." },
      { name: "classNames", type: "DropdownClassNames", description: "Per-slot class overrides." },
    ],
  },
  {
    slug: "date-picker",
    summary: "Typeable date, datetime, and range picker.",
    description:
      "DatePicker combines a text input with a calendar popover. Supports single dates, date ranges, datetime precision, disablePast, min/max constraints, and typed input in ISO, US, or EU formats.",
    importPath: "axiom-ui/date-picker",
    exportName: "DatePicker",
    accessibility:
      "Input is labeled and exposes aria-invalid on validation errors. Calendar days are keyboard-focusable buttons with disabled states for blocked dates.",
    usage: `import { DatePicker } from "axiom-ui/date-picker";

<DatePicker
  label="Travel dates"
  mode="range"
  disablePast
  dateFormat="us"
  rangeValue={range}
  onRangeValueChange={setRange}
/>`,
    props: [
      { name: "mode", type: '"single" | "range"', defaultValue: '"single"', description: "Single date or range selection." },
      { name: "precision", type: '"date" | "datetime"', defaultValue: '"date"', description: "Date-only or date + time." },
      { name: "value", type: "Date | null", description: "Controlled single value." },
      { name: "rangeValue", type: "DatePickerRangeValue", description: "Controlled range value." },
      { name: "disablePast", type: "boolean", defaultValue: "false", description: "Block dates before today." },
      { name: "minDate", type: "Date", description: "Earliest selectable date." },
      { name: "maxDate", type: "Date", description: "Latest selectable date." },
      { name: "dateFormat", type: '"iso" | "us" | "eu"', defaultValue: '"us"', description: "Typed/display format." },
      { name: "allowTyping", type: "boolean", defaultValue: "true", description: "Allow direct text entry." },
      { name: "classNames", type: "DatePickerClassNames", description: "Per-slot class overrides." },
    ],
  },
  {
    slug: "input",
    summary: "Labeled text field with helper/error messaging and full ARIA wiring.",
    description:
      "Input wraps a native `<input>` with an optional label, helper text, error message, and prefix/suffix affixes. IDs and ARIA relationships (`aria-describedby`, `aria-invalid`, `aria-required`) are wired automatically via `useAxiomId`.",
    importPath: "axiom-ui/input",
    exportName: "Input",
    accessibility:
      "Label linked via `htmlFor`. Error text replaces helper and sets `aria-invalid`. Required fields show asterisk and `aria-required`.",
    usage: `import { Input } from "axiom-ui/input";

<Input
  label="Email"
  type="email"
  required
  helperText="We'll never share your email."
  error={errors.email}
/>`,
    props: [
      { name: "label", type: "ReactNode", description: "Visible label above the input." },
      { name: "helperText", type: "ReactNode", description: "Assistive text below input (hidden when error is set)." },
      { name: "error", type: "ReactNode", description: "Validation error message. Sets aria-invalid." },
      { name: "prefix", type: "ReactNode", description: "Leading affix inside the control border." },
      { name: "suffix", type: "ReactNode", description: "Trailing affix inside the control border." },
      { name: "required", type: "boolean", defaultValue: "false", description: "Shows asterisk and sets aria-required." },
      { name: "motion", type: "boolean", defaultValue: "true", description: "Fade-up entrance animation on mount." },
      { name: "…native", type: "InputHTMLAttributes", description: "All standard input attributes (type, placeholder, onChange, etc.)." },
    ],
  },
  {
    slug: "card",
    summary: "Compound layout surface with Header, Title, Content, and Footer.",
    description:
      "Card is a compound component for grouping related content. Use `Card.Header` + `Card.Title` for the heading area, `Card.Content` for the body, and `Card.Footer` for actions. Supports optional entrance and hover elevation motion.",
    importPath: "axiom-ui/card",
    exportName: "Card",
    accessibility: "Card.Title renders a semantic heading (h1–h6 via `as` prop) for document outline.",
    usage: `import { Card } from "axiom-ui/card";

<Card>
  <Card.Header>
    <Card.Title>Billing</Card.Title>
  </Card.Header>
  <Card.Content>Manage your subscription.</Card.Content>
  <Card.Footer>
    <Button>Upgrade</Button>
  </Card.Footer>
</Card>`,
    props: [],
    propGroups: [
      {
        title: "Card",
        props: [
          { name: "motion", type: "boolean", defaultValue: "true", description: "Scale-in entrance and hover elevation." },
          { name: "className", type: "string", description: "Additional CSS class on the root div." },
        ],
      },
      {
        title: "Card.Title",
        props: [
          { name: "as", type: '"h1"–"h6"', defaultValue: '"h2"', description: "Heading level for accessibility." },
          { name: "children", type: "ReactNode", description: "Title text." },
        ],
      },
      {
        title: "Card.Header / Card.Content / Card.Footer",
        props: [
          { name: "children", type: "ReactNode", description: "Slot content for each section." },
        ],
      },
    ],
  },
  {
    slug: "widget",
    summary: "Drop-in embed for partner pages, ad scripts, and third-party widgets.",
    description:
      "Widget is an isolated embed surface. Pass `src` for iframe/webview content, `html` for sandboxed inline markup, or `scriptSrc` for ad tags and vendor loaders. Use `mountWidget` when you need a vanilla JS snippet without React.",
    importPath: "axiom-ui/widget",
    exportName: "Widget, mountWidget",
    accessibility:
      "Iframe embeds require a descriptive `title`. Script mode renders a mount node with optional `slotId` and `data-*` attributes for third-party loaders.",
    usage: `import { Widget, mountWidget } from "axiom-ui/widget";

<Widget
  src="https://partner.example/widget"
  title="Partner widget"
  height={320}
/>

<Widget
  mode="script"
  scriptSrc="https://cdn.vendor.com/ads.js"
  slotId="ad-slot-1"
  attrs={{ "data-ad-client": "ca-pub-xxx" }}
  height={90}
/>

mountWidget("widget-host", {
  scriptSrc: "https://cdn.vendor.com/widget.js",
  slotId: "cms-slot",
  height: 280,
});`,
    props: [],
    propGroups: [
      {
        title: "Widget",
        props: [
          { name: "mode", type: '"iframe" | "script" | "auto"', defaultValue: '"auto"', description: "Embed strategy. Auto picks script when `scriptSrc` is set." },
          { name: "src", type: "string", description: "Iframe URL for partner pages and hosted widgets." },
          { name: "scriptSrc", type: "string", description: "External script URL for ads, chat widgets, and vendor loaders." },
          { name: "html", type: "string", description: "Inline HTML rendered in a sandboxed iframe via `srcDoc`." },
          { name: "slotId", type: "string", description: "Mount node id passed to third-party scripts." },
          { name: "attrs", type: "Record<string, string>", description: "Extra `data-*` attributes on the script mount node." },
          { name: "sandbox", type: "string", defaultValue: '"allow-scripts allow-same-origin allow-popups allow-forms"', description: "Iframe sandbox token list." },
          { name: "height / width", type: "number | string", description: "Fixed embed dimensions." },
          { name: "onLoad / onError", type: "function", description: "Lifecycle callbacks for iframe or script load." },
        ],
      },
      {
        title: "mountWidget(host, options)",
        props: [
          { name: "host", type: "HTMLElement | string", description: "Mount target element or id." },
          { name: "options", type: "WidgetMountOptions", description: "Same embed options as the React component." },
        ],
      },
    ],
  },
  {
    slug: "metric",
    summary: "Trading metric tiles for quotes, portfolio stats, and market summaries.",
    description:
      "Metric is a compound surface for trading dashboards. Use `variant=\"quote\"` for hero price tiles, `compact` for ticker rows, and the default tile for volume, high/low, and P&L cards. Directional coloring comes from `trend` or signed `Metric.Change` values.",
    importPath: "axiom-ui/metric",
    exportName: "Metric",
    accessibility:
      "Values use tabular numerals for stable layout. Pair live quotes with `live` on the root and `Metric.Symbol` for a visual streaming indicator.",
    usage: `import { Metric } from "axiom-ui/metric";

<Metric variant="quote" trend="up" live>
  <Metric.Symbol>BTC/USD</Metric.Symbol>
  <Metric.Value value={68420.5} format="currency" />
  <Metric.Change value={3.54} />
  <Metric.Hint>24h high $69,120 · low $66,480</Metric.Hint>
</Metric>

<Metric variant="compact" trend="down">
  <Metric.Label>Unrealized P&L</Metric.Label>
  <div>
    <Metric.Value value={-1240.8} format="currency" />
    <Metric.Change value={-2.18} />
  </div>
</Metric>`,
    props: [],
    propGroups: [
      {
        title: "Metric",
        props: [
          { name: "variant", type: '"tile" | "compact" | "quote"', defaultValue: '"tile"', description: "Layout preset for dashboard tiles, ticker rows, or hero quotes." },
          { name: "trend", type: '"up" | "down" | "neutral"', description: "Directional color for value and change slots." },
          { name: "live", type: "boolean", defaultValue: "false", description: "Shows a pulsing indicator beside `Metric.Symbol`." },
          { name: "motion", type: "boolean", defaultValue: "true", description: "Fade-up entrance animation." },
        ],
      },
      {
        title: "Metric.Value / Metric.Change",
        props: [
          { name: "value", type: "number", description: "Numeric value formatted with `format`, `currency`, and `locale`." },
          { name: "format", type: '"number" | "currency" | "percent" | "compact"', description: "Formatting preset for trading numbers." },
          { name: "showSign", type: "boolean", defaultValue: "true", description: "Prefix positive changes with + on `Metric.Change`." },
        ],
      },
      {
        title: "Metric.Symbol / Metric.Label / Metric.Hint",
        props: [
          { name: "children", type: "ReactNode", description: "Ticker symbol, metric label, or supporting hint text." },
        ],
      },
    ],
  },
  {
    slug: "separator",
    summary: "Horizontal or vertical divider.",
    description: "Separator divides sections, menus, and toolbars.",
    importPath: "axiom-ui/separator",
    exportName: "Separator",
    usage: `import { Separator } from "axiom-ui/separator";\n\n<Separator />\n<Separator orientation="vertical" />`,
    props: [{ name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Divider direction." }, { name: "className", type: "string", description: "Custom class name for the separator element." }],
  },
  {
    slug: "callout",
    summary: "Highlighted notice for info, success, warning, and danger.",
    description: "Callout draws attention to important messages.",
    importPath: "axiom-ui/callout",
    exportName: "Callout",
    usage: `import { Callout } from "axiom-ui/callout";\n\n<Callout variant="warning" title="Heads up">Market data may be delayed.</Callout>`,
    props: [{ name: "variant", type: "CalloutVariant", defaultValue: '"info"', description: "info | success | warning | danger" }, { name: "className", type: "string", description: "Custom class name for the callout root." }],
  },
  {
    slug: "quote",
    summary: "Styled blockquote for testimonials and citations.",
    description: "Quote renders semantic blockquote content with optional footer attribution.",
    importPath: "axiom-ui/quote",
    exportName: "Quote",
    usage: `import { Quote } from "axiom-ui/quote";\n\n<Quote footer="— Ada Lovelace">That brain of mine is something more than merely mortal.</Quote>`,
    props: [{ name: "variant", type: '"default" | "large"', defaultValue: '"default"', description: "Typography scale." }, { name: "className", type: "string", description: "Custom class name for the quote root." }],
  },
  {
    slug: "text-to-speech",
    summary: "Inline text with a speak-aloud control.",
    description:
      "TextToSpeech wraps content with a speaker button. Clicking it reads the wrapped text (or an explicit `text` prop) using the browser Speech Synthesis API.",
    importPath: "axiom-ui/text-to-speech",
    exportName: "TextToSpeech",
    usage: `import { TextToSpeech } from "axiom-ui/text-to-speech";

<TextToSpeech lang="en-US">
  Market data may be delayed during volatile sessions.
</TextToSpeech>`,
    props: [
      { name: "text", type: "string", description: "Text to speak. Defaults to plain text from children." },
      { name: "lang", type: "string", defaultValue: '"en-US"', description: "BCP 47 language for speech synthesis." },
      { name: "voiceURI", type: "string", description: "Explicit voice URI from speechSynthesis.getVoices()." },
      { name: "rate", type: "number", defaultValue: "1", description: "Speech rate." },
      { name: "pitch", type: "number", defaultValue: "1", description: "Speech pitch." },
      { name: "iconPosition", type: '"start" | "end"', defaultValue: '"end"', description: "Speaker button placement." },
      { name: "speakLabel", type: "string", defaultValue: '"Listen to this text"', description: "Accessible label for the button." },
      { name: "className", type: "string", description: "Custom class name for the wrapper." },
    ],
  },
  {
    slug: "checkbox",
    summary: "Accessible checkbox with label and description.",
    description: "Checkbox supports controlled and uncontrolled modes plus indeterminate state.",
    importPath: "axiom-ui/checkbox",
    exportName: "Checkbox",
    usage: `import { Checkbox } from "axiom-ui/checkbox";\n\n<Checkbox label="Email alerts" description="Daily summary at 9am" defaultChecked />`,
    props: [{ name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when toggled." }, { name: "className", type: "string", description: "Custom class name for the checkbox label wrapper." }],
  },
  {
    slug: "radio",
    summary: "Accessible radio input with group support.",
    description: "Use `Radio.Group` for single-select fields.",
    importPath: "axiom-ui/radio",
    exportName: "Radio, RadioGroup",
    usage: `import { Radio, RadioGroup } from "axiom-ui/radio";\n\n<Radio.Group defaultValue="pro">\n  <Radio value="starter" label="Starter" />\n  <Radio value="pro" label="Pro" />\n</Radio.Group>`,
    props: [{ name: "value", type: "string", required: true, description: "Option value within the group." }, { name: "className", type: "string", description: "Custom class name for the radio label or group container." }],
  },
  {
    slug: "checkbox-card",
    summary: "Selectable card for multi-select choices.",
    description: "CheckboxCard is ideal for feature toggles, add-ons, and filters.",
    importPath: "axiom-ui/checkbox-card",
    exportName: "CheckboxCard",
    usage: `import { CheckboxCard } from "axiom-ui/checkbox-card";\n\n<CheckboxCard title="Priority support" description="24/7 chat" defaultChecked />`,
    props: [{ name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when selected." }, { name: "className", type: "string", description: "Custom class name for the card root." }],
  },
  {
    slug: "radio-card",
    summary: "Selectable card for single-choice settings.",
    description: "RadioCard.Group wraps pricing tiers, shipping methods, and plan pickers.",
    importPath: "axiom-ui/radio-card",
    exportName: "RadioCard, RadioCardGroup",
    usage: `import { RadioCard, RadioCardGroup } from "axiom-ui/radio-card";\n\n<RadioCard.Group defaultValue="standard">\n  <RadioCard value="standard" title="Standard" description="5–7 days" />\n  <RadioCard value="express" title="Express" description="2 days" />\n</RadioCard.Group>`,
    props: [{ name: "value", type: "string", required: true, description: "Option value within the group." }, { name: "className", type: "string", description: "Custom class name for the card or group container." }],
  },
  {
    slug: "reset",
    summary: "Scoped reset for configurable component previews.",
    description: "Reset stores default values and restores them via `Reset.Trigger` or `useReset()`.",
    importPath: "axiom-ui/reset",
    exportName: "Reset, useReset",
    usage: `import { Reset } from "axiom-ui/reset";\n\n<Reset.Root defaults={{ size: "md" }}>\n  {({ values, setValue }) => (\n    <>\n      <Button size={values.size}>Preview</Button>\n      <Reset.Trigger />\n    </>\n  )}\n</Reset.Root>`,
    props: [
      { name: "className", type: "string", description: "Custom class name for the reset scope wrapper." },
      { name: "defaults", type: "Record<string, unknown>", required: true, description: "Baseline values restored on reset." },
    ],
  },
  {
    slug: "visible",
    summary: "Conditional show/hide primitives.",
    description: "Visible and Hidden toggle content with optional animation.",
    importPath: "axiom-ui/visible",
    exportName: "Visible, Hidden",
    usage: `import { Visible, Hidden } from "axiom-ui/visible";\n\n<Visible when={open}>Panel content</Visible>\n<Hidden when={!open}>Legacy block</Hidden>`,
    props: [{ name: "when", type: "boolean", required: true, description: "Visibility condition." }],
  },
  {
    slug: "list-item",
    summary: "Semantic list rows with media, descriptions, and interactive selection.",
    description:
      "ListItem renders a single row inside a List container. Supports leading media, trailing metadata, selected/disabled states, and an interactive button mode for navigation-style rows.",
    importPath: "axiom-ui/list-item",
    exportName: "List, ListItem",
    accessibility:
      "Interactive rows render as `<button>` inside `<li>`. Use `aria-label` on List for screen reader context. Selected state is visual; add aria-current if needed.",
    usage: `import { List, ListItem } from "axiom-ui/list-item";

<List aria-label="Settings">
  <ListItem
    title="General"
    description="Timezone, language"
    media="G"
    trailing="›"
    interactive
    selected
    onClick={openGeneral}
  />
</List>`,
    props: [],
    propGroups: [
      {
        title: "List",
        props: [
          { name: "unstyled", type: "boolean", defaultValue: "true", description: "Removes default list bullets and padding." },
          { name: "motion", type: "boolean", defaultValue: "true", description: "Staggers child row entrance animations." },
          { name: "aria-label", type: "string", required: true, description: "Accessible name for the list (recommended)." },
        ],
      },
      {
        title: "ListItem",
        props: [
          { name: "title", type: "ReactNode", required: true, description: "Primary row label." },
          { name: "description", type: "ReactNode", description: "Secondary text below the title." },
          { name: "media", type: "ReactNode", description: "Leading icon, avatar, or media slot." },
          { name: "trailing", type: "ReactNode", description: "Trailing badge, chevron, or metadata." },
          { name: "interactive", type: "boolean", defaultValue: "false", description: "Renders row as a focusable button." },
          { name: "selected", type: "boolean", defaultValue: "false", description: "Selected background highlight." },
          { name: "disabled", type: "boolean", defaultValue: "false", description: "Dims row and prevents interaction." },
          { name: "motion", type: "boolean", defaultValue: "true", description: "Press/hover animation on interactive rows." },
          { name: "onClick", type: "MouseEventHandler", description: "Click handler when interactive is true." },
        ],
      },
    ],
  },
  {
    slug: "badge",
    summary: "Compact inline status label for counts, tags, and states.",
    description: "Badge renders an inline `<span>` chip. Use for status indicators, version tags, or count labels. Four variants cover default emphasis through destructive alerts.",
    importPath: "axiom-ui/badge",
    exportName: "Badge",
    usage: `import { Badge } from "axiom-ui/badge";

<Badge variant="secondary">Processing</Badge>
<Badge variant="destructive">Failed</Badge>`,
    props: [
      { name: "variant", type: "BadgeVariant", defaultValue: '"default"', description: "default | secondary | outline | destructive" },
      { name: "children", type: "ReactNode", description: "Badge text content." },
    ],
  },
  {
    slug: "label",
    summary: "Accessible form label with optional required indicator.",
    description: "Label renders a native `<label>` element. Pair with Input, Switch, or any control via matching `htmlFor` / `id` attributes.",
    importPath: "axiom-ui/label",
    exportName: "Label",
    accessibility: "Uses semantic `<label>`. Required asterisk is `aria-hidden` (actual required state lives on the control).",
    usage: `import { Label } from "axiom-ui/label";

<Label htmlFor="email" required>Email address</Label>
<Input id="email" type="email" />`,
    props: [
      { name: "htmlFor", type: "string", description: "ID of the associated form control." },
      { name: "required", type: "boolean", defaultValue: "false", description: "Shows red asterisk after label text." },
      { name: "children", type: "ReactNode", description: "Label text." },
    ],
  },
  {
    slug: "switch",
    summary: "Toggle control with WAI-ARIA switch semantics.",
    description: "Switch implements the `role=\"switch\"` pattern with `aria-checked`. Supports controlled (`checked` + `onCheckedChange`) and uncontrolled (`defaultChecked`) modes.",
    importPath: "axiom-ui/switch",
    exportName: "Switch",
    accessibility: "Uses role=switch and aria-checked. Pair with Label via htmlFor/id or aria-labelledby.",
    usage: `import { Switch } from "axiom-ui/switch";

const [on, setOn] = useState(false);
<Switch id="alerts" checked={on} onCheckedChange={setOn} aria-label="Email alerts" />`,
    props: [
      { name: "checked", type: "boolean", description: "Controlled checked state." },
      { name: "defaultChecked", type: "boolean", defaultValue: "false", description: "Initial state for uncontrolled usage." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when user toggles." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Prevents toggling." },
    ],
  },
  {
    slug: "tabs",
    summary: "Compound tabbed panels with animated transitions and style variants.",
    description:
      "Tabs manages active panel state and wires ARIA relationships between triggers and panels. Supports controlled (`value`) and uncontrolled (`defaultValue`) modes, smooth panel transitions, and visual variants including underline (bottom line), pills, and ghost.",
    importPath: "axiom-ui/tabs",
    exportName: "Tabs",
    accessibility:
      "Tabs.List → role=tablist. Tabs.Trigger → role=tab with aria-selected, aria-controls, tabIndex roving. Tabs.Content → role=tabpanel with aria-labelledby.",
    usage: `import { Tabs } from "axiom-ui/tabs";

<Tabs defaultValue="account" variant="underline" animated>
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account settings</Tabs.Content>
  <Tabs.Content value="password">Password settings</Tabs.Content>
</Tabs>`,
    props: [],
    propGroups: [
      {
        title: "Tabs",
        props: [
          { name: "value", type: "string", description: "Controlled active tab value." },
          { name: "defaultValue", type: "string", description: "Initial tab for uncontrolled mode." },
          { name: "onValueChange", type: "(value: string) => void", description: "Called when tab changes." },
          {
            name: "variant",
            type: '"default" | "underline" | "pills" | "ghost"',
            defaultValue: '"default"',
            description: "Default tab list style. Override per list with Tabs.List variant.",
          },
          {
            name: "animated",
            type: "boolean",
            defaultValue: "true",
            description: "Animate panel transitions when switching tabs.",
          },
        ],
      },
      {
        title: "Tabs.List",
        props: [
          {
            name: "variant",
            type: '"default" | "underline" | "pills" | "ghost"',
            description: "Visual style for this tab list. Overrides root Tabs variant.",
          },
        ],
      },
      {
        title: "Tabs.Trigger",
        props: [
          { name: "value", type: "string", required: true, description: "Unique tab identifier matching Tabs.Content." },
          { name: "disabled", type: "boolean", defaultValue: "false", description: "Prevents tab selection." },
        ],
      },
      {
        title: "Tabs.Content",
        props: [
          { name: "value", type: "string", required: true, description: "Tab value this panel belongs to." },
        ],
      },
    ],
  },
  {
    slug: "accordion",
    summary: "Expandable sections with side content slots and animated panels.",
    description:
      "Accordion reuses the same grid-collapse animation pattern as SideNav groups. Supports single or multiple open sections, leading/trailing trigger content, and default, bordered, and ghost variants.",
    importPath: "axiom-ui/accordion",
    exportName: "Accordion",
    accessibility:
      "Trigger buttons expose aria-expanded and aria-controls. Content regions use role=region with aria-labelledby. Closed panels are inert.",
    usage: `import { Accordion } from "axiom-ui/accordion";
import { Icon } from "axiom-ui/icon";

<Accordion type="single" collapsible defaultValue="faq-1" variant="bordered">
  <Accordion.Item value="faq-1">
    <Accordion.Trigger icon={<Icon name="sparkles" size="sm" />} endContent="New">
      What is Axiom UI?
    </Accordion.Trigger>
    <Accordion.Content>
      A design system and React component library for product teams.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`,
    props: [],
    propGroups: [
      {
        title: "Accordion",
        props: [
          { name: "type", type: '"single" | "multiple"', defaultValue: '"single"', description: "Whether one or many sections can be open." },
          { name: "collapsible", type: "boolean", defaultValue: "false", description: "Allow closing all sections when type is single." },
          { name: "value", type: "string | string[]", description: "Controlled open value(s)." },
          { name: "defaultValue", type: "string | string[]", description: "Initial open value(s) for uncontrolled mode." },
          { name: "onValueChange", type: "(value: string | string[]) => void", description: "Called when open sections change." },
          { name: "variant", type: '"default" | "bordered" | "ghost"', defaultValue: '"default"', description: "Visual style for items." },
          { name: "disabled", type: "boolean", defaultValue: "false", description: "Disable every item." },
        ],
      },
      {
        title: "Accordion.Item",
        props: [
          { name: "value", type: "string", required: true, description: "Unique section identifier." },
          { name: "disabled", type: "boolean", defaultValue: "false", description: "Disable this section's trigger." },
        ],
      },
      {
        title: "Accordion.Trigger",
        props: [
          { name: "icon", type: "ReactNode", description: "Leading icon shorthand (same as startContent)." },
          { name: "startContent", type: "ReactNode", description: "Content before the label (icons, avatars)." },
          { name: "endContent", type: "ReactNode", description: "Content after the label, before the chevron (badges, meta)." },
          { name: "hideIndicator", type: "boolean", defaultValue: "false", description: "Hide the default chevron." },
        ],
      },
    ],
  },
  {
    slug: "dialog",
    summary: "Modal dialog with React portal, focus trap, escape dismiss, and compound layout.",
    description:
      "Dialog portals content to document.body (or a custom container). Overlay click and Escape close the dialog. Use shorthand title/description on Content, or compose with Header, Title, Description, Footer, and Close slots.",
    importPath: "axiom-ui/dialog",
    exportName: "Dialog",
    accessibility:
      "role=dialog, aria-modal=true. Title linked via aria-labelledby, description via aria-describedby. Body scroll locked while open. Focus trapped inside the dialog and returned to the trigger on close.",
    usage: `import { Dialog } from "axiom-ui/dialog";

<Dialog>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content
    title="Confirm"
    description="This cannot be undone."
  >
    <Dialog.Footer>
      <Dialog.Close>Cancel</Dialog.Close>
      <Button variant="danger">Delete</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>`,
    props: [],
    propGroups: [
      {
        title: "Dialog",
        props: [
          { name: "open", type: "boolean", description: "Controlled open state." },
          { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Initial open for uncontrolled mode." },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Open state change callback." },
        ],
      },
      {
        title: "Dialog.Trigger / Dialog.Close",
        props: [
          { name: "children", type: "ReactNode", description: "Button label. Close defaults to × icon when empty." },
          { name: "variant", type: '"icon" | "button"', description: "Close button style. Auto-detected from children." },
        ],
      },
      {
        title: "Dialog.Content",
        props: [
          { name: "title", type: "ReactNode", description: "Shorthand title rendered in a header." },
          { name: "description", type: "ReactNode", description: "Shorthand description under the title." },
          { name: "showClose", type: "boolean", description: "Top-right close icon. Defaults to true when title is set." },
          { name: "portal", type: "boolean", defaultValue: "true", description: "Portal to document.body." },
          { name: "container", type: "HTMLElement", description: "Custom portal container." },
          { name: "closeOnEscape", type: "boolean", defaultValue: "true", description: "Close when Escape is pressed." },
          { name: "closeOnOverlayClick", type: "boolean", defaultValue: "true", description: "Close when overlay is clicked." },
        ],
      },
      {
        title: "Dialog.Title / Dialog.Description",
        props: [
          { name: "children", type: "ReactNode", description: "Heading or body text linked to dialog ARIA." },
        ],
      },
    ],
  },
  {
    slug: "toast",
    summary: "Animated toast notifications with imperative API and config-driven showcase.",
    description:
      "Toast provides a stacked notification viewport with Framer Motion enter/exit, swipe-to-dismiss, auto-dismiss progress bar, and variants for success, error, warning, and info — each with distinct accent color, tinted background, and icon. Override variant appearance globally on ToastProvider or per toast. Use ToastShowcase to build a demo page from a configuration array.",
    importPath: "axiom-ui/toast",
    exportName: "ToastProvider",
    usage: `import { ToastProvider, ToastShowcase, toast } from "axiom-ui/toast";
import "axiom-ui/style.css";

<ToastProvider
  position="bottom-right"
  showProgress
  variants={{
    success: { accent: "#10b981", background: "#ecfdf5" },
  }}
>
  <App />
</ToastProvider>

toast.success("Saved", { description: "Your changes were published." });

// Config-driven demo page
<ToastShowcase
  title="Notifications"
  items={[
    { label: "Success", toast: { variant: "success", title: "Saved" } },
    { label: "Error", toast: { variant: "error", title: "Failed" } },
  ]}
/>`,
    props: [
      { name: "position", type: "ToastPosition", defaultValue: '"bottom-right"', description: "Viewport corner for the toast stack." },
      { name: "duration", type: "number", defaultValue: "5000", description: "Default auto-dismiss duration in ms." },
      { name: "limit", type: "number", defaultValue: "5", description: "Maximum visible toasts." },
      { name: "showProgress", type: "boolean", defaultValue: "true", description: "Show bottom progress bar while auto-dismissing." },
      { name: "variants", type: "ToastVariantsConfig", description: "Override accent, background, and icon per variant." },
    ],
  },
  {
    slug: "auth",
    summary: "Login form with Microsoft, Google, GitHub, and Apple OAuth buttons.",
    description:
      "Auth components help you ship sign-in pages quickly. LoginForm combines email/password fields with branded OAuth buttons. Wire onOAuth to your identity provider — Microsoft Entra ID, Google OAuth, GitHub Apps, or Sign in with Apple.",
    importPath: "axiom-ui/auth",
    exportName: "LoginForm",
    usage: `import { LoginForm } from "axiom-ui/auth";

<LoginForm
  onSubmit={({ email, password }) => signIn(email, password)}
  onOAuth={(provider) => redirectToProvider(provider)}
  providers={["microsoft", "google", "github", "apple"]}
/>`,
    props: [
      { name: "onSubmit", type: "(credentials) => void", description: "Email/password submit handler." },
      { name: "onOAuth", type: "(provider: OAuthProvider) => void", description: "Social login click handler." },
      { name: "providers", type: "OAuthProvider[]", description: "Enabled OAuth providers." },
      { name: "loading", type: "boolean", defaultValue: "false", description: "Disables form while authenticating." },
    ],
  },
  {
    slug: "calendar",
    summary: "Booking calendar with multi-slot selection per day.",
    description:
      "Calendar renders a month grid with a slot picker panel. Users can focus a day and select multiple time slots, across multiple days, with support for booked/unavailable slots, per-day slot overrides, min/max dates, and selection limits.",
    importPath: "axiom-ui/calendar",
    exportName: "Calendar",
    usage: `import { useState } from "react";
import { Calendar, type CalendarSlotSelection } from "axiom-ui/calendar";

export function BookingCalendar() {
  const [selection, setSelection] = useState<CalendarSlotSelection[]>([]);

  return (
    <Calendar
      value={selection}
      onValueChange={setSelection}
      booked={[{ date: "2026-08-12", slotId: "09:00" }]}
      maxSelections={5}
      daySlots={{
        "2026-08-15": [
          { id: "10:00", label: "10:00 AM", start: "10:00", end: "11:00" },
        ],
      }}
    />
  );
}`,
    props: [
      { name: "value / defaultValue", type: "CalendarSlotSelection[]", description: "Selected date+slot pairs." },
      { name: "onValueChange", type: "(selection) => void", description: "Selection change callback." },
      { name: "slots", type: "CalendarTimeSlot[]", description: "Default time slots for each day." },
      { name: "daySlots", type: "Record<string, CalendarTimeSlot[]>", description: "Per-day slot overrides (YYYY-MM-DD)." },
      { name: "booked", type: "CalendarSlotSelection[]", description: "Unavailable slots already taken." },
      { name: "maxSelections", type: "number", description: "Maximum total slots the user can book." },
      { name: "minDate / maxDate", type: "Date", description: "Selectable date range." },
      { name: "weekStartsOn", type: "0 | 1", defaultValue: "0", description: "Sunday or Monday week start." },
    ],
  },
  {
    slug: "virtual-list",
    summary: "High-performance virtualized list with fixed row height and SSR support.",
    description:
      "VirtualList only mounts DOM nodes for visible rows plus an overscan buffer. Ideal for transaction feeds, log viewers, and large selectable lists. SSR renders `ssrCount` items without scroll measurement.",
    importPath: "axiom-ui/virtual-list",
    exportName: "VirtualList",
    accessibility: "Root has role=list, each row has role=listitem. Provide meaningful renderItem text for screen readers.",
    usage: `import { VirtualList } from "axiom-ui/virtual-list";

<VirtualList
  items={rows}
  itemHeight={44}
  height={400}
  overscan={6}
  getItemKey={(row) => row.id}
  renderItem={(row) => row.label}
/>`,
    props: [
      { name: "items", type: "T[]", required: true, description: "Full data array." },
      { name: "itemHeight", type: "number", required: true, description: "Fixed row height in pixels." },
      { name: "height", type: "number", required: true, description: "Viewport height in pixels." },
      { name: "overscan", type: "number", defaultValue: "4", description: "Extra rows rendered above/below viewport." },
      { name: "renderItem", type: "(item: T, index: number) => ReactNode", required: true, description: "Row renderer function." },
      { name: "getItemKey", type: "(item: T, index: number) => string | number", description: "Stable React key extractor." },
      { name: "ssrCount", type: "number", defaultValue: "10", description: "Rows rendered during SSR." },
      { name: "listStyle", type: "CSSProperties", description: "Inline styles on inner list container." },
    ],
  },
  {
    slug: "form",
    summary: "JSON-configured form with built-in validation — no Formik required.",
    description:
      "Form renders fields from a JSON config object. Supports text, email, password, textarea, select, and switch field types with required, regex pattern, min/max length, numeric bounds, cross-field match/notEqual, uniqueAmong, oneOf/notOneOf rules, and programmatic validate functions. Ideal for CMS-driven or runtime-generated forms.",
    importPath: "axiom-ui/form",
    exportName: "Form",
    accessibility: "Each field gets a Label, error messages use role=alert, invalid fields set aria-invalid on inputs.",
    usage: `import { Form } from "axiom-ui/form";

const config = {
  submitLabel: "Sign up",
  fields: [
    { name: "email", type: "email", label: "Email", required: true },
    { name: "plan", type: "select", label: "Plan", required: true, options: [
      { label: "Free", value: "free" },
      { label: "Pro", value: "pro" },
    ]},
    { name: "terms", type: "switch", label: "Accept terms", required: true },
  ],
};

<Form config={config} onSubmit={(values) => console.log(values)} />`,
    props: [],
    propGroups: [
      {
        title: "Form",
        props: [
          { name: "config", type: "FormConfig", required: true, description: "JSON field definitions and submit label." },
          { name: "initialValues", type: "FormValues", description: "Override field default values." },
          { name: "onSubmit", type: "(values: FormValues) => void | Promise<void>", description: "Called after validation passes." },
          { name: "loading", type: "boolean", defaultValue: "false", description: "Submit button loading state." },
          {
            name: "validateOn",
            type: "FormValidateOn",
            defaultValue: '"blur"',
            description: "Re-validate touched fields on blur or change after the first submit.",
          },
        ],
      },
      {
        title: "FormFieldConfig",
        props: [
          { name: "name", type: "string", required: true, description: "Unique field key." },
          { name: "type", type: "FormFieldType", required: true, description: "text | email | password | textarea | switch | select" },
          { name: "label", type: "string", required: true, description: "Visible field label." },
          { name: "required", type: "boolean", defaultValue: "false", description: "Validation: must have value." },
          { name: "minLength", type: "number", description: "Minimum string length." },
          { name: "maxLength", type: "number", description: "Maximum string length." },
          { name: "min", type: "number", description: "Minimum numeric value." },
          { name: "max", type: "number", description: "Maximum numeric value." },
          { name: "pattern", type: "string", description: "Regex pattern for custom validation." },
          { name: "patternFlags", type: "string", description: "Regex flags, e.g. i for case-insensitive." },
          { name: "patternMessage", type: "string", description: "Custom regex validation error message." },
          { name: "matches", type: "string", description: "Field name this value must match." },
          { name: "notEqual", type: "string", description: "Field name this value must differ from." },
          { name: "uniqueAmong", type: "string[]", description: "Field names that must not share this value." },
          { name: "rules", type: "FormValidationRule[]", description: "Explicit validation rules array." },
          { name: "validate", type: "(value, values) => string | undefined", description: "Programmatic field validator." },
          { name: "options", type: "FormFieldOption[]", description: "Select dropdown options." },
        ],
      },
      {
        title: "FormValidationRule types",
        props: [
          { name: "required", type: '{ type: "required"; message?: string }', description: "Value must be present." },
          { name: "email", type: '{ type: "email"; message?: string }', description: "Valid email format." },
          { name: "url", type: '{ type: "url"; message?: string }', description: "Valid http(s) URL." },
          { name: "pattern", type: '{ type: "pattern"; value: string; flags?: string; message?: string }', description: "Regex validation." },
          { name: "matches", type: '{ type: "matches"; field: string; message?: string }', description: "Must equal another field." },
          { name: "notEqual", type: '{ type: "notEqual"; field: string; message?: string }', description: "Must differ from another field." },
          { name: "oneOf", type: '{ type: "oneOf"; values: string[]; message?: string }', description: "Value must be in the allowed list." },
          { name: "notOneOf", type: '{ type: "notOneOf"; values: string[]; message?: string }', description: "Value must not be in the blocked list." },
          { name: "unique", type: '{ type: "unique"; fields?: string[]; message?: string }', description: "Value must be unique among fields." },
        ],
      },
    ],
  },
  {
    slug: "page",
    summary: "JSON-configured page builder — layout, blocks, and forms from one schema.",
    description:
      "Page renders a full screen from a serializable PageConfig. Choose a PageLayout variant, optional SideNav, header actions, and an ordered list of blocks (typography, form, stats, table, tabs, accordion, timeline, card, grid, markdown, code, and custom slots). Ideal for CMS-driven UIs and admin page builders.",
    importPath: "axiom-ui/page",
    exportName: "Page",
    accessibility:
      "Composes accessible primitives (Form, Tabs, Accordion, Table, SideNav). Provide meaningful header titles and form labels in your JSON.",
    usage: `import { Page } from "axiom-ui/page";

const config = {
  layout: { variant: "centered", contentMaxWidth: "36rem" },
  header: { title: "Contact", description: "We reply within a day." },
  blocks: [
    {
      id: "contact",
      type: "form",
      config: {
        submitLabel: "Send",
        fields: [
          { name: "email", type: "email", label: "Email", required: true },
          { name: "message", type: "textarea", label: "Message", required: true },
        ],
      },
    },
  ],
};

<Page
  config={config}
  onFormSubmit={(formId, values) => console.log(formId, values)}
/>`,
    props: [],
    propGroups: [
      {
        title: "Page",
        props: [
          { name: "config", type: "PageConfig", required: true, description: "Serializable page schema (layout, sidebar, header, blocks)." },
          { name: "onAction", type: "(event: PageActionEvent) => void", description: "Fires for header/action buttons and sidebar nav clicks." },
          { name: "onFormSubmit", type: "(formId: string, values: FormValues) => void | Promise<void>", description: "Called when a form block validates and submits." },
          { name: "slots", type: "Record<string, ReactNode>", description: "Render map for type: \"custom\" blocks keyed by block id." },
        ],
      },
      {
        title: "PageConfig",
        props: [
          { name: "layout", type: "PageLayoutConfig", description: "variant, sidebarWidth, contentMaxWidth." },
          { name: "sidebar", type: "PageSidebarConfig", description: "title, subtitle, and nav items (sidebar/docs layouts)." },
          { name: "header", type: "PageHeaderConfig", description: "badge, title, description, actions." },
          { name: "blocks", type: "PageBlock[]", description: "Ordered content blocks to render." },
        ],
      },
      {
        title: "Block types",
        props: [
          { name: "typography", type: '{ type: "typography"; text; variant? }', description: "Typography presets." },
          { name: "form", type: '{ type: "form"; config: FormConfig }', description: "Embed a JSON Form." },
          { name: "stats", type: '{ type: "stats"; items; columns? }', description: "KPI metric cards." },
          { name: "table", type: '{ type: "table"; columns; rows }', description: "Simple data table." },
          { name: "tabs / accordion / timeline", type: "nested blocks", description: "Compose richer sections." },
          { name: "card / grid", type: "nested blocks", description: "Layout containers for child blocks." },
          { name: "custom", type: '{ type: "custom"; id }', description: "Escape hatch via slots[id]." },
        ],
      },
    ],
  },
  {
    slug: "card-validation",
    summary: "Payment card fields with Luhn validation, expiry/CVC rules, and brand detection.",
    description:
      "CardValidation collects card number, expiry, CVC/CID, and optional cardholder name. It formats the PAN, detects Visa/Mastercard/Amex/Discover/etc., validates with the Luhn algorithm, checks expiry is not in the past, and enforces 3- or 4-digit security codes by brand. Use client-side before sending to your payment tokenizer — never store raw PANs yourself.",
    importPath: "axiom-ui/card-validation",
    exportName: "CardValidation",
    accessibility:
      "Each field uses Input with labels, autocomplete tokens (cc-number, cc-exp, cc-csc, cc-name), aria-invalid on errors, and a group label for the fieldset.",
    usage: `import { CardValidation, validateCardValues } from "axiom-ui/card-validation";

<CardValidation
  onChange={(values) => console.log(values)}
  onValidate={(errors) => console.log(errors)}
/>

// Or validate imperatively before submit:
const errors = validateCardValues(values, { requireName: true });`,
    props: [],
    propGroups: [
      {
        title: "CardValidation",
        props: [
          { name: "values", type: "Partial<CardValidationValues>", description: "Controlled digits-only values." },
          { name: "defaultValues", type: "Partial<CardValidationValues>", description: "Initial values for uncontrolled mode." },
          { name: "onChange", type: "(values: CardValidationValues) => void", description: "Fires on every field change." },
          { name: "onValidate", type: "(errors, values) => void", description: "Fires after blur/change validation." },
          { name: "showPreview", type: "boolean", defaultValue: "true", description: "Compact card preview with brand + masked number." },
          { name: "showName", type: "boolean", defaultValue: "true", description: "Include cardholder name field." },
          { name: "required", type: "boolean", defaultValue: "true", description: "Require number, expiry, and CVC." },
          { name: "disabled", type: "boolean", defaultValue: "false", description: "Disable all inputs." },
          { name: "errors", type: "CardValidationErrors", description: "External/server errors merged over local validation." },
          { name: "validateOn", type: '"blur" | "change"', defaultValue: '"blur"', description: "When to re-validate after first attempt." },
          { name: "helperText", type: "ReactNode", description: "Assistive text when there are no errors." },
        ],
      },
      {
        title: "Helpers",
        props: [
          { name: "detectCardBrand", type: "(number) => CardBrand", description: "BIN/IIN brand detection." },
          { name: "luhnCheck", type: "(number) => boolean", description: "Luhn checksum." },
          { name: "validateCardValues", type: "(values, options?) => CardValidationErrors", description: "Validate a payload without mounting the UI." },
          { name: "formatCardNumber", type: "(digits, brand?) => string", description: "Display formatting with spaces." },
        ],
      },
    ],
  },
  {
    slug: "error-boundary",
    summary: "React error boundary with fallback UI and remote monitoring support.",
    description:
      "ErrorBoundary catches render errors in child components. Displays a default or custom fallback. When AxiomProvider monitoring is enabled, errors are POSTed as JSON to the configured reportUrl.",
    importPath: "axiom-ui/error-boundary",
    exportName: "ErrorBoundary",
    usage: `import { ErrorBoundary } from "axiom-ui/error-boundary";

<ErrorBoundary
  fallback={({ error, reset }) => <ErrorPage message={error.message} onRetry={reset} />}
  monitoringUrl="/api/errors"
>
  <App />
</ErrorBoundary>`,
    props: [
      { name: "fallback", type: "ReactNode | (props) => ReactNode", description: "Custom UI or render function receiving { error, reset }." },
      { name: "onError", type: "(error: Error, info: ErrorInfo) => void", description: "Local error logging callback." },
      { name: "monitoringUrl", type: "string", description: "Override AxiomProvider monitoring.reportUrl for this boundary." },
      { name: "children", type: "ReactNode", required: true, description: "Subtree to protect." },
    ],
  },
  {
    slug: "monaco-editor",
    summary: "Lazy-loaded Monaco code editor for JSON and TypeScript configs.",
    description:
      "MonacoEditor wraps @monaco-editor/react with a loading fallback and sensible defaults (no minimap, 13px font). Peer dependency: @monaco-editor/react.",
    importPath: "axiom-ui/monaco-editor",
    exportName: "MonacoEditor",
    usage: `import { MonacoEditor } from "axiom-ui/monaco-editor";

<MonacoEditor
  language="json"
  defaultValue='{"theme":"light"}'
  onChange={setConfig}
  height={400}
  theme="vs-dark"
/>`,
    props: [
      { name: "language", type: "string", defaultValue: '"json"', description: "Monaco language id." },
      { name: "value", type: "string", description: "Controlled editor content." },
      { name: "defaultValue", type: "string", description: "Initial content for uncontrolled mode." },
      { name: "onChange", type: "(value: string) => void", description: "Called on every edit." },
      { name: "height", type: "string | number", defaultValue: '"320px"', description: "Editor container height." },
      { name: "theme", type: '"vs-dark" | "light"', defaultValue: '"vs-dark"', description: "Monaco color theme." },
      { name: "readOnly", type: "boolean", defaultValue: "false", description: "Disables editing." },
      { name: "options", type: "Record<string, unknown>", description: "Passthrough Monaco editor options." },
    ],
  },
  {
    slug: "flow-chart",
    summary: "React Flow wrapper for drag-and-drop flowchart builders.",
    description:
      "FlowChart provides a ready-to-use node-edge canvas with background grid, zoom controls, and minimap. Lazy-loads @xyflow/react. Peer dependency: @xyflow/react.",
    importPath: "axiom-ui/flow-chart",
    exportName: "FlowChart",
    usage: `import { FlowChart } from "axiom-ui/flow-chart";

<FlowChart
  height={500}
  nodes={[{ id: "1", position: { x: 0, y: 0 }, data: { label: "Start" } }]}
  edges={[]}
  showMiniMap
  showControls
/>`,
    props: [
      { name: "nodes", type: "FlowChartNode[]", description: "Initial graph nodes. Defaults to demo graph." },
      { name: "edges", type: "FlowChartEdge[]", description: "Initial edges between nodes." },
      { name: "onNodesChange", type: "(nodes) => void", description: "Called when nodes are moved or updated." },
      { name: "onEdgesChange", type: "(edges) => void", description: "Called when edges change." },
      { name: "height", type: "string | number", defaultValue: '"400px"', description: "Canvas container height." },
      { name: "showMiniMap", type: "boolean", defaultValue: "true", description: "Show overview minimap." },
      { name: "showControls", type: "boolean", defaultValue: "true", description: "Show zoom/fit controls." },
    ],
  },
  {
    slug: "code-block",
    summary: "VS Code-style syntax-highlighted code display.",
    description:
      "CodeBlock renders source code with a dark editor background and colored tokens. Includes optional copy button, filename toolbar, and line numbers. Zero dependencies — lightweight alternative to Monaco for read-only snippets.",
    importPath: "axiom-ui/code-block",
    exportName: "CodeBlock",
    usage: `import { CodeBlock } from "axiom-ui/code-block";

<CodeBlock
  code={\`import { Button } from "axiom-ui/button";\`}
  language="tsx"
  showCopy
  filename="App.tsx"
/>`,
    props: [
      { name: "code", type: "string", required: true, description: "Source code string to display." },
      { name: "language", type: "CodeLanguage", defaultValue: '"tsx"', description: "tsx | ts | jsx | js | json | bash | text" },
      { name: "showCopy", type: "boolean", defaultValue: "false", description: "Show copy-to-clipboard button." },
      { name: "filename", type: "string", description: "Optional filename label in toolbar." },
      { name: "lineNumbers", type: "boolean", defaultValue: "false", description: "Show line number gutter." },
    ],
  },
  {
    slug: "markdown",
    summary: "Lightweight Markdown renderer with theme tokens and CodeBlock fences.",
    description:
      "Markdown parses common Markdown into React elements — no remark/react-markdown dependency. Supports headings, emphasis, links, images, lists, blockquotes, tables, horizontal rules, and fenced code via CodeBlock. Raw HTML in the source is rendered as text (not executed).",
    importPath: "axiom-ui/markdown",
    exportName: "Markdown",
    accessibility:
      "Renders semantic HTML (article, headings, lists, table). External http(s) links open in a new tab with rel=noopener noreferrer by default.",
    usage: `import { Markdown } from "axiom-ui/markdown";

<Markdown
  source={\`# Hello

Install with \\\`pnpm add axiom-ui\\\`.

- Accessible
- Themeable
\`}
/>`,
    props: [
      { name: "source", type: "string", description: "Markdown string. Takes precedence over children." },
      { name: "children", type: "string", description: "Markdown as a string child when source is omitted." },
      { name: "externalLinksInNewTab", type: "boolean", defaultValue: "true", description: "Open absolute http(s) links in a new tab." },
      { name: "showCodeCopy", type: "boolean", defaultValue: "true", description: "Show copy on fenced code blocks." },
      { name: "codeLineNumbers", type: "boolean", defaultValue: "false", description: "Line numbers on fenced code blocks." },
      { name: "components", type: "MarkdownComponents", description: "Optional element overrides (h1–h4, p, a, code, …)." },
    ],
  },
  {
    slug: "side-nav",
    summary: "Sidebar navigation with left-border hover and active states.",
    description:
      "SideNav is a compound navigation component for documentation and dashboard sidebars. Collapsible groups animate open/close with chevrons, the whole sidebar can collapse via SideNav.Toggle (chevron icon rail or animated hamburger that hides the nav), multiple top-level menus switch via an icon rail, nested submenus support deeper menu levels with optional icons, and SideNav.VirtualList optionally virtualizes large link lists.",
    importPath: "axiom-ui/side-nav",
    exportName: "SideNav",
    accessibility:
      "Uses nav landmark. Active links set aria-current=page. Collapsible groups and submenus expose aria-expanded on triggers. Toggle exposes aria-expanded for the whole sidebar. Multi-menu rail uses role=tablist with tab/tabpanel pairing.",
    usage: `import { SideNav } from "axiom-ui/side-nav";

{/* Hamburger — hides the sidenav on click */}
<SideNav collapsible collapseMode="hidden">
  <SideNav.Toggle variant="hamburger" />
  <SideNav.Group label="Pages" collapsible defaultOpen>
    <SideNav.List>
      <SideNav.Item>
        <SideNav.Link href="/dashboard" active>Dashboard</SideNav.Link>
      </SideNav.Item>
    </SideNav.List>
  </SideNav.Group>
</SideNav>

{/* Or collapse to an icon rail */}
<SideNav collapsible>
  <SideNav.Toggle />
  <SideNav.Menus defaultMenu="docs">
    <SideNav.Menu id="docs" label="Docs" icon={<Icon name="sparkles" size="sm" />}>
      <SideNav.Group label="Components" icon={<Icon name="grid" size="sm" />} collapsible>
        <SideNav.List>
          <SideNav.Submenu label="Form" icon={<Icon name="form" size="sm" />}>
            <SideNav.Item>
              <SideNav.Link href="/button" icon={<Icon name="check" size="sm" />} active>
                Button
              </SideNav.Link>
            </SideNav.Item>
          </SideNav.Submenu>
        </SideNav.List>
      </SideNav.Group>
    </SideNav.Menu>
  </SideNav.Menus>
</SideNav>`,
    propGroups: [
      {
        title: "SideNav.Menus",
        props: [
          { name: "activeMenu", type: "string", description: "Controlled active menu id." },
          { name: "defaultMenu", type: "string", description: "Initial active menu id (defaults to first menu)." },
          { name: "onMenuChange", type: "(menuId: string) => void", description: "Called when the icon rail selection changes." },
        ],
      },
      {
        title: "SideNav.Menu",
        props: [
          { name: "id", type: "string", description: "Unique menu id for the icon rail." },
          { name: "label", type: "string", description: "Accessible label for the rail button." },
          { name: "icon", type: "ReactNode", description: "Icon shown in the top menu rail." },
        ],
      },
      {
        title: "SideNav.Group",
        props: [
          { name: "label", type: "string", description: "Section label shown above links." },
          { name: "icon", type: "ReactNode", description: "Optional icon beside the group label." },
          { name: "collapsible", type: "boolean", defaultValue: "false", description: "Makes the label a toggle for the group." },
          { name: "open", type: "boolean", description: "Controlled open state for collapsible groups." },
          { name: "defaultOpen", type: "boolean", defaultValue: "true", description: "Initial open state." },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when group opens or closes." },
        ],
      },
      {
        title: "SideNav.Submenu",
        props: [
          { name: "label", type: "string", description: "Nested section label inside a list." },
          { name: "icon", type: "ReactNode", description: "Optional icon beside the submenu label." },
          { name: "collapsible", type: "boolean", defaultValue: "true", description: "Toggle nested links open/closed." },
          { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Initial open state for nested links." },
        ],
      },
      {
        title: "SideNav.VirtualList",
        props: [
          { name: "items", type: "T[]", description: "Navigation data array to virtualize." },
          { name: "itemHeight", type: "number", description: "Fixed row height in pixels." },
          { name: "height", type: "number", description: "Scroll viewport height in pixels." },
          { name: "overscan", type: "number", defaultValue: "4", description: "Extra rows rendered above/below the viewport." },
          { name: "renderItem", type: "(item, index) => ReactNode", description: "Render each visible row (typically a SideNav.Link)." },
          { name: "getItemKey", type: "(item, index) => string | number", description: "Stable key extractor for rows." },
        ],
      },
      {
        title: "SideNav.List (virtualized)",
        props: [
          { name: "virtualized", type: "boolean", description: "Set to true to enable virtualization with the same props as SideNav.VirtualList." },
        ],
      },
      {
        title: "SideNav.Home",
        props: [
          { name: "href", type: "string", description: "Home destination." },
          { name: "label", type: "string", defaultValue: '"Home"', description: "Accessible label and tooltip when collapsed." },
          { name: "icon", type: "ReactNode", description: "Optional home icon (defaults to a house icon)." },
          { name: "active", type: "boolean", defaultValue: "false", description: "Highlights the home link." },
        ],
      },
      {
        title: "SideNav.Toggle",
        props: [
          {
            name: "variant",
            type: '"chevron" | "hamburger"',
            defaultValue: '"chevron"',
            description:
              "chevron collapses to an icon rail; hamburger animates bars ↔ X (pair with collapseMode=\"hidden\").",
          },
          { name: "expandLabel", type: "string", description: "Accessible label when collapsed. Defaults depend on variant." },
          { name: "collapseLabel", type: "string", description: "Accessible label when expanded. Defaults depend on variant." },
        ],
      },
      {
        title: "SideNav.Link",
        props: [
          { name: "active", type: "boolean", defaultValue: "false", description: "Highlights link with left border accent." },
          { name: "icon", type: "ReactNode", description: "Optional leading icon for the link." },
          { name: "href", type: "string", description: "Link destination." },
        ],
      },
    ],
    props: [
      { name: "aria-label", type: "string", defaultValue: '"Sidebar"', description: "Accessible label for the nav landmark." },
      { name: "side", type: '"left" | "right"', defaultValue: '"left"', description: "Which edge the sidebar anchors to. Pair with PageLayout sidebarSide." },
      { name: "collapsible", type: "boolean", defaultValue: "false", description: "Enable whole-sidebar collapse with SideNav.Toggle." },
      { name: "collapseMode", type: '"rail" | "hidden"', defaultValue: '"rail"', description: "rail keeps an icon strip; hidden hides nav content and leaves only the toggle." },
      { name: "collapsed", type: "boolean", description: "Controlled collapsed state." },
      { name: "defaultCollapsed", type: "boolean", defaultValue: "false", description: "Initial collapsed state." },
      { name: "onCollapsedChange", type: "(collapsed: boolean) => void", description: "Called when sidebar collapse changes." },
      { name: "collapsedWidth", type: "number | string", defaultValue: '"3.5rem"', description: "Width of the icon rail when collapseMode is rail." },
    ],
  },
  {
    slug: "page-layout",
    summary: "Configurable page shell with sidebar, docs, centered, and full layouts.",
    description:
      "PageLayout provides a responsive grid shell with compound slots: Sidebar, Main, Content, and Aside. Use variant presets for common app and documentation layouts.",
    importPath: "axiom-ui/page-layout",
    exportName: "PageLayout",
    usage: `import { PageLayout } from "axiom-ui/page-layout";
import { SideNav } from "axiom-ui/side-nav";

<PageLayout variant="docs" sidebarWidth={260}>
  <PageLayout.Sidebar>
    <SideNav>...</SideNav>
  </PageLayout.Sidebar>
  <PageLayout.Main>
    <PageLayout.Content maxWidth="56rem">{children}</PageLayout.Content>
    <PageLayout.Aside>{toc}</PageLayout.Aside>
  </PageLayout.Main>
</PageLayout>`,
    props: [
      { name: "variant", type: "PageLayoutVariant", defaultValue: '"sidebar"', description: "sidebar | docs | centered | full" },
      { name: "sidebarSide", type: '"left" | "right"', defaultValue: '"left"', description: "Which edge the sidebar column sits on for sidebar/docs variants." },
      { name: "sidebarWidth", type: "number | string", defaultValue: '"260px"', description: "Sidebar column width." },
      { name: "asideWidth", type: "number | string", defaultValue: '"180px"', description: "Aside column width for docs variant." },
      { name: "contentMaxWidth", type: "number | string", description: "Default max width for centered content." },
    ],
  },
  {
    slug: "hero",
    summary: "Compound hero with full text or split (right/left) copy.",
    description:
      "Hero is composition-only: Copy, Eyebrow, Title, Description, Actions, Media, and Background. variant=\"full\" is a text band. variant=\"split\" with textSide=\"right\" puts copy on the right and media on the left. background presets include dotted, grid, glow, aurora, and mesh — set animated for motion.",
    importPath: "axiom-ui/hero",
    exportName: "Hero",
    usage: `import { Hero } from "axiom-ui/hero";
import { Slider } from "axiom-ui/slider";
import { Button } from "axiom-ui/button";

<Hero variant="split" textSide="right" background="dotted" animated>
  <Hero.Copy>
    <Hero.Eyebrow>New</Hero.Eyebrow>
    <Hero.Title>Ship the layout you actually want</Hero.Title>
    <Hero.Description>Full-width copy, or text on the right beside a slider.</Hero.Description>
    <Hero.Actions>
      <Button>Get started</Button>
    </Hero.Actions>
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
    props: [
      { name: "variant", type: '"full" | "split"', defaultValue: '"full"', description: "Full-width text, or copy beside Hero.Media." },
      { name: "textSide", type: '"left" | "right"', defaultValue: '"left"', description: "Copy column in split layout. Use right for text on the right." },
      { name: "align", type: '"start" | "center"', defaultValue: '"start"', description: "Copy alignment, especially for full heroes." },
      { name: "size", type: '"md" | "lg"', defaultValue: '"lg"', description: "Vertical padding and title scale." },
      { name: "background", type: '"none" | "muted" | "dotted" | "grid" | "glow" | "aurora" | "mesh"', defaultValue: '"none"', description: "Decorative section background." },
      { name: "animated", type: "boolean", defaultValue: "true", description: "Animate dotted, grid, glow, aurora, and mesh backgrounds. Honors reduced motion." },
    ],
  },
  {
    slug: "slider",
    summary: "Compound carousel with slides, arrows, and dots.",
    description:
      "Slider is composition-only: Track, Slide, Controls, Prev, Next, and Dots. Supports loop, optional autoplay, pause on hover, and drag/swipe on the track.",
    importPath: "axiom-ui/slider",
    exportName: "Slider",
    usage: `import { Slider } from "axiom-ui/slider";

<Slider loop autoplay={5000}>
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
    props: [
      { name: "index / defaultIndex / onIndexChange", type: "number | function", description: "Controlled or uncontrolled active slide." },
      { name: "loop", type: "boolean", defaultValue: "true", description: "Wrap from last slide to first." },
      { name: "autoplay", type: "number | false", defaultValue: "0", description: "Interval in ms. Disabled when 0, false, or reduced motion." },
      { name: "drag", type: "boolean", defaultValue: "true", description: "Drag or swipe the track to change slides." },
      { name: "label", type: "string", defaultValue: '"Slideshow"', description: "Accessible name for the carousel region." },
    ],
  },
  {
    slug: "grid",
    summary: "Responsive CSS grid with fixed and auto-fill variants.",
    description:
      "Grid provides two layout presets: fixed column count for predictable layouts, and auto-fill for responsive card grids. Auto-fill enables layout animations so cards smoothly reposition when the viewport reflows. Gap tokens map to design system spacing.",
    importPath: "axiom-ui/grid",
    exportName: "Grid",
    usage: `<Grid variant="fixed" columns={2} gap="md">{children}</Grid>
<Grid variant="auto" minColumnWidth={280} gap="lg">{children}</Grid>`,
    props: [
      { name: "variant", type: "GridVariant", defaultValue: '"auto"', description: "fixed | auto" },
      { name: "columns", type: "number", defaultValue: "2", description: "Column count for fixed variant." },
      { name: "minColumnWidth", type: "number | string", defaultValue: '"16rem"', description: "Min column width for auto variant." },
      { name: "gap", type: "GridGap", defaultValue: '"md"', description: "none | sm | md | lg" },
      {
        name: "motion",
        type: "boolean",
        defaultValue: "true for auto variant",
        description: "Animate card repositioning on responsive reflow. Respects prefers-reduced-motion.",
      },
      {
        name: "layoutTransition",
        type: "Transition",
        description: "Override the Framer Motion spring used for layout moves.",
      },
    ],
  },
  {
    slug: "container",
    summary: "Centered max-width content wrapper.",
    description:
      "Container constrains page content to size tokens (sm–xl or full) with optional horizontal padding. Use it for marketing pages, docs, and dashboard content columns.",
    importPath: "axiom-ui/container",
    exportName: "Container",
    usage: `<Container size="lg" padding="md">
  <h1>Page title</h1>
</Container>`,
    props: [
      { name: "size", type: "ContainerSize", defaultValue: '"lg"', description: "sm | md | lg | xl | full" },
      { name: "padding", type: "ContainerPadding", defaultValue: '"md"', description: "none | sm | md | lg" },
      { name: "centered", type: "boolean", defaultValue: "true", description: "Center with margin-inline auto." },
      { name: "as", type: '"div" | "section" | …', defaultValue: '"div"', description: "Polymorphic root element." },
    ],
  },
  {
    slug: "flex",
    summary: "Flexbox layout primitive.",
    description:
      "Flex exposes direction, align, justify, gap, and wrap as typed props mapped to design-system spacing. Prefer Flex over ad-hoc display:flex for consistent gaps across the product.",
    importPath: "axiom-ui/flex",
    exportName: "Flex",
    usage: `<Flex direction="row" align="center" justify="between" gap="md">
  <span>Title</span>
  <Button size="sm">Action</Button>
</Flex>`,
    props: [
      { name: "direction", type: "FlexDirection", defaultValue: '"row"', description: "row | column | *-reverse" },
      { name: "align", type: "FlexAlign", defaultValue: '"stretch"', description: "Cross-axis alignment." },
      { name: "justify", type: "FlexJustify", defaultValue: '"start"', description: "Main-axis distribution." },
      { name: "gap", type: "FlexGap", defaultValue: '"none"', description: "none | xs | sm | md | lg | xl" },
      { name: "wrap", type: "FlexWrap", defaultValue: '"nowrap"', description: "nowrap | wrap | wrap-reverse" },
      { name: "inline", type: "boolean", defaultValue: "false", description: "Use inline-flex." },
    ],
  },
  {
    slug: "theme-switch",
    summary: "Animated light/dark theme toggle.",
    description:
      "ThemeSwitch toggles data-theme with View Transition animations (ripple, fade, wipe, blur, slide). Falls back to an instant update when View Transitions are unavailable or prefers-reduced-motion is set.",
    importPath: "axiom-ui/theme-switch",
    exportName: "ThemeSwitch",
    usage: `<ThemeSwitch
  theme={theme}
  onThemeChange={setTheme}
  animation="ripple"
  showLabel
/>`,
    props: [
      { name: "theme", type: '"light" | "dark"', description: "Current theme mode." },
      { name: "onThemeChange", type: "(theme) => void", description: "Called after the user toggles." },
      {
        name: "animation",
        type: "ThemeSwitchAnimation",
        defaultValue: '"ripple"',
        description: "ripple | fade | wipe | blur | slide",
      },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Control size." },
      { name: "showLabel", type: "boolean", defaultValue: "false", description: "Show Light/Dark text." },
    ],
  },
  {
    slug: "table",
    summary: "Semantic compound table for manual data markup.",
    description:
      "Table is a styled HTML table with compound subcomponents — Caption, Header, Body, Footer, Row, Head, and Cell. Use it for static reports and custom row layouts. Pair with DataGrid when you need declarative columns and sorting.",
    importPath: "axiom-ui/table",
    exportName: "Table",
    usage: `import { Table } from "axiom-ui/table";

<Table variant="striped" scrollable>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
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
    props: [
      { name: "variant", type: "TableVariant", defaultValue: '"default"', description: "default | striped | bordered" },
      { name: "size", type: "TableSize", defaultValue: '"md"', description: "sm | md" },
      { name: "scrollable", type: "boolean", defaultValue: "false", description: "Wrap in a horizontal scroll container." },
    ],
  },
  {
    slug: "data-grid",
    summary: "Sortable data grid with native or AG Grid engines.",
    description:
      "DataGrid renders tabular data from column definitions. The default native engine adds client-side sorting on top of Table. Enable exportable for CSV and Microsoft Excel (.xlsx) export — Excel requires optional peer xlsx. Set engine=\"ag-grid\" for advanced features after installing ag-grid-community and ag-grid-react.",
    importPath: "axiom-ui/data-grid",
    exportName: "DataGrid",
    usage: `import { DataGrid } from "axiom-ui/data-grid";

<DataGrid
  columns={[
    { id: "name", header: "Name", accessor: "name", sortable: true },
    { id: "status", header: "Status", accessor: "status" },
  ]}
  rows={data}
  getRowId={(row) => row.id}
/>

// AG Grid engine (requires peer deps)
<DataGrid engine="ag-grid" columns={columns} rows={data} gridOptions={{ pagination: true }} />`,
    props: [
      { name: "columns", type: "DataGridColumn<T>[]", required: true, description: "Column definitions with header, accessor, and optional renderCell." },
      { name: "rows", type: "T[]", required: true, description: "Row data array." },
      { name: "engine", type: '"native" | "ag-grid"', defaultValue: '"native"', description: "Rendering engine." },
      { name: "getRowId", type: "(row, index) => string | number", description: "Stable React key extractor for rows." },
      { name: "height", type: "number | string", description: "Viewport height for scrolling." },
      { name: "sort / defaultSort / onSortChange", type: "DataGridSortState", description: "Controlled or initial sort (native engine)." },
      { name: "gridOptions", type: "Record<string, unknown>", description: "Passthrough AG Grid options when engine is ag-grid." },
      { name: "emptyMessage", type: "string", defaultValue: '"No rows to display"', description: "Shown when rows is empty (native)." },
      { name: "loading", type: "boolean", defaultValue: "false", description: "Loading placeholder (native)." },
      { name: "exportable", type: "boolean | DataGridExportConfig", description: "CSV/Excel export toolbar. Excel requires peer xlsx." },
      { name: "editable", type: "boolean | DataGridEditableConfig", description: "Inline cell editing with config-based validation. Use commitOn: \"blur\" (default) so onCellChange fires after edit, not on every keystroke." },
      { name: "expandable", type: "DataGridExpandableConfig", description: "Expandable row detail panels. Disables virtualization when set." },
      { name: "pagination", type: "boolean | DataGridPaginationConfig", description: "Client-side pagination controls." },
      { name: "virtualize", type: "boolean | DataGridVirtualizeConfig", description: "VirtualList-backed body for large row counts." },
      { name: "onImport", type: "(rows: T[]) => void", description: "Called after Excel import when exportable.import is true." },
    ],
  },
  {
    slug: "aspect-ratio",
    summary: "Container that preserves a width/height ratio for media.",
    description: "AspectRatio uses the padding-top technique to reserve space before media loads. Wrap Image, video, or custom content.",
    importPath: "axiom-ui/aspect-ratio",
    exportName: "AspectRatio",
    usage: `import { AspectRatio } from "axiom-ui/aspect-ratio";

<AspectRatio ratio={16 / 9}>
  <Image src="/hero.jpg" alt="Hero" />
</AspectRatio>`,
    props: [
      { name: "ratio", type: "number", required: true, description: "Width divided by height. Example: 16/9" },
    ],
  },
  {
    slug: "image",
    summary: "Lazy-loaded image with srcSet generated from one path.",
    description:
      "Image builds responsive sources from a single base path using suffix (-800w) or query (?w=800) patterns. Native lazy loading with optional fade-in on load. Images are stored in Cache Storage so repeat views stay on-device until refetchInterval elapses.",
    importPath: "axiom-ui/image",
    exportName: "Image",
    usage: `import { Image } from "axiom-ui/image";

<Image
  src="/photos/hero.jpg"
  alt="Workspace"
  widths={[400, 800, 1200]}
  srcPattern="suffix"
  sizes="(max-width: 768px) 100vw, 50vw"
  cache
  refetchInterval={60 * 60 * 1000}
/>`,
    props: [
      { name: "src", type: "string", required: true, description: "Base image path." },
      { name: "alt", type: "string", required: true, description: "Accessible alt text." },
      { name: "widths", type: "number[]", defaultValue: "[400, 800, 1200]", description: "Breakpoints for srcSet generation." },
      { name: "srcPattern", type: "ImageSrcPattern", defaultValue: '"suffix"', description: "suffix | query" },
      { name: "sizes", type: "string", defaultValue: '"100vw"', description: "HTML sizes attribute." },
      { name: "lazy", type: "boolean", defaultValue: "true", description: "Native lazy loading." },
      { name: "placeholderSrc", type: "string", description: "Low-quality placeholder until load." },
      { name: "cache", type: "boolean", defaultValue: "true", description: "Store the image in Cache Storage so repeat views stay local." },
      { name: "refetchInterval", type: "number", defaultValue: "86400000", description: "Milliseconds before a background refetch. Cached copy still renders." },
      { name: "cacheName", type: "string", defaultValue: '"axiom-assets-v1"', description: "Cache Storage bucket name." },
      { name: "maxEntries", type: "number", defaultValue: "120", description: "Max cached assets before eviction." },
    ],
  },
  {
    slug: "loader",
    summary: "Accessible loading indicator with spinner, dots, and ring variants.",
    description:
      "Loader displays an animated indicator for async operations. Use spinner for general loading, dots for subtle inline states, or ring for overlay contexts. Respects prefers-reduced-motion.",
    importPath: "axiom-ui/loader",
    exportName: "Loader",
    accessibility: "Uses role=status with aria-busy and aria-label. Pass a descriptive label prop.",
    usage: `import { Loader } from "axiom-ui/loader";

<Loader variant="spinner" size="md" label="Saving changes" showLabel />
<Loader variant="dots" size="sm" />
<Button loading>Saving…</Button>`,
    props: [
      { name: "variant", type: "LoaderVariant", defaultValue: '"spinner"', description: "spinner | dots | ring" },
      { name: "size", type: "LoaderSize", defaultValue: '"md"', description: "sm | md | lg" },
      { name: "label", type: "string", defaultValue: '"Loading"', description: "Accessible loading label." },
      { name: "showLabel", type: "boolean", defaultValue: "false", description: "Show label text below indicator." },
    ],
  },
  {
    slug: "timeline",
    summary: "Vertical or horizontal timeline for roadmaps, changelogs, and step progress.",
    description:
      "Timeline renders step lists with connector lines and status dots. Switch between vertical and horizontal layouts, pass an items config for automatic rendering, and customize per-status colors for complete, active, and default steps.",
    importPath: "axiom-ui/timeline",
    exportName: "Timeline",
    usage: `import { Timeline } from "axiom-ui/timeline";

// Config-driven horizontal timeline
<Timeline
  orientation="horizontal"
  items={[
    { id: "1", title: "Install", date: "Step 1", status: "complete" },
    { id: "2", title: "Ship", date: "Step 2", status: "active" },
  ]}
  statusColors={{
    complete: { dot: "#059669", dotBorder: "#059669" },
    active: { dot: "#0284c7", dotBorder: "#0284c7" },
  }}
/>

// Compound vertical timeline
<Timeline>
  <Timeline.Item title="Alpha" date="Q1" status="complete" />
  <Timeline.Item title="Beta" date="Q2" status="active" />
</Timeline>`,
    props: [
      { name: "orientation", type: "vertical | horizontal", defaultValue: '"vertical"', description: "Layout direction." },
      { name: "items", type: "TimelineItemConfig[]", description: "Auto-render steps from config." },
      { name: "statusColors", type: "TimelineStatusColors", description: "Per-status dot, border, connector, title, and glow colors." },
      { name: "trackColors", type: "TimelineTrackColors", description: "Horizontal progress track background and fill." },
      { name: "animateOnView", type: "boolean", defaultValue: "true", description: "Animate horizontal progress on scroll into view." },
    ],
    propGroups: [
      {
        title: "Timeline.Item / TimelineItemConfig",
        props: [
          { name: "title", type: "string", required: true, description: "Step title." },
          { name: "date", type: "string", description: "Optional date or status label." },
          { name: "status", type: "TimelineItemStatus", defaultValue: '"default"', description: "default | active | complete" },
          { name: "description", type: "ReactNode", description: "Supporting body text." },
          { name: "id", type: "string", description: "Stable key when using items config." },
        ],
      },
    ],
  },
  {
    slug: "scroll-area",
    summary: "Custom scrollbar for containers and full-page scrolling.",
    description:
      "ScrollArea hides the native scrollbar and renders a styled thumb that stays in sync with scroll position. Use container mode for panels and feeds, or page mode to style document scrolling across your app shell. Pair with ScrollArea.Sentinel or useScrollIntersection for infinite scroll and visibility tracking.",
    importPath: "axiom-ui/scroll-area",
    exportName: "ScrollArea",
    accessibility:
      "Keeps native scrolling on the viewport for keyboard and touch support. Custom thumbs are aria-hidden; provide label for named scroll regions.",
    usage: `import { ScrollArea } from "axiom-ui/scroll-area";

// Container scrolling
<ScrollArea height={320} type="hover" label="Activity feed">
  {items}
</ScrollArea>

// Page scrolling
<ScrollArea page type="hover">
  <App />
</ScrollArea>

// Infinite scroll
<ScrollArea height={320} label="Feed">
  {items}
  <ScrollArea.Sentinel rootMargin="120px" onIntersect={loadMore} />
</ScrollArea>`,
    props: [
      { name: "page", type: "boolean", defaultValue: "false", description: "Sync scrollbar with window scroll." },
      { name: "height", type: "number | string", description: "Viewport height for container mode." },
      { name: "maxHeight", type: "number | string", description: "Max viewport height." },
      { name: "type", type: "ScrollAreaType", defaultValue: '"auto"', description: "auto | always | scroll | hover" },
      { name: "orientation", type: "ScrollAreaOrientation", defaultValue: '"vertical"', description: "vertical | horizontal | both" },
      { name: "label", type: "string", description: "Accessible region label." },
    ],
    propGroups: [
      {
        title: "ScrollArea.Sentinel",
        props: [
          {
            name: "onIntersect",
            type: "(entry: IntersectionObserverEntry) => void",
            description: "Fires when the sentinel enters the scroll root.",
          },
          {
            name: "onLeave",
            type: "(entry: IntersectionObserverEntry) => void",
            description: "Fires when the sentinel leaves the scroll root.",
          },
          {
            name: "onChange",
            type: "(entry, isIntersecting) => void",
            description: "Fires on every intersection change.",
          },
          {
            name: "rootMargin",
            type: "string",
            defaultValue: '"0px"',
            description: "Prefetch margin around the scroll root.",
          },
          {
            name: "threshold",
            type: "number | number[]",
            defaultValue: "0",
            description: "Intersection ratio threshold(s).",
          },
          {
            name: "enabled",
            type: "boolean",
            defaultValue: "true",
            description: "Pause observation without unmounting.",
          },
        ],
      },
    ],
  },
  {
    slug: "skeleton",
    summary: "Animated loading placeholders with shape variants and layout presets.",
    description:
      "Skeleton displays a pulse animation while content loads. Use text, circular, rounded, or rectangular variants. Presets include Skeleton.Profile and Skeleton.Card for common layouts. Respects prefers-reduced-motion.",
    importPath: "axiom-ui/skeleton",
    exportName: "Skeleton",
    accessibility:
      "Uses role=status with aria-hidden by default. Set aria-hidden=false and provide aria-label when skeleton is the only loading indicator.",
    usage: `import { Skeleton } from "axiom-ui/skeleton";

<Skeleton variant="text" width="60%" />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton.Profile />
<Skeleton.Card />`,
    props: [
      { name: "variant", type: "SkeletonVariant", defaultValue: '"text"', description: "text | circular | rectangular | rounded" },
      { name: "width", type: "number | string", defaultValue: '"100%"', description: "Width in px or CSS string." },
      { name: "height", type: "number | string", description: "Height in px or CSS string. Defaults per variant." },
      { name: "disableAnimation", type: "boolean", defaultValue: "false", description: "Static fill without pulse." },
    ],
  },
  {
    slug: "icon",
    summary: "Accessible icons with built-in glyphs, custom SVG children, or images.",
    description:
      "Icon renders named SVG glyphs from a built-in set, custom SVG children from libraries like lucide-react, or raster images via src. Icons are decorative by default (aria-hidden). Pass label when the icon conveys meaning without adjacent text.",
    importPath: "axiom-ui/icon",
    exportName: "Icon",
    accessibility: "Decorative by default. Set label to expose an accessible name via role=img.",
    usage: `import { Icon } from "axiom-ui/icon";
import { Rocket } from "lucide-react";

<Icon name="sparkles" size="md" />
<Icon src="/logo.png" label="Company logo" />
<Icon label="Launch"><Rocket /></Icon>`,
    props: [
      { name: "name", type: "IconName", description: "Built-in icon identifier." },
      { name: "src", type: "string", description: "Image URL rendered at icon size." },
      { name: "children", type: "ReactNode", description: "Custom SVG or third-party icon component." },
      { name: "size", type: "IconSize", defaultValue: '"md"', description: "sm | md | lg | xl" },
      { name: "label", type: "string", description: "Accessible name. Omit for decorative icons." },
      { name: "alt", type: "string", description: "Image alt text when using src." },
      { name: "objectFit", type: "string", defaultValue: '"contain"', description: "CSS object-fit for image icons." },
    ],
  },
  {
    slug: "typography",
    summary: "Semantic typography presets with token-based styles.",
    description:
      "Typography provides compound text primitives — H1–H4, P, Lead, Small, Muted, and Code — with semantic HTML defaults and optional as override.",
    importPath: "axiom-ui/typography",
    exportName: "Typography",
    usage: `import { Typography } from "axiom-ui/typography";

<Typography.H1>Page title</Typography.H1>
<Typography.Lead>Supporting intro copy.</Typography.Lead>
<Typography.Muted>Helper text</Typography.Muted>`,
    props: [
      { name: "variant", type: "TypographyVariant", defaultValue: '"p"', description: "h1 | h2 | h3 | h4 | p | lead | small | muted | code" },
      { name: "as", type: "string", description: "Override rendered HTML element." },
      { name: "align", type: "TypographyAlign", defaultValue: '"left"', description: "left | center | right" },
      { name: "truncate", type: "boolean", defaultValue: "false", description: "Single-line ellipsis." },
    ],
  },
  {
    slug: "color-palette",
    summary: "Accessible color swatch grid with copy support.",
    description:
      "ColorPalette displays design tokens as interactive swatches. Click to copy token names or hex values. Includes contrast preview text on each swatch.",
    importPath: "axiom-ui/color-palette",
    exportName: "ColorPalette",
    accessibility: "Each swatch is a button with an aria-label describing the color and copy action.",
    usage: `import { ColorPalette } from "axiom-ui/color-palette";

<ColorPalette />
<ColorPalette colors={[{ name: "Brand", value: "#000", token: "--brand" }]} columns={3} />`,
    props: [
      { name: "colors", type: "ColorSwatch[]", description: "Swatches to display. Defaults to Axiom tokens." },
      { name: "copyable", type: "boolean", defaultValue: "true", description: "Copy token/value on click." },
      { name: "columns", type: "number", defaultValue: "4", description: "Grid columns on wide screens." },
    ],
  },
  {
    slug: "ai-chat",
    summary: "Accessible AI chat shell with message queue and task runner.",
    description:
      "AiChat composes a message log, suggestion chips, task queue window, and prompt form. Use useAiChatQueue to process one task at a time — when a task completes, the next queued message starts automatically. AiChat.Prompt supports queue-when-busy via busy and onQueue.",
    importPath: "axiom-ui/ai-chat",
    exportName: "AiChat",
    accessibility:
      "Messages use role=log with aria-live=polite. Prompt has a visible label and Enter-to-send. Suggestions are grouped with aria-label. Queue lists task status for screen readers.",
    usage: `import { AiChat, useAiChatQueue } from "axiom-ui/ai-chat";

const { items, isProcessing, enqueue, remove, retry } = useAiChatQueue({
  onProcess: async (task) => {
    await callModel(task.text);
  },
});

<AiChat>
  <AiChat.Messages>{/* messages */}</AiChat.Messages>
  <AiChat.Queue items={items} onRemove={remove} onRetry={retry} />
  <AiChat.Prompt
    value={prompt}
    onValueChange={setPrompt}
    onSubmit={(value) => enqueue(value)}
    onQueue={(value) => enqueue(value)}
    busy={isProcessing}
  />
</AiChat>`,
    propGroups: [
      {
        title: "AiChat.Queue",
        props: [
          { name: "items", type: "AiChatQueueItem[]", required: true, description: "Queued, running, done, and failed tasks." },
          { name: "onRemove", type: "(id: string) => void", description: "Remove a queued task." },
          { name: "onRetry", type: "(id: string) => void", description: "Re-queue a failed task." },
          { name: "showDone", type: "boolean", defaultValue: "true", description: "Show completed tasks in the window." },
        ],
      },
      {
        title: "AiChat.Message",
        props: [
          { name: "messageRole", type: "AiMessageRole", required: true, description: "user | assistant | system" },
          { name: "meta", type: "string", description: "Optional timestamp or status." },
        ],
      },
      {
        title: "AiChat.Prompt",
        props: [
          { name: "value", type: "string", required: true, description: "Controlled prompt value." },
          { name: "onValueChange", type: "(value: string) => void", required: true, description: "Change handler." },
          { name: "onSubmit", type: "(value: string) => void", required: true, description: "Submit handler when not busy." },
          { name: "onQueue", type: "(value: string) => void", description: "Queue handler when busy is true." },
          { name: "busy", type: "boolean", defaultValue: "false", description: "When true with onQueue, submits go to the queue." },
          { name: "disabled", type: "boolean", defaultValue: "false", description: "Disable input and send." },
        ],
      },
    ],
    props: [
      { name: "label", type: "string", defaultValue: '"AI chat"', description: "Accessible region label." },
    ],
  },
  {
    slug: "ai-workflow-builder",
    summary: "Visual builder for AI agent workflows.",
    description:
      "AiWorkflowBuilder combines a node palette, React Flow canvas, node inspector, and run/reset toolbar. Model prompt chains with trigger, prompt, model, tool, condition, and output nodes — or drag Axiom UI components and integration blocks (WhatsApp, Slack, email, webhooks) onto the canvas and configure them in the inspector.",
    importPath: "axiom-ui/ai-workflow-builder",
    exportName: "AiWorkflowBuilder, useAiWorkflowBuilder",
    usage: `import { AiWorkflowBuilder } from "axiom-ui/ai-workflow-builder";

<AiWorkflowBuilder
  className="my-workflow"
  onRun={({ nodes, edges }) => orchestrator.run({ nodes, edges })}
/>`,
    props: [
      { name: "className", type: "string", description: "Custom class name for the builder root." },
      { name: "nodes / edges", type: "AiWorkflowNode[] / AiWorkflowEdge[]", description: "Controlled workflow graph." },
      { name: "onRun", type: "function", description: "Called with the current graph when Run workflow is clicked." },
      { name: "showPalette / showInspector / showToolbar", type: "boolean", defaultValue: "true", description: "Toggle builder panels." },
      { name: "showMiniMap / showControls", type: "boolean", defaultValue: "true", description: "Toggle the React Flow minimap and zoom controls." },
      { name: "showComponentPalette / showBlockPalette", type: "boolean", defaultValue: "true", description: "Toggle Axiom UI components and integration blocks in the palette." },
      { name: "enableDragDrop", type: "boolean", defaultValue: "true", description: "Allow dragging palette items onto the canvas." },
      { name: "components / customComponents", type: "array", description: "Default or fully custom Axiom UI palette items. `customComponents` are merged into `components`." },
      { name: "blocks / customBlocks", type: "array", description: "Built-in and custom integration blocks. Blocks support run-time scripts that transform incoming data." },
      { name: "executeOnRun / runInput", type: "boolean | object", description: "When true, block scripts execute on Run and `onRun` receives a `result` payload." },
      { name: "templates / templateId / showTemplates", type: "array | string | boolean", description: "n8n-style starter templates, active template id, and template gallery visibility." },
      { name: "onTemplateChange", type: "function", description: "Called when the user loads a different base template from the gallery or toolbar picker." },
      { name: "height", type: "string | number", defaultValue: "560", description: "Canvas height." },
    ],
  },
  {
    slug: "ai-summarizer",
    summary: "AI text summarizer with bullet or paragraph output.",
    description:
      "AiSummarizer accepts long-form text and produces a condensed summary. Wire onSummarize to your LLM or use the built-in demo for docs and Storybook.",
    importPath: "axiom-ui/ai-summarizer",
    exportName: "AiSummarizer",
    usage: `import { AiSummarizer } from "axiom-ui/ai-summarizer";

<AiSummarizer
  source={text}
  onSourceChange={setText}
  summary={summary}
  onSummarize={async (source, format) => setSummary(await model.summarize(source, format))}
/>`,
    props: [
      { name: "source", type: "string", required: true, description: "Text to summarize." },
      { name: "onSummarize", type: "(source, format) => void", description: "Called when Summarize is clicked." },
      { name: "format", type: "bullets | paragraph", defaultValue: "bullets", description: "Summary shape." },
      { name: "demo", type: "boolean", defaultValue: "true", description: "Use built-in demo summarizer when onSummarize is omitted." },
    ],
  },
  {
    slug: "ai-data-analyst",
    summary: "Natural language → metrics, charts, and tables.",
    description:
      "AiDataAnalyst turns a plain-language question into KPI cards, a bar chart preview, and a sortable table. Pair onAnalyze with your analytics API.",
    importPath: "axiom-ui/ai-data-analyst",
    exportName: "AiDataAnalyst",
    usage: `import { AiDataAnalyst } from "axiom-ui/ai-data-analyst";

<AiDataAnalyst
  query={query}
  onQueryChange={setQuery}
  result={result}
  onAnalyze={async (q) => setResult(await analytics.nlp(q))}
/>`,
    props: [
      { name: "query", type: "string", required: true, description: "Natural-language question." },
      { name: "result", type: "AiDataAnalystResult", description: "Metrics, chart bars, and table rows." },
      { name: "onAnalyze", type: "(query) => void", description: "Fetch analysis from your backend." },
    ],
  },
  {
    slug: "ai-form-filler",
    summary: "Natural language → structured form values.",
    description:
      "AiFormFiller maps free-form instructions onto a field schema and shows a structured preview. Wire onFill to extraction models.",
    importPath: "axiom-ui/ai-form-filler",
    exportName: "AiFormFiller",
    usage: `import { AiFormFiller } from "axiom-ui/ai-form-filler";

<AiFormFiller
  prompt={prompt}
  fields={fields}
  values={values}
  onFill={async (text, fields) => setValues(await extract(text, fields))}
/>`,
    props: [
      { name: "prompt", type: "string", required: true, description: "Natural-language fill instruction." },
      { name: "fields", type: "FormFieldConfig[]", required: true, description: "Target field schema." },
      { name: "values", type: "FormValues", description: "Filled values preview." },
      { name: "onFill", type: "(prompt, fields) => void", description: "Extraction handler." },
    ],
  },
  {
    slug: "ai-search",
    summary: "Semantic / natural-language search UI.",
    description:
      "AiSearch scores corpus items against a natural-language query and shows match percentage, snippets, and tags.",
    importPath: "axiom-ui/ai-search",
    exportName: "AiSearch",
    usage: `import { AiSearch } from "axiom-ui/ai-search";

<AiSearch
  query={query}
  items={corpus}
  results={results}
  onSearch={async (q, items) => setResults(await vectorSearch(q, items))}
/>`,
    props: [
      { name: "query", type: "string", required: true, description: "Search query." },
      { name: "items", type: "AiSearchItem[]", description: "Searchable corpus." },
      { name: "results", type: "AiSearchResult[]", description: "Ranked matches with scores." },
      { name: "onSearch", type: "(query, items) => void", description: "Semantic search handler." },
    ],
  },
  {
    slug: "ai-orchestrator",
    summary: "Unified shell for summarizer, analyst, forms, and search.",
    description:
      "AiOrchestrator tabs between AI tools and includes a pipeline mode that runs summarize → analyze → form fill → search in one click.",
    importPath: "axiom-ui/ai-orchestrator",
    exportName: "AiOrchestrator",
    usage: `import { AiOrchestrator } from "axiom-ui/ai-orchestrator";

<AiOrchestrator
  searchItems={docsCorpus}
  onRunPipeline={async (input) => orchestrator.run(input)}
/>`,
    props: [
      { name: "activeTool", type: "AiOrchestratorToolId", description: "summarizer | data-analyst | form-filler | search | pipeline" },
      { name: "searchItems", type: "AiSearchItem[]", description: "Corpus for the search tab and pipeline." },
      { name: "onRunPipeline", type: "(input) => void", description: "Run all tools in sequence." },
      { name: "demo", type: "boolean", defaultValue: "true", description: "Built-in demo handlers for each tool." },
    ],
  },
  {
    slug: "context-menu",
    summary: "Custom right-click menu at the cursor.",
    description:
      "ContextMenu replaces the native browser menu. Use Trigger attach=\"parent\" to listen on an existing section, or wrap content with attach=\"self\". Content portals to document.body at the pointer.",
    importPath: "axiom-ui/context-menu",
    exportName: "ContextMenu",
    usage: `import { ContextMenu } from "axiom-ui/context-menu";

<ContextMenu>
  <ContextMenu.Trigger attach="parent" />
  <ContextMenu.Content>
    <ContextMenu.Item onSelect={copyLayout}>Copy layout</ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item onSelect={openFeature}>Add feature</ContextMenu.Item>
    <ContextMenu.Item onSelect={openSurvey}>Questionnaire</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu>`,
    props: [
      { name: "open / defaultOpen / onOpenChange", type: "boolean | function", description: "Controlled or uncontrolled open state." },
      { name: "Trigger.attach", type: '"self" | "parent"', defaultValue: '"self"', description: "Listen on the trigger node or its parent element." },
      { name: "Item.onSelect", type: "() => void", description: "Runs when the item is chosen; the menu then closes." },
    ],
  },
  {
    slug: "feature-request",
    summary: "Intake form for a new product feature.",
    description:
      "FeatureRequest collects title, category, description, and optional email using the shared Form component. Wire onSubmit to your tracker or API.",
    importPath: "axiom-ui/feature-request",
    exportName: "FeatureRequest",
    usage: `import { FeatureRequest } from "axiom-ui/feature-request";

<FeatureRequest
  onSubmit={async (values) => {
    await api.createIssue(values);
  }}
/>`,
    props: [
      { name: "onSubmit", type: "(values: FeatureRequestValues) => void", description: "Called after validation succeeds." },
      { name: "submitLabel", type: "string", defaultValue: '"Submit feature"', description: "Submit button label." },
    ],
  },
  {
    slug: "questionnaire",
    summary: "Stepped survey with text and choice questions.",
    description:
      "Questionnaire walks through questions one at a time. Supports required text, single (radio), and multiple (checkbox) answers. DEFAULT_QUESTIONNAIRE is a starter set.",
    importPath: "axiom-ui/questionnaire",
    exportName: "Questionnaire, DEFAULT_QUESTIONNAIRE",
    usage: `import { Questionnaire, DEFAULT_QUESTIONNAIRE } from "axiom-ui/questionnaire";

<Questionnaire
  questions={DEFAULT_QUESTIONNAIRE}
  onComplete={(answers) => save(answers)}
/>`,
    props: [
      { name: "questions", type: "QuestionnaireQuestion[]", required: true, description: "Ordered questions with type text | single | multiple." },
      { name: "onComplete", type: "(answers) => void", description: "Called when the last question is submitted." },
      { name: "nextLabel / backLabel / submitLabel", type: "string", description: "Action button labels." },
    ],
  },
  {
    slug: "server-query",
    summary: "Fetch server data with loading, error, retry, and config-level database queries.",
    description:
      "ServerQuery runs an async query function, URL, named database key, or direct SQL when database is configured on AxiomProvider. Shows Loader while fetching, surfaces errors with retry, and passes typed data to children. useServerQuery and useAxiomDatabase are exported for headless usage.",
    importPath: "axiom-ui/server-query",
    exportName: "ServerQuery",
    accessibility:
      "Loading uses Loader role=status. Errors render role=alert with a retry button. Pass custom loading and error slots for branded states.",
    usage: `import { AxiomProvider } from "axiom-ui";
import { ServerQuery } from "axiom-ui/server-query";

<AxiomProvider
  config={{
    database: {
      baseUrl: "https://api.example.com",
      queryEndpoint: "/query",
      queries: {
        users: "SELECT id, name, email FROM users",
        stats: { path: "/dashboard/stats" },
      },
    },
  }}
>
  <ServerQuery query="users">
    {(rows) => <UserTable data={rows} />}
  </ServerQuery>
</AxiomProvider>`,
    props: [
      { name: "query", type: "ServerQueryInput<T>", required: true, description: "URL, function, named key, sql: string, or { sql, params }." },
      { name: "queryKey", type: "unknown", description: "Refetch when this value changes." },
      { name: "enabled", type: "boolean", defaultValue: "true", description: "Skip fetching when false." },
      { name: "initialData", type: "T", description: "Optional seed data before first fetch." },
      { name: "loading", type: "ReactNode", description: "Custom loading UI." },
      { name: "error", type: "ReactNode | (error, refetch) => ReactNode", description: "Custom error UI." },
      { name: "renderStatus", type: "(result) => ReactNode", description: "Full control over all states." },
      { name: "children", type: "(data: T, helpers) => ReactNode", required: true, description: "Render success state with server data." },
      { name: "onSuccess / onError", type: "callbacks", description: "Side effects after fetch completes." },
    ],
  },
];

export function getComponentApi(slug: string): ComponentApiDoc | undefined {
  return componentApiDocs.find((doc) => doc.slug === slug);
}

/** Flatten prop groups into a single list for table rendering. */
export function getAllProps(api: ComponentApiDoc): PropDoc[] {
  if (api.propGroups?.length) {
    return api.propGroups.flatMap((g) => g.props);
  }
  return api.props;
}
