import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema(
  {
    id: Number,
    doctor: String,
    specialty: String,
    date: String,
    time: String,
    type: String,
    location: String,
    avatar: String,
    status: String,
  },
  { _id: false }
);

const AppointmentDataSchema = new mongoose.Schema(
  {
    slug: { type: String, default: 'default', unique: true },
    upcomingAppointments: [AppointmentSchema],
    pastAppointments: [AppointmentSchema],
    availableDoctors: [{ name: String, specialty: String, avatar: String }],
    timeSlots: [String],
  },
  { timestamps: true }
);

export default mongoose.models.AppointmentData || mongoose.model('AppointmentData', AppointmentDataSchema);
