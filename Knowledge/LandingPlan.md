# Renomate — Landing Page Plan (v2.0)

The full **section plan + copy + interaction & animation spec** for the marketing landing page. This document supersedes the v1.0 copy-only draft. The landing page will be built from this plan once approved.

> Status: **plan stage**. No code changes yet. `landing/preview.html` reflects the previous v1.0 direction and will be rebuilt against this plan once it's approved.

---

## What changed from v1.0

The previous draft leaned too heavily on positioning Renomate *against* WhatsApp — repeated jabs ("Seven WhatsApp groups, zero answers", "a chat app designed for sharing memes") came across as defensive and unprofessional, in tension with a product whose value is *calm, structured, professional*.

**New direction**:
- Acknowledge that renovation coordination is genuinely complex, without naming villains.
- Position Renomate as the **upgrade** to how good projects are run, not the **replacement** for an existing tool.
- Let the product's clarity speak — don't shout at competitors.
- WhatsApp gets mentioned exactly once, in an FAQ, where it's a legitimate user question.

**Voice** (carried from `DesignSystem.md`, with new emphasis):
- Plainspoken, quietly confident, professional.
- Specific over general (named phases, real numbers, actual workflows).
- The product is calm. The copy is calm. Negative space does work.

---

## Design & interaction principles

Modern SaaS landing pages reward visitors who scroll, with motion, depth and progressive reveal. Renomate's animation language should feel:

- **Restrained**: motion serves comprehension, not entertainment.
- **Considered**: every animation has a purpose (reveal, anchor, demonstrate).
- **Performant**: respects `prefers-reduced-motion`, never blocks scroll.
- **On-brand**: ease curves and timings match `DesignSystem.md` (`cubic-bezier(0.2, 0, 0, 1)`, 150–400ms).

### Patterns we'll use (each justified in its section)

| Pattern | Used in section | Why |
|---|---|---|
| Sticky nav with scroll-state | 0 | Always-available CTA. SaaS standard. |
| Animated hero mockup | 1 | Conveys product feel without static screenshots. |
| Cursor-aware parallax | 1 | Adds depth, restrained. |
| Magnetic CTA buttons | 1, 12 | Premium feel. Used sparingly. |
| Bento grid for value pillars | 4 | Modern, asymmetric, scannable. |
| Sticky-scroll feature reveal ("scrollytelling") | 5 | The conversion section. Lets the product narrate itself. |
| Animated number counters | 6 | Credibility for skim-readers. |
| Tabbed segmented content | 7 | Address two audiences without doubling the page. |
| Sequential fade/slide reveals on scroll | Throughout | Adds depth, rewards scrolling. |
| Native `<details>` accordion | 11 | Accessible FAQ pattern. |
| Modal forms | 13, 14 | Reduces friction vs. dedicated form pages. |

### Patterns we'll **avoid**

- Heavy scroll-jacking that fights the user.
- Auto-playing video with sound.
- Cursor spotlights that overwhelm the design.
- Bouncy spring physics (not on-brand).
- Aggressive 3D tilt or warp effects.

---

## Section-by-section plan

Each section below specifies four things:

1. **Purpose** — what this section earns.
2. **Content** — the copy, with formatting hints.
3. **Visual** — what asset(s) live here, with `[PLACEHOLDER]` tags for assets we'll produce later.
4. **Interaction** — animation/behaviour details.

---

### 0. Sticky navigation

**Purpose**: Persistent CTA + section nav for long-page browsers.

**Content**
- Wordmark (left): `renomate` (Fraunces).
- Links (centre, hidden on mobile): `Product` · `How it works` · `For designers` · `FAQ`.
- Primary CTA (right): `Join the waitlist` (clay).

**Visual**: N/A (UI element).

**Interaction**
- Transparent at top; gains 1px bottom border + light backdrop blur after 8px scroll.
- Smooth-scroll to anchors.
- On mobile: links collapse, only wordmark + CTA visible.

---

### 1. Hero

**Purpose**: In one screen, communicate *who this is for*, *what it does*, *why it matters*. Earn the next scroll.

**Content**
- **Eyebrow chip** (clay-soft pill): `Built in Singapore · for HDB, condo and landed renovations`
- **Headline** (Fraunces, display-xl):
  > Your renovation, organised.
- **Sub-headline** (Inter, body-lg, max 2 lines):
  > A single workspace for the timeline, decisions, prices and invoices that define every Singapore renovation — designed for homeowners and the interior designers who run their projects.
- **Primary CTA**: `Join the waitlist` (clay).
- **Secondary CTA**: `I'm an interior designer →` (secondary).
- **Caption line below CTAs** (slate): `Free during private beta · Launching late 2026` *(placeholder — update once known)*.

**Visual**
> `[HERO_MOCKUP]` — An animated device frame (mobile portrait, slight 5° tilt) showing the Renomate home screen with three cards stacked: a "What's next" phase card (e.g. *"Carpentry — Day 4 of 12"*), a pending decision card (*"Kitchen handle finish — due in 2 days"*), and an outstanding invoice card (*SGD 9,780*). Subtle loop animation: every 4 seconds the timeline bar advances 1px, a "decision made" toast slides in from the top, then a status pill quietly flips from *Pending* to *Decided*. ~8s loop, fades to start.

**Interaction**
- Hero text fades + slides up on first paint, 80ms stagger (eyebrow → headline → sub → CTAs).
- **Cursor-aware parallax** on the device mockup: shifts ±6px in opposite direction to cursor (very subtle, depth illusion).
- **Magnetic primary CTA**: button shifts ±2px toward cursor when within 60px radius.
- All disabled when `prefers-reduced-motion: reduce`.

---

### 2. Quiet credibility line *(v1 placeholder for future logo bar)*

**Purpose**: Visual breathing room + soft credibility. Once we have partner logos, this becomes a marquee row.

**Content (v1, before partner logos exist)**
A single quiet line, centred:
> Singapore-built · Singapore-hosted · Designed for HDB, condo and landed.

**Content (later, when partner logos exist)**
> `[LOGO_MARQUEE]` — 6–8 grayscale partner / press logos in a slow horizontal scroll, paused on hover.

**Interaction**
- v1: static.
- Later: continuous slow right-to-left scroll, pauses on hover.

---

### 3. The reality of renovating *(reframed problem section)*

**Purpose**: Empathise with the renovation experience. Set up the rest of the page. No villains — just an honest description of complexity.

**Content**
- **Eyebrow**: `The reality of renovating`
- **Headline** (display-lg):
  > Renovation is one of the most complex projects a homeowner ever manages.
- **Body** (body-lg, two paragraphs):
  > A typical Singapore renovation runs three to four months, costs forty thousand dollars or more, involves five to seven different trade teams, and requires dozens of decisions that each shape the ones that follow.
  >
  > The information that holds it all together — the quotation breakdown, the design approvals, the delivery dates, the defect lists, the invoice statuses — lives in different places, with different people, in different formats. Keeping track is hard. Knowing what comes next is harder.
- **Stat callout** (clay left border, body-lg):
  > Industry data: **66% of renovation regrets in Singapore** trace back to communication gaps between homeowners and their project teams.

**Visual** *(optional, can ship without)*
> `[PROBLEM_ILLUSTRATION]` — Abstract line-art: on the left, document icons, photos, text fragments scattered loosely; on the right, the same elements organised into a single calm grid. Ink-on-paper style consistent with `DesignSystem.md`.

**Interaction**
- Section fades in on scroll into viewport.
- **Animated number**: `66` counts from `0` over 1.2s when the stat enters view (ease-out, fires once).
- If the illustration is used: as the section scrolls past, the right-hand "organised" grid fades in over the scattered version (scroll-linked, not autoplay).

---

### 4. Value pillars *(bento grid)*

**Purpose**: Convey the four headline outcomes in a scannable, modern asymmetric layout.

**Content** (header)
- **Eyebrow**: `What Renomate gives you`
- **Headline** (display-lg):
  > A clear view of every project, every day.

**Four pillars** (bento grid: 2 large + 2 small, alternating)

| # | Card | Title | Body |
|---|---|---|---|
| 01 | Large | **Know exactly where you are.** | Every phase laid out — hacking, masonry, carpentry, painting, defect, handover — with planned and actual dates. A glance tells you what's happening now, what's next, and what's blocking progress. |
| 02 | Small | **Every decision, on one queue.** | Tile colour. Socket position. Paint finish. Each choice the project needs from you, with a deadline driven by the timeline. |
| 03 | Small | **Every dollar accounted for.** | The quotation, line by line. Every change order tracked with what changed, when, and by how much. |
| 04 | Large | **Always know what's owed, what's paid.** | Invoice schedule, payment status, receipts — all in one place. Mark a transfer as paid and the audit trail captures the moment. |

**Visuals** (one per card)
- `[VISUAL_TIMELINE]` — Timeline view, 7 phases vertical with "you are here" marker on phase 4.
- `[VISUAL_DECISIONS]` — Decisions queue card with 3 pending items, deadlines, trade tags.
- `[VISUAL_QUOTATION]` — Quotation breakdown showing 5 line items in SGD with one change order highlighted (+SGD 480 delta).
- `[VISUAL_MONEY]` — Money tab table, 3 invoices with statuses Paid/Paid/Overdue.

**Interaction**
- Cards fade and slide up on scroll into view, 100ms stagger between cards.
- Subtle hover lift (2px translateY + soft shadow, 150ms ease).
- Optional: gentle 3D tilt on hover (max 4° on either axis, mouse-tracked) — A/B test whether this adds or distracts.

---

### 5. Feature deep-dive *(sticky-scroll narrative)*

**Purpose**: The conversion section. "Scrollytelling" — let the product narrate itself by anchoring a device mockup on the right while text scrolls past on the left. Modern landing pages (Linear, Stripe, Apple, Cron) all use this; it consistently converts skeptics.

**Layout**
- Desktop: 2-column. Left = scrolling text panels (4 of them, one per pillar). Right = sticky device mockup that crossfades through 4 screens as user scrolls past each panel.
- Mobile: degrades to stacked layout — each text panel sits above its corresponding screenshot, no sticky behaviour.

**Content** *(4 sub-sections)*

**5a. Timeline**
> **Built around your project's actual schedule.**
>
> Phases are named for what they actually are — hacking, masonry, carpentry — with planned and actual dates side by side. When something slips, the whole timeline updates. Everyone sees the same calendar.

Sticky visual: `[VISUAL_TIMELINE_FULL]` — full Timeline screen.

**5b. Decisions**
> **Decisions in the order they need to be made.**
>
> Renomate queues pending decisions in the sequence the project actually needs them. Tile choice before the tiler arrives. Socket positions before the electrician comes back. Each decision carries a deadline, the options, and a record of who chose what, when.

Sticky visual: `[VISUAL_DECISIONS_DETAIL]` — Decisions list, then transitions to a detail view of one decision with image options and "decide" button.

**5c. Money**
> **Numbers that always add up.**
>
> The quotation, change orders and invoices are connected. Approve a change order — it flows into the running total. Mark an invoice paid — the project balance updates. No reconciling spreadsheets, no surprises at handover.

Sticky visual: `[VISUAL_MONEY_DRILLDOWN]` — Money tab, transitioning to a single invoice detail with attached receipt photo.

**5d. Defects**
> **A defect list that closes itself out.**
>
> File a defect with a photo and a location note. The right trade gets notified, the status updates as the fix happens, you sign it off when satisfied. The whole loop, documented.

Sticky visual: `[VISUAL_DEFECT_FLOW]` — Defect detail with photo, status workflow visualised.

**Interaction**
- **Sticky scroll**: visual stays pinned on the right while text scrolls past on the left.
- **Crossfade morph**: as user scrolls past each sub-section, the sticky visual crossfades to the next screen (300–400ms ease).
- **Active sub-section indicator**: a thin vertical progress bar on the left edge highlights which of the 4 sub-sections is in view.
- **Library suggestion**: GSAP `ScrollTrigger` for precision (or framer-motion `useScroll` + `useTransform` if simpler suffices).
- Mobile: standard stacked reveals; no sticky behaviour.

---

### 6. Quantified outcomes *(animated counters)*

**Purpose**: Quantify why this matters. Credibility for skim-readers.

**Content**
- **Eyebrow**: `Why this matters`
- 3-column row, each column shows:
  - A very large display-serif number (Fraunces, ~80px).
  - A short caption (body-sm, slate).

| Number | Caption | Source |
|---|---|---|
| **66%** | of Singapore renovation regrets trace back to communication gaps. | Industry data |
| **~120** | consumer complaints filed with CASE each year on incomplete renovation works. | MTI 2017–2023 |
| **40–50%** | upfront deposit, the industry norm — making clarity from day one essential. | Industry standard |

**Closing line** (centred under the stats, body):
> Renomate is built to address the structural cause of all three.

**Interaction**
- Each number counts up from `0` to its final value when scrolled into view (1.2s, ease-out).
- Numbers fire once per page load (don't re-trigger on scroll-back).
- The three columns stagger their counter starts by 200ms for a cascading effect.

---

### 7. Built for both sides *(tabbed segmented section)*

**Purpose**: Address the two audiences with tailored copy without doubling the page length.

**Content** (header)
- **Eyebrow**: `Built for both sides`
- **Headline** (display-lg):
  > One workspace, two perspectives.

**Tab control** (segmented, 2 tabs)

#### Tab 1 — For homeowners *(default active)*
- **Subhead** (heading): Clarity, without having to ask for it.
- **Body** (body):
  > You see the same project your designer sees — the timeline, the decisions queue, every invoice, every defect. No chasing, no screenshots, no trying to remember what was agreed. Everything important is in one place, with timestamps.
- **CTA**: `Join the waitlist`
- **Visual**: `[VISUAL_HOMEOWNER_HOME]` — Homeowner home screen.

#### Tab 2 — For interior designers
- **Subhead**: A workspace that works for your firm.
- **Body**:
  > Renomate gives your firm a structured record of every project — approvals, change orders, payments, decisions — that protects you in disputes and signals professionalism to new clients. When a designer leaves mid-project, the next person inherits a clean project, not a chat scrollback.
- **3 mini-benefit bullets** (heading-style):
  - Audit trail that holds up in disputes.
  - Designer handovers in minutes, not weeks.
  - A trust signal for first-time BTO buyers comparing firms.
- **CTA**: `Talk to us about being an early partner`
- **Visual**: `[VISUAL_DESIGNER_DASHBOARD]` — Designer dashboard with multi-project overview.

**Interaction**
- Tab switch crossfades content (200ms) without scroll jump.
- Tab indicator (clay underline) slides under the active tab.
- Visual swaps with subtle fade.
- Tab state stored in URL hash (`#for-homeowners`, `#for-designers`) for direct linking.

---

### 8. How it works *(three steps)*

**Purpose**: Demystify the onboarding. Reassure that adoption is light, especially for sub-contractors.

**Content**
- **Eyebrow**: `How it works`
- **Headline** (display-lg):
  > Three steps to a project that runs itself.

**Step 01 — Your designer sets up the project**
They define the timeline, upload the quotation, and invite you with one tap.

**Step 02 — You and your designer work in one place**
Decisions, files, invoices, defects — all in the project, all timestamped, all searchable.

**Step 03 — Sub-contractors join their own channels**
Each trade gets a private link to their own channel. No app to install, no new account to create.

**Visual**
> `[HOW_IT_WORKS_DIAGRAM]` — Three connected line-art glyphs (designer / couple-at-home / toolbox), with a thin clay line connecting them left-to-right.

**Interaction**
- Steps reveal sequentially on scroll (150ms stagger).
- The connecting line draws itself left-to-right when section enters viewport (~600ms).
- Each step number animates from `0` opacity to full when revealed.

---

### 9. For interior design firms *(deep pitch)*

**Purpose**: The full sell to the firm side. The "Built for" tab teases this; this section closes it.

**Layout**: Full-width section, `linen` background (visually distinct from preceding sections).

**Content**
- **Eyebrow**: `For interior design firms`
- **Headline** (display-lg):
  > Run every project on a system that protects your firm.
- **Sub-headline** (body-lg):
  > Renomate is the workspace your clients see — and it's also the operational record your firm relies on for handovers, audits, and dispute resolution.

**Three benefit blocks** (3-column grid)

**An audit trail that holds up.**
Every approval, payment, change order and decision is timestamped and immutable. When disputes arise, the record is the answer.

**Continuity through designer changes.**
Designers leave. Projects don't have to suffer. Hand off a project in minutes — the new designer inherits the full state, not a chat history.

**A signal of professionalism.**
*"We run every project on Renomate"* tells a first-time BTO buyer that your firm is organised, accountable, and modern. Use it in pitches, on your website, and in your Qanvast profile.

**CTA row**
- Primary: `Talk to us about being an early partner` (clay).
- Note (slate): *We work with a small number of Singapore ID firms during beta. Early partners help shape the product and pay nothing during this period.*

**Visual**
> `[VISUAL_DESIGNER_DASHBOARD_FULL]` — Desktop mockup of the designer dashboard showing 8 active projects with status indicators (phase, next milestone, outstanding invoice count).

**Interaction**
- Section background fades in as a coloured panel as it enters viewport.
- Three benefit blocks reveal with 100ms stagger.
- Optional hover affordance on each benefit block — a small caret icon appears on hover, hinting at future link to case study.

---

### 10. Singapore trust band

**Purpose**: Anchor the brand to its market. Brief, confident, lots of negative space.

**Layout**: Full-width, `ink` background.

**Content** (single line of display serif, centred):
> Built in Singapore. Hosted in Singapore. Designed for Singapore renovations.

**Visual**: None — typography and contrast do the work.

**Interaction**: Static.

---

### 11. FAQ

**Purpose**: Address the most common pre-signup questions.

**Content**
- **Eyebrow**: `Common questions`
- **Headline** (display-lg):
  > Questions, answered.

**Six questions** (native `<details>` accordion)

1. **When can I start using Renomate?**
   Private beta opens in the coming months with a small group of Singapore ID firms. Join the waitlist to be among the first to get access.

2. **How much does it cost?**
   Free during beta. After launch, interior design firms pay a monthly subscription. Homeowners and sub-contractors are always free — they're invited into projects, never billed.

3. **Does my interior designer need to use it?**
   Yes — the designer creates and manages the project. If your designer isn't on Renomate, let us know who they are and we'll reach out.

4. **What about the chats we already have set up?**
   Use them however you like. Renomate handles the structured side of the project — timeline, decisions, money, defects, files. Day-to-day chat can stay where it is.

5. **Is my project data private?**
   Yes. Your project data is hosted in Singapore and accessible only to people invited to your project. We don't share data with third parties.

6. **Who is behind Renomate?**
   A Singapore homeowner who recently renovated and decided the experience deserved better tooling.

**Interaction**
- Native HTML `<details>` / `<summary>` for accessibility.
- Chevron / `+` indicator rotates 180° on open (200ms ease).
- Opening panel content slides down smoothly (CSS `@starting-style` for height transition, or scripted).
- Multiple items can be open simultaneously (matches SaaS norms; less rigid than "only one").

---

### 12. Final CTA *(close)*

**Purpose**: One last clear call to action after the long scroll. Removes the excuse to leave without converting.

**Layout**: Full-width section, `paper` background, generous vertical padding, centred content.

**Content**
- **Headline** (display-lg, centred):
  > Ready to run your next renovation differently?
- **Sub-headline** (body-lg):
  > Join the waitlist and we'll be in touch when private beta opens.
- **Two CTAs side by side**:
  - `Join the waitlist` (clay primary).
  - `I'm an interior designer →` (secondary).

**Interaction**
- Section fades in on scroll into view.
- Magnetic primary CTA effect (same as hero).

---

### 13. Waitlist form *(modal)*

**Purpose**: Capture the signup. Frictionless.

**Trigger**: Every "Join the waitlist" button anywhere on the page opens this modal.

**Content**
- **Heading** (display-md): Join the waitlist.
- **Help** (body-sm): We'll email you when beta opens. No spam, no sharing.
- **Fields**:
  - Email *(required)*.
  - BTO key collection date *(optional, date picker)*. Help: *"Helps us prioritise who to onboard first."*
  - Anything you'd like this app to solve? *(optional, textarea)*. Help: *"One or two sentences is plenty."*
- **Submit button**: `Join the waitlist` (clay, full-width).
- **Success state** (replaces form content):
  > You're on the list. We'll be in touch when beta opens — usually within a few weeks of you joining.

**Interaction**
- Modal: backdrop fades in (200ms), card slides up 16px + fades in (300ms).
- Inline validation (email format).
- Submit: button enters loading state (subtle pulse) → success state fades in.
- Escape key or backdrop click closes modal.
- Trap focus while open. Restore focus to triggering button on close.

---

### 14. Designer contact form *(modal, separate from waitlist)*

**Purpose**: Qualified lead capture from ID firms. More fields = more intent signal.

**Trigger**: "Talk to us about being an early partner" and "I'm an interior designer →".

**Content**
- **Heading** (display-md): Become an early partner firm.
- **Help**: Tell us about your firm. We'll reply within two working days.
- **Fields**:
  - Your name *(required)*.
  - Firm name *(required)*.
  - Email *(required)*.
  - Mobile *(required)*.
  - Roughly how many active projects right now? *(select: 1–5, 6–15, 16–30, 30+)*.
  - Biggest coordination headache right now? *(textarea, required)*. Help: *"A couple of sentences is plenty."*
- **Submit button**: `Send` (clay).
- **Success state**:
  > Thanks. We'll reply within two working days. — Sean (founder)

**Interaction**: Same modal patterns as waitlist.

---

### 15. Footer

**Layout**: Full-width, `ink` background, `mist`/`paper` text. 3-column grid on desktop, stacked on mobile.

**Column 1 (wider)**
- Wordmark + tagline:
  > The system of record for Singapore renovations. Built in Singapore.

**Column 2 — Product**
- How it works
- For designers
- FAQ

**Column 3 — Contact**
- hello@renomate.sg *(placeholder)*
- Privacy *(coming)*
- Terms *(coming)*

**Bottom strip**: © 2026 Renomate. Built in Singapore.

**Interaction**: Static. Links transition `mist` → `paper` on hover.

---

## Visual asset checklist

Production note: most of these mockups don't exist yet. For the v1 build, the realistic options are (a) build the app first and screenshot real screens, (b) Figma mockups commissioned from a designer, or (c) AI-generated mockups in v1 with real screenshots swapped in later.

| ID | What it shows | Used in section(s) |
|---|---|---|
| `HERO_MOCKUP` | Animated mobile device showing home screen — phase card, decision card, invoice card. Loops with subtle motion. | 1 |
| `PROBLEM_ILLUSTRATION` | Line-art "scattered → organised" abstract. Optional. | 3 |
| `VISUAL_TIMELINE` | Timeline view, 7 phases, "you are here" marker on phase 4. | 4 |
| `VISUAL_DECISIONS` | Decisions queue, 3 pending items with deadlines + trade tags. | 4 |
| `VISUAL_QUOTATION` | Quotation breakdown, 5 line items SGD, change order highlighted. | 4 |
| `VISUAL_MONEY` | Money tab table, 3 invoices Paid/Paid/Overdue. | 4 |
| `VISUAL_TIMELINE_FULL` | Full Timeline screen for sticky-scroll. | 5a |
| `VISUAL_DECISIONS_DETAIL` | Decisions list + transition to single decision detail with image options. | 5b |
| `VISUAL_MONEY_DRILLDOWN` | Money tab + drilldown to invoice with receipt photo. | 5c |
| `VISUAL_DEFECT_FLOW` | Defect detail — photo, pin, status workflow. | 5d |
| `VISUAL_HOMEOWNER_HOME` | Homeowner home screen. | 7 (Tab 1) |
| `VISUAL_DESIGNER_DASHBOARD` | Mobile designer view. | 7 (Tab 2) |
| `VISUAL_DESIGNER_DASHBOARD_FULL` | Desktop designer dashboard, 8 active projects. | 9 |
| `HOW_IT_WORKS_DIAGRAM` | 3-step connected line-art diagram. | 8 |
| `LOGO_MARQUEE` | Grayscale partner logos. | 2 (later) |

---

## Build notes (when ready to code)

- **Framework**: Next.js 14 (App Router) + TypeScript + Tailwind.
- **Animation libraries**:
  - **framer-motion** for component-level reveals, tabs, modals.
  - **GSAP + ScrollTrigger** for the sticky-scroll feature deep-dive (Section 5) — its precision is worth the bundle cost.
  - Vanilla IntersectionObserver for simple reveal triggers.
- **Performance**: lazy-load below-the-fold visuals, AVIF/WebP, preload Fraunces hero weight, target ≤200KB initial JS.
- **Accessibility**: every animation respects `prefers-reduced-motion`. All interactive elements keyboard-navigable. ARIA on tab control. Focus management on modals.
- **Form backend**: Supabase `waitlist` table (see `DataModel.md` §11) for both forms, with `audience` column distinguishing homeowner vs. id_firm leads.
- **Analytics**: Plausible or Vercel Analytics. No Google Analytics, no Facebook Pixel — keeps the page light and the privacy story clean.

---

## Open decisions *(for founder review)*

1. **Hero headline** — `Your renovation, organised.` is the proposal. Alternatives:
   - *Every project, on one calm record.* (more poetic)
   - *Run your renovation like a professional.* (more aspirational)
   - *The workspace your renovation deserves.* (most direct value-prop)

2. **Stat in §6 — overdue deposit norm** — accurate and relevant, but borders on adversarial framing of the industry. Could replace with a positive Renomate metric post-beta (e.g. *"X projects coordinated"*).

3. **§7 tabs vs. two stacked sections** — tabs save space but require interaction. Stacked sections are more discoverable for skim-readers. Worth A/B testing later.

4. **Sticky-scroll in §5** — high-effort, high-payoff pattern. If timeline is tight, an acceptable v1 fallback is a vertically stacked sequence with reveal animations (no sticky behaviour). Decide before build.

5. **Visual asset production path** — see "production note" above the checklist. Decide before scheduling design work.

6. **Domain** — `renomate.sg` assumed throughout. Confirm and register before contact emails go live.
