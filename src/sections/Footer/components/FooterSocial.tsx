export const FooterSocial = () => {
  return (
    <li className="items-start flex flex-col justify-start min-h-[auto] min-w-[auto] md:justify-normal">
      <ul className="items-center gap-x-[14.08px] flex justify-between min-h-[auto] min-w-[auto] gap-y-[14.08px] w-full pl-0 md:gap-x-5 md:gap-y-5">
        <li className="min-h-[auto] min-w-[auto] w-full mb-[11.968px] md:mb-[17px]">
          <ul className="items-center gap-x-[10.56px] flex gap-y-[10.56px] pl-0 md:gap-x-[15px] md:gap-y-[15px]">
            <li>
              <a
                href="https://www.facebook.com/avilpro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 bg-neutral-800 rounded-full text-white hover:bg-blue-600 transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/avilpro.official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 bg-neutral-800 rounded-full text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-200"
                aria-label="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  );
};
