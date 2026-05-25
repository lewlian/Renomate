"use client";

import { ScrollReveal } from "../ui/ScrollReveal";
import { useModal } from "../modals/ModalContext";

const benefits = [
  {
    title: "An audit trail that holds up.",
    body:
      "Every approval, payment, change order and decision is timestamped and immutable. When disputes arise, the record is the answer.",
  },
  {
    title: "Continuity through designer changes.",
    body:
      "Designers leave. Projects don't have to suffer. Hand off a project in minutes — the new designer inherits the full state, not a chat history.",
  },
  {
    title: "A signal of professionalism.",
    body:
      "\"We run every project on Renomate\" tells a first-time BTO buyer that your firm is organised, accountable, and modern. Use it in pitches, on your website, and in your Qanvast profile.",
  },
];

export function ForDesigners() {
  const { open } = useModal();

  return (
    <section id="designers" className="bg-snow py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-[720px] mb-12">
          <ScrollReveal>
            <span className="inline-block text-caption font-medium uppercase tracking-wider text-coral mb-4">
              For interior design firms
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-heading text-display-lg text-ink mb-5">
              Run every project on a system that protects your firm.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-body-lg text-charcoal">
              Renomate is the workspace your clients see &mdash; and it&rsquo;s also the operational record your
              firm relies on for handovers, audits, and dispute resolution.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 0.1}>
              <div className="bg-white rounded-lg p-6 h-full shadow-card">
                <h4 className="font-heading text-[22px] leading-tight text-ink mb-3">{b.title}</h4>
                <p className="text-body text-charcoal leading-relaxed">{b.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center gap-5">
            <button
              onClick={() => open("designer")}
              className="inline-flex items-center px-7 py-4 text-base font-medium rounded bg-coral text-white hover:bg-red-400 transition-colors ease-brand"
            >
              Talk to us about being an early partner
            </button>
            <p className="text-body-sm text-slate max-w-[420px]">
              We work with a small number of Singapore ID firms during beta. Early partners help shape the
              product and pay nothing during this period.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
