import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertPreorderReservationSchema,
  insertContactSubmissionSchema,
  insertSampleRequestSchema,
  insertWaitlistSubmissionSchema
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for preorder reservations
  app.post('/api/preorder', async (req, res) => {
    try {
      const validationResult = insertPreorderReservationSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: validationError.details 
        });
      }

      const reservation = await storage.createPreorderReservation(validationResult.data);
      return res.status(201).json({ 
        message: "Preorder reservation created successfully",
        data: reservation
      });
    } catch (error) {
      console.error('Error creating preorder reservation:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // API route for contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      const validationResult = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: validationError.details 
        });
      }

      const submission = await storage.createContactSubmission(validationResult.data);
      return res.status(201).json({ 
        message: "Contact form submitted successfully",
        data: submission
      });
    } catch (error) {
      console.error('Error creating contact submission:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // API route for sample requests
  app.post('/api/request-sample', async (req, res) => {
    try {
      const validationResult = insertSampleRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: validationError.details 
        });
      }

      const request = await storage.createSampleRequest(validationResult.data);
      return res.status(201).json({ 
        message: "Sample request submitted successfully",
        data: request
      });
    } catch (error) {
      console.error('Error creating sample request:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // API route for waitlist submissions
  app.post('/api/waitlist', async (req, res) => {
    try {
      const validationResult = insertWaitlistSubmissionSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: validationError.details 
        });
      }

      const submission = await storage.createWaitlistSubmission(validationResult.data);
      return res.status(201).json({ 
        message: "Successfully joined the waitlist!",
        data: submission
      });
    } catch (error) {
      console.error('Error creating waitlist submission:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all submissions (for admin/debugging purposes)
  app.get('/api/admin/preorders', async (req, res) => {
    try {
      const reservations = await storage.getPreorderReservations();
      return res.json({ data: reservations });
    } catch (error) {
      console.error('Error fetching preorder reservations:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get('/api/admin/contacts', async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      return res.json({ data: submissions });
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get('/api/admin/samples', async (req, res) => {
    try {
      const requests = await storage.getSampleRequests();
      return res.json({ data: requests });
    } catch (error) {
      console.error('Error fetching sample requests:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get('/api/admin/waitlist', async (req, res) => {
    try {
      const submissions = await storage.getWaitlistSubmissions();
      return res.json({ data: submissions });
    } catch (error) {
      console.error('Error fetching waitlist submissions:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
