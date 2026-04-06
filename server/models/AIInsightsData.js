import mongoose from 'mongoose';

const InsightSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    score: Number,
    status: String,
    icon: String,
    color: String,
    bgColor: String,
    description: String,
    recommendations: [String],
  },
  { _id: false }
);

const HealthAlertSchema = new mongoose.Schema(
  {
    id: Number,
    priority: String,
    title: String,
    message: String,
    time: String,
  },
  { _id: false }
);

const PredictionSchema = new mongoose.Schema(
  {
    metric: String,
    prediction: String,
    confidence: Number,
    trend: String,
  },
  { _id: false }
);

const SummarySchema = new mongoose.Schema(
  {
    healthScore: Number,
    activeGoals: Number,
    complianceRate: Number,
    message: String,
  },
  { _id: false }
);

const AIInsightsDataSchema = new mongoose.Schema(
  {
    slug: { type: String, default: 'default', unique: true },
    insights: [InsightSchema],
    healthAlerts: [HealthAlertSchema],
    aiPredictions: [PredictionSchema],
    summary: SummarySchema,
  },
  { timestamps: true }
);

export default mongoose.models.AIInsightsData || mongoose.model('AIInsightsData', AIInsightsDataSchema);
