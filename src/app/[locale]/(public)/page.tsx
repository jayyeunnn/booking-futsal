import HeroSection from "@/components/landing/HeroSection";
import SocialProofBar from "@/components/landing/SocialProofBar";
import CourtsSection from "@/components/landing/CourtsSection";
import LocationsSection from "@/components/landing/LocationsSection";
import PricingSection from "@/components/landing/PricingSection";
import GallerySection from "@/components/landing/GallerySection";
import PromoSection from "@/components/landing/PromoSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SocialProofBar />
      <CourtsSection />
      <LocationsSection />
      <PricingSection />
      <GallerySection />
      <PromoSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
