---
name: NgeTech Solusi Indonesia
description: Landing site for a five-person software and hardware team in Bandung.
colors:
  ground: "#FAFAFA"
  surface: "#FDFDFD"
  surface-raised: "#F3F3F4"
  surface-sunk: "#EAEAEC"
  ink: "#111113"
  ink-secondary: "#47474F"
  ink-tertiary: "#6B6B74"
  hairline: "#E6E6E9"
  hairline-strong: "#D6D6DB"
  state-teal: "#0C7686"
  state-teal-soft: "#E2F5F8"
  state-teal-line: "#A8DCE5"
  caution: "#8A5300"
  caution-soft: "#FBF0DC"
  invert: "#111113"
  ground-dark: "#0B0B0C"
  surface-dark: "#121214"
  surface-raised-dark: "#18181B"
  surface-sunk-dark: "#222226"
  ink-dark: "#EDEDEF"
  ink-secondary-dark: "#B4B4BC"
  ink-tertiary-dark: "#8E8E97"
  hairline-dark: "#232327"
  hairline-strong-dark: "#303036"
  state-teal-dark: "#45C6DB"
  state-teal-soft-dark: "#0F2C31"
  state-teal-line-dark: "#1E5660"
  caution-dark: "#F0B65A"
  caution-soft-dark: "#33260F"
  invert-dark: "#1C1C20"
  ngebooth-ground: "#141513"
  ngebooth-viewfinder: "#1D1E1B"
  ngebooth-frame: "#2B2D28"
  ngebooth-frame-empty: "#DCDCD5"
  ngebooth-frame-label: "#8B8B84"
  ngebooth-ink: "#EFEFEA"
  ngebooth-ink-secondary: "#A3A39B"
  ngebooth-lime: "#D5F267"
  shadow-hairline: "#00000014"
typography:
  display:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.5rem + 3.9vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  numeral:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    fontFeature: "'tnum' on"
  closing:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.8vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  countdown:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "5rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  brand:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    letterSpacing: "-0.02em"
  caption:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.3
  micro:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.25
  label:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "'tnum' on"
rounded:
  hairline: "2px"
  badge: "4px"
  inner: "6px"
  control: "8px"
  surface: "12px"
  pill: "999px"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "32px"
  section: "clamp(64px, 7vw, 104px)"
  max-width: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 18px"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 18px"
  status-live:
    backgroundColor: "{colors.state-teal-soft}"
    textColor: "{colors.state-teal}"
    rounded: "{rounded.pill}"
    height: "24px"
    padding: "0 10px"
  status-testing:
    backgroundColor: "{colors.caution-soft}"
    textColor: "{colors.caution}"
    rounded: "{rounded.pill}"
    height: "24px"
    padding: "0 10px"
  surface-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.surface}"
    padding: "clamp(24px, 3vw, 36px)"
---

# Design System: NgeTech Solusi Indonesia

## Overview

**Creative North Star: "The Working Product"** (proposed; rename freely)

The site is the category standard for a software company, executed straight at the craft level of Linear and Vercel. The product is the hero: a working mini app with three tabs (inventory, RFID attendance, NgeBooth) that visitors can click, labelled as sample data. Everything around it stays quiet so the demo and the WhatsApp action carry the page.

Density is low and the grid is calm: a single 1200px column, left-aligned headings, hairlines instead of boxes wherever grouping is enough. Colour is neutral zinc with one teal used only to show that something changed or is live. Light and dark follow the system setting and carry the same hierarchy. The accent and the header mark come from the official NgeTech logo (teal cup, green leaf, circuit); the logo is used unmodified.

Rejected for this site (user decision): the editorial label-and-hairline look of the first version, div-built fake screenshots, and the Bandung-distro direction offered by the concept roll.

**Key Characteristics:**
- One family (Geist), tight negative tracking at display sizes, tabular figures for data.
- Neutral zinc ground; off-black ink; teal reserved for state.
- 12px surfaces, 8px controls, pills only for status.
- The demo is real UI with real state, never a picture of UI.

## Colors

Neutral zinc with one state colour; no warm or cream cast.

### Primary
- **State Teal** (#0C7686 light, #45C6DB dark), taken from the logo cup (#1495A6 darkened for AA; the cup's mid cyan in dark mode): live status, stock-in deltas, the "after" state, focus rings, text selection. Never decoration, never a large fill.

### Neutral
- **Zinc Ground** (#FAFAFA / #0B0B0C): page background.
- **Surface** (#FDFDFD / #121214), **Raised** (#F3F3F4 / #18181B), **Sunk** (#EAEAEC / #222226): layered surfaces for windows, rails and cells.
- **Ink** (#111113 / #EDEDEF), **Ink Secondary** (#47474F / #B4B4BC), **Ink Tertiary** (#6B6B74 / #8E8E97): text hierarchy; all at least 4.5:1 on their grounds.
- **Hairline** (#E6E6E9 / #232327), **Hairline Strong** (#D6D6DB / #303036): dividers and control borders.
- **Caution** (#8A5300 on #FBF0DC): "internal testing" and "low stock" only.

### Named Rules
**The State-Only Teal Rule.** Teal marks something live or something that just changed. A teal fill on a whole card or a decorative icon breaks it.
**The One Theme Rule.** No section inverts mid-page. Cells differ by content, not by flipping light and dark.
**The NgeBooth Exception.** NgeBooth's own lime (#D5F267, sampled from its landing page) on near-black (#141513) and its wordmark appear only inside NgeBooth's own surfaces.

## Typography

**Display, Body and Label Font:** Geist (variable, self-hosted), with a metric-adjusted Arial fallback.

**Character:** Vercel's own face. It is neutral at body size and tight and confident at display size. One family; hierarchy comes from size, weight and tone.

### Hierarchy
- **Display** (600, clamp 2.5–4.5rem, 1.02, -0.04em): hero headline only, at most two lines on desktop.
- **Headline** (600, clamp 1.875–2.75rem, 1.08, -0.03em): section headings.
- **Title** (600, ~1.125–1.31rem, 1.3): bento cell titles, table product names.
- **Body** (400, 1rem, 1.6): paragraphs, max ~36–46rem measure.
- **Label** (500, 0.8125rem, tabular figures): table headers, metadata, demo figures.

### Named Rules
**The No-Eyebrow Rule.** Headings carry themselves. No small uppercase labels or section numbers above them.

## Layout

Single centred container, max 1200px, with 16px gutters on mobile and 32px from 768px up. Sections are separated by clamp(64px, 7vw, 104px) of block padding; the hero is tighter. Every multi-column layout collapses to one column below its breakpoint: the app window's tabs become an equal three-column strip under 960px, the bento becomes a single column under 900px, and the status table stacks under 760px.

## Elevation & Depth

Mostly flat with tonal layering. Only the hero's app window is lifted.

### Shadow Vocabulary
- **Window** (`0 1px 2px rgb(17 17 19 / .06), 0 2px 4px rgb(17 17 19 / .04), 0 14px 24px -12px rgb(17 17 19 / .16)`; dark: inset top highlight + 6px darker surround + offset shadow): the product window only.

### Named Rules
**The One Lifted Object Rule.** The demo window is the only elevated surface. Cards and panels separate by tone and hairline.

## Brand Mark

The official logo lives in `public/brand/`: the 1500px master, the full lockup, and the cup-and-leaf mark at 64/128/192px. The header and favicons use the mark; the wordmark text is set in Geist as "NgeTech". Never recolour, flatten or redraw the mark. The leaf green (#73CD5C) belongs to the logo only and is not a UI colour.

## Shapes

12px radius on surfaces (window, bento cells, product cards, contact panel), 8px on controls (buttons, inputs, tabs, screenshots), 6px on controls nested inside a control (nav links, language segments), 4px on inline badges (\"Menipis\"), 2px on photo-strip frames, full pill only for status labels. 1px hairlines throughout; an ink-weight top rule opens the status table.

## Components

- **Primary button:** ink fill, ground text, 44px tall, 8px radius, presses to 0.98 scale. One label per intent: "Chat di WhatsApp" everywhere.
- **Ghost button:** surface fill with strong hairline; secondary actions only.
- **Status pill:** 24px, text only, no dot. Teal = in use, caution = internal testing, neutral outline = in development.
- **App window:** sidebar tabs on desktop (label + status pill), three equal tabs with a text status line on mobile; panels keep their state while switching.
- **Icons:** Phosphor regular, 14–24px, one stroke family.

## Product Screenshots

The products section uses real screenshots of NgeTech's own apps (public/work/, WebP at 800/1600px), captured from the org repos with each app's own sample seed data and labelled as such. Each sits in an 8px-radius hairline frame at 16:10, cropped from the top-left. Replace them only with newer real captures, never mockups.

## Do's and Don'ts

- Do show product behaviour with working components and label the data as sample.
- Do keep every claim true; status labels say exactly where each product stands.
- Don't add eyebrows, section numbers, decorative dots, em dashes, or a second accent.
- Don't build fake screenshots from divs, or invent metrics, logos or testimonials.
- Don't reach past one lifted surface or flip themes inside the page.
