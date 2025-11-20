import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_dyRaoW4y.mjs';
/* empty css                                 */
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { SquareCode, ArrowRight, Menu, X, Sparkles, ChevronDown, Code, Palette, Rocket, Zap, Shield, LineChart, ArrowUpRight, TrendingUp, Search, Lightbulb, Code2, Target, Users, Award, Heart } from 'lucide-react';
import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import gsap from 'gsap';
import { useForm } from 'react-hook-form';
export { renderers } from '../renderers.mjs';

const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" }
];
function Navbar() {
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "nav",
      {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "pt-4" : "pt-6"}`,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `mx-auto max-w-7xl px-4 transition-all duration-300 ${scrolled ? "max-w-[95%]" : ""}`,
            children: /* @__PURE__ */ jsx("div", { className: "glass-panel mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 items-center justify-between", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "/",
                  className: "flex items-center gap-2 group",
                  "aria-label": "Home",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors", children: /* @__PURE__ */ jsx(SquareCode, { className: "h-6 w-6 text-primary group-hover:text-white transition-colors" }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold font-family-primary tracking-tighter text-white group-hover:text-primary transition-colors", children: "i am Kev" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("ul", { className: "hidden items-center gap-1 md:flex", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: item.href,
                  className: `nav-link px-4 py-2 text-sm font-medium ${item.disabled ? "text-gray-600 pointer-events-none" : ""}`,
                  children: item.label
                }
              ) }, item.label)) }),
              /* @__PURE__ */ jsx("div", { className: "hidden items-center gap-3 md:flex", children: /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "#contact",
                  className: "btn px-5 py-2.5 text-sm",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "Let's Talk" }),
                    /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "inline-flex items-center justify-center rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white md:hidden transition-colors",
                  "aria-label": "Toggle menu",
                  "aria-expanded": mobileOpen,
                  onClick: openMobileMenu,
                  children: /* @__PURE__ */ jsx(Menu, { size: 24 })
                }
              )
            ] }) })
          }
        )
      }
    ),
    mobileOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 md:hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `fixed inset-0 bg-black/80 backdrop-blur-sm ${isAnimating ? "overlay-enter" : "overlay-exit"}`,
          onClick: closeMobileMenu
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `fixed bottom-0 left-0 right-0 bg-[#0F172A] border-t border-white/10 rounded-t-3xl shadow-2xl ${isAnimating ? "drawer-enter" : "drawer-exit"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-6 border-b border-white/10", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white font-family-primary", children: "Menu" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "inline-flex items-center justify-center rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors",
                  "aria-label": "Close menu",
                  onClick: closeMobileMenu,
                  children: /* @__PURE__ */ jsx(X, { size: 24 })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "px-6 py-6", children: /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              "a",
              {
                href: item.href,
                className: `block rounded-xl px-4 py-3 text-lg font-medium ${item.disabled ? "text-gray-600 pointer-events-none" : "text-gray-300"} hover:bg-white/5 hover:text-white transition-colors`,
                onClick: closeMobileMenu,
                children: item.label
              }
            ) }, item.label)) }) }),
            /* @__PURE__ */ jsx("div", { className: "px-6 pb-8 pt-2", children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#contact",
                className: "btn w-full justify-center py-4 text-lg",
                onClick: closeMobileMenu,
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Let's Talk" }),
                  /* @__PURE__ */ jsx(ArrowRight, { size: 20 })
                ]
              }
            ) })
          ]
        }
      )
    ] })
  ] });
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}
function CodeRain({
  count,
  symbols = [
    "{}",
    "[]",
    "()",
    "<>",
    "</>",
    "=>",
    "<div/>",
    "<script />",
    "foo",
    "bar",
    "export",
    "import",
    "() => {}",
    "Reference Error",
    "undefined"
  ],
  className = "",
  speedRange = { min: 8, max: 16 },
  opacityRange = { min: 0.12, max: 0.28 },
  fontSizeRange = { min: 14, max: 38 }
}) {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const [size, setSize] = useState({
    width: 0,
    height: 0
  });
  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });
    const ro = "ResizeObserver" in window ? new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r) setSize({ width: r.width, height: r.height });
    }) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, []);
  const effectiveCount = useMemo(() => {
    if (typeof count === "number") return count;
    if (size.width >= 1024) return 48;
    if (size.width >= 640) return 26;
    return 14;
  }, [count, size.width]);
  const specs = useMemo(() => {
    if (!mounted) return [];
    const items = [];
    const minFS = fontSizeRange.min;
    const maxFS = fontSizeRange.max;
    const minOp = opacityRange.min;
    const maxOp = opacityRange.max;
    for (let i = 0; i < effectiveCount; i++) {
      items.push({
        text: pick(symbols),
        fontSize: Math.round(rand(minFS, maxFS)),
        opacity: clamp(rand(minOp, maxOp), 0, 1),
        rotate: Math.round(rand(-40, 40)),
        // For reduced-motion static layout, scatter using percentages
        leftPct: rand(3, 97),
        topPct: rand(0, 100)
      });
    }
    return items;
  }, [
    mounted,
    effectiveCount,
    symbols,
    fontSizeRange.min,
    fontSizeRange.max,
    opacityRange.min,
    opacityRange.max
  ]);
  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!mounted) return;
    if (reducedMotion) return;
    gsap.killTweensOf(el.querySelectorAll(".js-code-symbol"));
    const width = size.width || el.clientWidth || 0;
    const height = size.height || el.clientHeight || 0;
    if (!width || !height) return;
    const nodes = Array.from(
      el.querySelectorAll(".js-code-symbol")
    );
    const cleanups = [];
    nodes.forEach((node) => {
      const startX = rand(0, width);
      const startY = rand(-300, -50);
      const endY = height + 100;
      const startRot = rand(-45, 45);
      const rotDelta = rand(-90, 90);
      const duration = rand(speedRange.min, speedRange.max);
      const delay = rand(0, 6);
      const sway = rand(8, 40);
      const swayDur = rand(2.5, 6);
      gsap.set(node, {
        x: startX,
        y: startY,
        rotate: startRot,
        force3D: true,
        willChange: "transform, opacity"
      });
      const fall = gsap.to(node, {
        y: endY,
        rotate: startRot + rotDelta,
        duration,
        ease: "none",
        delay,
        repeat: -1,
        onRepeat: () => {
          gsap.set(node, {
            x: rand(0, width),
            y: rand(-300, -50),
            rotate: rand(-45, 45)
          });
        }
      });
      const swayTween = gsap.to(node, {
        x: `+=${sway}`,
        duration: swayDur,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay
      });
      cleanups.push(() => {
        fall.kill();
        swayTween.kill();
      });
    });
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [mounted, reducedMotion, size.height, size.width, speedRange.max, speedRange.min]);
  useEffect(() => {
    setMounted(true);
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: `absolute inset-0 pointer-events-none overflow-hidden select-none ${className || ""}`,
      "aria-hidden": "true",
      style: {
        // Ensure it sits behind hero content by default; content can set higher z-index
        zIndex: 0,
        fontFamily: "var(--font-family-secondary)"
      },
      children: mounted && specs.map((s, i) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "js-code-symbol absolute",
          style: {
            color: "var(--color-primary)",
            opacity: s.opacity,
            fontSize: `${s.fontSize}px`,
            // For reduced motion, statically scatter with percent-based positioning
            left: reducedMotion ? `${s.leftPct}%` : 0,
            top: reducedMotion ? `${s.topPct}%` : 0,
            transform: reducedMotion ? `translate3d(-50%, -50%, 0) rotate(${s.rotate}deg)` : void 0,
            whiteSpace: "pre"
          },
          children: s.text
        },
        i
      ))
    }
  );
}

function Hero({
  title,
  subtitle,
  ctaText = "Get started",
  ctaHref = "#",
  secondaryCtaText,
  secondaryCtaHref
}) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const badgeRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
    ).fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.6"
    ).fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.8"
    ).fromTo(
      buttonsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    );
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "home",
      ref: heroRef,
      className: "relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black selection:bg-blue-500/30",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-grid-dark z-0 pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-black z-0 pointer-events-none" }),
        /* @__PURE__ */ jsx(CodeRain, { className: "opacity-40 z-0" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: badgeRef,
              className: "inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]",
              children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "text-blue-400", size: 14 }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-blue-200 tracking-wide uppercase", children: "Digital Reality Architect" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "h1",
            {
              ref: titleRef,
              className: "heading-display text-6xl sm:text-7xl lg:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500",
              children: title
            }
          ),
          subtitle && /* @__PURE__ */ jsx(
            "p",
            {
              ref: subtitleRef,
              className: "mt-6 text-xl md:text-2xl leading-relaxed text-gray-400 max-w-3xl mx-auto font-light",
              children: subtitle
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: buttonsRef,
              className: "mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto",
              children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: ctaHref,
                    className: "btn px-8 py-4 text-lg w-full sm:w-auto justify-center group",
                    children: [
                      ctaText,
                      /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 transition-transform group-hover:translate-x-1", size: 20 })
                    ]
                  }
                ),
                secondaryCtaText && secondaryCtaHref && /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: secondaryCtaHref,
                    className: "btn-secondary px-8 py-4 text-lg w-full sm:w-auto justify-center",
                    children: secondaryCtaText
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500", children: /* @__PURE__ */ jsx(ChevronDown, { size: 24 }) })
      ]
    }
  );
}

function ServiceCard({ icon, title, description, features }) {
  return /* @__PURE__ */ jsxs("div", { className: "group relative glass-panel p-8 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -inset-px bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/10 text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]", children: icon }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed mb-6 font-light", children: description }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-3 border-t border-white/5 pt-6", children: features.map((feature, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-gray-300 group-hover:text-white transition-colors", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0 shadow-[0_0_5px_#3b82f6]" }),
        /* @__PURE__ */ jsx("span", { children: feature })
      ] }, idx)) })
    ] })
  ] });
}
function Services() {
  const services = [
    {
      icon: /* @__PURE__ */ jsx(Code, { size: 28 }),
      title: "Full-Stack Engineering",
      description: "Architecting scalable, high-performance applications using cutting-edge frameworks. I build robust digital infrastructure designed for growth.",
      features: [
        "Next.js & React Ecosystems",
        "Scalable Cloud Architecture",
        "API Design & Integration",
        "Complex State Management"
      ]
    },
    {
      icon: /* @__PURE__ */ jsx(Palette, { size: 28 }),
      title: "Premium UI/UX Design",
      description: "Crafting intuitive, aesthetic interfaces that captivate users. I merge behavioral psychology with visual design to drive engagement.",
      features: [
        "High-Fidelity Prototyping",
        "Design Systems & Tokens",
        "Micro-Interactions & Motion",
        "Accessibility (WCAG) First"
      ]
    },
    {
      icon: /* @__PURE__ */ jsx(Rocket, { size: 28 }),
      title: "Digital Product Launch",
      description: "Turning concepts into market-ready products. From MVP to full-scale deployment, I ensure a smooth trajectory for your digital assets.",
      features: [
        "Strategic MVP Development",
        "Marketing-Ready Landing Pages",
        "E-commerce Solutions",
        "Cross-Platform Compatibility"
      ]
    },
    {
      icon: /* @__PURE__ */ jsx(Zap, { size: 28 }),
      title: "Performance Engineering",
      description: "Obsessive optimization for lightning-fast load times. Speed is a feature, and I ensure your application delivers instantaneous responses.",
      features: [
        "Core Web Vitals Mastery",
        "Advanced Caching Strategies",
        "Bundle Size Optimization",
        "Server-Side Rendering (SSR)"
      ]
    },
    {
      icon: /* @__PURE__ */ jsx(Shield, { size: 28 }),
      title: "Security & Maintenance",
      description: "Fortifying your digital presence. Proactive monitoring and updates keep your business secure and running without interruption.",
      features: [
        "Automated Testing Pipelines",
        "Security Audits & Hardening",
        "Real-time Error Monitoring",
        "Continuous Integration (CI/CD)"
      ]
    },
    {
      icon: /* @__PURE__ */ jsx(LineChart, { size: 28 }),
      title: "Data-Driven Automation",
      description: "Leveraging data to streamline operations. I build custom tools that automate workflows and provide actionable business intelligence.",
      features: [
        "Custom Dashboards & Admin Panels",
        "Workflow Automation",
        "Data Visualization",
        "Third-Party API Integration"
      ]
    }
  ];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "services",
      className: "py-32 bg-black relative",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-20", children: [
            /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-medium tracking-wider uppercase text-sm mb-4 block", children: "Capabilities" }),
            /* @__PURE__ */ jsx("h2", { className: "heading-display text-4xl sm:text-5xl mb-6", children: "Engineering Digital Excellence" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light", children: "I provide a comprehensive suite of technical services designed to elevate your brand and streamline your operations." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: services.map((service, idx) => /* @__PURE__ */ jsx(
            ServiceCard,
            {
              icon: service.icon,
              title: service.title,
              description: service.description,
              features: service.features
            },
            idx
          )) })
        ] })
      ]
    }
  );
}

function CaseStudyModal({
  isOpen,
  onClose,
  caseStudy
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  if (!isOpen && !isAnimating) return null;
  if (!caseStudy) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `fixed inset-0 z-[60] flex items-center justify-center p-4 ${isAnimating && isOpen ? "overlay-enter" : "overlay-exit"}`,
      onClick: handleBackdropClick,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/90 backdrop-blur-md" }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `relative bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden ${isAnimating && isOpen ? "drawer-enter" : "drawer-exit"}`,
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleClose,
                  className: "absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors text-white shadow-lg border border-white/10",
                  "aria-label": "Close modal",
                  children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "overflow-y-auto max-h-[90vh] custom-scrollbar", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative w-full h-64 md:h-96 bg-gray-900", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: caseStudy.imageSrc,
                      alt: caseStudy.imageAlt,
                      className: "w-full h-full object-cover opacity-90"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-6 right-20 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-white border border-white/10", children: caseStudy.industry })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-12 -mt-12 relative z-10", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-blue-400 mb-3 tracking-widest uppercase", children: caseStudy.client }),
                    /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-bold text-white mb-4 leading-tight", children: caseStudy.title }),
                    caseStudy.websiteUrl && /* @__PURE__ */ jsxs(
                      "a",
                      {
                        href: caseStudy.websiteUrl,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2 text-sm font-medium border-b border-blue-400/30 hover:border-blue-400 pb-0.5",
                        children: [
                          caseStudy.websiteUrl.replace(/^https?:\/\//, ""),
                          /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 mb-12", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white mb-4 uppercase tracking-widest border-l-2 border-blue-500 pl-3", children: "The Challenge" }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed text-lg font-light", children: caseStudy.challenge })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white mb-4 uppercase tracking-widest border-l-2 border-green-500 pl-3", children: "The Solution" }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed text-lg font-light", children: caseStudy.solution })
                    ] })
                  ] }),
                  caseStudy.fullDescription && /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white mb-4 uppercase tracking-widest", children: "Deep Dive" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed text-lg font-light", children: caseStudy.fullDescription })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 border border-white/5 rounded-2xl p-8 mb-12 backdrop-blur-sm", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
                      /* @__PURE__ */ jsx(TrendingUp, { className: "text-green-400", size: 24 }),
                      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white uppercase tracking-widest", children: "Measurable Outcomes" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: caseStudy.results.map((result, idx) => /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500", children: result.value }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 font-medium uppercase tracking-wide", children: result.metric })
                    ] }, idx)) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white mb-4 uppercase tracking-widest", children: "Tech Stack" }),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: caseStudy.tags.map((tag, idx) => /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-full text-sm font-medium transition-colors",
                        children: tag
                      },
                      idx
                    )) })
                  ] })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}

function CaseStudyCard({
  client,
  industry,
  title,
  imageSrc,
  imageAlt,
  challenge,
  solution,
  results,
  tags,
  href = "#",
  onClick
}) {
  return /* @__PURE__ */ jsxs("article", { className: "group glass-panel overflow-hidden hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full hover:-translate-y-1", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden aspect-video bg-gray-900", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imageSrc,
          alt: imageAlt,
          className: "w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-sm font-medium text-gray-300", children: industry })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-8 flex flex-col flex-grow", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-blue-400 mb-2 tracking-wide uppercase", children: client }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors", children: title })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6 mb-8 flex-grow", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider", children: "Challenge" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed text-sm", children: challenge })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-5 mb-6 border border-white/5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(TrendingUp, { className: "text-blue-400", size: 16 }),
          /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-gray-300 uppercase tracking-wide", children: "Impact" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: results.map((result, idx) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-white mb-1", children: result.value }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: result.metric })
        ] }, idx)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-8", children: tags.map((tag, idx) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "px-3 py-1 bg-white/5 border border-white/10 text-gray-400 rounded-full text-xs font-medium",
          children: tag
        },
        idx
      )) }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick,
          className: "mt-auto inline-flex items-center gap-2 text-white font-medium hover:text-blue-400 hover:gap-4 transition-all cursor-pointer group/btn w-full justify-between border-t border-white/10 pt-6",
          children: [
            /* @__PURE__ */ jsx("span", { children: "Explore Case Study" }),
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 18, className: "transition-transform group-hover/btn:rotate-45" })
          ]
        }
      )
    ] })
  ] });
}
function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState(null);
  const caseStudies = [
    {
      client: "Element Cleaning Systems",
      industry: "Industrial Services",
      title: "Digital Transformation for Janitorial Leader",
      imageSrc: "/ecs-site.png",
      imageAlt: "Element Cleaning Systems Website",
      challenge: "A premier janitorial company lacked the digital footprint to compete for enterprise contracts, relying solely on word-of-mouth.",
      solution: "I engineered a high-performance, bilingual platform that positions ECS as a market leader, featuring automated quoting and regional mapping.",
      results: [
        { metric: "Quote Requests", value: "+340%" },
        { metric: "Contract Size", value: "+45%" },
        { metric: "SEO Rank", value: "#1" },
        { metric: "RFP Wins", value: "+28%" }
      ],
      tags: ["Next.js", "Tailwind", "Strapi", "Resend"],
      href: "#",
      websiteUrl: "https://elementjanitorial.com",
      fullDescription: "I designed and developed a fully responsive website. I implemented a bilingual content system supporting English and Spanish throughout the entire site, created dynamic service pages showcasing specialized cleaning programs."
    },
    {
      client: "GreenLeaf Organics",
      industry: "E-commerce",
      title: "Revolutionizing the Purchase Journey",
      imageSrc: "https://picsum.photos/seed/greenleaf/800/600",
      imageAlt: "GreenLeaf e-commerce storefront",
      challenge: "High traffic but low conversion rates plagued this organic retailer due to friction-heavy checkout flows.",
      solution: "A complete UX overhaul and Shopify Plus integration streamlined the path to purchase, resulting in record-breaking conversion metrics.",
      results: [
        { metric: "Conversion Rate", value: "+112%" },
        { metric: "Cart Abandonment", value: "-58%" },
        { metric: "Mobile Sales", value: "+145%" },
        { metric: "Revenue", value: "+89%" }
      ],
      tags: ["Shopify Plus", "React", "UX Research", "CRO"],
      href: "#",
      websiteUrl: "https://greenleaforganics.example.com",
      fullDescription: "Through extensive user testing and analytics review, I identified key friction points in the customer journey. My redesign focused on streamlining the checkout process from 5 steps to 2, improving product discovery, and creating a mobile-first experience that drives conversions."
    },
    {
      client: "HealthTrack Pro",
      industry: "HealthTech",
      title: "Next-Gen HIPAA Patient Portal",
      imageSrc: "https://picsum.photos/seed/healthtrack/800/600",
      imageAlt: "HealthTrack patient portal",
      challenge: "Balancing strict HIPAA compliance with a consumer-grade user experience for a growing healthcare provider.",
      solution: "I architected a secure, end-to-end encrypted portal that simplifies patient interaction without compromising on data sovereignty.",
      results: [
        { metric: "Adoption Rate", value: "85%" },
        { metric: "Security Audit", value: "A+" },
        { metric: "Support Load", value: "-72%" },
        { metric: "Efficiency", value: "15hrs/wk" }
      ],
      tags: ["React", "Node.js", "Encryption", "AWS"],
      href: "#",
      websiteUrl: "https://healthtrackpro.example.com",
      fullDescription: "Security and usability were paramount for this project. I implemented end-to-end encryption for all patient data, two-factor authentication, and comprehensive audit logging. The interface was designed to be intuitive for patients of all technical skill levels while providing healthcare providers with powerful tools for patient management."
    }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "case-studies", className: "py-32 bg-black relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-20", children: [
        /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-medium tracking-wider uppercase text-sm mb-4 block", children: "Selected Works" }),
        /* @__PURE__ */ jsx("h2", { className: "heading-display text-4xl sm:text-5xl mb-6", children: "Digital Breakthroughs" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light", children: "A curated collection of deployed solutions where technical prowess met business ambition." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8", children: caseStudies.slice(0, 2).map((study, idx) => /* @__PURE__ */ jsx(
        CaseStudyCard,
        {
          ...study,
          onClick: () => setSelectedCase(idx)
        },
        idx
      )) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1", children: caseStudies.slice(2).map((study, idx) => /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto w-full", children: /* @__PURE__ */ jsx(
        CaseStudyCard,
        {
          ...study,
          onClick: () => setSelectedCase(idx + 2)
        }
      ) }, idx)) })
    ] }),
    /* @__PURE__ */ jsx(
      CaseStudyModal,
      {
        isOpen: selectedCase !== null,
        onClose: () => setSelectedCase(null),
        caseStudy: selectedCase !== null ? caseStudies[selectedCase] : null
      }
    )
  ] });
}

function ProcessStep({
  number,
  icon,
  title,
  description,
  deliverables
}) {
  return /* @__PURE__ */ jsx("div", { className: "relative group", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 items-start", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center text-2xl font-bold shadow-[0_0_20px_rgba(59,130,246,0.4)] border border-blue-400/20 group-hover:scale-110 transition-transform duration-300", children: number }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-3 -right-3 w-10 h-10 rounded-xl bg-[#0F172A] border border-white/10 flex items-center justify-center text-blue-400 shadow-lg", children: icon })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 pt-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed mb-6 text-lg font-light", children: description }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-6 border border-white/5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-300 uppercase tracking-widest mb-4", children: "Key Deliverables" }),
        /* @__PURE__ */ jsx("ul", { className: "grid sm:grid-cols-2 gap-3", children: deliverables.map((item, idx) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: "flex items-center gap-3 text-sm text-gray-400",
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]" }),
              /* @__PURE__ */ jsx("span", { children: item })
            ]
          },
          idx
        )) })
      ] })
    ] })
  ] }) });
}
function Process() {
  const steps = [
    {
      number: "01",
      icon: /* @__PURE__ */ jsx(Search, { size: 20 }),
      title: "Strategic Discovery",
      description: "We begin by deconstructing your business goals. I conduct deep-dive research to uncover market opportunities and define the technical constraints, ensuring our roadmap aligns perfectly with your vision.",
      deliverables: [
        "Technical Specification",
        "Competitor Analysis",
        "Architecture Blueprint",
        "Project Roadmap"
      ]
    },
    {
      number: "02",
      icon: /* @__PURE__ */ jsx(Lightbulb, { size: 20 }),
      title: "UX/UI Architecture",
      description: "Merging form and function. I create interactive high-fidelity prototypes that establish the visual language and user journey, allowing us to validate concepts before a single line of code is written.",
      deliverables: [
        "Interactive Prototypes",
        "Design System",
        "User Flow Maps",
        "Accessibility Audit"
      ]
    },
    {
      number: "03",
      icon: /* @__PURE__ */ jsx(Code2, { size: 20 }),
      title: "Full-Stack Engineering",
      description: "The build phase. I develop your solution using scalable, modern frameworks. Every component is crafted for performance, security, and maintainability, with rigorous testing at every step.",
      deliverables: [
        "Production-Ready Code",
        "API Documentation",
        "Unit & Integration Tests",
        "Performance Report"
      ]
    },
    {
      number: "04",
      icon: /* @__PURE__ */ jsx(Rocket, { size: 20 }),
      title: "Deployment & Scale",
      description: "Launch is just the beginning. I handle the DevOps pipeline for a seamless release and set up monitoring tools to ensure your application scales effortlessly as your user base grows.",
      deliverables: [
        "CI/CD Pipeline",
        "Analytics Dashboard",
        "SEO Optimization",
        "Growth Strategy"
      ]
    }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "process", className: "py-32 bg-black relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-1/4 w-1/2 h-1/2 bg-blue-900/10 blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-24", children: [
        /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-medium tracking-wider uppercase text-sm mb-4 block", children: "Methodology" }),
        /* @__PURE__ */ jsx("h2", { className: "heading-display text-4xl sm:text-5xl mb-6", children: "The Blueprint for Success" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light", children: "A systematic approach to digital craftsmanship. I reduce risk and maximize value through a transparent, iterative process." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative space-y-24", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-10 top-10 bottom-10 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent hidden md:block" }),
        steps.map((step, idx) => /* @__PURE__ */ jsx(ProcessStep, { ...step }, idx))
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-32 text-center", children: /* @__PURE__ */ jsxs("div", { className: "glass-panel inline-block p-10 md:p-16 max-w-4xl mx-auto relative overflow-hidden group", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-white mb-6 relative z-10", children: "Ready to Disrupt Your Industry?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8 max-w-lg mx-auto text-lg font-light relative z-10", children: "Let's collaborate to build something that sets new standards." }),
        /* @__PURE__ */ jsx("a", { href: "#contact", className: "btn px-10 py-4 text-lg relative z-10", children: "Start the Conversation" })
      ] }) })
    ] })
  ] });
}

function ValueCard({ icon, title, description }) {
  return /* @__PURE__ */ jsxs("div", { className: "text-center group p-6 rounded-2xl hover:bg-white/5 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]", children: icon }),
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed font-light text-sm", children: description })
  ] });
}
function About() {
  const values = [
    {
      icon: /* @__PURE__ */ jsx(Target, { size: 28 }),
      title: "Strategic Precision",
      description: "I don't just write code; I engineer outcomes. Every decision is calculated to maximize your ROI and technical scalability."
    },
    {
      icon: /* @__PURE__ */ jsx(Users, { size: 28 }),
      title: "Radical Transparency",
      description: "You are never in the dark. I operate as an extension of your team, providing clear updates and collaborative decision-making."
    },
    {
      icon: /* @__PURE__ */ jsx(Award, { size: 28 }),
      title: "Engineering Excellence",
      description: "Compromise is not in my vocabulary. I adhere to strict coding standards to ensure your product is robust, secure, and scalable."
    },
    {
      icon: /* @__PURE__ */ jsx(Heart, { size: 28 }),
      title: "Human-Centric Design",
      description: "Technology serves people. I craft experiences that are intuitive, accessible, and delightful, turning users into advocates."
    }
  ];
  const stats = [
    { value: "50+", label: "Projects Deployed" },
    { value: "30+", label: "Global Partners" },
    { value: "5+", label: "Years Innovation" },
    { value: "98%", label: "Retention Rate" }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "about", className: "py-32 bg-black relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-medium tracking-wider uppercase text-sm mb-4 block", children: "The Vision" }),
          /* @__PURE__ */ jsx("h2", { className: "heading-display text-4xl sm:text-5xl mb-6", children: "Architecting the Digital Frontier" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-lg text-gray-400 leading-relaxed font-light", children: [
            /* @__PURE__ */ jsx("p", { children: "I am a digital product architect obsessed with the intersection of design and engineering. What began as a pursuit of perfect code has evolved into a holistic practice of building digital ecosystems that thrive." }),
            /* @__PURE__ */ jsx("p", { children: "I partner with visionaries—from agile startups to established enterprises—to translate complex requirements into elegant, high-performance solutions. My work is not just about shipping features; it's about creating competitive advantages." }),
            /* @__PURE__ */ jsx("p", { children: "Leveraging the bleeding edge of web technology (React, Astro, Serverless), I build applications that are fast, secure, and ready for the future. But ultimately, technology is the means; your success is the end." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "glass-panel rounded-3xl p-12 border border-white/10 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-8 gap-y-12 relative z-10", children: stats.map((stat, idx) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400", children: stat.value }),
            /* @__PURE__ */ jsx("div", { className: "text-blue-400 text-sm font-medium uppercase tracking-widest", children: stat.label })
          ] }, idx)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-white mb-4", children: "Core Philosophy" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto font-light", children: "The principles that govern my work and ensure delivery excellence." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: values.map((value, idx) => /* @__PURE__ */ jsx(ValueCard, { ...value }, idx)) })
      ] })
    ] })
  ] });
}

const MAX_MESSAGE = 2e3;
function sanitizeInline(value) {
  return String(value ?? "").replace(/[<>"'`]/g, "").replace(/\u00A0/g, " ").replace(/\s+/g, " ").trim();
}
function sanitizeEmail(value) {
  return sanitizeInline(value).toLowerCase();
}
function sanitizeMultiline(value) {
  return String(value ?? "").replace(/[<>"'`]/g, "").replace(/\t/g, " ").replace(/\u00A0/g, " ").replace(/\r/g, "").replace(/[ ]{2,}/g, " ").trim();
}
function Contact() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, dirtyFields },
    watch
  } = useForm({
    mode: "onChange",
    // validate on change for real-time feedback
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      message: ""
    }
  });
  const messageValue = watch("message") ?? "";
  const messageLen = messageValue.length;
  const onSubmit = async (data) => {
    try {
      setStatus("");
      setStatusType("");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          ...data
        })
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setStatus(result?.message || "Something went wrong. Please try again later.");
        setStatusType("error");
        return;
      }
      if (result.success) {
        setStatus(result.message || "Thank you! I've received your inquiry and will get back to you within 24 hours.");
        setStatusType("success");
        reset();
      } else {
        setStatus("Something went wrong. Please try again later.");
        setStatusType("error");
        console.error("Contact submission error:", result);
      }
    } catch (error) {
      setStatus("Something went wrong. Please check your connection and try again.");
      setStatusType("error");
      console.error("Submission Error:", error);
    }
  };
  const showNameError = !!dirtyFields.name && !!errors.name;
  const showEmailError = !!dirtyFields.email && !!errors.email;
  const showCompanyError = !!dirtyFields.company && !!errors.company;
  const showMessageError = !!dirtyFields.message && !!errors.message;
  const inputClasses = "mt-2 w-full rounded-lg border border-white/10 bg-white/5 p-4 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-1 focus:ring-blue-500 transition-all duration-300";
  const labelClasses = "block text-sm font-medium text-gray-300 uppercase tracking-wide";
  return /* @__PURE__ */ jsxs("section", { id: "contact", className: "relative py-32 bg-black overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-grid-dark opacity-20 pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center relative z-10", children: [
      /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-medium tracking-wider uppercase text-sm mb-4 block", children: "Get In Touch" }),
      /* @__PURE__ */ jsx("h2", { className: "heading-display text-4xl sm:text-5xl", children: "Initiate Collaboration" }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-xl leading-relaxed text-gray-400 font-light", children: "Ready to engineer your future? Tell me about your vision, and I'll help you build the roadmap." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10", children: /* @__PURE__ */ jsx("div", { className: "glass-panel p-8 sm:p-12 border border-white/10 backdrop-blur-xl shadow-2xl", children: /* @__PURE__ */ jsxs("form", { noValidate: true, onSubmit: handleSubmit(onSubmit), className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "name", className: labelClasses, children: [
            "Name ",
            /* @__PURE__ */ jsx("span", { className: "text-blue-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "name",
              type: "text",
              autoComplete: "name",
              className: inputClasses,
              placeholder: "John Doe",
              ...register("name", {
                setValueAs: sanitizeInline,
                required: "Required",
                minLength: { value: 2, message: "Too short" }
              })
            }
          ),
          showNameError && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-red-400 font-medium", children: errors.name?.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "email", className: labelClasses, children: [
            "Work Email ",
            /* @__PURE__ */ jsx("span", { className: "text-blue-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "email",
              type: "email",
              autoComplete: "email",
              className: inputClasses,
              placeholder: "john@company.com",
              ...register("email", {
                setValueAs: sanitizeEmail,
                required: "Required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "Invalid email" }
              })
            }
          ),
          showEmailError && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-red-400 font-medium", children: errors.email?.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: "company", className: labelClasses, children: [
          "Company ",
          /* @__PURE__ */ jsx("span", { className: "text-blue-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "company",
            type: "text",
            autoComplete: "organization",
            className: inputClasses,
            placeholder: "Your Organization",
            ...register("company", {
              setValueAs: sanitizeInline,
              required: "Required"
            })
          }
        ),
        showCompanyError && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-red-400 font-medium", children: errors.company?.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "projectType", className: labelClasses, children: "Project Type" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "projectType",
              className: `${inputClasses} appearance-none`,
              ...register("projectType"),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", className: "text-gray-500 bg-[#0F172A]", children: "Select type" }),
                /* @__PURE__ */ jsx("option", { value: "web-app", className: "text-white bg-[#0F172A]", children: "Web Application" }),
                /* @__PURE__ */ jsx("option", { value: "ecommerce", className: "text-white bg-[#0F172A]", children: "E-commerce" }),
                /* @__PURE__ */ jsx("option", { value: "website", className: "text-white bg-[#0F172A]", children: "Website / Landing Page" }),
                /* @__PURE__ */ jsx("option", { value: "redesign", className: "text-white bg-[#0F172A]", children: "Redesign / Optimization" }),
                /* @__PURE__ */ jsx("option", { value: "maintenance", className: "text-white bg-[#0F172A]", children: "Maintenance / Support" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "budget", className: labelClasses, children: "Budget Range" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "budget",
              className: `${inputClasses} appearance-none`,
              ...register("budget"),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", className: "text-gray-500 bg-[#0F172A]", children: "Select budget" }),
                /* @__PURE__ */ jsx("option", { value: "5k-10k", className: "text-white bg-[#0F172A]", children: "$5K - $10K" }),
                /* @__PURE__ */ jsx("option", { value: "10k-25k", className: "text-white bg-[#0F172A]", children: "$10K - $25K" }),
                /* @__PURE__ */ jsx("option", { value: "25k-50k", className: "text-white bg-[#0F172A]", children: "$25K - $50K" }),
                /* @__PURE__ */ jsx("option", { value: "50k+", className: "text-white bg-[#0F172A]", children: "$50K+" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between mb-2", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "message", className: labelClasses, children: [
            "Message ",
            /* @__PURE__ */ jsx("span", { className: "text-blue-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
            messageLen,
            "/",
            MAX_MESSAGE
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "message",
            rows: 6,
            className: inputClasses,
            placeholder: "Tell me about your project, goals, timeline, and any specific requirements...",
            maxLength: MAX_MESSAGE,
            ...register("message", {
              setValueAs: sanitizeMultiline,
              required: "Required",
              minLength: { value: 20, message: "Too short" }
            })
          }
        ),
        showMessageError && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-red-400 font-medium", children: errors.message?.message })
      ] }),
      status && /* @__PURE__ */ jsx(
        "div",
        {
          role: "status",
          "aria-live": "polite",
          className: `rounded-lg px-4 py-3 text-sm border ${statusType === "error" ? "border-red-500/20 bg-red-500/10 text-red-400" : "border-green-500/20 bg-green-500/10 text-green-400"}`,
          children: status
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-white/5", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "text-sm text-gray-500 hover:text-gray-300 transition-colors",
            onClick: () => {
              reset();
              setStatus("");
              setStatusType("");
            },
            children: "Reset Form"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "btn px-8 py-4 text-lg w-full sm:w-auto shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] disabled:opacity-50 disabled:cursor-not-allowed",
            disabled: isSubmitting,
            children: isSubmitting ? "Transmitting..." : "Send Message"
          }
        )
      ] })
    ] }) }) })
  ] });
}

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Kevin | Full-Stack Freelancer & Web Developer</title>${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/kevs/code/2026/src/components/Navbar", "client:component-export": "default" })} ${renderComponent($$result, "Hero", Hero, { "title": "Architecting the Digital Future", "subtitle": "I craft immersive web experiences that merge technical precision with award-winning aesthetics. Elevate your brand with next-generation digital solutions.", "ctaText": "Initiate Project", "ctaHref": "#contact", "secondaryCtaText": "Explore Work", "secondaryCtaHref": "#case-studies", "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/kevs/code/2026/src/components/Hero", "client:component-export": "default" })} ${renderComponent($$result, "Services", Services, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/kevs/code/2026/src/components/Services", "client:component-export": "default" })} ${renderComponent($$result, "CaseStudies", CaseStudies, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/kevs/code/2026/src/components/CaseStudies", "client:component-export": "default" })} ${renderComponent($$result, "Process", Process, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/kevs/code/2026/src/components/Process", "client:component-export": "default" })} ${renderComponent($$result, "About", About, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/kevs/code/2026/src/components/About", "client:component-export": "default" })} ${renderComponent($$result, "Contact", Contact, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/kevs/code/2026/src/components/Contact", "client:component-export": "default" })} </body></html>`;
}, "/Users/kevs/code/2026/src/pages/index.astro", void 0);

const $$file = "/Users/kevs/code/2026/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
