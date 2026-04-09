import { useState, useEffect } from "react";

export const FloatingButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed text-white text-xl items-center bg-green-700 flex h-[50px] justify-center text-center w-[50px] z-[100] rounded-[60px] right-5 bottom-20 shadow-lg transition-all duration-300 hover:bg-slate-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-700/50 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      ↑
    </button>
  );
};
