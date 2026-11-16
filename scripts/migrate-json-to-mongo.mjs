// One-off, non-destructive migration: data/db/*.json -> MongoDB.
// Usage:  MONGODB_URI=... node scripts/migrate-json-to-mongo.mjs [--dry-run]
// - Only inserts records whose `id` is not already in MongoDB (never overwrites or deletes).
// - Never modifies or deletes the local JSON files.
import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set.");
  process.exit(1);
}
const dryRun = process.argv.includes("--dry-run");
const dbName = process.env.MONGODB_DB || "cornerstone";
const dir = path.join(process.cwd(), "data", "db");

const client = await new MongoClient(uri).connect();
const db = client.db(dbName);
let failed = false;

for (const name of ["users", "jobs", "contacts"]) {
  const file = path.join(dir, `${name}.json`);
  if (!fs.existsSync(file)) {
    console.log(`${name}: no JSON file, skipped`);
    continue;
  }
  const records = JSON.parse(fs.readFileSync(file, "utf-8"));
  const col = db.collection(name);
  const existing = new Set((await col.find({}, { projection: { id: 1 } }).toArray()).map((d) => d.id));
  const toInsert = records.filter((r) => !existing.has(r.id));
  if (!dryRun && toInsert.length) await col.insertMany(toInsert.map((r) => ({ ...r })));
  if (!dryRun && name === "jobs") {
    // JSON data already exists, so never auto-seed demo jobs on top of it.
    await db.collection("meta").updateOne({ _id: "jobs_seeded" }, { $set: { at: new Date().toISOString() } }, { upsert: true });
  }
  const after = dryRun ? existing.size + toInsert.length : await col.countDocuments();
  const ok = after >= records.length;
  if (!ok) failed = true;
  console.log(`${name}: json=${records.length} already-in-mongo=${existing.size} ${dryRun ? "would-insert" : "inserted"}=${toInsert.length} mongo-total=${after} ${ok ? "OK" : "MISMATCH"}`);
}

await client.close();
process.exit(failed ? 1 : 0);
