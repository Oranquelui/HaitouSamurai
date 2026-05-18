import { Hero } from "@/components/landing/Hero";
import { ObjectionSection } from "@/components/landing/ObjectionSection";
import { PricingTeaser } from "@/components/landing/PricingTeaser";
import { ProofStrip } from "@/components/landing/ProofStrip";
import { TelicRecursion } from "@/components/landing/TelicRecursion";

export default function Home() {
  return (
    <main className="landing-bright">
      <Hero />
      <ProofStrip />
      <TelicRecursion />
      <ObjectionSection />
      <PricingTeaser />
    </main>
  );
}
