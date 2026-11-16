import fs from "fs";
import path from "path";
import { MongoClient, type Collection, type Document } from "mongodb";

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

// JSON-file backend (default; used for local development)
const jsonDb = {
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

// ---------------------------------------------------------------------------
// MongoDB backend (used automatically when MONGODB_URI is set)
// ---------------------------------------------------------------------------
type CollectionName = "users" | "jobs" | "contacts";

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getMongoClient(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(
      process.env.MONGODB_URI as string
    ).connect();
  }
  return globalForMongo._mongoClientPromise;
}

function dbName(): string {
  return process.env.MONGODB_DB || "cornerstone";
}

async function col(name: CollectionName): Promise<Collection<Document>> {
  const client = await getMongoClient();
  return client.db(dbName()).collection<Document>(name);
}

// Strips Mongo's internal _id so records keep the exact shape of the JSON backend.
const NO_ID = { projection: { _id: 0 } } as const;

async function seedJobsIfNeeded(): Promise<void> {
  // Mirrors the JSON backend: seed default jobs once, only on first use.
  const client = await getMongoClient();
  const meta = client.db(dbName()).collection<Document>("meta");
  const flag = await meta.findOne({ _id: "jobs_seeded" } as Document);
  if (flag) return;
  const jobs = await col("jobs");
  if ((await jobs.estimatedDocumentCount()) === 0) {
    await jobs.insertMany(getSeedJobs().map((j) => ({ ...j })));
  }
  await meta.updateOne(
    { _id: "jobs_seeded" } as Document,
    { $set: { at: new Date().toISOString() } },
    { upsert: true }
  );
}

const mongoDb = {
  getUsers: async (): Promise<User[]> =>
    (await (await col("users")).find({}, NO_ID).toArray()) as unknown as User[],
  getUserById: async (id: string): Promise<User | undefined> =>
    ((await (await col("users")).findOne({ id }, NO_ID)) as unknown as User) || undefined,
  getUserByEmail: async (email: string): Promise<User | undefined> => {
    const users = (await (await col("users")).find({}, NO_ID).toArray()) as unknown as User[];
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
  },
  createUser: async (user: User): Promise<User> => {
    await (await col("users")).insertOne({ ...user });
    return user;
  },

  getJobs: async (): Promise<JobOpening[]> => {
    await seedJobsIfNeeded();
    // Newest-first, matching the JSON backend's unshift ordering for new jobs.
    return (await (await col("jobs"))
      .find({}, NO_ID)
      .sort({ createdAt: -1 })
      .toArray()) as unknown as JobOpening[];
  },
  getJobById: async (id: string): Promise<JobOpening | undefined> => {
    await seedJobsIfNeeded();
    return ((await (await col("jobs")).findOne({ id }, NO_ID)) as unknown as JobOpening) || undefined;
  },
  createJob: async (job: JobOpening): Promise<JobOpening> => {
    await seedJobsIfNeeded();
    await (await col("jobs")).insertOne({ ...job });
    return job;
  },
  updateJob: async (id: string, updates: Partial<JobOpening>): Promise<JobOpening | null> => {
    await seedJobsIfNeeded();
    const res = await (await col("jobs")).findOneAndUpdate(
      { id },
      { $set: { ...updates, updatedAt: new Date().toISOString() } },
      { returnDocument: "after", projection: { _id: 0 } }
    );
    return (res as unknown as JobOpening) || null;
  },
  deleteJob: async (id: string): Promise<boolean> => {
    await seedJobsIfNeeded();
    const res = await (await col("jobs")).deleteOne({ id });
    return res.deletedCount > 0;
  },

  getContacts: async (): Promise<ContactSubmission[]> =>
    (await (await col("contacts"))
      .find({}, NO_ID)
      .sort({ createdAt: -1 })
      .toArray()) as unknown as ContactSubmission[],
  getContactById: async (id: string): Promise<ContactSubmission | undefined> =>
    ((await (await col("contacts")).findOne({ id }, NO_ID)) as unknown as ContactSubmission) || undefined,
  createContact: async (contact: ContactSubmission): Promise<ContactSubmission> => {
    await (await col("contacts")).insertOne({ ...contact });
    return contact;
  },
  updateContactStatus: async (id: string, status: ContactSubmission["status"]): Promise<boolean> => {
    const res = await (await col("contacts")).updateOne({ id }, { $set: { status } });
    return res.matchedCount > 0;
  },
};

// Public API: always async so callers are identical for both backends.
type Async<T> = {
  [K in keyof T]: T[K] extends (...a: infer A) => infer R ? (...a: A) => Promise<R> : never;
};
type DbApi = Async<typeof jsonDb>;

const jsonAsync = Object.fromEntries(
  Object.entries(jsonDb).map(([k, fn]) => [
    k,
    async (...args: unknown[]) => (fn as (...a: unknown[]) => unknown)(...args),
  ])
) as unknown as DbApi;

export const db: DbApi = process.env.MONGODB_URI ? (mongoDb as unknown as DbApi) : jsonAsync;
