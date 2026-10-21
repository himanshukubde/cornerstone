"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Globe,
  Menu,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CornerstoneLogo } from "@/components/ui/cornerstone-logo";
import "@/app/header.css";

// Capabilities Accordion & Featured Content
const capabilitiesSections = {
  service: {
    key: "service",
    title: "By Service",
    links: [
      "Strategy & Operational Performance",
      "Finance & Accounting",
      "Digital, Tech, & Data",
      "Governance, Risk & Compliance",
    ],
    featured: {
      img: "https://rgp.com/wp-content/uploads/2025/07/nav_Capabilities-Overview.jpg",
      title: "Powering Progress with Hands-On Precision",
      blurb:
        "From strategy and finance to tech, risk, and operations, Cornerstone brings the expertise modern businesses need to stay ahead. Our teams combine experience and agility to help streamline processes, lead change, and deliver real results.",
      btnText: "EXPLORE SERVICES",
      btnHref: "#capabilities",
    },
  },
  industry: {
    key: "industry",
    title: "By Industry",
    links: [
      "Healthcare",
      "Financial Services",
      "Public Sector",
      "Private Equity",
      "CPG & Retail",
      "Technology",
    ],
    featured: {
      img: "https://rgp.com/wp-content/uploads/2025/07/nav_Industry-Overview.jpg",
      title: "Major Impact Across Sectors That Matter",
      blurb:
        "Every industry has its own challenges—and we’re built to meet them. See how Cornerstone helps leading organizations in healthcare, financial services, retail, government, and tech stay ahead.",
      btnText: "EXPLORE INDUSTRIES",
      btnHref: "#capabilities",
    },
  },
  csuite: {
    key: "csuite",
    title: "By Role",
    links: [
      "CFO and Finance Leaders",
      "CHRO and Employee Experience Leaders",
      "COO and Operations Leaders",
      "CRO and Risk Leaders",
      "CIO, CTO and Technology Leaders",
    ],
    featured: {
      img: "https://rgp.com/wp-content/uploads/2025/07/nav_CSuite-Overview.jpg",
      title: "Big Decisions, Backed by Experience",
      blurb:
        "C-suite leaders need partners they trust to execute. Cornerstone supports CFOs, COOs, CIOs, CHROs, and CROs with hands-on expertise and strategic insight. From transformation to risk, we deliver clarity and confidence.",
      btnText: "EXPLORE C-SUITE STRATEGIES",
      btnHref: "#capabilities",
    },
  },
  technology: {
    key: "technology",
    title: "By Technology",
    links: [
      "ServiceNow",
      "SAP",
      "Workday",
      "Oracle NetSuite",
      "BlackLine",
    ],
    featured: {
      img: "https://rgp.com/wp-content/uploads/2025/07/nav_Technology-Overview.jpg",
      title: "Powerful Platforms, Activated by People",
      blurb:
        "The right tech is only half the equation. Learn how Cornerstone partners with leading platforms to drive real results—with people who know how to make it all click.",
      btnText: "EXPLORE TECHNOLOGIES",
      btnHref: "#capabilities",
    },
  },
};

type CapSectionKey = keyof typeof capabilitiesSections;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeCapSection, setActiveCapSection] = useState<CapSectionKey>("service");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const currentCap = capabilitiesSections[activeCapSection] || capabilitiesSections.service;

  return (
    <>
      <div ref={headerRef}>
        <header
          className={`rgp-site-header-container ${
            scrolled ? "is-scrolled" : ""
          }`}
        >
          <div className="rgp-header-inner">
            {/* Cornerstone Logo - compact 22px height matching RGP */}
            <Link href="/" className="rgp-brand-logo" aria-label="Cornerstone Home">
              <CornerstoneLogo variant="dark" height={22} />
            </Link>

            {/* Desktop Navigation - Click to open */}
            <nav aria-label="Main Navigation">
              <ul className="rgp-primary-nav">
                {/* 1. Perspectives */}
                <li className="rgp-nav-item">
                  <a href="#what-we-do" className="rgp-nav-btn">
                    Perspectives
                  </a>
                </li>

                {/* 2. Capabilities (Click to toggle) */}
                <li className="rgp-nav-item">
                  <button
                    type="button"
                    className={`rgp-nav-btn ${
                      openMenu === "capabilities" ? "is-active" : ""
                    }`}
                    onClick={() => toggleMenu("capabilities")}
                  >
                    Capabilities
                    {openMenu === "capabilities" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>
                </li>

                {/* 3. Work */}
                <li className="rgp-nav-item">
                  <a href="#what-we-do" className="rgp-nav-btn">
                    Work
                  </a>
                </li>

                {/* 4. Events */}
                <li className="rgp-nav-item">
                  <a href="#what-we-do" className="rgp-nav-btn">
                    Events
                  </a>
                </li>

                {/* 5. About (Click to toggle) */}
                <li className="rgp-nav-item">
                  <button
                    type="button"
                    className={`rgp-nav-btn ${
                      openMenu === "about" ? "is-active" : ""
                    }`}
                    onClick={() => toggleMenu("about")}
                  >
                    About
                    {openMenu === "about" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>
                </li>

                {/* 6. Investors (Click to toggle) */}
                <li className="rgp-nav-item">
                  <button
                    type="button"
                    className={`rgp-nav-btn ${
                      openMenu === "investors" ? "is-active" : ""
                    }`}
                    onClick={() => toggleMenu("investors")}
                  >
                    Investors
                    {openMenu === "investors" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>
                </li>

                {/* 7. Careers (Click to toggle) */}
                <li className="rgp-nav-item">
                  <button
                    type="button"
                    className={`rgp-nav-btn ${
                      openMenu === "careers" ? "is-active" : ""
                    }`}
                    onClick={() => toggleMenu("careers")}
                  >
                    Careers
                    {openMenu === "careers" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>
                </li>

                {/* 8. Search Icon */}
                <li className="rgp-nav-item">
                  <button
                    type="button"
                    className="rgp-icon-btn"
                    onClick={() => setSearchOpen(true)}
                    aria-label="Search"
                  >
                    <Search size={18} strokeWidth={1.8} />
                  </button>
                </li>

                {/* 9. Regions Globe (Click to toggle) */}
                <li className="rgp-nav-item">
                  <button
                    type="button"
                    className={`rgp-nav-btn ${
                      openMenu === "regions" ? "is-active" : ""
                    }`}
                    onClick={() => toggleMenu("regions")}
                    aria-label="Regions"
                  >
                    <Globe size={18} />
                    {openMenu === "regions" ? (
                      <ChevronUp size={13} />
                    ) : (
                      <ChevronDown size={13} />
                    )}
                  </button>
                </li>

                {/* 10. Contact Button */}
                <li className="rgp-nav-item">
                  <a href="#contact" className="rgp-contact-button">
                    CONTACT
                  </a>
                </li>
              </ul>
            </nav>

            {/* Mobile hamburger */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                type="button"
                className="p-2 text-gray-700"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                type="button"
                className="p-2 text-gray-700"
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CAPABILITIES MEGA-MENU (Exact replica of user screenshot) */}
          {/* ======================================================== */}
          {openMenu === "capabilities" && (
            <div className="rgp-mega-panel">
              <div className="rgp-mega-inner">
                {/* [X] Close button */}
                <button
                  type="button"
                  className="rgp-mega-close-btn"
                  onClick={() => setOpenMenu(null)}
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>

                {/* Eyebrow */}
                <span className="rgp-mega-eyebrow">CAPABILITIES</span>

                {/* Two Column Layout */}
                <div className="rgp-mega-columns">
                  {/* Left Column: Accordions */}
                  <div className="rgp-accordion-col">
                    {(Object.keys(capabilitiesSections) as CapSectionKey[]).map(
                      (secKey) => {
                        const sec = capabilitiesSections[secKey];
                        const isOpen = activeCapSection === secKey;
                        return (
                          <div key={secKey} className="rgp-accordion-item">
                            <button
                              type="button"
                              className={`rgp-accordion-header ${
                                isOpen ? "is-open" : ""
                              }`}
                              onClick={() => {
                                setActiveCapSection(secKey);
                              }}
                            >
                              <span>{sec.title}</span>
                              {isOpen ? (
                                <ChevronUp size={20} />
                              ) : (
                                <ChevronDown size={20} />
                              )}
                            </button>

                            {/* Indented Submenu */}
                            {isOpen && (
                              <div className="rgp-accordion-body">
                                {sec.links.map((linkText) => (
                                  <a
                                    key={linkText}
                                    href="#what-we-do"
                                    onClick={() => setOpenMenu(null)}
                                    className="rgp-accordion-link"
                                  >
                                    <span>{linkText}</span>
                                    <ArrowRight size={16} />
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* Right Column: Featured Section */}
                  <div className="rgp-featured-col">
                    <img
                      src={currentCap.featured.img}
                      alt={currentCap.featured.title}
                      className="rgp-featured-img"
                    />
                    <h3 className="rgp-featured-title">
                      {currentCap.featured.title}
                    </h3>
                    <p className="rgp-featured-desc">
                      {currentCap.featured.blurb}
                    </p>
                    <a
                      href={currentCap.featured.btnHref}
                      onClick={() => setOpenMenu(null)}
                      className="rgp-featured-btn"
                    >
                      {currentCap.featured.btnText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ABOUT MEGA-MENU */}
          {/* ======================================================== */}
          {openMenu === "about" && (
            <div className="rgp-mega-panel">
              <div className="rgp-mega-inner">
                <button
                  type="button"
                  className="rgp-mega-close-btn"
                  onClick={() => setOpenMenu(null)}
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
                <span className="rgp-mega-eyebrow">ABOUT</span>
                <div className="rgp-mega-columns">
                  <div className="rgp-accordion-col">
                    <div className="rgp-accordion-item">
                      <div className="rgp-accordion-header is-open">
                        <span>Our Company</span>
                      </div>
                      <div className="rgp-accordion-body">
                        {["About Us", "Why Cornerstone", "Leadership", "Success Stories"].map((item) => (
                          <a
                            key={item}
                            href="#what-we-do"
                            onClick={() => setOpenMenu(null)}
                            className="rgp-accordion-link"
                          >
                            <span>{item}</span>
                            <ArrowRight size={16} />
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="rgp-accordion-item">
                      <div className="rgp-accordion-header">
                        <span>Corporate Social Responsibility</span>
                      </div>
                    </div>
                    <div className="rgp-accordion-item">
                      <div className="rgp-accordion-header">
                        <span>Newsroom &amp; Press</span>
                      </div>
                    </div>
                  </div>
                  <div className="rgp-featured-col">
                    <img
                      src="https://rgp.com/wp-content/uploads/2025/07/menu-why-RGP.jpg"
                      alt="Why Cornerstone"
                      className="rgp-featured-img"
                    />
                    <h3 className="rgp-featured-title">
                      Built for the Pace of Real Business
                    </h3>
                    <p className="rgp-featured-desc">
                      Senior expertise, flexible talent, and a people-first approach. Explore why Fortune 100s keep coming back for more.
                    </p>
                    <a
                      href="#what-we-do"
                      onClick={() => setOpenMenu(null)}
                      className="rgp-featured-btn"
                    >
                      WHY CORNERSTONE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* INVESTORS MEGA-MENU */}
          {/* ======================================================== */}
          {openMenu === "investors" && (
            <div className="rgp-mega-panel">
              <div className="rgp-mega-inner">
                <button
                  type="button"
                  className="rgp-mega-close-btn"
                  onClick={() => setOpenMenu(null)}
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
                <span className="rgp-mega-eyebrow">INVESTORS</span>
                <div className="rgp-mega-columns">
                  <div className="rgp-accordion-col">
                    <div className="rgp-accordion-item">
                      <div className="rgp-accordion-header is-open">
                        <span>Investor Hub</span>
                      </div>
                      <div className="rgp-accordion-body">
                        {["Corporate Profile", "Board of Directors", "Corporate Sustainability", "Investor Contact"].map((item) => (
                          <a
                            key={item}
                            href="#what-we-do"
                            onClick={() => setOpenMenu(null)}
                            className="rgp-accordion-link"
                          >
                            <span>{item}</span>
                            <ArrowRight size={16} />
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="rgp-accordion-item">
                      <div className="rgp-accordion-header">
                        <span>Financials &amp; Filings</span>
                      </div>
                    </div>
                  </div>
                  <div className="rgp-featured-col">
                    <img
                      src="https://rgp.com/wp-content/uploads/2025/07/menu-corp-profile.jpg"
                      alt="Investor Relations"
                      className="rgp-featured-img"
                    />
                    <h3 className="rgp-featured-title">
                      Invested in a Future Without Limits
                    </h3>
                    <p className="rgp-featured-desc">
                      Delivering sustainable value, capital agility, and operational excellence across global markets.
                    </p>
                    <a
                      href="#what-we-do"
                      onClick={() => setOpenMenu(null)}
                      className="rgp-featured-btn"
                    >
                      VIEW INVESTOR RELATIONS
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* CAREERS MEGA-MENU */}
          {/* ======================================================== */}
          {openMenu === "careers" && (
            <div className="rgp-mega-panel">
              <div className="rgp-mega-inner">
                <button
                  type="button"
                  className="rgp-mega-close-btn"
                  onClick={() => setOpenMenu(null)}
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
                <span className="rgp-mega-eyebrow">CAREERS</span>
                <div className="rgp-mega-columns">
                  <div className="rgp-accordion-col">
                    <div className="rgp-accordion-item">
                      <div className="rgp-accordion-header is-open">
                        <span>Opportunities</span>
                      </div>
                      <div className="rgp-accordion-body">
                        {[
                          "Careers at Cornerstone",
                          "Open Roles",
                          "Dare to Work Differently",
                          "Grow Your Career",
                          "Belong Here",
                          "Support & FAQs",
                        ].map((item) => (
                          <a
                            key={item}
                            href="#what-we-do"
                            onClick={() => setOpenMenu(null)}
                            className="rgp-accordion-link"
                          >
                            <span>{item}</span>
                            <ArrowRight size={16} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="rgp-featured-col">
                    <img
                      src="https://rgp.com/wp-content/uploads/2025/07/menu-careers.jpg"
                      alt="Careers at Cornerstone"
                      className="rgp-featured-img"
                    />
                    <h3 className="rgp-featured-title">
                      Redefine What&apos;s Possible.
                    </h3>
                    <p className="rgp-featured-desc">
                      From strategy and finance to tech, risk, and operations, Cornerstone puts experienced people at the center of transformation.
                    </p>
                    <a
                      href="#what-we-do"
                      onClick={() => setOpenMenu(null)}
                      className="rgp-featured-btn"
                    >
                      EXPLORE OPEN ROLES
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* REGIONS DROPDOWN */}
          {/* ======================================================== */}
          {openMenu === "regions" && (
            <div className="rgp-regions-panel">
              {["North America", "Europe", "Asia Pacific", "Latin America"].map(
                (region) => (
                  <a
                    key={region}
                    href="#what-we-do"
                    onClick={() => setOpenMenu(null)}
                    className="rgp-regions-item"
                  >
                    {region}
                  </a>
                )
              )}
            </div>
          )}
        </header>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 bg-[#0A0E1A]/85 backdrop-blur-md z-[2000] flex items-start justify-center pt-24 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white w-full max-w-2xl p-8 rounded-none shadow-2xl relative">
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={22} />
              </button>
              <span className="eyebrow" style={{ color: "#1A237E" }}>Search</span>
              <div className="relative mt-2">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full pl-12 pr-4 py-3.5 text-base border border-gray-300 focus:border-[#1A237E] focus:outline-none"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-[2050] flex flex-col p-6 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <CornerstoneLogo variant="dark" height={22} />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close"
                className="p-2"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col py-6 gap-2">
              {[
                ["Perspectives", "#what-we-do"],
                ["Capabilities", "#capabilities"],
                ["Work", "#what-we-do"],
                ["Events", "#what-we-do"],
                ["About", "#what-we-do"],
                ["Investors", "#what-we-do"],
                ["Careers", "#what-we-do"],
                ["Regions", "#what-we-do"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-lg font-bold py-3 border-b border-gray-100 flex items-center justify-between text-gray-900 hover:text-[#1A237E]"
                >
                  {label}
                  <ArrowRight size={18} />
                </a>
              ))}
            </nav>
            <div className="mt-auto pt-6">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full bg-[#1A237E] text-white py-3.5 font-heading font-bold uppercase tracking-widest text-center block"
              >
                CONTACT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand-block">
          <CornerstoneLogo variant="light" height={24} />
          <p>
            Global consulting and project execution for business transformation.
          </p>
          <a href="#contact" className="footer-contact">
            Start a conversation <ArrowRight size={15} />
          </a>
        </div>
        <div className="footer-column">
          <span>Company</span>
          <a href="#what-we-do">About Cornerstone</a>
          <a href="#what-we-do">Why Cornerstone</a>
          <a href="#what-we-do">Leadership</a>
          <a href="#what-we-do">Newsroom</a>
        </div>
        <div className="footer-column">
          <span>Solutions</span>
          <a href="#capabilities">Capabilities</a>
          <a href="#what-we-do">C-Suite Strategies</a>
          <a href="#what-we-do">Industries</a>
          <a href="#what-we-do">Technologies</a>
        </div>
        <div className="footer-column">
          <span>Connect</span>
          <a href="#what-we-do">Careers</a>
          <a href="#contact">Contact</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 1996–2026 Cornerstone Resources, Inc.</span>
        <div>
          <a href="#what-we-do">Privacy Policy</a>
          <a href="#what-we-do">Cookie Policy</a>
          <a href="#what-we-do">Terms of Use</a>
        </div>
        <span>NYSE: CNST</span>
      </div>
    </footer>
  );
}
