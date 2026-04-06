import AddHospital from "./pages/AddHospital";
import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import DoctorDashboard from "./pages/DoctorDashboard";
import HospitalAdminDashboard from "./pages/HospitalAdminDashboard";
import HealthRecords from "./pages/HealthRecords";
import Appointments from "./pages/Appointments";
import Analytics from "./pages/Analytics";
import AIInsights from "./pages/AIInsights";
import AIChatBot from "./pages/AIChatBot";
import MedicineReminder from "./pages/MedicineReminder";
import Settings from "./pages/Settings";
import HospitalProfile from "./pages/HospitalProfile";
import ManageDoctors from "./pages/ManageDoctors";
import Patients from "./pages/Patients";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import HospitalSelection from "./pages/HospitalSelection";
import HospitalPasswordVerification from "./pages/HospitalPasswordVerification";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/hospital-selection",
    Component: HospitalSelection,
  },
  {
    path: "/hospital-verify/:hospitalId",
    Component: HospitalPasswordVerification,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "doctor", Component: DoctorDashboard },
      { path: "hospital-admin", Component: HospitalAdminDashboard },
      { path: "health-records", Component: HealthRecords },
      { path: "appointments", Component: Appointments },
      { path: "analytics", Component: Analytics },
      { path: "ai-insights", Component: AIInsights },
      { path: "ai-chatbot", Component: AIChatBot },
      { path: "medicine-reminder", Component: MedicineReminder },
      { path: "settings", Component: Settings },
      // Doctor routes
      { path: "patients", Component: Patients },
      { path: "records", Component: HealthRecords },
      { path: "ai-assistant", Component: AIInsights },
      // Hospital Admin routes
      { path: "hospital-profile", Component: HospitalProfile },
      { path: "manage-doctors", Component: ManageDoctors },
      { path: "patient-records", Component: HealthRecords },
      { path: "notifications", Component: Notifications },
    ],
  },
  {
  path: "/add-hospital",
  Component: AddHospital,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);