import { pgTable, serial, text, timestamp, integer, doublePrecision, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("farmer"), // "farmer" | "admin" | "expert"
  location: text("location").notNull().default("Karnal, Haryana"),
  latitude: doublePrecision("latitude").default(29.6857),
  longitude: doublePrecision("longitude").default(76.9905),
  preferredLanguage: text("preferred_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cropAnalyses = pgTable("crop_analyses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  cropType: text("crop_type").notNull(), // Wheat, Rice, Cotton, etc.
  cropAgeDays: integer("crop_age_days"),
  symptoms: text("symptoms"),
  irrigationStatus: text("irrigation_status"),
  imageUrl: text("image_url").notNull(),
  aiResult: text("ai_result").notNull(), // e.g. "Possible Yellow Rust (Puccinia striiformis)"
  aiDiseaseKey: text("ai_disease_key").notNull(),
  confidence: integer("confidence").notNull(), // e.g. 92
  riskLevel: text("risk_level").notNull(), // "LOW" | "MODERATE" | "HIGH"
  riskScore: integer("risk_score").notNull(), // 0 - 100
  riskBreakdown: jsonb("risk_breakdown"), // { imageScore: 46, weatherScore: 16, symptomsScore: 12, areaScore: 14 }
  location: text("location").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  weatherData: jsonb("weather_data"), // { temp: 24, humidity: 82, rainProb: 65, condition: "Cloudy", windKph: 14 }
  guidance: text("guidance").notNull(),
  actionPlan: jsonb("action_plan"), // string[] of practical steps
  isDemo: integer("is_demo").default(0), // 1 if simulated demo
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  cropType: text("crop_type").notNull(),
  area: text("area").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  riskLevel: text("risk_level").notNull(), // "LOW" | "MODERATE" | "HIGH"
  reportCount: integer("report_count").notNull().default(1),
  status: text("status").notNull().default("Requires Investigation"), // "Requires Investigation", "Field Team Dispatched", "Advisory Issued", "Resolved"
  conditionName: text("condition_name").notNull(),
  advisoryText: text("advisory_text"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  cropType: text("crop_type").notNull(),
  location: text("location").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  riskLevel: text("risk_level").notNull().default("MODERATE"),
  aiResult: text("ai_result"),
  status: text("status").notNull().default("New"), // "New" | "Under Review" | "Verified" | "Resolved"
  assignedOfficer: text("assigned_officer"),
  authorityNotes: text("authority_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
