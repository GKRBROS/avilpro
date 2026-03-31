"use client";

import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LoadingOverlay.module.css";
import Image from "next/image";
import { useLoading } from "./LoadingContext";

type Phase = "fill" | "logo" | "drain";

export default function LoadingOverlay() {
  const [phase, setPhase] = useState<Phase>("fill");
  const [visible, setVisible] = useState(true);
  const { setLoaded } = useLoading();

  // useLayoutEffect: fires synchronously before browser paint
  useLayoutEffect(() => {
    // Step 1: lock scroll
    document.documentElement.style.overflow = "hidden";

    // Step 2: juice fills → logo pops in
    const t1 = setTimeout(() => setPhase("logo"), 1200);
    // Step 3: drain starts
    const t2 = setTimeout(() => setPhase("drain"), 2400);
    // Step 4: loader exits, scroll restored, float appears
    const t3 = setTimeout(() => {
      setVisible(false);
      setLoaded(true);
      document.documentElement.style.overflow = ""; // ✅ restores scroll
    }, 3400);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      document.documentElement.style.overflow = "";
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      {/* Yellow juice: floods up, then drains down */}
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

      {/* Decorative wave on leading edge */}
      <motion.div
        className={styles.waveWrapper}
        initial={{ y: "100%" }}
        animate={{ y: phase !== "drain" ? "0%" : "100%" }}
        transition={
          phase === "fill"  ? { duration: 1.1, ease: [0.76, 0, 0.24, 1] } :
          phase === "drain" ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] } :
          { duration: 0 }
        }
      >
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className={styles.wave}>
          <path
            d="M0,60 C200,100 400,20 720,60 C1040,100 1240,20 1440,60 L1440,100 L0,100 Z"
            fill="#FBE106"
          />
        </svg>
      </motion.div>

      {/* Logo spring reveal */}
      <div className={styles.centerStage}>
        <AnimatePresence>
          {(phase === "logo" || phase === "drain") && (
            <motion.div
              key="logo"
              className={styles.logoBox}
              initial={{ scale: 0.3, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0, transition: { duration: 0.35 } }}
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
