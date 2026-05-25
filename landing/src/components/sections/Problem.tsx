import { ScrollReveal } from "../ui/ScrollReveal";
import { AnimatedNumber } from "../ui/AnimatedNumber";

export function Problem() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-narrow">
        <ScrollReveal>
          <span className="inline-block text-caption font-medium uppercase tracking-wider text-violet mb-4">
            The reality of renovating
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h2 className="font-heading text-display-lg text-deep-charcoal mb-5">
            Renovation is one of the most complex projects a homeowner ever manages.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-[22px] leading-[1.55] text-charcoal mb-5">
            A typical Singapore renovation runs three to four months, costs forty thousand dollars
            or more, involves five to seven different trade teams, and requires dozens of decisions
            that each shape the ones that follow.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-[22px] leading-[1.55] text-charcoal mb-7">
            The information that holds it all together &mdash; the quotation breakdown, the design
            approvals, the delivery dates, the defect lists, the invoice statuses &mdash; lives in
            different places, with different people, in different formats. Keeping track is hard.
            Knowing what comes next is harder.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="border-l-[3px] border-violet pl-5 mt-7 text-body-lg text-smoke leading-relaxed">
            Industry data:{" "}
            <strong className="text-deep-charcoal font-semibold">
              <AnimatedNumber value={66} suffix="%" /> of renovation regrets in Singapore
            </strong>{" "}
            trace back to communication gaps between homeowners and their project teams.
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
