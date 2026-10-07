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
    fontSize: "clamp(2.75rem, 1.3rem + 5.1vw, 5.75rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.065em"
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
    letterSpacing: "-0.065em"
  countdown:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "5rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.065em"
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

## Current direction — 2026-10-07
The user requested a more expressive appearance and animation. The site keeps its product-first story, real screenshots, honest product statuses, official logo, Geist typography, and system light/dark themes. Teal now also emphasizes the headline, hardware connections, hover feedback, and contact panel.

## Composition
- A centered two-line hero, with a teal second line and a soft grid and ambient teal halo.
- A framed interactive demo with a workspace toolbar and a persistent sample-data caption.
- Three concise capability statements lead into the benefits section.
- Benefits and products use 20px surface radii; team cards use 16px; the contact panel uses 24px. Controls remain 8px.
- Product screenshots are real captures. Each product has a WhatsApp link carrying its name.
- Team avatars are initials, never fabricated photos. Profile links retain the members' actual work and contact information.
- The contact panel uses a soft teal gradient and subtle circular lines within the current theme.

## Motion
Hero text and demo enter with a short fade and upward motion. Below the hero, IntersectionObserver starts one-time reveals using the Web Animations API; no default CSS hides content. Cards and buttons have restrained hover feedback, and product screenshots scale slightly within their frames.

The hardware diagram animates a dashed signal. The hero halo drifts slowly. Both pause off screen and when the document is hidden. A thin header progress line reflects the reader's scroll position using a passive listener and requestAnimationFrame.

`prefers-reduced-motion` disables CSS animation and transitions, and prevents scroll reveals. Switching the preference to reduced motion cancels in-flight reveal animations. Content and demo functions remain available without decorative motion.

## Responsive behavior
The container remains 1200px with 16px mobile and 32px desktop gutters. Hero typography scales down on phones. Product and benefit grids stack; the demo retains three accessible product tabs. The contact arrow and secondary toolbar text disappear on narrow screens. Both Indonesian and English use the same components.

## Brand and content
Keep the official cup/leaf/circuit artwork unchanged. NgeBooth keeps its own lime palette within its demo. Do not invent metrics, clients, testimonials, deployment status, team photos, or event photos. Contact remains WhatsApp and email.

## Validation
Record actual build, browser, and functional verification in `docs/qa-design-refresh-2026-10-07.md`. The earlier QA report describes a previous revision and is not evidence for this revision.
