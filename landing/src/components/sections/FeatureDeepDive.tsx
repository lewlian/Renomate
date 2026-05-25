"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Pill } from "../ui/Pill";

const subsections = [
  {
    title: "Built around your project's actual schedule.",
    body:
      "Phases are named for what they actually are — hacking, masonry, carpentry — with planned and actual dates side by side. When something slips, the whole timeline updates. Everyone sees the same calendar.",
    visual: "timeline",
  },
  {
    title: "Decisions in the order they need to be made.",
    body:
      "Renomate queues pending decisions in the sequence the project actually needs them. Tile choice before the tiler arrives. Socket positions before the electrician comes back. Each decision carries a deadline, the options, and a record of who chose what, when.",
    visual: "decisions",
  },
  {
    title: "Numbers that always add up.",
    body:
      "The quotation, change orders and invoices are connected. Approve a change order — it flows into the running total. Mark an invoice paid — the project balance updates. No reconciling spreadsheets, no surprises at handover.",
    visual: "money",
  },
  {
    title: "A defect list that closes itself out.",
    body:
      "File a defect with a photo and a location note. The right trade gets notified, the status updates as the fix happens, you sign it off when satisfied. The whole loop, documented.",
    visual: "defects",
  },
];

export function FeatureDeepDive() {
  return (
    <section className="bg-canvas py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-[700px] mb-16">
          <span className="inline-block text-caption font-medium uppercase tracking-wider text-violet mb-4">
            See it in motion
          </span>
          <h2 className="font-heading text-display-lg text-deep-charcoal">
            The product, at a closer look.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-32 lg:space-y-48">
            {subsections.map((s, i) => (
              <SubSection key={i} {...s} index={i} />
            ))}
          </div>

          <div className="hidden lg:block">
            <StickyVisualStack />
          </div>
        </div>
      </div>
    </section>
  );
}

function SubSection({
  title,
  body,
  visual,
  index,
}: {
  title: string;
  body: string;
  visual: string;
  index: number;
}) {
  return (
    <div className="lg:min-h-[60vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      >
        <div className="font-mono text-[12px] text-violet tracking-wider mb-4">
          {String(index + 1).padStart(2, "0")} / {subsections.length.toString().padStart(2, "0")}
        </div>
        <h3 className="font-heading text-[32px] leading-tight text-deep-charcoal mb-5">{title}</h3>
        <p className="text-body-lg text-charcoal">{body}</p>
        <div className="lg:hidden mt-7">
          <VisualForKey vkey={visual} />
        </div>
      </motion.div>
    </div>
  );
}

function StickyVisualStack() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative h-full">
      <div className="sticky top-24 h-[70vh] flex items-center">
        <div className="relative w-full">
          {subsections.map((s, i) => (
            <CrossfadeVisual
              key={i}
              vkey={s.visual}
              index={i}
              total={subsections.length}
              progress={scrollYProgress}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CrossfadeVisual({
  vkey,
  index,
  total,
  progress,
  prefersReducedMotion,
}: {
  vkey: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  prefersReducedMotion: boolean;
}) {
  const step = 1 / total;
  const start = index * step;
  const mid = start + step / 2;
  const end = start + step;

  const opacity = useTransform(
    progress,
    index === 0
      ? [0, start, mid, end, Math.min(1, end + 0.05)]
      : [Math.max(0, start - 0.05), start, mid, end, Math.min(1, end + 0.05)],
    prefersReducedMotion ? [1, 1, 1, 1, 1] : index === 0 ? [1, 1, 1, 1, 0] : [0, 1, 1, 1, 0]
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <VisualForKey vkey={vkey} />
    </motion.div>
  );
}

function VisualForKey({ vkey }: { vkey: string }) {
  switch (vkey) {
    case "timeline":
      return <TimelineVisual />;
    case "decisions":
      return <DecisionsVisual />;
    case "money":
      return <MoneyVisual />;
    case "defects":
      return <DefectsVisual />;
    default:
      return null;
  }
}

function VisualShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-canvas rounded-md p-6 shadow-subtle">
      <div className="bg-canvas rounded-md p-5 shadow-subtle">{children}</div>
    </div>
  );
}

function TimelineVisual() {
  const phases = ["Hacking", "Masonry", "Plumbing", "Carpentry", "Painting", "Defect", "Handover"];
  return (
    <VisualShell>
      <div className="text-[11px] uppercase tracking-wider text-smoke mb-4 font-medium">Timeline</div>
      <ul className="space-y-3">
        {phases.map((p, i) => (
          <li key={p} className="flex items-center justify-between gap-3 text-[14px]">
            <div className="flex items-center gap-3">
              <span
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  i < 3 ? "bg-violet" : i === 3 ? "bg-violet" : "bg-smoke"
                }`}
              />
              <span className={i === 3 ? "text-deep-charcoal font-semibold" : "text-charcoal"}>
                {String(i + 1).padStart(2, "0")} &middot; {p}
              </span>
            </div>
            <span className="text-smoke text-[12px] tabular">
              {i < 3 ? "Complete" : i === 3 ? "In progress" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </VisualShell>
  );
}

function DecisionsVisual() {
  return (
    <VisualShell>
      <div className="text-[11px] uppercase tracking-wider text-smoke mb-4 font-medium">Decisions queue</div>
      <div className="space-y-3">
        <DecisionRow title="Kitchen cabinet handle finish" sub="Due in 2 days · Carpentry" pill={<Pill variant="overdue">Overdue</Pill>} />
        <DecisionRow title="Master bath floor tile" sub="Due Fri · Tiling" pill={<Pill variant="pending">Pending</Pill>} />
        <DecisionRow title="Living room socket positions" sub="Due Mon · Electrical" pill={<Pill variant="pending">Pending</Pill>} />
        <DecisionRow title="TV feature wall finish" sub="Decided 12 May · Fluted oak veneer" pill={<Pill variant="done">Decided</Pill>} />
      </div>
    </VisualShell>
  );
}

function DecisionRow({ title, sub, pill }: { title: string; sub: string; pill: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-hint-sky last:border-b-0">
      <div>
        <div className="text-[14px] font-medium text-deep-charcoal">{title}</div>
        <div className="text-[12px] text-smoke">{sub}</div>
      </div>
      {pill}
    </div>
  );
}

function MoneyVisual() {
  return (
    <VisualShell>
      <div className="text-[11px] uppercase tracking-wider text-smoke mb-4 font-medium">Money</div>
      <div className="text-[13px] text-smoke mb-4">
        SGD <span className="font-mono text-deep-charcoal">24,180</span> invoiced ·{" "}
        SGD <span className="font-mono text-deep-charcoal">14,400</span> paid
      </div>
      <table className="w-full text-[13px] tabular">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-smoke font-medium">
            <th className="pb-2">Invoice</th>
            <th className="pb-2">Phase</th>
            <th className="pb-2 text-right">Amount</th>
            <th className="pb-2 text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-hint-sky">
            <td className="py-2 font-mono">INV-001</td>
            <td className="py-2 text-charcoal">Deposit</td>
            <td className="py-2 text-right font-mono">SGD 4,800</td>
            <td className="py-2 text-right"><Pill variant="done">Paid</Pill></td>
          </tr>
          <tr className="border-t border-hint-sky">
            <td className="py-2 font-mono">INV-002</td>
            <td className="py-2 text-charcoal">Hacking</td>
            <td className="py-2 text-right font-mono">SGD 9,600</td>
            <td className="py-2 text-right"><Pill variant="done">Paid</Pill></td>
          </tr>
          <tr className="border-t border-hint-sky">
            <td className="py-2 font-mono">INV-003</td>
            <td className="py-2 text-charcoal">Carpentry</td>
            <td className="py-2 text-right font-mono">SGD 9,780</td>
            <td className="py-2 text-right"><Pill variant="overdue">Overdue</Pill></td>
          </tr>
        </tbody>
      </table>
    </VisualShell>
  );
}

function DefectsVisual() {
  return (
    <VisualShell>
      <div className="text-[11px] uppercase tracking-wider text-smoke mb-4 font-medium">Defect #0014</div>
      <div className="font-heading text-[20px] text-deep-charcoal mb-2">Crack in master bath wall tile</div>
      <div className="text-[13px] text-smoke mb-4">Master bath, left wall behind door</div>
      <div className="bg-hint-sky rounded-md h-32 flex items-center justify-center mb-4 text-smoke text-[12px]">
        [ photo placeholder ]
      </div>
      <div className="flex gap-2 flex-wrap">
        <Pill variant="done">Open</Pill>
        <span className="text-smoke text-[12px]">→</span>
        <Pill variant="progress">Scheduled</Pill>
        <span className="text-smoke text-[12px]">→</span>
        <Pill variant="pending">Fixed</Pill>
        <span className="text-smoke text-[12px]">→</span>
        <Pill variant="pending">Signed off</Pill>
      </div>
      <div className="text-[12px] text-smoke mt-4">Assigned to: Tiling team · Scheduled for 28 May</div>
    </VisualShell>
  );
}
