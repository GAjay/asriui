# Contributing to AsriUI

Thanks for helping improve AsriUI. This guide covers local setup, how we review work, and what must be true before a pull request is accepted.

## Development setup

Requirements: Node.js ≥18 and [pnpm](https://pnpm.io) 9.

```bash
pnpm install
pnpm dev             # site at http://localhost:5173
pnpm storybook       # components at http://localhost:6006
pnpm test            # watch mode
pnpm lint
pnpm typecheck
pnpm build
```

## Branch & PR workflow

1. Fork (or create a branch from `main`).
2. Keep the change focused — one concern per PR when practical.
3. Add or update tests and Storybook stories for component work.
4. Run checks locally before opening the PR.
5. For publishable library changes, add a changeset: `pnpm changeset`.
6. Open a PR using the GitHub template (summary, test plan, checklist).

## Pull request acceptance criteria

A PR is ready to merge when:

| Criterion | Expectation |
| --- | --- |
| Scope | Clear summary; related issue linked when applicable |
| Quality | Lint, typecheck, and tests pass in CI |
| Coverage | Behavior covered by tests; a11y basics (roles, keyboard, labels) for interactive UI |
| Docs | Component API / usage updated in docs or Storybook when the public API changes |
| Release notes | Changeset for npm-facing changes; update `CHANGELOG.md` + `site/docs/changelogData.ts` for notable features |
| Roadmap | Update `site/docs/roadmapData.ts` when a roadmap item ships or priorities change |
| Review | At least one approving review (or maintainer merge for trivial docs/chores) |
| Secrets | No credentials, tokens, or private env files |

### What reviewers look for

- **API consistency** with existing compound components and CSS variable tokens
- **Accessibility** — focus order, Escape to dismiss overlays, labeled controls
- **SSR / portals** — overlays that portal to `document.body` should not break SSR
- **Tree-shaking** — prefer subpath exports (`asriui/button`) over bloating the barrel
- **Theming** — light/dark and band/surface tokens remain readable

### When we may request changes

- Missing changeset for a public API or visual behavior change
- No test plan or unverifiable UI change without screenshots
- Breaking changes without a migration note
- Unrelated refactors mixed into a feature PR

## Documentation sources of truth

| Audience | Location |
| --- | --- |
| Package overview | [`README.md`](./README.md) |
| Release history (repo) | [`CHANGELOG.md`](./CHANGELOG.md) |
| Docs site changelog | [`site/docs/changelogData.ts`](./site/docs/changelogData.ts) |
| Docs site roadmap | [`site/docs/roadmapData.ts`](./site/docs/roadmapData.ts) |
| PR template | [`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md) |

Keep `CHANGELOG.md` and `changelogData.ts` in sync when you document a release.

Publishing: merge to `main` so Changesets can publish npm, and so the GitHub Pages workflow can deploy the docs site (any custom domain via `SITE_DOMAIN` / `SITE_URL` variables). See the README **Release process** and **GitHub Pages** sections.

## Code style

- Match existing patterns in `src/components/` (compound APIs, CSS modules, tokens).
- Prefer small, focused commits; avoid drive-by formatting of unrelated files.
- Do not commit generated `dist/` or `.next/` artifacts.

## License

By contributing, you agree that your contributions are licensed under the MIT License.
