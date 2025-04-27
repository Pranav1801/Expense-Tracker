## Architecture Documentation

```markdown
# Expense Tracker Architecture

## Overview

The Expense Tracker is a full-stack application with the following components:

1. **Frontend**: React.js single-page application
2. **Backend**: Node.js/Express REST API
3. **Database**: PostgreSQL with Sequelize ORM

## Flow

### Authentication Flow

1. User registers or logs in via the frontend
2. Frontend sends credentials to `/api/auth/register` or `/api/auth/login`
3. Backend validates credentials, creates user if needed, and returns JWT token
4. Frontend stores token in localStorage and includes it in subsequent requests

### Expense Management Flow

1. Authenticated user adds/edits/deletes expenses via the frontend
2. Frontend sends requests to `/api/expenses` endpoints with JWT in headers
3. Backend validates JWT, checks user permissions, and performs DB operations
4. Backend returns success/failure response to frontend
5. Frontend updates UI accordingly

### Data Visualization Flow

1. Frontend requests expense statistics from `/api/expenses/stats`
2. Backend queries database and aggregates data by category
3. Frontend renders charts using Chart.js with the received data

## Database Schema

### Users Table
- id (PK)
- username
- email
- password (hashed)

### Expenses Table
- id (PK)
- amount
- category
- description
- date
- UserId (FK to Users)

## API Endpoints

### Auth Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Expense Endpoints
- POST /api/expenses
- GET /api/expenses
- PUT /api/expenses/:id
- DELETE /api/expenses/:id
- GET /api/expenses/stats