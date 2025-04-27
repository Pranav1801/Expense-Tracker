# Expense Tracker Application

A full-stack expense tracker application with user authentication, built with React, Node.js, Express, and PostgreSQL.

## Features

- User authentication (register, login, logout)
- Add, edit, and delete expenses
- View expense statistics with charts
- Responsive UI with Material-UI

## Technologies

- Frontend: React, Material-UI, Chart.js
- Backend: Node.js, Express
- Database: PostgreSQL with Sequelize ORM
- Authentication: JWT

## Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ``` 
4. Create a .env file based on .env.example and update the values:
   ```bash
   cp .env.example .env
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a .env file based on .env.example:
   ```bash
   cp .env.example .env
   ```
5. Start the development server:
   ```bash
   npm start
   ```

### Database Setup

1. Make sure PostgreSQL is running
2. Create a database named expense_tracker (or as configured in your .env file)
3. The tables will be created automatically when the backend starts

### Running the Application

1. Start both the backend and frontend servers as described above
2. Open your browser to http://localhost:3000
3. Register a new user or login with existing credentials
4. Start tracking your expenses!
