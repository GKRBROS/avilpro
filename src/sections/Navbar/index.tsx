import { useState, useEffect } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "items",
      "outlets",
      "gallery",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#items", label: "Items" },
    { href: "#outlets", label: "Outlets" },
    { href: "#gallery", label: "Gallery" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href) as HTMLElement | null;
    if (target) {
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: targetTop - 110, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`relative z-50 w-full transition-all duration-300 ${scrolled ? "drop-shadow-md" : ""}`}
      >
        <div className="mx-auto w-full px-[5.28px] md:max-w-[1140px] md:px-[7.5px]">
          <div
            className={`flex items-center justify-between rounded-[160px] px-5 py-2.5 backdrop-blur-[33px] transition-all duration-300 ${
              scrolled ? "bg-white/95 shadow-md" : "bg-white/80"
            }`}
          >
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="block flex-shrink-0 transition-opacity duration-200 hover:opacity-80"
            >
              <img
                src="https://www.avilpro.in/wp-content/uploads/2024/12/avil-pro-removebg-preview.png"
                alt="Avilpro logo"
                className="hidden h-[44px] w-auto object-contain md:block"
              />
              <img
                src="https://www.avilpro.in/wp-content/uploads/2024/12/avil-pro-removebg-preview.png"
                alt="Avilpro logo"
                className="block h-[34px] w-auto object-contain md:hidden"
              />
            </a>

            <ul className="m-0 hidden list-none items-center gap-x-8 pl-0 md:flex">
              {navLinks.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`relative pb-0.5 text-lg font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-green-700 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded after:bg-green-700"
                          : "text-neutral-900 hover:text-green-700"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="relative -translate-y-[5px] overflow-hidden rounded-[30px] bg-green-700 px-[25px] pb-1 pt-[11px] text-center text-base font-medium capitalize leading-6 text-white transition-all duration-200 hover:bg-yellow-400 hover:text-black"
              >
                Contact Us
              </a>

              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="flex flex-col gap-[5px] rounded-lg p-2 transition-colors duration-200 hover:bg-black/5 focus:outline-none md:hidden"
                aria-label="Toggle menu"
              >
                <span
                  className={`h-0.5 w-6 bg-black transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
                />
                <span
                  className={`h-0.5 w-6 bg-black transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`h-0.5 w-6 bg-black transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed left-0 top-0 z-50 h-full w-3/4 max-w-[300px] bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
          <img
            src="https://www.avilpro.in/wp-content/uploads/2024/12/avil-pro-removebg-preview.png"
            alt="Avilpro logo"
            className="w-[49px] object-contain"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1 text-2xl leading-none text-neutral-500 hover:text-neutral-900"
            aria-label="Close menu"
          >
            x
          </button>
        </div>

        <ul className="m-0 list-none py-4 pl-0">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block border-b border-green-700/10 px-6 py-3.5 text-base font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-neutral-800 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li className="px-6 pt-5">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="block rounded-[30px] bg-green-700 px-6 py-2.5 text-center text-base font-medium capitalize text-white transition-colors duration-200 hover:bg-yellow-400 hover:text-black"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
