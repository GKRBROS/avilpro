import { useState, useRef, useEffect } from "react";
import { ProductCard } from "@/components/ProductCarousel/components/ProductCard";

export type ProductItem = {
  ariaLabel: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
};

export type ProductCarouselProps = {
  innerClassName?: string;
  cardVariantClass: string;
  products: ProductItem[];
};

export const ProductCarousel = (props: ProductCarouselProps) => {
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
    return window.innerWidth >= 768 ? 506 : 336;
  };

  const [isTransitioning, setIsTransitioning] = useState(true);
  const doubled = [...props.products, ...props.products];

  useEffect(() => {
    const iv = setInterval(() => {
      setOffset((p) => {
        const step = getStep();
        const max = props.products.length * step;
        const target = p + step;
        if (target >= max) {
          setTimeout(() => {
            setIsTransitioning(false);
            setOffset(0);
            setTimeout(() => setIsTransitioning(true), 50);
          }, 600);
        }
        return target;
      });
    }, 3200);
    return () => clearInterval(iv);
  }, [props.products.length]);

  return (
    <div className="relative">
      <div className="mx-auto overflow-hidden w-full max-w-[calc(min(82vw,320px)+16px)] md:max-w-[844px] lg:max-w-[884px] px-2 pb-8 md:px-0 md:pb-12">
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
            const max = props.products.length * step;
            setOffset(
              (((dragOffset.current + dragStart.current - e.clientX) % max) +
                max) %
                max,
            );
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => {
            dragStart.current = e.touches[0].clientX;
            dragOffset.current = offset;
          }}
          onTouchMove={(e) => {
            const step = getStep();
            const max = props.products.length * step;
            setOffset(
              (((dragOffset.current +
                dragStart.current -
                e.touches[0].clientX) %
                max) +
                max) %
                max,
            );
          }}
          onTouchEnd={() => setIsDragging(false)}
        >
          {doubled.map((product, i) => (
            <ProductCard
              key={i}
              ariaLabel={product.ariaLabel}
              variantClass={props.cardVariantClass}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              title={product.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
