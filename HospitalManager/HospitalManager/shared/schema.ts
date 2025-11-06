import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const patients = pgTable("patients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  address: text("address").notNull(),
  bloodType: text("blood_type").notNull(),
  allergies: text("allergies"),
  medicalHistory: text("medical_history"),
});

export const doctors = pgTable("doctors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  specialization: text("specialization").notNull(),
  department: text("department").notNull(),
  experience: integer("experience").notNull(),
  availability: text("availability").notNull(),
});

export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: varchar("patient_id").notNull(),
  doctorId: varchar("doctor_id").notNull(),
  patientName: text("patient_name").notNull(),
  doctorName: text("doctor_name").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  reason: text("reason").notNull(),
  status: text("status").notNull(),
});

export const departments = pgTable("departments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  headDoctor: text("head_doctor").notNull(),
  staffCount: integer("staff_count").notNull(),
  bedCount: integer("bed_count").notNull(),
  availableBeds: integer("available_beds").notNull(),
});

export const insertPatientSchema = createInsertSchema(patients).omit({ id: true });
export const insertDoctorSchema = createInsertSchema(doctors).omit({ id: true });
export const insertAppointmentSchema = createInsertSchema(appointments).omit({ id: true });
export const insertDepartmentSchema = createInsertSchema(departments).omit({ id: true });

export type InsertPatient = z.infer<typeof insertPatientSchema>;
export type Patient = typeof patients.$inferSelect;

export type InsertDoctor = z.infer<typeof insertDoctorSchema>;
export type Doctor = typeof doctors.$inferSelect;

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;
export type Department = typeof departments.$inferSelect;
