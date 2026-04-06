import mongoose from 'mongoose';

const HospitalInfoSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    established: String,
    departments: Number,
    totalDoctors: Number,
    totalPatients: Number,
    rating: Number,
  },
  { _id: false }
);

const DoctorSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    specialty: String,
    experience: String,
    patients: Number,
    status: String,
    avatar: String,
  },
  { _id: false }
);

const RecentActivitySchema = new mongoose.Schema(
  {
    type: String,
    message: String,
    time: String,
  },
  { _id: false }
);

const MonthlyStatsSchema = new mongoose.Schema(
  {
    month: String,
    appointments: Number,
    patients: Number,
  },
  { _id: false }
);

const NetworkStatsSchema = new mongoose.Schema(
  {
    sharedRecords: Number,
    accessGrantedHospitals: Number,
    appointmentsToday: Number,
  },
  { _id: false }
);

const HospitalAdminDataSchema = new mongoose.Schema(
  {
    slug: { type: String, default: 'default', unique: true },
    hospitalInfo: HospitalInfoSchema,
    doctors: [DoctorSchema],
    recentActivities: [RecentActivitySchema],
    monthlyStats: [MonthlyStatsSchema],
    networkStats: NetworkStatsSchema,
  },
  { timestamps: true }
);

export default mongoose.models.HospitalAdminData || mongoose.model('HospitalAdminData', HospitalAdminDataSchema);
