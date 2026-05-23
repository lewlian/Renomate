# Renomate — Tech Stack

Working recommendation for a Singapore mobile-first SaaS with an ID-firm web dashboard, a homeowner mobile app, and zero-friction sub-contractor access. Optimised for a small team shipping fast.

---

## Summary

| Layer | Choice | Why |
|---|---|---|
| Mobile (homeowner, contractor) | **React Native + Expo (EAS)** | One codebase iOS + Android, OTA updates, modern DX. |
| Web (ID firm dashboard) | **Next.js (App Router)** | Shares TypeScript with mobile, deep ecosystem, fast to ship. |
| Backend / DB | **Supabase** (Postgres + Auth + Realtime + Storage) | Renovation is realtime-heavy. Postgres is the right primitive. SG-region available. |
| File storage | **Supabase Storage** (S3-compatible) | Co-located with DB. Cloudflare R2 later if egress matters. |
| Push notifications | **Expo Push** | Built-in with Expo. Free, reliable. |
| Email | **Resend** | Modern API, React Email templates. |
| WhatsApp bridge (later) | **WhatsApp Business API** via Meta or BSP | Required for the contractor-side adoption play. |
| Hosting (web) | **Vercel** | Next.js native. SG edge. |
| Hosting (DB/API) | **Supabase Cloud, Singapore region** | Data residency increasingly expected for SG SaaS. |
| Payments (later) | **Stripe SG + PayNow** | Deferred — display-only invoicing in MVP. |
| Auth (later) | **Singpass API** | Deferred — for ID firm KYC if we want a trust differentiator. |

---

## Mobile: React Native + Expo

The founder's instinct is correct. Singapore is meaningfully cross-platform:

- Homeowners skew iOS.
- Contractors and ID-firm site staff skew Android.

One codebase is non-negotiable.

**Specifics:**

- **Expo SDK** with **EAS Build** (cloud builds, no Xcode/Android Studio babysitting) and **EAS Update** (OTA updates without app store review — critical for shipping fast in the early months).
- **Expo Router** for file-based navigation. Maps cleanly to the project-centric URL structure (`/project/[id]/timeline`, `/project/[id]/defects/[defectId]`, etc.) and to deep links from notifications.
- **TypeScript** end-to-end.
- **TanStack Query** for server state, **Zustand** for the small amount of local state.
- **NativeWind** (Tailwind for RN) or **Tamagui** for styling — both keep the design system consistent with the Next.js web app.
- **react-native-mmkv** for local cache (faster than AsyncStorage).
- **Sentry** for crash reporting from day one.

---

## Web Dashboard: Next.js (App Router)

ID firms run 10–30 projects in parallel. They need a desktop view. The dashboard is also where billing, settings, and team management live.

- **Next.js App Router** with **TypeScript**.
- Share UI primitives with mobile where sensible (Tamagui supports both; if going NativeWind, share design tokens via a small Tailwind preset).
- **shadcn/ui** for desktop UI primitives.
- **TanStack Query** for parity with mobile.
- Auth via **Supabase Auth SSR helpers**.

---

## Backend: Supabase (start), revisit if needed

Renomate is fundamentally a CRUD + realtime + file-storage app:

- Many users post small structured updates (a delivery, a defect, a decision).
- Other users should see those updates near-instantly.
- Lots of photos move through the system.
- Authorisation is row-level (project membership, channel membership).

Supabase fits all of this in one product:

- **Postgres** with **Row Level Security** for per-project / per-channel access control. RLS is the right tool for "homeowner sees their project, sub-contractor sees their channel."
- **Realtime** subscriptions for live updates (defect status changes, new deliveries, approvals).
- **Storage** for photos, renders, PDFs.
- **Edge Functions** (Deno) for the few server-side actions that don't belong in the client (sending invites, generating PDF reports, signing magic links for contractor access).
- **Singapore region** for data residency.

**Why not Convex / Firebase / a custom Node API?**
- Convex is ergonomic but Postgres + SQL is a more future-proof primitive — schema migrations, full-text search, BI tooling, and reporting all work without leaving SQL.
- Firebase auth is rough for the multi-tenant project membership model we need; Firestore makes complex queries painful.
- A custom Node API is the right answer eventually but slows the first six months. Easy to peel off into a separate service later (Hono/Fastify) once we have product-market signals.

**Migration story**: if Supabase ever becomes a constraint, the database itself is just Postgres — portable to RDS, Neon, or self-hosted. Auth and storage are the parts that take work to replace, which is acceptable.

---

## Notifications

- **Expo Push** for mobile — homeowner gets notified when a defect is updated, a render is uploaded, a payment is requested.
- **Resend** + **React Email** for transactional email — invites, weekly digests, exported reports.
- **WhatsApp Business API** (deferred to v1.1+): sub-contractors get a normal-looking WhatsApp message that links into their channel. This is the lever that solves the contractor-adoption problem.

---

## What's Explicitly Deferred

- **Payments processing** — display-only invoicing in MVP. Stripe SG + PayNow integration later.
- **Singpass auth** — only useful once we want to verify ID firm identity for a trust badge.
- **AI features** — defect-photo classification, message summarisation, decision extraction. All are wedges once the core works.
- **Native modules / custom build config** — stay inside Expo's managed workflow as long as possible. Eject only when forced.

---

## Repo Shape (proposal for the build-planning session)

```
renomate/
├── apps/
│   ├── mobile/        # Expo app (homeowner + contractor)
│   └── web/           # Next.js (ID firm dashboard)
├── packages/
│   ├── ui/            # shared design tokens / primitives
│   ├── types/         # shared TS types (DB rows, API contracts)
│   └── api-client/    # generated Supabase client + query hooks
├── supabase/
│   ├── migrations/
│   └── functions/     # edge functions
└── docs/              # this folder, eventually
```

Monorepo via **pnpm workspaces** + **Turborepo**. Standard for an RN + Next.js shared-code setup.

---

## Cost Sketch (rough, monthly, for first 6 months at low traffic)

| Item | Cost (USD/mo) |
|---|---|
| Supabase Pro (1 project, SG region) | ~25 |
| Vercel Pro | ~20 |
| Expo EAS Production | ~30 |
| Apple Developer | ~8 (annualised) |
| Google Play | ~2 (one-time, annualised) |
| Resend | ~0 (free tier) |
| Sentry | ~0 (free tier) |
| Domain | ~1 |
| **Total** | **~90/mo** |

WhatsApp Business API and AI features add cost when they come online. Payments processing is revenue-aligned (Stripe fees).
