import HeroSlider from "@/components/home/HeroSlider";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import CategoriesSection from "../components/home/CategoriesSection"
import ExtraSections from "@/components/home/ExtraSections";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#090d16] text-white">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Featured Studios (Limit 6) */}
      <FeaturedStudios />

      {/* 3. Browse by Categories (Next) */}
      <CategoriesSection />
      {/* 4. Extra Static Sections (Next) */}
      <ExtraSections />
    </div>
  );
}