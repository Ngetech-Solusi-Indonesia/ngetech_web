# Ngetech Landing — Implementation Plan

Spec: `docs/superpowers/specs/2026-10-07-ngetech-landing-design.md`
Date: 2026-10-07

Each task ends with a check that must pass before moving on. One commit per task.

## Decisions made for this plan
- **Hosting: Cloudflare Pages.** Static output, free tier, good POP coverage in Indonesia, and DNS for ngetech.studio can live in the same account. Vercel would also work; nothing in the code depends on the host.
- **Hero headline** uses "operasional" instead of "sekolah" until RFID is deployed:
  "Kami bikin software untuk operasional, event, dan bisnis di Bandung." (Can be changed in the i18n file alone.)
- **Node 22 LTS, Astro 5, pnpm.** No UI framework, no Tailwind: hand-written CSS with custom properties.

## Project structure

```
ngetech-web/
  astro.config.mjs          # i18n: defaultLocale id, locales [id, en], prefixDefaultLocale false
  package.json
  public/
    fonts/                  # self-hosted woff2 (latin subset)
    og.png
    robots.txt
  scripts/
    check-todo.mjs          # fails build if TODO_ remains in content
  src/
    i18n/
      id.json
      en.json
      index.ts              # t(locale, key), getLocaleFromUrl
    data/
      projects.ts           # name, status key, stack, image (optional)
      team.ts               # 5 entries, TODO_ placeholders
      site.ts               # waNumber, email, legalName, githubOrg
    styles/
      tokens.css            # colors, type scale, spacing, dark mode
      base.css
    components/
      Header.astro
      Hero.astro
      DemoPanels.astro      # 3 synced panels + timeline script
      Projects.astro
      ProjectCard.astro
      StatusLabel.astro
      Services.astro
      Team.astro
      Contact.astro
      Footer.astro
      LangSwitch.astro
    layouts/
      Base.astro            # <head>, hreflang, OG, fonts preload
    pages/
      index.astro           # id
      en/index.astro        # en
```

## Tasks

### T1. Scaffold
- `pnpm create astro@latest ngetech-web` (minimal template), git init.
- Configure `astro.config.mjs`: `site: 'https://ngetech.studio'`, i18n block, `@astrojs/sitemap`.
- Add `scripts/check-todo.mjs`, wired as `"build": "node scripts/check-todo.mjs && astro build"`, plus `"build:preview": "astro build"` for building with placeholders.
- **Check:** `pnpm build:preview` produces `dist/index.html` and `dist/en/index.html`. `pnpm build` fails, listing the TODO_ keys.

### T2. Design tokens + base styles
- Download Schibsted Grotesk (600/700), IBM Plex Sans (400/500), IBM Plex Mono (400). Subset to latin and convert to woff2. Preload the two above-the-fold fonts.
- `tokens.css`: accent `#0F9E8E`, background `#FAFAF7`, ink `#111`, neutral scale, a dark set under `prefers-color-scheme: dark`, a fluid type scale with `clamp()`, and 4px-base spacing.
- Verify accent contrast: if tosca on white is < 4.5:1 for body-size text, use a darker `--accent-text` for links/labels and keep `#0F9E8E` for fills only.
- `base.css`: reset, a 12-column grid with a 16px mobile gutter, and focus-visible styles.
- **Check:** a test page showing type specimens in light and dark. Contrast ratios are noted in the commit message.

### T3. i18n layer + content data
- `id.json` / `en.json` with keys per section (`hero.title`, `projects.inventory.desc`, `status.in_use`, …).
- `t()` helper: throws at build time if a key is missing in either locale.
- `site.ts`, `team.ts`, `projects.ts` with `TODO_` placeholders, per spec §7.
- Status keys: `in_use` → "Dipakai klien"/"In use by a client", `internal_testing` → "Uji coba internal"/"Internal testing", `in_development` → "Dalam pengembangan"/"In development".
- **Check:** removing a key from `en.json` breaks the build with a clear message.

### T4. Layout, header, footer, language switch
- `Base.astro`: lang attr, title/description per locale, `hreflang` id/en/x-default, canonical, OG tags.
- `LangSwitch`: links to the same path in the other locale and keeps the `#hash`.
- Footer: GitHub org, email, "Bandung, Indonesia", © year + legal name.
- **Check:** view-source on both pages shows correct `lang`, `hreflang`, and canonical.

### T5. Hero + demo panels
- Hero copy and CTAs (WhatsApp `https://wa.me/${waNumber}`, opened with `rel="noopener"`; secondary "Lihat proyek" → `#proyek`).
- `DemoPanels.astro`: three panels in plain HTML/CSS:
  1. RFID: a card icon taps, then a new row slides into the attendance list (name, time in mono).
  2. Inventory: the count ticks down, the row highlights, and an "updated" timestamp changes.
  3. NgeBooth: four frames fill in sequence, then the strip completes. Uses the NgeBooth lime here only.
- One shared timeline: a single `requestAnimationFrame` loop with a 6s period. Each panel reads phase `t ∈ [0,1)`, so they stay in sync. It pauses when off-screen (IntersectionObserver) and when the tab is hidden.
- `prefers-reduced-motion`: no script loop, each panel renders its final frame.
- Mobile: panels stack vertically. Only the first one animates below 480px, to save attention and battery.
- **Check:** the three panels stay in sync after 5 min (no drift). With reduced-motion on, nothing moves. JS for the hero is < 3KB gzipped.

### T6. Projects
- `ProjectCard` + `StatusLabel` (mono, small caps, colored dot: green for in_use, amber for testing, grey for in development).
- Order: Inventory, NgeBooth, RFID.
- The NgeBooth card gets a scoped lime accent + Poppins wordmark image (SVG, so the Poppins font isn't loaded).
- An image slot per card, falling back to the matching demo panel's static frame until screenshots arrive.
- **Check:** labels match spec §4.2 in both languages. The RFID card mentions no client, school, or city.

### T7. Services, Team, Contact
- Services: a numbered list (`01`–`04`) with mono numbering. No icons.
- Team: 5 cards, initials block (derived from the name, so `TODO_` shows as "TO" in preview), name, role, optional links.
- Contact: a large WhatsApp button + email + location.
- **Check:** the whole page works with JS disabled, apart from the hero animation.

### T8. Scroll motion + polish
- One small `IntersectionObserver` adding `.is-visible`: opacity 0→1, translateY 8px→0, 200ms. Off under reduced-motion.
- Copy pass against spec §2 (grep for banned words: seamless, cutting-edge, empower, leverage, inovatif, revolusi…). Add the grep to `check-todo.mjs` as a warning.
- **Check:** the banned-word grep is clean.

### T9. SEO + assets
- `og.png` (1200×630) rendered from the hero via Playwright screenshot script `scripts/og.mjs`.
- `robots.txt`, sitemap (from the integration), favicon (SVG mark + 32px PNG fallback).
- **Check:** `dist/sitemap-index.xml` lists `/` and `/en/`. OG preview validates.

### T10. QA
- Playwright smoke test (`tests/smoke.spec.ts`): both locales load, the lang switch works, the WA link has the correct format, and there are no console errors.
- Lighthouse mobile on `astro preview`: ≥95 in all four categories. Total transfer < 300KB.
- Manual pass at 360px, 768px and 1440px, in light and dark mode.
- **Check:** all of the above recorded in `docs/qa-2026-10-07.md`.

### T11. Deploy
- Push to a GitHub repo under the Ngetech org.
- Cloudflare Pages: connect the repo, build command `pnpm build`, output `dist`, Node 22.
- Until the placeholders are filled, deploy previews use `build:preview`. Production (`pnpm build`) is blocked by the TODO check, by design.
- DNS: add ngetech.studio to Cloudflare, with an apex CNAME to the Pages project and `www` redirecting to the apex. HTTPS automatic.
- **Check:** https://ngetech.studio serves the ID page and `/en/` serves English.

### Phase 2 (after launch)
- Replace the demo-panel fallbacks in the project cards with real screenshots of Inventory and NgeBooth (provided by you, since the deployments are on the LAN).
- Optional: short muted MP4/WebM loops of the real UIs, lazy-loaded.
- Add RFID's status/screenshot when it's deployed. Change the headline back to include "sekolah" if it fits.

## Blocking inputs (needed before T11 production)
WhatsApp number · 5 team names + roles · legal entity name · confirmed contact email · GitHub org/repo name for the site.

## Implementation notes (T1–T10 done, 2026-10-07)
Changes from the plan above, made during the build:
- **Astro 7** (latest at build time) instead of 5. `astro preview` takes a lock file, so tests start it with `--ignore-lock`.
- **Fonts from `@fontsource` npm packages** instead of Google Fonts (blocked from the build container). Same files, OFL licence.
- **CSS inlined** (`build.inlineStylesheets: 'always'`) to remove a render-blocking request (~650 ms on mobile).
- **Project cards have no image fallback.** Repeating the hero panels in the cards felt redundant. Cards are text-only until real screenshots arrive (`image` field in `src/data/projects.ts`).
- **All three demo panels animate on mobile** instead of only the first. It costs no extra since the loop pauses off-screen.
- **NgeBooth wordmark:** a lime/dark swatch stands in until the real SVG is provided.
- Commits: one initial commit, not one per task. The work was done in a single pass.
