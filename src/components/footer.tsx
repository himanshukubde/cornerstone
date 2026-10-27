"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CornerstoneLogo } from "@/components/ui/cornerstone-logo";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link href="/" className="footer-logo-link" aria-label="Cornerstone Home">
            <CornerstoneLogo variant="light" height={26} />
          </Link>
          <p>
            Global consulting and project execution for business transformation.
          </p>
          <a href="#contact" className="footer-contact">
            Start a conversation <ArrowRight size={15} />
          </a>
        </div>
        <div className="footer-column">
          <span>Company</span>
          <a href="#what-we-do">About Cornerstone</a>
          <a href="#what-we-do">Why Cornerstone</a>
          <a href="#what-we-do">Leadership</a>
          <a href="#what-we-do">Newsroom</a>
        </div>
        <div className="footer-column">
          <span>Solutions</span>
          <a href="#capabilities">Capabilities</a>
          <a href="#what-we-do">C-Suite Strategies</a>
          <a href="#what-we-do">Industries</a>
          <a href="#what-we-do">Technologies</a>
        </div>
        <div className="footer-column">
          <span>Connect</span>
          <a href="#what-we-do">Careers</a>
          <a href="#contact">Contact</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 1996–2026 Cornerstone Resources, Inc.</span>
        <div>
          <a href="#what-we-do">Privacy Policy</a>
          <a href="#what-we-do">Cookie Policy</a>
          <a href="#what-we-do">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
