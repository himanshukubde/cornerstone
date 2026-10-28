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

// ========================================================
// 1. SERVICES DATA (Directly from User Diagram & Excel)
// ========================================================
interface SubItem {
  num: string;
  title: string;
  desc: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  tagline: string;
  img: string;
  items: SubItem[];
}

const servicesData: ServiceCategory[] = [
  {
    id: "business-strategy",
    title: "Business Strategy and Transformation",
    tagline:
      "We partner with organizations to define strategic priorities, optimize operating models, and translate business objectives into measurable outcomes. From organizational design to transformation execution, we align people, processes, and capabilities to build resilient businesses positioned for sustainable growth.",
    img: "https://rgp.com/wp-content/uploads/2025/07/nav_Capabilities-Overview.jpg",
    items: [
      {
        num: "01",
        title: "Change & Transformation Management",
        desc: "Helping organizations navigate change, align teams, and translate strategic initiatives into effective execution.",
      },
      {
        num: "02",
        title: "Organizational Design & Human-Centered Solutions",
        desc: "Aligning organizational structures, roles, and workforce capabilities with business objectives and employee needs.",
      },
      {
        num: "03",
        title: "Research, Market Intelligence & Insights",
        desc: "Using market research, workforce intelligence, and data-driven insights to identify opportunities and inform strategic decisions.",
      },
      {
        num: "04",
        title: "Process Optimization & Automation",
        desc: "Improving workflows, reducing operational friction, and identifying opportunities to streamline processes through technology and automation.",
      },
      {
        num: "05",
        title: "Mergers, Integration & Workforce Alignment",
        desc: "Supporting organizational integration by aligning workforce structures, operating processes, and business priorities during periods of change.",
      },
      {
        num: "06",
        title: "Cost Optimization & Operational Efficiency",
        desc: "Identifying opportunities to manage workforce costs, improve resource allocation, and strengthen operational efficiency without losing sight of long-term business goals.",
      },
      {
        num: "07",
        title: "Supply Chain & Workforce Planning",
        desc: "Connecting workforce requirements, resource planning, and operational needs to help organizations respond to changing demand and business priorities.",
      },
    ],
  },
  {
    id: "finance-accounting",
    title: "Finance and Accounting",
    tagline:
      "We deliver integrated finance and accounting support that strengthens financial governance, enhances reporting accuracy, and improves operational efficiency. Through disciplined financial processes, informed tax planning, and greater visibility into business performance, we help organizations maintain financial integrity, navigate complexity, and make confident, well-informed decisions.",
    img: "https://rgp.com/wp-content/uploads/2025/07/nav_CSuite-Overview.jpg",
    items: [
      {
        num: "01",
        title: "Finance Transformation",
        desc: "Modernizing financial functions, strengthening operating models, and aligning finance capabilities with evolving business priorities.",
      },
      {
        num: "02",
        title: "Accounting Operations & Technical Advisory",
        desc: "Enhancing accounting accuracy, strengthening financial controls, and addressing complex accounting requirements through disciplined execution and technical expertise.",
      },
      {
        num: "03",
        title: "Tax Strategy & Treasury Management",
        desc: "Supporting effective tax planning, treasury operations, and financial risk management to promote compliance, liquidity, and long-term financial stability.",
      },
      {
        num: "04",
        title: "Financial Reporting & Regulatory Disclosure",
        desc: "Delivering accurate, transparent, and timely financial reporting that supports regulatory obligations, stakeholder confidence, and sound corporate governance.",
      },
      {
        num: "05",
        title: "Financial Planning & Analysis",
        desc: "Turning financial data into actionable insight through budgeting, forecasting, performance analysis, and strategic decision support.",
      },
      {
        num: "06",
        title: "Strategic Sourcing & Procurement",
        desc: "Optimizing procurement strategies, supplier relationships, and spending decisions to improve cost efficiency, strengthen value, and support sustainable business performance.",
      },
    ],
  },
  {
    id: "digital-strategy",
    title: "Digital Strategy and Innovation",
    tagline:
      "Digital strategy is about aligning technology with business vision to create meaningful, measurable progress. At Cornerstone, we help organizations identify emerging opportunities, modernize digital capabilities, and translate innovative ideas into practical business outcomes. By bringing together strategic insight, data intelligence, technology, and operational understanding, we enable businesses to adapt with confidence, improve efficiency, and respond to an evolving marketplace.",
    img: "https://rgp.com/wp-content/uploads/2025/07/nav_Technology-Overview.jpg",
    items: [
      {
        num: "01",
        title: "Digital Transformation & Modernization",
        desc: "Communicates the evolution of digital platforms, business processes, and organizational capabilities.",
      },
      {
        num: "02",
        title: "Technology Strategy & Advisory",
        desc: "Positions Cornerstone as a strategic partner that aligns technology investments with business priorities, rather than simply implementing tools.",
      },
      {
        num: "03",
        title: "Data Intelligence & Analytics",
        desc: "Elevates the emphasis from reporting and analysis to actionable insights, informed decisions, and business intelligence.",
      },
      {
        num: "04",
        title: "AI Strategy & Intelligent Solutions",
        desc: "Sounds forward-looking and business-oriented, covering practical AI adoption, intelligent automation, and the integration of AI into business operations.",
      },
    ],
  },
  {
    id: "workforce-compliance",
    title: "Workforce Compliance & Risk Advisory",
    tagline:
      "At Cornerstone, we help organizations navigate the complexities of workforce compliance, regulatory obligations, and operational risk with precision and foresight. Our approach brings structure to employment practices, worker classification, immigration processes, tax-related requirements, and workforce documentation, helping businesses strengthen internal controls and maintain alignment with applicable regulations.",
    img: "https://rgp.com/wp-content/uploads/2025/07/nav_Industry-Overview.jpg",
    items: [
      {
        num: "01",
        title: "Technology & Operational Risk Management",
        desc: "Communicates a structured approach to identifying technology-related vulnerabilities, operational risks, and business continuity challenges.",
      },
      {
        num: "02",
        title: "Risk Assurance & Internal Controls",
        desc: "Emphasizes accountability, control effectiveness, risk assessment, and confidence in organizational processes.",
      },
      {
        num: "03",
        title: "Internal Controls & SOX Compliance",
        desc: "Positions the service around financial control frameworks, compliance readiness, and the reliability of financial reporting.",
      },
      {
        num: "04",
        title: "Regulatory Compliance & Advisory",
        desc: "Conveys support in interpreting regulatory obligations, strengthening compliance processes, and aligning business practices with applicable requirements.",
      },
    ],
  },
];

// ========================================================
// 2. INDUSTRY DATA (From Diagram & Excel)
// ========================================================
interface IndustryCategory {
  id: string;
  title: string;
  subtitle?: string;
  tagline: string;
  img: string;
  items: SubItem[];
}

const industryData: IndustryCategory[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    subtitle: "Across the Healthcare Ecosystem",
    tagline:
      "At Cornerstone, we support the diverse needs of the healthcare industry through integrated talent solutions, workforce strategy, technology enablement, financial operations, and compliance advisory. From hospitals and health systems to pharmaceutical companies, medical device manufacturers, laboratories, and health technology providers, we help organizations strengthen their workforce, streamline operations, navigate regulatory requirements, and adapt to evolving industry demands. By bringing together specialized talent, data-driven insights, and operational expertise, we help healthcare organizations build resilient teams, improve organizational effectiveness, and deliver sustainable value in a sector where precision, trust, and continuity matter.",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
    items: [
      {
        num: "01",
        title: "Healthcare Payers",
        desc: "We help health insurers and payer organizations improve operational performance, strengthen claims management, and modernize business processes. From commercial insurance to government-sponsored healthcare programs, our support spans workforce solutions, technology, financial operations, and compliance, enabling more efficient operations and better experiences for members and employees.",
      },
      {
        num: "02",
        title: "Healthcare Providers",
        desc: "We support hospitals, health systems, clinics, and care delivery organizations in addressing complex workforce and operational demands. Through specialized talent, technology enablement, financial support, and compliance-focused services, we help providers strengthen their teams, streamline administrative processes, and build the capabilities needed to deliver consistent, high-quality care.",
      },
      {
        num: "03",
        title: "Integrated Delivery Networks (IDNs)",
        desc: "We help integrated delivery networks align workforce needs, operational processes, and organizational priorities across interconnected care settings. From talent planning and technology initiatives to financial operations and regulatory compliance, our approach supports greater coordination, resource efficiency, and sustainable performance across the healthcare continuum.",
      },
      {
        num: "04",
        title: "Pharmaceuticals & Biotechnology",
        desc: "We support pharmaceutical and biotechnology organizations across research, development, manufacturing, and commercialization. By connecting specialized talent with technology, operational expertise, and regulatory support, we help businesses navigate evolving requirements, strengthen execution, and build the capabilities needed to advance innovation and bring products to market.",
      },
      {
        num: "05",
        title: "Medical Devices & MedTech",
        desc: "We help medical device and MedTech organizations navigate complex regulatory environments, evolving technology demands, and quality-driven operations. From specialized talent and process improvement to compliance support, documentation, and digital capabilities, we help organizations strengthen operational readiness, manage risk, and support the development and commercialization of medical technologies.",
      },
      {
        num: "06",
        title: "Clinical Research & Life Sciences Services",
        desc: "We support contract research organizations (CROs), contract development and manufacturing organizations (CDMOs), contract manufacturing organizations (CMOs), and diagnostic service providers in scaling their capabilities and managing complex operational demands. Our services span talent acquisition, workforce planning, technology, financial operations, and compliance support, helping organizations strengthen delivery, maintain operational discipline, and adapt to changing industry requirements.",
      },
    ],
  },
  {
    id: "financial-services",
    title: "Financial Services",
    subtitle: "Supporting the Financial Ecosystem",
    tagline:
      "At Cornerstone, we support organizations across the financial ecosystem through integrated talent solutions, financial operations, technology enablement, strategic advisory, and regulatory compliance. From banks and insurance providers to investment firms, fintech companies, asset managers, and financial service organizations, we help businesses strengthen their workforce, modernize processes, improve financial visibility, and navigate evolving regulatory requirements. By combining industry insight, specialized expertise, data-driven decision-making, and operational discipline, we help financial institutions manage complexity, enhance efficiency, mitigate risk, and build resilient foundations for sustainable growth.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    items: [
      {
        num: "01",
        title: "Capital Markets",
        desc: "We help capital markets firms navigate complex financial operations, evolving regulations, and technology demands. Through specialized talent, risk-aware processes, and technology enablement, we support market operations, platform modernization, and business-critical initiatives with precision and accountability.",
      },
      {
        num: "02",
        title: "Wealth & Asset Management",
        desc: "We help wealth and asset management firms strengthen investment operations, modernize platforms, and improve the delivery of client services. By combining specialized talent, data-driven insights, and process optimization, we support operational efficiency and informed decision-making in a changing financial landscape.",
      },
      {
        num: "03",
        title: "Retail & Consumer Banking",
        desc: "We support banks as they evolve from traditional service models to connected, digital-first experiences. From workforce solutions and technology transformation to process improvement and compliance support, we help strengthen operational performance while keeping customer needs at the center.",
      },
      {
        num: "04",
        title: "Insurance",
        desc: "We help insurers modernize claims and underwriting operations, strengthen technology capabilities, and respond to changing regulatory requirements. Our integrated approach connects talent, process improvement, and digital enablement to support greater efficiency, stronger controls, and more responsive service delivery.",
      },
      {
        num: "05",
        title: "Private Equity",
        desc: "We work with private equity firms and their portfolio companies to strengthen operational capabilities and advance strategic priorities. From workforce planning and financial operations to technology enablement and business transformation, we help translate investment objectives into focused execution and sustainable value creation.",
      },
      {
        num: "06",
        title: "Payments & Fintech",
        desc: "We support payment providers and financial technology companies as they scale platforms, strengthen operational resilience, and navigate regulatory complexity. Through technology expertise, specialized talent, and process optimization, we help organizations improve delivery, manage risk, and adapt to the evolving demands of digital finance.",
      },
    ],
  },
  {
    id: "public-services",
    title: "Public Services",
    subtitle: "Public Sector Services",
    tagline:
      "At Cornerstone, we support public sector organizations in navigating complex workforce, operational, technological, and regulatory demands. From state and local government to federal agencies, public healthcare providers, and education systems, we bring together specialized talent, strategic insight, and operational expertise to address evolving institutional needs. Our approach focuses on strengthening workforce capabilities, improving service delivery, modernizing processes, and supporting responsible resource management. By aligning people, technology, and organizational priorities, we help public institutions build resilient operations, adapt to changing demands, and deliver lasting value to the communities they serve.",
    img: "https://images.unsplash.com/photo-1523292562811-8fa7962a471f?auto=format&fit=crop&w=900&q=80",
    items: [
      {
        num: "01",
        title: "State & Local Government Services",
        desc: "We support state and local government agencies in modernizing operations, strengthening financial and workforce management, and improving service delivery. By aligning people, processes, and technology with public priorities, we help agencies enhance operational efficiency, use resources responsibly, and deliver more responsive services to the communities they serve.",
      },
      {
        num: "02",
        title: "Public Healthcare & Education Systems",
        desc: "We work with public healthcare and education institutions to strengthen workforce capabilities, improve operational performance, and modernize essential services. Through talent solutions, technology enablement, process optimization, and compliance support, we help institutions navigate evolving demands while advancing service quality, accessibility, and long-term organizational resilience.",
      },
      {
        num: "03",
        title: "Federal Government Services",
        desc: "We support federal agencies in addressing complex workforce requirements, operational priorities, technology initiatives, and regulatory obligations. Our approach combines specialized talent, strategic insight, and disciplined execution to help agencies strengthen organizational capabilities, modernize business processes, and advance mission-critical objectives with accountability, efficiency, and a focus on public value.",
      },
    ],
  },
  {
    id: "technology",
    title: "Technology",
    subtitle: "Enterprise Tech & Cloud",
    tagline:
      "At Cornerstone, we partner with high-growth technology companies and enterprise software providers to scale operations, build high-performance technical teams, and accelerate time-to-market. From software engineering and cloud transformation to infrastructure modernization and customer success, we provide the specialized talent and operational discipline needed to thrive in competitive tech landscapes.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    items: [
      {
        num: "01",
        title: "Enterprise Software & SaaS",
        desc: "Scaling implementation talent, platform engineering, and enterprise customer onboarding with disciplined execution.",
      },
      {
        num: "02",
        title: "Cloud & Infrastructure Operations",
        desc: "Modernizing multi-cloud environments, architecture scalability, site reliability engineering, and DevSecOps processes.",
      },
      {
        num: "03",
        title: "Digital Product Acceleration",
        desc: "Translating innovative product roadmaps into high-impact digital solutions through agile engineering squads.",
      },
      {
        num: "04",
        title: "Data Intelligence & AI Platforms",
        desc: "Building scalable analytics foundations, ML pipelines, and actionable business intelligence capabilities.",
      },
    ],
  },
  {
    id: "fortune-100",
    title: "Fortune 100",
    subtitle: "Global Enterprise Advisory",
    tagline:
      "We deliver senior advisory, specialized talent solutions, and large-scale transformation management to world-leading global enterprises. Our practitioners combine deep domain knowledge with agile delivery to solve complex corporate challenges and drive sustainable long-term value.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    items: [
      {
        num: "01",
        title: "Global Program Execution",
        desc: "Managing high-stakes multi-entity programs, post-merger integration, and enterprise-wide transformation.",
      },
      {
        num: "02",
        title: "Executive Strategic Advisory",
        desc: "Cross-functional insights and senior counsel for corporate boards, CFOs, and transformation leaders.",
      },
      {
        num: "03",
        title: "Operational Resilience & Governance",
        desc: "Strengthening risk posture, regulatory compliance frameworks, and operating model agility across international entities.",
      },
      {
        num: "04",
        title: "Cost & Capital Optimization",
        desc: "Rationalizing enterprise spending, improving resource allocation, and unlocking capital agility.",
      },
    ],
  },
  {
    id: "universities",
    title: "Universities",
    subtitle: "Higher Education & Research",
    tagline:
      "We work with higher education institutions and university research systems to modernize administrative operations, streamline student service lifecycles, and strengthen institutional resilience amid shifting demographic and funding demands.",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80",
    items: [
      {
        num: "01",
        title: "Campus Operations & ERP Modernization",
        desc: "Upgrading core campus ERP platforms, finance workflows, and faculty management processes.",
      },
      {
        num: "02",
        title: "Research & Grant Administration",
        desc: "Strengthening sponsored project compliance, post-award accounting, and research grant reporting.",
      },
      {
        num: "03",
        title: "Student Lifecycle & Digital Services",
        desc: "Reimagining student enrollment, academic advising platforms, and digital credentialing experiences.",
      },
      {
        num: "04",
        title: "Institutional Planning & Finance",
        desc: "Developing multi-year financial sustainability models and strategic resource planning frameworks.",
      },
    ],
  },
  {
    id: "early-career",
    title: "Early Career",
    subtitle: "Accelerated Talent Development",
    tagline:
      "We connect ambitious emerging talent with premier enterprise career opportunities, structured mentorship, and hands-on consulting training designed to bridge the gap between academic education and high-impact corporate performance.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    items: [
      {
        num: "01",
        title: "Accelerated Talent Programs",
        desc: "Hands-on enterprise bootcamps and intensive skill development for high-potential early career professionals.",
      },
      {
        num: "02",
        title: "Mentorship & Corporate Placement",
        desc: "Pairing emerging talent with experienced industry mentors and high-visibility corporate engagements.",
      },
      {
        num: "03",
        title: "Practical Consulting Readiness",
        desc: "Equipping graduates with real-world project methodology, executive presentation, and analytical skills.",
      },
      {
        num: "04",
        title: "Fast-Track Leadership Pathways",
        desc: "Structured milestone-based progression towards senior advisory and specialized technical roles.",
      },
    ],
  },
];

// ========================================================
// 3. CAREERS DATA
// ========================================================
const careersData = {
  title: "Career at CORNERSTONE",
  tagline:
    "From strategy and finance to tech, risk, and operations, Cornerstone puts experienced people at the center of transformation. Redefine what's possible in your career.",
  img: "https://rgp.com/wp-content/uploads/2025/07/menu-careers.jpg",
  items: [
    {
      num: "01",
      title: "Careers at Cornerstone",
      desc: "Discover our culture of agility, excellence, and shared success.",
    },
    {
      num: "02",
      title: "Open Roles & Opportunities",
      desc: "Explore current openings across consulting, technology, and operations.",
    },
    {
      num: "03",
      title: "Dare to Work Differently",
      desc: "Join an elite community of practitioners delivering real-world impact.",
    },
    {
      num: "04",
      title: "Grow Your Career",
      desc: "Continuous learning, leadership pathways, and impactful client projects.",
    },
  ],
};

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(0);
  const [hoveredServiceSubItem, setHoveredServiceSubItem] = useState<SubItem | null>(null);
  const [activeIndustryIndex, setActiveIndustryIndex] = useState<number | null>(0);
  const [hoveredIndustrySubItem, setHoveredIndustrySubItem] = useState<SubItem | null>(null);
  const [hoveredCareerItem, setHoveredCareerItem] = useState<{ num: string; title: string; desc: string } | null>(null);
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
    setHoveredServiceSubItem(null);
    setHoveredIndustrySubItem(null);
    setHoveredCareerItem(null);
  };

  const currentService =
    activeServiceIndex !== null && servicesData[activeServiceIndex]
      ? servicesData[activeServiceIndex]
      : servicesData[0];
  const currentIndustry =
    activeIndustryIndex !== null && industryData[activeIndustryIndex]
      ? industryData[activeIndustryIndex]
      : industryData[0];

  return (
    <>
      <div ref={headerRef}>
        <header
          className={`rgp-site-header-container ${scrolled ? "is-scrolled" : ""
            }`}
        >
          <div className="rgp-header-inner">
            {/* Cornerstone Logo */}
            <Link href="/" className="rgp-brand-logo" aria-label="Cornerstone Home">
              <CornerstoneLogo variant="dark" height={22} />
            </Link>

            {/* Desktop Navigation - EXACTLY 4 MENUS FROM USER DIAGRAM */}
            <nav aria-label="Main Navigation">
              <ul className="rgp-primary-nav">
                {/* 1. Services */}
                <li className="rgp-nav-item">
                  <button
                    type="button"
                    className={`rgp-nav-btn ${openMenu === "services" ? "is-active" : ""
                      }`}
                    onClick={() => toggleMenu("services")}
                  >
                    <span className="rgp-nav-text">Services</span>
                    <ChevronDown size={14} className="rgp-nav-chevron" />
                  </button>
                </li>

                {/* 2. Industry */}
                <li className="rgp-nav-item">
                  <button
                    type="button"
                    className={`rgp-nav-btn ${openMenu === "industry" ? "is-active" : ""
                      }`}
                    onClick={() => toggleMenu("industry")}
                  >
                    <span className="rgp-nav-text">Industry</span>
                    <ChevronDown size={14} className="rgp-nav-chevron" />
                  </button>
                </li>

                {/* 3. Assessment & Enrollment */}
                <li className="rgp-nav-item">
                  <a
                    href="#assessment-enrollment"
                    className="rgp-nav-btn"
                    onClick={() => setOpenMenu(null)}
                  >
                    <span className="rgp-nav-text">Assessment &amp; Enrollment</span>
                  </a>
                </li>

                {/* 4. Career at CORNERSTONE */}
                <li className="rgp-nav-item">
                  <button
                    type="button"
                    className={`rgp-nav-btn ${openMenu === "careers" ? "is-active" : ""
                      }`}
                    onClick={() => toggleMenu("careers")}
                  >
                    <span className="rgp-nav-text">Career at CORNERSTONE</span>
                    <ChevronDown size={14} className="rgp-nav-chevron" />
                  </button>
                </li>

                {/* Search Icon */}
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

                {/* Jobs Button */}
                <li className="rgp-nav-item">
                  <Link href="/contact" className="rgp-jobs-button">
                    <span className="rgp-jobs-indicator" />
                    <span>JOBS</span>
                  </Link>
                </li>

                {/* Contact Button */}
                <li className="rgp-nav-item">
                  <Link href="/contact" className="rgp-contact-button">
                    CONTACT
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Mobile Nav Toggle (Hidden on desktop, clean icon on mobile) */}
            <div className="rgp-mobile-actions">
              <button
                type="button"
                className="rgp-mobile-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Semi-transparent Backdrop for Mega-Menu */}
          {openMenu && (
            <div
              className="rgp-mega-backdrop"
              onClick={() => setOpenMenu(null)}
              aria-hidden="true"
            />
          )}

          {/* ======================================================== */}
          {/* 1. SERVICES MEGA-MENU (Exact RGP Layout & Typography)   */}
          {/* ======================================================== */}
          {openMenu === "services" && (
            <div className="rgp-mega-panel">
              <div className="rgp-mega-inner">
                {/* [X] Close button */}
                <button
                  type="button"
                  className="rgp-mega-close-btn"
                  onClick={() => setOpenMenu(null)}
                  aria-label="Close menu"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>

                {/* Eyebrow */}
                <Link
                  href="/services"
                  onClick={() => setOpenMenu(null)}
                  className="rgp-mega-eyebrow hover:text-[#1A237E] transition-colors"
                >
                  <span>SERVICES OVERVIEW</span>
                  <ArrowRight size={13} />
                </Link>

                {/* Two Column Layout */}
                <div className="rgp-mega-columns">
                  {/* Left Column: Services with Accordion Controls */}
                  <div className="rgp-accordion-col menu-column">
                    {servicesData.map((service, index) => {
                      const isOpen = activeServiceIndex === index;
                      return (
                        <div key={service.id} className="rgp-accordion-item">
                          <button
                            type="button"
                            className={`menu-item-accordion-control rgp-accordion-header ${
                              isOpen ? "active is-open" : ""
                            }`}
                            onClick={() => {
                              setActiveServiceIndex((prev) =>
                                prev === index ? null : index
                              );
                              setHoveredServiceSubItem(null);
                            }}
                          >
                            <span>{service.title}</span>
                            <ChevronDown
                              size={20}
                              strokeWidth={1.5}
                              className="accordion-chevron"
                            />
                          </button>

                          {/* Nested Sub-items (RGP Accordion) */}
                          {isOpen && (
                            <div className="menu-item-accordion rgp-accordion-subitems">
                              <ul>
                                {service.items.map((item) => (
                                  <li key={item.num}>
                                    <Link
                                      href={`/services/${service.id}`}
                                      onClick={() => setOpenMenu(null)}
                                      onMouseEnter={() =>
                                        setHoveredServiceSubItem(item)
                                      }
                                      onMouseLeave={() =>
                                        setHoveredServiceSubItem(null)
                                      }
                                      className={`rgp-accordion-subitem-link ${
                                        hoveredServiceSubItem?.num === item.num
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <span>{item.title}</span>
                                      <ArrowRight size={15} strokeWidth={1.5} />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Active Service Details & Preview */}
                  <div className="menu-featured-article rgp-featured-col">
                    <div className="menu-featured-article__img rgp-featured-img-wrap">
                      <img
                        src={currentService.img}
                        alt={currentService.title}
                        className="rgp-featured-img"
                      />
                    </div>
                    <div className="menu-featured-article__title rgp-featured-title-wrap">
                      <Link
                        href={`/services/${currentService.id}`}
                        onClick={() => setOpenMenu(null)}
                        className="rgp-featured-title"
                      >
                        {hoveredServiceSubItem
                          ? hoveredServiceSubItem.title
                          : currentService.title}
                      </Link>
                    </div>
                    <div className="menu-featured-article__blurb rgp-featured-desc">
                      <p>
                        {hoveredServiceSubItem
                          ? hoveredServiceSubItem.desc
                          : currentService.tagline}
                      </p>
                    </div>
                    <div className="menu-featured-article__btn">
                      <Link
                        href={`/services/${currentService.id}`}
                        onClick={() => setOpenMenu(null)}
                        className="rgp-featured-btn"
                      >
                        EXPLORE {currentService.title.toUpperCase()}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. INDUSTRY MEGA-MENU (Exact RGP Layout & Typography)   */}
          {/* ======================================================== */}
          {openMenu === "industry" && (
            <div className="rgp-mega-panel">
              <div className="rgp-mega-inner">
                <button
                  type="button"
                  className="rgp-mega-close-btn"
                  onClick={() => setOpenMenu(null)}
                  aria-label="Close menu"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
                <Link
                  href="/industry"
                  onClick={() => setOpenMenu(null)}
                  className="rgp-mega-eyebrow hover:text-[#1A237E] transition-colors"
                >
                  <span>INDUSTRY OVERVIEW</span>
                  <ArrowRight size={13} />
                </Link>
                <div className="rgp-mega-columns">
                  {/* Left Column: 7 Industries with Nested Sub-items */}
                  <div className="rgp-accordion-col menu-column">
                    {industryData.map((ind, index) => {
                      const isOpen = activeIndustryIndex === index;
                      return (
                        <div
                          key={ind.id}
                          className="rgp-accordion-item"
                          style={
                            index === 3
                              ? {
                                  marginTop: "8px",
                                  paddingTop: "8px",
                                  borderTop: "1px solid #E5E7EB",
                                }
                              : undefined
                          }
                        >
                          <button
                            type="button"
                            className={`menu-item-accordion-control rgp-accordion-header ${
                              isOpen ? "active is-open" : ""
                            }`}
                            onClick={() => {
                              setActiveIndustryIndex((prev) =>
                                prev === index ? null : index
                              );
                              setHoveredIndustrySubItem(null);
                            }}
                          >
                            <span>{ind.title}</span>
                            <ChevronDown
                              size={20}
                              strokeWidth={1.5}
                              className="accordion-chevron"
                            />
                          </button>

                          {/* Nested Sub-items (RGP Accordion) */}
                          {isOpen && (
                            <div className="menu-item-accordion rgp-accordion-subitems">
                              <ul>
                                {ind.items.map((item) => (
                                  <li key={item.num}>
                                    <Link
                                      href={`/industry/${ind.id}`}
                                      onClick={() => setOpenMenu(null)}
                                      onMouseEnter={() =>
                                        setHoveredIndustrySubItem(item)
                                      }
                                      onMouseLeave={() =>
                                        setHoveredIndustrySubItem(null)
                                      }
                                      className={`rgp-accordion-subitem-link ${
                                        hoveredIndustrySubItem?.num === item.num
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <span>{item.title}</span>
                                      <ArrowRight size={15} strokeWidth={1.5} />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Active Industry Overview & Preview */}
                  <div className="menu-featured-article rgp-featured-col">
                    <div className="menu-featured-article__img rgp-featured-img-wrap">
                      <img
                        src={currentIndustry.img}
                        alt={currentIndustry.title}
                        className="rgp-featured-img"
                      />
                    </div>
                    <div className="menu-featured-article__title rgp-featured-title-wrap">
                      {currentIndustry.subtitle && (
                        <span className="menu-featured-article__eyebrow rgp-featured-eyebrow">
                          {currentIndustry.subtitle}
                        </span>
                      )}
                      <Link
                        href={`/industry/${currentIndustry.id}`}
                        onClick={() => setOpenMenu(null)}
                        className="rgp-featured-title"
                      >
                        {hoveredIndustrySubItem
                          ? hoveredIndustrySubItem.title
                          : currentIndustry.title}
                      </Link>
                    </div>
                    <div className="menu-featured-article__blurb rgp-featured-desc">
                      <p>
                        {hoveredIndustrySubItem
                          ? hoveredIndustrySubItem.desc
                          : currentIndustry.tagline}
                      </p>
                    </div>
                    <div className="menu-featured-article__btn">
                      <Link
                        href={`/industry/${currentIndustry.id}`}
                        onClick={() => setOpenMenu(null)}
                        className="rgp-featured-btn"
                      >
                        EXPLORE {currentIndustry.title.toUpperCase()}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. CAREER AT CORNERSTONE MEGA-MENU                      */}
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
                  <X size={18} strokeWidth={1.5} />
                </button>
                <Link
                  href="/contact"
                  onClick={() => setOpenMenu(null)}
                  className="rgp-mega-eyebrow hover:text-[#1A237E] transition-colors"
                >
                  <span>CAREERS AT CORNERSTONE</span>
                  <ArrowRight size={13} />
                </Link>
                <div className="rgp-mega-columns">
                  <div className="rgp-accordion-col menu-column">
                    {careersData.items.map((item) => (
                      <div key={item.num} className="rgp-accordion-item">
                        <Link
                          href="/contact"
                          onClick={() => setOpenMenu(null)}
                          onMouseEnter={() => setHoveredCareerItem(item)}
                          onMouseLeave={() => setHoveredCareerItem(null)}
                          className={`menu-item-accordion-control rgp-accordion-header ${
                            hoveredCareerItem?.num === item.num
                              ? "active is-open"
                              : ""
                          }`}
                        >
                          <span>{item.title}</span>
                          <ArrowRight size={20} strokeWidth={1.5} />
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="menu-featured-article rgp-featured-col">
                    <div className="menu-featured-article__img rgp-featured-img-wrap">
                      <img
                        src={careersData.img}
                        alt={careersData.title}
                        className="rgp-featured-img"
                      />
                    </div>
                    <div className="menu-featured-article__title rgp-featured-title-wrap">
                      <Link
                        href="/contact"
                        onClick={() => setOpenMenu(null)}
                        className="rgp-featured-title"
                      >
                        {hoveredCareerItem
                          ? hoveredCareerItem.title
                          : careersData.title}
                      </Link>
                    </div>
                    <div className="menu-featured-article__blurb rgp-featured-desc">
                      <p>
                        {hoveredCareerItem
                          ? hoveredCareerItem.desc
                          : careersData.tagline}
                      </p>
                    </div>
                    <div className="menu-featured-article__btn">
                      <Link
                        href="/contact"
                        onClick={() => setOpenMenu(null)}
                        className="rgp-featured-btn"
                      >
                        EXPLORE OPPORTUNITIES
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* REGIONS DROPDOWN                                         */}
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
                ["Services", "/services"],
                ["Industry", "/industry"],
                ["Assessment & Enrollment", "/services/workforce-compliance"],
                ["Career at CORNERSTONE", "/contact"],
                ["Jobs", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-lg font-bold py-3 border-b border-gray-100 flex items-center justify-between text-gray-900 hover:text-[#1A237E]"
                >
                  {label}
                  <ArrowRight size={18} />
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-6">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full bg-[#1A237E] text-white py-3.5 font-heading font-bold uppercase tracking-widest text-center block rounded-[3px] shadow-md"
              >
                CONTACT
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SiteHeader;
