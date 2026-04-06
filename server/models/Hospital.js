import mongoose from 'mongoose';

const HospitalSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    established: { type: String, required: true },
    type: { type: String, enum: ['Government', 'Private'], required: true },
    departments: { type: Number, required: true },
    doctors: { type: Number, required: true },
    patients: { type: Number, required: true },
    rating: { type: Number, required: true },
    verified: { type: Boolean, default: true },
    networkStatus: { type: String, enum: ['active', 'syncing', 'offline'], default: 'active' },
  },
  { timestamps: true }
);

export default mongoose.models.Hospital || mongoose.model('Hospital', HospitalSchema);
