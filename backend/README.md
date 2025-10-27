# MediStatus Backend

## Overview

The MediStatus backend is a RESTful API built with Node.js and Express.js that powers the hospital management system. It provides secure authentication, manages hospital data, doctor information, and medicine inventory with role-based access control.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.16.2
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt 6.0.0 for password hashing
- **Rate Limiting**: express-rate-limit 8.1.0
- **CORS**: cors 2.8.5
- **Environment**: dotenv 17.1.0

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/              # Business logic controllers
│   ├── adminAuthController.js   # Admin authentication logic
│   ├── adminController.js       # Admin CRUD operations
│   ├── doctorAuthController.js  # Doctor authentication logic
│   ├── doctorController.js      # Doctor CRUD operations
│   ├── hospitalController.js    # Hospital CRUD operations
│   └── medicineController.js    # Medicine CRUD operations
├── middlewares/
│   ├── auth.js              # JWT authentication middleware
│   └── rateLimiter.js       # Rate limiting middleware
├── models/                   # Mongoose data models
│   ├── Admin.js             # Admin schema
│   ├── Doctor.js            # Doctor schema
│   ├── Hospital.js          # Hospital schema
│   └── Medicine.js          # Medicine schema
├── routes/                   # API route definitions
│   ├── adminAuthRoutes.js   # Admin auth endpoints
│   ├── adminRoutes.js       # Admin protected endpoints
│   ├── doctorAuthRoutes.js  # Doctor auth endpoints
│   ├── doctorRoutes.js      # Doctor protected endpoints
│   ├── hospitalRoutes.js    # Hospital endpoints
│   └── medicineRoutes.js    # Medicine endpoints
├── utils/
│   └── jwt.js               # JWT utility functions
└── server.js                # Application entry point
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root directory:
```bash
touch .env
```

4. Configure environment variables in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/medistatus
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medistatus

JWT_SECRET=your_super_secret_jwt_key_here

PORT=5000

FRONTEND_URL=http://localhost:5173
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the port specified in `.env`).

## API Endpoints

### Public Endpoints

#### Health Check
```
GET /
```
Returns server status

#### Hospitals
```
GET /api/hospitals
```
Get all registered hospitals

```
POST /api/hospitals
```
Register a new hospital
- Request body: `{ name, address, contact }`

### Authentication Endpoints

#### Admin Authentication
```
POST /api/auth/admin/signup
```
Create a new admin account
- Request body: `{ name, email, password, hospital }`
- Returns: JWT token and admin data

```
POST /api/auth/admin/login
```
Admin login
- Request body: `{ email, password }`
- Returns: JWT token and admin data

#### Doctor Authentication
```
POST /api/auth/doctor/signup
```
Create a new doctor account
- Request body: `{ name, email, password, specialization, hospital }`
- Returns: JWT token and doctor data

```
POST /api/auth/doctor/login
```
Doctor login
- Request body: `{ email, password }`
- Returns: JWT token and doctor data

### Protected Endpoints

All protected endpoints require an `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

#### Medicines (Admin and Doctor)
```
GET /api/medicines/:hospitalId
```
Get all medicines for a specific hospital
- Requires: Authentication
- Params: `hospitalId`

```
POST /api/medicines
```
Add a new medicine (Admin only)
- Request body: `{ name, quantity, hospital }`
- Requires: Admin role

```
PATCH /api/medicines/:id
```
Update medicine details (Admin only)
- Request body: `{ name?, quantity? }`
- Requires: Admin role
- Params: `id` (medicine ID)

```
DELETE /api/medicines/:id
```
Delete a medicine (Admin only)
- Requires: Admin role
- Params: `id` (medicine ID)

#### Doctors
```
GET /api/doctors
```
Get all doctors
- Requires: Authentication

#### Admins
```
GET /api/admins
```
Get all admins
- Requires: Authentication

## Data Models

### Hospital
```javascript
{
  name: String (required),
  address: String (required),
  contact: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Admin
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  hospital: ObjectId (ref: Hospital, required)
}
```

### Doctor
```javascript
{
  name: String (required),
  specialization: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  hospital: ObjectId (ref: Hospital, required),
  availability: [{
    day: String (enum: Monday-Sunday),
    from: String,
    to: String
  }]
}
```

### Medicine
```javascript
{
  name: String (required),
  quantity: Number (default: 0),
  hospital: ObjectId (ref: Hospital, required)
}
```

## Authentication

### JWT Token Flow
1. User signs up or logs in with credentials
2. Server validates credentials
3. Server generates JWT token with user ID and role
4. Client stores token (web: localStorage, mobile: secure storage)
5. Client sends token in `Authorization` header for protected requests
6. Middleware verifies token and extracts user information

### Password Security
- Passwords are hashed using bcrypt with 10 salt rounds
- Hashing occurs automatically in the model's pre-save hook
- Password comparison is handled by a model method

## Rate Limiting

The API implements three levels of rate limiting:

1. **Public Rate Limiter**: For public endpoints (hospital listings)
2. **Auth Rate Limiter**: For authentication endpoints (login/signup)
3. **Protected Rate Limiter**: For authenticated endpoints (medicine management)

This prevents abuse and ensures API stability.

## CORS Configuration

CORS is configured to allow requests from the frontend URL specified in `FRONTEND_URL`. The configuration allows:
- Methods: GET, POST, PUT, PATCH, DELETE
- Headers: Content-Type, Authorization
- Credentials: true

## Error Handling

The API follows consistent error handling:
- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized (missing or invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

Error responses follow this format:
```json
{
  "msg": "Error message description"
}
```

## Development

### Running in Development Mode
```bash
npm run dev
```
Uses Node.js watch mode for automatic server restart on file changes.

### Project Scripts
```bash
npm run dev        # Start development server with watch mode
```

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secret**: Use a strong, random secret key
3. **Password Hashing**: Always hash passwords before storing
4. **Rate Limiting**: Prevents brute force attacks
5. **Input Validation**: Mongoose schemas validate input data
6. **CORS**: Restrict origins to known frontend URLs
7. **Token Expiration**: Consider implementing token expiration

## Database Connection

The database connection is managed in `config/db.js`:
- Prevents multiple connections
- Handles connection errors gracefully
- Exits process on connection failure