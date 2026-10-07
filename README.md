# ngetech.studio

Landing page for Ngetech Solusi Indonesia. Astro, static output, ID (default) + EN.

## Commands
| | |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build:preview` | Build even with placeholders (for previews) |
| `pnpm build` | Production build. **Fails while any `TODO_` remains** in `src/data` or `src/i18n` |
| `pnpm preview` | Serve `dist/` |
| `pnpm test` | Playwright smoke tests (builds + serves on :4322) |
| `node scripts/assets.mjs` | Regenerate `public/og.png` + `favicon-32.png` (needs `pnpm preview` running) |

In the cloud dev container, Playwright needs `CHROMIUM_PATH=/opt/pw-browsers/chromium`.

## Where content lives
- Copy: `src/i18n/id.json`, `src/i18n/en.json`. Both must have the same keys, or the build fails.
- WhatsApp, email, legal name, GitHub org: `src/data/site.ts`
- Team: `src/data/team.ts`
- Project order + status: `src/data/projects.ts`

## Before launch
Fill every `TODO_` (run `pnpm check:content` to list them), then regenerate the OG image if the headline changed.

Docs: `docs/superpowers/specs/` (design spec), `docs/superpowers/plans/` (implementation plan), `docs/qa-2026-10-07.md`.
