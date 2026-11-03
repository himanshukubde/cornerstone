"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Inbox,
  Send,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Search,
  Check,
  X,
  MailCheck,
  MailX,
  MapPin,
  Clock,
  Building,
  CheckCircle2,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { CornerstoneLogo } from "@/components/ui/cornerstone-logo";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "recruiter";
  createdAt: string;
}

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

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  role?: string;
  country: string;
  city: string;
  phone?: string;
  practice: string;
  comments: string;
  status: "new" | "in-review" | "contacted" | "archived";
  emailSent: boolean;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  // Auth & Profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Active Menu: 'overview' | 'jobs' | 'users' | 'contacts' | 'smtp'
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "users" | "contacts" | "smtp">("jobs");

  // Data
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Modal
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [jobFormData, setJobFormData] = useState({
    title: "",
    department: "Strategy & Transformation",
    location: "New York, NY (Hybrid)",
    type: "Full-Time" as JobOpening["type"],
    experience: "5+ Years",
    salary: "$150,000 - $200,000",
    description: "",
    requirementsText: "",
    status: "active" as "active" | "closed",
  });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        setCurrentUser(data.user);
        fetchAllData();
      } catch {
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const fetchAllData = async () => {
    try {
      const resJobs = await fetch("/api/jobs?all=true");
      if (resJobs.ok) {
        const data = await resJobs.json();
        setJobs(data.jobs || []);
      }

      const resUsers = await fetch("/api/admin/users");
      if (resUsers.ok) {
        const data = await resUsers.json();
        setUsers(data.users || []);
      }

      const resContacts = await fetch("/api/admin/contacts");
      if (resContacts.ok) {
        const data = await resContacts.json();
        setContacts(data.contacts || []);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  const handleOpenCreateModal = () => {
    setEditingJob(null);
    setJobFormData({
      title: "",
      department: "Strategy & Transformation",
      location: "New York, NY (Hybrid)",
      type: "Full-Time",
      experience: "5+ Years",
      salary: "$150,000 - $200,000",
      description: "",
      requirementsText: "",
      status: "active",
    });
    setModalError(null);
    setIsJobModalOpen(true);
  };

  const handleOpenEditModal = (job: JobOpening) => {
    setEditingJob(job);
    setJobFormData({
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
    setIsJobModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError(null);

    const payload = {
      title: jobFormData.title,
      department: jobFormData.department,
      location: jobFormData.location,
      type: jobFormData.type,
      experience: jobFormData.experience,
      salary: jobFormData.salary || undefined,
      description: jobFormData.description,
      requirements: jobFormData.requirementsText
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      status: jobFormData.status,
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

      setIsJobModalOpen(false);
      fetchAllData();
    } catch (err: unknown) {
      setModalError(err instanceof Error ? err.message : "Error saving job opening.");
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
      fetchAllData();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleDeleteJob = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      fetchAllData();
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
          fontFamily: "sans-serif",
        }}
      >
        <Loader2
          size={36}
          className="animate-spin"
          style={{ color: "#F59E0B", marginBottom: "16px" }}
        />
        <p style={{ fontSize: "14px", fontWeight: 600 }}>Loading Protected Admin Panel...</p>
      </div>
    );
  }

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="cs-ap-wrapper">
      {/* 1. LEFT SIDEBAR */}
      <aside className="cs-ap-sidebar">
        <div>
          {/* Brand */}
          <div className="cs-ap-brand">
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <CornerstoneLogo variant="light" height={22} />
            </Link>
            <span className="cs-ap-brand__tag">Admin</span>
          </div>

          {/* Navigation Links */}
          <nav className="cs-ap-nav">
            <button
              onClick={() => setActiveTab("overview")}
              className={`cs-ap-nav__link ${activeTab === "overview" ? "active" : ""}`}
            >
              <LayoutDashboard size={17} />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("jobs")}
              className={`cs-ap-nav__link ${activeTab === "jobs" ? "active" : ""}`}
            >
              <Briefcase size={17} />
              <span>Job Openings</span>
              <span className="cs-ap-nav__count">{jobs.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`cs-ap-nav__link ${activeTab === "users" ? "active" : ""}`}
            >
              <Users size={17} />
              <span>Registered Users</span>
              <span className="cs-ap-nav__count">{users.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("contacts")}
              className={`cs-ap-nav__link ${activeTab === "contacts" ? "active" : ""}`}
            >
              <Inbox size={17} />
              <span>Contact Leads</span>
              <span className="cs-ap-nav__count">{contacts.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("smtp")}
              className={`cs-ap-nav__link ${activeTab === "smtp" ? "active" : ""}`}
            >
              <Send size={17} />
              <span>SMTP Setup</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer User Profile */}
        <div className="cs-ap-sidebar-footer">
          <div className="cs-ap-avatar-wrap">
            <div className="cs-ap-avatar">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div>
              <div className="cs-ap-avatar-name">{currentUser?.name}</div>
              <div className="cs-ap-avatar-role">{currentUser?.role || "Staff"}</div>
            </div>
          </div>
          <button onClick={handleLogout} title="Log Out" className="cs-ap-btn-logout">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <div className="cs-ap-main">
        {/* Top Header */}
        <header className="cs-ap-topheader">
          <div className="cs-ap-breadcrumb">
            <span>Admin</span>
            <span>/</span>
            <span className="cs-ap-breadcrumb__current">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "jobs" && "Job Openings & Openings Management"}
              {activeTab === "users" && "Registered Staff & Recruiters"}
              {activeTab === "contacts" && "Client Consultation Inquiries"}
              {activeTab === "smtp" && "SMTP Mail Server Setup"}
            </span>
          </div>

          <div className="cs-ap-header-actions">
            <Link href="/" target="_blank" className="cs-ap-btn-outline">
              <span>View Main Site</span>
              <ExternalLink size={12} />
            </Link>

            <button onClick={handleOpenCreateModal} className="cs-ap-btn-primary">
              <Plus size={15} />
              <span>Post New Opening</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="cs-ap-content">
          {/* Stat KPIs Grid */}
          <div className="cs-ap-kpi-grid">
            <div className="cs-ap-kpi-card">
              <div className="cs-ap-kpi-title">Active Job Mandates</div>
              <div className="cs-ap-kpi-num">
                <span>{jobs.filter((j) => j.status === "active").length}</span>
                <span className="cs-ap-kpi-sub">/ {jobs.length} total</span>
              </div>
              <Briefcase size={40} className="cs-ap-kpi-icon" />
            </div>

            <div className="cs-ap-kpi-card">
              <div className="cs-ap-kpi-title">Registered Accounts</div>
              <div className="cs-ap-kpi-num">{users.length}</div>
              <Users size={40} className="cs-ap-kpi-icon" />
            </div>

            <div className="cs-ap-kpi-card">
              <div className="cs-ap-kpi-title">Client Inquiries</div>
              <div className="cs-ap-kpi-num">{contacts.length}</div>
              <Inbox size={40} className="cs-ap-kpi-icon" />
            </div>

            <div className="cs-ap-kpi-card">
              <div className="cs-ap-kpi-title">Email Notification</div>
              <div className="cs-ap-kpi-num" style={{ fontSize: "16px", color: "#F59E0B" }}>
                Configurable in .env
              </div>
              <Send size={40} className="cs-ap-kpi-icon" />
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px" }}>
              {/* Recent Jobs */}
              <div className="cs-ap-panel-card">
                <div className="cs-ap-panel-header">
                  <h3 className="cs-ap-panel-title">Recent Job Openings</h3>
                  <button onClick={() => setActiveTab("jobs")} className="cs-ap-btn-outline">
                    View All
                  </button>
                </div>
                <div style={{ padding: "16px 24px" }}>
                  {jobs.slice(0, 4).map((j) => (
                    <div
                      key={j.id}
                      style={{
                        padding: "12px 0",
                        borderBottom: "1px solid var(--ap-card-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "14px", color: "#FFFFFF" }}>
                          {j.title}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--ap-text-secondary)" }}>
                          {j.department} &bull; {j.location}
                        </div>
                      </div>
                      <span
                        className={`cs-badge ${
                          j.status === "active" ? "cs-badge-active" : "cs-badge-closed"
                        }`}
                      >
                        {j.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Inquiries */}
              <div className="cs-ap-panel-card">
                <div className="cs-ap-panel-header">
                  <h3 className="cs-ap-panel-title">Latest Contact Inquiries</h3>
                  <button onClick={() => setActiveTab("contacts")} className="cs-ap-btn-outline">
                    View All
                  </button>
                </div>
                <div style={{ padding: "16px 24px" }}>
                  {contacts.length === 0 ? (
                    <p style={{ fontSize: "13px", color: "var(--ap-text-secondary)" }}>
                      No incoming leads yet.
                    </p>
                  ) : (
                    contacts.slice(0, 4).map((c) => (
                      <div
                        key={c.id}
                        style={{
                          padding: "12px 0",
                          borderBottom: "1px solid var(--ap-card-border)",
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: "14px", color: "#FFFFFF" }}>
                          {c.name} &bull;{" "}
                          <span style={{ color: "var(--ap-gold)" }}>{c.company}</span>
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--ap-text-secondary)" }}>
                          {c.email} &bull; {c.city}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: JOB OPENINGS */}
          {(activeTab === "jobs" || activeTab === "overview") && activeTab !== "overview" && (
            <div className="cs-ap-panel-card">
              <div className="cs-ap-panel-header">
                <div>
                  <h3 className="cs-ap-panel-title">All Job Openings ({jobs.length})</h3>
                  <p className="cs-ap-panel-desc">
                    Manage active vacancies, candidate requirements, and publishing status.
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div className="cs-ap-search-box">
                    <Search
                      size={14}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--ap-text-muted)",
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Search title, department..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="cs-ap-search-input"
                    />
                  </div>

                  <button
                    onClick={fetchAllData}
                    title="Refresh"
                    className="cs-ap-btn-outline"
                    style={{ padding: "8px" }}
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>

              <table className="cs-ap-table">
                <thead>
                  <tr>
                    <th>Job Title &amp; Details</th>
                    <th>Department</th>
                    <th>Location &amp; Type</th>
                    <th>Compensation</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id}>
                      <td>
                        <div style={{ fontWeight: 700, fontSize: "14px", color: "#FFFFFF" }}>
                          {job.title}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "var(--ap-text-secondary)",
                            marginTop: "2px",
                            maxWidth: "450px",
                          }}
                        >
                          {job.description}
                        </div>
                      </td>
                      <td>
                        <span style={{ color: "var(--ap-gold)", fontWeight: 600 }}>
                          {job.department}
                        </span>
                      </td>
                      <td>
                        <div style={{ color: "#FFFFFF" }}>{job.location}</div>
                        <div style={{ fontSize: "11px", color: "var(--ap-text-muted)" }}>
                          {job.type} &bull; {job.experience}
                        </div>
                      </td>
                      <td style={{ fontFamily: "monospace", color: "#34D399" }}>
                        {job.salary || "Competitive"}
                      </td>
                      <td>
                        <span
                          className={`cs-badge ${
                            job.status === "active" ? "cs-badge-active" : "cs-badge-closed"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <button
                            onClick={() => handleToggleJobStatus(job)}
                            className="cs-ap-btn-outline"
                            style={{ padding: "6px 10px", fontSize: "11px" }}
                          >
                            {job.status === "active" ? "Close" : "Re-open"}
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(job)}
                            className="cs-ap-btn-outline"
                            style={{ padding: "6px 8px" }}
                            title="Edit"
                          >
                            <Edit3 size={13} />
                          </button>

                          <button
                            onClick={() => handleDeleteJob(job.id, job.title)}
                            className="cs-ap-btn-logout"
                            style={{ padding: "6px 8px" }}
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: REGISTERED USERS */}
          {activeTab === "users" && (
            <div className="cs-ap-panel-card">
              <div className="cs-ap-panel-header">
                <div>
                  <h3 className="cs-ap-panel-title">Registered System Users ({users.length})</h3>
                  <p className="cs-ap-panel-desc">
                    Recruiters and admins who have registered and have access to the backend.
                  </p>
                </div>
              </div>

              <table className="cs-ap-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email Address</th>
                    <th>Access Role</th>
                    <th>Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div className="cs-ap-avatar" style={{ width: "30px", height: "30px", fontSize: "12px" }}>
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <span style={{ fontWeight: 600, color: "#FFFFFF" }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ fontFamily: "monospace", color: "var(--ap-text-secondary)" }}>
                        {u.email}
                      </td>
                      <td>
                        <span
                          className={`cs-badge ${
                            u.role === "admin" ? "cs-badge-admin" : "cs-badge-recruiter"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td style={{ color: "var(--ap-text-muted)" }}>
                        {new Date(u.createdAt).toLocaleDateString()} &bull;{" "}
                        {new Date(u.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: CONTACT LEADS */}
          {activeTab === "contacts" && (
            <div className="cs-ap-panel-card">
              <div className="cs-ap-panel-header">
                <div>
                  <h3 className="cs-ap-panel-title">Client Consultation Inquiries ({contacts.length})</h3>
                  <p className="cs-ap-panel-desc">
                    Leads submitted through the public Contact page (saved to DB and emailed).
                  </p>
                </div>
              </div>

              {contacts.length === 0 ? (
                <div style={{ padding: "60px 20px", textAlign: "center", color: "var(--ap-text-secondary)" }}>
                  <Inbox size={40} style={{ margin: "0 auto 12px", color: "var(--ap-text-muted)" }} />
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
                    No contact submissions yet.
                  </p>
                </div>
              ) : (
                <table className="cs-ap-table">
                  <thead>
                    <tr>
                      <th>Client Name &amp; Company</th>
                      <th>Email &amp; Phone</th>
                      <th>Location</th>
                      <th>Practice Area</th>
                      <th>Project Scope</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: "#FFFFFF" }}>{c.name}</div>
                          <div style={{ color: "var(--ap-gold)", fontSize: "12px" }}>
                            {c.company} {c.role ? `(${c.role})` : ""}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontFamily: "monospace", color: "#FFFFFF" }}>{c.email}</div>
                          <div style={{ fontSize: "11px", color: "var(--ap-text-muted)" }}>
                            {c.phone || "No phone"}
                          </div>
                        </td>
                        <td>
                          {c.city}, {c.country}
                        </td>
                        <td style={{ textTransform: "capitalize", fontWeight: 600 }}>{c.practice}</td>
                        <td style={{ maxWidth: "300px", fontSize: "12px", color: "var(--ap-text-secondary)" }}>
                          {c.comments}
                        </td>
                        <td>
                          {c.emailSent ? (
                            <span className="cs-badge cs-badge-active">
                              <MailCheck size={12} />
                              <span>Emailed</span>
                            </span>
                          ) : (
                            <span className="cs-badge cs-badge-admin">
                              <MailX size={12} />
                              <span>Saved In DB</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 5: SMTP SETUP */}
          {activeTab === "smtp" && (
            <div className="cs-ap-panel-card" style={{ padding: "32px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "24px" }}>
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "12px",
                    background: "var(--ap-gold-tint)",
                    color: "var(--ap-gold)",
                  }}
                >
                  <Send size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                    SMTP Email Server Configuration
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--ap-text-secondary)", marginTop: "4px" }}>
                    Configure SMTP in your <code>.env</code> file to receive instant emails whenever a user submits the Contact Form.
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "var(--ap-input-bg)",
                  border: "1px solid var(--ap-card-border)",
                  borderRadius: "14px",
                  padding: "20px 24px",
                  fontFamily: "monospace",
                  fontSize: "13px",
                  lineHeight: 1.8,
                  color: "#E2E8F0",
                }}
              >
                <div style={{ color: "var(--ap-gold)", fontWeight: 700 }}># Add these lines to .env:</div>
                <div>SMTP_HOST=smtp.gmail.com</div>
                <div>SMTP_PORT=587</div>
                <div>SMTP_SECURE=false</div>
                <div>SMTP_USER=your-email@gmail.com</div>
                <div>SMTP_PASS=your-16-digit-app-password</div>
                <div>SMTP_FROM=&quot;Cornerstone Advisory &lt;your-email@gmail.com&gt;&quot;</div>
                <div>CONTACT_NOTIFICATION_EMAIL=admin@cornerstone.com</div>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  padding: "14px 18px",
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  borderRadius: "12px",
                  fontSize: "13px",
                  color: "#34D399",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <CheckCircle2 size={18} />
                <span>
                  <strong>Zero Data Loss:</strong> Even if SMTP details are pending, all inquiries are 100% saved in the database!
                </span>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE / EDIT JOB MODAL */}
      {isJobModalOpen && (
        <div className="cs-ap-modal-overlay">
          <div className="cs-ap-modal">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--ap-card-border)",
                paddingBottom: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                  {editingJob ? "Edit Job Opening" : "Create New Job Opening"}
                </h3>
                <p style={{ fontSize: "12px", color: "var(--ap-text-secondary)", margin: "4px 0 0" }}>
                  Add a new mandate to the jobs board.
                </p>
              </div>
              <button
                onClick={() => setIsJobModalOpen(false)}
                style={{ background: "transparent", border: "none", color: "var(--ap-text-muted)", cursor: "pointer" }}
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
                <label className="cs-auth-label">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Enterprise Strategy Partner"
                  value={jobFormData.title}
                  onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                  className="cs-auth-input"
                  style={{ paddingLeft: "14px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label className="cs-auth-label">Department *</label>
                  <select
                    value={jobFormData.department}
                    onChange={(e) => setJobFormData({ ...jobFormData, department: e.target.value })}
                    className="cs-auth-input"
                    style={{ paddingLeft: "14px" }}
                  >
                    <option value="Strategy & Transformation">Strategy &amp; Transformation</option>
                    <option value="Finance & Accounting">Finance &amp; Accounting</option>
                    <option value="Digital, Technology & Data">Digital, Technology &amp; Data</option>
                    <option value="Governance, Risk & Compliance">Governance, Risk &amp; Compliance</option>
                    <option value="Executive Interim Leadership">Executive Interim Leadership</option>
                  </select>
                </div>

                <div>
                  <label className="cs-auth-label">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New York, NY (Hybrid)"
                    value={jobFormData.location}
                    onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                    className="cs-auth-input"
                    style={{ paddingLeft: "14px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label className="cs-auth-label">Type</label>
                  <select
                    value={jobFormData.type}
                    onChange={(e) =>
                      setJobFormData({ ...jobFormData, type: e.target.value as JobOpening["type"] })
                    }
                    className="cs-auth-input"
                    style={{ paddingLeft: "14px" }}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="cs-auth-label">Experience</label>
                  <input
                    type="text"
                    placeholder="e.g. 5+ Years"
                    value={jobFormData.experience}
                    onChange={(e) => setJobFormData({ ...jobFormData, experience: e.target.value })}
                    className="cs-auth-input"
                    style={{ paddingLeft: "14px" }}
                  />
                </div>

                <div>
                  <label className="cs-auth-label">Salary</label>
                  <input
                    type="text"
                    placeholder="e.g. $180k - $220k"
                    value={jobFormData.salary}
                    onChange={(e) => setJobFormData({ ...jobFormData, salary: e.target.value })}
                    className="cs-auth-input"
                    style={{ paddingLeft: "14px" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label className="cs-auth-label">Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Key mandate objectives..."
                  value={jobFormData.description}
                  onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                  className="cs-auth-input"
                  style={{ paddingLeft: "14px", height: "auto" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label className="cs-auth-label">Requirements (One per line)</label>
                <textarea
                  rows={3}
                  placeholder="10+ years experience&#10;Consulting background"
                  value={jobFormData.requirementsText}
                  onChange={(e) => setJobFormData({ ...jobFormData, requirementsText: e.target.value })}
                  className="cs-auth-input"
                  style={{ paddingLeft: "14px", height: "auto", fontFamily: "monospace" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label className="cs-auth-label">Status</label>
                <div style={{ display: "flex", gap: "20px", fontSize: "13px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="status"
                      checked={jobFormData.status === "active"}
                      onChange={() => setJobFormData({ ...jobFormData, status: "active" })}
                    />
                    <span style={{ color: "#34D399", fontWeight: 600 }}>Active (Live on Board)</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="status"
                      checked={jobFormData.status === "closed"}
                      onChange={() => setJobFormData({ ...jobFormData, status: "closed" })}
                    />
                    <span style={{ color: "var(--ap-text-secondary)" }}>Closed / Draft</span>
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="cs-ap-btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" disabled={modalLoading} className="cs-ap-btn-primary">
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
