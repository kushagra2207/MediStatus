# MediStatus Mobile App

## Overview

The MediStatus mobile app is a cross-platform Flutter application that provides public access to hospital information and doctor availability schedules. The app helps patients avoid unnecessary waiting by allowing them to view real-time information about hospitals and check doctor availability before visiting. Built with Flutter and Dart, it offers a seamless experience on both Android and iOS platforms.

## Features

- **Browse Hospitals**: View comprehensive directory of registered hospitals with contact information and addresses.
- **Search Functionality**: Search hospitals by name or location with real-time filtering.
- **Doctor Listings**: Browse doctors by hospital and specialization.
- **Doctor Details**: View complete doctor profiles including specialization, email, and hospital affiliation.
- **Availability Schedules**: Check detailed doctor availability schedules with day-wise time slots.
- **Server Health Monitoring**: Real-time backend connectivity status indicator.
- **Clean UI/UX**: Modern Material Design 3 with consistent color scheme and smooth navigation.

## Technology Stack

- **Framework**: Flutter (Dart)
- **State Management**: StatefulWidget with FutureBuilder pattern
- **HTTP Client**: `http` package for REST API communication
- **UI Components**: Material Design 3 with custom widgets
- **Architecture**: Clean architecture with separation of concerns (API, models, screens, widgets, core)

## Project Structure
```
frontend_mobile/
├── lib/
│   ├── api/ # API service layer
│   │   ├── doctor_api.dart # Doctor API endpoint
│   │   ├── hospital_api.dart # Hospital API endpoint
│   │   └── health_api.dart # Server health check
│   ├── core/ # Core utilities
│   │   ├── common_widgets/ # Reusable widgets
│   │   │   ├── app_error.dart # Error display widget
│   │   │   └── app_loading.dart # Loading indicator widget
│   │   └── config/
│   │       └── env.dart # Environment configuration
│   ├── models/ # Data models
│   │   ├── doctor.dart # Doctor, AvailabilitySlot models
│   │   └── hospital.dart # Hospital model
│   ├── screens/ # Screen components
│   │   ├── home_screen.dart # Home/landing screen
│   │   ├── hospitals_screen.dart # Hospital listing screen
│   │   ├── doctors_screen.dart # Doctor listing screen
│   │   └── doctor_detail_screen.dart # Doctor detail view
│   ├── widgets/ # Custom reusable widgets
│   │   ├── doctor_card.dart # Doctor list item card
│   │   ├── hospital_card.dart # Hospital list item card
│   │   └── availability_card.dart # Availability display card
│   ├── app.dart # Root app widget
│   └── main.dart # Application entry point
├── assets/
│   └── images/
│   └── logo.png # App logo
└── pubspec.yaml # Dependencies configuration
```

## Setup Instructions

### Prerequisites

- Flutter SDK (3.0 or higher)
- Dart SDK (3.0 or higher)
- Android Studio or Xcode for platform-specific builds
- MediStatus backend server running on `http://localhost:5000` or configured API URL

### Installation

1. **Clone the repository and navigate to mobile app directory:**
```
git clone <repository-url>
cd MediStatus/frontend_mobile
```

2. **Install dependencies:**
```
flutter pub get
```

3. **Configure API base URL:**

Create or update `lib/core/config/env.dart`:

```
const String apiBaseUrl = 'http://localhost:5000'; // For local backend
// const String apiBaseUrl = 'http://10.0.2.2:5000'; // Android emulator
// const String apiBaseUrl = 'http://your-server-ip:5000'; // Physical devices
```

4. **Add app logo:**

Place your logo image at `assets/images/logo.png` and ensure it's registered in `pubspec.yaml`:

```
flutter:
assets:
- assets/images/logo.png
```

5. **Ensure backend is running:**
```
cd ../backend
npm run dev
```

### Running the Application

- **Run on connected device or emulator:**
```
flutter run
```

- **Build for Android:**
```
flutter build apk --release
```

- **Build for iOS:**
```
flutter build ios --release
```

- **Run with specific device:**
```
flutter devices # List available devices
flutter run -d <id> # Run on specific device
```

## Screen Flow

### Home Screen

Welcome screen featuring app branding, quick stats, features overview, and server connectivity status. Users can navigate to the hospital listings from here via the primary “Browse Hospitals” card.

### Hospitals Screen

Displays a searchable list of all registered hospitals with contact details and addresses. Users can tap any hospital card to view its doctors.

### Doctors Screen

Shows a filtered list of doctors for the selected hospital with search by name or specialization. Tapping a doctor card opens detailed information.

### Doctor Detail Screen

Shows a complete doctor profile with name, specialization, email, hospital information, and weekly availability schedule with time slots.

## Data Models

### Hospital Model
```
class Hospital {
final String id;
final String name;
final String address;
final String contact;
}
```

### Doctor Model
```
class Doctor {
final String id;
final String name;
final String specialization;
final String email;
final List<AvailabilitySlot> availability;
final DoctorHospital? hospital;
}
```

### AvailabilitySlot Model
```
class AvailabilitySlot {
final String day; // Monday-Sunday
final String fromTime; // e.g., "09:00"
final String toTime; // e.g., "17:00"
}
```

## API Integration

The app communicates with the MediStatus backend REST API.

### Endpoints Used

- `GET /health` – Server health check.
- `GET /api/hospitals` – Fetch all hospitals.
- `GET /api/doctors/hospital/:hospitalId` – Fetch doctors by hospital.

All API calls use a 60-second timeout and include basic error handling.

## UI/UX Design

### Color Scheme

- **Primary Color**: `#0284C7` (sky blue)
- **Background**: `#DEEBF7` (light blue)
- **Cards**: White with subtle shadows

### Design Features

- Material Design 3 implementation.
- Consistent padding and rounded corners (12–16px).
- Icon-based visual hierarchy and responsive layouts.

## Error Handling

- Dedicated error widget with optional retry action.
- Loading indicator widget for async operations.
- Empty-state displays for “no hospitals” or “no doctors” search results.
- Server connectivity badge on the home screen.

## Performance Optimizations

- `FutureBuilder` for async data loading.
- `ListView.builder` for efficient list rendering.
- Reusable `http.Client` in API services.
- Stateless reusable cards for hospitals, doctors, and availability.

## Troubleshooting

### API Connection Issues

- Verify the backend server is running on the correct port.
- For Android emulator, prefer `http://10.0.2.2:5000` instead of `localhost`.
- For physical devices, ensure device and server are on the same network.
- Check firewall rules for port `5000`.

### Build Errors
```
flutter clean
flutter pub get
flutter run
```

### Platform-Specific Issues

**Android** – Add internet permission in `android/app/src/main/AndroidManifest.xml`:
```
<uses-permission android:name="android.permission.INTERNET" /> 
```
**iOS** – If using HTTP (non-HTTPS), update ios/Runner/Info.plist:
```
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```
## Development
Useful Flutter Commands
```
flutter doctor       # Check Flutter setup
flutter analyze      # Static analysis
flutter test         # Run tests
flutter pub outdated # Check for dependency updates
flutter pub upgrade  # Upgrade dependencies
```

**For complete project information, see [../README.md](../README.md)**