import { useEffect, useState } from "react";

export const HeroContent = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex max-w-[760px] flex-col items-center gap-y-[10px] text-center md:items-start md:gap-y-[16px] md:text-left">
      {/* Pill badge */}
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-green-700/30 bg-white/20 px-4 py-1.5 backdrop-blur-sm transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-green-700 animate-pulse" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-green-700 md:text-[13px]">
          Thrissur&apos;s Favourite Premium Avilmilk Brand
        </span>
      </div>

      {/* Main heading with wave letters */}
      <h1
        className={`relative z-0 mb-0 max-w-[300px] uppercase transition-all duration-700 md:mb-[4px] md:max-w-[780px] ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: "80ms" }}
      >
        {/* "Welcome To" — static */}
        <span className="block text-[32px] font-bold leading-[1.05] text-green-700 md:text-[56px]">
          Welcome To
        </span>
        {/* "The Perfect" — static */}
        <span className="block text-[38px] font-bold leading-[1.0] text-green-700 md:text-[92px]">
          The Perfect
        </span>
        {/* "BLEND!" — each letter waves, same green color */}
        <span className="block text-[38px] font-bold leading-[1.0] text-green-700 md:text-[92px]" aria-label="Blend!">
          {"BLEND!".split("").map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: mounted ? `wave-letter 2s ease-in-out ${i * 0.1}s infinite` : "none",
              }}
            >
              {char}
            </span>
          ))}
        </span>
      </h1>

      {/* Sub-text */}
      <p
        className={`max-w-[600px] text-[14px] font-medium leading-[1.55] text-green-800/80 md:text-[20px] transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "160ms" }}
      >
        Fresh avil milk, rich shakes, and signature flavours served every day from the heart of Thrissur.
      </p>

      {/* CTAs */}
      <div
        className={`flex flex-wrap items-center gap-3 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "240ms" }}
      >
        <a
          href="#items"
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector("#items") as HTMLElement | null;
            if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
          }}
          className="relative overflow-hidden rounded-[30px] bg-green-700 px-6 pt-[11px] pb-[7px] text-[13px] font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-yellow-400 hover:text-black md:text-[15px] md:px-8 md:pt-[13px] md:pb-[9px]"
        >
          View Our Menu
        </a>
        <a
          href="#outlets"
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector("#outlets") as HTMLElement | null;
            if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
          }}
          className="rounded-[30px] border-2 border-green-700 bg-transparent px-6 pt-[9px] pb-[5px] text-[13px] font-semibold uppercase tracking-wider text-green-700 transition-all duration-300 hover:bg-green-700 hover:text-white md:text-[15px] md:px-8 md:pt-[11px] md:pb-[7px]"
        >
          Our Outlets
        </a>
      </div>
    </div>
  );
};
