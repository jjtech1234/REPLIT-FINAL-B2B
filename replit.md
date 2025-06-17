# B2B Market - Business Franchise Platform

## Overview

B2B Market is a full-stack web application that serves as a global platform connecting business buyers and sellers. The application specializes in franchise opportunities, business sales, and related services, built with a modern React frontend and Express.js backend architecture.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Built-in session handling with connect-pg-simple
- **Development**: Hot reload with tsx for TypeScript execution

### Project Structure
```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route components
│   │   ├── lib/          # Utilities and configuration
│   │   └── hooks/        # Custom React hooks
├── server/               # Express backend
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Database abstraction layer
│   └── db.ts            # Database connection
├── shared/               # Shared types and schemas
└── migrations/           # Database migrations
```

## Key Components

### Database Schema
The application uses four main entities:
- **Users**: Authentication and user management
- **Franchises**: Franchise listings with investment details
- **Businesses**: Business sale listings
- **Advertisements**: Marketing content management

### API Architecture
RESTful API design with endpoints for:
- Franchise management (CRUD operations)
- Business listings (CRUD operations)
- Search functionality with filtering
- Advertisement management
- Contact/inquiry handling

### Frontend Components
- **Header**: Navigation with mobile responsiveness
- **HeroSearch**: Multi-tab search interface for franchises/businesses
- **FranchiseShowcase**: Grid display with carousel functionality
- **Footer**: Company information and links

## Data Flow

1. **User Interaction**: Users interact with React components
2. **State Management**: TanStack Query manages API calls and caching
3. **API Communication**: Frontend communicates with Express backend via REST
4. **Data Processing**: Backend validates requests using Zod schemas
5. **Database Operations**: Drizzle ORM handles PostgreSQL interactions
6. **Response Handling**: JSON responses flow back through the stack

## External Dependencies

### Core Technologies
- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle with PostgreSQL dialect
- **Validation**: Zod for runtime type checking
- **UI Framework**: Radix UI primitives
- **Styling**: Tailwind CSS with PostCSS

### Development Tools
- **TypeScript**: Full-stack type safety
- **Vite**: Frontend build tool with HMR
- **ESBuild**: Backend bundling for production
- **TSX**: TypeScript execution for development

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20
- **Database**: PostgreSQL 16
- **Port Configuration**: Frontend on 5000, mapped to external port 80
- **Hot Reload**: Enabled for both frontend and backend

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: ESBuild bundles server to `dist/index.js`
- **Deployment**: Autoscale deployment target on Replit
- **Database**: Neon serverless PostgreSQL with connection pooling

### Build Scripts
- `npm run dev`: Development mode with hot reload
- `npm run build`: Production build (frontend + backend)
- `npm run start`: Production server
- `npm run db:push`: Database schema migration

## Changelog

Recent Changes:
- June 17, 2025: Implemented complete admin approval system for advertisements with activate/deactivate controls
- June 17, 2025: Added advertisement status tracking (pending, active, inactive) and payment status (unpaid, paid, refunded)
- June 17, 2025: Created admin endpoints for advertisement management with status update functionality
- June 17, 2025: Updated Post Ad form to submit advertisements as "pending" for admin approval
- June 17, 2025: Enhanced admin dashboard to show advertisement status, payment status, and activation controls
- June 17, 2025: Fixed advertisement package selection functionality with interactive radio buttons
- June 17, 2025: Added complete advertisement database schema with package, company, and contact fields
- June 17, 2025: Enhanced admin dashboard with tabbed interface to view both business inquiries and submitted advertisements
- June 17, 2025: Added advertisements management section showing all ads submitted via "Post An Ad" form
- June 17, 2025: Implemented dynamic contact page titles when accessed from services page
- June 17, 2025: Created comprehensive admin dashboard at /admin to view and manage business inquiries
- June 17, 2025: Added inquiry status management system (pending, replied, closed) with database updates
- June 17, 2025: Fixed all "Get Started" button navigation in services page to properly route to contact
- June 17, 2025: Completely removed phone number fields from contact forms and contact information
- June 17, 2025: Updated scrolling banner to show text only once in continuous loop
- June 17, 2025: Updated About Us page content with user-provided text about B2B Market
- June 17, 2025: Implemented price range filtering functionality for franchise search
- June 17, 2025: Limited countries dropdown to USA, Australia, India, UK, Europe only
- June 17, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.