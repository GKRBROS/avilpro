import { GuestCarousel } from "@/sections/GuestsSection/components/GuestCarousel";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const GuestsSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative bg-white leading-[10.56px] px-[7.04px] py-[35.2px] md:px-0 md:py-[14px] overflow-hidden">
      <div className="w-full mx-auto px-[5.28px] md:px-[7.5px]">
        <div className="max-w-none w-full mx-auto px-[5.28px] md:max-w-[1140px] md:px-[7.5px]">
          <div
            ref={ref}
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <h6 className="text-yellow-400 text-[45.76px] font-bold tracking-[-2.70336px] leading-[41.6416px] uppercase mb-[3.52px] md:text-[80px] md:tracking-[-3.84px] md:leading-[72.8px] md:mb-[5px]">
              Gallery
            </h6>
            <h1 className="text-green-700 text-[45.76px] font-bold tracking-[-2.70336px] leading-[41.6416px] uppercase mb-[3.52px] md:text-[80px] md:tracking-[-3.84px] md:leading-[72.8px] md:mb-[5px]">
              Our Menu &amp; Store
            </h1>
          </div>
        </div>
        <div
          className={`relative mt-[28.16px] md:mt-[42px] transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          <GuestCarousel />
        </div>
      </div>
    </section>
  );
};
