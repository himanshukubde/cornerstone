"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  Lock,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { CornerstoneLogo } from "@/components/ui/cornerstone-logo";

export default function CandidateLoginPage() {
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
              role: "candidate",
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

      router.push("/jobs");
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
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <CornerstoneLogo variant="light" height={24} />
        </Link>

        <Link
          href="/"
          style={{
            fontSize: "12px",
            color: "#94A3B8",
            textDecoration: "none",
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          Back to Home
        </Link>
      </header>

      {/* Main Form Box */}
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
            padding: "38px 32px",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "26px" }}>
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
              <Briefcase size={28} />
            </div>

            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", margin: "0 0 6px" }}>
              {mode === "login" ? "Candidate Portal Sign In" : "Register to View Jobs"}
            </h1>

            <p style={{ fontSize: "13px", color: "#94A3B8", margin: 0, lineHeight: 1.5 }}>
              {mode === "login"
                ? "Please sign in to access our exclusive executive job openings and mandates."
                : "Create your free candidate account to unlock and explore active career openings."}
            </p>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "#070B19",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              padding: "4px",
              marginBottom: "22px",
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
                background: mode === "login" ? "#1E2A4A" : "transparent",
                color: mode === "login" ? "#FFFFFF" : "#94A3B8",
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
                background: mode === "register" ? "#1E2A4A" : "transparent",
                color: mode === "register" ? "#FFFFFF" : "#94A3B8",
              }}
            >
              New Registration
            </button>
          </div>

          {/* Error Message */}
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
                marginBottom: "18px",
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                  Full Name
                </label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <User size={16} style={{ position: "absolute", left: "14px", color: "#64748B", pointerEvents: "none" }} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#070B19",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "10px",
                      padding: "11px 14px 11px 40px",
                      fontSize: "14px",
                      color: "#FFFFFF",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                Email Address
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Mail size={16} style={{ position: "absolute", left: "14px", color: "#64748B", pointerEvents: "none" }} />
                <input
                  type="email"
                  required
                  placeholder="candidate@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#070B19",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "10px",
                    padding: "11px 14px 11px 40px",
                    fontSize: "14px",
                    color: "#FFFFFF",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                Password
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Lock size={16} style={{ position: "absolute", left: "14px", color: "#64748B", pointerEvents: "none" }} />
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
                    borderRadius: "10px",
                    padding: "11px 14px 11px 40px",
                    fontSize: "14px",
                    color: "#FFFFFF",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {mode === "register" && (
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#CBD5E1", marginBottom: "6px" }}>
                  Confirm Password
                </label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <Lock size={16} style={{ position: "absolute", left: "14px", color: "#64748B", pointerEvents: "none" }} />
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
                      borderRadius: "10px",
                      padding: "11px 14px 11px 40px",
                      fontSize: "14px",
                      color: "#FFFFFF",
                      outline: "none",
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
                padding: "13px 20px",
                borderRadius: "10px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 6px 20px rgba(245, 158, 11, 0.35)",
                marginTop: "12px",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>{mode === "login" ? "Unlock & View Jobs" : "Create Account & View Jobs"}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div
            style={{
              marginTop: "22px",
              paddingTop: "16px",
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
            <span>Authenticated Candidate Access Only</span>
          </div>
        </div>
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "18px",
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

