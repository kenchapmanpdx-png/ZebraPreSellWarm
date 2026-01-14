import { 
  type PreorderReservation, 
  type InsertPreorderReservation,
  type ContactSubmission,
  type InsertContactSubmission,
  type SampleRequest,
  type InsertSampleRequest,
  type WaitlistSubmission,
  type InsertWaitlistSubmission
} from "@shared/schema";

export interface IStorage {
  // Preorder reservations
  createPreorderReservation(reservation: InsertPreorderReservation): Promise<PreorderReservation>;
  getPreorderReservations(): Promise<PreorderReservation[]>;
  getPreorderReservation(id: number): Promise<PreorderReservation | undefined>;
  
  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  
  // Sample requests
  createSampleRequest(request: InsertSampleRequest): Promise<SampleRequest>;
  getSampleRequests(): Promise<SampleRequest[]>;
  getSampleRequest(id: number): Promise<SampleRequest | undefined>;
  
  // Waitlist
  createWaitlistSubmission(submission: InsertWaitlistSubmission): Promise<WaitlistSubmission>;
  getWaitlistSubmissions(): Promise<WaitlistSubmission[]>;
}

export class MemStorage implements IStorage {
  private preorderReservations: Map<number, PreorderReservation>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private sampleRequests: Map<number, SampleRequest>;
  private waitlistSubmissions: Map<number, WaitlistSubmission>;
  private currentPreorderReservationId: number;
  private currentContactSubmissionId: number;
  private currentSampleRequestId: number;
  private currentWaitlistSubmissionId: number;

  constructor() {
    this.preorderReservations = new Map();
    this.contactSubmissions = new Map();
    this.sampleRequests = new Map();
    this.waitlistSubmissions = new Map();
    this.currentPreorderReservationId = 1;
    this.currentContactSubmissionId = 1;
    this.currentSampleRequestId = 1;
    this.currentWaitlistSubmissionId = 1;
  }

  // Preorder reservations
  async createPreorderReservation(insertReservation: InsertPreorderReservation): Promise<PreorderReservation> {
    const id = this.currentPreorderReservationId++;
    const reservation: PreorderReservation = { 
      ...insertReservation,
      id,
      createdAt: new Date(),
      // Convert undefined to null for database compatibility
      phone: insertReservation.phone ?? null,
      conditions: insertReservation.conditions ?? null,
      currentSupplements: insertReservation.currentSupplements ?? null,
      hearAboutUs: insertReservation.hearAboutUs ?? null,
    };
    this.preorderReservations.set(id, reservation);
    return reservation;
  }

  async getPreorderReservations(): Promise<PreorderReservation[]> {
    return Array.from(this.preorderReservations.values());
  }

  async getPreorderReservation(id: number): Promise<PreorderReservation | undefined> {
    return this.preorderReservations.get(id);
  }

  // Contact submissions
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactSubmissionId++;
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id,
      createdAt: new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }

  // Sample requests
  async createSampleRequest(insertRequest: InsertSampleRequest): Promise<SampleRequest> {
    const id = this.currentSampleRequestId++;
    const request: SampleRequest = { 
      ...insertRequest, 
      id,
      createdAt: new Date()
    };
    this.sampleRequests.set(id, request);
    return request;
  }

  async getSampleRequests(): Promise<SampleRequest[]> {
    return Array.from(this.sampleRequests.values());
  }

  async getSampleRequest(id: number): Promise<SampleRequest | undefined> {
    return this.sampleRequests.get(id);
  }

  // Waitlist
  async createWaitlistSubmission(insertSubmission: InsertWaitlistSubmission): Promise<WaitlistSubmission> {
    const id = this.currentWaitlistSubmissionId++;
    const submission: WaitlistSubmission = { 
      ...insertSubmission, 
      id,
      createdAt: new Date()
    };
    this.waitlistSubmissions.set(id, submission);
    return submission;
  }

  async getWaitlistSubmissions(): Promise<WaitlistSubmission[]> {
    return Array.from(this.waitlistSubmissions.values());
  }
}

export const storage = new MemStorage();
