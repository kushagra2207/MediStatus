# MediStatus Mobile App

## Overview

The MediStatus mobile app is a cross-platform Flutter application that provides public access to hospital information and doctor availability schedules. The app helps patients avoid unnecessary waiting by allowing them to view real-time information about hospitals and check doctor availability before visiting. Built with Flutter and Dart, it offers a seamless experience on both Android and iOS platforms.

The app features **offline-first caching** — after the first successful load, all hospital and doctor data is available without an internet connection and refreshes automatically when connectivity is restored.

## Features

- **Browse Hospitals**: View comprehensive directory of registered hospitals with contact information and addresses.
- **Search Functionality**: Search hospitals by name or location with real-time filtering.
- **Doctor Listings**: Browse doctors by hospital and specialization.
- **Doctor Details**: View complete doctor profiles including specialization, email, and hospital affiliation.
- **Availability Schedules**: Check detailed doctor availability schedules with day-wise time slots.
- **Offline-First Caching**: All data is cached locally in SQLite — the app works without internet after the first load.
- **Auto-Refresh**: Data refreshes automatically in the background when network connectivity is available.
- **Last Updated Indicator**: Every data screen shows when the data was last refreshed, with offline status when applicable.
- **Server Health Monitoring**: Real-time backend connectivity status indicator.
- **Pull-to-Refresh**: Manual data refresh on all listing screens.
- **Clean UI/UX**: Modern Material Design 3 with consistent color scheme and smooth navigation.

## Technology Stack

- **Framework**: Flutter (Dart)
- **HTTP Client**: `http` package for REST API communication
- **Local Database**: SQLite via `sqflite` for offline data caching
- **Connectivity**: `connectivity_plus` for network status detection and auto-refresh
- **UI Components**: Material Design 3 with custom widgets
- **Fonts**: Google Fonts (Inter)

## Architecture

The app follows a **Repository Pattern** with offline-first caching:

```
┌──────────────────────────────────────────────────────────────┐
│                        SCREENS (UI)                          │
│  HomeScreen  │  HospitalsScreen  │  DoctorsScreen            │
│  - Shows cached data instantly                               │
│  - Refreshes from network in background                      │
│  - Listens to connectivity changes for auto-refresh          │
│  - Displays LastUpdatedBar with cache age                    │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│                     REPOSITORIES                             │
│  HospitalRepository  │  DoctorRepository                     │
│  - Reads cache first (instant)                               │
│  - Tries API if online                                       │
│  - Falls back to cache if API fails                          │
│  - Updates cache + timestamp on success                      │
└──────────┬───────────────────────┬───────────────────────────┘
           │                       │
           ▼                       ▼
┌─────────────────────┐  ┌─────────────────────────────────────┐
│     API LAYER       │  │          CACHE LAYER (SQLite)        │
│  HospitalApi        │  │  HospitalCache  │  DoctorCache       │
│  DoctorApi          │  │  CacheMetadata (timestamps)          │
│  HealthApi          │  │  DatabaseHelper (singleton)          │
│  (http package)     │  │  (sqflite package)                   │
└─────────────────────┘  └─────────────────────────────────────┘
```

### Data Flow

1. **Screen opens** → Repository reads from SQLite cache (instant)
2. **Cache has data** → show it immediately, no loading spinner
3. **Background refresh** → Repository calls API, updates SQLite + timestamp
4. **API succeeds** → UI silently updates with fresh data
5. **API fails + cache exists** → user keeps seeing cached data (no disruption)
6. **API fails + no cache** → error state with Retry button (first launch only)
7. **Connectivity restored** → auto-triggers background refresh on all active screens

### Offline Caching Strategy

| Scenario | Behavior |
|----------|----------|
| First launch + online | Loading shimmer → API fetch → data cached → displayed |
| First launch + offline | Loading shimmer → error: "Connect to the internet" + Retry |
| Subsequent launch + online | Cached data shown instantly → API refresh in background |
| Subsequent launch + offline | Cached data shown instantly + "Offline" indicator |
| Goes offline while using | Data stays on screen, "Offline" indicator appears |
| Comes back online | Auto-refresh triggers, data + timestamp update silently |
| Pull-to-refresh (online) | Fresh API call → cache updated → "Updated just now" |
| Pull-to-refresh (offline) | Silently ignored, cached data stays |

### SQLite Database Schema

```sql
-- Hospital data cache
hospitals (id TEXT PK, name TEXT, address TEXT, contact TEXT)

-- Doctor data cache (hospital info flattened as columns)
doctors (id TEXT PK, name TEXT, specialization TEXT, email TEXT,
         hospital_id TEXT, hospital_name TEXT, hospital_address TEXT,
         hospital_contact TEXT)

-- Doctor availability slots (linked to doctors)
availability_slots (id INTEGER PK AUTO, doctor_id TEXT FK,
                    day TEXT, from_time TEXT, to_time TEXT)

-- Tracks when each data set was last refreshed
cache_metadata (key TEXT PK, updated_at INTEGER)
-- Keys: 'hospitals', 'doctors_<hospitalId>'
```

## Project Structure
```
frontend_mobile/
├── lib/
│   ├── api/                        # API service layer (network calls)
│   │   ├── doctor_api.dart         #   Doctor API endpoint
│   │   ├── hospital_api.dart       #   Hospital API endpoint
│   │   └── health_api.dart         #   Server health check
│   ├── cache/                      # SQLite cache layer (local storage)
│   │   ├── database_helper.dart    #   DB singleton, table creation, migrations
│   │   ├── hospital_cache.dart     #   Hospital table CRUD
│   │   ├── doctor_cache.dart       #   Doctor + availability slots CRUD
│   │   └── cache_metadata.dart     #   Last-updated timestamps
│   ├── repositories/               # Data orchestration (API + cache)
│   │   ├── cached_result.dart      #   Generic result wrapper with metadata
│   │   ├── hospital_repository.dart#   Hospital data: cache-first, network-fallback
│   │   └── doctor_repository.dart  #   Doctor data: cache-first, network-fallback
│   ├── services/                   # App-level services
│   │   └── connectivity_service.dart#  Network status stream + one-shot check
│   ├── core/                       # Core utilities
│   │   ├── common_widgets/         #   Reusable widgets (AppError, AppLoading)
│   │   └── config/
│   │       └── env.dart            #   Environment configuration (API base URL)
│   ├── models/                     # Data models
│   │   ├── doctor.dart             #   Doctor, AvailabilitySlot, DoctorHospital
│   │   └── hospital.dart           #   Hospital
│   ├── screens/                    # Screen components
│   │   ├── home_screen.dart        #   Home/landing screen
│   │   ├── hospitals_screen.dart   #   Hospital listing with search
│   │   ├── doctors_screen.dart     #   Doctor listing with search
│   │   └── doctor_detail_screen.dart#  Doctor detail view
│   ├── widgets/                    # Custom reusable widgets
│   │   ├── doctor_card.dart        #   Doctor list item card
│   │   ├── hospital_card.dart      #   Hospital list item card
│   │   ├── availability_card.dart  #   Availability display card
│   │   └── last_updated_bar.dart   #   "Last updated X ago" / "Offline" indicator
│   ├── app.dart                    # Root app widget (MaterialApp + theme)
│   └── main.dart                   # Entry point (DB init + runApp)
├── assets/
│   ├── icons/
│   │   └── logo.png                # App icon
│   └── images/
│       └── logo.png                # App logo
└── pubspec.yaml                    # Dependencies configuration
```

## Setup Instructions

### Prerequisites

- Flutter SDK (3.0 or higher)
- Dart SDK (3.0 or higher)
- Android Studio or Xcode for platform-specific builds
- MediStatus backend server running (or configured API URL)

### Installation

1. **Clone the repository and navigate to mobile app directory:**
```bash
git clone <repository-url>
cd MediStatus/frontend_mobile
```

2. **Install dependencies:**
```bash
flutter pub get
```

3. **Configure API base URL:**

Update `lib/core/config/env.dart`:

```dart
const String apiBaseUrl = 'http://localhost:5000'; // For local backend
// const String apiBaseUrl = 'http://10.0.2.2:5000'; // Android emulator
// const String apiBaseUrl = 'http://your-server-ip:5000'; // Physical devices
```

4. **Run the app:**
```bash
flutter run
```

### Building for Release

- **Android APK:**
```bash
flutter build apk --release
```

- **iOS:**
```bash
flutter build ios --release
```

- **Run on specific device:**
```bash
flutter devices        # List available devices
flutter run -d <id>    # Run on specific device
```

## Screen Flow

### Home Screen

Welcome screen featuring app branding, quick stats, featured hospitals (horizontal scroll), key features overview, and server connectivity status. Users can navigate to the hospital listings via the "Browse Hospitals" card. Shows "Last updated" indicator for cached data.

### Hospitals Screen

Displays a searchable list of all registered hospitals with contact details and addresses. Features pull-to-refresh, "Last updated" bar, and auto-refresh on connectivity change. Users can tap any hospital card to view its doctors.

### Doctors Screen

Shows a filtered list of doctors for the selected hospital with search by name or specialization. Same offline-first behavior as the Hospitals screen. Tapping a doctor card opens detailed information.

### Doctor Detail Screen

Shows a complete doctor profile with name, specialization, email, hospital information, and weekly availability schedule with time slots. Displays the data passed from the Doctors screen (no additional API call).

## Data Models

### Hospital
```dart
class Hospital {
  final String id;
  final String name;
  final String address;
  final String contact;
}
```

### Doctor
```dart
class Doctor {
  final String id;
  final String name;
  final String specialization;
  final String email;
  final List<AvailabilitySlot> availability;
  final DoctorHospital? hospital;
}
```

### AvailabilitySlot
```dart
class AvailabilitySlot {
  final String day;       // Monday-Sunday
  final String fromTime;  // e.g., "09:00"
  final String toTime;    // e.g., "17:00"
}
```

## API Integration

The app communicates with the MediStatus backend REST API. All network calls go through the Repository layer which handles caching transparently.

### Endpoints Used

- `GET /health` – Server health check
- `GET /api/hospitals` – Fetch all hospitals
- `GET /api/doctors/hospital/:hospitalId` – Fetch doctors by hospital

All API calls use a 60-second timeout with error handling and automatic cache fallback.

## UI/UX Design

### Color Scheme

- **Primary Color**: `#0284C7` (sky blue)
- **Background**: `#DEEBF7` (light blue)
- **Cards**: White with subtle shadows

### Design Features

- Material Design 3 implementation
- Consistent padding and rounded corners (12–16px)
- Icon-based visual hierarchy and responsive layouts
- Subtle "Last updated" bar (green when online, amber when offline)

## Troubleshooting

### API Connection Issues

- Verify the backend server is running on the correct port
- For Android emulator, use `http://10.0.2.2:5000` instead of `localhost`
- For physical devices, ensure device and server are on the same network
- Check firewall rules for port `5000`

### Build Errors
```bash
flutter clean
flutter pub get
flutter run
```

### Platform-Specific Issues

**Android** – Add internet permission in `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```
**iOS** – If using HTTP (non-HTTPS), update `ios/Runner/Info.plist`:
```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

## Development

Useful Flutter Commands:
```bash
flutter doctor        # Check Flutter setup
flutter analyze       # Static analysis
flutter test          # Run tests
flutter pub outdated  # Check for dependency updates
flutter pub upgrade   # Upgrade dependencies
```

---

**For complete project information, see [../README.md](../README.md)**
