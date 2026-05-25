# Renomate — Design System v2.0

The shared visual + interaction language used across every Renomate surface: landing page, mobile app, web dashboard. Revised from v1.0 based on modern project-management UI references — cleaner, more colorful, more approachable.

---

## Design Principles

1. **Light and breathable.** Generous whitespace, soft backgrounds, no visual clutter. Every screen should feel spacious and calm.
2. **Friendly but trustworthy.** Approachable enough for first-time homeowners, polished enough that ID firms are proud to show it to clients. Modern SaaS, not corporate software.
3. **Color with purpose.** Multiple soft accent colors for categorisation and status, but never competing for attention. Color aids scanning, not decoration.
4. **Clarity for everyone.** Large touch targets, readable type, obvious hierarchy. A 60-year-old contractor should understand any screen in three seconds.
5. **Singapore-fluent.** SGD formatting, DD/MM/YYYY dates, English-first with room for Chinese characters.

---

## Brand Identity

### Name and wordmark
- **Product name**: Renomate
- **Wordmark**: clean sans-serif wordmark in the heading typeface, medium weight. No heavy icon-mark — let the typography do the work.

### Voice and tone
- **Conversational.** "Good evening, Sarah!" not "Welcome back, User."
- **Clear and direct.** "Your tiles need to be chosen by Friday" not "Action required: pending selection."
- **Singapore-direct.** No fluff, no "delight," no "magical."

---

## Colour Palette

**Direction: soft mint background, white card surfaces, multiple pastel accents.**

### Core neutrals

| Token | Hex | Use |
|---|---|---|
| `ink` | `#1A1A2E` | Primary text, dark headings. Deep navy-black. |
| `charcoal` | `#3A3A4A` | Secondary text, subtitles. |
| `slate` | `#7C7C8A` | Tertiary text, captions, metadata, placeholders. |
| `mist` | `#B8B8C8` | Dividers, disabled text, borders. |
| `cloud` | `#E8E8F0` | Subtle borders, input borders, divider lines. |
| `snow` | `#F0F4F3` | Secondary background, card hover. |
| `mint-bg` | `#E8F5F0` | Primary page background. Soft mint. |
| `white` | `#FFFFFF` | Card surfaces, modals, inputs. |

### Accent palette (multi-color, all soft/pastel)

| Token | Hex | Use |
|---|---|---|
| `coral` | `#FF6B6B` | Primary CTA, urgent states, overdue. |
| `coral-soft` | `#FFE0E0` | Coral background tint. |
| `sage` | `#7EC8A0` | Success, completed, paid. |
| `sage-soft` | `#D4F0E0` | Success background tint. |
| `lavender` | `#B8A9E8` | In-progress, active states. |
| `lavender-soft` | `#E8E0F8` | Lavender background tint. |
| `sky` | `#7EC8E3` | Info, links, neutral accent. |
| `sky-soft` | `#D4EEF8` | Sky background tint. |
| `sand` | `#F5DEB3` | Warnings, due soon, schedule items. |
| `sand-soft` | `#FFF5E0` | Sand background tint. |
| `peach` | `#FFB088` | Secondary highlight, designer features. |
| `peach-soft` | `#FFE8D8` | Peach background tint. |

### Semantic mapping

| State | Background | Text/Icon | Use |
|---|---|---|---|
| Pending | `cloud` | `charcoal` | Awaiting action |
| Active / In progress | `lavender-soft` | `lavender` | Currently happening |
| Done / Paid / Complete | `sage-soft` | `sage` | Closed/resolved |
| Overdue / Urgent | `coral-soft` | `coral` | Needs attention |
| Warning / Due soon | `sand-soft` | `sand` darkened | Coming up |
| Info / Neutral | `sky-soft` | `sky` | Informational |

---

## Typography

**All sans-serif: Inter for everything.** Clean, modern, highly legible at all sizes. No serif display font — the modern, friendly feel comes from weight contrast and generous sizing.

For display impact, use **Inter Bold/Black at large sizes** rather than switching to a different family.

### Font stack

```css
--font-heading: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-body:    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono:    "JetBrains Mono", "SF Mono", Menlo, monospace;
```

### Type scale

| Token | Size / Weight | Use |
|---|---|---|
| `display-xl` | 48px / 800 (Black) | Landing hero. |
| `display-lg` | 36px / 700 (Bold) | Landing section headings, major titles. |
| `display-md` | 28px / 700 (Bold) | Page titles, modal titles. |
| `heading` | 22px / 600 (SemiBold) | Section heads in app. |
| `heading-sm` | 18px / 600 (SemiBold) | Card titles, sub-sections. |
| `body-lg` | 18px / 400 | Landing page body, long-form. |
| `body` | 16px / 400 | Default UI text. |
| `body-sm` | 14px / 400 | Secondary UI text. |
| `caption` | 12px / 500 (Medium) | Labels, metadata, timestamps. Uppercase optional. |
| `mono-sm` | 13px / 400 | SGD amounts, invoice numbers. JetBrains Mono. |

---

## Spacing and Layout

**4px base unit.** All spacing is a multiple of 4.

| Token | Px |
|---|---|
| `space-1` | 4 |
| `space-2` | 8 |
| `space-3` | 12 |
| `space-4` | 16 |
| `space-5` | 20 |
| `space-6` | 24 |
| `space-7` | 32 |
| `space-8` | 48 |
| `space-9` | 64 |
| `space-10` | 96 |

### Border radius

| Token | Px | Use |
|---|---|---|
| `radius-sm` | 8 | Inputs, small elements. |
| `radius` | 12 | Default — buttons. |
| `radius-md` | 16 | Cards, containers. |
| `radius-lg` | 20 | Large cards, feature blocks. |
| `radius-xl` | 24 | Hero cards, modals. |
| `radius-full` | 9999 | Pills, avatars, tags. |

**More rounded than v1.** Cards at 16-20px, buttons at 12px, pills fully rounded.

---

## Components

### Buttons

- **Primary**: `coral` background, white text, `radius` border radius. The main CTA.
- **Secondary**: white background, `ink` text, `cloud` border, `radius`. Most actions.
- **Dark**: `ink` background, white text, `radius`. High-contrast alternative.
- **Ghost**: transparent, `ink` text. Cancel, tertiary.
- **Destructive**: `coral-soft` background, `coral` text.

Padding: 14px vertical, 24px horizontal. Touch target ≥ 48px on mobile. Subtle shadow on primary.

### Cards

- White background on `mint-bg` pages.
- `radius-md` (16px) border radius.
- Soft shadow: `0 2px 8px rgba(0,0,0,0.06)`. No visible border by default.
- Padding: 20px.
- Hover: slight lift `translateY(-2px)` with shadow increase.

### Inputs

- White background, `cloud` border (1px), `radius-sm` (8px).
- Focus: `sky` border (2px), subtle blue glow.
- Label above, `caption` style, `charcoal` color.
- 48px min height on mobile.

### Pills / Tags

Colorful, fully rounded (`radius-full`). Used for categories, status, and filters.

| Variant | Background | Text |
|---|---|---|
| Coral | `coral-soft` | `coral` |
| Sage | `sage-soft` | darker sage |
| Lavender | `lavender-soft` | darker lavender |
| Sky | `sky-soft` | darker sky |
| Sand | `sand-soft` | darker sand |
| Peach | `peach-soft` | darker peach |
| Neutral | `cloud` | `charcoal` |
| Dark | `ink` | `white` |

### Status pills (semantic)

| State | Style |
|---|---|
| Pending | Neutral pill (cloud bg, charcoal text) |
| In progress | Lavender pill |
| Complete / Paid | Sage pill |
| Overdue | Coral pill |
| Warning | Sand pill |
| Info | Sky pill |

### Avatars

- Circular, with colored backgrounds (pastel rainbow: coral-soft, sage-soft, lavender-soft, sky-soft, sand-soft, peach-soft).
- Sizes: sm=32, md=40, lg=56.
- Support overlap/stacking with negative margin.

### Lists

- Clean rows on white cards.
- Subtle `cloud` divider between rows.
- No card-per-row — group in a single card.

### Progress bars

- Rounded-full track (`cloud` background).
- Colored fill with rounded ends.
- Support multi-segment (different colors per segment).

### Motion

- Duration: 150ms for hover/focus, 250ms for layout transitions.
- Easing: `cubic-bezier(0.2, 0, 0, 1)` (calm ease-out).
- Hover on cards: subtle lift (translateY -2px) + shadow increase.
- Respect `prefers-reduced-motion`.

### Icons

- **Set**: Lucide, 24px default, 20px dense, 16px inline.
- 1.5px stroke weight.
- Use accent colors on icons in feature cards.

---

## Mobile UI Patterns

Specific mobile screen layout patterns inspired by modern project management app UIs. These patterns define how components compose together on each screen type.

### Home Screen Pattern
- **Header**: Greeting ("Good evening,") + user first name (large, bold) + notification bell icon (top right) + avatar with add/plus button
- **Today's Schedule**: Horizontal row of colored background cards (not white — use sand-soft and lavender-soft backgrounds). Each card shows time + event title. Rounded-lg corners.
- **Quick Stats Row**: Two side-by-side stat blocks with decorative icon backgrounds. Each shows a count + label (e.g., "20 tasks · To do list", "20 tasks · In progress"). Use peach-soft and lavender-soft backgrounds.
- **Project Section**: "Projects" heading with project list items. Each item: colored circle icon (cycling through accent-soft colors) + project name + horizontal progress bar + count (e.g., "3/7")

### Task/Item Cards
- **Category pills**: Colorful rounded pills at top of cards for categorisation (use accent-soft backgrounds)
- **Title**: Bold, 16-18px, ink color
- **Avatar stack**: Overlapping circular avatars with +N indicator, right-aligned
- **Stats row**: Icon + count pairs (comments, attachments) in a row at bottom
- **Progress indicator**: Dashed or segmented progress bar showing completion (e.g., 7/10)

### Detail Screen Pattern
- **Header**: Back arrow (left) + edit icon (right)
- **Title block**: Large title + time/date + status pill (e.g., "Ongoing" in lavender)
- **Description**: Body text with "read more" truncation
- **Member row**: Overlapping avatar stack + count stats
- **Activity section**: Donut/arc chart showing completion percentage (e.g., 90% Done) with colored segments (sage for done, sky for in progress, cloud for to do)
- **Subtasks**: Checklist with checkbox icons + task text

### Create/Form Screen Pattern
- **Dark-themed modal option**: Dark background (#1A1A2E) with light text for create flows — makes forms feel distinct from browse screens
- **Input fields**: Clean, minimal, with subtle borders
- **Date inputs**: Calendar icon prefix, DD/MM/YYYY format
- **Assignee picker**: Horizontal row of avatar chips with names
- **Attachment section**: Document icon + add button

### Filter Chips
- **Selected state**: Dark background (ink) with white text + count badge
- **Unselected state**: White/transparent background with cloud border + charcoal text
- **Horizontal scrollable** row, rounded-full shape

### Progress Bars
- **Segmented style**: Individual colored segments separated by small gaps
- **Track**: cloud background, rounded-full
- **Fill**: Accent color matching the status (sage for complete, coral for active, lavender for in progress)
- **Counter**: "3/7" text right-aligned next to bar

### Avatar Stack
- Overlapping circular avatars with -8px margin between them
- Maximum 3-4 visible, then "+N" pill
- Border: 2px white border on each avatar to create separation
- Sizes: sm (24px), md (32px)

### Colored Stat Blocks
- Rounded-lg cards with soft pastel backgrounds (not white)
- Large number or icon as focal point
- Label text below in charcoal
- Use different accent-soft colors for visual variety: sand-soft, lavender-soft, peach-soft, sage-soft

---

## Imagery

### Landing page
- Clean illustrations or abstract shapes in pastel accent colors.
- Avoid stock photography — use UI mockup screenshots and illustrated elements.
- Gradient blobs or soft shapes as background decoration (subtle, not distracting).

### App
- Colored circular icons for categories (like the reference: each project/category gets a unique pastel background circle with an icon inside).
- Photo thumbnails with rounded corners.

---

## Dark Mode (v1.1+)

| Token | Hex |
|---|---|
| `ink-dark` | `#E8E8F0` |
| `bg-dark` | `#1A1A2E` |
| `card-dark` | `#252540` |
| `mist-dark` | `#4A4A5A` |

---

## Accessibility

- Colour contrast: WCAG AA minimum on all text.
- Touch targets: 48px minimum on mobile (increased from 44px).
- Focus states: 2px `sky` outline on every interactive element.
- Screen reader labels on all icon-only buttons.
- Form labels always visible.
