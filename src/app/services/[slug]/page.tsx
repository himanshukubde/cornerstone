import { notFound } from "next/navigation";
import Link from "next/link";
import {
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
  Target,
  Users,
  Zap,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { servicesData } from "@/data/navigation-data";
import "./service-detail.css";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);
  if (!service) return { title: "Service | CORNERSTONE" };

  return {
    title: `${service.title} | CORNERSTONE Capabilities`,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const otherServices = servicesData.filter((s) => s.id !== slug);

  return (
    <main className="cs-detail-page">
      <SiteHeader />

      {/* 1. HERO BANNER (Generous 155px padding-top to eliminate fixed header overlap) */}
      <section className="cs-detail-hero">
        <div
          className="cs-detail-hero__bg"
          style={{ backgroundImage: `url("${service.img}")` }}
        />
        <div className="cs-detail-hero__glow" />

        <div className="cs-detail-hero__inner">
          {/* Breadcrumb */}
          <nav className="cs-detail-hero__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} />
            <Link href="/services">Services</Link>
            <ChevronRight size={13} />
            <span className="text-white">{service.shortTitle}</span>
          </nav>

          <div className="cs-detail-hero__badge">
            <span className="cs-detail-hero__dot" />
            ENTERPRISE PRACTICE & SOLUTIONS
          </div>

          <h1 className="cs-detail-hero__title">
            {service.title}
          </h1>

          <p className="cs-detail-hero__subtitle">
            {service.tagline}
          </p>

          <div className="cs-detail-hero__actions">
            <Link href="/contact" className="cs-btn-hero-primary">
              Engage Practice Leadership <ArrowRight size={15} />
            </Link>
            <Link href="/services" className="cs-btn-secondary">
              <ArrowLeft size={15} /> All Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="cs-detail-stats">
        <div className="cs-detail-stats__inner">
          {service.stats.map((stat) => (
            <div key={stat.label} className="cs-detail-stat-card">
              <div className="cs-detail-stat-card__val">{stat.value}</div>
              <div className="cs-detail-stat-card__label">{stat.label}</div>
              <div className="cs-detail-stat-card__desc">Verified enterprise client impact</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MAIN CONTENT LAYOUT */}
      <div className="cs-detail-layout">
        {/* Left Column */}
        <div className="cs-detail-main">
          {/* Strategic Mandate Card */}
          <section className="cs-mandate-card">
            <span className="cs-mandate-card__eyebrow">Strategic Mandate</span>
            <h2 className="cs-mandate-card__title">
              Why Forward-Thinking Leaders Choose Cornerstone
            </h2>
            <p className="cs-mandate-card__text">
              {service.overview}
            </p>

            <div className="cs-mandate-pillars">
              <div className="cs-pillar-item">
                <CheckCircle2 size={20} className="cs-pillar-item__icon" />
                <div>
                  <h4 className="cs-pillar-item__title">Senior Practitioner Co-Delivery</h4>
                  <p className="cs-pillar-item__desc">
                    Direct oversight and execution by former Big 4 partners and corporate executives who have operated inside your shoes.
                  </p>
                </div>
              </div>

              <div className="cs-pillar-item">
                <CheckCircle2 size={20} className="cs-pillar-item__icon" />
                <div>
                  <h4 className="cs-pillar-item__title">Outcome-Linked Execution</h4>
                  <p className="cs-pillar-item__desc">
                    Every project is structured around measurable ROI, milestone accountability, and permanent capability enablement.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sub-Capabilities Detailed Breakdown */}
          <section className="cs-capabilities-section">
            <div className="cs-capabilities-header">
              <span className="cs-capabilities-header__eyebrow">In-Depth Modules</span>
              <h2 className="cs-capabilities-header__title">
                Specialized Practice Areas & Capabilities
              </h2>
            </div>

            <div className="cs-subcaps-list">
              {service.items.map((item) => (
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
              How We Partner with Your Organization
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Whether you require strategic direction, end-to-end execution squads, or specialized interim leadership, our hybrid delivery model scales to your exact needs.
            </p>

            <div className="cs-delivery-grid">
              <div className="cs-delivery-card">
                <div className="cs-delivery-card__icon">
                  <Compass size={20} />
                </div>
                <h4 className="cs-delivery-card__title">Advisory & Roadmapping</h4>
                <p className="cs-delivery-card__desc">
                  Current-state diagnostic, target operating model design, and strategic sequencing for executive sponsors.
                </p>
              </div>

              <div className="cs-delivery-card">
                <div className="cs-delivery-card__icon">
                  <Users size={20} />
                </div>
                <h4 className="cs-delivery-card__title">Project Execution Teams</h4>
                <p className="cs-delivery-card__desc">
                  Turnkey cross-functional squads deploying hands-on to accelerate complex technical and operational transformations.
                </p>
              </div>

              <div className="cs-delivery-card">
                <div className="cs-delivery-card__icon">
                  <Zap size={20} />
                </div>
                <h4 className="cs-delivery-card__title">On-Demand Subject Experts</h4>
                <p className="cs-delivery-card__desc">
                  Rapid deployment of senior specialists to bridge critical talent gaps and strengthen internal capabilities.
                </p>
              </div>
            </div>
          </section>

          {/* Key Deliverables & Artifacts */}
          <section className="cs-deliverables-card">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#A5B4FC]">
              Tangible Artifacts
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
              Signature Deliverables of This Practice
            </h2>
            <div className="cs-deliverables-grid">
              {service.deliverables.map((deliv, idx) => (
                <div key={idx} className="cs-deliverable-item">
                  <FileCheck size={18} className="text-[#38BDF8] shrink-0 mt-0.5" />
                  <span className="cs-deliverable-item__text">{deliv}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sticky Sidebar */}
        <aside className="cs-sidebar-sticky">
          {/* Direct Consultation Card */}
          <div className="cs-scoping-card">
            <span className="cs-scoping-card__eyebrow">Practice Leadership</span>
            <h3 className="cs-scoping-card__title">
              Request a Technical Scoping Session
            </h3>
            <p className="cs-scoping-card__desc">
              Connect directly with our {service.shortTitle} team to evaluate your current challenges and design a custom deployment plan.
            </p>

            <Link href="/contact" className="cs-scoping-card__btn">
              Contact Practice Lead <ArrowRight size={15} />
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
                <span>Backed by 25+ years of enterprise excellence</span>
              </div>
            </div>
          </div>

          {/* Other Practices Navigation Card */}
          <div className="cs-other-practices-card">
            <h4 className="cs-other-practices-card__title">
              Other Core Practices
            </h4>
            <div className="space-y-1">
              {otherServices.map((other) => (
                <Link
                  key={other.id}
                  href={`/services/${other.id}`}
                  className="cs-other-practice-link"
                >
                  <span>{other.shortTitle}</span>
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
            <Link href="/services" className="cs-btn-text">
              Browse All Capabilities <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
