import { ModalProvider } from "@/components/modals/ModalContext";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { CredibilityLine } from "@/components/sections/CredibilityLine";
import { Problem } from "@/components/sections/Problem";
import { ValuePillars } from "@/components/sections/ValuePillars";
import { FeatureDeepDive } from "@/components/sections/FeatureDeepDive";
import { Stats } from "@/components/sections/Stats";
import { BuiltForBoth } from "@/components/sections/BuiltForBoth";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ForDesigners } from "@/components/sections/ForDesigners";
import { TrustBand } from "@/components/sections/TrustBand";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <ModalProvider>
      <Nav />
      <main>
        <Hero />
        <CredibilityLine />
        <Problem />
        <ValuePillars />
        <FeatureDeepDive />
        <Stats />
        <BuiltForBoth />
        <HowItWorks />
        <ForDesigners />
        <TrustBand />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </ModalProvider>
  );
}
