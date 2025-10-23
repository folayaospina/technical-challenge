# Technical Challenge

## Project Overview

This project consists of a frontend and backend application for managing patients,providers and their statuses.

## Architecture

- **Backend**: REST API server handling provider data and status management
- **Frontend**: Client application for user interface and data visualization
- **Database**: Data persistence layer with seeded providers and statuses

## Prerequisites

- Node.js
- npm
- Database system (PostgreSQL)

## Installation & Setup

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npx prisma migrate dev

# Seed the database with initial data
npx prisma db seed

# Start the backend server
npm run start:dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd front

# Install dependencies
npm install


# Start the frontend application
npm run dev
```

## Running the Complete Application

1. Start the backend server (usually runs on port 3000)
2. Start the frontend application (usually runs on port 5173)
3. Access the application at `http://localhost:5173`

## Seed Data

The seed script will populate the database with:
- Sample providers
- Sample Patients
- Available status options
- Initial provider-status relationships

Run: `npx prisma db seed` in the backend directory

## Design Decisions

- **Separation of Concerns**: Frontend and backend are separate applications
- **RESTful API**: Standard HTTP methods for CRUD operations
- **Seeded Data**: Consistent starting point for development and testing


## POSTMAN
- **POSTMAN DOC**: You can find in this files a postman collection with all endpoints