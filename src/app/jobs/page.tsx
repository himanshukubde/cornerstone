"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building,
  Sparkles,
  Lock,
  Search,
  Filter,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary?: string;
  description: string;
  requirements: string[];
  status: "active" | "closed";
  createdAt: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch current user
        const resUser = await fetch("/api/auth/me");
        if (resUser.ok) {
          const uData = await resUser.json();
          setUser(uData.user);
        }

        // Fetch jobs
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          setJobs(data.jobs || []);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/jobs/login";
    } catch {
      window.location.href = "/jobs/login";
    }
  };

  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.description.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === "All" || j.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <main className="cs-jobs-page">
      <SiteHeader />

      {/* Hero Section */}
      <section className="cs-jobs-hero">
        <div className="cs-jobs-hero__inner">
          <div className="cs-jobs-badge">
            <Sparkles size={14} />
            <span>Global Career Openings</span>
          </div>

          <h1 className="cs-jobs-title">
            Lead the Future of <br />
            <span className="cs-jobs-title__accent">Enterprise Advisory</span>.
          </h1>

          <p className="cs-jobs-desc">
            Discover executive mandates and specialized advisory opportunities across Fortune 500 enterprise transformation, financial restructuring, and digital innovation.
          </p>

          {user && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                padding: "6px 16px",
                borderRadius: "30px",
                fontSize: "12px",
                color: "#E2E8F0",
                marginBottom: "20px",
              }}
            >
              <span>
                Candidate Account: <strong style={{ color: "#F59E0B" }}>{user.name}</strong> ({user.email})
              </span>
              <span style={{ color: "#64748B" }}>&bull;</span>
              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#FCA5A5",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: 0,
                }}
              >
                Sign Out
              </button>
            </div>
          )}

          <div className="cs-jobs-actions">
            <a href="#openings-section" className="cs-btn-admin-portal">
              <Briefcase size={14} />
              <span>Explore Open Positions</span>
            </a>

            <Link href="/contact" className="cs-btn-general-app">
              <span>Submit General Resume / Profile</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Jobs Catalog */}
      <section id="openings-section" className="cs-jobs-container">
        {/* Search & Filter Bar */}
        <div className="cs-filter-bar">
          <div className="cs-search-input-wrap">
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748B",
              }}
            />
            <input
              type="text"
              placeholder="Search by role, domain, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="cs-search-input"
            />
          </div>

          <div className="cs-dept-pill-group">
            <Filter size={14} style={{ color: "#64748B", flexShrink: 0 }} />
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`cs-dept-pill ${selectedDept === dept ? "active" : ""}`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#94A3B8" }}>
            Loading active mandates...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "#0E172C",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
            }}
          >
            <Briefcase size={44} style={{ margin: "0 auto 12px", color: "#475569" }} />
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#FFFFFF" }}>
              No Matching Openings Found
            </h3>
            <p style={{ fontSize: "13px", color: "#94A3B8", marginTop: "4px" }}>
              We frequently update our advisory roster. Feel free to submit an open consultation or recruiter inquiry.
            </p>
          </div>
        ) : (
          <div>
            {filteredJobs.map((job) => (
              <div key={job.id} className="cs-job-public-card">
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "#F59E0B",
                        background: "rgba(245, 158, 11, 0.12)",
                        border: "1px solid rgba(245, 158, 11, 0.28)",
                        padding: "3px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      {job.department}
                    </span>
                    <span style={{ color: "#475569" }}>&bull;</span>
                    <span style={{ fontSize: "12px", color: "#94A3B8" }}>{job.type}</span>
                    {job.salary && (
                      <>
                        <span style={{ color: "#475569" }}>&bull;</span>
                        <span style={{ fontSize: "12px", color: "#34D399", fontFamily: "monospace" }}>
                          {job.salary}
                        </span>
                      </>
                    )}
                  </div>

                  <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#FFFFFF", margin: "4px 0" }}>
                    {job.title}
                  </h2>

                  <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.6, margin: 0 }}>
                    {job.description}
                  </p>

                  {job.requirements && job.requirements.length > 0 && (
                    <div style={{ marginTop: "8px" }}>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#94A3B8",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          marginBottom: "8px",
                        }}
                      >
                        Key Competencies &amp; Requirements:
                      </div>
                      <ul
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                          gap: "8px",
                          padding: 0,
                          margin: 0,
                          listStyle: "none",
                        }}
                      >
                        {job.requirements.map((req, idx) => (
                          <li
                            key={idx}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              fontSize: "12px",
                              color: "#E2E8F0",
                            }}
                          >
                            <CheckCircle2
                              size={14}
                              style={{ color: "#F59E0B", flexShrink: 0, marginTop: "2px" }}
                            />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      fontSize: "12px",
                      color: "#64748B",
                      paddingTop: "14px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <MapPin size={13} style={{ color: "#94A3B8" }} />
                      <span>{job.location}</span>
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Clock size={13} style={{ color: "#94A3B8" }} />
                      <span>{job.experience}</span>
                    </span>
                  </div>
                </div>

                {/* Apply Button */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Link
                    href={`/contact?subject=${encodeURIComponent(
                      `Job Application: ${job.title} (${job.id})`
                    )}`}
                    className="cs-btn-apply"
                  >
                    <span>Apply for Role</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
