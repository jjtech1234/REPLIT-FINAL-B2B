import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import type { Request, Response, NextFunction } from 'express';
import { storage } from './storage';

// JWT Secret - in production this should be from environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Session configuration
export function getSessionConfig() {
  const pgStore = connectPg(session);
  return session({
    store: new pgStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: false, // Prevent conflicts with existing tables
    }),
    secret: process.env.SESSION_SECRET || 'your-session-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  });
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): { userId: number } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch {
    return null;
  }
}

// Auth middleware
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    // Check for JWT token in Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    // Check session for user ID
    const sessionUserId = (req.session as any)?.userId;

    let userId: number | null = null;

    if (token) {
      const decoded = verifyToken(token);
      userId = decoded?.userId || null;
    } else if (sessionUserId) {
      userId = sessionUserId;
    }

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Get user from database
    const user = await storage.getUser(userId);
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }

    // Add user to request object
    (req as any).user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
}

// Admin authentication middleware
export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    // First check regular auth
    await new Promise<void>((resolve, reject) => {
      requireAuth(req, res, (err: any) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const user = (req as any).user;
    if (!user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
}

// Optional auth middleware (doesn't require auth but adds user if available)
export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;
    
    const sessionUserId = (req.session as any)?.userId;

    let userId: number | null = null;

    if (token) {
      const decoded = verifyToken(token);
      userId = decoded?.userId || null;
    } else if (sessionUserId) {
      userId = sessionUserId;
    }

    if (userId) {
      const user = await storage.getUser(userId);
      if (user && user.isActive) {
        (req as any).user = user;
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue without auth
  }
}