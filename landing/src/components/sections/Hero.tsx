"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { Pill } from "../ui/Pill";
import { useModal } from "../modals/ModalContext";

export function Hero() {
  const { open } = useModal();
  const prefersReducedMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 24, stiffness: 120 });
  const sy = useSpring(my, { damping: 24, stiffness: 120 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(-x * 6);
      my.set(-y * 6);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, prefersReducedMotion]);

  return (
    <header className="pt-24 pb-24 md:pt-28 md:pb-28">
      <div className="container-page">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0, 0, 1] } },
            }}
            className="mb-5"
          >
            <Pill variant="coral">Built in Singapore · for HDB, condo and landed renovations</Pill>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } },
            }}
            className="font-heading text-display-xl text-ink mb-5 max-w-[900px]"
          >
            Your renovation,
            <br />
            organised.
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } },
            }}
            className="text-body-lg text-charcoal max-w-[640px] mb-7"
          >
            A single workspace for the timeline, decisions, prices and invoices that define every
            Singapore renovation &mdash; designed for homeowners and the interior designers who run
            their projects.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } },
            }}
            className="flex flex-wrap gap-3 items-center"
          >
            <button
              onClick={() => open("waitlist")}
              className="inline-flex items-center px-7 py-4 text-base font-medium rounded bg-coral text-white hover:bg-red-400 transition-colors ease-brand"
            >
              Join the waitlist
            </button>
            <button
              onClick={() => open("designer")}
              className="inline-flex items-center px-7 py-4 text-base font-medium rounded bg-white text-ink border border-cloud hover:bg-snow transition-colors ease-brand"
            >
              I&rsquo;m an interior designer &rarr;
            </button>
          </motion.div>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } },
            }}
            className="text-body-sm text-slate mt-5"
          >
            Free during private beta · Launching late 2026
          </motion.p>
        </motion.div>

        <motion.div
          style={{ x: sx, y: sy }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0, 0, 1] }}
          className="mt-12 max-w-[760px] mx-auto"
        >
          <HeroMockup />
        </motion.div>
      </div>
    </header>
  );
}

function HeroMockup() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-card">
      <div className="text-[11px] uppercase tracking-[0.1em] text-slate font-semibold mb-3">
        A glance tells you everything
      </div>

      <div className="bg-white rounded-lg p-5 shadow-card mb-3">
        <div className="text-[11px] uppercase tracking-[0.08em] text-slate font-medium mb-2">
          What&rsquo;s next
        </div>
        <div className="font-heading text-[22px] leading-tight text-ink mb-2">
          Carpentry starts Mon 02 Jun
        </div>
        <div className="text-[13px] text-slate tabular">Phase 4 of 7 · 1 decision blocking</div>
        <div className="mt-4 h-1 bg-snow rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-coral"
            initial={{ width: "45%" }}
            animate={{ width: ["45%", "47%", "45%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg p-5 shadow-card mb-3">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[11px] uppercase tracking-[0.08em] text-slate font-medium">
            Decision blocking next phase
          </div>
          <DecisionPillFlip />
        </div>
        <div className="font-heading text-[18px] leading-tight text-ink mb-1">
          Kitchen cabinet handle finish
        </div>
        <div className="text-[13px] text-slate">Brushed brass or matte black</div>
      </div>

      <div className="bg-white rounded-lg p-5 shadow-card">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[11px] uppercase tracking-[0.08em] text-slate font-medium">
            Outstanding invoice
          </div>
          <Pill variant="overdue">Overdue</Pill>
        </div>
        <div className="font-mono text-[18px] text-ink tabular mb-1">SGD 9,780.00</div>
        <div className="text-[13px] text-slate tabular">INV-2026-0014 · Carpentry milestone</div>
      </div>
    </div>
  );
}

function DecisionPillFlip() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Pill variant="overdue">Overdue 2d</Pill>
    </motion.div>
  );
}
