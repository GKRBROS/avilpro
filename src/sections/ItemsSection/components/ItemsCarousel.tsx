import { useEffect, useRef, useState } from "react";
import { ItemsCarouselSlide } from "@/sections/ItemsSection/components/ItemsCarouselSlide";

const slides = [
  {
    ariaLabel: "1 / 7",
    imageSrc: "https://www.avilpro.in/wp-content/uploads/2024/12/avil.jpg",
  },
  {
    ariaLabel: "2 / 7",
    imageSrc: "https://www.avilpro.in/wp-content/uploads/2024/12/milka.jpg",
  },
  {
    ariaLabel: "3 / 7",
    imageSrc: "https://www.avilpro.in/wp-content/uploads/2024/12/mojitto.jpg",
  },
  {
    ariaLabel: "4 / 7",
    imageSrc: "https://www.avilpro.in/wp-content/uploads/2024/12/f.jpg",
  },
  {
    ariaLabel: "5 / 7",
    imageSrc: "https://www.avilpro.in/wp-content/uploads/2024/12/frui.jpg",
  },
  {
    ariaLabel: "6 / 7",
    imageSrc: "https://www.avilpro.in/wp-content/uploads/2024/12/burger-1.jpg",
  },
  {
    ariaLabel: "7 / 7",
    imageSrc: "https://www.avilpro.in/wp-content/uploads/2024/12/sn.jpg",
  },
];

export const ItemsCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const dragOffset = useRef(0);

  const getStep = () => {
    if (typeof window === "undefined") return 336;
    const track = trackRef.current;
    if (track && track.firstElementChild instanceof HTMLElement) {
      const cardW = track.firstElementChild.getBoundingClientRect().width;
      const styles = window.getComputedStyle(track);
      const gap =
        parseFloat(styles.columnGap || "0") ||
        parseFloat(styles.gap || "0") ||
        0;
      return cardW + gap;
    }
    return window.innerWidth >= 768 ? 374 : 336;
  };

  const doubled = [...slides, ...slides];
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        const step = getStep();
        const max = slides.length * step;
        const target = prev + step;
        if (target >= max) {
          setTimeout(() => {
            setIsTransitioning(false);
            setOffset(0);
            setTimeout(() => setIsTransitioning(true), 50);
          }, 600);
        }
        return target;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="relative mt-[42.24px] md:mt-[60px]">
      <div className="mx-auto overflow-hidden w-full max-w-[calc(min(84vw,320px)+24px)] md:max-w-[992px] lg:max-w-[1112px] px-3 pb-6 md:px-6 md:pb-9">
        <div
          ref={trackRef}
          className="flex select-none cursor-grab gap-4 active:cursor-grabbing md:gap-6"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: isDragging || !isTransitioning
              ? "none"
              : "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
          onMouseDown={(e) => {
            setIsDragging(true);
            dragStart.current = e.clientX;
            dragOffset.current = offset;
          }}
          onMouseMove={(e) => {
            if (!isDragging) return;
            const step = getStep();
            const max = slides.length * step;
            const nextOffset =
              (((dragOffset.current + dragStart.current - e.clientX) % max) +
                max) %
              max;
            setOffset(nextOffset);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => {
            dragStart.current = e.touches[0].clientX;
            dragOffset.current = offset;
          }}
          onTouchMove={(e) => {
            const step = getStep();
            const max = slides.length * step;
            const nextOffset =
              (((dragOffset.current +
                dragStart.current -
                e.touches[0].clientX) %
                max) +
                max) %
              max;
            setOffset(nextOffset);
          }}
          onTouchEnd={() => setIsDragging(false)}
        >
          {doubled.map((slide, i) => (
            <ItemsCarouselSlide
              key={`${slide.ariaLabel}-${i}`}
              ariaLabel={slide.ariaLabel}
              imageSrc={slide.imageSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
