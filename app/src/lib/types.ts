export type FirmPlan = "beta" | "standard";

export type FirmRole = "admin" | "designer";

export type ProjectRole =
  | "client"
  | "co_client"
  | "designer"
  | "firm_admin"
  | "sub_contractor";

export type MembershipStatus = "invited" | "active" | "removed";

export type PropertyType = "hdb" | "condo" | "landed" | "commercial";

export type ProjectStatus =
  | "setup"
  | "active"
  | "defect_period"
  | "completed"
  | "archived";

export type PhaseStatus = "pending" | "in_progress" | "complete" | "blocked";

export type DecisionStatus =
  | "pending"
  | "decided"
  | "overdue"
  | "not_needed";

export type QuotationStatus =
  | "draft"
  | "issued"
  | "accepted"
  | "superseded";

export type ChangeOrderStatus =
  | "proposed"
  | "approved"
  | "rejected"
  | "withdrawn";

export type InvoiceStatus =
  | "draft"
  | "issued"
  | "partially_paid"
  | "paid"
  | "overdue"
  | "void";

export type FileCategory =
  | "quotation"
  | "contract"
  | "permit"
  | "render"
  | "warranty"
  | "receipt"
  | "photo"
  | "other";

export type DefectStatus =
  | "open"
  | "acknowledged"
  | "scheduled"
  | "fixed"
  | "signed_off"
  | "wont_fix";

export type Trade =
  | "aircon"
  | "carpentry"
  | "electrical"
  | "plumbing"
  | "masonry"
  | "glass"
  | "painting"
  | "flooring"
  | "tiling"
  | "general";

export type AuditAction =
  | "project_created"
  | "project_updated"
  | "project_archived"
  | "member_invited"
  | "member_joined"
  | "member_removed"
  | "phase_created"
  | "phase_started"
  | "phase_completed"
  | "phase_blocked"
  | "decision_created"
  | "decision_decided"
  | "decision_reopened"
  | "quotation_issued"
  | "quotation_accepted"
  | "change_order_proposed"
  | "change_order_approved"
  | "change_order_rejected"
  | "invoice_issued"
  | "invoice_paid"
  | "invoice_voided"
  | "defect_opened"
  | "defect_resolved"
  | "defect_signed_off"
  | "file_uploaded"
  | "file_deleted";

export type WaitlistAudience = "homeowner" | "id_firm";

export interface User {
  id: string;
  email: string;
  phone: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Firm {
  id: string;
  name: string;
  slug: string | null;
  logo_url: string | null;
  uen: string | null;
  plan: FirmPlan;
  created_at: string;
}

export interface FirmMembership {
  id: string;
  firm_id: string;
  user_id: string;
  role: FirmRole;
  created_at: string;
}

export interface Project {
  id: string;
  firm_id: string;
  name: string;
  property_type: PropertyType | null;
  address: string | null;
  unit_size_sqft: number | null;
  status: ProjectStatus;
  planned_start_date: string | null;
  planned_end_date: string | null;
  actual_start_date: string | null;
  actual_end_date: string | null;
  created_by: string;
  created_at: string;
  deleted_at: string | null;
}

export interface ProjectMembership {
  id: string;
  project_id: string;
  user_id: string | null;
  role: ProjectRole;
  trade: Trade | null;
  status: MembershipStatus;
  invited_email: string | null;
  invited_phone: string | null;
  invited_by: string | null;
  joined_at: string | null;
  created_at: string;
}

export interface Invite {
  id: string;
  project_id: string;
  channel_id: string | null;
  email: string | null;
  phone: string | null;
  role: ProjectRole;
  trade: Trade | null;
  token: string;
  expires_at: string;
  accepted_at: string | null;
  accepted_by: string | null;
  created_by: string;
  created_at: string;
}

export interface Phase {
  id: string;
  project_id: string;
  name: string;
  description: string | null;
  sequence: number;
  planned_start: string | null;
  planned_end: string | null;
  actual_start: string | null;
  actual_end: string | null;
  status: PhaseStatus;
  created_at: string;
  updated_at: string | null;
}

export interface Decision {
  id: string;
  project_id: string;
  phase_id: string | null;
  title: string;
  description: string | null;
  options: unknown | null;
  deadline: string | null;
  status: DecisionStatus;
  decided_value: unknown | null;
  decided_at: string | null;
  decided_by: string | null;
  created_by: string;
  created_at: string;
}

export interface Quotation {
  id: string;
  project_id: string;
  version: number;
  currency: string;
  total_amount: number;
  pdf_file_id: string | null;
  status: QuotationStatus;
  issued_at: string | null;
  accepted_at: string | null;
  accepted_by: string | null;
  created_at: string;
}

export interface QuotationLine {
  id: string;
  quotation_id: string;
  category: string | null;
  description: string | null;
  quantity: number;
  unit: string | null;
  unit_price: number;
  total: number;
  sequence: number;
}

export interface ChangeOrder {
  id: string;
  project_id: string;
  quotation_id: string;
  title: string;
  description: string | null;
  amount_delta: number;
  status: ChangeOrderStatus;
  proposed_at: string | null;
  proposed_by: string;
  decided_at: string | null;
  decided_by: string | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  project_id: string;
  invoice_number: string | null;
  title: string | null;
  description: string | null;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  due_date: string | null;
  issued_at: string | null;
  paid_amount: number;
  paid_at: string | null;
  receipt_file_id: string | null;
  pdf_file_id: string | null;
  created_by: string;
  created_at: string;
}

export interface Channel {
  id: string;
  project_id: string;
  name: string;
  trade: Trade | null;
  is_main: boolean;
  created_at: string;
}

export interface ChannelMembership {
  id: string;
  channel_id: string;
  user_id: string;
  can_post: boolean;
  joined_at: string;
}

export interface Message {
  id: string;
  channel_id: string;
  user_id: string;
  body: string;
  attachment_file_ids: string[];
  reply_to_message_id: string | null;
  created_at: string;
  edited_at: string | null;
  deleted_at: string | null;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  uploaded_by: string;
  name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number;
  category: FileCategory;
  tags: string[];
  created_at: string;
  deleted_at: string | null;
}

export interface Defect {
  id: string;
  project_id: string;
  reported_by: string;
  title: string;
  description: string | null;
  location_text: string | null;
  floor_plan_pin: unknown | null;
  photo_file_ids: string[];
  assigned_trade: Trade | null;
  assigned_to: string | null;
  status: DefectStatus;
  scheduled_for: string | null;
  resolved_at: string | null;
  signed_off_at: string | null;
  signed_off_by: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  project_id: string;
  actor_user_id: string | null;
  action: AuditAction;
  entity_type: string;
  entity_id: string;
  before: unknown | null;
  after: unknown | null;
  metadata: unknown | null;
  occurred_at: string;
}

export interface Waitlist {
  id: string;
  email: string;
  audience: WaitlistAudience;
  name: string | null;
  firm_name: string | null;
  firm_size_bucket: string | null;
  bto_collection_date: string | null;
  headache: string | null;
  source: string | null;
  created_at: string;
}
