# Renomate — Design System

The shared visual + interaction language used across every Renomate surface: landing page, mobile app, web dashboard, email templates, exported PDFs. This is a **proposed starting direction** — locked in v0.1 so the landing page can be built, fully expected to evolve as the product takes shape.

---

## Design Principles

These shape every visual and copy decision. If a design choice violates a principle, reconsider it.

1. **Calm over loud.** Renovation is already stressful. The product should feel like a steady hand, not a noisy dashboard. Generous whitespace. Restrained colour. No motion for motion's sake.
2. **Document, don't dramatise.** This is a system of record. State and content take precedence over chrome. Lists, timestamps, and structured fields are the heroes — not gradient buttons.
3. **Premium without coldness.** ID firms care about how their tools look in front of clients. Aim for the feel of a high-quality architect's drawing set — precise, warm, material-aware — not a generic SaaS template.
4. **Clarity for non-power-users.** Half the audience (homeowners, sub-contractors) opens the app maybe twice a week. Every screen should pass the "could a 60-year-old contractor understand this in three seconds?" test.
5. **Singapore-fluent.** SGD currency formatting, DD/MM/YYYY dates, 24-hour optional, English-first with room for Chinese characters in addresses and proper nouns.

---

## Brand Identity

### Name and wordmark
- **Product name**: Renomate (working).
- **Wordmark**: lowercase wordmark in the display typeface. Avoid a heavy icon-mark in v1 — let the typography do the work.

### Voice and tone
- **Plainspoken.** "Your tiles need to be chosen by Friday" — not "Action required: pending selection."
- **Quietly confident.** State what is, not what *could* be.
- **Warm but professional.** First-person plural sparingly. No "Hey there!" microcopy. No emoji in product UI (OK on landing page testimonials, in moderation).
- **Singapore-direct.** No fluff, no "delight," no "magical." A SG contractor reads "we make renovation magical" and closes the tab.

---

## Colour Palette

**Proposed direction: warm neutrals with a single clay accent.**

Reasoning: SG SaaS leans cool-blue (Singpass, Grab, DBS, Carousell). A warm, slightly earthy palette differentiates us in a renovation context (clay, wood, stone are *the* renovation materials) without being twee. One confident accent keeps focus on content.

### Core neutrals (the workhorses)

| Token | Hex | Use |
|---|---|---|
| `ink` | `#161513` | Primary text, primary button background. Near-black with a warm undertone. |
| `charcoal` | `#3D3A36` | Secondary text, headings on light backgrounds. |
| `slate` | `#6E6963` | Tertiary text, captions, metadata. |
| `mist` | `#A8A29B` | Disabled text, placeholders, dividers. |
| `linen` | `#EFEAE2` | Secondary background, card surfaces on darker pages. |
| `paper` | `#FAF7F2` | Primary background (warm off-white, not stark). |
| `white` | `#FFFFFF` | Pure surfaces (modals, input fields). |

### Accent: Clay

| Token | Hex | Use |
|---|---|---|
| `clay` | `#B85C3C` | Primary accent. Use sparingly: CTAs, active states, key emphasis. |
| `clay-soft` | `#E8C9B8` | Backgrounds for highlight states, badge backgrounds. |
| `clay-deep` | `#8A4329` | Hover/pressed state for clay surfaces. |

### Semantic colours (kept muted to fit the palette)

| Token | Hex | Use |
|---|---|---|
| `success` | `#5C7A4F` | Sage green — paid invoices, completed phases, signed-off defects. |
| `success-soft` | `#D8E4D0` | Success backgrounds. |
| `warning` | `#C68C3A` | Honey amber — decisions overdue, payments due soon. |
| `warning-soft` | `#F0E1C2` | Warning backgrounds. |
| `error` | `#A8453A` | Muted brick — overdue payments, blocked phases. |
| `error-soft` | `#E8C7C2` | Error backgrounds. |
| `info` | `#3A6680` | Cool slate-blue — informational tips, audit log entries. |

### Dark mode (v1.1+, but tokens defined now)

| Token | Hex |
|---|---|
| `ink-dark` | `#F2EFE9` (text inverts) |
| `paper-dark` | `#1A1816` |
| `linen-dark` | `#26221E` |
| `slate-dark` | `#9C968E` |

---

## Typography

**Proposed: Inter (body) + Fraunces (display).**

Both open-source (free, Google Fonts), high-quality, and pair well. Inter is bulletproof for UI legibility at small sizes. Fraunces (a contemporary serif with variable weight and optical sizes) brings the warmth and "designed object" feel that pure-sans SaaS lacks.

If we want to upgrade later: licensed faces like *Söhne* (body), *General Sans* (display), or *Tiempos* (display serif). But Inter + Fraunces is shippable today.

### Font stacks

```css
--font-display: "Fraunces", "Iowan Old Style", Georgia, serif;
--font-body:    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono:    "JetBrains Mono", "SF Mono", Menlo, monospace;
```

### Type scale (mobile-first)

| Token | Size / Line | Use |
|---|---|---|
| `display-xl` | 48 / 56 | Landing page hero only. Fraunces, weight 400, optical size 144. |
| `display-lg` | 36 / 44 | Landing section heads, app major page titles. Fraunces 400. |
| `display-md` | 28 / 36 | Card titles, modal titles. Fraunces 400. |
| `heading` | 20 / 28 | Section heads in app. Inter 600. |
| `body-lg` | 18 / 28 | Landing page body, long-form content. Inter 400. |
| `body` | 16 / 24 | Default UI body. Inter 400. |
| `body-sm` | 14 / 20 | Secondary UI. Inter 400. |
| `caption` | 12 / 16 | Metadata, timestamps, labels. Inter 500, uppercase optional. |
| `mono-sm` | 13 / 18 | SGD amounts, IDs, timestamps in audit log. JetBrains Mono. |

### Typography rules

- **One display family per surface.** Never mix Fraunces weights wildly — stick to 400 for headings, 500 sparingly for emphasis.
- **Number alignment.** Use `font-variant-numeric: tabular-nums` on currency, dates, and any column of numbers. Critical for the Money tab.
- **No all-caps for headings.** Only for `caption` tokens at 12px, where the eye expects them.

---

## Spacing and Layout

**4px base unit.** All spacing is a multiple of 4.

| Token | Px |
|---|---|
| `space-1` | 4 |
| `space-2` | 8 |
| `space-3` | 12 |
| `space-4` | 16 |
| `space-5` | 24 |
| `space-6` | 32 |
| `space-7` | 48 |
| `space-8` | 64 |
| `space-9` | 96 |
| `space-10` | 128 |

### Layout grid

- **Mobile**: single column, 16px gutters, 16px outer padding.
- **Web dashboard**: 12-column grid, 24px gutters, max-width 1280px centered.
- **Landing page**: max-width 1200px content, full-width hero sections.

### Border radius

| Token | Px | Use |
|---|---|---|
| `radius-sm` | 4 | Inputs, small badges, tags. |
| `radius` | 8 | Default — buttons, cards. |
| `radius-md` | 12 | Modals, large cards. |
| `radius-lg` | 16 | Photo containers, feature blocks on landing. |
| `radius-full` | 9999 | Pills, avatars. |

Stay restrained. Don't pile rounded corners everywhere — it makes the product feel cheap.

---

## Components

### Buttons

- **Primary**: `ink` background, `paper` text. Used for the single most important action per screen.
- **Accent**: `clay` background, `paper` text. Used for **conversion CTAs only** (waitlist signup, "create project"). Limit to one per view.
- **Secondary**: `paper` background, `ink` text, 1px `mist` border. Default for most actions.
- **Ghost**: transparent background, `ink` text. Tertiary actions, "Cancel" in dialogs.
- **Destructive**: `error` text, `paper` background, `error` border on hover. No solid red buttons.

Padding: 12px vertical, 20px horizontal (default). Touch target ≥44px on mobile.

### Inputs

- 1px `mist` border, `radius-sm`, 12px vertical / 16px horizontal padding.
- Focus: 2px `clay` outline, no color shift on the input itself.
- Label always above input (no floating labels).
- Helper text below, `body-sm` in `slate`. Errors in `error`.

### Cards

- `paper` background on `linen` page, OR `white` background on `paper` page.
- `radius-md`, 1px `mist` border (no shadow by default).
- Padding 16px (mobile) / 24px (web).
- Hover state for clickable cards: subtle `linen` background shift, no transform / lift.

### Lists

- Stacked rows with 1px `mist` divider between (no shadow, no card-per-row).
- 16px vertical row padding.
- Tap target: full row width on mobile.

### Tables (web dashboard)

- Header row in `caption` style on `linen`.
- Body rows: `body-sm`, 12px vertical padding.
- Subtle hover state, no zebra striping.
- Numbers right-aligned, monospaced.

### Status pills

| State | Token | Use |
|---|---|---|
| Pending | `mist` bg + `charcoal` text | Decisions / defects awaiting action |
| In progress | `clay-soft` bg + `clay-deep` text | Active work |
| Done / Paid | `success-soft` bg + `success` text | Closed states |
| Overdue | `error-soft` bg + `error` text | Needs urgent attention |
| Info | `linen` bg + `info` text | Neutral metadata |

### Motion

- **Duration**: 150ms for state changes (hover, focus). 250ms for layout shifts (modals, sheets). Never longer than 400ms.
- **Easing**: `cubic-bezier(0.2, 0, 0, 1)` (a calm ease-out). No spring physics, no bounce.
- **Reduce motion**: respect `prefers-reduced-motion` everywhere.

### Icons

- **Set**: Lucide (free, comprehensive, consistent stroke). 24px default, 20px in dense UI, 16px inline.
- 1.5px stroke weight.
- Icons never carry colour meaning alone — always paired with text or a status pill.

---

## Imagery

### Photography
- **Subject matter**: real Singapore interiors. Materials (wood grain, terrazzo, stone, tile). Hands at work (a carpenter measuring, a designer reviewing a sample). *Avoid* stock photos of generic open-plan living rooms — they read as fake immediately.
- **Treatment**: natural light, slightly warm white balance. No heavy filters. Real, unfussy.
- **Use on landing page**: full-bleed sections to anchor each value prop.

### Illustration (if used)
- Line-style, single-weight strokes, `ink` on `paper`. No gradients, no isometric SaaS art.
- Use only when a photo isn't possible (abstract concepts: timeline, audit trail).

---

## Component Library Implementation

When the build starts:

- **Web (landing + dashboard)**: shadcn/ui as the base, restyled with these tokens. Tailwind config exports the palette and spacing.
- **Mobile (React Native + Expo)**: NativeWind for shared Tailwind tokens, custom RN components matching the web component API.
- **Token source**: a single `tokens.json` in `packages/ui/` consumed by both platforms (web Tailwind config + RN theme provider).
- **Font loading**: Inter and Fraunces from Google Fonts on web; bundled via `expo-font` on mobile.

---

## Accessibility Baseline

Non-negotiable from v1:

- **Colour contrast**: WCAG AA minimum. All body text on `paper` clears 4.5:1. `clay` accent on `paper` checked at minimum 3:1 for large text only — use `clay-deep` for body-size text on `paper`.
- **Touch targets**: 44px minimum on mobile.
- **Focus states**: visible 2px `clay` outline on every interactive element.
- **Screen reader labels**: every icon-only button has an `aria-label` / `accessibilityLabel`.
- **Form labels**: always visible, never placeholder-only.

---

## Open Decisions

These are the calls that need to be made (by you or via user testing) before locking v1:

1. **Accent colour confirmation** — Clay (terracotta) vs. alternatives (Sage green for calm, Deep teal for trust, warm Gold for premium). Sample before committing.
2. **Display typeface confirmation** — Fraunces (serif, warm) vs. a geometric sans like General Sans (more modern/clean). Fraunces is the proposal; General Sans is the safer-feeling alternative.
3. **Logo/wordmark direction** — type-only vs. wordmark + symbol. Recommend type-only for v1 to avoid premature brand commitment.
4. **Photo art direction** — secure a small library of SG-specific shoot or styled stock before landing-page build.
