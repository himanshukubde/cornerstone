import { notFound } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  FileCheck,
  Layers,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { industryData } from "@/data/navigation-data";
import "@/app/services/[slug]/service-detail.css";

interface IndustryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industryData.map((ind) => ({
    slug: ind.id,
  }));
}

export async function generateMetadata({ params }: IndustryDetailPageProps) {
  const { slug } = await params;
  const industry = industryData.find((i) => i.id === slug);
  if (!industry) return { title: "Industry | CORNERSTONE" };

  return {
    title: `${industry.title} Consulting & Sector Solutions | CORNERSTONE`,
    description: industry.tagline,
  };
}

export default async function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const { slug } = await params;
  const industry = industryData.find((i) => i.id === slug);

  if (!industry) {
    notFound();
  }

  const otherIndustries = industryData.filter((i) => i.id !== slug);

  return (
    <main className="cs-detail-page">
      <SiteHeader />

      {/* 1. HERO BANNER (155px padding-top to eliminate fixed header overlap) */}
      <section className="cs-detail-hero">
        <div
          className="cs-detail-hero__bg"
          style={{ backgroundImage: `url("${industry.img}")` }}
        />
        <div className="cs-detail-hero__glow" />

        <div className="cs-detail-hero__inner">
          {/* Breadcrumb */}
          <nav className="cs-detail-hero__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} />
            <Link href="/industry">Industry</Link>
            <ChevronRight size={13} />
            <span className="text-white">{industry.title}</span>
          </nav>

          <div className="cs-detail-hero__badge">
            <span className="cs-detail-hero__dot" />
            SECTOR SPECIALIZATION & ADVISORY
          </div>

          <h1 className="cs-detail-hero__title">
            {industry.title} Practice
          </h1>

          <p className="text-sm uppercase tracking-wider text-[#38BDF8] font-bold mb-3">
            {industry.subtitle}
          </p>

          <p className="cs-detail-hero__subtitle">
            {industry.tagline}
          </p>

          <div className="cs-detail-hero__actions">
            <Link href="/contact" className="cs-btn-hero-primary">
              Consult Sector Leadership <ArrowRight size={15} />
            </Link>
            <Link href="/industry" className="cs-btn-secondary">
              <ArrowLeft size={15} /> All Industries
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="cs-detail-stats">
        <div className="cs-detail-stats__inner">
          {industry.stats.map((stat) => (
            <div key={stat.label} className="cs-detail-stat-card">
              <div className="cs-detail-stat-card__val">{stat.value}</div>
              <div className="cs-detail-stat-card__label">{stat.label}</div>
              <div className="cs-detail-stat-card__desc">Dedicated sector benchmark impact</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MAIN CONTENT LAYOUT */}
      <div className="cs-detail-layout">
        {/* Left Column */}
        <div className="cs-detail-main">
          {/* Strategic Overview Card */}
          <section className="cs-mandate-card">
            <span className="cs-mandate-card__eyebrow">Industry Mandate</span>
            <h2 className="cs-mandate-card__title">
              Navigating High-Stakes Complexity in {industry.title}
            </h2>
            <p className="cs-mandate-card__text">
              {industry.overview}
            </p>

            <div className="cs-mandate-pillars">
              <div className="cs-pillar-item">
                <CheckCircle2 size={20} className="cs-pillar-item__icon" />
                <div>
                  <h4 className="cs-pillar-item__title">Sector-Tenured Leadership</h4>
                  <p className="cs-pillar-item__desc">
                    Advisors who have led operations inside major {industry.title.toLowerCase()} institutions and know regulatory requirements firsthand.
                  </p>
                </div>
              </div>

              <div className="cs-pillar-item">
                <CheckCircle2 size={20} className="cs-pillar-item__icon" />
                <div>
                  <h4 className="cs-pillar-item__title">Tailored Execution Frameworks</h4>
                  <p className="cs-pillar-item__desc">
                    Purpose-built methodologies that integrate seamlessly into complex clinical, financial, or regulatory workflows.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Challenges vs Solutions Grid */}
          <section className="cs-market-dynamics-card">
            <span className="cs-market-dynamics-card__eyebrow">
              Market Dynamics
            </span>
            <h2 className="cs-market-dynamics-card__title">
              Critical Sector Challenges &amp; Our Tailored Solutions
            </h2>

            <div className="cs-dynamics-grid">
              {/* Challenges */}
              <div className="cs-dynamics-box cs-dynamics-box--headwinds">
                <div className="cs-dynamics-box__header">
                  <AlertCircle size={18} className="shrink-0" />
                  <h4>Core Sector Headwinds</h4>
                </div>
                <ul className="cs-dynamics-list">
                  {industry.keyChallenges.map((ch, idx) => (
                    <li key={idx} className="cs-dynamics-list-item">
                      <span className="cs-dynamics-dot" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="cs-dynamics-box cs-dynamics-box--solutions">
                <div className="cs-dynamics-box__header">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <h4>Cornerstone Solutions</h4>
                </div>
                <ul className="cs-dynamics-list">
                  {industry.solutions.map((sol, idx) => (
                    <li key={idx} className="cs-dynamics-list-item">
                      <span className="cs-dynamics-dot" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Specialized Industry Focus Areas */}
          <section className="cs-capabilities-section">
            <div className="cs-capabilities-header">
              <span className="cs-capabilities-header__eyebrow">Sector Capabilities</span>
              <h2 className="cs-capabilities-header__title">
                Specialized {industry.title} Focus Disciplines
              </h2>
            </div>

            <div className="cs-subcaps-list">
              {industry.items.map((item) => (
                <div key={item.num} className="cs-subcap-card">
                  <div className="cs-subcap-header">
                    <span className="cs-subcap-num">#{item.num}</span>
                    <h3 className="cs-subcap-title">{item.title}</h3>
                  </div>
                  <p className="cs-subcap-desc">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* RGP-Standard Delivery Models */}
          <section className="cs-delivery-section">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#455CB3]">
              Flexible Engagement
            </span>
            <h2 className="text-2xl font-bold text-[#0F172A] mt-1">
              How We Deliver Value in {industry.title}
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Our multidisciplinary model combines sector strategy, technology modernization, and on-demand professional talent.
            </p>

            <div className="cs-delivery-grid">
              <div className="cs-delivery-card">
                <div className="cs-delivery-card__icon">
                  <Compass size={20} />
                </div>
                <h4 className="cs-delivery-card__title">Regulatory & Strategic Advisory</h4>
                <p className="cs-delivery-card__desc">
                  Compliance alignment, policy frameworks, and board-level risk oversight for {industry.title.toLowerCase()} leadership.
                </p>
              </div>

              <div className="cs-delivery-card">
                <div className="cs-delivery-card__icon">
                  <Users size={20} />
                </div>
                <h4 className="cs-delivery-card__title">Turnkey Sector Squads</h4>
                <p className="cs-delivery-card__desc">
                  Cross-functional teams executing core platform rollouts, mergers, and operational restructuring.
                </p>
              </div>

              <div className="cs-delivery-card">
                <div className="cs-delivery-card__icon">
                  <Zap size={20} />
                </div>
                <h4 className="cs-delivery-card__title">Specialized Talent Augmentation</h4>
                <p className="cs-delivery-card__desc">
                  Subject matter experts embedded directly into your departments to address immediate surge needs.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sticky Sidebar */}
        <aside className="cs-sidebar-sticky">
          {/* Direct Consultation Card */}
          <div className="cs-scoping-card">
            <span className="cs-scoping-card__eyebrow">Sector Leadership</span>
            <h3 className="cs-scoping-card__title">
              Request a Sector Consultation
            </h3>
            <p className="cs-scoping-card__desc">
              Connect directly with our {industry.title} practice directors to discuss your operating model and workforce objectives.
            </p>

            <Link href="/contact" className="cs-scoping-card__btn">
              Consult Practice Leader <ArrowRight size={15} />
            </Link>

            <div className="cs-scoping-facts">
              <div className="cs-scoping-fact-item">
                <Clock size={16} />
                <span>Typical consultation scheduled in 24 hours</span>
              </div>
              <div className="cs-scoping-fact-item">
                <ShieldCheck size={16} />
                <span>Mutual NDA & confidentiality pre-executed</span>
              </div>
              <div className="cs-scoping-fact-item">
                <Award size={16} />
                <span>Trusted by Fortune 100 sector leaders</span>
              </div>
            </div>
          </div>

          {/* Other Industries Navigation Card */}
          <div className="cs-other-practices-card">
            <h4 className="cs-other-practices-card__title">
              Other Industry Sectors
            </h4>
            <div className="space-y-1">
              {otherIndustries.map((other) => (
                <Link
                  key={other.id}
                  href={`/industry/${other.id}`}
                  className="cs-other-practice-link"
                >
                  <span>{other.title}</span>
                  <ChevronRight size={14} className="text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Executive Consultation Strip - Clean Editorial Design */}
      <section className="cs-cta-editorial">
        <div className="cs-cta-editorial__inner">
          <div className="cs-cta-editorial__content">
            <span className="cs-cta-editorial__eyebrow">Sector Leadership</span>
            <h2 className="cs-cta-editorial__title">
              Partner with Proven {industry.title} Practitioners
            </h2>
            <p className="cs-cta-editorial__desc">
              Connect directly with our sector directors to discuss your operating model, evaluate regulatory compliance, and build resilient workforce capabilities.
            </p>
          </div>
          <div className="cs-cta-editorial__actions">
            <Link href="/contact" className="cs-btn-primary">
              Schedule Discussion <ArrowRight size={15} />
            </Link>
            <Link href="/industry" className="cs-btn-text">
              Browse All Industries <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
