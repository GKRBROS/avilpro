import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useModal } from "@/App";

export const IngredientsSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal(0.15);
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal(0.15);
  const { ref: videoRef, isVisible: videoVisible } = useScrollReveal(0.1);
  const { openVideo } = useModal();

  return (
    <section className="bg-zinc-100 bg-[url('https://mouzy.in/storage/inside/lMEW85lowZFuc61wyUudOmos56TL3UefESMwmyKb.png')] bg-cover bg-center bg-no-repeat px-[7.04px] py-[35.2px] md:px-0 md:py-[21px]">
      <div className="mx-auto w-full max-w-none px-[5.28px] md:max-w-[1140px] md:px-[7.5px]">
        <div
          ref={titleRef}
          className={`transition-all duration-700 ${titleVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
        >
          <h1 className="mb-[3.52px] text-[45.76px] font-bold uppercase leading-[41.6416px] tracking-[-2.70336px] text-green-700 md:mb-[5px] md:text-[80px] md:leading-[72.8px] md:tracking-[-3.84px]">
            Why Choose Us?
          </h1>
        </div>

        <div className="-mx-[5.28px] flex flex-wrap md:-mx-[7.5px]">
          <div className="w-full px-[5.28px] md:w-6/12 md:px-[7.5px]">
            <div
              ref={imageRef}
              className={`flex h-full items-center justify-center transition-all duration-700 delay-100 ${imageVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <img
                src="https://mouzy.in/storage/inside/l5QODtyx3viMsJTwCrxn5liwdmAsHrH0IzvJV4jh.png"
                alt="Inside cup"
                className="w-[58%] min-h-[auto] min-w-[auto] transition-transform duration-500 hover:scale-105 md:w-[60%]"
              />
            </div>
          </div>

          <div className="w-full px-[5.28px] md:w-6/12 md:px-[7.5px]">
            <div
              className={`flex h-full flex-col justify-center transition-all duration-700 delay-200 ${imageVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <p className="mb-[7.04px] text-[17.6px] font-medium leading-[27.456px] text-justify md:mb-2.5 md:text-[25px] md:leading-[39px]">
                We offer the best and tasty foods. Our customer's convenience is
                our priority, and this is a belief that permeates every
                innovation and everything the team strives to achieve.
              </p>
              <ul className="space-y-3 text-[15px] font-medium leading-relaxed md:text-[18px]">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-green-700" />
                  <span className="text-justify">High Quality Products</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-green-700" />
                  <span className="text-justify">Organic Ingredients from trusted suppliers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-green-700" />
                  <span className="text-justify">Best Service and welcoming atmosphere</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-green-700" />
                  <span className="text-justify">Top Chefs and authentic taste</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative w-full px-[5.28px] pt-[28.16px] md:px-[7.5px] md:pt-[42px]">
            <div
              ref={videoRef}
              className={`flex flex-col items-center justify-center transition-all duration-700 delay-300 ${videoVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <div className="relative flex items-center justify-center">
                <div className="h-[280px] w-[280px] rounded-full bg-yellow-400 md:h-[360px] md:w-[360px]" />
                
                <div className="absolute -inset-[30px] md:-inset-[40px] animate-[spin-slow_15s_linear_infinite] pointer-events-none opacity-[0.08]">
                  <svg viewBox="0 0 400 400" className="w-full h-full scale-[1.1] md:scale-100">
                    <path
                      id="videoCirclePath"
                      d="M 200, 200 m -160, 0 a 160,160 0 0,1 320,0 a 160,160 0 0,1 -320,0"
                      fill="none"
                    />
                    <text
                      fill="currentColor"
                      className="text-black font-bold uppercase tracking-[0.25em] text-[36px]"
                    >
                      <textPath href="#videoCirclePath" startOffset="0%">
                        THE AVILPRO'S STORY • THE AVILPRO'S STORY • 
                      </textPath>
                    </text>
                  </svg>
                </div>

                <img
                  src="https://mouzy.in/storage/inside/OSRmp95hrBUW5AyxSpxWAoSjLU07kRB3oPOx2JXZ.png"
                  alt="Video preview"
                  className="absolute w-[54%] md:w-[44%]"
                />
                <button
                  onClick={openVideo}
                  className="absolute left-1/2 top-1/2 flex h-[40px] w-[40px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 pl-[4px] text-[28px] leading-none text-white transition-all duration-200 hover:scale-110 hover:bg-green-700 focus:outline-none md:h-[52px] md:w-[52px] md:text-[34px] z-10"
                  aria-label="Play video"
                >
                  &#9654;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
