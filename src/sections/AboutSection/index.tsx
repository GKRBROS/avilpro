export const AboutSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#ececec] px-4 pb-14 pt-10 md:px-0 md:pb-20 md:pt-12">
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-yellow-400 md:h-[30%]" />
      <img
        src="https://c.animaapp.com/mnoq39ijPMbAJo/assets/xGrirPximmCJUb9nTmfXUcTqjO06mgecWftX4hcA.png"
        alt="Decorative oats"
        className="pointer-events-none absolute bottom-0 right-0 z-0 w-[200px] opacity-95 md:w-[420px] xl:w-[520px] object-contain"
      />

      <div className="relative z-10 mx-auto w-full max-w-none px-[5.28px] md:max-w-[1140px] md:px-[7.5px]">
        <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2 md:gap-y-3">
          <div className="max-w-[520px]">
            <div>
              <h6 className="mb-[7.04px] text-[22.528px] font-bold uppercase leading-[20.5005px] tracking-[-0.90112px] text-yellow-400 md:mb-[5px] md:text-[32px] md:leading-[29.12px] md:tracking-[-1.28px]">
                About Us
              </h6>
              <h1 className="mb-[3.52px] text-[37.5466px] font-bold uppercase leading-[34.1674px] tracking-[-2.70336px] text-green-700 md:mb-[5px] md:text-[53.3333px] md:leading-[48.5333px] md:tracking-[-3.84px]">
                Since 1985
              </h1>
            </div>

            <img
              src="https://www.avilpro.in/wp-content/uploads/2024/12/avil.jpg"
              alt="Avil cups"
              className="relative z-10 mt-3 h-[360px] w-full max-w-[470px] object-cover shadow-sm md:mt-4 md:h-[440px]"
            />
          </div>

          <p className="mb-[7.04px] max-w-full text-[16.192px] font-medium capitalize leading-[27.456px] tracking-[0.2816px] text-neutral-800 md:mb-2.5 md:max-w-[590px] md:pt-2 md:text-xl md:leading-[34px] md:tracking-[0.4px]">
            Welcome to Avilpro premium Avil Milk Shop, where we serve the
            creamiest, most delicious milkshakes in town! Our mission is to
            provide top-notch quality, exceptional customer service, and a fun,
            welcoming atmosphere. Our strong team, dedicated and passionate,
            ensures every bite of our products is crispy, tender, and bursting
            with authentic taste.
          </p>
        </div>
      </div>
    </section>
  );
};
