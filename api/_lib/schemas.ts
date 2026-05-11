/* api/_lib/schemas.ts
 *
 * Validation schemas + Drizzle table definitions, kept INSIDE the api/
 * directory so Vercel's function bundler doesn't need to trace
 * relative imports to /shared. Path-traversal imports
 * (../shared/schema) caused ERR_MODULE_NOT_FOUND at runtime even
 * when the build succeeded.
 *
 * This is a near-duplicate of shared/schema.ts; the original stays
 * for the Express dev server and Drizzle CLI (db:push). When schema
 * changes, update BOTH files. Keep them in sync.
 */
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const preorderReservations = pgTable("preorder_reservations", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  conditions: text("conditions").array(),
  currentSupplements: text("current_supplements"),
  hearAboutUs: text("hear_about_us"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const sampleRequests = pgTable("sample_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const waitlistSubmissions = pgTable("waitlist_submissions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPreorderReservationSchema = createInsertSchema(preorderReservations).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  conditions: z.array(z.string()).optional(),
  currentSupplements: z.string().optional(),
  hearAboutUs: z.string().optional(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(1, "Message is required"),
});

export const insertSampleRequestSchema = createInsertSchema(sampleRequests).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  reason: z.string().min(1, "Reason is required"),
});

export const insertWaitlistSubmissionSchema = createInsertSchema(waitlistSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});
