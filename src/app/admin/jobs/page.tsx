"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Search,
  Check,
  X,
  MapPin,
  Clock,
  RefreshCw,
  Loader2,
  ArrowRight,
  Database,
  Layers,
  Sparkles,
} from "lucide-react";
import { CornerstoneLogo } from "@/components/ui/cornerstone-logo";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract" | "Remote";
  experience: string;
  salary?: string;
  description: string;
  requirements: string[];
  status: "active" | "closed";
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "recruiter";
}

export default function JobsAdminPortalPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Jobs data
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "Strategy & Transformation",
    location: "New York, NY (Hybrid)",
    type: "Full-Time" as JobOpening["type"],
    experience: "5+ Years",
    salary: "$160,000 - $220,000",
    description: "",
    requirementsText: "",
    status: "active" as "active" | "closed",
  });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Auth Guard
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.replace("/admin/login?from=/admin/jobs");
          return;
        }
        const data = await res.json();
        setCurrentUser(data.user);
        fetchJobs();
      } catch {
        router.replace("/admin/login?from=/admin/jobs");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs?all=true");
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      department: "Strategy & Transformation",
      location: "New York, NY (Hybrid)",
      type: "Full-Time",
      experience: "5+ Years",
      salary: "$160,000 - $220,000",
      description: "",
      requirementsText: "",
      status: "active",
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (job: JobOpening) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      salary: job.salary || "",
      description: job.description,
      requirementsText: (job.requirements || []).join("\n"),
      status: job.status,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError(null);

    const payload = {
      title: formData.title,
      department: formData.department,
      location: formData.location,
      type: formData.type,
      experience: formData.experience,
      salary: formData.salary || undefined,
      description: formData.description,
      requirements: formData.requirementsText
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      status: formData.status,
    };

    try {
      if (editingJob) {
        const res = await fetch(`/api/jobs/${editingJob.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to update job.");
        }
      } else {
        const res = await fetch("/api/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to create job.");
        }
      }

      setIsModalOpen(false);
      fetchJobs();
    } catch (err: unknown) {
      setModalError(err instanceof Error ? err.message : "Error saving job.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleToggleJobStatus = async (job: JobOpening) => {
    const nextStatus = job.status === "active" ? "closed" : "active";
    try {
      await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      fetchJobs();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleDeleteJob = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      fetchJobs();
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#070B19",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#94A3B8",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Loader2 size={36} className="animate-spin" style={{ color: "#F59E0B", marginBottom: "16px" }} />
        <p style={{ fontSize: "14px", fontWeight: 600 }}>Securing Jobs Admin Portal...</p>
      </div>
    );
  }

  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === "All" || j.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#070B19",
        color: "#FFFFFF",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Header */}
      <header
        style={{
          height: "70px",
          backgroundColor: "#0B1329",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <CornerstoneLogo variant="light" height={22} />
          </Link>
          <div style={{ width: "1px", height: "20px", background: "rgba(255, 255, 255, 0.15)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                background: "rgba(245, 158, 11, 0.14)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                color: "#F59E0B",
                padding: "3px 9px",
                borderRadius: "6px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Briefcase size={13} />
              <span>Jobs &amp; Openings Admin Portal</span>
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Link
            href="/jobs"
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "#94A3B8",
              textDecoration: "none",
              padding: "7px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span>Live Careers Board</span>
            <ExternalLink size={12} />
          </Link>

          {/* Switch to Central Backend Admin */}
          <Link
            href="/admin"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#A5B4FC",
              background: "rgba(99, 102, 241, 0.12)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              textDecoration: "none",
              padding: "7px 14px",
              borderRadius: "8px",
            }}
          >
            <Database size={13} />
            <span>Master Backend Admin</span>
            <ArrowRight size={12} />
          </Link>

          <button
            onClick={handleOpenCreateModal}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
              color: "#000000",
              fontWeight: 700,
              fontSize: "12px",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(245, 158, 11, 0.3)",
            }}
          >
            <Plus size={15} />
            <span>Post New Opening</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", padding: "32px 24px", flex: 1 }}>
        {/* KPI Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              background: "#0E1833",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#94A3B8",
                marginBottom: "6px",
              }}
            >
              Active Mandates
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#34D399" }}>
              {jobs.filter((j) => j.status === "active").length}
              <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 400, marginLeft: "8px" }}>
                Live on Board
              </span>
            </div>
          </div>

          <div
            style={{
              background: "#0E1833",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#94A3B8",
                marginBottom: "6px",
              }}
            >
              Closed / Drafts
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#94A3B8" }}>
              {jobs.filter((j) => j.status === "closed").length}
            </div>
          </div>

          <div
            style={{
              background: "#0E1833",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#94A3B8",
                marginBottom: "6px",
              }}
            >
              Practice Areas
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#F59E0B" }}>
              {departments.length - 1}
            </div>
          </div>

          <div
            style={{
              background: "#0E1833",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#94A3B8",
                marginBottom: "6px",
              }}
            >
              Total Vacancies Logged
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#FFFFFF" }}>{jobs.length}</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            background: "#0E1833",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
            <Search
              size={15}
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
              placeholder="Search by job title, department, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                background: "#070B19",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "10px",
                padding: "10px 14px 10px 38px",
                fontSize: "13px",
                color: "#FFFFFF",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", overflowX: "auto" }}>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  background: deptFilter === dept ? "#F59E0B" : "#070B19",
                  color: deptFilter === dept ? "#000000" : "#94A3B8",
                }}
              >
                {dept}
              </button>
            ))}

            <button
              onClick={fetchJobs}
              title="Refresh"
              style={{
                background: "#070B19",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "#94A3B8",
                padding: "8px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Jobs Table */}
        <div
          style={{
            background: "#0E1833",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#070B19", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" }}>
                  Role &amp; Mandate Description
                </th>
                <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" }}>
                  Department
                </th>
                <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" }}>
                  Location &amp; Type
                </th>
                <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" }}>
                  Compensation
                </th>
                <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" }}>
                  Status
                </th>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "60px 20px", textAlign: "center", color: "#94A3B8" }}>
                    No job openings match the current filter.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}
                  >
                    <td style={{ padding: "18px 24px" }}>
                      <div style={{ fontWeight: 700, fontSize: "15px", color: "#FFFFFF" }}>{job.title}</div>
                      <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "3px", maxWidth: "420px", lineHeight: 1.4 }}>
                        {job.description}
                      </div>
                    </td>
                    <td style={{ padding: "18px 20px" }}>
                      <span style={{ color: "#F59E0B", fontWeight: 600 }}>{job.department}</span>
                    </td>
                    <td style={{ padding: "18px 20px" }}>
                      <div style={{ color: "#FFFFFF" }}>{job.location}</div>
                      <div style={{ fontSize: "11px", color: "#64748B" }}>
                        {job.type} &bull; {job.experience}
                      </div>
                    </td>
                    <td style={{ padding: "18px 20px", fontFamily: "monospace", color: "#34D399" }}>
                      {job.salary || "Competitive"}
                    </td>
                    <td style={{ padding: "18px 20px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          padding: "3px 9px",
                          borderRadius: "20px",
                          background: job.status === "active" ? "rgba(16, 185, 129, 0.14)" : "rgba(148, 163, 184, 0.14)",
                          color: job.status === "active" ? "#34D399" : "#94A3B8",
                          border: job.status === "active" ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(148, 163, 184, 0.3)",
                        }}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td style={{ padding: "18px 24px", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        <button
                          onClick={() => handleToggleJobStatus(job)}
                          style={{
                            padding: "6px 10px",
                            fontSize: "11px",
                            fontWeight: 600,
                            borderRadius: "6px",
                            cursor: "pointer",
                            background: "transparent",
                            border: job.status === "active" ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(16, 185, 129, 0.4)",
                            color: job.status === "active" ? "#94A3B8" : "#34D399",
                          }}
                        >
                          {job.status === "active" ? "Close" : "Re-open"}
                        </button>

                        <button
                          onClick={() => handleOpenEditModal(job)}
                          title="Edit"
                          style={{
                            padding: "6px",
                            borderRadius: "6px",
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#94A3B8",
                            cursor: "pointer",
                          }}
                        >
                          <Edit3 size={13} />
                        </button>

                        <button
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          title="Delete"
                          style={{
                            padding: "6px",
                            borderRadius: "6px",
                            background: "transparent",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            color: "#EF4444",
                            cursor: "pointer",
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 100,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              background: "#0E1833",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "20px",
              padding: "32px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.8)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                paddingBottom: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                  {editingJob ? "Edit Job Opening" : "Create New Job Opening"}
                </h3>
                <p style={{ fontSize: "12px", color: "#94A3B8", margin: "4px 0 0" }}>
                  Publish vacancies to the Cornerstone careers ecosystem.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "transparent", border: "none", color: "#94A3B8", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {modalError && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#FCA5A5",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  marginBottom: "16px",
                }}
              >
                {modalError}
              </div>
            )}

            <form onSubmit={handleSaveJob}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Enterprise Strategy Partner"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#070B19",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: "#FFFFFF",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                    Practice / Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#070B19",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      fontSize: "13px",
                      color: "#FFFFFF",
                      outline: "none",
                    }}
                  >
                    <option value="Strategy & Transformation">Strategy &amp; Transformation</option>
                    <option value="Finance & Accounting">Finance &amp; Accounting</option>
                    <option value="Digital, Technology & Data">Digital, Technology &amp; Data</option>
                    <option value="Governance, Risk & Compliance">Governance, Risk &amp; Compliance</option>
                    <option value="Executive Interim Leadership">Executive Interim Leadership</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New York, NY (Hybrid)"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#070B19",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      fontSize: "13px",
                      color: "#FFFFFF",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as JobOpening["type"] })}
                    style={{
                      width: "100%",
                      background: "#070B19",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      fontSize: "13px",
                      color: "#FFFFFF",
                      outline: "none",
                    }}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                    Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5+ Years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#070B19",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      fontSize: "13px",
                      color: "#FFFFFF",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                    Salary
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $180k - $220k"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#070B19",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      fontSize: "13px",
                      color: "#FFFFFF",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Key mandate objectives..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#070B19",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: "#FFFFFF",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                  Requirements (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="10+ years experience&#10;Consulting background"
                  value={formData.requirementsText}
                  onChange={(e) => setFormData({ ...formData, requirementsText: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#070B19",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: "#FFFFFF",
                    outline: "none",
                    fontFamily: "monospace",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                  Publishing Status
                </label>
                <div style={{ display: "flex", gap: "20px", fontSize: "13px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === "active"}
                      onChange={() => setFormData({ ...formData, status: "active" })}
                    />
                    <span style={{ color: "#34D399", fontWeight: 600 }}>Active (Live on Board)</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === "closed"}
                      onChange={() => setFormData({ ...formData, status: "closed" })}
                    />
                    <span style={{ color: "#94A3B8" }}>Closed / Draft</span>
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: "10px 18px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#94A3B8",
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  style={{
                    padding: "10px 20px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#000000",
                    background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                    border: "none",
                    borderRadius: "8px",
                    cursor: modalLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {modalLoading ? "Saving..." : editingJob ? "Save Changes" : "Create Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

