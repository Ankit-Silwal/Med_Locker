import mongoose from 'mongoose';

const HealthRecordSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    doctor: { type: String, required: true },
    hospital: { type: String, default: 'Not specified' },
    status: { type: String, default: 'normal' },
    aiInsight: { type: String, default: '' },
    details: { type: String, default: '' },
    fileName: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.HealthRecord || mongoose.model('HealthRecord', HealthRecordSchema);
