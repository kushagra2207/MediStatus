# MediStatus Web Frontend

## Overview

The MediStatus web frontend is a modern React application that provides a user-friendly interface for the hospital management system. It offers public access to hospital information and authenticated access for doctors and administrators to manage their respective operations.

## Technology Stack

- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.0
- **Routing**: React Router DOM 7.7.0
- **Styling**: Tailwind CSS 4.1.11
- **Icons**: React Icons 5.5.0
- **Notifications**: React Toastify 11.0.5
- **Authentication**: JWT Decode 4.0.0
- **HTTP Client**: Fetch API

## Project Structure

```
frontend_web/
├── public/
│   └── logo.png              # Application logo
├── src/
│   ├── api/                  # API service layer
│   │   ├── admin.js          # Admin API calls
│   │   ├── doctor.js         # Doctor API calls
│   │   ├── fetchWrapper.js   # HTTP request wrapper
│   │   ├── hospital.js       # Hospital API calls
│   │   └── medicine.js       # Medicine API calls
│   ├── components/           # Reusable components
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── ProtectedRoute.jsx # Route protection wrapper
│   │   └── RedirectIfAuthenticated.jsx # Auth redirect wrapper
│   ├── hooks/
│   │   └── useAuth.jsx       # Authentication context hook
│   ├── layout/
│   │   └── MainLayout.jsx    # Main layout wrapper
│   ├── pages/                # Page components
│   │   ├── admin/            # Admin pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Doctors.jsx
│   │   │   └── Medicines.jsx
│   │   ├── auth/             # Authentication pages
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminSignup.jsx
│   │   │   ├── DoctorLogin.jsx
│   │   │   ├── DoctorSignup.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── doctor/           # Doctor pages
│   │   │   ├── Availability.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Medicines.jsx
│   │   ├── public/           # Public pages
│   │   │   ├── Home.jsx
│   │   │   ├── HospitalRegister.jsx
│   │   │   └── Hospitals.jsx
│   │   └── NotFound.jsx      # 404 page
│   ├── router/
│   │   └── AppRouter.jsx     # Route configuration
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
└── eslint.config.js          # ESLint configuration
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend_web directory:
```bash
cd frontend_web
```

2. Install dependencies:
```bash
npm install
```

3. Ensure the backend server is running on `http://localhost:5000` (or configure the API base URL in the API files)

4. Start the development server:
```bash
npm run dev
```

The application will start on `http://localhost:5173` (Vite default port).

## Available Routes

### Public Routes
- `/` - Home page with feature overview
- `/hospitals` - Browse and search hospitals
- `/hospitalRegister` - Register a new hospital
- `/login` - Login page (redirects to dashboard if authenticated)
- `/signup` - Signup page (redirects to dashboard if authenticated)

### Protected Routes (Requires Authentication)

#### Admin Routes
- `/admin/dashboard` - Admin dashboard
- `/admin/medicines` - Manage medicine inventory
- `/admin/doctors` - View and manage doctors

#### Doctor Routes
- `/doctor/dashboard` - Doctor dashboard
- `/doctor/medicines` - View hospital medicines
- `/doctor/availability` - Manage availability schedule

## Features

### Public Access
- **Home**: Welcome page with project information and key features
- **Hospitals**: Searchable list of all registered hospitals with contact details
- **Hospital Registration**: Form to register new hospitals

### Authentication
- Separate login/signup pages for admins and doctors
- OTP-based signup process with email verification
- JWT token stored in localStorage
- Automatic redirect based on authentication status
- Role-based navigation in the navbar

### Admin Features
- **Dashboard**: Overview of hospital operations
- **Medicine Management**: Add, update, and delete medicines
- **Doctor Management**: View and manage doctors in the hospital

### Doctor Features
- **Dashboard**: Personal overview
- **Medicine View**: View available medicines in the hospital
- **Availability Management**: Set available days and time slots

## Component Architecture

### API Layer (`src/api/`)
- `fetchWrapper.js`: Centralized HTTP client with JWT token injection
- Separate API files for each resource (admin, doctor, hospital, medicine)
- Automatic error handling and response parsing

### Authentication (`src/hooks/useAuth.jsx`)
- Context provider for authentication state
- Token management and user data persistence
- Global access to user information across components

### Route Protection
- `ProtectedRoute`: Wraps protected pages, redirects to login if not authenticated
- `RedirectIfAuthenticated`: Prevents logged-in users from accessing login/signup pages
- Role-based route access control

### Navigation
- `Navbar`: Displays different menus based on user role
- Dynamic navigation items based on authentication status
- Logout functionality

## State Management

Authentication state is managed using React Context API via the `useAuth` hook. This provides:
- Global access to user information
- Authentication status across all components
- Automatic token injection for API requests

## Styling

The application uses Tailwind CSS for styling:
- Utility-first CSS framework
- Consistent design system
- Responsive layouts
- Custom color scheme (blue theme)

Global styles are defined in `src/index.css` with Tailwind imports.

## API Integration

All API calls are made through the service layer in `src/api/`:
- Centralized error handling
- Automatic JWT token injection
- Consistent request/response handling
- Toast notifications for success/error states

### API Base URL
The API base URL is configured in individual API files. Default: `http://localhost:5000/api`

### OTP-Based Signup Integration
The signup flow integrates with the backend's OTP verification:

1. **Admin/Doctor Signup Step 1**: Enter email and click "Send OTP"
   - Calls `POST /api/auth/admin/signup-getOtp` or `/api/auth/doctor/signup-getOtp`
   - OTP is sent to the provided email
   - User receives the OTP on the email

2. **Admin/Doctor Signup Step 2**: Enter OTP and other details
   - Calls `POST /api/auth/admin/signup-verifyOtp` or `/api/auth/doctor/signup-verifyOtp`
   - System verifies OTP and creates account
   - JWT token is returned on successful verification
   - User is logged in automatically

## Development

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Development Server
The development server runs on `http://localhost:5173` with:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- Real-time browser updates on file changes

## Environment Configuration

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=http://localhost:5000/api
```

Access in code using `import.meta.env.VITE_API_URL`

## Browser Storage

The application uses `localStorage` for:
- JWT token persistence
- User authentication state
- Automatic login on page refresh

## Error Handling

- API errors are caught and displayed using React Toastify
- Form validation errors are shown inline
- Network errors display user-friendly messages
- 401 errors automatically log out the user
- OTP errors (invalid or expired) are displayed with guidance

## Security Considerations

- Tokens stored in localStorage (consider httpOnly cookies for production)
- Password fields are masked
- Protected routes enforce authentication
- Role-based access control on the client side
- HTTPS should be used in production
- OTP input is validated before submission

## Troubleshooting

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

### API Connection Issues
- Verify backend server is running
- Check API base URL configuration
- Ensure CORS is properly configured in backend

### Authentication Issues
- Clear localStorage and re-login
- Check token expiration
- Verify JWT_SECRET in backend matches
- For signup issues, ensure backend email configuration is set up

### OTP Issues
- Verify Gmail credentials are configured in backend
- Check that OTP was sent (check spam folder)
- Ensure OTP hasn't expired (typically 10-15 minutes)
- Re-request OTP if expired

---

**For complete project information, see [../README.md](../README.md)**

**For backend API details, see [../backend/README.md](../backend/README.md)**