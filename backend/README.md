# StudyStuff Backend

Backend authentication system for StudyStuff using Node.js, Express, and Neon PostgreSQL.

## Features

- User Registration & Login
- JWT Authentication (7 days expiration)
- Password Hashing (bcrypt)
- Protected Routes
- PostgreSQL Database (Neon)

## Prerequisites

- Node.js installed
- PostgreSQL database (Neon)

## Installation

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `backend` directory with the following content:
    ```env
    DATABASE_URL=your_neon_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5001
    ```

4.  Initialize the database:
    ```bash
    node src/scripts/initDb.js
    ```

## Running the Server

- **Development:**
    ```bash
    npm run dev
    ```

- **Production:**
    ```bash
    npm start
    ```

## API Endpoints

### 1. Register

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```
- **Success Response:**
    - **Code:** 201 CREATED
    - **Content:** `{ "user": { ... }, "token": "..." }`

### 2. Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
- **Success Response:**
    - **Code:** 200 OK
    - **Content:** `{ "user": { ... }, "token": "..." }`

### 3. Get Current User (Protected)

- **URL:** `/api/auth/me`
- **Method:** `GET`
- **Headers:**
    - `Authorization: Bearer <token>`
- **Success Response:**
    - **Code:** 200 OK
    - **Content:** `{ "id": "...", "name": "John Doe", ... }`

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  university VARCHAR(255) DEFAULT 'Rishihood University',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
