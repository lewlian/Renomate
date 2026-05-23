# Renomate — Market Research

Research-phase document. Goal: validate that there's a real market and a real wedge before building anything. Last updated 2026-05-23.

---

## 1. Market Sizing — Is There a Real Market?

**Short answer: yes, sized in the hundreds of millions SGD per year for the design/coordination layer alone, and structurally growing.**

- **Singapore interior design services market: ~USD 0.77B in 2024**, projected CAGR of ~5.9% through 2031. ([6Wresearch](https://www.6wresearch.com/industry-report/singapore-interior-design-market-outlook))
- **HDB BTO supply pipeline is large and steady**: ~102,300 BTO flats launched 2021–2025, with 25,000+ in 2025 alone. Every BTO key collection triggers a renovation project — this is the most predictable funnel. ([Design Bureau](https://designbureau.sg/insights/commercial-interior-design-trends-statistics-singapore-2026-pQ5n8w/))
- **Construction demand at record levels** — S$44.2B in 2024 nationally (commercial included, but the same labour pool serves residential).
- Resale HDB and condo renovations layer on top of BTOs.

**Implied addressable user base**: roughly 30k–50k residential renovation projects per year in Singapore. Each involves 1 ID firm + 1–2 homeowner accounts + 3–6 sub-trade contractors. *Seat count per project is meaningfully larger than "one client"* — that matters for both engagement and pricing models.

**ID firm count**: Singapore has hundreds of registered ID firms. Qanvast's vetted directory alone runs in the hundreds, and the long tail of unvetted firms is larger. ([Qanvast directory](https://qanvast.com/sg/interior-designers-architects))

---

## 2. Competitive Landscape

Three distinct competitive layers. **Nobody owns the layer Renomate is targeting in Singapore.**

### Layer A — Singapore-specific, consumer-facing (inspiration & matchmaking)

| Player | What they do | Gap they leave |
|---|---|---|
| **Qanvast** | The dominant SG platform. Mobile + web. Lead-gen marketplace, inspiration feed, renovation cost calculator, reviews, vetting programme. Established 2013, mature. ([Vulcan Post](https://vulcanpost.com/522341/the-only-interior-designing-app-in-singapore-you-need-for-an-easy-renovation-journey/)) | **Stops at the moment of designer selection.** Once the contract is signed, the homeowner is dumped back into WhatsApp. No project coordination, timeline, defect tracking, or invoices. |
| **HomeRenoGuru** | BTO floor-plan previews, 3D mockups, rough cost estimates, designer browsing. ([HomeRenoGuru](https://www.homerenoguru.sg/articles/tips-advice/mobile-app-for-bto-inspiration/)) | Same — pre-project only. |
| **Home & Decor / SquareRooms** | Editorial + design-app listicles. | Media, not software. |

> The entire SG consumer market for renovation apps is concentrated in the *pre-project* (matchmaking) stage. The *during-project* (coordination) stage is unowned. That's the wedge.

### Layer B — Singapore-specific, ID-firm-facing (back-office / CRM)

| Player | What they do | Gap they leave |
|---|---|---|
| **ID Connect** | Singapore-built. Cloud system for quotations, product pricing, contracts, invoices, change orders. Integrates with lead-gen platforms and suppliers. Handles SG taxation, supplier rebates, AP invoice variation. ([ID Connect](https://www.idconnect.com.sg/)) | Back-office / financial workflow. **No client-facing coordination layer, no homeowner mobile app.** |
| **Xintesys** | SG-based "interior design practice management software" — project coordination for the firm side. ([Xintesys](https://xintesys.com/interior-design-practice-management-software-singapore-xintesys/)) | Internal firm tool; weak/absent homeowner-facing app. |
| **EstiPC / Estimac** | Estimate, purchase, invoice, report for ID firms. | Operations, not client comms. |

> SG ID firms have some internal tooling options. None extend to a polished homeowner experience. A firm using ID Connect today still talks to the client via WhatsApp.

### Layer C — Global remodeling / construction PM platforms

Mature and feature-complete, but **not built for SG HDB workflows** and priced for US general contractors:

| Player | Pricing | Notes |
|---|---|---|
| **Houzz Pro** | ~USD 149–199/mo + USD 60/extra user. ([Houzz Pro](https://pro.houzz.com/for-pros/software-construction-client-portal)) | Strong client portal. US-dominant. Selections, scheduling, financials. |
| **Buildertrend** | Premium, climbing fast. Standout: client portal. ([G2 reviews](https://www.g2.com/products/buildertrend/reviews)) | Built for US custom home builders. Overkill for SG HDB. |
| **CoConstruct** (now under Buildertrend) | Same family. Notable claim: client portal reduces selection-related communication by 73%. | Validates the thesis that a structured portal materially reduces chat noise. |
| **JobTread** | Cheaper, simpler, all features at every tier. | Same US-builder DNA. |
| **Programa** | ~USD 49/user/mo. Modern UI, procurement-first. ([Programa](https://programa.design/blog/crm-software-for-interior-designers)) | Interior-design specific, global. |
| **Dzylo** | AI-powered ID workflow (lead → quote → site → delivery). India-origin. ([Dzylo](https://dzylo.ai/)) | Closest DNA to Renomate, but not SG-localised and not focused on homeowner mobile. |
| **BuildScan / Fieldwire / GoAudits** | Defect/snag list specialists. ([BuildScan](https://buildscan.co/)) | Point solutions — useful benchmarks for the defect-check feature. |

> Global PM tools are mature, but (a) priced for ~10x larger US projects, (b) built around US trades/permits/scheduling conventions, and (c) firm-first with the homeowner as an afterthought. None handle SG-specific items like HDB renovation permits, MCST condo approvals, or the SG sub-trade grouping (aircon as a distinct vendor relationship, etc.).

---

## 3. Pain Point Validation — Industry-Documented

The founder's personal experience is the *modal* experience, not an outlier:

- **66% of renovation regrets stem from communication failures** between homeowners and contractors (industry data cited by SG renovation publications).
- **CASE receives ~120 prepayment-loss complaints/year** related to incomplete renovation works in Singapore (2017–2023 average, MTI data). ([SingaporeLegalAdvice](https://singaporelegaladvice.com/law-articles/renovation-disputes-singapore/))
- **ID firms don't need licenses** to operate in SG — low barrier means high variance in professionalism, and high churn (designers leaving mid-project is well-documented).
- **40–50% deposits are industry norm**, leaving homeowners exposed when comms break down.
- Documented case studies repeatedly cite: no working schedule, poor sub-contractor supervision, limited communication, designer turnover mid-project, wrong walls hacked. ([Stacked Homes nightmare case](https://stackedhomes.com/a-singapore-couples-9-month-renovation-nightmare-and-what-you-can-learn-from-it/), [FixFirst](https://fixfirst.sg/home-repair/singapores-legally-embattled-renovation-and-interior-design-sector-an-explainer/))

**Product implication**: the value proposition isn't just "nicer than WhatsApp" — it's **risk reduction and dispute prevention**. A timestamped, structured record of decisions, milestones, deliveries, defects, and payments is *evidence* if things go wrong. That changes the willingness-to-pay calculus for both ID firms (less liability) and homeowners (less risk).

---

## 4. Positioning — The Wedge

> **"The during-renovation operating system for Singapore ID firms and their clients."**

Concretely:

- **Singapore-localised** — HDB permit flow, MCST condo approvals, BTO key-collection timing, SGD invoicing, common SG sub-trades (aircon, carpentry, electrical, plumbing, masonry, glass).
- **Client-first mobile experience**, not a bolt-on portal stuck onto a firm-centric tool.
- **Coordination-layer, not back-office** — interop with ID Connect / Xintesys for quotes and invoices rather than competing with them.
- **Sub-contractor inclusive** — replaces the 4–6 fragmented WhatsApp groups with one project, where each trade is a channel/scope with its own deliveries, milestones, and defect lists. Sub-contractors as zero-friction guests.
- **Distribution wedge**: Qanvast owns the *before*; Renomate owns the *during*. Natural partnership story — and a competitive risk (see Section 5).

---

## 5. Risks & Open Questions

- **Qanvast moves first.** They have the audience and brand. If they bolt on a coordination module, the wedge narrows. *Mitigation*: move quickly, build deep on the *during* side, secure ID-firm relationships.
- **ID firms are the gatekeeper.** Homeowners can't unilaterally adopt — the firm has to be on board. Two-sided cold start. *Likely playbook*: sell firm-first (SaaS seat), firm invites the homeowner free. That's what Buildertrend / Houzz Pro do.
- **Sub-contractors will resist new tools.** They live on WhatsApp for a reason. Need near-zero-friction participation — magic-link web view, no required app install, possibly a WhatsApp Business API bridge for read-and-reply.
- **Willingness-to-pay from small SG ID firms is uncertain.** Houzz Pro at USD 150+/mo doesn't translate down to SG ID economics. Local benchmarks (ID Connect, Xintesys pricing) would tell us — worth a few founder calls before pricing decisions.
- **Regulatory tailwind?** Renovation disputes are a known issue in SG. Worth checking if BCA / HDB / CASE has any digital record-keeping push that could be a tailwind for "every project has an audit log."

---

## Sources

- [Singapore Interior Design Market — 6Wresearch](https://www.6wresearch.com/industry-report/singapore-interior-design-market-outlook)
- [Commercial Interior Design Trends & Statistics Singapore 2026 — Design Bureau](https://designbureau.sg/insights/commercial-interior-design-trends-statistics-singapore-2026-pQ5n8w/)
- [Qanvast Singapore — platform overview](https://qanvast.com/sg)
- [Vulcan Post on Qanvast](https://vulcanpost.com/522341/the-only-interior-designing-app-in-singapore-you-need-for-an-easy-renovation-journey/)
- [HomeRenoGuru BTO app](https://www.homerenoguru.sg/articles/tips-advice/mobile-app-for-bto-inspiration/)
- [ID Connect — SG ID back-office software](https://www.idconnect.com.sg/)
- [Xintesys — SG ID practice management](https://xintesys.com/interior-design-practice-management-software-singapore-xintesys/)
- [Houzz Pro — construction client portal](https://pro.houzz.com/for-pros/software-construction-client-portal)
- [Buildertrend reviews — G2](https://www.g2.com/products/buildertrend/reviews)
- [Programa — interior design CRM](https://programa.design/blog/crm-software-for-interior-designers)
- [Dzylo — AI-powered ID software](https://dzylo.ai/)
- [BuildScan — defect/snag list app](https://buildscan.co/)
- [Renovation disputes in Singapore — SingaporeLegalAdvice](https://singaporelegaladvice.com/law-articles/renovation-disputes-singapore/)
- [9-month renovation nightmare — Stacked Homes](https://stackedhomes.com/a-singapore-couples-9-month-renovation-nightmare-and-what-you-can-learn-from-it/)
- [SG renovation sector legal explainer — FixFirst](https://fixfirst.sg/home-repair/singapores-legally-embattled-renovation-and-interior-design-sector-an-explainer/)
