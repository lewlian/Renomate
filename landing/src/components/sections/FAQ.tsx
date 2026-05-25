"use client";

import { ScrollReveal } from "../ui/ScrollReveal";
import { useState } from "react";

const faqs = [
  {
    q: "When can I start using Renomate?",
    a:
      "Private beta opens in the coming months with a small group of Singapore ID firms. Join the waitlist to be among the first to get access.",
  },
  {
    q: "How much does it cost?",
    a:
      "Free during beta. After launch, interior design firms pay a monthly subscription. Homeowners and sub-contractors are always free — they're invited into projects, never billed.",
  },
  {
    q: "Does my interior designer need to use it?",
    a:
      "Yes — the designer creates and manages the project. If your designer isn't on Renomate, let us know who they are and we'll reach out.",
  },
  {
    q: "What about the chats we already have set up?",
    a:
      "Use them however you like. Renomate handles the structured side of the project — timeline, decisions, money, defects, files. Day-to-day chat can stay where it is.",
  },
  {
    q: "Is my project data private?",
    a:
      "Yes. Your project data is hosted in Singapore and accessible only to people invited to your project. We don't share data with third parties.",
  },
  {
    q: "Who is behind Renomate?",
    a:
      "A Singapore homeowner who recently renovated and decided the experience deserved better tooling.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-canvas">
      <div className="container-narrow">
        <div className="mb-10">
          <ScrollReveal>
            <span className="inline-block text-caption font-medium uppercase tracking-wider text-violet mb-4">
              Common questions
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-heading text-display-lg text-deep-charcoal">Questions, answered.</h2>
          </ScrollReveal>
        </div>

        <div className="border-t border-ash">
          {faqs.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="border-b border-ash py-5 group"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex justify-between items-center gap-4 cursor-pointer list-none">
        <span className="font-semibold text-[17px] text-deep-charcoal">{q}</span>
        <span
          className={`font-heading text-[24px] text-smoke transition-transform duration-200 ease-brand ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </summary>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-brand ${
          open ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-body text-charcoal pt-1">{a}</p>
        </div>
      </div>
    </details>
  );
}
