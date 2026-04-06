import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    age: Number,
    gender: String,
    lastVisit: String,
    condition: String,
    status: String,
    avatar: String,
    nextAppointment: String,
  },
  { _id: false }
);

const TodayAppointmentSchema = new mongoose.Schema(
  {
    time: String,
    patient: String,
    type: String,
  },
  { _id: false }
);

const AiSuggestionSchema = new mongoose.Schema(
  {
    patient: String,
    suggestion: String,
    priority: String,
  },
  { _id: false }
);

const DoctorDashboardSchema = new mongoose.Schema(
  {
    slug: { type: String, default: 'default', unique: true },
    stats: {
      totalPatients: { type: Number, default: 0 },
      todaysAppointments: { type: Number, default: 0 },
      pendingReports: { type: Number, default: 0 },
      criticalCases: { type: Number, default: 0 },
    },
    patients: [PatientSchema],
    todayAppointments: [TodayAppointmentSchema],
    aiSuggestions: [AiSuggestionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.DoctorDashboard || mongoose.model('DoctorDashboard', DoctorDashboardSchema);
