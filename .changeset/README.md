# Changesets

This folder stores changeset files that describe package version bumps for **asriui**.

## Workflow

1. Make your changes.
2. Run `pnpm changeset` and describe the change (patch / minor / major).
3. Commit the generated markdown file in `.changeset/`.
4. On merge to `main`, the Release GitHub Action opens a Version Packages PR (or updates it).
5. Merge that PR to publish to npm via Changesets.

Never edit the published version in `package.json` by hand for normal releases.
