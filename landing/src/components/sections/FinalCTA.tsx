"use client";

import { ScrollReveal } from "../ui/ScrollReveal";
import { useModal } from "../modals/ModalContext";

export function FinalCTA() {
  const { open } = useModal();
  return (
    <section className="py-24 md:py-32 bg-canvas border-t border-ash/40">
      <div className="container-narrow text-center">
        <ScrollReveal>
          <h2 className="font-heading text-display-lg text-deep-charcoal mb-5">
            Ready to run your next renovation differently?
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-body-lg text-charcoal mb-7 max-w-[520px] mx-auto">
            Join the waitlist and we&rsquo;ll be in touch when private beta opens.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => open("waitlist")}
              className="inline-flex items-center px-7 py-4 text-base font-medium rounded-sm bg-onyx text-white hover:opacity-90 transition-colors ease-brand"
            >
              Join the waitlist
            </button>
            <button
              onClick={() => open("designer")}
              className="inline-flex items-center px-7 py-4 text-base font-medium rounded-sm bg-canvas text-charcoal border border-ash hover:bg-hint-sky transition-colors ease-brand"
            >
              I&rsquo;m an interior designer &rarr;
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
