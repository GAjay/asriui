# AsriUI

Production-ready React UI components.

**asriui** is an accessible, type-safe, tree-shakable component library built for React 18+, Vite, and Next.js (SSR-friendly).

**Docs:** [gajay.github.io/asriui](https://gajay.github.io/asriui/)

## Features

- TypeScript (strict)
- Accessible by default (semantic HTML, keyboard support, ARIA where needed)
- Themeable via CSS variables (`data-theme="light" | "dark"`)
- Tree-shakable ESM builds with subpath exports
- Apple-style spring motion (Framer Motion)
- SSR friendly

## Installation

```bash
pnpm add asriui framer-motion
```

Also works with npm and yarn. Peer dependencies: `react`, `react-dom` (≥18), and `framer-motion` (≥11).

Import styles once in your application:

```tsx
import "asriui/style.css";
```

## Configuration

Wrap your app with `AsriUIProvider` to configure theme, fonts, analytics, and error monitoring from a single object:

```tsx
import { AsriUIProvider } from "asriui/config";
import { Button } from "asriui";
import "asriui/style.css";

export function App() {
  return (
    <AsriUIProvider
      config={{
        theme: "light", // "light" | "dark" | "system"
        fontFamily: '"Work Sans", ui-sans-serif, sans-serif',
        analytics: {
          enabled: true,
          gtmId: "GTM-XXXX",
          dataLayerName: "dataLayer",
        },
        monitoring: {
          enabled: true,
          reportUrl: "/api/errors",
        },
      }}
    >
      <Button>Get Started</Button>
    </AsriUIProvider>
  );
}
```

| Option | Description |
| --- | --- |
| `theme` | `light`, `dark`, or `system` (follows OS preference) |
| `fontFamily` | Sets `--asriui-font-family` on the document root |
| `analytics.gtmId` | Injects GTM; `Button` and `Link` emit `asriui_button_click` / `asriui_link_click`. Override per instance with `trackEvent`, `trackLabel`, and `trackPayload`. |
| `monitoring.reportUrl` | `ErrorBoundary` POSTs caught errors to this endpoint |

## Getting started

```tsx
import { AsriUIProvider } from "asriui/config";
import { Button } from "asriui";
import "asriui/style.css";

export default function App() {
  return (
    <AsriUIProvider config={{ theme: "light" }}>
      <Button>Get Started</Button>
    </AsriUIProvider>
  );
}
```

Subpath imports load only that component chunk (recommended for the smallest bundles):

```tsx
import { Button } from "asriui/button";
import { Input } from "asriui/input";
import { Menu } from "asriui/menu";
import { Dropdown } from "asriui/dropdown";
import { DatePicker } from "asriui/date-picker";
import { Tooltip } from "asriui/tooltip";
import { Markdown } from "asriui/markdown";
import { cn } from "asriui/utils";
import { useAsriUIId } from "asriui/hooks";
import "asriui/style.css";
```

The main barrel also tree-shakes unused exports when your bundler supports ESM dead-code elimination:

```tsx
import { Button } from "asriui";
```

## Components

### Button

```tsx
<Button variant="primary" size="md">
  Create
</Button>

<Button variant="danger">Delete</Button>

<Button loading>Saving...</Button>
```

Variants: `primary` | `secondary` | `outline` | `ghost` | `danger`  
Sizes: `sm` | `md` | `lg`

### Input

```tsx
<Input
  label="Email"
  placeholder="Enter your email"
  helperText="We will never share your email."
  error="Invalid email"
/>
```

### Card

```tsx
<Card>
  <Card.Header>
    <Card.Title>Account</Card.Title>
  </Card.Header>
  <Card.Content>Account information</Card.Content>
  <Card.Footer>
    <Button>Save</Button>
  </Card.Footer>
</Card>
```

### Menu

Action menus with portal positioning and keyboard navigation:

```tsx
import { Menu } from "asriui/menu";

<Menu>
  <Menu.Trigger>Actions</Menu.Trigger>
  <Menu.Content aria-label="Row actions">
    <Menu.Item onSelect={() => {}}>Edit</Menu.Item>
    <Menu.Item onSelect={() => {}}>Delete</Menu.Item>
  </Menu.Content>
</Menu>
```

### Dropdown

Searchable select-style control:

```tsx
import { Dropdown } from "asriui/dropdown";

<Dropdown
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ]}
  value={value}
  onValueChange={setValue}
  searchable
  placeholder="Choose a framework"
/>
```

### DatePicker

Single or range date/datetime with typed formats (`dateFormat`: `iso` | `us` | `eu`):

```tsx
import { DatePicker } from "asriui/date-picker";

<DatePicker
  value={date}
  onValueChange={setDate}
  dateFormat="iso"
  disablePast
/>

<DatePicker
  mode="range"
  rangeValue={range}
  onRangeValueChange={setRange}
/>
```

### Tooltip

```tsx
import { Tooltip } from "asriui/tooltip";

<Tooltip>
  <Tooltip.Trigger>
    <Button>Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>Helpful hint</Tooltip.Content>
</Tooltip>
```

### Markdown

Render docs, changelogs, and CMS snippets (fenced code uses `CodeBlock`):

```tsx
import { Markdown } from "asriui/markdown";

<Markdown
  source={`# Hello

Install with \`pnpm add asriui\`.

- Accessible
- Themeable
`}
/>
```

### More components

Also available via subpath exports: Accordion, Badge, Breadcrumb, Calendar, DataGrid, Dialog, Form, Label, Link, List, LoginForm, PageLayout, ServerQuery, SideNav, Switch, Table, Tabs, Timeline, Toast, VirtualList, and more. See the [docs site](https://gajay.github.io/asriui/docs/components/button) for full APIs and live examples.

## Theming

AsriUI uses CSS custom properties. Toggle themes with a root attribute — no React context required:

```tsx
<div data-theme="dark">
  <Button>Save</Button>
</div>
```

Or use `AsriUIProvider` with `theme: "dark" | "light" | "system"`.

Override tokens in your app:

```css
:root {
  --asriui-color-primary: #0ea5e9;
}
```

## License

MIT
