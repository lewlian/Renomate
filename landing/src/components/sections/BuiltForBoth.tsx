"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useModal } from "../modals/ModalContext";

type Tab = "homeowners" | "designers";

export function BuiltForBoth() {
  const [tab, setTab] = useState<Tab>("homeowners");
  const { open } = useModal();

  return (
    <section className="py-24 md:py-32 bg-paper">
      <div className="container-page">
        <div className="max-w-[700px] mb-10">
          <ScrollReveal>
            <span className="inline-block text-caption font-medium uppercase tracking-wider text-clay-deep mb-4">
              Built for both sides
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-display-lg text-ink">One workspace, two perspectives.</h2>
          </ScrollReveal>
        </div>

        {/* Tab control */}
        <ScrollReveal delay={0.1}>
          <div className="inline-flex relative bg-linen rounded-full p-1 mb-10">
            <TabButton active={tab === "homeowners"} onClick={() => setTab("homeowners")}>
              For homeowners
            </TabButton>
            <TabButton active={tab === "designers"} onClick={() => setTab("designers")}>
              For interior designers
            </TabButton>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {tab === "homeowners" ? (
            <motion.div
              key="ho"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            >
              <div>
                <h3 className="font-display text-[28px] leading-tight text-ink mb-4">
                  Clarity, without having to ask for it.
                </h3>
                <p className="text-body-lg text-charcoal mb-6">
                  You see the same project your designer sees &mdash; the timeline, the decisions queue, every
                  invoice, every defect. No chasing, no screenshots, no trying to remember what was agreed.
                  Everything important is in one place, with timestamps.
                </p>
                <button
                  onClick={() => open("waitlist")}
                  className="inline-flex items-center px-5 py-3 text-[15px] font-medium rounded bg-clay text-paper hover:bg-clay-deep transition-colors"
                >
                  Join the waitlist
                </button>
              </div>
              <HomeownerMockup />
            </motion.div>
          ) : (
            <motion.div
              key="dr"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            >
              <div>
                <h3 className="font-display text-[28px] leading-tight text-ink mb-4">
                  A workspace that works for your firm.
                </h3>
                <p className="text-body-lg text-charcoal mb-5">
                  Renomate gives your firm a structured record of every project &mdash; approvals, change orders,
                  payments, decisions &mdash; that protects you in disputes and signals professionalism to new
                  clients. When a designer leaves mid-project, the next person inherits a clean project, not a
                  chat scrollback.
                </p>
                <ul className="space-y-2 mb-6 text-body text-charcoal">
                  <Bullet>Audit trail that holds up in disputes.</Bullet>
                  <Bullet>Designer handovers in minutes, not weeks.</Bullet>
                  <Bullet>A trust signal for first-time BTO buyers comparing firms.</Bullet>
                </ul>
                <button
                  onClick={() => open("designer")}
                  className="inline-flex items-center px-5 py-3 text-[15px] font-medium rounded bg-clay text-paper hover:bg-clay-deep transition-colors"
                >
                  Talk to us about being an early partner
                </button>
              </div>
              <DesignerMockup />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 py-2 text-[14px] font-medium rounded-full transition-colors z-10 ${
        active ? "text-paper" : "text-charcoal hover:text-ink"
      }`}
    >
      {active && (
        <motion.span
          layoutId="tab-pill"
          className="absolute inset-0 bg-ink rounded-full -z-10"
          transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-clay mt-1.5 flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}

function HomeownerMockup() {
  return (
    <div className="bg-linen rounded-lg p-6 border border-mist">
      <div className="text-[11px] uppercase tracking-wider text-slate mb-3 font-medium">
        Your home view
      </div>
      <div className="bg-white rounded-md p-5 border border-mist mb-3">
        <div className="text-[11px] uppercase tracking-wider text-slate font-medium mb-2">This week</div>
        <div className="font-display text-[20px] leading-tight text-ink mb-1">
          Carpentry begins Mon 02 Jun
        </div>
        <div className="text-[13px] text-slate">1 decision needed before then</div>
      </div>
      <div className="bg-white rounded-md p-5 border border-mist">
        <div className="text-[11px] uppercase tracking-wider text-slate font-medium mb-2">Awaiting your decision</div>
        <div className="text-[14px] text-ink font-medium">Kitchen handle finish</div>
        <div className="text-[12px] text-slate">Brushed brass · Matte black</div>
      </div>
    </div>
  );
}

function DesignerMockup() {
  const projects = [
    { name: "Tan family · Tampines", phase: "Carpentry", overdue: 1 },
    { name: "Lim family · Bishan", phase: "Hacking", overdue: 0 },
    { name: "Chen family · Sengkang", phase: "Defect", overdue: 0 },
    { name: "Wong family · Yishun", phase: "Painting", overdue: 2 },
  ];
  return (
    <div className="bg-linen rounded-lg p-6 border border-mist">
      <div className="text-[11px] uppercase tracking-wider text-slate mb-3 font-medium">
        Firm dashboard · 4 of 12 active
      </div>
      <div className="bg-white rounded-md border border-mist divide-y divide-linen">
        {projects.map((p, i) => (
          <div key={i} className="px-4 py-3 flex items-center justify-between">
            <div>
              <div className="text-[14px] font-medium text-ink">{p.name}</div>
              <div className="text-[12px] text-slate">Phase: {p.phase}</div>
            </div>
            {p.overdue > 0 ? (
              <span className="text-[11px] font-medium text-error">{p.overdue} overdue</span>
            ) : (
              <span className="text-[11px] font-medium text-success">On track</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
