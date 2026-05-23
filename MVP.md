# Renomate — MVP Feature Scope

A working hypothesis of what to build first, second, and later. This is the *starting position* before founder discovery calls with SG ID firms — expect it to change.

## Guiding Principles

1. **One project, one source of truth.** Everything about one renovation lives in one place. No "where did we discuss this" ever again.
2. **The homeowner is a first-class user on mobile.** Most competitors treat the homeowner as a portal afterthought. We don't.
3. **Sub-contractors join with zero friction.** Magic link, optional app install, possible WhatsApp bridge. If a contractor has to "create an account" they won't.
4. **Every state change is timestamped and exportable.** Dispute-readiness is part of the product, not a feature.
5. **MVP is what makes one renovation 10x better, not what wins a feature comparison.**

---

## MVP (v1.0) — Ship this first

The minimum set that replaces the main ID WhatsApp group for one renovation.

### Project core

1. **Project timeline** — named phases (e.g., hacking, masonry, carpentry, painting, defect, handover) with start dates, durations, and a clear "you are here" indicator.
2. **What's next** — a single prominent card answering *"what is the next thing that has to happen, and who is blocking it?"* This is the most important screen.
3. **Pending decisions** — queue of decisions the homeowner needs to make (tile choice, paint colour, socket positions), each with a deadline driven by the timeline.
4. **Delivery log** — what arrived on site, when, with photo evidence. Homeowner can confirm receipt.
5. **Defect tracker** — snag list with photos, optional pin on a floor plan, status (open / scheduled / fixed / signed-off).
6. **Design renders / files** — view, comment, approve. Image-first; PDF support.
7. **Invoices / payments** — schedule, status, receipts. Display-only at MVP (no payment processing).

### Coordination core

8. **Sub-trade channels** — under one project, each trade (aircon, carpenter, electrical, plumbing, etc.) is a channel with its own messages, deliveries, milestones. Sub-contractors invited as guests.
9. **Unified project inbox** — one feed across all channels for the homeowner, with channel filters.
10. **Document vault** — quotation, contract, permits, warranties, manuals. Simple flat storage with tags.

### Trust core

11. **Audit log** — every approval, payment status change, schedule change is timestamped. Read-only.
12. **Export project report** — single PDF of the whole project, suitable for CASE complaints, insurance, or resale disclosure.

### Auth & onboarding

- ID firm signs up, creates a project, invites the homeowner via SMS/email.
- Homeowner downloads the app or uses a web view; account auto-provisioned from the invite.
- Sub-contractor receives a magic link per channel; can view + post without an app install.

---

## v1.1 — Soon after MVP

Things we'll likely want fast, but aren't required to prove value on the first project:

- **Floor-plan pinning** for defects and deliveries (MVP can have plain photos with text location).
- **Calendar export** — sync project milestones to Google/Apple Calendar.
- **Selection sheets** — formal "approve this finish" workflow with versioning (currently rolled into "pending decisions").
- **WhatsApp bridge** for sub-contractors — they reply on WhatsApp, message lands in the channel. Read-only first, then two-way.
- **Multi-project dashboard** for ID firms — they're running 10–30 projects at once.
- **Permission tiers** — co-owner vs. spouse vs. parent-helping-out.

---

## Later — Useful, not yet validated

- **Payment processing** (Stripe SG / PayNow / GrabPay).
- **AI features**: auto-summarise messages into decisions/actions; classify defect photos by trade; draft handover reports.
- **Marketplace tie-in** — partnership or integration with Qanvast for the *before* stage.
- **Materials/SKU catalogue** — track which model of tap, which tile from which supplier.
- **Warranty timers** — automatic reminders when warranties expire.
- **Public project pages** — homeowner shares the journey publicly (a la Qanvast project stories).
- **Singpass KYC** for ID firm verification (a trust differentiator).

---

## What We're Explicitly NOT Building

- **Back-office accounting / GST returns** — that's ID Connect / Xintesys / Xero. We integrate, not replace.
- **3D modelling / rendering tools** — that's the designer's existing toolchain (SketchUp, etc.). We display renders, we don't generate them.
- **Lead generation / designer marketplace** — that's Qanvast. We could integrate later.
- **Generic construction PM** — staying focused on SG residential renovation. No commercial fit-out scope creep.

---

## Open Questions for Founder Discovery Calls

Before locking MVP, validate with 5–10 SG ID firm owners:

1. Of the 12 MVP features, which 3 would they pay for *today*? Which would they skip?
2. Do they currently use ID Connect, Xintesys, EstiPC, or a homegrown spreadsheet? Are they open to integrating vs. replacing?
3. What's the monthly tooling spend per active project today? (Sets a price ceiling.)
4. How do they handle sub-contractor comms today — WhatsApp groups they create, or do subs create their own?
5. How often do they get into disputes that would benefit from an audit log? (Validates the trust angle.)
6. Would they require the homeowner to use the app, or offer it as optional? (Determines two-sided adoption strategy.)
