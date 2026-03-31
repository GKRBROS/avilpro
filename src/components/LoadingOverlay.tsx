"use client";

import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LoadingOverlay.module.css";
import Image from "next/image";

type Phase = "fill" | "logo" | "drain";

export default function LoadingOverlay() {
  const [phase, setPhase] = useState<Phase>("fill");
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    // Lock scroll while loader is active
    document.documentElement.style.overflow = "hidden";

    // Fill → Logo → Drain → Done
    const t1 = setTimeout(() => setPhase("logo"),   1200); // juice fills, logo pops
    const t2 = setTimeout(() => setPhase("drain"),  2400); // logo holds, drain starts
    const t3 = setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = "";
    }, 3500); // fully gone

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.root}>
      {/* ── Yellow Juice Flood ── fills from bottom, then drains down */}
      <motion.div
        className={styles.juice}
        initial={{ y: "100%" }}
        animate={
          phase === "fill"  ? { y: "0%"   } :
          phase === "logo"  ? { y: "0%"   } :
          /* drain */         { y: "100%" }
        }
        transition={
          phase === "fill"  ? { duration: 1.1, ease: [0.76, 0, 0.24, 1] } :
          phase === "drain" ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] } :
          { duration: 0 }
        }
      />

      {/* ── Wave SVG on top of juice (decorative) ── */}
      {phase !== "drain" && (
        <motion.div
          className={styles.waveWrapper}
          initial={{ y: "100%" }}
          animate={{ y: phase === "fill" ? "0%" : "0%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className={styles.wave}
          >
            <path
              d="M0,60 C200,100 400,20 720,60 C1040,100 1240,20 1440,60 L1440,100 L0,100 Z"
              fill="#FBE106"
            />
          </svg>
        </motion.div>
      )}

      {/* ── Logo Reveal ── */}
      <div className={styles.centerStage}>
        <AnimatePresence>
          {(phase === "logo" || phase === "drain") && (
            <motion.div
              key="logo"
              className={styles.logoBox}
              initial={{ scale: 0.3, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.15, opacity: 0, transition: { duration: 0.4 } }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <Image
                src="/avil-pro-removebg-preview.png"
                alt="Avilpro"
                width={220}
                height={110}
                className={styles.logo}
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
