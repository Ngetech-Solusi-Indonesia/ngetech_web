# ngetech.studio

Landing page for Ngetech Solusi Indonesia. Astro, static output, ID (default) + EN.

## Commands
| | |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build:preview` | Build even with placeholders (for previews) |
| `pnpm build` | Production build. **Fails while any `TODO_` remains** in `src/data` or `src/i18n` |
| `pnpm preview` | Serve the built site locally (Cloudflare Workers runtime) |
| `pnpm cms:setup` | Run dev with Keystatic in GitHub mode (one-time GitHub App setup) |
| `pnpm deploy` | Build and deploy to Cloudflare Workers via wrangler |
| `pnpm test` | Playwright smoke tests (builds + serves on :4322) |
| `node scripts/assets.mjs` | Regenerate `public/og.png` + `favicon-32.png` (needs `pnpm preview` running) |

In the cloud dev container, Playwright needs `CHROMIUM_PATH=/opt/pw-browsers/chromium`.

## Editing content (CMS)
Content is edited in Keystatic at `/keystatic` (see `docs/cms.md`, in Indonesian). Saving commits to GitHub and the site rebuilds automatically.

## Where content lives
- Page text (ID + EN side by side): `src/content/page.json`
- Contact info: `src/content/site.json`
- Products (+ screenshots in `src/assets/products/`): `src/content/products/`
- Team and profiles: `src/content/team/`
- Interface strings (demo app, nav, labels): `src/i18n/id.json`, `src/i18n/en.json`. Both must have the same keys, or the build fails.

## Before launch
Fill every `TODO_` (run `pnpm check:content` to list them), then regenerate the OG image if the headline changed.

Design system: `DESIGN.md` (+ `.impeccable/design.json`); product truth: `PRODUCT.md`; direction contract: `.impeccable/surfaces/`.

After regenerating `og.png` / `favicon-32.png`, re-embed their origin with impeccable's `embed-prompt` (see `.impeccable/surfaces/`), or note how they were made.

NgeBooth photos: put four images in `public/ngebooth/` and list them in `src/data/ngebooth.ts`; the demo strip uses them automatically.

Docs: `docs/superpowers/specs/` (design spec), `docs/superpowers/plans/` (implementation plan), `docs/qa-2026-10-07.md`.
