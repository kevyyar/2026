import { ArrowRight, Menu, SquareCode, X } from "lucide-react";
import React, { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  disabled?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMobileMenu = () => {
    setMobileOpen(true);
    setIsAnimating(true);
  };

  const closeMobileMenu = () => {
    setIsAnimating(false);
    setTimeout(() => setMobileOpen(false), 300);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "pt-4" : "pt-6"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-4 transition-all duration-300 ${
            scrolled ? "max-w-[95%]" : ""
          }`}
        >
          <div className="glass-panel mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300">
            <div className="flex h-16 items-center justify-between">
              {/* Left: Logo */}
              <a
                href="/"
                className="flex items-center gap-2 group"
                aria-label="Home"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  <SquareCode className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-xl font-bold font-family-primary tracking-tighter text-white group-hover:text-primary transition-colors">
                  i am Kev
                </span>
              </a>

              {/* Center: Nav */}
              <ul className="hidden items-center gap-1 md:flex">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`nav-link px-4 py-2 text-sm font-medium ${
                        item.disabled
                          ? "text-gray-600 pointer-events-none"
                          : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Right: Actions */}
              <div className="hidden items-center gap-3 md:flex">
                <a
                  href="#contact"
                  className="btn px-5 py-2.5 text-sm"
                >
                  <span>Let's Talk</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white md:hidden transition-colors"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                onClick={openMobileMenu}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Dark overlay */}
          <div
            className={`fixed inset-0 bg-black/80 backdrop-blur-sm ${
              isAnimating ? "overlay-enter" : "overlay-exit"
            }`}
            onClick={closeMobileMenu}
          />

          {/* Drawer */}
          <div
            className={`fixed bottom-0 left-0 right-0 bg-[#0F172A] border-t border-white/10 rounded-t-3xl shadow-2xl ${
              isAnimating ? "drawer-enter" : "drawer-exit"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
              <span className="text-xl font-bold text-white font-family-primary">Menu</span>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close menu"
                onClick={closeMobileMenu}
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation */}
            <div className="px-6 py-6">
              <ul className="space-y-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`block rounded-xl px-4 py-3 text-lg font-medium ${
                        item.disabled
                          ? "text-gray-600 pointer-events-none"
                          : "text-gray-300"
                      } hover:bg-white/5 hover:text-white transition-colors`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="px-6 pb-8 pt-2">
              <a
                href="#contact"
                className="btn w-full justify-center py-4 text-lg"
                onClick={closeMobileMenu}
              >
                <span>Let's Talk</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
