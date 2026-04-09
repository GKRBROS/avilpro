import { FloatingButton } from "@/components/FloatingButton";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { PartnershipModal } from "@/components/PartnershipModal";
import { VideoModal } from "@/components/VideoModal";
import { SuccessModal } from "@/components/SuccessModal";
import { Main } from "@/components/Main";
import { useState, useEffect } from "react";
import Lenis from "lenis";

export type ModalContextType = {
  isPartnershipOpen: boolean;
  isVideoOpen: boolean;
  isSuccessOpen: boolean;
  openPartnership: () => void;
  closePartnership: () => void;
  openVideo: () => void;
  closeVideo: () => void;
  openSuccess: () => void;
  closeSuccess: () => void;
};

import { createContext, useContext } from "react";
export const ModalContext = createContext<ModalContextType>({
  isPartnershipOpen: false,
  isVideoOpen: false,
  isSuccessOpen: false,
  openPartnership: () => {},
  closePartnership: () => {},
  openVideo: () => {},
  closeVideo: () => {},
  openSuccess: () => {},
  closeSuccess: () => {},
});

export const useModal = () => useContext(ModalContext);

export const App = () => {
  const [isPartnershipOpen, setIsPartnershipOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Initialize smooth scrolling globally
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const ctx: ModalContextType = {
    isPartnershipOpen,
    isVideoOpen,
    isSuccessOpen,
    openPartnership: () => setIsPartnershipOpen(true),
    closePartnership: () => setIsPartnershipOpen(false),
    openVideo: () => setIsVideoOpen(true),
    closeVideo: () => setIsVideoOpen(false),
    openSuccess: () => setIsSuccessOpen(true),
    closeSuccess: () => setIsSuccessOpen(false),
  };

  return (
    <ModalContext.Provider value={ctx}>
      <LoadingOverlay />
      <div className="bg-white text-neutral-800">
        <FloatingButton />
        <PartnershipModal />
        <VideoModal />
        <SuccessModal />
        <Main />
      </div>
    </ModalContext.Provider>
  );
};
