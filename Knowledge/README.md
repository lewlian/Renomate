# Renomate

A coordination app for Singapore home renovations — the single source of truth between an Interior Design (ID) firm, the homeowner, and every sub-contractor on the job.

## The Problem

A typical Singapore HDB or condo renovation runs 2–4 months, costs S$30k–S$80k+, and involves an ID firm plus 4–6 sub-trades (carpentry, aircon, electrical, plumbing, masonry, glass). Today, all coordination happens across:

- One main WhatsApp group with the ID
- A separate WhatsApp group per sub-contractor
- Email threads for invoices and renders
- Phone calls and ad-hoc site visits

Basic questions — *when does hacking start, what decision is blocking the next phase, what was delivered to the unit, where's the latest defect list, did we pay this invoice yet* — become genuinely hard to answer mid-project. The founder lived this and it was the awful kind of awful where nothing was on fire, you just couldn't tell what was going on.

The renovation industry in Singapore has a known dispute and trust problem (CASE receives ~120 prepayment-loss complaints/year; 66% of renovation regrets trace back to communication failures). The unstructured-chat status quo is a meaningful contributor.

## The Wedge

> **The during-renovation operating system for Singapore ID firms and their clients.**

Singapore-specific. Mobile-first for homeowners and contractors. Coordination-layer (not back-office) so it interops with existing ID firm tools rather than replacing them. Sub-contractor inclusive — one project, multiple trade channels, replacing the scatter of WhatsApp groups.

Nobody owns this layer in Singapore today:
- **Qanvast / HomeRenoGuru** own the *before* (matchmaking, inspiration). They stop at contract signing.
- **ID Connect / Xintesys** are firm-side back-office (quotes, invoices). No polished homeowner experience.
- **Houzz Pro / Buildertrend / JobTread** are mature global tools, but built for US general contractors and priced for ~10x larger projects. No SG localisation.

See [Research.md](./Research.md) for the full competitive map and market sizing.

## Documents in This Folder

| File | What's in it |
|---|---|
| [README.md](./README.md) | You are here. Project overview and orientation. |
| [Research.md](./Research.md) | Market sizing, competitive landscape, validated pain points, ID-firm value prop, risks. The stable reference. |
| [MVP.md](./MVP.md) | Proposed scope across three workstreams: landing page (built first), client app, ID firm app — single codebase, role-based. Will evolve as we talk to ID firms. |
| [DesignSystem.md](./DesignSystem.md) | Visual + interaction language: principles, palette (clay + warm neutrals), typography (Inter + Fraunces), components, accessibility. Shared across landing page and app. |
| [design-preview.html](./design-preview.html) | Open in a browser to see the design system rendered — palette, type, buttons, pills, real-context examples. The thing to react to before locking design v0.1. |
| [LandingPlan.md](./LandingPlan.md) | Full landing-page plan: section-by-section breakdown of purpose, copy, animations and interactions, plus visual placeholders. The brief for the landing-page build. |
| [DataModel.md](./DataModel.md) | Proposed Postgres schema for the MVP app — entities, fields, enums, relationships, RLS intent, Supabase setup order. Implementation-ready when we're ready. |
| [Stack.md](./Stack.md) | Tech stack recommendation and rationale per choice. |

## Status

**Research + design-system phase.** No app code yet. Next steps (in roughly this order):

1. **Open `design-preview.html` in a browser** — confirm or push back on the clay + Fraunces direction. This is the easiest "react and decide" step.
2. **Read `LandingPlan.md`** — react to section order, interaction patterns, and copy. Open decisions are listed at the bottom.
3. **Skim `DataModel.md`** — sanity-check the schema covers what you expect. No Supabase setup yet.
4. **Build the landing page** (Workstream 1 in `MVP.md`) using the design system + copy.
5. **Run founder discovery calls** with SG ID firms while landing-page traffic builds.
6. **Lock MVP scope** in `MVP.md` based on those conversations, then set up Supabase from `DataModel.md` and start app build.

## Naming

"Renomate" is a working name. Easy to rename the folder and the project when a real brand decision is made.
