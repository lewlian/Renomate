# Renomate — Landing Page Copy (v0.1)

The draft copy for the marketing landing page. Drop-in usable; treat as a starting point that will tighten after a few rounds of reading aloud and a few founder calls.

Voice rules (from `DesignSystem.md`):
- Plainspoken, quietly confident, warm but professional, Singapore-direct.
- No "magical", "delight", "hey there", "we're excited to". No emoji in body copy.
- Numbers and specifics over adjectives. "Three days late" beats "really late".

---

## Hero

**Eyebrow** (small caption above headline):
> A Singapore-built renovation workspace.

**Headline** (Fraunces, display-xl, 1–2 lines max):
> Your renovation, finally on the record.

**Sub-headline** (Inter, body-lg, max 2 lines):
> The calm, structured workspace where Singapore homeowners and interior designers track timelines, decisions, prices and invoices — in one place, not scattered across seven WhatsApp groups.

**Primary CTA** (clay button): `Join the waitlist`
**Secondary CTA** (ghost/secondary): `I'm an interior designer →`

**Hero visual options** (pick after design exploration):
- A clean rendered mockup of the app's "What's next" home card showing a real-looking SG renovation in progress.
- Or: a real photo of a half-renovated HDB unit with a phone overlaid showing the app.

---

## The problem (empathy section)

**Section eyebrow**: `If you've renovated in Singapore, you know.`

**Body** (one paragraph, body-lg):
> One WhatsApp group with your ID. Another with the carpenter. Another with the aircon vendor. A fourth for the plumber. By month two, no one can answer simple questions: when does hacking finish, what was that tile decision again, did we already pay for the kitchen cabinet upgrade. The renovation costs forty thousand dollars and runs for four months — but the coordination tool is a chat app designed for sharing memes.

*(Optional callout pull-quote, smaller, gray):*
> Industry data: 66% of renovation regrets in Singapore trace back to communication failures between homeowners and their designers.

---

## The four values

Section eyebrow: `What Renomate gives you`

Headline (display-lg): `Four things WhatsApp cannot.`

Four cards (2x2 grid on desktop, stacked on mobile):

### 1. Timeline clarity
**Heading**: Know exactly where you are.
**Body**: Every phase laid out — hacking, masonry, carpentry, painting, defect, handover — with real dates. A glance tells you what's now, what's next, and what's blocked.

### 2. Decision clarity
**Heading**: Never miss a decision.
**Body**: Every choice your designer needs from you — tile colour, socket position, paint finish — in one queue with deadlines. No more scrolling through chats trying to remember what was agreed.

### 3. Price clarity
**Heading**: See where every dollar goes.
**Body**: The full quotation, line by line. Every change order tracked with what changed, when, and by how much. No more "I thought that was included."

### 4. Invoice clarity
**Heading**: Know what's owed, what's paid.
**Body**: Invoice schedule, payment status, receipts — all visible in one place. No more chasing on chat or wondering if a transfer went through.

---

## How it works

Section eyebrow: `How it works`

Headline (display-lg): `Three steps. No app installs for your contractors.`

Three numbered steps (horizontal on desktop):

**01 — Your designer creates the project**
They set up the timeline, upload the quotation, and invite you with one tap.

**02 — You and your designer work in one place**
Decisions, files, invoices, defects — all live in the project, all timestamped, all searchable.

**03 — Sub-contractors join their own channels**
Aircon, carpenter, electrical, plumber — each gets a magic link to their own channel. No new app to install, no new group to manage.

---

## For interior designers

(A distinct section, visually different from the homeowner-facing copy above. Possibly on a `linen` background to set it apart.)

Section eyebrow: `Interior designers`

Headline (display-lg): `Renomate works for you, too.`

Sub-headline:
> The same workspace that keeps your clients informed also protects your firm — and signals to new clients that you're the organised one.

Three short benefit blocks:

**Disputes that don't happen**
Every approval, every payment, every change order is timestamped and immutable. When a client says "I never agreed to that," you can pull up the record. The audit log alone has saved firms from CASE complaints worth more than years of subscription.

**Designer turnover, handled**
When a designer leaves mid-project, the next person inherits the *project* — not a 6,000-message WhatsApp scrollback. Timeline, decisions, files, approvals — all there, all current.

**A sales signal you can use**
"We run every project on Renomate" tells a first-time BTO buyer that you're organised, accountable, and not just another firm with a phone number. Use it in your pitches, on your website, and in your Qanvast profile.

**CTA** (clay button): `Talk to us about being an early partner`

Below the CTA, a short note:
> We're working with a small number of Singapore ID firms during beta. Early partners help shape the product and pay nothing during this period.

---

## Trust line (a thin band before footer)

> Built in Singapore. Designed for HDB, condo, and landed renovations. Data hosted in Singapore.

---

## Waitlist form

(Triggered from the hero primary CTA — modal or scroll-to-anchor.)

**Heading** (display-md): `Join the waitlist.`
**Body** (body): `We'll email you when beta opens. No spam, no sharing.`

Fields:
- **Email** (required)
- **BTO key collection date** (optional, date picker, helper text: "Helps us prioritise who to onboard first.")
- **Anything you'd want this app to solve?** (optional, textarea, helper text: "Optional, but useful.")

**Submit button**: `Join the waitlist`

**Success state**: `You're on the list. We'll be in touch when beta opens — usually within a few weeks of you joining.`

---

## ID firm contact form

(Linked from the hero secondary CTA and the "Talk to us about being an early partner" CTA.)

**Heading** (display-md): `Become an early partner firm.`
**Body** (body): `Tell us a bit about your firm. We'll reply within two working days.`

Fields:
- **Your name** (required)
- **Firm name** (required)
- **Email** (required)
- **Mobile** (required — most SG ID firms run on phone/WhatsApp)
- **Roughly how many active projects do you have right now?** (select: 1–5, 6–15, 16–30, 30+)
- **What's the biggest coordination headache for you right now?** (textarea, required, helper: "One or two sentences is plenty.")

**Submit button**: `Send`

**Success state**: `Thanks. We'll be in touch within two working days. — Sean (founder)`

---

## FAQ

Section eyebrow: `Common questions`

**When can I use it?**
We're opening private beta with a small group of Singapore ID firms in the coming months. Join the waitlist to be among the first to get access.

**How much will it cost?**
Free during beta. After launch, ID firms pay a monthly subscription. Homeowners and sub-contractors will always be free — they're invited into a project, they don't pay to participate.

**Does my designer need to use it?**
Yes. The designer creates and manages the project, you join as the homeowner. If your designer isn't on Renomate yet, tell them about us — we'll onboard them.

**What happens to my existing WhatsApp groups?**
Keep them for chat. Renomate handles the structured stuff WhatsApp does badly: tracking decisions, invoices, files, defects, and the project timeline. Most homeowners find they barely need WhatsApp once the project is on Renomate.

**Is my data safe?**
Yes. Your project data lives in a Singapore-hosted database (Supabase, Singapore region). Only the people invited to your project — your designer, you, your invited sub-contractors — can see it. We don't share data with third parties.

**Who built this?**
A Singapore homeowner who renovated and decided this had to exist. (Update this answer with your founder bio when ready.)

---

## Footer

Three columns on desktop, stacked on mobile:

**Renomate**
- Built in Singapore
- Beta launching [TBD]

**Contact**
- hello@renomate.sg (or whatever domain)
- Founder note (link to short essay/bio)

**Legal**
- Privacy
- Terms (coming with launch)

Bottom line: `© 2026 Renomate. All rights reserved.`

---

## Copy to-do before going live

- [ ] Founder bio paragraph (3–4 sentences, first-person, why this exists)
- [ ] Real launch timeline once known (replace "in the coming months")
- [ ] Pricing decision before "How much will it cost?" answer goes from vague to specific
- [ ] PDPA-compliant privacy policy (separate document)
- [ ] One actual testimonial from a pilot homeowner or ID firm (after first month of beta)
- [ ] At least 3 real SG renovation photos for hero and value-prop sections
