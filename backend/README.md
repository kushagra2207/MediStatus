# MediStatus Backend

## Overview

The MediStatus backend is a RESTful API built with Node.js and Express.js that powers the hospital management system. It provides secure authentication with OTP verification, manages hospital data, doctor information, and medicine inventory with role-based access control.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.16.2
- **Authentication**: JSON Web Tokens (JWT) with OTP verification
- **Security**: bcrypt 6.0.0 for password hashing, Gmail API for OTP delivery
- **Rate Limiting**: express-rate-limit 8.1.0
- **CORS**: cors 2.8.5
- **Email**: nodemailer 7.0.11
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
│   |── Medicine.js          # Medicine schema
│   └── Otp.js               # OTP schema
├── routes/                   # API route definitions
│   ├── adminAuthRoutes.js   # Admin auth endpoints
│   ├── adminRoutes.js       # Admin protected endpoints
│   ├── doctorAuthRoutes.js  # Doctor auth endpoints
│   ├── doctorRoutes.js      # Doctor protected endpoints
│   ├── hospitalRoutes.js    # Hospital endpoints
│   └── medicineRoutes.js    # Medicine endpoints
├── utils/
|   ├── generate_token.js    # Script to generate refresh token
|   ├── mailer.js            # Mail utility function
│   └── jwt.js               # JWT utility functions
└── server.js                # Application entry point
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn
- Gmail account with App Password or OAuth credentials for OTP delivery

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

EMAIL=your_email@gmail.com
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token
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

#### Admin Authentication (OTP-Based Signup)

**Step 1: Request OTP**
```
POST /api/auth/admin/signup-getOtp
```
Send OTP to admin's email
- Request body: `{ email }`
- Returns: Success message confirming OTP sent to email
- Example response: `{ msg: "OTP sent to your email" }`

**Step 2: Verify OTP and Create Account**
```
POST /api/auth/admin/signup-verifyOtp
```
Verify OTP and create admin account
- Request body: `{ name, email, password, otp, hospital }`
- Returns: JWT token and admin data
- Example response: `{ token: "jwt_token_here", admin: { id, name, email, hospital } }`

**Admin Login**
```
POST /api/auth/admin/login
```
Admin login with email and password
- Request body: `{ email, password }`
- Returns: JWT token and admin data
- Example response: `{ token: "jwt_token_here", admin: { id, name, email, hospital } }`

#### Doctor Authentication (OTP-Based Signup)

**Step 1: Request OTP**
```
POST /api/auth/doctor/signup-getOtp
```
Send OTP to doctor's email
- Request body: `{ email }`
- Returns: Success message confirming OTP sent to email
- Example response: `{ msg: "OTP sent to your email" }`

**Step 2: Verify OTP and Create Account**
```
POST /api/auth/doctor/signup-verifyOtp
```
Verify OTP and create doctor account
- Request body: `{ name, email, password, otp, specialization, hospital }`
- Returns: JWT token and doctor data
- Example response: `{ token: "jwt_token_here", doctor: { id, name, email, specialization, hospital } }`

**Doctor Login**
```
POST /api/auth/doctor/login
```
Doctor login with email and password
- Request body: `{ email, password }`
- Returns: JWT token and doctor data
- Example response: `{ token: "jwt_token_here", doctor: { id, name, email, specialization, hospital } }`

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
  quantity: String (default: 0),
  createdAt: Date (expires: 300 sec)
}
```

### Otp
```javascript
{
  email: String (required),
  otpHash: Number (required),
  hospital: ObjectId (ref: Hospital, required)
}
```

## Authentication Flow

### OTP-Based Signup Process
The new signup process ensures secure account creation with email verification:

1. **OTP Request** (`signup-getOtp` endpoint):
   - User provides email address
   - System generates a random OTP
   - OTP is sent to the provided email via Gmail SMTP
   - OTP is stored in db

2. **OTP Verification** (`signup-verifyOtp` endpoint):
   - User submits the OTP received in email along with account details
   - System validates the OTP:
     - Checks if OTP matches the one sent
     - Checks if OTP has not expired (5 minutes)
   - If OTP is valid:
     - User account is created with provided details
     - Password is hashed using bcrypt
     - JWT token is generated and returned
     - OTP is cleared from db
   - If OTP is invalid or expired:
     - Error message is returned
     - User must restart the process

3. **Login**:
   - User signs in with email and password
   - Server validates credentials
   - Server generates JWT token with user ID and role
   - Client stores token (web: localStorage, mobile: secure storage)
   - Client sends token in `Authorization` header for protected requests

### JWT Token Flow
1. User completes signup verification or logs in
2. Server generates JWT token with user ID and role
3. Client stores token in localStorage (web) or secure storage (mobile)
4. Client sends token in `Authorization` header for protected requests
5. Middleware verifies token and extracts user information
6. Protected routes are accessible only with valid token

### Password Security
- Passwords are hashed using bcrypt with 10 salt rounds
- Hashing occurs automatically in the model's pre-save hook
- Password comparison is handled by a model method
- Original passwords are never stored in database

## Email Configuration (Gmail)

To enable OTP delivery via Gmail:

1. Generate Gmail App Password or OAuth credentials (Google Cloud Console)
2. Add the following to `.env`:
```env
EMAIL=your_email@gmail.com
GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret
GMAIL_REFRESH_TOKEN=your_refresh_token
```

3. The system uses these credentials to send OTP emails to users

## Rate Limiting

The API implements three levels of rate limiting:

1. **Public Rate Limiter**: For public endpoints (hospital listings)
   - Allows more requests for general browsing
2. **Auth Rate Limiter**: For authentication endpoints (login/signup)
   - Stricter limits to prevent brute force attacks
   - Applies to both OTP requests and verification
3. **Protected Rate Limiter**: For authenticated endpoints (medicine management)
   - Strict limits to prevent API abuse

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
- 400: Bad Request (validation errors, invalid OTP, expired OTP)
- 401: Unauthorized (missing or invalid token, incorrect credentials)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

Error responses follow this format:
```json
{
  "msg": "Error message description"
}
```

Common signup-related errors:
- `"Invalid or expired OTP"` - OTP verification failed
- `"Email already registered"` - User account already exists
- `"OTP sent to your email"` - OTP successfully sent
- `"Invalid email format"` - Email validation failed

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
2. **JWT Secret**: Use a strong, random secret key (minimum 32 characters)
3. **Password Hashing**: Always hash passwords before storing (bcrypt with 10+ salt rounds)
4. **Rate Limiting**: Prevents brute force attacks on login and OTP requests
5. **Input Validation**: Mongoose schemas validate input data
6. **CORS**: Restrict origins to known frontend URLs only
7. **Token Expiration**: Consider implementing token expiration (currently recommended to add)
8. **OTP Security**: 
   - OTPs are single-use
   - OTPs expire after short duration (10-15 minutes recommended)
   - OTPs are not logged or exposed in responses
9. **Email Security**: Use Gmail App Password instead of main password

## Database Connection

The database connection is managed in `config/db.js`:
- Prevents multiple connections
- Handles connection errors gracefully
- Exits process on connection failure

---

**For complete project information, see [../README.md](../README.md)**

**For frontend details, see [../frontend_web/README.md](../frontend_web/README.md)**