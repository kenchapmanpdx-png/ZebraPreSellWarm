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
 *
 * The request validation rules below (trim, max lengths, messages) are only
 * enforced here; shared/schema.ts is used by drizzle-kit for table
 * definitions only, so the two may differ in validation without harm.
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


export const waitlistSubmissions = pgTable("waitlist_submissions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* Field helpers: every string is trimmed and length-capped. Messages are
 * short and human because the first one is shown to the user on a 400. */
const requiredText = (label: string, max: number) =>
  z
    .string({ required_error: `${label} is required`, invalid_type_error: `${label} must be text` })
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} is too long (${max} characters max)`);

const optionalText = (label: string, max: number) =>
  z
    .string({ invalid_type_error: `${label} must be text` })
    .trim()
    .max(max, `${label} is too long (${max} characters max)`)
    .optional();

const emailField = z
  .string({ required_error: "Email is required", invalid_type_error: "Email must be text" })
  .trim()
  .min(1, "Email is required")
  .max(254, "Email is too long (254 characters max)")
  .email("Please enter a valid email address");

export const insertPreorderReservationSchema = createInsertSchema(preorderReservations).omit({
  id: true,
  createdAt: true,
}).extend({
  email: emailField,
  firstName: requiredText("First name", 100),
  lastName: requiredText("Last name", 100),
  phone: optionalText("Phone", 40),
  conditions: z
    .array(
      z
        .string({ invalid_type_error: "Each condition must be text" })
        .trim()
        .max(60, "Each condition must be 60 characters or fewer"),
      { invalid_type_error: "Conditions must be a list" },
    )
    .max(10, "Please choose 10 conditions or fewer")
    .optional(),
  currentSupplements: optionalText("Current supplements", 2000),
  hearAboutUs: optionalText("How you heard about us", 200),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  name: requiredText("Name", 100),
  email: emailField,
  message: requiredText("Message", 5000),
});


export const insertWaitlistSubmissionSchema = createInsertSchema(waitlistSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  email: emailField,
});
