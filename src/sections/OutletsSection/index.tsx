// removed imports
import { OutletCard } from "@/sections/OutletsSection/components/OutletCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const outlets = [
  {
    ariaLabel: "1 / 3",
    imageSrc:
      "https://www.avilpro.in/wp-content/uploads/2025/01/avil-pro8.jpeg",
    imageAlt: "Avilpro Chavakkad",
    name: "Avilpro Chavakkad",
    address: "Opp Chavakkad Town Juma Masjid, Chavakkad PO, Thrissur, Kerala",
    phone: "+91 9497711171",
    mapUrl: "https://maps.google.com/?q=Chavakkad+Thrissur+Kerala",
  },
  {
    ariaLabel: "2 / 3",
    imageSrc:
      "https://www.avilpro.in/wp-content/uploads/2025/01/avil-pro7.jpeg",
    imageAlt: "Avilpro Guruvayoor",
    name: "Avilpro Guruvayoor",
    address: "Guruvayoor, Thrissur, Kerala",
    phone: "+91 9497711171",
    mapUrl: "https://maps.google.com/?q=Guruvayoor+Thrissur+Kerala",
  },
  {
    ariaLabel: "3 / 3",
    imageSrc:
      "https://www.avilpro.in/wp-content/uploads/2025/01/avil-pro6.jpeg",
    imageAlt: "Avilpro Attupurram",
    name: "Avilpro Attupurram",
    address: "Attupurram, Thrissur, Kerala",
    phone: "+91 9497711171",
    mapUrl: "https://maps.google.com/?q=Attupurram+Thrissur+Kerala",
  },
];

export const OutletsSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal(0.1);
  return (
    <section className="relative box-border overflow-hidden bg-white px-2 py-8 md:px-0 md:py-6">
      <div className="mx-auto w-full max-w-none px-2 md:max-w-[1140px] md:px-2">
        <div
          ref={titleRef}
          className={`mb-6 transition-all duration-700 md:mb-8 ${titleVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <h1 className="mb-1 text-[clamp(2.5rem,9vw,5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em] text-green-700 drop-shadow-sm">
            Our Outlets
          </h1>
          <p className="text-[16px] font-medium text-green-700 md:text-[20px]">
            Visit our nearby stores and enjoy fresh taste in every cup.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[1300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 py-4">
            {outlets.map((outlet, i) => (
              <OutletCard
                key={`${outlet.name}-${i}`}
                ariaLabel={outlet.ariaLabel}
                imageSrc={outlet.imageSrc}
                imageAlt={outlet.imageAlt}
                name={outlet.name}
                address={outlet.address}
                phone={outlet.phone}
                mapUrl={outlet.mapUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
