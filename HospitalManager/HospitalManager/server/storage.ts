import { 
  type Patient, type InsertPatient,
  type Doctor, type InsertDoctor,
  type Appointment, type InsertAppointment,
  type Department, type InsertDepartment
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPatient(id: string): Promise<Patient | undefined>;
  getAllPatients(): Promise<Patient[]>;
  createPatient(patient: InsertPatient): Promise<Patient>;
  updatePatient(id: string, patient: Partial<InsertPatient>): Promise<Patient | undefined>;
  deletePatient(id: string): Promise<boolean>;
  
  getDoctor(id: string): Promise<Doctor | undefined>;
  getAllDoctors(): Promise<Doctor[]>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
  updateDoctor(id: string, doctor: Partial<InsertDoctor>): Promise<Doctor | undefined>;
  deleteDoctor(id: string): Promise<boolean>;
  
  getAppointment(id: string): Promise<Appointment | undefined>;
  getAllAppointments(): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: string, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  deleteAppointment(id: string): Promise<boolean>;
  
  getDepartment(id: string): Promise<Department | undefined>;
  getAllDepartments(): Promise<Department[]>;
  createDepartment(department: InsertDepartment): Promise<Department>;
  updateDepartment(id: string, department: Partial<InsertDepartment>): Promise<Department | undefined>;
  deleteDepartment(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private patients: Map<string, Patient>;
  private doctors: Map<string, Doctor>;
  private appointments: Map<string, Appointment>;
  private departments: Map<string, Department>;

  constructor() {
    this.patients = new Map();
    this.doctors = new Map();
    this.appointments = new Map();
    this.departments = new Map();
  }

  async getPatient(id: string): Promise<Patient | undefined> {
    return this.patients.get(id);
  }

  async getAllPatients(): Promise<Patient[]> {
    return Array.from(this.patients.values());
  }

  async createPatient(insertPatient: InsertPatient): Promise<Patient> {
    const id = randomUUID();
    const patient: Patient = { 
      ...insertPatient, 
      id,
      allergies: insertPatient.allergies ?? null,
      medicalHistory: insertPatient.medicalHistory ?? null,
    };
    this.patients.set(id, patient);
    return patient;
  }

  async updatePatient(id: string, updates: Partial<InsertPatient>): Promise<Patient | undefined> {
    const existing = this.patients.get(id);
    if (!existing) return undefined;
    
    const updated: Patient = {
      ...existing,
      ...updates,
      id,
      allergies: updates.allergies !== undefined ? (updates.allergies ?? null) : existing.allergies,
      medicalHistory: updates.medicalHistory !== undefined ? (updates.medicalHistory ?? null) : existing.medicalHistory,
    };
    this.patients.set(id, updated);
    return updated;
  }

  async deletePatient(id: string): Promise<boolean> {
    return this.patients.delete(id);
  }

  async getDoctor(id: string): Promise<Doctor | undefined> {
    return this.doctors.get(id);
  }

  async getAllDoctors(): Promise<Doctor[]> {
    return Array.from(this.doctors.values());
  }

  async createDoctor(insertDoctor: InsertDoctor): Promise<Doctor> {
    const id = randomUUID();
    const doctor: Doctor = { ...insertDoctor, id };
    this.doctors.set(id, doctor);
    return doctor;
  }

  async updateDoctor(id: string, updates: Partial<InsertDoctor>): Promise<Doctor | undefined> {
    const existing = this.doctors.get(id);
    if (!existing) return undefined;
    
    const updated: Doctor = { ...existing, ...updates, id };
    this.doctors.set(id, updated);
    return updated;
  }

  async deleteDoctor(id: string): Promise<boolean> {
    return this.doctors.delete(id);
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const appointment: Appointment = { ...insertAppointment, id };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async updateAppointment(id: string, updates: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const existing = this.appointments.get(id);
    if (!existing) return undefined;
    
    const updated: Appointment = { ...existing, ...updates, id };
    this.appointments.set(id, updated);
    return updated;
  }

  async deleteAppointment(id: string): Promise<boolean> {
    return this.appointments.delete(id);
  }

  async getDepartment(id: string): Promise<Department | undefined> {
    return this.departments.get(id);
  }

  async getAllDepartments(): Promise<Department[]> {
    return Array.from(this.departments.values());
  }

  async createDepartment(insertDepartment: InsertDepartment): Promise<Department> {
    const id = randomUUID();
    const department: Department = { ...insertDepartment, id };
    this.departments.set(id, department);
    return department;
  }

  async updateDepartment(id: string, updates: Partial<InsertDepartment>): Promise<Department | undefined> {
    const existing = this.departments.get(id);
    if (!existing) return undefined;
    
    const updated: Department = { ...existing, ...updates, id };
    this.departments.set(id, updated);
    return updated;
  }

  async deleteDepartment(id: string): Promise<boolean> {
    return this.departments.delete(id);
  }
}

export const storage = new MemStorage();
