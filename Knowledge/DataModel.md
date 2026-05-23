# Renomate — Data Model (v0.1)

The proposed Postgres schema for the Renomate MVP, written to be database-agnostic enough that we can set up Supabase (or any Postgres host) later without rework. Designed against the MVP scope in `MVP.md`.

Each table below lists fields, types, brief descriptions, and intent for access control. Field types use Postgres conventions (`uuid`, `text`, `timestamptz`, `jsonb`, `numeric(12,2)` for money, `text[]` for tag arrays).

---

## Conventions

- **Primary keys**: `id uuid` defaulting to `gen_random_uuid()`. Never use auto-increment integers — UUIDs play better with mobile-first apps and offline-first sync if we ever need it.
- **Timestamps**: every table has `created_at timestamptz not null default now()`. Mutable rows also have `updated_at timestamptz` maintained by a trigger.
- **Soft delete**: most user-facing entities have `deleted_at timestamptz` (nullable). Audit log is never deleted.
- **Money**: `numeric(12,2)` in SGD. Always store in cents-equivalent decimal, never floats. Currency is column-level even though we're SGD-only at MVP — keeps door open.
- **Dates vs. timestamps**: project milestones (planned_start, due_date) are `date`. Anything with an event time is `timestamptz`.
- **Status / role / type fields**: Postgres `enum` types listed in §10. Easier to query and constrain than free-text columns.
- **Row-level security (RLS)**: every table has RLS enabled. Access boils down to "are you a member of the firm/project that owns this row?" Intent noted per table; actual policies written when Supabase is set up.

---

## 1. Identity & multi-tenancy

### `users`
Extends Supabase `auth.users` (or a generic auth provider). One row per human.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | Matches `auth.users.id`. |
| `email` | `text` unique | Required. |
| `phone` | `text` | Optional, for SMS invites. |
| `full_name` | `text` | |
| `avatar_url` | `text` | |
| `created_at` | `timestamptz` | |

**Access**: every authenticated user reads their own row; firm admins read members of their firm.

### `firms`
The ID firm. The paying tenant.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `name` | `text` not null | |
| `slug` | `text` unique | URL-friendly, e.g. `monoloft`. |
| `logo_url` | `text` | |
| `uen` | `text` | SG business registration number, optional. |
| `plan` | `enum firm_plan` | `beta`, `standard`. Pricing TBD. |
| `created_at` | `timestamptz` | |

**Access**: firm members read; firm admins write.

### `firm_memberships`
Maps users to firms with a role. A user can belong to multiple firms (rare but possible for principals who consult).

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `firm_id` | `uuid` → `firms.id` | |
| `user_id` | `uuid` → `users.id` | |
| `role` | `enum firm_role` | `admin`, `designer`. |
| `created_at` | `timestamptz` | |

**Unique constraint**: (`firm_id`, `user_id`).

---

## 2. Projects & membership

### `projects`
One renovation. Owned by a firm.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `firm_id` | `uuid` → `firms.id` | The owning firm. |
| `name` | `text` not null | E.g. "Tan family — Tampines Block 678 #04-12". |
| `property_type` | `enum property_type` | `hdb`, `condo`, `landed`, `commercial`. |
| `address` | `text` | Free-text postal address. |
| `unit_size_sqft` | `integer` | Optional. |
| `status` | `enum project_status` | `setup`, `active`, `defect_period`, `completed`, `archived`. |
| `planned_start_date` | `date` | |
| `planned_end_date` | `date` | |
| `actual_start_date` | `date` | Set when first phase starts. |
| `actual_end_date` | `date` | Set at handover. |
| `created_by` | `uuid` → `users.id` | The designer who created the project. |
| `created_at` | `timestamptz` | |
| `deleted_at` | `timestamptz` | Soft delete. |

**Access**: any user in `project_memberships` for this project can read. Designers and firm admins write. Clients/sub-contractors don't write project-level fields.

### `project_memberships`
Who's on a project and what they can do.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `project_id` | `uuid` → `projects.id` | |
| `user_id` | `uuid` → `users.id` | Nullable until the invite is accepted (see `invites`). |
| `role` | `enum project_role` | `client`, `co_client`, `designer`, `firm_admin`, `sub_contractor`. |
| `trade` | `enum trade` nullable | Only for `sub_contractor`. See enum §10. |
| `status` | `enum membership_status` | `invited`, `active`, `removed`. |
| `invited_email` | `text` | Set on invite, kept for audit. |
| `invited_phone` | `text` | |
| `invited_by` | `uuid` → `users.id` | |
| `joined_at` | `timestamptz` | |
| `created_at` | `timestamptz` | |

**Unique constraint**: (`project_id`, `user_id`) when `user_id` is not null.

**Access**: anyone on the project reads project_memberships for that project. Only `designer` / `firm_admin` writes.

### `invites`
Pending invites — the durable token used in magic links and SMS/email invites.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `project_id` | `uuid` → `projects.id` | |
| `channel_id` | `uuid` → `channels.id` nullable | For sub-contractor channel-scoped invites. |
| `email` | `text` | One of email or phone is required. |
| `phone` | `text` | |
| `role` | `enum project_role` | |
| `trade` | `enum trade` nullable | |
| `token` | `text` unique | Long random string used in URLs. |
| `expires_at` | `timestamptz` | |
| `accepted_at` | `timestamptz` | |
| `accepted_by` | `uuid` → `users.id` | Set on acceptance. |
| `created_by` | `uuid` → `users.id` | |
| `created_at` | `timestamptz` | |

---

## 3. Timeline

### `phases`
Named phases of one project, in sequence.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `project_id` | `uuid` → `projects.id` | |
| `name` | `text` | E.g. "Hacking", "Masonry", "Carpentry". |
| `description` | `text` | |
| `sequence` | `integer` | 1, 2, 3… for ordering. |
| `planned_start` | `date` | |
| `planned_end` | `date` | |
| `actual_start` | `date` | Set when phase moves to in_progress. |
| `actual_end` | `date` | Set on completion. |
| `status` | `enum phase_status` | `pending`, `in_progress`, `complete`, `blocked`. |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

**Index**: (`project_id`, `sequence`).

---

## 4. Decisions

### `decisions`
Choices the client (or someone) owes the project to keep things moving.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `project_id` | `uuid` → `projects.id` | |
| `phase_id` | `uuid` → `phases.id` nullable | Optional — link to the phase it blocks. |
| `title` | `text` not null | "Master bathroom floor tile". |
| `description` | `text` | Longer context. |
| `options` | `jsonb` | Array of options, each with label + optional image_file_id + cost_delta. Free-form for MVP. |
| `deadline` | `date` | |
| `status` | `enum decision_status` | `pending`, `decided`, `overdue`, `not_needed`. |
| `decided_value` | `jsonb` | What was chosen. |
| `decided_at` | `timestamptz` | |
| `decided_by` | `uuid` → `users.id` | |
| `created_by` | `uuid` → `users.id` | The designer who queued it. |
| `created_at` | `timestamptz` | |

**Audit hook**: any update to `status` or `decided_value` writes an `audit_log` entry.

---

## 5. Money: quotations, change orders, invoices

### `quotations`
A versioned quotation document for the project. Most projects have one accepted quotation; change orders amend it.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `project_id` | `uuid` → `projects.id` | |
| `version` | `integer` | 1 for initial. |
| `currency` | `text` default `'SGD'` | |
| `total_amount` | `numeric(12,2)` | Derived from lines; cached for fast read. |
| `pdf_file_id` | `uuid` → `files.id` nullable | The signed PDF, optional. |
| `status` | `enum quotation_status` | `draft`, `issued`, `accepted`, `superseded`. |
| `issued_at` | `timestamptz` | |
| `accepted_at` | `timestamptz` | |
| `accepted_by` | `uuid` → `users.id` | The client who accepted. |
| `created_at` | `timestamptz` | |

### `quotation_lines`
Line items of a quotation.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `quotation_id` | `uuid` → `quotations.id` | |
| `category` | `text` | "Carpentry", "Electrical", etc. |
| `description` | `text` | |
| `quantity` | `numeric(10,2)` | |
| `unit` | `text` | "lot", "set", "sqft". |
| `unit_price` | `numeric(12,2)` | |
| `total` | `numeric(12,2)` | `quantity * unit_price`, stored for clarity. |
| `sequence` | `integer` | Display order. |

### `change_orders`
Amendments to the accepted quotation.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `project_id` | `uuid` → `projects.id` | |
| `quotation_id` | `uuid` → `quotations.id` | The base quotation this amends. |
| `title` | `text` not null | "Upgrade kitchen cabinet to soft-close hinges". |
| `description` | `text` | |
| `amount_delta` | `numeric(12,2)` | Can be negative for credits. |
| `status` | `enum change_order_status` | `proposed`, `approved`, `rejected`, `withdrawn`. |
| `proposed_at` | `timestamptz` | |
| `proposed_by` | `uuid` → `users.id` | Designer. |
| `decided_at` | `timestamptz` | |
| `decided_by` | `uuid` → `users.id` | Client. |
| `created_at` | `timestamptz` | |

### `invoices`
Invoice issued by the firm against the project.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `project_id` | `uuid` → `projects.id` | |
| `invoice_number` | `text` | Firm-formatted, e.g. `INV-2026-0014`. |
| `title` | `text` | "Carpentry milestone". |
| `description` | `text` | |
| `amount` | `numeric(12,2)` | |
| `currency` | `text` default `'SGD'` | |
| `status` | `enum invoice_status` | `draft`, `issued`, `partially_paid`, `paid`, `overdue`, `void`. |
| `due_date` | `date` | |
| `issued_at` | `timestamptz` | |
| `paid_amount` | `numeric(12,2)` default `0` | |
| `paid_at` | `timestamptz` | When fully paid. |
| `receipt_file_id` | `uuid` → `files.id` nullable | Photo of bank transfer screenshot, etc. |
| `pdf_file_id` | `uuid` → `files.id` nullable | The invoice PDF. |
| `created_by` | `uuid` → `users.id` | Designer. |
| `created_at` | `timestamptz` | |

**Note**: payment *processing* is out of MVP scope. This table just tracks status that someone marks manually after the bank transfer happens off-platform.

---

## 6. Channels & messages

### `channels`
Conversation channels within a project, including the main project channel and one per sub-trade.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `project_id` | `uuid` → `projects.id` | |
| `name` | `text` | "Main", "Aircon", "Carpentry". |
| `trade` | `enum trade` nullable | Set for trade-specific channels. |
| `is_main` | `boolean` default `false` | Exactly one per project. |
| `created_at` | `timestamptz` | |

### `channel_memberships`
Who's in each channel and whether they can post.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `channel_id` | `uuid` → `channels.id` | |
| `user_id` | `uuid` → `users.id` | |
| `can_post` | `boolean` default `true` | |
| `joined_at` | `timestamptz` | |

**Unique constraint**: (`channel_id`, `user_id`).

### `messages`

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `channel_id` | `uuid` → `channels.id` | |
| `user_id` | `uuid` → `users.id` | Author. |
| `body` | `text` | |
| `attachment_file_ids` | `uuid[]` | References to `files.id`. |
| `reply_to_message_id` | `uuid` → `messages.id` nullable | Threaded replies. |
| `created_at` | `timestamptz` | |
| `edited_at` | `timestamptz` | |
| `deleted_at` | `timestamptz` | Soft delete. |

**Indexes**: (`channel_id`, `created_at desc`) for paginated feeds.

---

## 7. Files

### `files`

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `project_id` | `uuid` → `projects.id` | |
| `uploaded_by` | `uuid` → `users.id` | |
| `name` | `text` | Original filename. |
| `storage_path` | `text` | Path in Supabase Storage / S3 bucket. |
| `mime_type` | `text` | |
| `size_bytes` | `bigint` | |
| `category` | `enum file_category` | `quotation`, `contract`, `permit`, `render`, `warranty`, `receipt`, `photo`, `other`. |
| `tags` | `text[]` | Free-form tags. |
| `created_at` | `timestamptz` | |
| `deleted_at` | `timestamptz` | Soft delete. |

---

## 8. Defects

### `defects`

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `project_id` | `uuid` → `projects.id` | |
| `reported_by` | `uuid` → `users.id` | Usually the client. |
| `title` | `text` | "Crack in master bathroom wall tile". |
| `description` | `text` | |
| `location_text` | `text` | "Master bathroom, left wall behind door". |
| `floor_plan_pin` | `jsonb` nullable | Reserved for v1.1; `{file_id, x, y}`. |
| `photo_file_ids` | `uuid[]` | References to `files.id`. |
| `assigned_trade` | `enum trade` nullable | |
| `assigned_to` | `uuid` → `users.id` nullable | Specific sub-contractor or designer. |
| `status` | `enum defect_status` | `open`, `acknowledged`, `scheduled`, `fixed`, `signed_off`, `wont_fix`. |
| `scheduled_for` | `date` nullable | |
| `resolved_at` | `timestamptz` | |
| `signed_off_at` | `timestamptz` | |
| `signed_off_by` | `uuid` → `users.id` | The client who confirmed it's done. |
| `created_at` | `timestamptz` | |

---

## 9. Audit log

### `audit_log`
Append-only. Never updated, never deleted. This is the dispute-prevention spine of the product.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `project_id` | `uuid` → `projects.id` | |
| `actor_user_id` | `uuid` → `users.id` nullable | Null for system-generated entries. |
| `action` | `enum audit_action` | See §10. |
| `entity_type` | `text` | E.g. `decision`, `invoice`, `phase`. |
| `entity_id` | `uuid` | The row affected. |
| `before` | `jsonb` | Snapshot before change. |
| `after` | `jsonb` | Snapshot after change. |
| `metadata` | `jsonb` | E.g. IP, user agent, channel. |
| `occurred_at` | `timestamptz` not null default `now()` | |

**Constraint**: RLS reads only; no inserts/updates/deletes from client. Inserts via Postgres triggers on the audited tables.

**Indexes**: (`project_id`, `occurred_at desc`).

---

## 10. Enum types

```sql
firm_plan         := ('beta', 'standard')
firm_role         := ('admin', 'designer')
project_role      := ('client', 'co_client', 'designer', 'firm_admin', 'sub_contractor')
membership_status := ('invited', 'active', 'removed')
property_type     := ('hdb', 'condo', 'landed', 'commercial')
project_status    := ('setup', 'active', 'defect_period', 'completed', 'archived')
phase_status      := ('pending', 'in_progress', 'complete', 'blocked')
decision_status   := ('pending', 'decided', 'overdue', 'not_needed')
quotation_status  := ('draft', 'issued', 'accepted', 'superseded')
change_order_status := ('proposed', 'approved', 'rejected', 'withdrawn')
invoice_status    := ('draft', 'issued', 'partially_paid', 'paid', 'overdue', 'void')
file_category     := ('quotation', 'contract', 'permit', 'render', 'warranty', 'receipt', 'photo', 'other')
defect_status     := ('open', 'acknowledged', 'scheduled', 'fixed', 'signed_off', 'wont_fix')
trade             := ('aircon', 'carpentry', 'electrical', 'plumbing', 'masonry', 'glass', 'painting', 'flooring', 'tiling', 'general')

audit_action := (
  'project_created', 'project_updated', 'project_archived',
  'member_invited', 'member_joined', 'member_removed',
  'phase_created', 'phase_started', 'phase_completed', 'phase_blocked',
  'decision_created', 'decision_decided', 'decision_reopened',
  'quotation_issued', 'quotation_accepted',
  'change_order_proposed', 'change_order_approved', 'change_order_rejected',
  'invoice_issued', 'invoice_paid', 'invoice_voided',
  'defect_opened', 'defect_resolved', 'defect_signed_off',
  'file_uploaded', 'file_deleted'
)
```

---

## 11. Landing-page table (separate concern)

### `waitlist`
For the landing page to insert into before the rest of the schema exists. Standalone table — no foreign keys into the rest of the model. Can be migrated later if waitlist users want to claim a real account.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `email` | `text` not null | |
| `audience` | `enum waitlist_audience` | `homeowner`, `id_firm`. |
| `name` | `text` | |
| `firm_name` | `text` | For ID firm leads. |
| `firm_size_bucket` | `text` | "1-5", "6-15", "16-30", "30+". |
| `bto_collection_date` | `date` nullable | For homeowners. |
| `headache` | `text` | "Biggest coordination headache right now" — free-text. |
| `source` | `text` | UTM source, referrer, etc. |
| `created_at` | `timestamptz` | |

**Unique on `email` + `audience`** to deduplicate.

---

## 12. Relationships at a glance

```
firms (1) ── (many) firm_memberships (many) ── (1) users
firms (1) ── (many) projects
projects (1) ── (many) project_memberships (many) ── (1) users
projects (1) ── (many) phases
projects (1) ── (many) decisions
projects (1) ── (many) quotations ── (many) quotation_lines
projects (1) ── (many) change_orders
projects (1) ── (many) invoices
projects (1) ── (many) channels (1) ── (many) messages
                                  (1) ── (many) channel_memberships
projects (1) ── (many) files
projects (1) ── (many) defects
projects (1) ── (many) audit_log    (append-only, trigger-driven)
projects (1) ── (many) invites
```

---

## 13. RLS intent (to be implemented at Supabase setup)

The actual Supabase policies will be SQL, but here's the intent that should drive them:

1. **Authenticated user** can read their own `users` row.
2. **Firm members** can read their `firms` and `firm_memberships` rows.
3. **Firm admins / designers** can write their firm's `projects`, `phases`, `decisions`, `quotations`, `change_orders`, `invoices`, `channels`, `defects`.
4. **Project members** can read everything for projects they're a member of.
5. **Clients** can write specific actions: decide a decision, mark an invoice paid, open a defect, sign off a defect, post in the main channel.
6. **Sub-contractors** can only read + post in the channels they're a member of; no project-wide reads.
7. **Audit log**: read-only from clients; writes only via Postgres triggers.

---

## 14. What's deferred (and where it would go)

- **Floor-plan pinning for defects** → `defects.floor_plan_pin` exists as placeholder JSONB; add a `floor_plans` table when needed (project_id, file_id, name).
- **Payment processing** → an `invoice_payments` table later (invoice_id, amount, method, stripe_payment_intent_id, processed_at).
- **WhatsApp bridge** → a `channel_integrations` table (channel_id, provider, external_thread_id, last_sync_at) and a queue for incoming/outgoing.
- **Multi-project firm dashboard** → no schema change; just queries across `projects` filtered by `firm_id`.
- **Selection sheets with versioning** → a `selections` table with versions; for MVP this is just a `decision` with multi-option `options` JSONB.
- **PDF project report export** → no schema change; reads from existing tables and renders via Edge Function.
- **AI features (message summaries, defect classification)** → derived/cached fields on existing tables; no MVP schema impact.

---

## 15. Setup notes (for when Supabase happens)

When you're ready to set this up:

1. Create a Supabase project in Singapore region.
2. Apply migrations in this order to respect foreign-key dependencies:
   1. Enums (§10)
   2. `users`, `firms`, `firm_memberships`
   3. `projects`, `project_memberships`, `invites`
   4. `phases`, `decisions`
   5. `quotations`, `quotation_lines`, `change_orders`, `invoices`
   6. `channels`, `channel_memberships`, `messages`
   7. `files`
   8. `defects`
   9. `audit_log` + triggers
   10. `waitlist` (independent, can come first)
3. Enable RLS on all tables. Write policies per §13.
4. Create Storage buckets: `project-files` (RLS-gated to project members), `public-assets` (for landing page).
5. Seed: create a test firm, designer, project to exercise the schema.

For the landing page, **only `waitlist` is needed** — it can ship independently of everything else and not block the rest of the data model from evolving.
