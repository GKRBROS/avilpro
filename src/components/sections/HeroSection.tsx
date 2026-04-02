"use client";

import styles from "./HeroSection.module.css";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Grainient from "./Grainient";

const HERO_SLIDES = [
  {
    src: "/signature-drink.png",
    alt: "Avilpro Signature Drink",
    caption: "Signature Craft",
  },
  {
    src: "/hero-drink.png",
    alt: "Avilpro Hero Blend",
    caption: "Creamy Heritage Blend",
  },
  {
    src: "/artisan-ingredients.png",
    alt: "Avilpro Premium Ingredients",
    caption: "Artisan Ingredients",
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  const yText = useTransform(scrollYProgress, [0, 0.5], [0, -300]);
  const yDrink = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scaleDrink = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const syncViewport = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  useEffect(() => {
    HERO_SLIDES.forEach((slide, index) => {
      if (index === 0) return;
      const preload = new window.Image();
      preload.src = slide.src;
      preload.decoding = "async";
    });
  }, []);

  const goPrev = () => {
    setActiveSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  };

  const goNext = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.grainientWrap}>
        {!isMobile && (
          <Grainient
            color1="#ffffff"
            color2="#2afa00"
            color3="#e1ff00"
            timeSpeed={0.25}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        )}
      </div>

      <div className={styles.backgroundText}>
        <motion.p
          className="giant-text stroke-text"
          style={{ y: yText }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        >
          AUTHENTIC
        </motion.p>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 51 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className={styles.mainLine}>The Art of</span>
            <span>Avil Milk.</span>
          </motion.h1>

          <motion.div
            className={styles.pills}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span>Kerala Heritage</span>
            <span>Modern Boutique</span>
            <span>Pure Milk</span>
          </motion.div>

          <div className={styles.footerInfo}>
            <div className={styles.infoBox}>
              <h4>BOUTIQUE BRAND</h4>
              <p>Crafted for the Connoisseur</p>
            </div>
            <div className={styles.infoBox}>
              <h4>10+ OUTLETS</h4>
              <p>Across Thrissur & Kochi</p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Redefining a legendary blend with premium ingredients{" "}
            <span className={styles.breakDesktop}>
              <br />
            </span>
            and a boutique experience. Discover the legend.
          </motion.p>
        </div>

        <motion.div
          className={styles.productFocus}
          style={{ y: yDrink, scale: scaleDrink }}
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className={styles.carouselFrame}>
            <AnimatePresence mode="wait">
              <motion.div
                key={HERO_SLIDES[activeSlide].src}
                className={styles.slideLayer}
                initial={{ opacity: 0, x: 44 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -44 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={HERO_SLIDES[activeSlide].src}
                  alt={HERO_SLIDES[activeSlide].alt}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 600px"
                  loading={activeSlide === 0 ? "eager" : "lazy"}
                  className={styles.mainDrink}
                  priority={activeSlide === 0}
                />
                <div className={styles.slideOverlay} />
                <span className={styles.slideCaption}>
                  {HERO_SLIDES[activeSlide].caption}
                </span>
              </motion.div>
            </AnimatePresence>

            <button
              className={styles.carouselBtnLeft}
              onClick={goPrev}
              aria-label="Previous slide"
              type="button"
            >
              &lt;
            </button>
            <button
              className={styles.carouselBtnRight}
              onClick={goNext}
              aria-label="Next slide"
              type="button"
            >
              &gt;
            </button>

            <div className={styles.dots}>
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={
                    index === activeSlide ? styles.dotActive : styles.dot
                  }
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
