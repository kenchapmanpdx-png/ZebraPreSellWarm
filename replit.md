# ZebraWell - Wellness Supplements for Rare Conditions

## Overview

ZebraWell is a modern wellness supplement company focused on providing clinical-grade supplements for individuals with rare conditions including EDS (Ehlers-Danlos Syndrome), POTS (Postural Orthostatic Tachycardia Syndrome), and MCAS (Mast Cell Activation Syndrome). The application is a full-stack web platform built with React and Express, featuring a comprehensive product showcase, educational content, and contact management system.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: In-memory storage (development)
- **API**: RESTful endpoints for contact forms and sample requests

### Development Environment
- **Platform**: Replit with Node.js 20, PostgreSQL 16
- **Build System**: Vite for frontend, esbuild for backend
- **Package Manager**: npm with lockfile version 3

## Key Components

### Frontend Components
1. **Landing Page**: Hero section with product showcase
2. **Product Grid**: Detailed AM/PM formula displays with ingredient tooltips
3. **Educational Sections**: Why ZebraWell, comparison tables, testimonials
4. **Interactive Elements**: Sample request modal, contact forms
5. **Design System**: Consistent zebra-pattern theming with earth tones

### Backend Services
1. **Contact API**: Handles contact form submissions
2. **Sample Request API**: Manages product sample requests
3. **Static File Serving**: Serves React application in production
4. **Development Server**: Vite integration for hot reloading

### Database Schema
- **Users Table**: Basic user authentication structure
- **Drizzle ORM**: Type-safe database operations
- **PostgreSQL**: Production-ready relational database

## Data Flow

1. **User Interaction**: Users interact with React components in the browser
2. **State Management**: TanStack Query manages server state and caching
3. **API Requests**: Frontend makes HTTP requests to Express backend
4. **Data Processing**: Express routes handle business logic
5. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
6. **Response Handling**: Data flows back through the same path

## External Dependencies

### Core Dependencies
- **@radix-ui/***: Accessible UI primitives
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database toolkit
- **@neondatabase/serverless**: PostgreSQL connection
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type safety and developer experience
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Static Assets**: Served directly by Express in production

### Environment Configuration
- **Development**: `npm run dev` starts both frontend and backend with hot reload
- **Production**: `npm run build && npm run start` for optimized deployment
- **Database**: Configured via `DATABASE_URL` environment variable

### Replit Deployment
- **Autoscale**: Configured for automatic scaling
- **Port**: External port 80 maps to internal port 5000
- **Build Process**: Automated build on deployment

## Changelog

Changelog:
- June 13, 2025. Initial setup
- June 15, 2025. Major structural reorganization:
  - Moved all 8 benefits from "Why Choose ZebraWell" section to "What Makes ZebraWell Different" section
  - Removed entire "Why Choose ZebraWell" section from site
  - Updated navigation links to point to "What Makes Us Different" section
  - Doubled font size for ingredient benefits in tooltips (text-lg to text-2xl)
  - Reduced ingredient tab height by 50% in "Why Each Ingredient Matters" section (p-4 to p-2)
  - Logo refinements: removed black border, increased white circle opacity to 0.9
  - Updated bottle image styling with rounded corners and removed border trim
  - Updated hero statement to emphasize full condition names and therapeutic focus
  - Refined AM/PM formula descriptions to remove MCAS reference and emphasize day/night support
- June 23, 2025. Preorder functionality implementation:
  - Added preorder reservation system with email collection
  - Removed "What's Inside" section (120 capsules, 4 AM/4 PM dosing info)
  - Removed "💬 What People Are Saying" testimonials section (Emily and Sarah quotes)
  - Updated hero with "Coming Soon" badge and "Join Reservation List" button
  - Created dedicated preorder page at /preorder with comprehensive reservation experience
  - Updated floating CTA to focus on reservation list instead of sample requests
  - Added interactive ingredient-to-benefit map after Ava story section
  - Integrated 36 ingredients connecting to 14 health goals with visual highlighting
  - Restructured hero layout: full-width heading, two-column below with reservation form left and bottle image right
  - Moved reservation form from bottom of hero to left column beside bottle image
  - Kept full reservation form later in the page for detailed signup experience
  - Maintained original styling and color scheme while adding preorder functionality

## User Preferences

Preferred communication style: Simple, everyday language.