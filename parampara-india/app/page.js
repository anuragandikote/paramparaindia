import Banner from "@/components/home/banner";
import HowItWorks from "@/components/home/howItWorks";
import IndustriesSection from "@/components/home/industriesSection";
import ProductsPreview from "@/components/home/productsPreview";
import SavingsCalculator from "@/components/home/savingsCalculator";
import StoveModelSelector from "@/components/home/stoveModelSelector";
import Marquee from "@/components/ui/marquee";

export default function HomePage() {
  return (
    <section className="section">
      <Banner />
      <ProductsPreview />
      <IndustriesSection />
      <HowItWorks />
      <SavingsCalculator />
      <StoveModelSelector />
    </section>
  );
}
