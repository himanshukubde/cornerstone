"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { CornerstoneLogo } from "@/components/ui/cornerstone-logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "register") {
      if (formData.name.trim().length < 2) {
        setError("Full Name must be at least 2 characters.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        mode === "login"
          ? { email: formData.email, password: formData.password }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed. Please check credentials.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#070B19",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Top Navbar */}
      <header
        style={{
          padding: "16px 32px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0B1329",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <CornerstoneLogo variant="light" height={24} />
          </Link>
          <div style={{ width: "1px", height: "18px", background: "rgba(255, 255, 255, 0.15)" }} />
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              color: "#F59E0B",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: "6px",
            }}
          >
            <ShieldCheck size={14} />
            <span>Admin Control Panel</span>
          </div>
        </div>

        <div>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "#94A3B8",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span>Back to Main Site</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </header>

      {/* Main Centered Form Card */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "460px",
            background: "#0E1833",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
            padding: "40px 34px",
          }}
        >
          {/* Brand Icon & Heading */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                color: "#F59E0B",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                boxShadow: "0 0 25px rgba(245, 158, 11, 0.2)",
              }}
            >
              <ShieldCheck size={30} />
            </div>

            <h1
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#FFFFFF",
                margin: "0 0 6px",
                letterSpacing: "-0.02em",
              }}
            >
              {mode === "login" ? "Admin & Recruiter Login" : "Register Admin Account"}
            </h1>

            <p style={{ fontSize: "13px", color: "#94A3B8", margin: 0, lineHeight: 1.5 }}>
              {mode === "login"
                ? "Sign in to access the Cornerstone backend, manage job vacancies, and review applicant inquiries."
                : "Register a verified administrator or recruiter account to access the dashboard."}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "#070B19",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              padding: "4px",
              marginBottom: "24px",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
              }}
              style={{
                padding: "10px",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: mode === "login" ? "#1E2A4A" : "transparent",
                color: mode === "login" ? "#FFFFFF" : "#94A3B8",
                boxShadow: mode === "login" ? "0 2px 8px rgba(0, 0, 0, 0.3)" : "none",
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError(null);
              }}
              style={{
                padding: "10px",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: mode === "register" ? "#1E2A4A" : "transparent",
                color: mode === "register" ? "#FFFFFF" : "#94A3B8",
                boxShadow: mode === "register" ? "0 2px 8px rgba(0, 0, 0, 0.3)" : "none",
              }}
            >
              Register New User
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#FCA5A5",
                fontSize: "12px",
                padding: "12px 14px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#CBD5E1",
                    marginBottom: "7px",
                  }}
                >
                  Full Name
                </label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <User
                    size={16}
                    style={{ position: "absolute", left: "14px", color: "#64748B", pointerEvents: "none" }}
                  />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Himanshu Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#070B19",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "12px",
                      padding: "12px 14px 12px 42px",
                      fontSize: "14px",
                      color: "#FFFFFF",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>
            )}

            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#CBD5E1",
                  marginBottom: "7px",
                }}
              >
                Business Email Address
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Mail
                  size={16}
                  style={{ position: "absolute", left: "14px", color: "#64748B", pointerEvents: "none" }}
                />
                <input
                  type="email"
                  required
                  placeholder="admin@cornerstone.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#070B19",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "12px",
                    padding: "12px 14px 12px 42px",
                    fontSize: "14px",
                    color: "#FFFFFF",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#CBD5E1",
                  marginBottom: "7px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Lock
                  size={16}
                  style={{ position: "absolute", left: "14px", color: "#64748B", pointerEvents: "none" }}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#070B19",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "12px",
                    padding: "12px 14px 12px 42px",
                    fontSize: "14px",
                    color: "#FFFFFF",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {mode === "register" && (
              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#CBD5E1",
                    marginBottom: "7px",
                  }}
                >
                  Confirm Password
                </label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <Lock
                    size={16}
                    style={{ position: "absolute", left: "14px", color: "#64748B", pointerEvents: "none" }}
                  />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    style={{
                      width: "100%",
                      background: "#070B19",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "12px",
                      padding: "12px 14px 12px 42px",
                      fontSize: "14px",
                      color: "#FFFFFF",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                color: "#000000",
                fontWeight: 700,
                fontSize: "14px",
                padding: "14px 20px",
                borderRadius: "12px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 6px 20px rgba(245, 158, 11, 0.35)",
                marginTop: "10px",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>{mode === "login" ? "Enter Admin Dashboard" : "Register Administrator"}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer Notice */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "18px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              textAlign: "center",
              fontSize: "12px",
              color: "#64748B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <Sparkles size={13} style={{ color: "#F59E0B" }} />
            <span>Encrypted Session &bull; Role-Based Access Guard Active</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          fontSize: "12px",
          color: "#475569",
          borderTop: "1px solid rgba(255, 255, 255, 0.04)",
        }}
      >
        &copy; 2026 Cornerstone Global Advisory. Confidential &bull; All Rights Reserved.
      </footer>
    </div>
  );
}
