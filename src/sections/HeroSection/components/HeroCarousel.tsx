import { useEffect, useRef, useState } from "react";
import { CarouselItem } from "@/sections/HeroSection/components/CarouselItem";

const images = [
  "https://www.avilpro.in/wp-content/uploads/2024/12/avil.jpg",
  "https://www.avilpro.in/wp-content/uploads/2024/12/milka.jpg",
  "https://www.avilpro.in/wp-content/uploads/2024/12/mojitto.jpg",
  "https://www.avilpro.in/wp-content/uploads/2024/12/f.jpg",
  "https://www.avilpro.in/wp-content/uploads/2024/12/frui.jpg",
  "https://www.avilpro.in/wp-content/uploads/2024/12/burger-1.jpg",
  "https://www.avilpro.in/wp-content/uploads/2024/12/sn.jpg",
];

export const HeroCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const dragOffset = useRef(0);
  const ITEM_WIDTH_MOBILE = 148;
  const ITEM_WIDTH_DESKTOP = 218;

  const getItemWidth = () =>
    window.innerWidth >= 768 ? ITEM_WIDTH_DESKTOP : ITEM_WIDTH_MOBILE;

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        const max = images.length * getItemWidth();
        return (prev + getItemWidth()) % max;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    dragOffset.current = offset;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = dragStart.current - e.clientX;
    const max = images.length * getItemWidth();
    setOffset((((dragOffset.current + diff) % max) + max) % max);
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStart.current = e.touches[0].clientX;
    dragOffset.current = offset;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = dragStart.current - e.touches[0].clientX;
    const max = images.length * getItemWidth();
    setOffset((((dragOffset.current + diff) % max) + max) % max);
  };

  // Infinite: duplicate items
  const doubled = [...images, ...images];

  return (
    <div className="relative box-border leading-[10.56px] mt-[28.16px] pb-[28.16px] md:mt-[38px] md:pb-[38px] overflow-hidden">
      <div
        ref={trackRef}
        className="flex select-none cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(-${offset}px)`,
          transition: isDragging
            ? "none"
            : "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          paddingLeft: "18px",
          paddingBottom: "20px",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {doubled.map((src, i) => (
          <CarouselItem
            key={i}
            ariaLabel={`${(i % images.length) + 1} / ${images.length}`}
            imageSrc={src}
          />
        ))}
      </div>
    </div>
  );
};
