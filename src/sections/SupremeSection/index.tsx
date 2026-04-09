import { ProductCarousel } from "@/components/ProductCarousel";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const SupremeSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="bg-white leading-[10.56px] py-[42.24px] md:py-[14px] overflow-hidden">
      <div
        ref={ref}
        className="max-w-none w-full mx-auto px-[5.28px] md:max-w-[1140px] md:px-[7.5px]"
      >
        <div
          className={`items-center gap-x-[14.08px] flex justify-center leading-[10.56px] gap-y-[14.08px] mb-[24.64px] md:gap-x-5 md:gap-y-5 md:mb-[35px] transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}
        >
          <h1 className="mb-1 text-center text-[clamp(2rem,8vw,5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em] text-green-700 md:mb-[5px]">
            More From Our Menu
          </h1>
        </div>
        <div
          className={`relative transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
        >
          <ProductCarousel
            cardVariantClass=""
            products={[
              {
                ariaLabel: "1 / 3",
                imageSrc:
                  "https://www.avilpro.in/wp-content/uploads/2024/12/frui.jpg",
                imageAlt: "Fruit Salad",
                title: "Fruit Salad",
              },
              {
                ariaLabel: "2 / 3",
                imageSrc:
                  "https://www.avilpro.in/wp-content/uploads/2024/12/burger-1.jpg",
                imageAlt: "Burgers",
                title: "Burgers",
              },
              {
                ariaLabel: "3 / 3",
                imageSrc:
                  "https://www.avilpro.in/wp-content/uploads/2024/12/sn.jpg",
                imageAlt: "Sandwiches",
                title: "Sandwiches",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
};
