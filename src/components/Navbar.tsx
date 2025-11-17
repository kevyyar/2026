import { ArrowRight, Menu, SquareCode, X } from "lucide-react";
import React from "react";

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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

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
      <nav className="sticky top-0 z-40 border-b border-gray-100 bg-secondary/30 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Desktop bar */}
          <div className="flex h-14 items-center justify-between">
            {/* Left: Logo + Nav */}
            <div className="flex items-center gap-6">
              <a
                href="/"
                className="flex items-center gap-1 text-gray-900"
                aria-label="Home"
              >
                <SquareCode className="h-7 w-7 text-primary" />
                <span className="text-lg font-bold font-family-primary text-primary">
                  i am Kev
                </span>
              </a>

              <ul className="hidden items-center gap-1 md:flex">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`rounded-md px-3 py-2 text-sm font-normal ${item.disabled ? "text-gray-400 hover:bg-gray-400 pointer-events-none" : "text-gray-700"} hover:bg-gray-100 hover:text-gray-900`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Actions */}
            <div className="hidden items-center gap-3 md:flex">
              <a
                href="#contact"
                className="btn flex items-center gap-2 px-6 py-3"
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={openMobileMenu}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Dark overlay */}
          <div
            className={`fixed inset-0 bg-black/50 ${isAnimating ? "overlay-enter" : "overlay-exit"}`}
            onClick={closeMobileMenu}
          />

          {/* Drawer */}
          <div
            className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl ${isAnimating ? "drawer-enter" : "drawer-exit"}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <h2 className="text-primary"><SquareCode /></h2>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
                aria-label="Close menu"
                onClick={closeMobileMenu}
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <div className="px-4 py-4">
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`block rounded-lg px-3 py-3 text-base font-normal ${item.disabled ? "text-gray-400 hover:bg-gray-400 pointer-events-none" : "text-gray-700"} hover:bg-gray-50 hover:text-gray-900 transition-colors`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="px-4 py-4 border-t border-gray-100">
              <a
                href="#contact"
                className="btn inline-flex w-full items-center justify-center gap-2 py-3 text-base"
                onClick={closeMobileMenu}
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
