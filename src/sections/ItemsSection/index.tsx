import { ItemsCarousel } from "@/sections/ItemsSection/components/ItemsCarousel";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const ItemsSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative overflow-hidden bg-white px-[7.04px] pt-[35.2px] pb-[84.48px] leading-[10.56px] md:px-0 md:pt-[24px] md:pb-[110px]">
      <div className="pointer-events-none absolute inset-x-0 top-[42%] hidden md:block">
        <div
          className="mouzy-drift select-none text-center text-[clamp(76px,10vw,145px)] font-bold uppercase leading-none tracking-[-0.08em]"
          style={{ color: "rgba(22, 163, 74, 0.11)" }}
        >
          THE AVILPRO STORY
        </div>
      </div>
      <div className="box-border max-w-none w-full mx-auto px-[5.28px] md:max-w-[1140px] md:px-[7.5px]">
        <div ref={ref} className="flex flex-wrap -mx-[5.28px] md:-mx-[7.5px]">
          <div className="shrink-0 max-w-full min-h-[auto] min-w-[auto] w-full px-[5.28px] md:px-[7.5px]">
            <div className="items-start gap-x-[35.2px] flex h-full justify-between leading-[10.56px] gap-y-[35.2px] md:gap-x-[50px] md:gap-y-[50px]">
              <div
                className={`max-w-full min-h-[auto] min-w-[auto] md:max-w-[68%] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="relative z-10 max-w-[760px]">
                  <h6 className="mb-[4px] text-[clamp(2.5rem,4.3vw,4.6rem)] font-bold uppercase leading-[0.88] tracking-[-0.05em] text-yellow-400 md:mb-[6px]">
                    Items
                  </h6>
                  <h1 className="mb-[6px] text-[clamp(2.9rem,5.4vw,5.7rem)] font-bold uppercase leading-[0.92] tracking-[-0.05em] text-green-700 md:mb-[8px]">
                    Special Avil Milks
                  </h1>
                  <p className="max-w-[720px] text-[clamp(1rem,1.2vw,1.35rem)] font-medium leading-[1.35] tracking-[-0.01em] text-green-700 md:max-w-[680px]">
                    We are delivering fresh &amp; tasty Avil Milk
                  </p>
                </div>
              </div>
              <div
                className={`relative hidden h-[168.96px] min-h-0 min-w-0 w-[168.96px] md:block md:h-60 md:w-60 transition-all duration-700 delay-200 flex items-center justify-center ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              >
                <div className="absolute inset-0 rounded-full bg-yellow-200" />
                <div className="absolute flex h-[148.544px] w-[148.544px] items-center justify-center rounded-full bg-yellow-400 px-3 text-center text-[19.712px] font-bold uppercase leading-[17.9379px] tracking-[-0.04em] text-green-700 md:h-[211px] md:w-[211px] md:text-[28px] md:leading-[25.48px]">
                  Since 1985
                </div>
                <div className="absolute -inset-[30px] md:-inset-[36px] animate-[spin-slow_15s_linear_infinite] pointer-events-none opacity-20">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <path
                      id="circlePath"
                      d="M 200, 200 m -160, 0 a 160,160 0 0,1 320,0 a 160,160 0 0,1 -320,0"
                      fill="none"
                    />
                    <text
                      fill="currentColor"
                      className="text-black font-bold uppercase tracking-[0.25em] text-[36px]"
                    >
                      <textPath href="#circlePath" startOffset="0%">
                        THE AVILPRO'S STORY • THE AVILPRO'S STORY • 
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shrink leading-[10.56px] w-auto md:shrink-0 md:w-full">
          <div className="relative mt-[21.12px] px-[14.08px] md:mt-[28px] md:px-5">
            <ItemsCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};
