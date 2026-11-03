export interface SubItem {
  num: string;
  title: string;
  desc: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  overview: string;
  iconName: string;
  img: string;
  stats: { value: string; label: string }[];
  deliverables: string[];
  items: SubItem[];
}

export interface IndustryCategory {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  overview: string;
  img: string;
  stats: { value: string; label: string }[];
  keyChallenges: string[];
  solutions: string[];
  items: SubItem[];
}

export const servicesData: ServiceCategory[] = [
  {
    id: "business-strategy",
    title: "Business Strategy and Transformation",
    shortTitle: "Strategy & Transformation",
    tagline:
      "We partner with organizations to define strategic priorities, optimize operating models, and translate business objectives into measurable outcomes.",
    overview:
      "From organizational design to transformation execution, we align people, processes, and capabilities to build resilient businesses positioned for sustainable growth. In a business environment characterized by rapid disruption, successful enterprises require more than advisory slides—they require pragmatic execution partners who have led transformations from within.",
    iconName: "TrendingUp",
    img: "/images/nav/nav-capabilities.jpg",
    stats: [
      { value: "45%", label: "Average Acceleration in Time-to-Value" },
      { value: "98%", label: "Enterprise Project Completion Rate" },
      { value: "500+", label: "Global Transformations Executed" },
      { value: "$1.2B+", label: "Measurable Value Delivered to Clients" },
    ],
    deliverables: [
      "Operating Model Redesign & Governance Architecture",
      "Enterprise Change Readiness & Stakeholder Alignment",
      "Process Automation & Workflow Friction Reduction",
      "Post-Merger Integration & Cultural Harmonization",
      "Workforce Cost Optimization & Resource Allocation",
    ],
    items: [
      {
        num: "01",
        title: "Change & Transformation Management",
        desc: "Helping organizations navigate change, align teams, and translate strategic initiatives into effective execution with proven human-centered frameworks.",
      },
      {
        num: "02",
        title: "Organizational Design & Human-Centered Solutions",
        desc: "Aligning organizational structures, roles, and workforce capabilities with business objectives and evolving employee expectations.",
      },
      {
        num: "03",
        title: "Research, Market Intelligence & Insights",
        desc: "Using rigorous market research, competitor benchmarking, and workforce intelligence to inform strategic decisions.",
      },
      {
        num: "04",
        title: "Process Optimization & Automation",
        desc: "Improving operational workflows, reducing organizational friction, and streamlining operations through modern intelligent automation.",
      },
      {
        num: "05",
        title: "Mergers, Integration & Workforce Alignment",
        desc: "Supporting seamless organizational integration by unifying workforce structures, cultures, and operating standards during complex M&A.",
      },
      {
        num: "06",
        title: "Cost Optimization & Operational Efficiency",
        desc: "Managing workforce costs, improving resource allocation, and strengthening operational efficiency without sacrificing long-term capabilities.",
      },
      {
        num: "07",
        title: "Supply Chain & Workforce Planning",
        desc: "Connecting enterprise workforce requirements, procurement logistics, and operational needs to respond to dynamic market demand.",
      },
    ],
  },
  {
    id: "finance-accounting",
    title: "Finance and Accounting",
    shortTitle: "Finance & Accounting",
    tagline:
      "We deliver integrated finance and accounting support that strengthens financial governance, enhances reporting accuracy, and improves operational efficiency.",
    overview:
      "Through disciplined financial processes, informed tax planning, and greater visibility into business performance, we help organizations maintain financial integrity, navigate complexity, and make confident, well-informed decisions. Our senior accounting practitioners and former Big 4 partners bring deep technical mastery combined with practical industry experience.",
    iconName: "DollarSign",
    img: "/images/nav/nav-csuite.jpg",
    stats: [
      { value: "90%", label: "Of Fortune 100 CFOs Rely on Our Experts" },
      { value: "30%", label: "Average Reduction in Month-End Close Cycle" },
      { value: "100%", label: "Audit Readiness & SOX Compliance Record" },
      { value: "1,200+", label: "Senior Accounting Engagements Completed" },
    ],
    deliverables: [
      "Finance 4.0 Operating Model & Shared Services Design",
      "Technical Accounting Memoranda & GAAP/IFRS Advisory",
      "Tax Strategy, Transfer Pricing & Global Treasury Operations",
      "Automated Financial Planning & Real-Time Analytics Dashboards",
      "Strategic Sourcing & Vendor Spend Optimization",
    ],
    items: [
      {
        num: "01",
        title: "Finance Transformation",
        desc: "Modernizing financial functions, strengthening operating models, and aligning finance capabilities with strategic business growth.",
      },
      {
        num: "02",
        title: "Accounting Operations & Technical Advisory",
        desc: "Enhancing accounting accuracy, strengthening financial controls, and addressing complex accounting standards (ASC 606, 842, CECL).",
      },
      {
        num: "03",
        title: "Tax Strategy & Treasury Management",
        desc: "Supporting tax planning, liquidity management, foreign exchange hedging, and capital risk management for long-term stability.",
      },
      {
        num: "04",
        title: "Financial Reporting & Regulatory Disclosure",
        desc: "Delivering accurate, transparent, and timely SEC financial reporting that supports regulatory compliance and investor confidence.",
      },
      {
        num: "05",
        title: "Financial Planning & Analysis",
        desc: "Turning raw financial data into strategic insight through rolling forecasts, scenario modeling, and KPI tracking.",
      },
      {
        num: "06",
        title: "Strategic Sourcing & Procurement",
        desc: "Optimizing procurement strategies, contract negotiations, and supplier spend to improve cost efficiency and working capital.",
      },
    ],
  },
  {
    id: "digital-strategy",
    title: "Digital Strategy and Innovation",
    shortTitle: "Digital & Technology",
    tagline:
      "Digital strategy is about aligning technology with business vision to create meaningful, measurable progress across modern enterprise ecosystems.",
    overview:
      "At Cornerstone, we help organizations identify emerging opportunities, modernize digital capabilities, and translate innovative technology investments into practical business outcomes. By bringing together strategic insight, data intelligence, cloud technology, and operational understanding, we enable businesses to adapt with speed and confidence.",
    iconName: "Cpu",
    img: "/images/nav/nav-technology.jpg",
    stats: [
      { value: "3.5x", label: "Speed-to-Production for Enterprise Cloud Initiatives" },
      { value: "60%", label: "Reduction in Legacy Technical Debt" },
      { value: "350+", label: "Cloud & AI Deployments Delivered" },
      { value: "99.9%", label: "Uptime on Mission-Critical Architecture" },
    ],
    deliverables: [
      "Enterprise Cloud & Hybrid Infrastructure Migration",
      "Practical Generative AI & Automation Frameworks",
      "Data Governance, Lakehouse & Business Intelligence Architecture",
      "Legacy Core Application Modernization & Microservices",
      "Technology Vendor Selection & ROI Validation",
    ],
    items: [
      {
        num: "01",
        title: "Digital Transformation & Modernization",
        desc: "Modernizing digital platforms, software architectures, and team capabilities for agile, cloud-native delivery.",
      },
      {
        num: "02",
        title: "Technology Strategy & Advisory",
        desc: "Partnering with CIOs and CTOs to align digital investments directly with business milestones and revenue goals.",
      },
      {
        num: "03",
        title: "Data Intelligence & Analytics",
        desc: "Elevating enterprise data from disconnected reports to unified, real-time dashboards and predictive decision engines.",
      },
      {
        num: "04",
        title: "AI Strategy & Intelligent Solutions",
        desc: "Pragmatic AI adoption, automated intelligent workflows, and enterprise-grade LLM governance that drive real operational savings.",
      },
    ],
  },
  {
    id: "workforce-compliance",
    title: "Workforce Compliance & Risk Advisory",
    shortTitle: "Compliance & Risk",
    tagline:
      "We help organizations navigate the complexities of workforce compliance, regulatory obligations, and operational risk with precision and foresight.",
    overview:
      "Our approach brings structure to employment practices, worker classification, internal audit, cybersecurity risk, tax requirements, and workforce documentation. We help businesses strengthen internal controls and maintain alignment with rapidly shifting domestic and global regulations, protecting enterprise reputation and shareholder value.",
    iconName: "ShieldCheck",
    img: "/images/nav/nav-industry.jpg",
    stats: [
      { value: "100%", label: "Regulatory Compliance Audit Clearance" },
      { value: "70%", label: "Reduction in Compliance Friction & Exceptions" },
      { value: "2,500+", label: "Global Worker Classifications Audited" },
      { value: "0", label: "Material Deficiencies on Cornerstone-Managed SOX Audits" },
    ],
    deliverables: [
      "SOX 404 & Internal Financial Controls Testing Frameworks",
      "Enterprise Technology & Operational Risk Assessment",
      "Independent Regulatory Examination Preparation & Remediations",
      "Contingent Workforce Classification & Compliance Auditing",
      "Cybersecurity, Privacy (GDPR/CCPA) & Data Governance Protocols",
    ],
    items: [
      {
        num: "01",
        title: "Technology & Operational Risk Management",
        desc: "Structured methodologies to identify technology vulnerabilities, third-party operational dependencies, and business continuity gaps.",
      },
      {
        num: "02",
        title: "Risk Assurance & Internal Controls",
        desc: "Emphasizing accountability, control effectiveness, and organizational resilience through continuous monitoring and testing.",
      },
      {
        num: "03",
        title: "Internal Controls & SOX Compliance",
        desc: "Comprehensive readiness, testing, and remediation for Sarbanes-Oxley compliance and internal audit assurance.",
      },
      {
        num: "04",
        title: "Regulatory Compliance & Advisory",
        desc: "Expert counsel in interpreting new regulatory mandates, designing compliance workflows, and training operational teams.",
      },
    ],
  },
];

export const industryData: IndustryCategory[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    subtitle: "Across the Healthcare Ecosystem",
    tagline:
      "We support hospitals, health systems, life sciences, medical device innovators, and payers to build resilient teams and streamline operations.",
    overview:
      "At Cornerstone, we support the diverse needs of the healthcare industry through integrated talent solutions, workforce strategy, technology enablement, financial operations, and compliance advisory. From hospitals and health systems to pharmaceutical companies, medical device manufacturers, laboratories, and health technology providers, we help organizations strengthen their workforce, streamline clinical operations, navigate complex FDA/HIPAA requirements, and adapt to evolving reimbursement models.",
    img: "/images/industries/healthcare.jpg",
    stats: [
      { value: "300+", label: "Hospitals & Health Systems Served" },
      { value: "8 of 10", label: "Top Global Pharmaceutical Leaders" },
      { value: "25%", label: "Average Administrative Cost Savings" },
      { value: "100%", label: "Regulatory & Joint Commission Alignment" },
    ],
    keyChallenges: [
      "Escalating clinical talent shortages and nurse burnout",
      "Rapidly changing payer reimbursement models and Medicare rules",
      "Complex clinical trial operational bottlenecks and FDA compliance",
      "Digital EHR platform modernization and data interoperability",
    ],
    solutions: [
      "Specialized clinical & operational talent placement",
      "Revenue cycle management and claims processing automation",
      "FDA submission readiness and regulatory documentation",
      "Health system merger integration and operating model alignment",
    ],
    items: [
      {
        num: "01",
        title: "Healthcare Payers",
        desc: "Improving operational performance, claims management, and business processes across commercial and government health programs.",
      },
      {
        num: "02",
        title: "Healthcare Providers",
        desc: "Supporting hospitals, health systems, and clinics in overcoming operational demands and clinical workforce shortages.",
      },
      {
        num: "03",
        title: "Integrated Delivery Networks (IDNs)",
        desc: "Aligning workforce requirements, shared services, and clinical workflows across interconnected regional health networks.",
      },
      {
        num: "04",
        title: "Pharmaceuticals & Biotechnology",
        desc: "Connecting specialized R&D, clinical trial, and commercialization talent to accelerate drug discovery and market delivery.",
      },
      {
        num: "05",
        title: "Medical Devices & MedTech",
        desc: "Navigating FDA quality systems regulations, ISO 13485 standards, and post-market clinical surveillance.",
      },
      {
        num: "06",
        title: "Clinical Research & Life Sciences Services",
        desc: "Empowering CROs, CDMOs, and diagnostic laboratories with agile staffing, protocol execution, and data accuracy.",
      },
    ],
  },
  {
    id: "financial-services",
    title: "Financial Services",
    subtitle: "Supporting the Financial Ecosystem",
    tagline:
      "We partner with banks, asset managers, fintechs, and insurers to modernize infrastructure, manage risk, and accelerate growth.",
    overview:
      "At Cornerstone, we support organizations across the financial ecosystem through integrated talent solutions, financial operations, technology enablement, strategic advisory, and regulatory compliance. From global Tier-1 investment banks to rapid-scale fintechs and insurance giants, we help financial institutions modernize legacy core systems, ensure Dodd-Frank/Basel IV compliance, and navigate market volatility.",
    img: "/images/industries/financial-services.jpg",
    stats: [
      { value: "70%", label: "Of Global Fortune 500 Financial Firms Served" },
      { value: "$50B+", label: "Transactions & Portfolios Advised" },
      { value: "40%", label: "Faster Modernization of Core Banking Workflows" },
      { value: "100%", label: "Regulatory Examination Success Record" },
    ],
    keyChallenges: [
      "Legacy core banking systems hindering agile product releases",
      "Intensifying anti-money laundering (AML) and capital adequacy scrutiny",
      "Rapid fintech disruption in payment processing and wealth advisory",
      "Cybersecurity and third-party vendor risk in open banking ecosystems",
    ],
    solutions: [
      "Core banking platform modernization and cloud migration",
      "End-to-end AML, KYC, and regulatory reporting optimization",
      "Private equity portfolio acceleration and post-acquisition synergy",
      "Digital payments platform architecture and resilience engineering",
    ],
    items: [
      {
        num: "01",
        title: "Capital Markets",
        desc: "Supporting complex financial operations, trade clearing platforms, derivatives accounting, and market risk oversight.",
      },
      {
        num: "02",
        title: "Wealth & Asset Management",
        desc: "Strengthening investment operations, portfolio data integrity, client reporting, and robo-advisory integration.",
      },
      {
        num: "03",
        title: "Retail & Consumer Banking",
        desc: "Transitioning branch models to mobile-first omnichannel journeys while improving deposit operations and loan underwriting.",
      },
      {
        num: "04",
        title: "Insurance",
        desc: "Modernizing policy administration, automated claims settlement, actuarial modeling, and IFRS 17 adoption.",
      },
      {
        num: "05",
        title: "Private Equity",
        desc: "Partnering with PE sponsors and portfolio leadership to maximize EBITDA, streamline finance, and execute exit strategies.",
      },
      {
        num: "06",
        title: "Payments & Fintech",
        desc: "Scaling merchant acquiring, real-time ACH networks, and regulatory licensing for high-growth fintech pioneers.",
      },
    ],
  },
  {
    id: "public-services",
    title: "Public Services",
    subtitle: "Public Sector & Government Services",
    tagline:
      "We support state, local, and federal agencies in modernizing operations, improving public service delivery, and managing civic resources.",
    overview:
      "At Cornerstone, we support public sector organizations in navigating complex workforce, operational, technological, and regulatory demands. By aligning people, technology, and organizational priorities, we help public institutions build resilient operations, implement transparent financial controls, and deliver lasting value to the communities they serve.",
    img: "/images/industries/public-sector.jpg",
    stats: [
      { value: "120+", label: "Public Sector Agencies & Municipalities Supported" },
      { value: "$4.5B", label: "Public Grants & Allocations Audited" },
      { value: "35%", label: "Average Increase in Citizen Service Efficiency" },
      { value: "100%", label: "Federal & State Accountability Adherence" },
    ],
    keyChallenges: [
      "Aging legacy mainframe infrastructure and paper-based workflows",
      "Stricter civic accountability and federal grant compliance mandates",
      "Retiring civil workforce creating critical institutional knowledge gaps",
      "Cybersecurity vulnerabilities across municipal and state networks",
    ],
    solutions: [
      "Digital citizen portal modernization and cloud ERP deployments",
      "Federal grant tracking, disbursement, and single audit readiness",
      "Workforce succession planning and specialized government contracting",
      "Civic infrastructure project management and transparency dashboards",
    ],
    items: [
      {
        num: "01",
        title: "State & Local Government Services",
        desc: "Modernizing municipal systems, strengthening public budgeting, and enhancing civic services delivery.",
      },
      {
        num: "02",
        title: "Public Healthcare & Education Systems",
        desc: "Empowering state hospitals and public universities with agile staffing, budgeting tools, and operational discipline.",
      },
      {
        num: "03",
        title: "Federal Government Services",
        desc: "Supporting federal initiatives with cleared practitioners, disciplined PMO governance, and audit compliance.",
      },
    ],
  },
  {
    id: "technology",
    title: "Technology",
    subtitle: "Enterprise Tech & Cloud",
    tagline:
      "We partner with high-growth tech companies and enterprise software providers to build technical capabilities and scale operations.",
    overview:
      "From software engineering and cloud infrastructure to customer success and DevSecOps, we provide specialized talent and operational discipline. We help SaaS innovators and tech enterprises accelerate release cycles, reduce technical debt, and build resilient architectures.",
    img: "/images/industries/technology.jpg",
    stats: [
      { value: "250+", label: "Enterprise Tech Companies Accelerated" },
      { value: "50%", label: "Faster Engineering Squad Deployment" },
      { value: "99.99%", label: "High-Availability System Architecture Standard" },
      { value: "85+", label: "SaaS Platforms Successfully Scaled" },
    ],
    keyChallenges: [
      "Intense competition for specialized AI, data, and cloud engineers",
      "Managing multi-cloud cost sprawl and optimizing infrastructure spend",
      "Scaling customer onboarding without deteriorating net revenue retention",
      "Adhering to strict global data residency and privacy mandates",
    ],
    solutions: [
      "On-demand elite engineering squads and technical leadership",
      "Cloud FinOps strategy and infrastructure cost rationalization",
      "Automated CI/CD pipelines and DevSecOps integration",
      "Enterprise customer onboarding and implementation consulting",
    ],
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
      "We deliver senior advisory, specialized talent solutions, and large-scale transformation management to world-leading global enterprises.",
    overview:
      "Our practitioners combine deep domain knowledge with agile delivery to solve complex corporate challenges and drive sustainable long-term value. Having served 90% of the Fortune 100, we understand the governance, scale, and multi-entity coordination needed for global success.",
    img: "/images/industries/financial-services.jpg",
    stats: [
      { value: "90%", label: "Of Fortune 100 Enterprises Trust Cornerstone" },
      { value: "25+", label: "Years of Sustained Enterprise Partnerships" },
      { value: "37+", label: "Countries Supported in Global Rollouts" },
      { value: "10,000+", label: "Complex Corporate Initiatives Delivered" },
    ],
    keyChallenges: [
      "Operating model inertia across siloed global business units",
      "High-stakes post-merger integration involving multi-billion dollar entities",
      "Cross-border tax, treasury, and statutory reporting friction",
      "Enterprise-wide digital adoption and change resistance",
    ],
    solutions: [
      "Global PMO governance and transformation office leadership",
      "Executive advisory for Board, CEO, CFO, and Chief Transformation Officers",
      "Harmonized shared services and centers of excellence design",
      "Enterprise capital allocation and working capital optimization",
    ],
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
      "We work with higher education institutions and university research systems to modernize administrative operations and student services.",
    overview:
      "Higher education faces shifting demographic realities, state funding volatility, and changing student expectations. Cornerstone partners with universities, community college districts, and academic medical centers to streamline campus administrative services, upgrade legacy ERPs, and enhance student engagement.",
    img: "/images/industries/higher-education.jpg",
    stats: [
      { value: "75+", label: "Leading Universities & Research Institutions" },
      { value: "$1.8B+", label: "Academic Research Grants Administered" },
      { value: "30%", label: "Faster Student Service Cycle Times" },
      { value: "100%", label: "FERPA & Title IV Compliance Record" },
    ],
    keyChallenges: [
      "Outdated student information and legacy campus finance ERP systems",
      "Complex sponsored research accounting and federal grant reporting",
      "Rising administrative costs colliding with enrollment headwinds",
      "Need for seamless digital enrollment and degree progress tracking",
    ],
    solutions: [
      "Campus ERP (Workday, Ellucian, PeopleSoft) modernization",
      "Research grant pre- and post-award compliance optimization",
      "Student lifecycle digital service redesign",
      "University long-term financial modeling and resource sustainability",
    ],
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
      "We connect ambitious emerging talent with premier enterprise career opportunities, structured mentorship, and hands-on consulting training.",
    overview:
      "Cornerstone's Early Career ecosystem bridges the gap between academic graduation and high-performance corporate impact. Through intensive consulting readiness training, executive mentorship, and direct deployment to Fortune 500 client initiatives, we build the next generation of business and technology leaders.",
    img: "/images/industries/private-equity.jpg",
    stats: [
      { value: "95%", label: "Career Placement Rate for Program Graduates" },
      { value: "1:1", label: "Executive Mentorship Pairing" },
      { value: "500+", label: "Early Career Practitioners Developed" },
      { value: "2x", label: "Faster Career Milestone Promotion Track" },
    ],
    keyChallenges: [
      "Universities teaching theoretical models without corporate tooling experience",
      "Graduates struggling to access high-visibility Fortune 500 advisory roles",
      "Enterprises lacking bandwidth to train entry-level recruits from scratch",
      "Need for practical consulting agility, data storytelling, and communication",
    ],
    solutions: [
      "Cornerstone Consulting Academy intensive bootcamp training",
      "Hands-on immersion with real client projects under senior guidance",
      "Structured progression pathways into senior advisory and technical tracks",
      "Continuous skill-building across cloud, data analytics, and finance",
    ],
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
