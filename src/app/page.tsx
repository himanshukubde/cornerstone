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
    number: "01",
    category: "01 / TALENT INTELLIGENCE",
    title: "BETTER DATA.\nBETTER DECISIONS.",
    lead: "",
    subtitle:
      "We use recruiting data, market intelligence and technology to understand where demand is, identify relevant talent and make every search more focused. But data is only the starting point. Our recruiters bring the experience, context and human judgment needed to turn information into the right hiring decision.",
    tagline: "Data informs the search. People make the connection.",
    action: "Discover Talent Intelligence",
    href: "/services",
    image: "/images/hero/hero-slide-1.jpg",
  },
  {
    number: "02",
    category: "02 / OUR PHILOSOPHY",
    title: "99% Human. 1% AI. 100% Recruiting.",
    lead:
      "Because technology can find a profile. A recruiter can understand a person. And when the stakes are someone's career, that distinction still matters.",
    subtitle:
      "99% Human. 1% AI. is not a measurement. It is a statement about how we believe recruitment should work. We use AI where it creates efficiency: finding information, organizing data, identifying relevant opportunities and reducing repetitive work. But the decisions that define great recruitment remain human—understanding ambition, recognizing potential beyond a résumé, building trust, reading context and knowing when a candidate is right for an organization. AI helps our recruiters work faster. Human judgment makes the recruitment meaningful.",
    tagline: "We keep recruitment human, and intend to keep it that way.",
    action: "Explore Our Philosophy",
    href: "/about",
    image: "/images/hero/hero-slide-2.jpg",
  },
  {
    number: "03",
    category: "03 / WORKFORCE COMPLIANCE",
    title: "Compliance. Handled with Precision.",
    lead: "",
    subtitle:
      "Managing a workforce today requires more than finding the right people. It requires a clear understanding of workforce strategy, regulatory requirements, accounting practices, tax policies, and immigration considerations. We bring structure and precision to the details that keep organizations compliant and their workforce moving forward, from employment and payroll requirements to worker classification, tax obligations, documentation, and immigration processes.",
    tagline:
      "Industry knowledge, disciplined processes & technology to reduce risk and make confident workforce decisions.",
    action: "Compliance Solutions",
    href: "/services",
    image: "/images/hero/hero-slide-3.jpg",
  },
  {
    number: "04",
    category: "04 / WORKFORCE ARCHITECTURE",
    title: "EARLY CAREERS TO ARCHITECTING ORGANIZATIONS.",
    lead: "",
    subtitle:
      "From early-career talent to the people, structures, and strategies that shape an organization, we look at the workforce as a whole. We help organizations build talent pipelines, develop early-career programs, strengthen workforce strategy, and align people with the skills and capabilities needed for what comes next. Whether supporting the first step of a career or helping architect the workforce behind a growing organization, our focus remains the same: building the right people, in the right roles, at the right time.",
    tagline:
      "Whether you are building your career or building your organization, let’s build what comes next together.",
    action: "Build What's Next",
    href: "/contact",
    image: "/images/hero/hero-slide-4.jpg",
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

  const nextIndex1 = (active + 1) % slides.length;
  const nextIndex2 = (active + 2) % slides.length;

  return (
    <section className="hero" id="top" aria-label="Featured stories">
      <AnimatePresence>
        <motion.div
          key={active}
          className="hero-image"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8, 14, 28, .88) 0%, rgba(8, 14, 28, .6) 50%, rgba(8, 14, 28, .15) 100%), linear-gradient(0deg, rgba(8, 12, 22, .5), transparent 45%), url("${slides[active].image}")`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="hero-content">
        <div className="hero-grid">
          <div className="hero-copy-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${active}`}
                className="hero-copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <span className="eyebrow hero-eyebrow">
                  {slides[active].category}
                </span>
                <h1>
                  {slides[active].title.split("\n").map((line, i) => (
                    <span key={i} style={{ display: "block" }}>
                      {line}
                    </span>
                  ))}
                </h1>
                {slides[active].lead && (
                  <p className="hero-lead">{slides[active].lead}</p>
                )}
                <p className="hero-desc">{slides[active].subtitle}</p>
                {slides[active].tagline && (
                  <div className="hero-tagline-box">
                    <span className="hero-tagline-bar" />
                    <p className="hero-tagline">{slides[active].tagline}</p>
                  </div>
                )}
                <div style={{ marginTop: "16px" }}>
                  <a
                    className={buttonVariants({ variant: "primary", size: "lg" })}
                    href={slides[active].href}
                  >
                    <span>{slides[active].action}</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hero-thumb-cards" aria-label="Upcoming stories">
            {[nextIndex1, nextIndex2].map((idx) => (
              <button
                key={slides[idx].title}
                type="button"
                className="hero-thumb-card"
                onClick={() => setActive(idx)}
                aria-label={`Jump to ${slides[idx].title}`}
              >
                <div
                  className="hero-thumb-img"
                  style={{ backgroundImage: `url("${slides[idx].image}")` }}
                />
                <div className="hero-thumb-info">
                  <span className="hero-thumb-tag">{slides[idx].category}</span>
                  <span className="hero-thumb-title">
                    {slides[idx].title.replace("\n", " ")}
                  </span>
                  <span className="hero-thumb-link">
                    Explore story <ArrowRight size={13} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-progress-segments" aria-label="Story progress indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={`hero-segment ${index === active ? "is-active" : ""}`}
                onClick={() => setActive(index)}
                aria-label={`Slide ${index + 1}: ${slide.title}`}
                aria-current={index === active}
              />
            ))}
          </div>

          <div className="slide-controls" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "1px",
                color: "rgba(255, 255, 255, 0.75)",
              }}
            >
              0{active + 1} / 0{slides.length}
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
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
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <div className="trust-bar" aria-label="Enterprise credentials">
      <div className="trust-bar-inner">
        <span className="trust-bar-label">ENTERPRISE PARTNER OF CHOICE</span>
        <div className="trust-stats-items">
          <div className="trust-item">
            <b>90%</b>
            <span>of Fortune 100 Served</span>
          </div>
          <div className="trust-item">
            <b>70%</b>
            <span>of Fortune 500 Worldwide</span>
          </div>
          <div className="trust-item">
            <b>1,500+</b>
            <span>Global Enterprise Clients</span>
          </div>
          <div className="trust-item">
            <b>Forbes</b>
            <span>World&apos;s Best Management Consulting</span>
          </div>
        </div>
      </div>
    </div>
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
      <TrustBar />

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
            className={buttonVariants({ variant: "primary", size: "default" })}
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
