# Design refresh QA — 2026-10-07

## Result
The visual refresh is ready to review locally. The checked-in source was copied to an isolated NTFS runtime with Astro 7.3.6, Sharp 0.35.5, and Playwright 1.63.0. This runtime omits hosting and CMS integrations; it verifies the public frontend rather than the production Cloudflare deployment.

- Static Astro build: passed, all 13 public routes generated, including ID/EN and team profiles.
- Playwright smoke tests: 15 passed in 11.2 seconds using the installed Microsoft Edge executable.
- Coverage: both languages; correct product statuses; WhatsApp destinations; language switch hash; inventory updates/search; RFID keyboard navigation and tap; NgeBooth session; SEO metadata; team profiles; phone overflow and scroll progress; reduced motion; readable content without JavaScript.
- Manual browser review: default desktop viewport and 390 × 844 mobile. Reviewed the hero, loaded product screenshots, team cards, and contact panel. No layout issues observed.
- Source content check: passed.

## Changes
Centered oversized hero with teal emphasis, subtle grid and moving halo; framed interactive demo; capability strip; one-time scroll reveals; small hover feedback; animated hardware signal; header reading progress; refreshed product, team, and contact surfaces. All ambient motion pauses offscreen and in hidden tabs. Reduced motion disables decorative movement.

## Artifacts and limitations
Screenshots in docs/previews are direct browser captures. public/og.png is regenerated from the local hero using scripts/assets.mjs with reduced motion and a light 1200 × 630 viewport. No artwork or customer evidence was invented.

The original package.json dependency versions and original pnpm-lock.yaml were restored after installation troubleshooting. Temporary incomplete dependency directories on E: were retained as ignored backups. Production hosting/CMS build and deployment were not validated or performed. The review server runs from the isolated temporary runtime on http://127.0.0.1:4323/.
