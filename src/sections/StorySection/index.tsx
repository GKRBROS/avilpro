import { useScrollReveal } from "@/hooks/useScrollReveal";

export const StorySection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal(0.15);
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal(0.1);

  return (
    <section className="relative overflow-hidden bg-yellow-400 px-[7.04px] py-[28.16px] leading-[10.56px] md:px-0 md:py-[21px]">
      <div className="pointer-events-none absolute inset-x-0 top-[38%] hidden md:block">
        <div
          className="mouzy-drift select-none text-center text-[clamp(76px,10.5vw,150px)] font-bold uppercase leading-none tracking-[-0.08em]"
          style={{ color: "rgba(22, 163, 74, 0.12)" }}
        >
          THE AVILPRO STORY
        </div>
      </div>

      <div className="box-border max-w-none w-full mx-auto px-[5.28px] md:max-w-[1140px] md:px-[7.5px]">
        <div className="relative z-10 grid grid-cols-1 items-start gap-y-6 md:grid-cols-2 md:gap-x-14">
          <div ref={titleRef} className="max-w-[420px]">
            <div
              className={`mb-[14.08px] transition-all duration-700 md:mb-[24px] ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <h6 className="mb-[3.52px] text-[12.672px] font-medium uppercase leading-[11.5315px] tracking-[0.14em] text-green-700 md:mb-2.5 md:text-lg md:leading-[16.38px]">
                ISO 22000:2018 Certified Company
              </h6>
              <h1 className="mouzy-drift text-[58px] font-bold uppercase leading-[0.9] tracking-[-0.06em] text-green-700 md:text-[92px]">
                The
                <br />
                Avilpro
                <br />
                Story
              </h1>
            </div>

            <img
              src="https://www.avilpro.in/wp-content/uploads/2024/12/avil.jpg"
              alt="story-top-img"
              className="mb-[21.12px] w-[68%] rounded-2xl object-cover transition-transform duration-500 hover:scale-105 md:hidden"
            />

            <div
              ref={contentRef}
              className={`transition-all duration-700 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <p className="text-[16.192px] font-medium capitalize leading-[27.456px] tracking-[0.2816px] text-neutral-800 text-justify md:text-[20px] md:leading-[34px] md:tracking-[0.4px]">
                Welcome to Avilpro premium Avil Milk Shop, where we serve the
                creamiest, most delicious milkshakes in town! Our mission is to
                provide top-notch quality, exceptional customer service, and a
                fun, welcoming atmosphere. Our customer&apos;s convenience is
                our priority — a belief that permeates every single innovation
                and what everyone associated with the brand strives to achieve.
                Order Now and Taste the Difference — the perfect blend awaits!
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start gap-5 md:items-end md:pt-[20px]">
            <img
              src="https://www.avilpro.in/wp-content/uploads/2025/01/avilpro.jpg"
              alt="story-img"
              className="w-full max-w-[520px] rounded-xl object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
