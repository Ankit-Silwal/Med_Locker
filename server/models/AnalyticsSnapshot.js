import mongoose from 'mongoose';

const WeightSchema = new mongoose.Schema(
  {
    month: String,
    weight: Number,
    target: Number,
  },
  { _id: false }
);

const BloodPressureSchema = new mongoose.Schema(
  {
    date: String,
    systolic: Number,
    diastolic: Number,
  },
  { _id: false }
);

const BloodSugarSchema = new mongoose.Schema(
  {
    time: String,
    level: Number,
  },
  { _id: false }
);

const HeartRateSchema = new mongoose.Schema(
  {
    day: String,
    rate: Number,
  },
  { _id: false }
);

const ActivitySchema = new mongoose.Schema(
  {
    name: String,
    value: Number,
    color: String,
  },
  { _id: false }
);

const StatsSchema = new mongoose.Schema(
  {
    title: String,
    value: String,
    change: String,
    trend: String,
    color: String,
  },
  { _id: false }
);

const AnalyticsSnapshotSchema = new mongoose.Schema(
  {
    slug: { type: String, default: 'default', unique: true },
    weightData: [WeightSchema],
    bloodPressureData: [BloodPressureSchema],
    bloodSugarData: [BloodSugarSchema],
    heartRateData: [HeartRateSchema],
    activityData: [ActivitySchema],
    stats: [StatsSchema],
  },
  { timestamps: true }
);

export default mongoose.models.AnalyticsSnapshot || mongoose.model('AnalyticsSnapshot', AnalyticsSnapshotSchema);
