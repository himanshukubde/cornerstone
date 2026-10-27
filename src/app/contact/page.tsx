"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Users,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { CornerstoneLogo } from "@/components/ui/cornerstone-logo";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    country: "",
    city: "",
    phone: "",
    practice: "strategy",
    comments: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Instantaneous enterprise submission simulation
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      role: "",
      country: "",
      city: "",
      phone: "",
      practice: "strategy",
      comments: "",
    });
  };

  return (
    <main className="cs-contact-page">
      <SiteHeader />

      {/* 1. HERO TOP BANNER (Visible right below header with photo & typography) */}
      <section className="cs-contact-hero">
        <div className="cs-contact-hero__bg" aria-hidden="true" />
        <div className="cs-contact-hero__glow" aria-hidden="true" />

        <div className="cs-contact-hero__inner">
          <div className="cs-contact-hero__badge">
            <span className="cs-contact-hero__dot" />
            <span>Contact Us</span>
          </div>

          <h1 className="cs-contact-hero__title">
            We&apos;d Love<br />
            to Connect<span className="accent-dot">.</span>
          </h1>

          <p className="cs-contact-hero__subtitle">
            Whatever your enterprise transformation, financial rigor, or digital innovation demands may be, our global practice leaders stand ready to partner.
          </p>

          <div className="cs-contact-hero__pills">
            <div className="cs-contact-hero__pill">
              <Clock size={15} />
              <span>24-Hour SLA Response</span>
            </div>
            <div className="cs-contact-hero__pill">
              <ShieldCheck size={15} />
              <span>Strict NDA &amp; Confidentiality</span>
            </div>
            <div className="cs-contact-hero__pill">
              <Users size={15} />
              <span>Direct Practice Partner Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN SECTION: EDITORIAL + FORM CARD */}
      <section id="contact-form-section" className="cs-contact-section">
        <div className="cs-contact-grid">
          {/* Left Column: Authoritative Editorial & Direct Contacts */}
          <div className="cs-contact-info">
            <div className="cs-contact-info__eyebrow">
              Direct Executive Access
            </div>
            <h2 className="cs-contact-info__heading">
              Tell Us What You Need,<br />
              And We’ll Make It Happen<span className="accent-dot">.</span>
            </h2>

            <p className="cs-contact-info__lead">
              At Cornerstone, people are at the heart of everything we do. We don&apos;t deploy junior teams—we assemble veteran operators with decades of domain mastery who work shoulder-to-shoulder with your executive suite to turn ambitious targets into operational realities.
            </p>

            {/* Direct Contact Cards */}
            <div className="cs-contact-cards">
              <div className="cs-contact-card">
                <div className="cs-contact-card__icon">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="cs-contact-card__label">Direct Advisory Hotline</div>
                  <div className="cs-contact-card__value">+1 (800) 555-0199</div>
                  <div className="cs-contact-card__sub">Mon – Fri, 8:00 AM – 8:00 PM EST</div>
                </div>
              </div>

              <div className="cs-contact-card">
                <div className="cs-contact-card__icon">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="cs-contact-card__label">Executive Inquiries</div>
                  <div className="cs-contact-card__value">advisory@cornerstone.com</div>
                  <div className="cs-contact-card__sub">Encrypted &amp; Priority Routed</div>
                </div>
              </div>

              <div className="cs-contact-card">
                <div className="cs-contact-card__icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="cs-contact-card__label">Global Practice Centers</div>
                  <div className="cs-contact-card__value">New York • London • Singapore • Zurich</div>
                  <div className="cs-contact-card__sub">Serving enterprises across 42 countries</div>
                </div>
              </div>
            </div>

            {/* Talent Community Callout */}
            <div className="cs-talent-box">
              <strong>Looking for career opportunities?</strong> Explore open roles and connect directly with our global consulting team via our{" "}
              <a href="#talent-community">
                Talent Community portal
              </a>
              .
            </div>
          </div>

          {/* Right Column: Pristine Elevated Form Card */}
          <div className="cs-form-card">
            {submitted ? (
              <div className="cs-success-state">
                <div className="cs-success-icon">
                  <CheckCircle2 size={32} strokeWidth={2.5} />
                </div>
                <h3 className="cs-success-title">
                  Inquiry Received, {formData.name || "Valued Partner"}
                </h3>
                <p className="cs-success-text">
                  Thank you for reaching out. A Senior Practice Managing Director matching your industry and operational scope has been assigned to your brief and will connect within 24 business hours.
                </p>

                <div
                  style={{
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    padding: "14px 18px",
                    maxWidth: "380px",
                    margin: "0 auto 24px auto",
                    textAlign: "left",
                    fontSize: "12.5px",
                    color: "#64748B",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontWeight: 600, color: "#0F172A" }}>Priority Ticket ID:</span>
                    <span style={{ fontFamily: "monospace", color: "#1A237E", fontWeight: 700 }}>CS-89240</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontWeight: 600, color: "#0F172A" }}>Response SLA:</span>
                    <span style={{ color: "#059669", fontWeight: 600 }}>Under 24 Hours</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600, color: "#0F172A" }}>Assigned Practice:</span>
                    <span style={{ color: "#0F172A", textTransform: "capitalize" }}>{formData.practice}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="cs-reset-btn"
                >
                  <span>Submit Another Inquiry</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="cs-form-card__header">
                  <h3 className="cs-form-card__title">
                    Request an Executive Consultation
                  </h3>
                  <p className="cs-form-card__desc">
                    Share your project context so we can prepare tailored benchmark data prior to our initial briefing.
                  </p>
                  <div className="cs-form-card__legend">
                    <span className="req">*</span> indicates a required field
                  </div>
                </div>

                {/* Row 1: Name & Business Email */}
                <div className="cs-form-row">
                  <div>
                    <label htmlFor="cs-name" className="cs-label">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      id="cs-name"
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="cs-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="cs-email" className="cs-label">
                      Business Email <span className="req">*</span>
                    </label>
                    <input
                      id="cs-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="cs-input"
                    />
                  </div>
                </div>

                {/* Row 2: Company & Job Title */}
                <div className="cs-form-row">
                  <div>
                    <label htmlFor="cs-company" className="cs-label">
                      Company / Organization <span className="req">*</span>
                    </label>
                    <input
                      id="cs-company"
                      type="text"
                      required
                      placeholder="e.g. Vanguard Health"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="cs-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="cs-role" className="cs-label">
                      Job Title / Role
                    </label>
                    <input
                      id="cs-role"
                      type="text"
                      placeholder="e.g. Chief Operating Officer"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="cs-input"
                    />
                  </div>
                </div>

                {/* Row 3: Country & City */}
                <div className="cs-form-row">
                  <div>
                    <label htmlFor="cs-country" className="cs-label">
                      Country <span className="req">*</span>
                    </label>
                    <input
                      id="cs-country"
                      type="text"
                      required
                      placeholder="e.g. United States"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="cs-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="cs-city" className="cs-label">
                      City <span className="req">*</span>
                    </label>
                    <input
                      id="cs-city"
                      type="text"
                      required
                      placeholder="e.g. New York"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="cs-input"
                    />
                  </div>
                </div>

                {/* Row 4: Phone & Practice Area */}
                <div className="cs-form-row">
                  <div>
                    <label htmlFor="cs-phone" className="cs-label">
                      Direct Phone
                    </label>
                    <input
                      id="cs-phone"
                      type="tel"
                      placeholder="(999) 999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="cs-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="cs-practice" className="cs-label">
                      Primary Service <span className="req">*</span>
                    </label>
                    <select
                      id="cs-practice"
                      value={formData.practice}
                      onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
                      className="cs-select"
                    >
                      <option value="strategy">Business Strategy &amp; Transformation</option>
                      <option value="finance">Finance &amp; Accounting</option>
                      <option value="digital">Digital, Technology &amp; Data</option>
                      <option value="compliance">Governance, Risk &amp; Compliance</option>
                      <option value="talent">Executive Interim Leadership</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Comments / Scope */}
                <div className="cs-form-group">
                  <label htmlFor="cs-comments" className="cs-label">
                    Project Scope &amp; Key Priorities <span className="req">*</span>
                  </label>
                  <textarea
                    id="cs-comments"
                    required
                    rows={4}
                    placeholder="Briefly describe your objectives, operational challenges, or expected timeline..."
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    className="cs-textarea"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="cs-submit-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Transmitting Consultation Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. GLOBAL CTA PRE-FOOTER BANNER */}
      <section className="cs-contact-cta">
        <div className="cs-contact-cta__inner">
          <div className="cs-contact-cta__brand">
            <CornerstoneLogo variant="light" height={26} />
            <div className="cs-contact-cta__divider" />
            <div className="cs-contact-cta__tagline">
              Global Enterprise Consulting &amp; Execution
            </div>
          </div>

          <a
            href="#contact-form-section"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("contact-form-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cs-contact-cta__btn"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <div id="talent-community" className="sr-only" aria-hidden="true" />

      <SiteFooter />
    </main>
  );
}
