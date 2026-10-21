"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

const media = "https://rgp.com/wp-content/uploads";

const slides = [
  {
    category: "Research",
    title: "The Human Value Gap in M&A",
    subtitle: "Why Culture and Talent Drive Deal Value",
    action: "Read Now",
    href: "https://rgp.com/mergers-acquisitions/value-gap/",
    image: `${media}/2026/08/ma_main_carousel.jpg`,
  },
  {
    category: "Research",
    title: "Foundational Divide",
    subtitle: "From AI Ambition to AI Readiness",
    action: "Explore the Research",
    href: "https://rgp.com/research/cfo/ai-readiness/",
    image: `${media}/2025/12/From-AI-Ambition-to-AI-Readiness.jpg`,
  },
  {
    category: "Solutions",
    title: "RGP Streamline 360™",
    subtitle: "Modernize your finance function with confidence.",
    action: "Discover Streamline 360",
    href: "https://rgp.com/",
    image: `${media}/2026/08/streamline360.jpg`,
  },
  {
    category: "Visionary Voices",
    title: "Shape the Future of Finance 4.0",
    subtitle: "The people and ideas reshaping finance.",
    action: "Watch Now",
    href: "https://rgp.com/",
    image: `${media}/2025/09/Finance-4.0-RGP-Home-Carousel.jpg`,
  },
  {
    category: "Visionary Voices",
    title: "The Speed of Change",
    subtitle: "AI Strategy Timelines are Measured in Months, Not Years",
    action: "Join the Conversation",
    href: "https://rgp.com/talks/moving-at-the-speed-of-change/",
    image: `${media}/2025/09/Elons-VV-RGP-Home-Carousel.jpg`,
  },
];

const capabilities = [
  { label: "Capabilities", image: `${media}/2025/07/homepage-csuite-strategies-1.jpg`, href: "https://rgp.com/capabilities-expertise/" },
  { label: "C-Suite Strategies", image: `${media}/2025/07/homepage-csuite-strategies-2.jpg`, href: "https://rgp.com/c-suite-strategy-listings/" },
  { label: "Industries", image: `${media}/2025/07/homepage-csuite-strategies-3.jpg`, href: "https://rgp.com/industry-listings/" },
  { label: "Technologies", image: `${media}/2025/07/homepage-csuite-strategies-4.jpg`, href: "https://rgp.com/technology-listings/" },
];

const news = [
  {
    category: "Press",
    title: "RGP Study: 66% of Professionals Expect AI to Perform Most of Their Current Tasks Within Five Years, Yet Just 3% Feel Replaceable",
    date: "September 2026",
    href: "https://rgp.com/press/rgp-study-66-of-professionals-expect-ai-to-perform-most-of-their-current-tasks-within-five-years-yet-just-3-feel-replaceable/",
    image: `${media}/2025/12/From-AI-Ambition-to-AI-Readiness.jpg`,
  },
  {
    category: "Press",
    title: "Resources Connection Reports Financial Results for First Quarter Fiscal Year 2027",
    date: "October 2026",
    href: "https://rgp.com/press/resources-connection-reports-financial-results-for-first-quarter-fiscal-year-2027/",
    image: `${media}/2026/08/streamline360.jpg`,
  },
  {
    category: "Press",
    title: "Resources Connection to Announce First Quarter Fiscal 2027 Results on October 7, 2026",
    date: "September 2026",
    href: "https://rgp.com/press/resources-connection-to-announce-first-quarter-fiscal-2027-results-on-october-7-2026/",
    image: `${media}/2025/09/Finance-4.0-RGP-Home-Carousel.jpg`,
  },
];

const stats = [
  { label: "Go-to Choice", value: "90%", detail: "Fortune 100 served & 70% of the Fortune 500 served worldwide" },
  { label: "Global Reach", value: "1,500+", detail: "Clients across 4 regions, 37+ countries & 17 industries" },
  { label: "Award-Winning", value: "Forbes", detail: "Recognized as one of the World’s Best Management Consulting Firms" },
  { label: "Engagements", value: "340K+", detail: "Projects completed by 2,600+ senior consultants globally" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="RGP home">
          <img src={`${media}/2025/04/rgp_logo-color.svg`} alt="RGP" />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="https://rgp.com/about-us/">Company <ChevronDown size={13} /></a>
          <a href="https://rgp.com/capabilities-expertise/">Solutions <ChevronDown size={13} /></a>
          <a href="https://rgp.com/regions/">Regions <ChevronDown size={13} /></a>
          <a href="https://rgp.com/careers/">Careers</a>
          <a href="https://rgp.com/investors/">Investors</a>
        </nav>
        <div className="header-actions">
          <a className="header-contact" href="https://rgp.com/contact/">Let&apos;s talk <ArrowRight size={15} /></a>
          <button className="icon-button search-button" aria-label="Search"><Search size={19} strokeWidth={1.7} /></button>
          <button className="icon-button mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={23} /></button>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            <div className="mobile-menu-top">
              <img src={`${media}/2025/04/rgp_logo-color.svg`} alt="RGP" />
              <button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={23} /></button>
            </div>
            <nav aria-label="Mobile navigation">
              {[["Company", "https://rgp.com/about-us/"], ["Solutions", "https://rgp.com/capabilities-expertise/"], ["Regions", "https://rgp.com/regions/"], ["Careers", "https://rgp.com/careers/"], ["Investors", "https://rgp.com/investors/"]].map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight size={17} /></a>
              ))}
            </nav>
            <a className="mobile-contact" href="https://rgp.com/contact/">Let&apos;s talk <ArrowRight size={16} /></a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  const changeSlide = (direction: number) => setActive((index) => (index + direction + slides.length) % slides.length);

  return (
    <section className="hero" id="top" aria-label="Featured stories">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="hero-image"
          style={{ backgroundImage: `linear-gradient(90deg, rgba(9, 18, 23, .76) 0%, rgba(9, 18, 23, .42) 45%, rgba(9, 18, 23, .05) 100%), linear-gradient(0deg, rgba(8, 14, 17, .32), transparent 45%), url("${slides[active].image}")` }}
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        />
      </AnimatePresence>
      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div key={`copy-${active}`} className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
            <span className="eyebrow hero-eyebrow">{slides[active].category}</span>
            <h1>{slides[active].title}</h1>
            <p>{slides[active].subtitle}</p>
            <a className={buttonVariants({ variant: "primary", size: "lg" })} href={slides[active].href}>{slides[active].action}<ArrowRight size={16} /></a>
          </motion.div>
        </AnimatePresence>
        <div className="hero-bottom">
          <div className="slide-pager" aria-label="Choose featured story">
            {slides.map((slide, index) => (
              <button key={slide.title} className={`slide-dot ${index === active ? "is-active" : ""}`} onClick={() => setActive(index)} aria-label={`Show slide ${index + 1}: ${slide.title}`} aria-current={index === active}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i><b style={{ transform: `scaleX(${index === active ? 1 : 0})` }} /></i>
              </button>
            ))}
          </div>
          <div className="slide-controls">
            <button className="hero-arrow" aria-label="Previous slide" onClick={() => changeSlide(-1)}><ChevronLeft size={20} /></button>
            <button className="hero-arrow" aria-label="Next slide" onClick={() => changeSlide(1)}><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#what-we-do"><span>Scroll to explore</span><ArrowDown size={15} /></a>
    </section>
  );
}

function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem("rgp-consent") === null);
  }, []);

  const saveConsent = (choice: string) => {
    localStorage.setItem("rgp-consent", choice);
    setVisible(false);
    setPreferencesOpen(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside className="cookie-notice" role="dialog" aria-label="Cookie preferences" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}>
          <div className="cookie-copy">
            <h2>We Respect Your Privacy</h2>
            <p>This website uses cookies to improve your experience and understand which sections are most useful. Read our <a href="https://rgp.com/cookie-policy/">Cookie Policy</a> and <a href="https://rgp.com/privacy-policy/">Privacy Policy</a>.</p>
          </div>
          {preferencesOpen && <p className="cookie-preference-note">Necessary cookies are always active. You can choose whether to allow analytics and personalization cookies.</p>}
          <div className="cookie-actions">
            <button className="cookie-link" onClick={() => setPreferencesOpen((open) => !open)}>{preferencesOpen ? "Hide preferences" : "Manage preferences"}</button>
            <button className="cookie-secondary" onClick={() => saveConsent("declined")}>Decline all</button>
            <Button onClick={() => saveConsent("accepted")}>Accept all</Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <motion.div className="section-heading" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }}>
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  );
}

function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <section className="intro-section" id="what-we-do">
        <div className="intro-copy">
          <span className="eyebrow">What we do</span>
          <h2>Dare to Work<br />Differently<sup>®</sup></h2>
          <p>A better way to work starts with a different kind of partner. At RGP, we deliver leaders who’ve been in your shoes and are ready to support your enterprise to get things done. From strategy to execution, we make transformation happen your way.</p>
          <a className="text-link" href="https://rgp.com/capabilities-expertise/">Explore RGP <ArrowRight size={17} /></a>
        </div>
        <div className="intro-mark" aria-hidden="true"><span>RGP</span><i>People.<br />Purpose.<br />Possibility.</i></div>
      </section>
      <section className="capabilities-section" aria-label="Explore our work">
        {capabilities.map((item, index) => (
          <motion.a className="capability-tile" key={item.label} href={item.href} style={{ backgroundImage: `linear-gradient(0deg, rgba(10, 15, 18, .72), rgba(10, 15, 18, .02) 75%), url("${item.image}")` }} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.08, duration: 0.5 }}>
            <span className="capability-index">0{index + 1}</span>
            <span className="capability-title">{item.label}<ArrowRight size={19} /></span>
          </motion.a>
        ))}
      </section>
      <section className="impact-section">
        <div className="impact-heading">
          <SectionHeading label="Key highlights" title="Changing Business for the Better" />
          <a className="text-link impact-link" href="https://rgp.com/why-rgp/">Why RGP <ArrowRight size={17} /></a>
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div className="stat" key={stat.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.08, duration: 0.5 }}>
              <span className="eyebrow">{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>{stat.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="research-section">
        <div className="research-image" role="img" aria-label="RGP research on concentration risk" />
        <div className="research-copy">
          <span className="eyebrow">Research</span>
          <h2>Navigating<br />Concentration Risk</h2>
          <p>Creating a balance between concentration and specialization.</p>
          <a className={buttonVariants({ variant: "primary" })} href="https://rgp.com/research/navigating-concentration-risk/">Read now <ArrowRight size={16} /></a>
        </div>
      </section>
      <section className="news-section">
        <div className="news-header">
          <SectionHeading label="What’s happening" title="In the News" />
          <a className="text-link" href="https://rgp.com/press/">View all news <ArrowRight size={17} /></a>
        </div>
        <div className="news-grid">
          {news.map((item, index) => (
            <motion.a className="news-card" href={item.href} key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08, duration: 0.5 }}>
              <div className="news-card-image" style={{ backgroundImage: `url("${item.image}")` }}><span>{item.category}</span></div>
              <div className="news-card-copy">
                <span className="news-date">{item.date}</span>
                <h3>{item.title}</h3>
                <span className="news-read">Read story <ArrowRight size={16} /></span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-block">
            <img src={`${media}/2025/04/rgp_logo-color.svg`} alt="RGP" />
            <p>Global consulting and project execution for business transformation.</p>
            <a href="https://rgp.com/contact/" className="footer-contact">Start a conversation <ArrowRight size={16} /></a>
          </div>
          <div className="footer-column"><span>Company</span><a href="https://rgp.com/about-us/">About RGP</a><a href="https://rgp.com/why-rgp/">Why RGP</a><a href="https://rgp.com/leadership/">Leadership</a><a href="https://rgp.com/press/">Newsroom</a></div>
          <div className="footer-column"><span>Solutions</span><a href="https://rgp.com/capabilities-expertise/">Capabilities</a><a href="https://rgp.com/c-suite-strategy-listings/">C-Suite Strategies</a><a href="https://rgp.com/industry-listings/">Industries</a><a href="https://rgp.com/technology-listings/">Technologies</a></div>
          <div className="footer-column"><span>Connect</span><a href="https://rgp.com/careers/">Careers</a><a href="https://rgp.com/contact/">Contact</a><a href="https://www.linkedin.com/company/rgp/">LinkedIn</a><a href="https://www.instagram.com/lifeatrgp/">Instagram</a></div>
        </div>
        <div className="footer-bottom"><span>© 1996–2026 Resources Connection, Inc.</span><div><a href="https://rgp.com/privacy-policy/">Privacy Policy</a><a href="https://rgp.com/cookie-policy/">Cookie Policy</a><a href="https://rgp.com/terms-of-use/">Terms &amp; Conditions</a></div><span>NYSE: RGP</span></div>
      </footer>
      <CookieNotice />
    </main>
  );
}

export default Home;
