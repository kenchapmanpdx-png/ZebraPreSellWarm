/* api/_lib/db.ts
 * Drizzle + Neon adapter. Used by serverless functions on Vercel.
 * Uses LOCAL schemas (./schemas) to avoid path-traversal bundle issues.
 */
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schemas";

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
