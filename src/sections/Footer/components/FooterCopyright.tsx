export const FooterCopyright = () => {
  return (
    <div className="text-sm items-center flex flex-col gap-1 justify-between text-center pt-[9px] md:flex-row md:text-start">
      <h2 className="text-neutral-800 text-sm font-medium leading-[22.528px] min-h-[auto] min-w-[auto] text-center md:text-start">
        Copyright &copy; 2026 Avilpro. All Rights Reserved.
      </h2>
      <div className="flex flex-col items-center gap-1 md:items-end">
        <h2 className="text-neutral-800 text-sm font-medium leading-[22.528px] text-center md:text-start">
          <a
            href="mailto:avilpro.official@gmail.com"
            className="hover:underline hover:text-neutral-600 transition-colors duration-200"
          >
            avilpro.official@gmail.com
          </a>
        </h2>
        <div className="flex items-center gap-1.5 mt-1 pb-1">
          <span className="text-neutral-600 text-xs font-semibold uppercase tracking-wider">Powered by</span>
          <a
            href="https://www.thinkforgeglobal.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-2 py-0.5 rounded shadow-sm bg-gradient-to-r from-green-700 to-green-600 text-yellow-400 text-xs font-bold uppercase tracking-wide hover:from-green-800 hover:to-green-700 hover:shadow-md hover:scale-105 transition-all duration-300"
          >
            Think Forge Global
          </a>
        </div>
      </div>
    </div>
  );
};

