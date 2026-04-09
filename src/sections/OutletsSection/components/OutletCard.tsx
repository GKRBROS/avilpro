import { useState } from "react";

export type OutletCardProps = {
  ariaLabel: string;
  imageSrc: string;
  imageAlt: string;
  name: string;
  address: React.ReactNode;
  phone: string;
  mapUrl: string;
};

export const OutletCard = (props: OutletCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="group"
      aria-label={props.ariaLabel}
      className="relative h-full w-full min-h-[auto] min-w-[auto]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`flex flex-col h-full bg-green-700 overflow-hidden rounded-[32px] border border-green-600/50 transition-all duration-500 ${
          hovered ? "-translate-y-2 shadow-[0_24px_48px_rgba(21,128,61,0.4)] border-yellow-400/50" : "shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
        }`}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img
            src={props.imageSrc}
            alt={props.imageAlt}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
              hovered ? "scale-110" : "scale-100"
            }`}
          />
          {/* Subtle gradient so the image grounds well */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-green-700 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-grow p-6 md:p-8 relative z-10 -mt-6">
          <h2
            className={`text-2xl md:text-3xl font-black uppercase tracking-tight leading-none transition-colors duration-300 ${
              hovered ? "text-white" : "text-yellow-400"
            }`}
          >
            {props.name}
          </h2>
          
          <div className="mt-4 flex-grow">
            <p className="text-sm md:text-base font-medium leading-relaxed text-green-50 mb-2">
              {props.address}
            </p>
            <p className="text-sm font-semibold text-yellow-400/90 tracking-wider">
              {props.phone}
            </p>
          </div>

          <a
            href={props.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 w-full py-3.5 px-6 rounded-full text-center text-[15px] font-bold uppercase tracking-widest transition-all duration-300 ${
              hovered 
                ? "bg-yellow-400 text-green-900 shadow-[0_8px_20px_rgba(251,255,0,0.3)]" 
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            View Map
          </a>
        </div>
      </div>
    </div>
  );
};
