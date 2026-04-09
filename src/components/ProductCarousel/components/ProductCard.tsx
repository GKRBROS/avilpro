import { useState } from "react";

export type ProductCardProps = {
  ariaLabel: string;
  variantClass: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
};

export const ProductCard = (props: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="group"
      aria-label={props.ariaLabel}
      className={`relative h-full min-h-[auto] min-w-[auto] shrink-0 w-[min(82vw,320px)] md:w-[320px] lg:w-[350px] ${props.variantClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`rounded-[15px] shadow-sm transition-all duration-300 ${hovered ? "shadow-md -translate-y-1" : ""}`}
      >
        <div className="flex w-full items-center justify-center -mb-10 md:-mb-16">
          <img
            src={props.imageSrc}
            alt={props.imageAlt}
            loading="lazy"
            className={`min-h-[auto] min-w-[auto] w-[72%] max-w-[300px] transition-transform duration-350 md:w-[65%] ${hovered ? "scale-110" : "scale-100"}`}
          />
        </div>
        <div className="flex items-center justify-center rounded-[12px] bg-white/40 px-3 pb-3 pt-12 text-center md:rounded-[15px] md:px-5 md:pb-5 md:pt-20">
          <h2 className="mb-1 w-full min-h-[auto] min-w-[auto] text-base font-medium leading-tight md:mb-[5px] md:text-3xl md:leading-tight">
            {props.title}
          </h2>
        </div>
      </div>
    </div>
  );
};
