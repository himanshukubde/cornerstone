import fs from "fs";
import path from "path";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "recruiter";
  createdAt: string;
}

export interface JobOpening {
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

export interface ContactSubmission {
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

const DB_DIR = path.join(process.cwd(), "data", "db");

function ensureDirectoryExists() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
}

function getFilePath(collection: "users" | "jobs" | "contacts"): string {
  ensureDirectoryExists();
  return path.join(DB_DIR, `${collection}.json`);
}

function readCollection<T>(collection: "users" | "jobs" | "contacts"): T[] {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) {
    // Seed initial data if needed
    if (collection === "jobs") {
      const initialJobs = getSeedJobs();
      writeCollection(collection, initialJobs);
      return initialJobs as unknown as T[];
    }
    return [];
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch (err) {
    console.error(`Error reading ${collection} database:`, err);
    return [];
  }
}

function writeCollection<T>(collection: "users" | "jobs" | "contacts", data: T[]): void {
  ensureDirectoryExists();
  const filePath = getFilePath(collection);
  const tempPath = `${filePath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tempPath, filePath);
}

// Initial seed jobs for Cornerstone
function getSeedJobs(): JobOpening[] {
  const now = new Date().toISOString();
  return [
    {
      id: "job-1",
      title: "Senior Enterprise Strategy Partner",
      department: "Strategy & Transformation",
      location: "New York, NY (Hybrid)",
      type: "Full-Time",
      experience: "8+ Years",
      salary: "$180,000 - $240,000",
      description:
        "Lead high-stakes digital and organizational transformation engagements for Fortune 500 leadership teams.",
      requirements: [
        "Proven track record in management consulting (McKinsey, BCG, Bain, Big 4) or top-tier boutique firm.",
        "Mastery in enterprise portfolio optimization, post-merger integration, and C-suite stakeholder governance.",
        "MBA or equivalent advanced degree preferred.",
      ],
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "job-2",
      title: "Director of Financial Advisory & Restructuring",
      department: "Finance & Accounting",
      location: "Chicago, IL / Remote",
      type: "Full-Time",
      experience: "7+ Years",
      salary: "$160,000 - $210,000",
      description:
        "Direct financial health diagnostics, liquidity management, working capital optimization, and carve-out advisory.",
      requirements: [
        "CPA, CFA or equivalent professional certification.",
        "Deep expertise in three-statement modeling, debt restructuring, and diligence.",
        "Strong leadership skills managing cross-functional advisory squads.",
      ],
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "job-3",
      title: "Cloud & AI Architecture Principal",
      department: "Digital, Technology & Data",
      location: "London, UK / Remote",
      type: "Full-Time",
      experience: "6+ Years",
      salary: "£120,000 - £150,000",
      description:
        "Architect modern cloud infrastructure, agentic AI pipelines, and data platform governance for regulated enterprises.",
      requirements: [
        "Demonstrated hands-on experience designing cloud solutions across AWS/GCP/Azure.",
        "Strong understanding of modern generative AI workflows, LLM orchestration, and enterprise compliance.",
      ],
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "job-4",
      title: "Interim Chief Operating Officer (Healthcare)",
      department: "Executive Interim Leadership",
      location: "Boston, MA / Travel",
      type: "Contract",
      experience: "12+ Years",
      salary: "Day Rate Competitive",
      description:
        "Step in as executive leadership during hospital system merger and clinical workflow overhaul.",
      requirements: [
        "Prior C-suite or VP Operations leadership in a large hospital system or healthcare group.",
        "Proven ability to stabilize operations and accelerate EBITDA recovery within 90 days.",
      ],
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
  ];
}

// Database API
export const db = {
  // Users
  getUsers: (): User[] => readCollection<User>("users"),
  getUserById: (id: string): User | undefined =>
    readCollection<User>("users").find((u) => u.id === id),
  getUserByEmail: (email: string): User | undefined =>
    readCollection<User>("users").find((u) => u.email.toLowerCase() === email.toLowerCase().trim()),
  createUser: (user: User): User => {
    const users = readCollection<User>("users");
    users.push(user);
    writeCollection("users", users);
    return user;
  },

  // Jobs
  getJobs: (): JobOpening[] => readCollection<JobOpening>("jobs"),
  getJobById: (id: string): JobOpening | undefined =>
    readCollection<JobOpening>("jobs").find((j) => j.id === id),
  createJob: (job: JobOpening): JobOpening => {
    const jobs = readCollection<JobOpening>("jobs");
    jobs.unshift(job);
    writeCollection("jobs", jobs);
    return job;
  },
  updateJob: (id: string, updates: Partial<JobOpening>): JobOpening | null => {
    const jobs = readCollection<JobOpening>("jobs");
    const index = jobs.findIndex((j) => j.id === id);
    if (index === -1) return null;
    jobs[index] = {
      ...jobs[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    writeCollection("jobs", jobs);
    return jobs[index];
  },
  deleteJob: (id: string): boolean => {
    const jobs = readCollection<JobOpening>("jobs");
    const filtered = jobs.filter((j) => j.id !== id);
    if (filtered.length === jobs.length) return false;
    writeCollection("jobs", filtered);
    return true;
  },

  // Contact Submissions
  getContacts: (): ContactSubmission[] => readCollection<ContactSubmission>("contacts"),
  getContactById: (id: string): ContactSubmission | undefined =>
    readCollection<ContactSubmission>("contacts").find((c) => c.id === id),
  createContact: (contact: ContactSubmission): ContactSubmission => {
    const contacts = readCollection<ContactSubmission>("contacts");
    contacts.unshift(contact);
    writeCollection("contacts", contacts);
    return contact;
  },
  updateContactStatus: (id: string, status: ContactSubmission["status"]): boolean => {
    const contacts = readCollection<ContactSubmission>("contacts");
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) return false;
    contacts[index].status = status;
    writeCollection("contacts", contacts);
    return true;
  },
};

