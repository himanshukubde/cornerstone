import { NextResponse } from "next/server";
import { db, JobOpening } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const includeAll = searchParams.get("all") === "true";

  const allJobs = db.getJobs();

  // If asking for all jobs (including closed ones for admin), verify authentication
  if (includeAll) {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to view internal job management." },
        { status: 401 }
      );
    }
    return NextResponse.json({ jobs: allJobs });
  }

  // Public view: return only active jobs
  const activeJobs = allJobs.filter((j) => j.status === "active");
  return NextResponse.json({ jobs: activeJobs });
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. You must be logged in as an admin or recruiter to post jobs." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, department, location, type, experience, salary, description, requirements } = body;

    if (!title || !department || !location || !description) {
      return NextResponse.json(
        { error: "Title, Department, Location, and Description are required fields." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newJob: JobOpening = {
      id: `job-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      type: type || "Full-Time",
      experience: experience || "5+ Years",
      salary: salary ? salary.trim() : undefined,
      description: description.trim(),
      requirements: Array.isArray(requirements)
        ? requirements.filter((r: unknown) => typeof r === "string" && r.trim().length > 0)
        : typeof requirements === "string"
        ? requirements
            .split("\n")
            .map((r: string) => r.trim())
            .filter(Boolean)
        : [],
      status: "active",
      createdAt: now,
      updatedAt: now,
    };

    const saved = db.createJob(newJob);
    return NextResponse.json({ message: "Job created successfully.", job: saved }, { status: 201 });
  } catch (err: unknown) {
    console.error("Create job API error:", err);
    return NextResponse.json({ error: "Failed to create job opening." }, { status: 500 });
  }
}

