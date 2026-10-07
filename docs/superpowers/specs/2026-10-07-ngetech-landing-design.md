# Ngetech Solusi Indonesia — Landing Page Design Spec

Date: 2026-10-07
Status: Draft, awaiting review
Domain: ngetech.studio

## 1. Goal

A single landing page that tells a visitor what Ngetech builds, shows the real work, and gets them to message us on WhatsApp. Every claim on the page must be true at launch.

## 2. Hard rules (anti-"AI slop")

**Visual: none of these**
- Dot grids, blur blobs, gradient meshes, glassmorphism
- 3D tilt cards, glowing borders, neon shadows
- Logo walls of clients we don't have
- Badges like "Trusted by 100+ companies" or "AI-powered"
- Stock photos or AI-generated people

**Copy: none of these**
- "Not just X, but Y" / "X, not Y" constructions
- Forced puns on "Ngetech"
- Invented numbers (uptime, number of clients, years of experience)
- Buzzwords: seamless, cutting-edge, empower, leverage, next-level, revolutionize, solusi inovatif
- Status labels that overstate where a product is

## 3. Visual system (Option C: clean / startup)

| Token | Value |
|---|---|
| Display / headings | Schibsted Grotesk (600, 700) |
| Body | IBM Plex Sans (400, 500) |
| Data / labels / status | IBM Plex Mono (400) |
| Accent | Single tosca, e.g. `#0F9E8E` (final value checked for AA contrast on white and on dark) |
| Neutrals | Warm-neutral greys, off-white background `#FAFAF7`, ink `#111` |
| Radius | 6px max; most surfaces square |
| Shadows | None, or a single 1px border |
| Dark mode | Supported through `prefers-color-scheme`, with the same accent |

Layout is editorial: left-aligned text, a visible grid, and a lot of whitespace. Section labels use mono small caps (e.g. `01 — PROYEK`).

**Motion**
- Hero demo panels animate in sync (see §4.1). This is the only "showpiece" animation.
- Everything else: short fade/translate on scroll (≤200ms, 8px max), no parallax.
- With `prefers-reduced-motion`: all motion is off and panels show a static frame.

**NgeBooth exception:** NgeBooth's own brand (lime accent, Poppins wordmark) is kept inside its project card and screenshot only. The rest of the page stays tosca.

## 4. Sections

### 4.1 Hero
- Headline: a plain statement of what we do (Indonesian first). Draft:
  "Kami bikin software untuk sekolah, event, dan bisnis di Bandung."
  EN: "We build software for schools, events and businesses in Bandung."
- Sub: one sentence naming the three kinds of systems (attendance, inventory, photobooth).
- Primary CTA: **Chat di WhatsApp** → `https://wa.me/<TODO_WA_NUMBER>`
- Secondary: link that scrolls to Proyek.
- Visual: three small demo panels animating in sync on a ~6s loop:
  1. RFID: a card tap adds a row to an attendance list
  2. Inventory: a stock count decrements and a row updates
  3. NgeBooth: a photo strip fills in
  The panels are built in HTML/CSS (no video) and are replaced by real screenshots or recordings in phase 2 where available.

### 4.2 Proyek (Projects)
Each card has a name, a one-line description, what it does, the stack, and a **status label in mono**. The labels must match reality:

| Project | Status label (ID / EN) | Notes |
|---|---|---|
| Sistem Inventaris | `Dipakai klien` / `In use by a client` | Client not named. Real UI screenshot in phase 2. |
| NgeBooth | `Uji coba internal` / `Internal testing` | Keeps its own lime/Poppins branding inside the card. |
| Absensi RFID | `Dalam pengembangan` / `In development` | Not deployed. No client, school type, or city mentioned. |

Order: Inventory first, because it's the only one in production.

### 4.3 Yang kami kerjakan (What we do)
Three to four short lines, each one concrete:
- Web apps and dashboards for internal operations
- Hardware + software integration (RFID readers, cameras, printers)
- Event tools (photobooth)
- Maintenance after launch

No icons-in-circles grid. It's a plain list with mono numbering.

### 4.4 Tim (Team)
- Five people. Each has a name, role, and optional GitHub/LinkedIn link.
- No photos at launch. Use a neutral initials block (mono initials on a tinted square), not avatars or illustrations.
- All five are `TODO` placeholders until real data is provided. The build fails if a `TODO` remains in production content (see §6).

### 4.5 Kontak (Contact) / footer
- A WhatsApp button (primary) and an email link (`halo@ngetech.studio`, TODO: confirm the mailbox exists).
- Location: "Bandung, Indonesia". No street address unless provided.
- GitHub org link.
- Language switch: ID / EN.
- © year, PT/CV legal name as registered (TODO: confirm the legal entity name).

## 5. i18n
- Indonesian is the default at `/`. English is at `/en/`.
- Strings live in `src/i18n/{id,en}.json`. No machine-translated EN copy ships without review.
- `hreflang` tags plus a language switch that keeps you on the same section.

## 6. Tech
- **Astro** (static output), no client framework. Hero animation is plain CSS + a small vanilla JS timeline.
- Fonts self-hosted (woff2, subset latin), `font-display: swap`.
- Images: Astro `<Image>` producing AVIF/WebP.
- Content guard: a build step that fails if `TODO_` strings remain in `id`/`en` content.
- Targets: Lighthouse ≥95 on all four categories on mobile, page weight <300KB excluding screenshots.
- SEO: title, description, OG image (static, made from the hero), `sitemap.xml`, `robots.txt`.
- Hosting: static host (Cloudflare Pages or Vercel) with DNS for ngetech.studio. Decided in the implementation plan.

## 7. Open items (placeholders)
| Item | Owner | Blocks |
|---|---|---|
| WhatsApp number | User | Launch |
| 5 team names + roles (+ links) | User | Launch |
| Legal entity name for footer | User | Launch |
| Contact email confirmed | User | Launch |
| Inventory + NgeBooth screenshots (from local deployments) | User / phase 2 | Not launch; HTML demo panels ship first |

## 8. Out of scope
- Blog, careers page, pricing
- Contact form / backend (WhatsApp + email only)
- Analytics beyond a privacy-friendly pageview counter (optional)
