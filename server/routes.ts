import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFranchiseSchema, insertBusinessSchema } from "@shared/schema";

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
      res.status(400).json({ error: "Invalid business data" });
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

  const httpServer = createServer(app);
  return httpServer;
}
