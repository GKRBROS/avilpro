"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LoadingOverlay.module.css";
import Image from "next/image";

export default function LoadingOverlay() {
  const [loading, setLoading] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Sequence: Yellow Juice Flow -> Logo Reveal -> Content
    const logoTimer = setTimeout(() => setShowLogo(true), 1200);
    const endTimer = setTimeout(() => setLoading(false), 3200);
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(endTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className={styles.overlay}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.6, ease: "easeInOut" } 
          }}
        >
          {/* Yellow Juice Flow Layer */}
          <motion.div 
            className={styles.juiceFlow}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1] }}
          >
             <svg className={styles.wave} viewBox="0 0 1440 320">
                <path fill="var(--brand-yellow)" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,106.7C384,85,480,75,576,101.3C672,128,768,192,864,208C960,224,1056,192,1152,165.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
             </svg>
             <div className={styles.juiceFill}></div>
          </motion.div>

          <div className={styles.content}>
            <AnimatePresence>
              {showLogo && (
                <motion.div 
                  className={styles.logoWrapper}
                  initial={{ opacity: 0, scale: 0.7, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
      )}
    </AnimatePresence>
  );
}
