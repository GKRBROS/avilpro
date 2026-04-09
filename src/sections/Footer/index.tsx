import { FooterNav } from "@/sections/Footer/components/FooterNav";
import { FooterSocial } from "@/sections/Footer/components/FooterSocial";
import { FooterCopyright } from "@/sections/Footer/components/FooterCopyright";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Footer = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <footer className="bg-yellow-400 leading-[10.56px] pt-[42.24px] pb-[21.12px] px-[7.04px] md:pt-[14px] md:pb-[14px] md:px-2.5">
      <div className="max-w-none w-full mx-auto px-[5.28px] md:max-w-[1140px] md:px-[7.5px]">
        <div
          ref={ref}
          className={`items-center gap-x-[14.08px] flex flex-wrap grid-cols-[35%_repeat(3,1fr)] justify-between leading-[10.56px] list-none gap-y-[14.08px] pl-0 md:gap-x-5 md:gap-y-5 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <ul className="contents list-none pl-0">
            <li className="items-start flex flex-col justify-start max-w-[180px] min-h-[auto] min-w-[auto] md:justify-normal md:max-w-none">
              <img
                src="https://www.avilpro.in/wp-content/uploads/2024/12/avil-pro-removebg-preview.png"
                alt="Avilpro logo"
                className="min-h-[auto] min-w-[auto] w-[78px] mb-[14.08px] md:w-[110px] md:mb-5 hover:opacity-80 transition-opacity duration-200"
              />
              <p className="max-w-[220px] text-[12.5px] leading-[1.5] text-neutral-800 md:text-base">
                Thrissur&apos;s Favourite Premium Avilmilk Brand
              </p>
            </li>
            <FooterNav />
            <FooterSocial />
          </ul>
        </div>
        <hr className="text-neutral-800 bg-neutral-800 h-px opacity-25 mt-[21.12px] mb-[10.56px] md:mt-6 md:mb-4" />
        <FooterCopyright />
      </div>
    </footer>
  );
};
