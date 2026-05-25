import { ScrollReveal } from "../ui/ScrollReveal";
import { AnimatedNumber } from "../ui/AnimatedNumber";

const stats = [
  {
    value: 66,
    suffix: "%",
    caption: "of Singapore renovation regrets trace back to communication gaps.",
    source: "Industry data",
  },
  {
    value: 120,
    prefix: "~",
    caption: "consumer complaints filed with CASE each year on incomplete renovation works.",
    source: "MTI, 2017–2023",
  },
  {
    value: 50,
    suffix: "%",
    caption: "upfront deposit is the industry norm — making clarity from day one essential.",
    source: "Industry standard",
  },
];

export function Stats() {
  return (
    <section className="py-24 md:py-32 bg-canvas border-y border-ash/40">
      <div className="container-page">
        <ScrollReveal className="mb-12">
          <span className="inline-block text-caption font-medium uppercase tracking-wider text-violet mb-4">
            Why this matters
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-7">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div>
                <div className="font-heading text-[clamp(56px,8vw,96px)] leading-none text-deep-charcoal mb-4 tabular">
                  <AnimatedNumber
                    value={s.value}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix ?? ""}
                    delay={i * 200}
                    duration={1200}
                  />
                </div>
                <p className="text-body text-charcoal max-w-[280px] mb-2">{s.caption}</p>
                <p className="text-[12px] uppercase tracking-wider text-smoke font-medium">{s.source}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5} className="mt-12">
          <p className="text-body-lg text-charcoal max-w-[640px]">
            Renomate is built to address the structural cause of all three.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
