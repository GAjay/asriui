# Changelog

All notable changes to AxiomUI are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- **Menu** — dropdown action menu with portal positioning, keyboard navigation, groups, and `role="dialog"` support for rich panels
- **Dropdown** — select-style control with searchable type-to-filter, scrollable option lists, and portal rendering
- **DatePicker** — single/range date and datetime picker with typed input (`iso` / `us` / `eu`), `disablePast`, min/max, and calendar popover
- **Tooltip** — hover/focus tooltip with placement, delay, and portal content
- **Markdown** — lightweight Markdown renderer (headings, lists, tables, links, fenced CodeBlock) with zero markdown dependencies
- **Timeline** — vertical/horizontal orientation, config-driven `items`, and per-status `statusColors`
- ServerQuery component and `useServerQuery` hook for API-driven UI with loading, error, and retry
- Calendar component with multi-slot-per-day booking
- Docs search in sidebar with component and guide filtering
- Docs TOC scroll-spy (active section highlighting in the right sidebar)
- Site theme toggle across landing, docs, and template demos
- Page templates section on landing page with live demos
- PWA support via vite-plugin-pwa (manifest, service worker, install prompt)
- Roadmap and Changelog guide pages in documentation
- Landing header Menu mega-panel with Explore links and component search
- Custom landing header search suggestions (replaces native datalist)

### Changed

- Landing hero height is content-driven with viewport `min-height` (no fixed `100dvh` clipping)
- Landing “Why AxiomUI” and “Page templates” bands use band-aware surface tokens for contrast
- Menu / Dropdown panels portal to `document.body` with viewport-aware positioning
- Docs category group labels use high-contrast title colors
- Docs pages scroll to top on route change
- Templates breadcrumb navigation back to component docs

### Fixed

- Menu hover contrast (inverted foreground/background) for readable labels
- Landing Menu panel alignment (`bottom-end` + `right` anchoring)
- Landing Explore link row height (compact list)
- Doc pages starting scrolled to bottom when navigating between components
- Missing navigation when landing on live template demos

## [0.1.0] - 2026-01-15

### Added

- Button, Input, Card, Dialog, Tabs, Accordion, Switch, Badge, Label
- Table and DataGrid (native engine) with sorting and export
- Toast provider with imperative toast() API
- LoginForm and OAuthButton (Microsoft, Google, GitHub, Apple)
- AxiomProvider for theme, motion presets, GTM analytics, and error monitoring
- Tree-shakable subpath exports (axiom-ui/button, axiom-ui/data-grid, etc.)
- CSS variable theming with light/dark modes

### Changed

- Package exports flattened to dist/*.js for better bundler compatibility

## [0.0.1] - 2025-11-01

### Added

- Vite library mode with preserveModules tree-shaking
- Vitest + React Testing Library test setup
- Storybook 8 with accessibility addon
- Changesets for versioning and releases
- ESLint, Prettier, and GitHub Actions CI

[Unreleased]: https://github.com/axiom-ui/axiom-ui/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/axiom-ui/axiom-ui/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/axiom-ui/axiom-ui/releases/tag/v0.0.1
