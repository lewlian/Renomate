"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";

const steps = [
  {
    n: "01",
    title: "Your designer sets up the project",
    body: "They define the timeline, upload the quotation, and invite you with one tap.",
  },
  {
    n: "02",
    title: "You and your designer work in one place",
    body: "Decisions, files, invoices, defects — all in the project, all timestamped, all searchable.",
  },
  {
    n: "03",
    title: "Sub-contractors join their own channels",
    body: "Each trade gets a private link to their own channel. No app to install, no new account to create.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32 bg-paper">
      <div className="container-page">
        <div className="max-w-[720px] mb-12">
          <ScrollReveal>
            <span className="inline-block text-caption font-medium uppercase tracking-wider text-clay-deep mb-4">
              How it works
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-display-lg text-ink">
              Three steps to a project that runs itself.
            </h2>
          </ScrollReveal>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Connecting line (desktop only) */}
          <motion.div
            className="hidden md:block absolute top-[48px] left-[16%] right-[16%] h-px bg-clay/40 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0, 0, 1] }}
          />

          {steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={i * 0.15}>
              <div>
                <div className="font-display text-[48px] leading-none text-clay mb-3 relative z-10 bg-paper inline-block pr-3">
                  {s.n}
                </div>
                <h4 className="font-semibold text-heading text-ink mb-2">{s.title}</h4>
                <p className="text-body text-charcoal">{s.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
