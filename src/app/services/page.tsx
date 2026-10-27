import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { servicesData } from "@/data/navigation-data";
import { ServicesClient } from "./services-client";
import "./services.css";

export const metadata = {
  title: "Enterprise Consulting Services & Capabilities | CORNERSTONE",
  description:
    "Explore Cornerstone's comprehensive enterprise consulting capabilities across Business Strategy, Finance & Accounting, Digital Innovation, and Workforce Compliance.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <SiteHeader />
      <ServicesClient services={servicesData} />
      <SiteFooter />
    </main>
  );
}
