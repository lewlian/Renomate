# Renomate — MVP Scope

A working hypothesis of what to build first, second, and later. This is the *starting position* before founder discovery calls with SG ID firms — expect it to change.

---

## Reframed Value Proposition

**Renomate doesn't replace WhatsApp.** WhatsApp is fine for *chat*. Renomate is the **system of record** for the structured parts of a renovation that chat is terrible at: timeline, decisions, prices, invoices, approvals, defects.

The four headline values for homeowners:
1. **Clarity on timeline** — what phase we're in, what's next, when it ends.
2. **Clarity on decisions** — what's been decided, what's pending, what's blocking.
3. **Clarity on prices** — quotation breakdown, change orders, what each line costs.
4. **Clarity on invoices** — what's been billed, what's been paid, what's outstanding.

Everything else (defects, files, channels) supports those four.

For ID firms: the same data doubles as an **audit log** that protects them in disputes and a **sales signal** to win business. See `Research.md` Section 4.

---

## Build Order

There are three workstreams. **Build them in this order:**

1. **Landing page** — built first, before any app code. Used to validate demand (waitlist signups), capture ID firm interest, and force the brand/visual decisions upfront.
2. **App MVP** — single app, role-based access for both Client (homeowner) and ID firm. Built on the design system the landing page locks in.
3. **Discovery and iteration** — founder calls during landing-page traffic to validate which MVP features matter most before/while building.

---

## Workstream 1: Landing Page

**Priority: ship first, before any app code.**

This is the marketing front door, the demand-validation tool, and the brand-anchor that the app's design system will inherit from. It needs to be *very* good — first impression of a product that promises "professionalism" can't itself look unprofessional.

### Goals (in priority order)

1. **Capture homeowner waitlist signups** — email + (optional) BTO key collection date.
2. **Capture ID firm interest** — separate CTA, lead-qualifying contact form (firm name, size, pain points).
3. **Sell the four headline values** in plain language.
4. **Build credibility** before the product exists — design quality, founder note, "built by someone who lived it."

### Required sections

- **Hero**: headline + sub + dual CTA ("Join the waitlist" for homeowners, "I'm an ID firm" for designers) + visual.
- **The problem** — short empathetic vignette ("If you've renovated in Singapore, you know the WhatsApp scrollback chaos…").
- **The four values** — timeline / decisions / prices / invoices. Each with a short caption and a UI mockup or illustration.
- **For interior designers** — dedicated section: how Renomate protects their firm (audit log, dispute reduction, sales signal) with its own CTA.
- **How it works** — 3-step visual (firm creates project → homeowner gets invited → both work in one place).
- **Trust / built-in-SG** — single line: Singapore-built, data hosted in SG, designed for HDB / condo / landed.
- **Waitlist form** — email + optional fields. Confirmation page.
- **Contact form** (firm-side) — for ID firm enquiries.
- **Footer** — minimal: founder note link, privacy, contact.

### Out of scope for landing page v1

- Blog / content marketing (later).
- Pricing page (we don't know pricing yet — say "free during beta").
- Live demo (we don't have a product).

### Stack note

Build the landing page in the same repo and design system as the app (Next.js, Tailwind/NativeWind tokens, shared component primitives where possible). This forces the design system to exist before the app starts, which is the right sequencing.

---

## Workstream 2: App MVP

**Single app, single codebase. Role determines view and permissions.**

Users sign in with the same auth, but their account type (`client` or `designer`) — set at invite time by the ID firm — controls what they see and what actions they can take. Same screens, different affordances.

### Shared core (the data model)

These exist as one source of truth per project. Both roles read; permissions decide who writes.

1. **Project timeline** — named phases with start dates, durations, and a "you are here" indicator. (Designer creates and edits; client views.)
2. **Pending decisions** — queue of decisions the client owes (tile choice, paint colour, socket positions, finishes). Each with deadline + status (pending / decided / overdue). (Designer creates; client decides; both see.)
3. **Quotation + change orders** — the breakdown of what was quoted, line-itemed. Change orders appear inline with timestamps. (Designer creates; client approves; both see.)
4. **Invoices** — invoice schedule, status (issued / paid / overdue), receipts. Display-only at MVP (no payment processing). (Designer issues; client marks paid with receipt photo.)
5. **Files** — quotation PDF, contract, permits, renders, warranties. Tagged, searchable. (Both can upload.)
6. **Sub-trade channels** — under one project, each trade is a thread (aircon, carpentry, electrical, plumbing). Sub-contractors invited as guests via magic link, no app required. (Designer admins; client and sub-contractors participate.)
7. **Defects** — snag list with photos, status (open / scheduled / fixed / signed-off). Plain photo + text location at MVP, no floor-plan pinning yet. (Client creates; designer + relevant sub-trade close.)
8. **Audit log** — every approval, decision, payment status change, schedule change timestamped, immutable. Both roles see their own actions; designers see all. (System-generated.)

### Client role — what the homeowner sees and does

- **Home tab** — "Where we are now" + "What's next" card (the most important screen). One pending decision, one upcoming milestone, one outstanding invoice.
- **Timeline tab** — full phase view, scrubbable.
- **Decisions tab** — pending decisions to make, with deadlines. Make a decision = generate audit entry.
- **Money tab** — quotation + invoices + change orders. See what's been billed, paid, owed.
- **Defects tab** — file a defect with photos. See response from designer.
- **Files tab** — browse all project documents.
- **Channels tab** — read-only by default for sub-trade channels; can post in the main channel.

### ID firm role — what the designer sees and does

- **Home tab** — single project's "today" view: decisions due, defects opened, payments overdue, upcoming phase changes.
- **Setup** — create project, define timeline phases, upload quotation, set invoice schedule, invite client, invite sub-contractors per trade.
- **Decisions tab** — queue decisions for the client with deadlines. See decision status.
- **Money tab** — issue invoices, mark milestones, log change orders.
- **Defects tab** — triage defects, assign to sub-trade, mark resolved.
- **Files tab** — upload renders, contracts, permits.
- **Channels tab** — admin all sub-trade channels.

### What's explicitly cut from MVP (was in earlier draft)

- ~~**Delivery log**~~ — removed. Onboarding logistics/transportation vendors is unrealistic. Site arrivals can be captured ad-hoc as photos in the relevant channel or as files.
- ~~**Design renders approval workflow**~~ — at MVP, renders are just files with a "request approval" action that creates an audit entry. No fancy versioning yet.
- ~~**Export project report (PDF)**~~ — deferred to v1.1. The audit log exists at MVP, but pretty-printing it as a PDF can wait.

### Auth & onboarding

- ID firm signs up at renomate.sg → creates a firm account → invites designers (firm seats).
- Designer creates a project → invites homeowner via SMS/email → homeowner downloads app or uses web; account auto-provisioned from invite token.
- Designer invites sub-contractors per channel via magic link → no app install required for view + post.

---

## v1.1 — Soon after MVP

- **Floor-plan pinning** for defects (MVP has plain photos + text location).
- **WhatsApp bridge** — sub-contractors reply on WhatsApp, message lands in the channel. Read-only first, then two-way.
- **Multi-project dashboard** for ID firms running 10–30 projects in parallel.
- **PDF project report** — pretty-printed audit log + decisions + payments. Useful for handovers, disputes, insurance.
- **Calendar export** — sync project milestones to Google/Apple Calendar.
- **Selection sheets** — formal versioned "approve this finish" workflow.
- **Permission tiers** — co-owner vs. spouse vs. parent-helping-out on the client side.

---

## Later

- **Payment processing** (Stripe SG / PayNow / GrabPay).
- **AI features** — message summarisation, decision extraction, defect-photo classification.
- **Qanvast integration** — pull project once a homeowner picks a firm via Qanvast.
- **Materials/SKU catalogue** — track specific tap models, tile suppliers, warranty timers.
- **Public project pages** — homeowner shares journey publicly.
- **Singpass KYC** for ID firm verification.

---

## What We're Explicitly NOT Building

- **Back-office accounting / GST returns** — that's ID Connect / Xintesys / Xero. We integrate, not replace.
- **3D modelling / rendering tools** — we display renders, we don't generate them.
- **Lead generation / designer marketplace** — that's Qanvast.
- **Generic construction PM** — SG residential only. No commercial fit-out scope creep.

---

## Open Questions for Founder Discovery Calls

Before locking MVP, validate with 5–10 SG ID firm owners (start during landing-page traffic):

1. Of the eight shared-core features, which three would they pay for *today*? Which would they skip?
2. Do they currently use ID Connect, Xintesys, EstiPC, or homegrown spreadsheets? Open to integrating vs. replacing?
3. What's the monthly per-active-project tooling spend today? (Sets a price ceiling.)
4. How do they handle sub-contractor comms today — they create the groups, or do subs create their own?
5. How often do disputes happen that an audit log would have helped? (Validates trust angle.)
6. Would they require the homeowner to use the app, or offer it as optional? (Determines two-sided adoption strategy.)
7. What's their current quotation/invoice tool? PDF in WhatsApp? Spreadsheet? Software? (Validates the "Money tab" wedge.)
