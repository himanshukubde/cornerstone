"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Compass,
  Cpu,
  DollarSign,
  FileText,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { ServiceCategory } from "@/data/navigation-data";

interface ServicesClientProps {
  services: ServiceCategory[];
}

export function ServicesClient({ services }: ServicesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "TrendingUp":
        return <TrendingUp size={22} className="text-white" />;
      case "DollarSign":
        return <DollarSign size={22} className="text-white" />;
      case "Cpu":
        return <Cpu size={22} className="text-white" />;
      case "ShieldCheck":
        return <ShieldCheck size={22} className="text-white" />;
      default:
        return <Layers size={22} className="text-white" />;
    }
  };

  // Filter services by category and search
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === "all" || service.id === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const inTitle = service.title.toLowerCase().includes(q);
      const inTagline = service.tagline.toLowerCase().includes(q);
      const inOverview = service.overview.toLowerCase().includes(q);
      const inDeliverables = service.deliverables.some((d) =>
        d.toLowerCase().includes(q)
      );
      const inItems = service.items.some(
        (i) =>
          i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
      );

      return inTitle || inTagline || inOverview || inDeliverables || inItems;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <div className="cs-services-page">
      {/* 1. HERO BANNER */}
      <section className="cs-services-hero">
        <div className="cs-services-hero__bg" />
        <div className="cs-services-hero__glow" />

        <div className="cs-services-hero__inner">
          <div className="cs-services-hero__breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} />
            <span className="text-white">Services & Capabilities</span>
          </div>

          <div className="cs-services-hero__badge">
            <span className="cs-services-hero__dot" />
            ENTERPRISE CONSULTING & SOLUTIONS
          </div>

          <h1 className="cs-services-hero__title">
            Strategic Vision. Flawless Execution. <br className="hidden sm:inline" />
            Measurable Enterprise Impact.
          </h1>

          <p className="cs-services-hero__subtitle">
            At Cornerstone, we pair seasoned operational practitioners who have sat in your seat with modern data intelligence, cloud architecture, and agile execution. From strategic definition to hands-on delivery, we turn enterprise ambition into sustainable performance.
          </p>

          <div className="cs-services-hero__actions">
            <a
              href="#service-catalog"
              className="inline-flex items-center gap-2 bg-[#1A237E] hover:bg-[#121858] text-white px-10 py-3.5 font-bold text-xs uppercase tracking-[2px] transition-all rounded-none"
            >
              <span>Explore Capabilities</span>
              <ArrowRight size={15} />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/60 bg-transparent hover:bg-white hover:text-[#1A237E] text-white px-10 py-3.5 font-bold text-xs uppercase tracking-[2px] transition-all rounded-none"
            >
              <span>Request Executive Consultation</span>
            </Link>
          </div>

          <div className="cs-services-hero__pills">
            <div className="cs-services-hero__pill-item">
              <Users size={14} className="text-[#38BDF8]" />
              <span>Senior Practitioner Co-Delivery (Former Big 4 & Industry Execs)</span>
            </div>
            <div className="cs-services-hero__pill-item">
              <Zap size={14} className="text-[#38BDF8]" />
              <span>Average 45% Acceleration in Time-to-Value</span>
            </div>
            <div className="cs-services-hero__pill-item">
              <ShieldCheck size={14} className="text-[#38BDF8]" />
              <span>100% Audit Readiness & SOX Assurance</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="cs-services-stats">
        <div className="cs-services-stats__inner">
          <div className="cs-services-stat-card">
            <div className="cs-services-stat-card__val">90%</div>
            <div className="cs-services-stat-card__label">Fortune 100 Served</div>
            <div className="cs-services-stat-card__desc">Trusted by premier global corporate leaders</div>
          </div>
          <div className="cs-services-stat-card">
            <div className="cs-services-stat-card__val">1,500+</div>
            <div className="cs-services-stat-card__label">Enterprise Clients</div>
            <div className="cs-services-stat-card__desc">Across 37+ countries & 17 industry sectors</div>
          </div>
          <div className="cs-services-stat-card">
            <div className="cs-services-stat-card__val">$1.2B+</div>
            <div className="cs-services-stat-card__label">Verified Client Value</div>
            <div className="cs-services-stat-card__desc">Direct bottom-line efficiency & growth created</div>
          </div>
          <div className="cs-services-stat-card">
            <div className="cs-services-stat-card__val">Forbes</div>
            <div className="cs-services-stat-card__label">World&apos;s Best Consulting</div>
            <div className="cs-services-stat-card__desc">Recognized for premier management excellence</div>
          </div>
        </div>
      </section>

      {/* 3. STICKY NAV & SEARCH BAR */}
      <nav id="service-catalog" className="cs-services-nav-bar" aria-label="Practice navigation and search">
        <div className="cs-services-nav-bar__inner">
          <div className="cs-services-tabs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`cs-services-tab-btn ${
                selectedCategory === "all" ? "is-active" : ""
              }`}
            >
              All Practices
              <span className="cs-services-tab-count">{services.length}</span>
            </button>
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedCategory(service.id)}
                className={`cs-services-tab-btn ${
                  selectedCategory === service.id ? "is-active" : ""
                }`}
              >
                {service.shortTitle}
                <span className="cs-services-tab-count">{service.items.length}</span>
              </button>
            ))}
          </div>

          <div className="cs-services-search-box">
            <Search size={15} className="cs-services-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search capabilities, e.g. 'M&A', 'SOX', 'AI'..."
              className="cs-services-search-input"
            />
          </div>
        </div>
      </nav>

      {/* 4. SERVICES PRACTICE CATALOG */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 py-16">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#455CB3]">
            Comprehensive Practices
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] mt-2 tracking-tight">
            End-to-End Enterprise Solutions
          </h2>
          <p className="mt-2 text-[#475569] text-base max-w-3xl">
            Explore our specialized consulting disciplines designed to navigate volatility, modernize operations, and drive compounding business performance.
          </p>
        </div>

        {filteredServices.length === 0 ? (
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center my-12">
            <Briefcase size={36} className="text-[#94A3B8] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#0F172A]">No capabilities found</h3>
            <p className="text-[#64748B] text-sm mt-1 mb-6">
              No services match your search query &quot;{searchQuery}&quot;. Try adjusting your keywords.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="inline-flex items-center gap-2 bg-[#1A237E] text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {filteredServices.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className="cs-practice-card"
              >
                {/* Header bar */}
                <div className="cs-practice-card__header-bar">
                  <div className="cs-practice-card__tag">
                    <span className="cs-practice-card__tag-badge">
                      PRACTICE 0{index + 1}
                    </span>
                    <span className="hidden sm:inline text-xs text-[#64748B] font-medium tracking-normal">
                      Enterprise Advisory & Co-Execution
                    </span>
                  </div>

                  <div className="cs-practice-card__icon-box">
                    {getIcon(service.iconName)}
                  </div>
                </div>

                {/* Banner & Title Area */}
                <div
                  className="cs-practice-card__media"
                  style={{ backgroundImage: `url("${service.img}")` }}
                >
                  <div className="cs-practice-card__media-overlay" />
                  <div className="relative z-10 max-w-3xl">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="cs-practice-card__stats-grid">
                  {service.stats.slice(0, 4).map((stat) => (
                    <div key={stat.label} className="cs-practice-card__stat-item">
                      <div className="cs-practice-card__stat-val">{stat.value}</div>
                      <div className="cs-practice-card__stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left: Overview & Key Deliverables */}
                    <div className="lg:col-span-5 space-y-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#455CB3] mb-3">
                          Executive Practice Overview
                        </h4>
                        <p className="text-sm text-[#334155] leading-relaxed">
                          {service.overview}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#F1F5F9]">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-3">
                          Signature Deliverables & Outcomes:
                        </h4>
                        <ul className="space-y-2.5">
                          {service.deliverables.map((deliv, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-[#475569]">
                              <CheckCircle2 size={15} className="text-[#009D9D] mt-0.5 shrink-0" />
                              <span className="font-medium leading-relaxed">{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <Link
                          href={`/services/${service.id}`}
                          className="inline-flex items-center gap-2 bg-[#1A237E] hover:bg-[#121858] text-white px-6 py-3 font-bold text-xs uppercase tracking-[2px] transition-all"
                        >
                          Explore Practice Blueprint <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>

                    {/* Right: Sub-capabilities Grid */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                          Specialized Service Disciplines ({service.items.length})
                        </h4>
                        <Link
                          href={`/services/${service.id}`}
                          className="text-xs font-semibold text-[#455CB3] hover:text-[#1A237E] inline-flex items-center gap-1"
                        >
                          View Methodologies <ArrowUpRight size={13} />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {service.items.map((item) => (
                          <div key={item.num} className="cs-capability-pill">
                            <span className="cs-capability-num">#{item.num}</span>
                            <div>
                              <h5 className="text-xs font-bold text-[#0F172A] leading-snug">
                                {item.title}
                              </h5>
                              <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom strip inside card */}
                      <div className="mt-6 pt-5 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-2 text-[#475569]">
                          <Award size={16} className="text-[#1A237E]" />
                          <span>Led by former Big 4 partners & senior operational heads</span>
                        </div>
                        <Link
                          href="/contact"
                          className="font-bold text-[#1A237E] hover:text-[#455CB3] inline-flex items-center gap-1 transition-colors uppercase tracking-wider text-[11px]"
                        >
                          Request Practice Briefing <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 5. THE CORNERSTONE ENGAGEMENT LIFECYCLE */}
      <section className="cs-methodology-section">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[3px] text-[#38BDF8]">
              Operating Model
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight text-white">
              The Cornerstone Transformation Framework
            </h2>
            <p className="mt-3 text-[#94A3B8] text-base leading-relaxed">
              We eliminate traditional consulting friction. Our execution model pairs strategic rigor with direct co-delivery, ensuring sustained business ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="cs-method-step-card">
              <div className="cs-method-step-num">01</div>
              <h3 className="text-base font-bold text-white mb-2">
                Diagnostic & Readiness Alignment
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Rapid 360° operational review, stakeholder alignment, and capability gap analysis to formulate a high-confidence, quantifiable transformation roadmap.
              </p>
            </div>

            <div className="cs-method-step-card">
              <div className="cs-method-step-num">02</div>
              <h3 className="text-base font-bold text-white mb-2">
                Practitioner Team Orchestration
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Mobilize senior specialists with 15+ years of direct industry tenure within 7–14 days. Zero learning curves, immediate operational impact.
              </p>
            </div>

            <div className="cs-method-step-card">
              <div className="cs-method-step-num">03</div>
              <h3 className="text-base font-bold text-white mb-2">
                Agile Co-Execution & Integration
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Working side-by-side inside your teams to re-engineer workflows, deploy intelligent automation, and build scalable infrastructure without disruption.
              </p>
            </div>

            <div className="cs-method-step-card">
              <div className="cs-method-step-num">04</div>
              <h3 className="text-base font-bold text-white mb-2">
                Value Handover & Capability Transfer
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                We measure ROI against predefined KPIs and systematically transfer governance, documentation, and operational muscle to your internal leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CROSS-PRACTICE SYNERGY */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[3px] text-[#455CB3]">
                Interconnected Value
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] mt-2 tracking-tight">
                Why Enterprise Leaders Choose Our Integrated Capabilities
              </h2>
              <p className="mt-4 text-[#475569] text-base leading-relaxed">
                Modern enterprise challenges rarely fit into neat silos. A cloud migration impacts SOX compliance. An M&A integration shifts financial planning. We bring cross-functional mastery under a single unified partnership.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-[#EEF2FF] text-[#1A237E] mt-0.5">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      Strategy + Digital Modernization
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Directly connect executive boardroom goals with cloud-native engineering and real-time AI decision engines.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-[#EEF2FF] text-[#1A237E] mt-0.5">
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      Finance 4.0 + Risk Assurance
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Accelerate financial close cycles and FP&A agility while maintaining an uncompromising, 100% clean SOX compliance record.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-[#EEF2FF] text-[#1A237E] mt-0.5">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      Workforce Agility + Regulatory Shield
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Deploy flexible talent models and cross-border contingent teams with zero misclassification or tax audit exposure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1A237E] hover:text-[#455CB3] uppercase tracking-wider transition-colors"
                >
                  Consult with Practice Leadership <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-8 lg:p-10">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A237E]">
                    Enterprise Practice Matrix
                  </span>
                  <span className="text-[11px] text-[#64748B] font-medium">
                    Integrated Transformation Architecture
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-lg border border-[#E2E8F0] shadow-sm">
                    <div className="text-xs font-bold text-[#1A237E] uppercase tracking-wider mb-2">
                      01. Strategy & Transformation
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Operating Model Redesign, Process Automation, M&A Integration & Workforce Alignment.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-[#E2E8F0] shadow-sm">
                    <div className="text-xs font-bold text-[#1A237E] uppercase tracking-wider mb-2">
                      02. Finance & Accounting
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Technical Accounting, FP&A Forecasting, Tax Strategy, Treasury & Sourcing Optimization.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-[#E2E8F0] shadow-sm">
                    <div className="text-xs font-bold text-[#1A237E] uppercase tracking-wider mb-2">
                      03. Digital & Technology
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Cloud Migration, Practical GenAI, Data Intelligence, and Enterprise System Modernization.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-[#E2E8F0] shadow-sm">
                    <div className="text-xs font-bold text-[#1A237E] uppercase tracking-wider mb-2">
                      04. Compliance & Risk
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      SOX 404 Testing, Cybersecurity Risk, Regulatory Examination, and Contingent Workforce Auditing.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-between flex-wrap gap-3">
                  <div className="text-xs font-semibold text-[#1A237E]">
                    Need a tailored multi-practice cross-functional team?
                  </div>
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-[#1A237E] hover:text-[#121858] underline underline-offset-4"
                  >
                    Build Custom Engagement Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EXECUTIVE CONSULTATION STRIP */}
      <section className="cs-cta-editorial">
        <div className="cs-cta-editorial__inner">
          <div className="cs-cta-editorial__content">
            <span className="cs-cta-editorial__eyebrow">Executive Consultation</span>
            <h2 className="cs-cta-editorial__title">
              Ready to Accelerate Your Enterprise Agenda?
            </h2>
            <p className="cs-cta-editorial__desc">
              Connect directly with our senior practice directors to assess operational readiness, evaluate feasibility, and design a customized execution roadmap.
            </p>
          </div>
          <div className="cs-cta-editorial__actions">
            <Link href="/contact" className="cs-btn-primary">
              Schedule Consultation <ArrowRight size={15} />
            </Link>
            <Link href="/industry" className="cs-btn-text">
              Explore Industry Solutions <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
