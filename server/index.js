import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seed/seedData.js';
import Hospital from './models/Hospital.js';
import DoctorDashboard from './models/DoctorDashboard.js';
import AppointmentData from './models/AppointmentData.js';
import HealthRecord from './models/HealthRecord.js';
import AnalyticsSnapshot from './models/AnalyticsSnapshot.js';
import AIInsightsData from './models/AIInsightsData.js';
import MedicineReminderData from './models/MedicineReminderData.js';
import HospitalAdminData from './models/HospitalAdminData.js';
import DashboardHomeData from './models/DashboardHomeData.js';
import authRoutes from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js';
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'med-locker-api' });
});

app.get('/api/hospitals', async (req, res) => {
  const { search = '', type = 'all' } = req.query;
  const q = {
    ...(search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { city: { $regex: search, $options: 'i' } },
            { state: { $regex: search, $options: 'i' } },
          ],
        }
      : {}),
    ...(type !== 'all' ? { type: new RegExp(`^${String(type)}$`, 'i') } : {}),
  };

  const hospitals = await Hospital.find(q).sort({ name: 1 }).lean();
  res.json(hospitals);
});

app.get('/api/doctor-dashboard', protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate('doctorProfile');
  const data = user.doctorProfile;
  if (!data) {
    const defaultData = await DoctorDashboard.findOne({ slug: 'default' }).lean();
    return res.json(defaultData);
  }
  res.json(data);
});

app.post('/api/doctor-dashboard/notes', async (_req, res) => {
  res.json({ success: true, message: 'Diagnosis and prescription saved successfully!' });
});

app.get('/api/appointments', async (_req, res) => {
  const data = await AppointmentData.findOne({ slug: 'default' }).lean();
  res.json(data);
});

app.post('/api/appointments', async (req, res) => {
  const { doctor, date, time, type, reason } = req.body;
  if (!doctor || !date || !time || !type || !reason) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const data = await AppointmentData.findOne({ slug: 'default' });
  const maxId = Math.max(0, ...data.upcomingAppointments.map((a) => a.id || 0), ...data.pastAppointments.map((a) => a.id || 0));
  const doctorDetails = data.availableDoctors.find((d) => d.name === doctor);

  data.upcomingAppointments.push({
    id: maxId + 1,
    doctor,
    specialty: doctorDetails?.specialty || 'General Physician',
    date,
    time,
    type: type === 'video' ? 'Video' : 'In-person',
    location: type === 'video' ? 'Online Consultation' : 'Hospital Visit',
    avatar: doctorDetails?.avatar || '',
    status: 'pending',
  });
  await data.save();

  res.status(201).json({ success: true });
});

app.patch('/api/appointments/:id/cancel', async (req, res) => {
  const id = Number(req.params.id);
  const data = await AppointmentData.findOne({ slug: 'default' });
  const idx = data.upcomingAppointments.findIndex((a) => a.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Appointment not found' });

  data.upcomingAppointments[idx].status = 'cancelled';
  await data.save();
  res.json({ success: true });
});

app.patch('/api/appointments/:id/reschedule', async (_req, res) => {
  res.json({ success: true, message: 'Rescheduling flow can be extended with date/time update.' });
});

app.get('/api/health-records', async (req, res) => {
  const { search = '', type = 'all' } = req.query;
  const q = {
    ...(search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { doctor: { $regex: search, $options: 'i' } },
          ],
        }
      : {}),
    ...(type !== 'all' ? { type: String(type) } : {}),
  };

  const records = await HealthRecord.find(q).sort({ date: -1 }).lean();
  res.json(records);
});

app.post('/api/health-records', async (req, res) => {
  const payload = req.body;
  if (!payload.title || !payload.type || !payload.doctor) {
    return res.status(400).json({ message: 'title, type, and doctor are required' });
  }
  const record = await HealthRecord.create({
    date: new Date().toISOString().slice(0, 10),
    status: 'active',
    aiInsight: 'Record uploaded. AI review is in progress.',
    details: payload.details || 'Uploaded via dashboard',
    hospital: payload.hospital || 'Not specified',
    fileName: payload.fileName || '',
    title: payload.title,
    type: payload.type,
    doctor: payload.doctor,
  });
  res.status(201).json(record);
});

app.get('/api/analytics', async (_req, res) => {
  const data = await AnalyticsSnapshot.findOne({ slug: 'default' }).lean();
  res.json(data);
});

app.get('/api/ai-insights', async (_req, res) => {
  const data = await AIInsightsData.findOne({ slug: 'default' }).lean();
  res.json(data);
});

app.get('/api/medicine-reminders', async (_req, res) => {
  const data = await MedicineReminderData.findOne({ slug: 'default' }).lean();
  res.json(data);
});

app.patch('/api/medicine-reminders/schedule/:id/taken', async (req, res) => {
  const id = Number(req.params.id);
  const data = await MedicineReminderData.findOne({ slug: 'default' });
  const item = data.todaySchedule.find((s) => s.id === id);
  if (!item) return res.status(404).json({ message: 'Schedule item not found' });
  item.status = 'taken';
  await data.save();
  res.json({ success: true });
});

app.get('/api/hospital-admin', protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate('hospitalAdminProfile');
  const data = user.hospitalAdminProfile;
  if (!data) {
    const defaultData = await HospitalAdminData.findOne({ slug: 'default' }).lean();
    return res.json(defaultData);
  }
  res.json(data);
});

app.get('/api/dashboard-home', protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate('patientProfile');
  let data = user.patientProfile;
  if (!data) {
    const defaultData = await DashboardHomeData.findOne({ slug: 'default' }).lean();
    return res.json(defaultData);
  }
  // Ensure the frontend doesn't crash on newly created profiles with empty arrays
  if (!data.healthSummary || data.healthSummary.length === 0) {
    const defaultData = await DashboardHomeData.findOne({ slug: 'default' }).lean();
    return res.json(defaultData);
  }
  res.json(data);
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error', details: err.message });
});

async function start() {
  try {
    await connectDB();
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
