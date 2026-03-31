"use client";

import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LoadingOverlay.module.css";
import Image from "next/image";

export default function LoadingOverlay() {
  const [phase, setPhase] = useState<"juice" | "logo" | "done">("juice");

  // useLayoutEffect fires synchronously before browser paint — prevents flash
  useLayoutEffect(() => {
    // Lock scroll while loading
    document.documentElement.style.overflow = "hidden";

    const logoTimer = setTimeout(() => setPhase("logo"), 1400);
    const endTimer = setTimeout(() => {
      setPhase("done");
      document.documentElement.style.overflow = "";
    }, 3000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(endTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className={styles.overlay}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      >
        {/* Yellow juice drains downward (leaves yellow bg, wave goes down) */}
        <motion.div
          className={styles.juiceFlow}
          style={{ originY: 0 }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        >
          <svg
            className={styles.wave}
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FBE106"
              d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            />
          </svg>
          <div className={styles.juiceFill} />
        </motion.div>

        {/* Logo pops in after wave begins to drain */}
        <div className={styles.content}>
          <AnimatePresence>
            {phase === "logo" && (
              <motion.div
                key="logo"
                className={styles.logoWrapper}
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.3 } }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <Image
                  src="/avil-pro-removebg-preview.png"
                  alt="Avilpro Logo"
                  width={200}
                  height={100}
                  className={styles.logo}
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
