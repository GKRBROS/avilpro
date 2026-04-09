import { HeroContent } from "@/sections/HeroSection/components/HeroContent";

export const HeroSection = () => {
  return (
    <section className="relative text-[7.04px] bg-yellow-400 bg-[url('https://mouzy.in/storage/header/EgC1DoWFewlE7qEUMaSwrEwrNX18fNvElflDlVjf.png')] bg-no-repeat bg-cover box-border leading-[10.56px] w-full bg-[position:0px_50%] md:text-[10px] md:leading-[15px] md:bg-[position:50%_top] overflow-hidden">
      <div className="box-border leading-[10.56px] max-w-none w-full mx-auto px-[5.28px] md:max-w-[1140px] md:px-[7.5px]">
        <div className="box-border pb-[56.32px] pt-[147.84px] md:pb-[84px] md:pt-[195px]">
          <div className="flex items-start justify-between gap-8 md:gap-12">
            <HeroContent />

            <div className="relative hidden h-[220px] w-[220px] shrink-0 md:block animate-[float_6s_ease-in-out_infinite]">
              <div className="absolute inset-0 rounded-full bg-yellow-200 opacity-60 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
              <div className="absolute left-[8%] top-[8%] flex h-[185px] w-[185px] items-center justify-center rounded-full bg-yellow-400 px-6 text-center text-[34px] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-green-700 shadow-xl transition-transform hover:rotate-12 duration-500">
                Since 1985
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AVILPRO ghost watermark — scrolls left, floats vertically, never touches the bottom */}
      <div
        className="pointer-events-none absolute bottom-[12px] left-0 w-full overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="flex w-max"
          style={{
            animation: "hero-drift 18s linear infinite, hero-wave 4s ease-in-out infinite",
          }}
        >
          {/* Repeat the text enough to fill ANY screen width endlessly (16 instances to guarantee it never finishes) */}
          {[...Array(16)].map((_, i) => (
            <span
              key={i}
              className="text-[clamp(48px,8vw,96px)] font-black uppercase leading-none tracking-[-0.04em] whitespace-nowrap pr-4"
              style={{ color: "rgba(22,163,74,0.10)" }}
            >
              AVILPRO • 
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes hero-drift {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes hero-wave {
          0%, 100% { margin-bottom: 0px; }
          50%       { margin-bottom: 8px; }
        }
      `}</style>
    </section>
  );
};
