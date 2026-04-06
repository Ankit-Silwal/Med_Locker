import mongoose from 'mongoose';

const MedicationSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    dosage: String,
    frequency: [String],
    timing: String,
    duration: String,
    status: String,
    progress: Number,
  },
  { _id: false }
);

const ScheduleSchema = new mongoose.Schema(
  {
    id: Number,
    time: String,
    medicines: [{ name: String, dosage: String, timing: String }],
    period: String,
    status: String,
  },
  { _id: false }
);

const MedicineReminderDataSchema = new mongoose.Schema(
  {
    slug: { type: String, default: 'default', unique: true },
    medications: [MedicationSchema],
    todaySchedule: [ScheduleSchema],
  },
  { timestamps: true }
);

export default mongoose.models.MedicineReminderData || mongoose.model('MedicineReminderData', MedicineReminderDataSchema);
