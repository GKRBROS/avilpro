import { useEffect } from "react";
import { Navbar } from "@/sections/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { StorySection } from "@/sections/StorySection";
import { ItemsSection } from "@/sections/ItemsSection";
import { PremiumSection } from "@/sections/PremiumSection";
import { SupremeSection } from "@/sections/SupremeSection";
import { OutletsSection } from "@/sections/OutletsSection";
import { IngredientsSection } from "@/sections/IngredientsSection";
import { GuestsSection } from "@/sections/GuestsSection";
import { FranchiseSection } from "@/sections/FranchiseSection";
import { Footer } from "@/sections/Footer";

export const Main = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    resetScroll();
    window.addEventListener("pageshow", resetScroll);

    return () => {
      window.removeEventListener("pageshow", resetScroll);
    };
  }, []);

  return (
    <main className="relative box-border overflow-x-hidden scroll-smooth">
      <div className="fixed top-0 z-[80] w-full pt-[14.08px] md:pt-5">
        <div className="mx-auto w-full max-w-none px-[5.28px] md:max-w-[1140px] md:px-[7.5px]">
          <Navbar />
        </div>
      </div>
      <div id="home" className="scroll-mt-[110px]">
        <HeroSection />
      </div>
      <div id="about" className="scroll-mt-[110px]">
        <AboutSection />
      </div>
      <div className="scroll-mt-[110px]">
        <StorySection />
      </div>
      <div id="items" className="scroll-mt-[110px]">
        <ItemsSection />
      </div>
      <PremiumSection />
      <SupremeSection />
      <div id="outlets" className="scroll-mt-[110px]">
        <OutletsSection />
      </div>
      <IngredientsSection />
      <div id="gallery" className="scroll-mt-[110px]">
        <GuestsSection />
      </div>
      <div id="contact" className="scroll-mt-[110px]">
        <FranchiseSection />
      </div>
      <Footer />
    </main>
  );
};
