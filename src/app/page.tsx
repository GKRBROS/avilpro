import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import MenuSection from "@/components/sections/MenuSection";
import GallerySection from "@/components/sections/GallerySection";
import WhatsAppForm from "@/components/sections/WhatsAppForm";
import StoreSection from "@/components/sections/StoreSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MenuSection />
        <GallerySection />
        <StoreSection />
        <WhatsAppForm />
      </main>
      <Footer />
    </>
  );
}
