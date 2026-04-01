"use client";

import { useLayoutEffect, useRef, useState } from "react";
import styles from "./LoadingOverlay.module.css";
import Image from "next/image";
import { useLoading } from "./LoadingContext";
import { gsap } from "gsap";

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true);
  const { setLoaded } = useLoading();
  const juiceRef = useRef<HTMLDivElement | null>(null);
  const waveRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const restoreHashPosition = () => {
    const rawHash = window.location.hash;
    if (!rawHash || rawHash.length < 2) return;

    const targetId = decodeURIComponent(rawHash.slice(1));
    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({ behavior: "auto", block: "start" });
  };

  // useLayoutEffect: fires synchronously before browser paint
  useLayoutEffect(() => {
    const navEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReload = navEntry?.type === "reload";

    // On browser refresh, always land on home root.
    if (
      isReload &&
      (window.location.pathname !== "/" || window.location.hash)
    ) {
      window.location.replace("/");
      return;
    }

    // Step 1: lock scroll
    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline();
    gsap.set(juiceRef.current, { yPercent: 100 });
    gsap.set(waveRef.current, { yPercent: 100 });
    gsap.set(logoRef.current, { autoAlpha: 0, scale: 0.3, y: 40 });
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });

    tl.to([juiceRef.current, waveRef.current], {
      yPercent: 0,
      duration: 1.1,
      ease: "power3.inOut",
      stagger: 0,
    })
      .to(
        progressRef.current,
        {
          scaleX: 1,
          duration: 2.4,
          ease: "none",
        },
        "<",
      )
      .to(
        logoRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.6)",
        },
        "-=0.2",
      )
      .to({}, { duration: 0.7 })
      .to(logoRef.current, { autoAlpha: 0, duration: 0.35 })
      .to(
        [juiceRef.current, waveRef.current],
        {
          yPercent: 100,
          duration: 0.9,
          ease: "power3.inOut",
          stagger: 0,
        },
        "-=0.1",
      )
      .call(() => {
        setVisible(false);
        setLoaded(true);
        document.documentElement.style.overflow = "";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => restoreHashPosition());
        });
      });

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      <div ref={juiceRef} className={styles.juice} />

      {/* Decorative wave on leading edge */}
      <div ref={waveRef} className={styles.waveWrapper}>
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
      </div>

      <div className={styles.centerStage}>
        <div ref={logoRef} className={styles.logoBox}>
          <Image
            src="/avil-pro-removebg-preview.png"
            alt="Avilpro"
            width={220}
            height={110}
            className={styles.logo}
            priority
          />
          <p className={styles.loaderLabel}>Preparing your Avilpro experience...</p>
          <div className={styles.progressTrack}>
            <div ref={progressRef} className={styles.progressFill} />
          </div>
        </div>
      </div>
    </div>
  );
}
