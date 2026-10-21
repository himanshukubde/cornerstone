"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CornerstoneLogo } from "@/components/ui/cornerstone-logo";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

const slides = [
  {
    category: "Research",
    title: "The Human Value Gap in M&A",
    subtitle: "Why Culture and Talent Drive Deal Value",
    action: "Read Now",
    href: "#what-we-do",
    image: "https://rgp.com/wp-content/uploads/2026/08/ma_main_carousel.jpg",
  },
  {
    category: "Research",
    title: "Foundational Divide",
    subtitle: "From AI Ambition to AI Readiness",
    action: "Explore the Research",
    href: "#what-we-do",
    image: "https://rgp.com/wp-content/uploads/2025/12/From-AI-Ambition-to-AI-Readiness.jpg",
  },
  {
    category: "Solutions",
    title: "Cornerstone Streamline 360™",
    subtitle: "Modernize your finance function with confidence.",
    action: "Discover Streamline 360",
    href: "#capabilities",
    image: "https://rgp.com/wp-content/uploads/2026/08/streamline360.jpg",
  },
  {
    category: "Visionary Voices",
    title: "Shape the Future of Finance 4.0",
    subtitle: "The people and ideas reshaping finance.",
    action: "Watch Now",
    href: "#what-we-do",
    image: "https://rgp.com/wp-content/uploads/2025/09/Finance-4.0-RGP-Home-Carousel.jpg",
  },
  {
    category: "Research",
    title: "Compliance Without Compromise",
    subtitle: "How Finance 4.0 orchestrates enterprise transformation.",
    action: "Read Report",
    href: "#what-we-do",
    image: "https://rgp.com/wp-content/uploads/2025/09/Finance-4.0-RGP-Home-Carousel.jpg",
  },
  {
    category: "Solutions",
    title: "From Gatekeeper to Architect",
    subtitle: "Empowering talent to drive operational excellence.",
    action: "Hire Top Talent",
    href: "#what-we-do",
    image: "https://rgp.com/wp-content/uploads/2025/09/Tax-RGP-Home-Carousel-copy.jpg",
  },
  {
    category: "Visionary Voices",
    title: "The Speed of Change",
    subtitle: "AI Strategy Timelines are Measured in Months, Not Years",
    action: "Join the Conversation",
    href: "#what-we-do",
    image: "https://rgp.com/wp-content/uploads/2025/09/Elons-VV-RGP-Home-Carousel.jpg",
  },
];

const capabilities = [
  {
    label: "Capabilities",
    image: "https://rgp.com/wp-content/uploads/2025/07/homepage-csuite-strategies-1.jpg",
    href: "#capabilities",
  },
  {
    label: "C-Suite Strategies",
    image: "https://rgp.com/wp-content/uploads/2025/07/homepage-csuite-strategies-2.jpg",
    href: "#capabilities",
  },
  {
    label: "Industries",
    image: "https://rgp.com/wp-content/uploads/2025/07/homepage-csuite-strategies-3.jpg",
    href: "#capabilities",
  },
  {
    label: "Technologies",
    image: "https://rgp.com/wp-content/uploads/2025/07/homepage-csuite-strategies-4.jpg",
    href: "#capabilities",
  },
];

const news = [
  {
    category: "Press",
    title:
      "Cornerstone Study: 66% of Professionals Expect AI to Perform Most of Their Current Tasks Within Five Years, Yet Just 3% Feel Replaceable",
    date: "September 2026",
    href: "#what-we-do",
    image: "https://rgp.com/wp-content/uploads/2025/12/From-AI-Ambition-to-AI-Readiness.jpg",
  },
  {
    category: "Press",
    title:
      "Cornerstone Reports Financial Results for First Quarter Fiscal Year 2027",
    date: "October 2026",
    href: "#what-we-do",
    image: "https://rgp.com/wp-content/uploads/2026/08/streamline360.jpg",
  },
  {
    category: "Press",
    title:
      "Cornerstone to Announce First Quarter Fiscal 2027 Results on October 7, 2026",
    date: "September 2026",
    href: "#what-we-do",
    image: "https://rgp.com/wp-content/uploads/2025/09/Finance-4.0-RGP-Home-Carousel.jpg",
  },
];

const stats = [
  {
    label: "GO-TO CHOICE",
    value: "90%",
    detail: "Fortune 100 Served & 70% of the Fortune 500 Served Worldwide",
  },
  {
    label: "GLOBAL REACH",
    value: "1,500+",
    detail: "Clients Across 4 Regions, 37+ Countries & 17 Industries",
  },
  {
    label: "AWARD-WINNING",
    value: "Forbes",
    detail: "Recognized as World’s Best Management Consulting Firms",
  },
  {
    label: "ENGAGEMENTS",
    value: "340K+",
    detail: "Projects Completed by 2,600+ Senior Consultants Globally",
  },
];

function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % slides.length),
      6500
    );
    return () => window.clearInterval(timer);
  }, []);

  const changeSlide = (direction: number) =>
    setActive((index) => (index + direction + slides.length) % slides.length);

  return (
    <section className="hero" id="top" aria-label="Featured stories">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="hero-image"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8, 14, 28, .84) 0%, rgba(8, 14, 28, .5) 45%, rgba(8, 14, 28, .08) 100%), linear-gradient(0deg, rgba(8, 12, 22, .4), transparent 45%), url("${slides[active].image}")`,
          }}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        />
      </AnimatePresence>
      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={`copy-${active}`}
            className="hero-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <span className="eyebrow hero-eyebrow">
              {slides[active].category}
            </span>
            <h1>{slides[active].title}</h1>
            <p>{slides[active].subtitle}</p>
            <a
              className={buttonVariants({ variant: "primary", size: "lg" })}
              href={slides[active].href}
            >
              {slides[active].action}
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </AnimatePresence>
        <div className="hero-bottom">
          <div className="slide-pager" aria-label="Choose featured story">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                className={`slide-dot ${index === active ? "is-active" : ""}`}
                onClick={() => setActive(index)}
                aria-label={`Show slide ${index + 1}: ${slide.title}`}
                aria-current={index === active}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i>
                  <b style={{ transform: `scaleX(${index === active ? 1 : 0})` }} />
                </i>
              </button>
            ))}
          </div>
          <div className="slide-controls">
            <button
              type="button"
              className="hero-arrow"
              aria-label="Previous slide"
              onClick={() => changeSlide(-1)}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="hero-arrow"
              aria-label="Next slide"
              onClick={() => changeSlide(1)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#what-we-do">
        <span>Scroll to explore</span>
        <ArrowDown size={15} />
      </a>
    </section>
  );
}

function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem("cornerstone-consent") === null);
  }, []);

  const saveConsent = (choice: string) => {
    localStorage.setItem("cornerstone-consent", choice);
    setVisible(false);
    setPreferencesOpen(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="cookie-notice"
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
        >
          <div className="cookie-copy">
            <h2>We Respect Your Privacy</h2>
            <p>
              This website uses cookies to improve your experience and understand
              which sections are most useful. Read our Privacy Policy.
            </p>
          </div>
          {preferencesOpen && (
            <p className="text-xs text-gray-500">
              Necessary cookies are always active. You can choose whether to allow
              analytics and personalization cookies.
            </p>
          )}
          <div className="cookie-actions">
            <button
              type="button"
              className="cookie-link"
              onClick={() => setPreferencesOpen((open) => !open)}
            >
              {preferencesOpen ? "Hide preferences" : "Manage preferences"}
            </button>
            <button
              type="button"
              className="cookie-secondary"
              onClick={() => saveConsent("declined")}
            >
              Decline all
            </button>
            <Button onClick={() => saveConsent("accepted")}>Accept all</Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
    >
      <span className="eyebrow">{label}</span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>
      {description && <p className="mt-3 text-lg text-gray-600">{description}</p>}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />

      {/* What We Do / Dare to Work Differently */}
      <section className="intro-section" id="what-we-do">
        <div className="intro-copy">
          <span className="eyebrow">what we do</span>
          <h2>
            Dare to Work<br />Differently<sup>®</sup>
          </h2>
          <p>
            A better way to work starts with a different kind of partner. At
            Cornerstone, we deliver leaders who’ve been in your shoes and are
            ready to support your enterprise to get things done. From strategy to
            execution, we make transformation happen your way.
          </p>
          <a className="text-link" href="#capabilities">
            Explore How We Work <ArrowRight size={17} />
          </a>
        </div>
        <div className="intro-mark" aria-hidden="true">
          <div className="intro-mark-logo">
            <CornerstoneLogo variant="dark" height={28} />
          </div>
          <i>
            People.<br />Purpose.<br />Possibility.
          </i>
        </div>
      </section>

      {/* Capabilities 4-column Full-Bleed Tiles */}
      <section
        className="capabilities-section"
        id="capabilities"
        aria-label="Explore our work"
      >
        {capabilities.map((item, index) => (
          <motion.a
            className="capability-tile"
            key={item.label}
            href={item.href}
            style={{
              backgroundImage: `url("${item.image}")`,
            }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
          >
            <span className="capability-index">0{index + 1}</span>
            <span className="capability-title">
              {item.label}
              <ArrowRight size={19} />
            </span>
          </motion.a>
        ))}
      </section>

      {/* Key Highlights / Changing Business for the Better (RGP Matched 2x2 Layout) */}
      <section className="highlights-section" id="highlights">
        <motion.div
          className="highlights-left"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <span className="highlights-eyebrow">KEY HIGHLIGHTS</span>
          <h2 className="highlights-title">
            Changing<br />Business for the<br />Better
          </h2>
          <a className="highlights-cta" href="#what-we-do">
            <span>Why Cornerstone</span>
            <span className="highlights-cta-box" aria-hidden="true">
              <ArrowRight size={15} strokeWidth={2.5} />
            </span>
          </a>
        </motion.div>

        <div className="stats-2x2-grid">
          {stats.map((stat, index) => (
            <motion.div
              className="stat-card"
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <span className="stat-eyebrow">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <p className="stat-detail">{stat.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Research Section */}
      <section className="research-section">
        <div
          className="research-image"
          role="img"
          aria-label="Cornerstone research on concentration risk"
        />
        <div className="research-copy">
          <span className="eyebrow">Research</span>
          <h2>
            Navigating<br />Concentration Risk
          </h2>
          <p>Creating a balance between concentration and specialization.</p>
          <a
            className={buttonVariants({ variant: "primary" })}
            href="#what-we-do"
          >
            Read now <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* In The News */}
      <section className="news-section">
        <div className="news-header">
          <SectionHeading label="What’s happening" title="In the News" />
          <a className="text-link" href="#what-we-do">
            View all news <ArrowRight size={17} />
          </a>
        </div>
        <div className="news-grid">
          {news.map((item, index) => (
            <motion.a
              className="news-card"
              href={item.href}
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <div
                className="news-card-image"
                style={{ backgroundImage: `url("${item.image}")` }}
              >
                <span>{item.category}</span>
              </div>
              <div className="news-card-copy">
                <span className="news-date">{item.date}</span>
                <h3>{item.title}</h3>
                <span className="news-read">
                  Read story <ArrowRight size={16} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <SiteFooter />
      <CookieNotice />
    </main>
  );
}
