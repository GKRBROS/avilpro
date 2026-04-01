"use client";

import { useEffect } from "react";
import styles from "./HeroSection.module.css";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useLoading } from "@/components/LoadingContext";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const { loaded } = useLoading();
  const productEntranceControls = useAnimation();

  const yText = useTransform(scrollYProgress, [0, 0.5], [0, -300]);
  const yDrink = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scaleDrink = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  useEffect(() => {
    if (!loaded) return;

    productEntranceControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] },
    });
  }, [loaded, productEntranceControls]);

  return (
    <section className={styles.hero}>
      <div className={styles.backgroundText}>
        <motion.h1
          className="giant-text stroke-text"
          style={{ y: yText }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        >
          AUTHENTIC
        </motion.h1>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
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

          <motion.h2
            initial={{ opacity: 0, y: 51 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className={styles.mainLine}>The Art of</span>
            <span>Avil Milk.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Redefining a legendary blend with premium ingredients <br />
            and a boutique experience. Discover the legend.
          </motion.p>
        </div>

        <motion.div
          className={styles.productFocus}
          initial={{ opacity: 0, y: -120 }}
          animate={productEntranceControls}
        >
          <motion.div style={{ y: yDrink, scale: scaleDrink }}>
            <Image
              src="/signature-drink.png"
              alt="AVILPRO Signature Drink"
              width={700}
              height={800}
              loading="eager"
              sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 700px"
              className={styles.mainDrink}
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
