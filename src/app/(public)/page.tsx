import { Hero } from "./components/Hero";
import { KeyFeatures } from "./components/KeyFeatures";
import { Stats } from "./components/Stats";
import { HowItWorks } from "./components/HowItWorks";
import { CTA } from "./components/CTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <KeyFeatures />
      <CTA />
    </>
  );
}