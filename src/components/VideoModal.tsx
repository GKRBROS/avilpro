import { useModal } from "@/App";
import { useEffect } from "react";

export const VideoModal = () => {
  const { isVideoOpen, closeVideo } = useModal();

  useEffect(() => {
    if (isVideoOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVideoOpen]);

  if (!isVideoOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeVideo();
      }}
    >
      <div className="relative bg-black flex flex-col w-[90%] max-w-2xl rounded-lg overflow-hidden animate-fade-in-up shadow-2xl">
        <button
          onClick={closeVideo}
          className="absolute text-white text-3xl font-bold z-[2] right-3 top-1 hover:text-yellow-400 transition-colors leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <iframe
          src={
            isVideoOpen
              ? "https://www.youtube.com/embed/kee9Xn4UsGQ?autoplay=1"
              : ""
          }
          title="YouTube video player"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full aspect-video"
        />
      </div>
    </div>
  );
};
