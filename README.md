# AsriUI

Production-ready React UI components.

**asriui** is an accessible, type-safe, tree-shakable component library built for React 18+, Vite, and Next.js (SSR-friendly).

## Documentation

| Resource | Where |
| --- | --- |
| Live docs & demos | Run `pnpm dev` → http://localhost:5173 |
| Storybook | Run `pnpm storybook` → http://localhost:6006 |
| Changelog (repo) | [`CHANGELOG.md`](./CHANGELOG.md) |
| Changelog (docs site) | [`site/docs/changelogData.ts`](./site/docs/changelogData.ts) |
| Roadmap (docs site) | [`site/docs/roadmapData.ts`](./site/docs/roadmapData.ts) |
| Contributing & PR acceptance | [`CONTRIBUTING.md`](./CONTRIBUTING.md) |
| Pull request template | [`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md) |

## Features

- TypeScript (strict)
- Accessible by default (semantic HTML, keyboard support, ARIA where needed)
- Themeable via CSS variables (`data-theme="light" | "dark"`)
- Tree-shakable ESM builds with subpath exports
- Apple-style spring motion (Framer Motion)
- SSR friendly
- Tested with Vitest + React Testing Library
- Storybook documentation

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

## Getting Started

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

Also available via subpath exports: Accordion, Badge, Breadcrumb, Calendar, DataGrid, Dialog, Form, Label, Link, List, LoginForm, PageLayout, ServerQuery, SideNav, Switch, Table, Tabs, Timeline, Toast, VirtualList, and more. See Storybook or the docs site for full APIs.

## Theming

AsriUI uses CSS custom properties. Toggle themes with a root attribute — no React context required:

```tsx
<div data-theme="dark">
  <Button>Save</Button>
</div>
```

Override tokens in your app:

```css
:root {
  --asriui-color-primary: #0ea5e9;
}
```

## Changelog & roadmap

- **Changelog** — notable releases live in [`CHANGELOG.md`](./CHANGELOG.md). The docs site reads from [`site/docs/changelogData.ts`](./site/docs/changelogData.ts); keep both in sync when documenting shipments.
- **Roadmap** — product milestones and Now / Next / Later phases live in [`site/docs/roadmapData.ts`](./site/docs/roadmapData.ts) (rendered on the docs Roadmap page).

**Current focus (roadmap “Now”):** Combobox / multi-select, Form field arrays, Storybook coverage, and an accessibility audit.

**Recently shipped:** Menu, Dropdown, DatePicker, Tooltip, ServerQuery, Calendar, docs search, PWA, and page templates.

## Development

Requirements: Node.js ≥18, [pnpm](https://pnpm.io) 9.

```bash
pnpm install
pnpm dev             # marketing front page at http://localhost:5173
pnpm storybook       # component playground at http://localhost:6006
pnpm test            # watch mode
pnpm test:run        # CI
pnpm lint
pnpm typecheck
pnpm build           # library → dist/ (preserveModules chunks)
pnpm verify:treeshake
pnpm build:site      # front page → site-dist/
```

## Testing

```bash
pnpm test:run
```

Behavioral tests cover rendering, interaction, keyboard use, and accessibility attributes.

## Storybook

```bash
pnpm storybook
pnpm build-storybook
```

Includes Controls, Actions, Docs, and the Accessibility addon, plus a light/dark theme toolbar.

## Release process

This package uses [Changesets](https://github.com/changesets/changesets).

```bash
pnpm changeset           # describe your change
pnpm version-packages    # apply versions + changelog
pnpm release             # build and publish to npm
```

On `main`, the Release GitHub Action opens a Version Packages PR when changesets exist, then publishes after that PR is merged. Prefer npm Trusted Publishing (OIDC). Optionally set `NPM_TOKEN` as a repository secret for token-based auth.

You can also run **Release** from the Actions tab (`workflow_dispatch`) after merging.

## GitHub Pages and custom domains

The **GitHub Pages** workflow builds the docs site and deploys it on every push to `main` (and on manual run).

1. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Optional repository **Variables** (Settings → Secrets and variables → Actions → Variables):

| Variable | When to set | Example |
| --- | --- | --- |
| `SITE_URL` | Canonical public URL (custom domain or project Pages) | `https://ui.example.com` or `https://you.github.io/ui` |
| `SITE_DOMAIN` | Custom domain — writes a `CNAME` file into the deploy | `ui.example.com` |
| `BASE_PATH` | Path prefix if the site is not at `/` | `/ui/` for `https://you.github.io/ui` |

If you set nothing, the workflow uses `https://<owner>.github.io/<repo>/` with `BASE_PATH=/<repo>/`. User/org sites named `<owner>.github.io` default to `/`.

**Custom domain**

1. Set `SITE_DOMAIN` (and usually `SITE_URL` + `BASE_PATH=/`).
2. Point DNS at GitHub Pages: a `CNAME` record for a subdomain to `<owner>.github.io`, or apex `A`/`ALIAS` records as in [GitHub’s docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
3. After the first deploy, GitHub Pages will pick up the `CNAME` file. Enable HTTPS in Settings → Pages.

**Local / other hosts** (Netlify, Cloudflare, S3, nginx):

```bash
VITE_SITE_URL=https://docs.example.com VITE_BASE_PATH=/ pnpm build:pages
```

Upload the `site-dist/` folder. `404.html` is a copy of `index.html` so client-side routes work on GitHub Pages; `public/_redirects` covers Netlify.

## Contributing & pull request acceptance

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for full criteria. In short:

1. Fork and create a focused feature branch.
2. Add or update components under `src/components/` with tests and stories.
3. Run `pnpm lint`, `pnpm typecheck`, `pnpm test:run`, and `pnpm build`.
4. Add a changeset with `pnpm changeset` for publishable changes.
5. Update changelog / roadmap data when shipping notable features.
6. Open a PR — GitHub fills [`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md).

**Accepted when:** CI is green, checklist is complete, docs/Storybook reflect API changes, and a maintainer has reviewed (or the change is a trivial docs/chore).

## License

MIT
