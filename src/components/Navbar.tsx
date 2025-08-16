import React from "react";
import { Square, Phone, Download, Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Product", href: "#product" },
  { label: "Extensions", href: "#extensions" },
  { label: "Docs", href: "#docs" },
  { label: "Blog", href: "#blog" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop bar */}
        <div className="flex h-14 items-center justify-between">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2 text-gray-900" aria-label="Home">
              <Square className="h-6 w-6 text-primary" />
              <span className="hidden text-sm font-medium sm:inline">My Portfolio</span>
            </a>

            <ul className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm font-normal text-gray-700 hover:bg-gray-50 hover:text-gray-900"
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
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-normal text-gray-900 shadow-sm hover:bg-gray-50"
            >
              <Phone size={16} />
              <span>Lets Link</span>
            </a>
            <a
              href="/cv.pdf"
              download
              className="btn inline-flex items-center gap-2"
            >
              <Download size={16} />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="md:hidden">
            <div className="border-t border-gray-100 py-3">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm font-normal text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-3 border-t border-gray-100 py-3">
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-normal text-gray-900 shadow-sm hover:bg-gray-50"
              >
                <Phone size={16} />
                <span>Lets Link</span>
              </a>
              <a
                href="/cv.pdf"
                download
                className="btn inline-flex w-full items-center justify-center gap-2"
              >
                <Download size={16} />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}