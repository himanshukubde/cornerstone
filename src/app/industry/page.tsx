import { ArrowRight, Building2, CheckCircle2, ChevronRight, Globe, Layers, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { industryData } from "@/data/navigation-data";
import "@/app/services/[slug]/service-detail.css";

export const metadata = {
  title: "Industry Solutions & Sector Expertise | CORNERSTONE",
  description:
    "Tailored consulting and talent solutions across Healthcare, Financial Services, Public Sector, Technology, Fortune 100, and Higher Education.",
};

export default function IndustryPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFE]">
      <SiteHeader />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#0B1120] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              'url("https://rgp.com/wp-content/uploads/2025/07/nav_Industry-Overview.jpg")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/90 to-[#0B1120]/60" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A5B4FC] font-semibold mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Industry</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.12]">
            Deep Domain Insight Across Global Ecosystems
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#CBD5E1] max-w-3xl leading-relaxed">
            Every industry faces unique regulatory pressures, competitive dynamics, and operational bottlenecks. At Cornerstone, our consultants are sector veterans who understand the specific nuances of your market.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#1A237E] hover:bg-[#121858] text-white px-10 py-3.5 font-bold text-xs uppercase tracking-[2px] transition-all rounded-none"
            >
              Consult an Industry Specialist <ArrowRight size={15} />
            </Link>
            <a
              href="#industry-sectors"
              className="inline-flex items-center gap-2 border border-white/60 bg-transparent hover:bg-white hover:text-[#1A237E] text-white px-10 py-3.5 font-bold text-xs uppercase tracking-[2px] transition-all rounded-none"
            >
              Explore Sectors
            </a>
          </div>
        </div>
      </section>

      {/* Global Impact Bar */}
      <section className="bg-[#121829] border-y border-white/10 text-white py-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-[#38BDF8]">17+</div>
            <div className="text-xs uppercase tracking-wider text-[#94A3B8] mt-1 font-medium">Distinct Industry Sectors</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-[#38BDF8]">37+</div>
            <div className="text-xs uppercase tracking-wider text-[#94A3B8] mt-1 font-medium">Countries Worldwide</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-[#38BDF8]">90%</div>
            <div className="text-xs uppercase tracking-wider text-[#94A3B8] mt-1 font-medium">Fortune 100 Penetration</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-[#38BDF8]">25+ Yrs</div>
            <div className="text-xs uppercase tracking-wider text-[#94A3B8] mt-1 font-medium">Consulting Excellence</div>
          </div>
        </div>
      </section>

      {/* Industry Sectors Grid */}
      <section id="industry-sectors" className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#455CB3]">Sector Solutions</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] mt-3 tracking-tight">
            Tailored Advisory for Every High-Stakes Environment
          </h2>
          <p className="mt-4 text-[#475569] text-lg">
            Select your industry sector below to see our specialized methodologies, regulatory capabilities, and proven case highlights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industryData.map((ind, index) => (
            <div
              key={ind.id}
              className="bg-white rounded-lg border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Header */}
                <div
                  className="relative h-48 bg-cover bg-center overflow-hidden"
                  style={{ backgroundImage: `url("${ind.img}")` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-[#1A237E]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                      Sector 0{index + 1}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-tight">
                      {ind.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <span className="text-xs uppercase tracking-wider text-[#455CB3] font-bold block mb-2">
                    {ind.subtitle}
                  </span>
                  <p className="text-[#475569] text-sm leading-relaxed mb-6 line-clamp-3">
                    {ind.tagline}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                    <span className="text-[11px] uppercase tracking-wider text-[#64748B] font-bold block">
                      Core Sub-Sectors ({ind.items.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.items.slice(0, 4).map((sub) => (
                        <span
                          key={sub.num}
                          className="text-[11px] font-medium bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0] px-2.5 py-1 rounded"
                        >
                          {sub.title}
                        </span>
                      ))}
                      {ind.items.length > 4 && (
                        <span className="text-[11px] font-bold text-[#1A237E] bg-[#EEF2FF] px-2 py-1 rounded">
                          +{ind.items.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-6 pt-0">
                <Link
                  href={`/industry/${ind.id}`}
                  className="w-full text-center flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-[#1A237E] text-[#1A237E] hover:text-white border border-[#E2E8F0] hover:border-[#1A237E] px-4 py-3 font-bold text-xs uppercase tracking-[2px] transition-all"
                >
                  Explore {ind.title} Practice <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Executive Consultation Strip - Clean Editorial Design */}
      <section className="cs-cta-editorial">
        <div className="cs-cta-editorial__inner">
          <div className="cs-cta-editorial__content">
            <span className="cs-cta-editorial__eyebrow">Sector Leadership</span>
            <h2 className="cs-cta-editorial__title">
              Facing Multi-Industry Regulatory or Operational Complexity?
            </h2>
            <p className="cs-cta-editorial__desc">
              Our cross-functional teams bring together clinical, financial, digital, and public policy practitioners to tackle hybrid transformation challenges.
            </p>
          </div>
          <div className="cs-cta-editorial__actions">
            <Link href="/contact" className="cs-btn-primary">
              Contact Industry Leaders <ArrowRight size={15} />
            </Link>
            <Link href="/services" className="cs-btn-text">
              Explore All Services <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
