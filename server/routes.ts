import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFranchiseSchema, insertBusinessSchema, insertInquirySchema, insertAdvertisementSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Franchise routes
  app.get("/api/franchises", async (req, res) => {
    try {
      const franchises = await storage.getAllFranchises();
      res.json(franchises);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch franchises" });
    }
  });

  app.get("/api/franchises/search", async (req, res) => {
    try {
      const { category, country, state, priceRange } = req.query;
      const franchises = await storage.searchFranchises({
        category: category as string,
        country: country as string,
        state: state as string,
        priceRange: priceRange as string,
      });
      res.json(franchises);
    } catch (error) {
      res.status(500).json({ error: "Failed to search franchises" });
    }
  });

  app.get("/api/franchises/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const franchise = await storage.getFranchiseById(id);
      if (!franchise) {
        return res.status(404).json({ error: "Franchise not found" });
      }
      res.json(franchise);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch franchise" });
    }
  });

  app.post("/api/franchises", async (req, res) => {
    try {
      const validatedData = insertFranchiseSchema.parse(req.body);
      const franchise = await storage.createFranchise(validatedData);
      res.status(201).json(franchise);
    } catch (error) {
      res.status(400).json({ error: "Invalid franchise data" });
    }
  });

  // Business routes
  app.get("/api/businesses", async (req, res) => {
    try {
      const businesses = await storage.getAllBusinesses();
      res.json(businesses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch businesses" });
    }
  });

  app.get("/api/businesses/search", async (req, res) => {
    try {
      const { category, country, state, maxPrice } = req.query;
      const businesses = await storage.searchBusinesses({
        category: category as string,
        country: country as string,
        state: state as string,
        maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined,
      });
      res.json(businesses);
    } catch (error) {
      res.status(500).json({ error: "Failed to search businesses" });
    }
  });

  app.get("/api/businesses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const business = await storage.getBusinessById(id);
      if (!business) {
        return res.status(404).json({ error: "Business not found" });
      }
      res.json(business);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch business" });
    }
  });

  app.post("/api/businesses", async (req, res) => {
    try {
      const validatedData = insertBusinessSchema.parse(req.body);
      const business = await storage.createBusiness(validatedData);
      res.status(201).json(business);
    } catch (error) {
      console.error("Business creation error:", error);
      res.status(400).json({ error: "Invalid business data" });
    }
  });

  // Admin endpoint to get all businesses including pending ones
  app.get("/api/admin/businesses", async (req, res) => {
    try {
      const businesses = await storage.getAllBusinessesForAdmin();
      res.json(businesses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch businesses" });
    }
  });

  // Admin endpoint to update business status
  app.patch("/api/businesses/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, isActive } = req.body;
      
      if (!["pending", "active", "inactive"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      
      const business = await storage.updateBusinessStatus(id, status, isActive);
      if (!business) {
        return res.status(404).json({ error: "Business not found" });
      }
      res.json(business);
    } catch (error) {
      res.status(500).json({ error: "Failed to update business status" });
    }
  });

  // Advertisement routes
  app.get("/api/advertisements", async (req, res) => {
    try {
      const ads = await storage.getAllAdvertisements();
      res.json(ads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch advertisements" });
    }
  });

  app.post("/api/advertisements", async (req, res) => {
    try {
      const validatedData = insertAdvertisementSchema.parse(req.body);
      const advertisement = await storage.createAdvertisement(validatedData);
      res.status(201).json(advertisement);
    } catch (error) {
      console.error("Advertisement creation error:", error);
      res.status(400).json({ error: "Invalid advertisement data" });
    }
  });

  // Admin endpoint to get all advertisements including pending ones
  app.get("/api/admin/advertisements", async (req, res) => {
    try {
      const ads = await storage.getAllAdvertisementsForAdmin();
      res.json(ads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch advertisements" });
    }
  });

  // Admin endpoint to update advertisement status
  app.patch("/api/advertisements/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, isActive } = req.body;
      
      if (!["pending", "active", "inactive"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      
      const advertisement = await storage.updateAdvertisementStatus(id, status, isActive);
      if (!advertisement) {
        return res.status(404).json({ error: "Advertisement not found" });
      }
      res.json(advertisement);
    } catch (error) {
      res.status(500).json({ error: "Failed to update advertisement status" });
    }
  });

  // Inquiry routes
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      res.status(400).json({ error: "Invalid inquiry data" });
    }
  });

  app.get("/api/inquiries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const inquiry = await storage.getInquiryById(id);
      if (!inquiry) {
        return res.status(404).json({ error: "Inquiry not found" });
      }
      res.json(inquiry);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inquiry" });
    }
  });

  app.patch("/api/inquiries/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!["pending", "replied", "closed"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      
      const inquiry = await storage.updateInquiryStatus(id, status);
      if (!inquiry) {
        return res.status(404).json({ error: "Inquiry not found" });
      }
      res.json(inquiry);
    } catch (error) {
      res.status(500).json({ error: "Failed to update inquiry status" });
    }
  });

  // Franchise inquiry endpoint
  app.post("/api/franchises/:id/inquire", async (req, res) => {
    try {
      const franchiseId = parseInt(req.params.id);
      const { name, email, phone, message } = req.body;
      
      const inquiry = await storage.createInquiry({
        name,
        email,
        phone,
        subject: "Franchise Inquiry",
        message,
        franchiseId,
        status: "pending"
      });
      
      res.json({ 
        success: true, 
        message: "Inquiry submitted successfully. We will contact you within 24 hours.",
        inquiryId: inquiry.id
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit inquiry" });
    }
  });

  // Business inquiry endpoint
  app.post("/api/businesses/:id/inquire", async (req, res) => {
    try {
      const businessId = parseInt(req.params.id);
      const { name, email, phone, message } = req.body;
      
      const inquiry = await storage.createInquiry({
        name,
        email,
        phone,
        subject: "Business Inquiry",
        message,
        businessId,
        status: "pending"
      });
      
      res.json({ 
        success: true, 
        message: "Inquiry submitted successfully. We will contact you within 24 hours.",
        inquiryId: inquiry.id
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit inquiry" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      
      const inquiry = await storage.createInquiry({
        name,
        email,
        phone,
        subject,
        message,
        status: "pending"
      });
      
      res.json({ 
        success: true, 
        message: "Message sent successfully. We will respond within 24 hours.",
        inquiryId: inquiry.id
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
