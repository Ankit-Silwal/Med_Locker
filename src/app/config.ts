/**
 * Med Locker - AI-Powered Digital Health Passport
 * 
 * PAGES STRUCTURE:
 * ----------------
 * 
 * Public Pages:
 * - / (Landing Page) - Hero, Features, Testimonials, Footer
 * - /auth - Login/Signup with role selection (Patient/Doctor/Admin)
 * 
 * Dashboard Pages (Protected):
 * - /dashboard - Dashboard Home with widgets, stats, quick actions
 * - /dashboard/health-records - Medical records with AI insights
 * - /dashboard/appointments - Appointment booking and management
 * - /dashboard/analytics - Interactive health charts and graphs
 * - /dashboard/ai-insights - AI-powered health analysis and predictions
 * - /dashboard/ai-chatbot - Interactive health assistant with medical disclaimer
 * - /dashboard/medicine-reminder - Medication schedule and reminders
 * - /dashboard/settings - Profile, security, notifications, privacy
 * 
 * FEATURES:
 * ---------
 * ✓ AI Health Monitoring with personalized insights
 * ✓ Secure medical records storage with encryption
 * ✓ Smart appointment scheduling with calendar UI
 * ✓ Interactive health analytics with Recharts
 * ✓ AI chatbot for symptom checking (with medical disclaimer)
 * ✓ Medicine reminder with prescription upload
 * ✓ Comprehensive settings for profile, security, and privacy
 * ✓ Fully responsive design (mobile/tablet/desktop)
 * ✓ Smooth animations with Framer Motion
 * ✓ Professional healthcare UI with specified color palette
 * 
 * DESIGN SYSTEM:
 * --------------
 * Primary: #1E90FF (Dodger Blue)
 * White: #FFFFFF
 * Gray: #F5F5F5
 * Accent Red: #FF6B6B
 * Accent Green: #00C851
 * 
 * Fonts: Poppins (body), Montserrat (headings)
 * 
 * PLACEHOLDER DATA:
 * -----------------
 * All doctor names use Indian names:
 * - Dr. Ramesh Sharma (Cardiologist)
 * - Dr. Priya Gupta (General Physician)
 * - Dr. Ankit Verma (Dermatologist)
 * - Dr. Kavita Desai (Endocrinologist)
 * - Dr. Suresh Reddy (Orthopedic)
 * - Dr. Meera Patel (Gynecologist)
 * 
 * IMPORTANT NOTES:
 * ----------------
 * - AI chatbot includes medical disclaimers on every response
 * - All health data is mock/placeholder data
 * - Responsive design works on all screen sizes
 * - Smooth micro-interactions throughout the app
 * - Toast notifications for user feedback
 */

export const APP_CONFIG = {
  name: 'Med Locker',
  tagline: 'Your Health, Secured & Smart',
  version: '1.0.0',
  colors: {
    primary: '#1E90FF',
    white: '#FFFFFF',
    gray: '#F5F5F5',
    accentRed: '#FF6B6B',
    accentGreen: '#00C851'
  }
};
