const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Guests" },
  { href: "#contact", label: "Contact" },
];

export const FooterNav = () => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href) as HTMLElement | null;
    if (target) {
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: targetTop - 110, behavior: "smooth" });
    }
  };

  return (
    <li className="flex flex-col items-center justify-center min-h-[auto] min-w-[auto] order-1 w-full md:order-none md:w-auto mt-4 md:mt-0 md:mx-auto pt-[3px]">
      <ul className="flex flex-col items-center min-h-[auto] min-w-[auto] gap-y-3 w-full pl-0 md:gap-y-4 md:items-start">
        {links.map((link) => (
          <li
            key={link.href}
            className="flex min-h-[auto] min-w-[auto] w-full"
          >
            <a
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-neutral-800 text-[12.8832px] items-center flex leading-[19.3248px] min-h-[auto] min-w-[auto] md:text-lg md:leading-[27px] md:min-h-0 md:min-w-0 hover:text-neutral-600 transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-neutral-800 transition-all duration-200 group-hover:w-full" />
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};
