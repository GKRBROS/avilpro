import { useState } from "react";

export type ItemsCarouselSlideProps = {
  ariaLabel: string;
  imageSrc: string;
  backgroundImageSrc?: string;
};

export const ItemsCarouselSlide = (props: ItemsCarouselSlideProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="group"
      aria-label={props.ariaLabel}
      className="relative h-full min-h-[auto] min-w-[auto] shrink-0 w-[min(84vw,320px)] md:w-[320px] lg:w-[350px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative items-end flex h-full justify-center">
        <img
          src={props.imageSrc}
          alt=""
          loading="lazy"
          className={`min-h-[auto] min-w-[auto] w-[70%] max-w-[290px] transition-transform duration-400 md:w-[62%] ${hovered ? "scale-110 -translate-y-2" : "scale-100"}`}
        />
        {props.backgroundImageSrc && (
          <img
            src={props.backgroundImageSrc}
            alt="background"
            className="absolute w-full z-[-1] left-0 top-1/4 opacity-60"
          />
        )}
      </div>
    </div>
  );
};
