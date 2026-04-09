import { PartnershipForm } from "@/components/PartnershipModal/components/PartnershipForm";
import { useModal } from "@/App";
import { useEffect } from "react";

export const PartnershipModal = () => {
  const { isPartnershipOpen, closePartnership } = useModal();

  useEffect(() => {
    if (isPartnershipOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPartnershipOpen]);

  if (!isPartnershipOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center overflow-y-auto p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePartnership();
      }}
    >
      <div className="relative bg-white flex flex-col w-[90%] max-w-xl border border-zinc-500 rounded-md animate-fade-in-up my-8">
        <button
          onClick={closePartnership}
          className="absolute text-neutral-400 text-3xl font-bold z-[2] right-2.5 top-1.5 hover:text-neutral-700 transition-colors leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <PartnershipForm />
      </div>
    </div>
  );
};
