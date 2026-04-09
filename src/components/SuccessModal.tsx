import { useModal } from "@/App";
import { useEffect } from "react";

export const SuccessModal = () => {
  const { isSuccessOpen, closeSuccess } = useModal();

  useEffect(() => {
    if (isSuccessOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSuccessOpen]);

  if (!isSuccessOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center overflow-y-auto p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSuccess();
      }}
    >
      <div className="relative bg-white flex flex-col w-[85%] max-w-lg border border-zinc-300 rounded-md animate-fade-in-up my-8 shadow-xl">
        <button
          onClick={closeSuccess}
          className="absolute text-neutral-400 text-3xl font-bold z-[2] right-2.5 top-1.5 hover:text-neutral-700 transition-colors leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex items-center flex-col justify-center bg-neutral-100 p-6 md:p-8">
          <div className="text-5xl mb-4">🎉</div>
          <img
            src="https://c.animaapp.com/mnoq39ijPMbAJo/assets/mouxy-cup.jpeg"
            alt="Mouzy Cup"
            className="w-4/5 md:w-6/12 rounded-lg shadow"
          />
          <p className="text-lg font-medium max-w-[70%] text-center mt-5 mb-3">
            Your data has been submitted successfully. Kindly contact us on{" "}
            <a
              href="tel:+918078155047"
              className="text-green-700 hover:underline"
            >
              +91 8078155047
            </a>
          </p>
          <button
            onClick={closeSuccess}
            className="relative text-white text-base font-medium bg-black tracking-[0.3px] leading-6 text-center capitalize align-middle overflow-hidden pt-[11px] pb-1 px-[25px] rounded-[30px] transition-colors duration-200 hover:bg-green-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
