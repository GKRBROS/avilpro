import { useState, useRef, useEffect, useCallback } from "react";

const allImages = [
  "https://www.avilpro.in/wp-content/uploads/2026/01/Menu1.jpeg",
  "https://www.avilpro.in/wp-content/uploads/2026/01/Menu2.jpeg",
  "https://www.avilpro.in/wp-content/uploads/2026/01/Menu-3.jpeg",
  "https://www.avilpro.in/wp-content/uploads/2026/01/Menu4.jpeg",
  "https://www.avilpro.in/wp-content/uploads/2026/01/Menu5.jpeg",
  "https://www.avilpro.in/wp-content/uploads/2026/01/Menu-6.jpeg",
  "https://www.avilpro.in/wp-content/uploads/2024/12/AVILPRO1.jpg",
  "https://www.avilpro.in/wp-content/uploads/2024/12/AVILPRO2.jpg",
];

// Triplicate to create smooth infinite loop
const infiniteItems = [...allImages, ...allImages, ...allImages, ...allImages];
const ITEM_COUNT = allImages.length;
// Start in the second block
const INITIAL_INDEX = ITEM_COUNT;

export const GuestCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto scroll moves 2 items per interval to preserve the Top/Bottom parity rhythm!
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      moveBy(2); 
    }, 4500); // 4.5s for a nice, breathable pace
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  const moveBy = (amount: number) => {
    setCurrentIndex((prev) => prev + amount);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= INITIAL_INDEX + ITEM_COUNT) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - ITEM_COUNT);
      requestAnimationFrame(() => setIsTransitioning(true));
    } else if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + ITEM_COUNT);
      requestAnimationFrame(() => setIsTransitioning(true));
    }
  };

  const onDragStart = (clientX: number) => {
    setIsDragging(true);
    stopAutoPlay();
    dragStartX.current = clientX;
  };

  const onDragEnd = (clientX: number) => {
    setIsDragging(false);
    const diff = dragStartX.current - clientX;
    
    if (Math.abs(diff) > 40) {
      // Swiping 2 items keeps the staggered Top/Bottom layout rhythm perfectly intact
      moveBy(diff > 0 ? 2 : -2);
    }
    
    // Resume auto-scroll after interaction
    setTimeout(() => startAutoPlay(), 2500);
  };

  const getStaggerStyles = (i: number) => {
    const mod = i % 4;
    // 0: Top Left, 1: Bottom Left, 2: Top Right, 3: Bottom Right
    if (mod === 0) return { transform: "translateY(-18%)", animationDelay: "0ms" };
    if (mod === 1) return { transform: "translateY(22%)", animationDelay: "800ms" };
    if (mod === 2) return { transform: "translateY(-12%)", animationDelay: "400ms" };
    if (mod === 3) return { transform: "translateY(28%)", animationDelay: "1200ms" };
    return {};
  };
  
  return (
    <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden py-16 md:py-32 px-4 select-none touch-pan-y">
      <div 
        className="w-full relative"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseUp={(e) => onDragEnd(e.clientX)}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
      >
        <div
          ref={trackRef}
          className="flex items-center will-change-transform"
          style={{
            transform: `translateX(calc(-${currentIndex} * (100% / var(--items-visible))))`,
            transition: isDragging || !isTransitioning ? "none" : "transform 0.85s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {infiniteItems.map((imgSrc, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex justify-center items-center pointer-events-none"
              style={{
                width: "calc(100% / var(--items-visible))",
                padding: "var(--item-gap)",
              }}
            >
              <div 
                className="relative w-full aspect-square rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.18)] bg-gray-100 overflow-hidden"
                style={{
                  ...getStaggerStyles(i),
                  animationName: "float",
                  animationDuration: "6s",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  pointerEvents: "auto",
                  cursor: "pointer",
                }}
              >
                <img
                  src={imgSrc}
                  alt={`Gallery slot ${i}`}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS variable injection for the track calculation and responsive gaps */}
      <style>{`
        :root { 
          --items-visible: 2; 
          --item-gap: 6%; 
        }
        @media (min-width: 768px) { 
          :root { 
            --items-visible: 4; 
            --item-gap: 3%; 
          } 
        }
        @keyframes float {
          0%, 100% { translate: 0 0px; }
          50%      { translate: 0 -16px; }
        }
      `}</style>
    </div>
  );
};
