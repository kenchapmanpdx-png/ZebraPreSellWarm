/* api/_lib/db.ts
 * Drizzle + Neon adapter. Used by serverless functions on Vercel.
 * If DATABASE_URL is unset (e.g. local dev or pre-DB-provisioning), we log and
 * skip persistence so the form submission still succeeds. This keeps the UX
 * working while a real DB is being wired.
 */
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../../shared/schema";

neonConfig.fetchConnectionCache = true;

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  const sql = neon(url);
  _db = drizzle(sql, { schema });
  return _db;
}

export { schema };
