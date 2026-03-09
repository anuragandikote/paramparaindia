"use client";

import GoogleMap from "@/common/googleMaps";
import Banner from "@/components/home/banner";
import HowItWorks from "@/components/home/howItWorks";
import IndustriesSection from "@/components/home/industriesSection";
import ProductsPreview from "@/components/home/productsPreview";
import SavingsCalculator from "@/components/home/savingsCalculator";
import StoveModelSelector from "@/components/home/stoveModelSelector";
import Marquee from "@/components/ui/marquee";
import { useEffect } from "react";
import { trackCustom } from "@/lib/gtag";

export default function HomePage() {
  useEffect(() => {
    // Track website landed event when home page loads
    trackCustom('website_landed', {
      page_type: 'home',
      landing_timestamp: new Date().toISOString(),
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown'
    });
  }, []);

  return (
    <section className="section">
      <Banner />
      <ProductsPreview />
      <GoogleMap />
      <IndustriesSection />
      <HowItWorks />
      <SavingsCalculator />
      <StoveModelSelector />
    </section>
  );
}
