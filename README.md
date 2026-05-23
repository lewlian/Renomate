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
| [Research.md](./Research.md) | Market sizing, competitive landscape, validated pain points, risks. The stable reference. |
| [MVP.md](./MVP.md) | Proposed feature scope split into MVP / v1.1 / later. Will evolve as we talk to ID firms. |
| [Stack.md](./Stack.md) | Tech stack recommendation and rationale per choice. |

## Status

**Research phase.** No code yet. Next steps (in roughly this order):

1. Read the four docs end to end.
2. Do 5–10 discovery calls with SG ID firm owners — validate willingness-to-pay and which MVP features they'd actually adopt.
3. Lock MVP scope in `MVP.md` based on those conversations.
4. New session: build planning + scaffolding.

## Naming

"Renomate" is a working name. Easy to rename the folder and the project when a real brand decision is made.
