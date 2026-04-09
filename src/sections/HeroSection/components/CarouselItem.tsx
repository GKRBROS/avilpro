import { useState } from "react";

export type CarouselItemProps = {
  ariaLabel: string;
  imageSrc: string;
};

export const CarouselItem = (props: CarouselItemProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="group"
      aria-label={props.ariaLabel}
      className="relative shrink-0 leading-[10.56px] min-h-[auto] min-w-[auto] w-[116px] mr-8 md:w-[188px] md:mr-[30px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="items-center flex justify-center mb-[-28px] w-full md:-mb-10">
        <img
          src={props.imageSrc}
          alt="slide image"
          loading="lazy"
          className={`min-h-[auto] min-w-[auto] w-[82%] md:w-[64%] transition-transform duration-300 ${hovered ? "scale-110" : "scale-100"}`}
        />
      </div>
    </div>
  );
};
