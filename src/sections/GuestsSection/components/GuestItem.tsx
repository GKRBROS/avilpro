export type GuestItemProps = {
  ariaLabel: string;
  image1Src: string;
  image2Src: string;
};

export const GuestItem = (props: GuestItemProps) => {
  return (
    <div
      role="group"
      aria-label={props.ariaLabel}
      className="relative shrink-0 w-[90vw] md:w-[900px]"
    >
      <div className="relative mx-auto flex w-full flex-col items-center gap-4 overflow-visible md:h-[480px] md:items-start md:justify-center">
        <div
          className="relative h-[220px] w-[220px] overflow-hidden rounded-[50%] md:absolute md:right-[8%] md:top-[2%] md:h-[360px] md:w-[360px] lg:h-[390px] lg:w-[390px] hover:scale-105 transition-transform duration-300"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
        >
          <img
            src={props.image1Src}
            alt="Guest Image 1"
            loading="lazy"
            className="inline w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 rounded-[50%]" />
        </div>
        <div
          className="relative h-[190px] w-[190px] overflow-hidden rounded-[50%] md:absolute md:left-[6%] md:bottom-[4%] md:h-[285px] md:w-[285px] lg:h-[315px] lg:w-[315px] hover:scale-105 transition-transform duration-300"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
        >
          <img
            src={props.image2Src}
            alt="Guest Image 2"
            loading="lazy"
            className="inline w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 rounded-[50%]" />
        </div>
      </div>
    </div>
  );
};
