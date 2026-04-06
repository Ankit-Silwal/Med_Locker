# Med Locker - Routing Guide

## Overview
This document explains the routing structure of the Med Locker application.

## Route Structure

### Public Routes
- `/` - Landing page
- `/auth` - Authentication page (Login/Signup)
- `*` - 404 Not Found page

### Protected Routes (Dashboard)
All dashboard routes are nested under `/dashboard` and use the `DashboardLayout` component which includes:
- Top navigation bar with user profile
- Sidebar with role-specific menu items
- Main content area (`<Outlet />`)

#### Patient Routes (Default)
- `/dashboard` - Patient dashboard home (auto-redirects based on role)
- `/dashboard/health-records` - View and manage health records
- `/dashboard/appointments` - Book and manage appointments
- `/dashboard/analytics` - View health analytics
- `/dashboard/ai-insights` - AI-powered health insights
- `/dashboard/ai-chatbot` - Chat with AI medical assistant
- `/dashboard/medicine-reminder` - Medication reminders
- `/dashboard/settings` - User settings

#### Doctor Routes
- `/dashboard/doctor` - Doctor dashboard home
- `/dashboard/patients` - View and manage patients
- `/dashboard/appointments` - Manage appointments
- `/dashboard/records` - Access medical records
- `/dashboard/ai-assistant` - AI medical assistant
- `/dashboard/analytics` - View analytics
- `/dashboard/settings` - User settings

#### Hospital Admin Routes
- `/dashboard/hospital-admin` - Hospital admin dashboard home
- `/dashboard/hospital-profile` - Manage hospital profile
- `/dashboard/manage-doctors` - Add/remove doctors
- `/dashboard/patient-records` - View all patient records
- `/dashboard/analytics` - Hospital analytics
- `/dashboard/notifications` - System notifications
- `/dashboard/settings` - User settings

## Role-Based Navigation

### Role Management
The application uses a centralized role manager (`/src/app/utils/roleManager.ts`) that:
- Stores user role in localStorage (`userRole` key)
- Provides helper functions for role checks
- Returns role-specific dashboard routes

### Available Roles
1. `patient` (default)
2. `doctor`
3. `hospital-admin`

### How It Works

1. **Login/Signup** (`/auth`):
   - User selects role during signup
   - Role is stored in localStorage
   - User is redirected to role-specific dashboard

2. **Dashboard Access** (`/dashboard`):
   - DashboardHome checks user role
   - Automatically redirects to:
     - `/dashboard/doctor` if role is 'doctor'
     - `/dashboard/hospital-admin` if role is 'hospital-admin'
     - Shows patient dashboard if role is 'patient'

3. **Sidebar Navigation**:
   - DashboardLayout reads user role
   - Displays role-specific menu items
   - Highlights active route

## Navigation Flow

```
Landing Page (/)
    ↓
Auth Page (/auth)
    ↓
[Role Selection]
    ↓
    ├─→ Patient → /dashboard (Patient Dashboard)
    ├─→ Doctor → /dashboard/doctor (Doctor Dashboard)
    └─→ Hospital Admin → /dashboard/hospital-admin (Hospital Admin Dashboard)
```

## Testing Different Roles

To test different roles:

1. Go to `/auth`
2. Click "Sign Up" tab
3. Select desired role (Patient/Doctor/Hospital Admin)
4. Submit form
5. You'll be redirected to the appropriate dashboard

To manually change role:
```javascript
// Open browser console and run:
localStorage.setItem('userRole', 'doctor'); // or 'hospital-admin' or 'patient'
// Then refresh the page or navigate to /dashboard
```

## File Structure

```
/src/app/
├── routes.tsx              # Main router configuration
├── App.tsx                 # App entry point with RouterProvider
├── utils/
│   └── roleManager.ts      # Role management utilities
└── pages/
    ├── LandingPage.tsx
    ├── AuthPage.tsx
    ├── NotFound.tsx
    ├── DashboardLayout.tsx # Layout wrapper for all dashboard routes
    ├── DashboardHome.tsx   # Patient dashboard
    ├── DoctorDashboard.tsx
    ├── HospitalAdminDashboard.tsx
    └── [other pages...]
```

## Common Issues & Solutions

### Issue: Redirect loops
**Solution**: Check that userRole is correctly set in localStorage

### Issue: Wrong dashboard shown
**Solution**: Clear localStorage and re-authenticate:
```javascript
localStorage.clear();
```

### Issue: 404 on dashboard routes
**Solution**: All dashboard routes must be defined in `/src/app/routes.tsx` under the `/dashboard` parent route

## Development Notes

- All routes use React Router v7 with Data Router pattern
- Routes are defined using `createBrowserRouter`
- Navigation uses `useNavigate()` hook from `react-router`
- Location tracking uses `useLocation()` hook
- Route parameters can be added using `:paramName` syntax (currently not used)
