import mongoose from 'mongoose';

const HealthSummarySchema = new mongoose.Schema(
  {
    icon: String,
    label: String,
    value: String,
    color: String,
    bg: String,
  },
  { _id: false }
);

const UpcomingAppointmentSchema = new mongoose.Schema(
  {
    id: Number,
    doctor: String,
    specialty: String,
    date: String,
    time: String,
    avatar: String,
  },
  { _id: false }
);

const AiRecommendationSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: String,
  },
  { _id: false }
);

const MedicineReminderSchema = new mongoose.Schema(
  {
    name: String,
    time: String,
    status: String,
  },
  { _id: false }
);

const QuickActionSchema = new mongoose.Schema(
  {
    icon: String,
    label: String,
    color: String,
    action: String,
  },
  { _id: false }
);

const GoalProgressSchema = new mongoose.Schema(
  {
    label: String,
    current: String,
    progress: Number,
  },
  { _id: false }
);

const DashboardHomeDataSchema = new mongoose.Schema(
  {
    slug: { type: String, default: 'default', unique: true },
    healthSummary: [HealthSummarySchema],
    upcomingAppointments: [UpcomingAppointmentSchema],
    aiRecommendations: [AiRecommendationSchema],
    medicineReminders: [MedicineReminderSchema],
    quickActions: [QuickActionSchema],
    goalsProgress: [GoalProgressSchema],
  },
  { timestamps: true }
);

export default mongoose.models.DashboardHomeData || mongoose.model('DashboardHomeData', DashboardHomeDataSchema);
