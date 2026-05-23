"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Pill } from "../ui/Pill";

const pillars = [
  {
    n: "01",
    label: "TIMELINE",
    title: "Know exactly where you are.",
    body:
      "Every phase laid out — hacking, masonry, carpentry, painting, defect, handover — with planned and actual dates. A glance tells you what's happening now, what's next, and what's blocking progress.",
    size: "large" as const,
    visual: <TimelineMockup />,
  },
  {
    n: "02",
    label: "DECISIONS",
    title: "Every decision, on one queue.",
    body:
      "Tile colour. Socket position. Paint finish. Each choice the project needs from you, with a deadline driven by the timeline.",
    size: "small" as const,
    visual: <DecisionsMockup />,
  },
  {
    n: "03",
    label: "PRICES",
    title: "Every dollar accounted for.",
    body:
      "The quotation, line by line. Every change order tracked with what changed, when, and by how much.",
    size: "small" as const,
    visual: <QuotationMockup />,
  },
  {
    n: "04",
    label: "INVOICES",
    title: "Always know what's owed, what's paid.",
    body:
      "Invoice schedule, payment status, receipts — all in one place. Mark a transfer as paid and the audit trail captures the moment.",
    size: "large" as const,
    visual: <MoneyMockup />,
  },
];

export function ValuePillars() {
  return (
    <section id="product" className="bg-linen py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-[700px] mb-12">
          <ScrollReveal>
            <span className="inline-block text-caption font-medium uppercase tracking-wider text-clay-deep mb-4">
              What Renomate gives you
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-display-lg text-ink">
              A clear view of every project, every day.
            </h2>
          </ScrollReveal>
        </div>

        {/* Bento grid: 2 columns, with size variation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <ScrollReveal
              key={p.n}
              delay={i * 0.08}
              className={p.size === "large" ? "md:col-span-2" : "md:col-span-1"}
            >
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                className="bg-paper border border-mist rounded-md p-6 h-full"
              >
                <div className="font-mono text-[13px] text-clay-deep tracking-wider mb-3">
                  {p.n} &mdash; {p.label}
                </div>
                <h3 className="font-display text-[26px] leading-tight text-ink mb-3">{p.title}</h3>
                <p className="text-[15px] leading-6 text-charcoal mb-5">{p.body}</p>
                <div className="mt-5">{p.visual}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineMockup() {
  const phases = [
    { name: "Hacking", status: "done" },
    { name: "Masonry", status: "done" },
    { name: "Plumbing", status: "done" },
    { name: "Carpentry", status: "active" },
    { name: "Painting", status: "pending" },
    { name: "Defect", status: "pending" },
    { name: "Handover", status: "pending" },
  ];
  return (
    <div className="bg-white border border-mist rounded p-4">
      <div className="text-[11px] uppercase tracking-wider text-slate mb-3 font-medium">Project timeline</div>
      <ul className="space-y-2">
        {phases.map((p, i) => (
          <li key={p.name} className="flex items-center gap-3 text-[13px]">
            <span
              className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                p.status === "done" ? "bg-success" : p.status === "active" ? "bg-clay" : "bg-mist"
              }`}
            />
            <span className={p.status === "active" ? "text-ink font-semibold" : "text-charcoal"}>
              {String(i + 1).padStart(2, "0")} &middot; {p.name}
            </span>
            {p.status === "active" && (
              <span className="ml-auto text-clay-deep text-[11px] uppercase tracking-wider font-medium">
                You are here
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DecisionsMockup() {
  return (
    <div className="bg-white border border-mist rounded p-4 space-y-3">
      <Row title="Kitchen handle finish" sub="Due Fri" pill={<Pill variant="pending">Pending</Pill>} />
      <Row title="Floor tile, master bath" sub="Due Mon" pill={<Pill variant="overdue">Overdue</Pill>} />
      <Row title="TV wall finish" sub="Decided 12 May" pill={<Pill variant="done">Decided</Pill>} />
    </div>
  );
}

function QuotationMockup() {
  return (
    <div className="bg-white border border-mist rounded p-4">
      <div className="text-[11px] uppercase tracking-wider text-slate mb-3 font-medium">Quotation</div>
      <table className="w-full text-[13px]">
        <tbody>
          <Line label="Carpentry" amount="SGD 12,400" />
          <Line label="Electrical" amount="SGD 4,200" />
          <Line label="Plumbing" amount="SGD 3,800" />
          <Line label="Tiles" amount="SGD 5,600" />
          <Line label="Cabinet upgrade" amount="+SGD 480" highlight />
        </tbody>
      </table>
    </div>
  );
}

function MoneyMockup() {
  return (
    <div className="bg-white border border-mist rounded p-4">
      <div className="text-[11px] uppercase tracking-wider text-slate mb-3 font-medium">Invoices</div>
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-slate font-medium">
            <th className="pb-2">Invoice</th>
            <th className="pb-2">Phase</th>
            <th className="pb-2 text-right">Amount</th>
            <th className="pb-2 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="tabular">
          <InvoiceRow num="INV-001" phase="Deposit" amount="SGD 4,800" pill={<Pill variant="done">Paid</Pill>} />
          <InvoiceRow num="INV-002" phase="Hacking" amount="SGD 9,600" pill={<Pill variant="done">Paid</Pill>} />
          <InvoiceRow num="INV-003" phase="Carpentry" amount="SGD 9,780" pill={<Pill variant="overdue">Overdue</Pill>} />
        </tbody>
      </table>
    </div>
  );
}

function Row({ title, sub, pill }: { title: string; sub: string; pill: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="text-[14px] font-medium text-ink">{title}</div>
        <div className="text-[12px] text-slate">{sub}</div>
      </div>
      {pill}
    </div>
  );
}

function Line({ label, amount, highlight }: { label: string; amount: string; highlight?: boolean }) {
  return (
    <tr className={`border-t border-linen ${highlight ? "bg-clay-soft/40" : ""}`}>
      <td className="py-2 text-charcoal">{label}</td>
      <td className="py-2 text-right text-ink font-mono tabular">{amount}</td>
    </tr>
  );
}

function InvoiceRow({
  num,
  phase,
  amount,
  pill,
}: {
  num: string;
  phase: string;
  amount: string;
  pill: React.ReactNode;
}) {
  return (
    <tr className="border-t border-linen">
      <td className="py-2 text-charcoal font-mono">{num}</td>
      <td className="py-2 text-charcoal">{phase}</td>
      <td className="py-2 text-right text-ink font-mono">{amount}</td>
      <td className="py-2 text-right">{pill}</td>
    </tr>
  );
}
