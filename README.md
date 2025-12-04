# MediStatus

## Overview

MediStatus is a modern hospital management system designed to streamline operations for public and government hospitals. The platform provides transparency for patients while enabling secure internal resource management for hospital staff. The system helps patients avoid unnecessary waiting by accessing real-time information about hospitals and doctor availability schedules.

## Features

### Public Access (Mobile App & Web)
- View comprehensive hospital directories with contact information
- Search hospitals by name or location
- Browse doctors by specialization
- Access doctor availability schedules and timings
- No authentication required

### Web Application Features
- Public hospital and doctor listings
- Hospital registration portal
- **Admin Dashboard**: Manage medicine inventory, view and manage doctors
- **Doctor Dashboard**: View medicines, manage personal availability schedule

### Security
- JWT-based authentication with OTP verification
- Password encryption using bcrypt
- Role-based route protection
- Rate limiting on API endpoints
- CORS protection

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) with OTP verification
- **Security**: bcrypt, Gmail integration for OTP delivery

### Frontend Web
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: React Icons
- **Notifications**: React Toastify

### Frontend Mobile
- **Framework**: Flutter
- **Language**: Dart
- **Purpose**: Cross-platform public app for viewing hospitals and doctor availability

## Project Structure

```
MediStatus/
├── backend/              # Node.js/Express API - See backend/README.md for details
├── frontend_web/         # React web application - See frontend_web/README.md for details
└── frontend_mobile/      # Flutter mobile application
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Flutter SDK (for mobile)

### Installation

1. **Clone and navigate to project:**
```bash
git clone <repository-url>
cd MediStatus
```

2. **Backend Setup** (see [backend/README.md](backend/README.md)):
```bash
cd backend
npm install
```

3. **Frontend Web Setup** (see [frontend_web/README.md](frontend_web/README.md)):
```bash
cd ../frontend_web
npm install
```

4. **Mobile App Setup** (see frontend_mobile/README.md):
```bash
cd ../frontend_mobile
flutter pub get
```

## Running the Application

1. **Start MongoDB** (if running locally)

2. **Start Backend:**
```bash
cd backend
npm run dev
```

3. **Start Web Frontend:**
```bash
cd frontend_web
npm run dev
```

4. **Run Mobile App:**
```bash
cd frontend_mobile
flutter run
```

## API Overview

For detailed API documentation, see [backend/README.md](backend/README.md)

**Key Endpoints:**
- Public: `GET /api/hospitals`, `POST /api/hospitals`
- Auth: `/api/auth/admin/signup-*`, `/api/auth/doctor/signup-*`, login endpoints
- Protected: Medicine, Doctor, and Admin management endpoints

## Key Features Implementation

### Authentication Flow (OTP-Based)
1. User enters email and clicks "Send OTP"
2. OTP is sent to their email via Gmail
3. User enters OTP and other details
4. System verifies OTP and creates account
5. JWT token is issued for session management

### Role-Based Access
- Doctors and Admins have different permissions
- Admins can manage medicines and doctors
- Doctors can view medicines and manage availability
- Middleware enforces role-based access control

## Security Considerations

- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens signed with secret key
- API rate limiting prevents abuse
- CORS restricted to known frontend URLs
- OTP verification adds extra authentication layer
- Protected routes require valid tokens

## Detailed Documentation

- **Backend API & Setup**: See [backend/README.md](backend/README.md)
- **Frontend Web Setup**: See [frontend_web/README.md](frontend_web/README.md)
- **Mobile App**: See frontend_mobile/README.md

## Author

Kushagra Kumar Arora

---

**For detailed backend API documentation and configuration, please refer to [backend/README.md](backend/README.md)**

**For frontend setup and component documentation, please refer to [frontend_web/README.md](frontend_web/README.md)**
