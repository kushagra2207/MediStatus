# MediStatus

## Overview

MediStatus is a modern hospital management system designed to streamline operations for public and government hospitals. The platform provides transparency for patients while enabling secure internal resource management for hospital staff. The system helps patients avoid unnecessary waiting by accessing real-time information about hospitals and doctor availability schedules.

## Features

### Public Access (Mobile App)
- View comprehensive hospital directories with contact information
- Search hospitals by name or location
- Browse doctors by specialization
- Access doctor availability schedules and timings
- No authentication required for mobile app users

### Web Application Features
- Public hospital and doctor listings
- Hospital registration portal
- **Admin Dashboard**: Manage medicine inventory, view and manage doctors
- **Doctor Dashboard**: View medicines, manage personal availability schedule

### Security
- JWT-based authentication
- Password encryption using bcrypt
- Role-based route protection
- Rate limiting on API endpoints
- CORS protection

### Medicine Management
- Track medicine inventory by hospital
- Add, update, and delete medicines
- View availability status

### Doctor Management
- Set availability schedules (days and time slots)
- View and manage doctor profiles
- Link doctors to hospitals

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt for password hashing
- **Rate Limiting**: express-rate-limit

### Frontend Web
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: React Icons
- **Notifications**: React Toastify
- **HTTP Client**: Fetch API with JWT support

### Frontend Mobile
- **Framework**: Flutter
- **Language**: Dart
- **Platform**: Cross-platform
- **Purpose**: Public-facing app for viewing hospitals and doctor availability (no authentication required)

## Project Structure

```
MediStatus/
├── backend/              # Node.js/Express backend API
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Auth, rate limiting
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # JWT utilities
│   └── server.js        # Entry point
├── frontend_web/        # React web application
│   ├── src/
│   │   ├── api/        # API service calls
│   │   ├── components/ # Reusable components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── layout/     # Layout components
│   │   ├── pages/      # Page components
│   │   └── router/     # Routing configuration
│   └── public/         # Static assets
└── frontend_mobile/     # Flutter mobile application
    ├── lib/            # Dart source code
    ├── android/        # Android configuration
    ├── ios/            # iOS configuration
    └── pubspec.yaml    # Flutter dependencies
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn
- Flutter SDK (for mobile development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MediStatus
```

2. Set up the backend (see [backend/README.md](backend/README.md) for details):
```bash
cd backend
npm install
```

3. Set up the web frontend (see [frontend_web/README.md](frontend_web/README.md) for details):
```bash
cd ../frontend_web
npm install
```

4. Set up the mobile app (see [frontend_mobile/README.md](frontend_mobile/README.md) for details):
```bash
cd ../frontend_mobile
flutter pub get
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## Running the Application

1. Start MongoDB (if running locally)

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. Start the web frontend:
```bash
cd frontend_web
npm run dev
```

4. Run the mobile app:
```bash
cd frontend_mobile
flutter run
```

## API Endpoints

### Public Endpoints
- `GET /` - Server health check
- `GET /api/hospitals` - Get all hospitals
- `POST /api/hospitals` - Register a new hospital

### Authentication Endpoints
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/admin/signup` - Admin signup
- `POST /api/auth/doctor/login` - Doctor login
- `POST /api/auth/doctor/signup` - Doctor signup

### Protected Endpoints (Require Authentication)
- `POST /api/medicines` - Add medicine (Admin only)
- `GET /api/medicines/:hospitalId` - Get medicines by hospital
- `PATCH /api/medicines/:id` - Update medicine (Admin only)
- `DELETE /api/medicines/:id` - Delete medicine (Admin only)
- `GET /api/doctors` - Get doctors
- `GET /api/admins` - Get admins

## Key Features Implementation

### Authentication Flow
1. User signs up with email and password
2. Password is hashed using bcrypt before storage
3. JWT token is generated upon successful login
4. Token is stored in localStorage (web) or secure storage (mobile)
5. Protected routes verify token on each request

### Role-Based Access
- Doctors and Admins have different permissions
- Admins can manage medicines and doctors
- Doctors can view medicines and manage their availability
- Middleware enforces role-based access control

### Rate Limiting
- Public endpoints have relaxed rate limits
- Authentication endpoints have moderate limits
- Protected endpoints have stricter limits to prevent abuse

## Security Considerations

- Passwords are hashed using bcrypt with salt rounds
- JWT tokens are signed with a secret key
- API endpoints are rate-limited to prevent abuse
- CORS is configured to allow only specific origins
- Protected routes require valid authentication tokens
- Role-based access control prevents unauthorized actions

## Development

### Backend Development
- Uses Node.js watch mode for auto-reload during development
- Follows MVC architecture pattern
- Controllers handle business logic
- Models define database schema
- Middlewares handle cross-cutting concerns

### Frontend Development
- React with functional components and hooks
- React Router for client-side routing
- Protected routes redirect unauthenticated users
- Custom hooks for auth state management
- API layer abstracts HTTP communication

## Future Enhancements

- Patient appointment scheduling
- Real-time notifications
- Medicine expiration tracking
- Advanced search and filtering
- Analytics and reporting
- Mobile app full implementation
- Email notifications
- Multi-language support

## Author

Kushagra Kumar Arora