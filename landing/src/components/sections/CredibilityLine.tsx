import { ScrollReveal } from "../ui/ScrollReveal";

export function CredibilityLine() {
  return (
    <section className="py-12 border-y border-mist/40">
      <div className="container-page">
        <ScrollReveal>
          <p className="text-center text-body-sm text-slate tracking-wider">
            Singapore-built &middot; Singapore-hosted &middot; Designed for HDB, condo and landed
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
