import { ScrollReveal } from "../ui/ScrollReveal";

export function TrustBand() {
  return (
    <section className="bg-ink py-16 md:py-20">
      <div className="container-page">
        <ScrollReveal>
          <p className="font-heading text-[clamp(22px,3vw,32px)] leading-snug text-white max-w-[760px] mx-auto text-center">
            Built in Singapore. Hosted in Singapore. Designed for Singapore renovations.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
