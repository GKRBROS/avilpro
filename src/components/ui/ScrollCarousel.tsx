"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  forwardRef,
  useMemo,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- Component Props and Types ---
export interface FeatureItem {
  icon?: LucideIcon;
  title: string;
  description: string;
  image: string;
}

export interface ScrollCarouselProps {
  features: FeatureItem[];
  className?: string;
  maxScrollHeight?: number;
}

// --- Custom Hook for Animations ---
const useFeatureAnimations = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  scrollContainerRef: React.RefObject<HTMLDivElement | null>,
  scrollContainerRef2: React.RefObject<HTMLDivElement | null>,
  progressBarRef: React.RefObject<HTMLDivElement | null>,
  cardRefs: React.MutableRefObject<HTMLDivElement[]>,
  cardRefs2: React.MutableRefObject<HTMLDivElement[]>,
  isDesktop: boolean,
  maxScrollHeight?: number
) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop horizontal scroll logic
      if (isDesktop) {
        const scrollWidth1 = scrollContainerRef.current?.scrollWidth || 0;
        const scrollWidth2 = scrollContainerRef2.current?.scrollWidth || 0;
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const edgeGap = 96;
        const movementRatio = 0.8;

        const baseTravel1 = Math.max(scrollWidth1 - containerWidth, 0);
        const baseTravel2 = Math.max(scrollWidth2 - containerWidth, 0);

        const finalOffset1 = Math.max(baseTravel1 * movementRatio, 0);
        const finalOffset2 = Math.max(baseTravel2 * movementRatio, 0);

        const scrollDistance =
          maxScrollHeight || Math.max(finalOffset1 + 860, 1400);

        const row1End = -Math.max(finalOffset1 - edgeGap, 0);
        const row2Start = -Math.max(finalOffset2 - edgeGap, 0);

        if (scrollWidth2 > 0) {
          gsap.set(scrollContainerRef2.current, {
            x: row2Start,
          });
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              scrub: 0.22,
              pin: true,
              anticipatePin: 1,
            },
          })
          .fromTo(
            scrollContainerRef.current,
            { x: edgeGap },
            { x: row1End, ease: "none" }
          );

        if (scrollWidth2 > 0) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${scrollDistance}`,
                scrub: 0.22,
              },
            })
            .to(scrollContainerRef2.current, { x: edgeGap, ease: "none" });
        }

        gsap.to(progressBarRef.current, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: true,
          },
        });

        ScrollTrigger.refresh();
      } else {
        // Mobile vertical scroll logic
        const allCards = [...cardRefs.current, ...cardRefs2.current];
        allCards.forEach((card, index) => {
          if (card) {
            gsap.fromTo(
              card,
              {
                opacity: 0,
                x: index % 2 === 0 ? -56 : 56,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.62,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  toggleActions: "play none none none",
                  once: true,
                },
              }
            );
          }
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isDesktop, maxScrollHeight, containerRef, scrollContainerRef, scrollContainerRef2, progressBarRef, cardRefs, cardRefs2]);
};

// --- Component Definition ---
export const ScrollCarousel = forwardRef<HTMLDivElement, ScrollCarouselProps>(
  ({ features, className, maxScrollHeight }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef2 = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const cardRefs2 = useRef<HTMLDivElement[]>([]);
    const [isDesktop, setIsDesktop] = useState(false);

    // Dynamic sorting for the second row of cards (deterministic shuffle using title)
    const features2 = useMemo(() => {
      return [...features].sort((a, b) => 
        a.title.charCodeAt(0) - b.title.charCodeAt(0)
      ).reverse();
    }, [features]);

    useEffect(() => {
      const checkDesktop = () => {
        setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
      };
      checkDesktop();
      window.addEventListener("resize", checkDesktop);
      return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    useFeatureAnimations(
      containerRef,
      scrollContainerRef,
      scrollContainerRef2,
      progressBarRef,
      cardRefs,
      cardRefs2,
      isDesktop,
      maxScrollHeight
    );

    const renderFeatureCards = (
      featureSet: FeatureItem[],
      refs: React.MutableRefObject<HTMLDivElement[]>
    ) => {
      refs.current = [];

      return featureSet.map((feature, index) => (
        <div
          key={index}
          ref={(el: HTMLDivElement | null) => {
            if (el) refs.current[index] = el;
          }}
          className="feature-card scFeatureCard"
        >
          <div className="scFeatureInner">
            <img
              src={feature.image}
              alt={feature.title}
              className="scFeatureImage"
            />
            <div className="scFeatureCaptionWrap">
              <div className="scFeatureCaption">
                <h3 className="scFeatureTitle">
                  {feature.title}
                </h3>
                <p className="scFeatureDescription">
                  {feature.description}
                </p>
              </div>
            </div>
            <div className="scFeatureHoverLayer" />
          </div>
        </div>
      ));
    };

    return (
      <section
        className={`scRoot ${className || ""}`}
        ref={ref}
      >
        <div
          ref={containerRef}
          className="scPin"
        >
          <div
            ref={scrollContainerRef}
            className="scRow"
          >
            {renderFeatureCards(features, cardRefs)}
          </div>

          <div
            ref={scrollContainerRef2}
            className="scRow scRowAlt"
          >
            {renderFeatureCards(features2, cardRefs2)}
          </div>

          {isDesktop && (
            <div className="scProgressTrack">
              <div
                ref={progressBarRef}
                className="scProgressFill"
                style={{ width: "0%" }}
              >
                <div className="absolute inset-0 animated-water" />
              </div>
            </div>
          )}
        </div>
        <style jsx>{`
          .scRoot {
            position: relative;
            overflow: hidden;
            background: transparent;
          }
          .scPin {
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 0;
            z-index: 1;
            min-height: 44vh;
            padding: 4px 0 14px;
          }
          .scRow {
            display: flex;
            flex-direction: column;
            gap: 24px;
            align-items: center;
            height: 100%;
            padding: 0 16px;
            will-change: transform;
          }
          .scRowAlt {
            display: none;
          }
          .scFeatureCard {
            position: relative;
            flex-shrink: 0;
            width: 100%;
            min-height: 200px;
          }
          .scFeatureInner {
            position: relative;
            height: 100%;
            min-height: inherit;
            margin: 4px 0;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.34);
            transition: transform 0.28s ease;
            background: #090909;
            box-shadow: 0 10px 18px rgba(0, 0, 0, 0.2);
          }
          .scFeatureCard:hover .scFeatureInner {
            transform: scale(1.01);
          }
          .scFeatureImage {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: scale(1.03);
          }
          .scFeatureCaptionWrap {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
            padding: 8px;
          }
          .scFeatureCaption {
            text-align: center;
            color: #fff;
            padding: 8px 10px;
            border-radius: 12px;
            backdrop-filter: blur(4px);
            background: linear-gradient(to top, rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.16));
          }
          .scFeatureTitle {
            margin: 0;
            font-size: 0.86rem;
            line-height: 1.2;
            font-weight: 800;
          }
          .scFeatureDescription {
            margin: 4px 0 0;
            font-size: 0.62rem;
            opacity: 0.86;
          }
          .scFeatureHoverLayer {
            pointer-events: none;
            position: absolute;
            inset: 0;
            transition: background 0.25s ease;
          }
          .scFeatureCard:hover .scFeatureHoverLayer {
            background: rgba(0, 0, 0, 0.06);
          }
          .scProgressTrack {
            position: absolute;
            left: 50%;
            bottom: 16px;
            transform: translateX(-50%);
            width: 240px;
            height: 8px;
            z-index: 5;
            overflow: hidden;
            border-radius: 999px;
            background: rgba(0, 0, 0, 0.25);
          }
          .scProgressFill {
            height: 100%;
            border-radius: 999px;
            position: relative;
            overflow: hidden;
          }

          @media (min-width: 768px) {
            .scPin {
              min-height: 64vh;
              padding: 14px 0 34px;
            }
            .scRow {
              flex-direction: row;
              gap: 14px;
              align-items: stretch;
              padding: 0 14px;
            }
            .scFeatureCard {
              width: auto;
              flex: 0 0 min(34vw, 260px);
              min-height: 220px;
            }
          }

          @media (min-width: 1280px) {
            .scRowAlt {
              display: flex;
            }
            .scFeatureCard {
              flex-basis: min(19vw, 220px);
              min-height: 190px;
            }
          }

          .animated-water {
            background: repeating-linear-gradient(
              -45deg,
              rgba(0, 0, 0, 0.7) 0%,
              rgba(0, 0, 0, 0.5) 25%,
              rgba(0, 0, 0, 0.7) 50%
            );
            background-size: 40px 40px;
            animation: waveMove 2s linear infinite;
          }
          :global(.dark) .animated-water {
            background: repeating-linear-gradient(
              -45deg,
              rgba(255, 255, 255, 0.9) 0%,
              rgba(255, 255, 255, 0.6) 25%,
              rgba(255, 255, 255, 0.9) 50%
            );
          }
          @keyframes waveMove {
            from {
              background-position: 0 0;
            }
            to {
              background-position: 40px 40px;
            }
          }
        `}</style>
      </section>
    );
  }
);

ScrollCarousel.displayName = "ScrollCarousel";

export default ScrollCarousel;
