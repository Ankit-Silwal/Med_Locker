import Hospital from '../models/Hospital.js';
import DoctorDashboard from '../models/DoctorDashboard.js';
import AppointmentData from '../models/AppointmentData.js';
import HealthRecord from '../models/HealthRecord.js';
import AnalyticsSnapshot from '../models/AnalyticsSnapshot.js';
import AIInsightsData from '../models/AIInsightsData.js';
import MedicineReminderData from '../models/MedicineReminderData.js';
import HospitalAdminData from '../models/HospitalAdminData.js';
import DashboardHomeData from '../models/DashboardHomeData.js';

export async function seedDatabase() {
  const hospitalCount = await Hospital.countDocuments();
  if (hospitalCount === 0) {
    await Hospital.insertMany([
      { id: 'aiims-delhi', name: 'All India Institute of Medical Sciences', shortName: 'AIIMS Delhi', location: 'Ansari Nagar, New Delhi', city: 'New Delhi', state: 'Delhi', established: '1956', type: 'Government', departments: 42, doctors: 685, patients: 8500, rating: 4.9, verified: true, networkStatus: 'active' },
      { id: 'apollo-chennai', name: 'Apollo Hospitals', shortName: 'Apollo Chennai', location: 'Greams Road, Chennai', city: 'Chennai', state: 'Tamil Nadu', established: '1983', type: 'Private', departments: 52, doctors: 450, patients: 6200, rating: 4.8, verified: true, networkStatus: 'active' },
      { id: 'fortis-gurgaon', name: 'Fortis Memorial Research Institute', shortName: 'Fortis Gurgaon', location: 'Sector 44, Gurgaon', city: 'Gurgaon', state: 'Haryana', established: '2007', type: 'Private', departments: 35, doctors: 380, patients: 4800, rating: 4.7, verified: true, networkStatus: 'active' },
      { id: 'medanta-gurgaon', name: 'Medanta - The Medicity', shortName: 'Medanta Gurgaon', location: 'Sector 38, Gurgaon', city: 'Gurgaon', state: 'Haryana', established: '2009', type: 'Private', departments: 45, doctors: 800, patients: 7200, rating: 4.8, verified: true, networkStatus: 'syncing' },
      { id: 'tata-mumbai', name: 'Tata Memorial Hospital', shortName: 'Tata Memorial Mumbai', location: 'Parel, Mumbai', city: 'Mumbai', state: 'Maharashtra', established: '1941', type: 'Government', departments: 28, doctors: 520, patients: 5600, rating: 4.9, verified: true, networkStatus: 'active' },
      { id: 'cmc-vellore', name: 'Christian Medical College', shortName: 'CMC Vellore', location: 'Ida Scudder Road, Vellore', city: 'Vellore', state: 'Tamil Nadu', established: '1900', type: 'Private', departments: 38, doctors: 650, patients: 6800, rating: 4.9, verified: true, networkStatus: 'active' },
      { id: 'narayana-bangalore', name: 'Narayana Health City', shortName: 'Narayana Health Bangalore', location: 'Bommasandra, Bangalore', city: 'Bangalore', state: 'Karnataka', established: '2001', type: 'Private', departments: 31, doctors: 420, patients: 5200, rating: 4.7, verified: true, networkStatus: 'active' },
      { id: 'kokilaben-mumbai', name: 'Kokilaben Dhirubhai Ambani Hospital', shortName: 'Kokilaben Hospital Mumbai', location: 'Andheri West, Mumbai', city: 'Mumbai', state: 'Maharashtra', established: '2009', type: 'Private', departments: 36, doctors: 480, patients: 5800, rating: 4.8, verified: true, networkStatus: 'active' },
      { id: 'manipal-bangalore', name: 'Manipal Hospitals', shortName: 'Manipal Hospitals Bangalore', location: 'Old Airport Road, Bangalore', city: 'Bangalore', state: 'Karnataka', established: '1991', type: 'Private', departments: 33, doctors: 390, patients: 4600, rating: 4.7, verified: true, networkStatus: 'syncing' },
      { id: 'max-delhi', name: 'Max Super Speciality Hospital', shortName: 'Max Hospital Delhi', location: 'Saket, New Delhi', city: 'New Delhi', state: 'Delhi', established: '2006', type: 'Private', departments: 40, doctors: 510, patients: 6100, rating: 4.8, verified: true, networkStatus: 'active' },
    ]);
  }

  await DoctorDashboard.updateOne(
    { slug: 'default' },
    {
      slug: 'default',
      stats: { totalPatients: 124, todaysAppointments: 8, pendingReports: 12, criticalCases: 3 },
      patients: [
        { id: 1, name: 'Dikshya Tiwari', age: 28, gender: 'Female', lastVisit: '2026-02-20', condition: 'Diabetes Type 2', status: 'stable', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', nextAppointment: '2026-03-15' },
        { id: 2, name: 'Raj Kumar', age: 45, gender: 'Male', lastVisit: '2026-02-18', condition: 'Hypertension', status: 'attention', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', nextAppointment: '2026-03-10' },
        { id: 3, name: 'Priya Sharma', age: 32, gender: 'Female', lastVisit: '2026-02-22', condition: 'Asthma', status: 'stable', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', nextAppointment: '2026-03-20' },
        { id: 4, name: 'Arjun Patel', age: 55, gender: 'Male', lastVisit: '2026-02-25', condition: 'Cardiac Issue', status: 'critical', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', nextAppointment: '2026-03-05' },
      ],
      todayAppointments: [
        { time: '09:00 AM', patient: 'Dikshya Tiwari', type: 'Follow-up' },
        { time: '10:30 AM', patient: 'Arjun Patel', type: 'Consultation' },
        { time: '02:00 PM', patient: 'Priya Sharma', type: 'Check-up' },
        { time: '04:00 PM', patient: 'Raj Kumar', type: 'Follow-up' },
      ],
      aiSuggestions: [
        { patient: 'Arjun Patel', suggestion: 'Consider ECG test based on recent symptoms and cardiac history', priority: 'high' },
        { patient: 'Dikshya Tiwari', suggestion: 'HbA1c levels trending up - medication adjustment may be needed', priority: 'medium' },
        { patient: 'Raj Kumar', suggestion: 'Blood pressure readings show improvement with current medication', priority: 'low' },
      ],
    },
    { upsert: true }
  );

  await AppointmentData.updateOne(
    { slug: 'default' },
    {
      slug: 'default',
      upcomingAppointments: [
        { id: 1, doctor: 'Dr. Ramesh Sharma', specialty: 'Cardiologist', date: '2026-02-25', time: '10:00 AM', type: 'In-person', location: 'Apollo Hospital, Mumbai', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop', status: 'confirmed' },
        { id: 2, doctor: 'Dr. Priya Gupta', specialty: 'General Physician', date: '2026-02-27', time: '02:30 PM', type: 'Video', location: 'Online Consultation', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop', status: 'confirmed' },
        { id: 3, doctor: 'Dr. Ankit Verma', specialty: 'Dermatologist', date: '2026-03-01', time: '11:15 AM', type: 'In-person', location: 'Max Hospital, Bangalore', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop', status: 'pending' },
      ],
      pastAppointments: [
        { id: 4, doctor: 'Dr. Kavita Desai', specialty: 'Endocrinologist', date: '2026-02-15', time: '03:00 PM', type: 'In-person', location: 'AIIMS, New Delhi', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop', status: 'completed' },
        { id: 5, doctor: 'Dr. Suresh Reddy', specialty: 'Orthopedic', date: '2026-02-10', time: '09:30 AM', type: 'Video', location: 'Online Consultation', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&h=100&fit=crop', status: 'completed' },
        { id: 6, doctor: 'Dr. Meera Patel', specialty: 'Gynecologist', date: '2026-02-05', time: '04:00 PM', type: 'In-person', location: 'Fortis Hospital, Delhi', avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop', status: 'completed' },
      ],
      availableDoctors: [
        { name: 'Dr. Ramesh Sharma', specialty: 'Cardiologist', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop' },
        { name: 'Dr. Priya Gupta', specialty: 'General Physician', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop' },
        { name: 'Dr. Ankit Verma', specialty: 'Dermatologist', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop' },
        { name: 'Dr. Kavita Desai', specialty: 'Endocrinologist', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop' },
      ],
      timeSlots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'],
    },
    { upsert: true }
  );

  if ((await HealthRecord.countDocuments()) === 0) {
    await HealthRecord.insertMany([
      { date: '2026-02-20', type: 'Lab Report', title: 'Blood Test Results', doctor: 'Dr. Ramesh Sharma', hospital: 'Apollo Hospital, Mumbai', status: 'normal', aiInsight: 'All blood parameters are within normal range. Vitamin D levels are slightly low - consider supplementation.', details: 'Complete Blood Count, Lipid Profile, Liver Function Test' },
      { date: '2026-02-15', type: 'Prescription', title: 'Diabetes Medication', doctor: 'Dr. Priya Gupta', hospital: 'Fortis Hospital, Delhi', status: 'active', aiInsight: 'Medication dosage is appropriate. Continue current treatment plan and monitor blood sugar levels.', details: 'Metformin 500mg - 2x daily, Vitamin D3 - 1x daily' },
      { date: '2026-02-10', type: 'Scan', title: 'Chest X-Ray', doctor: 'Dr. Ankit Verma', hospital: 'Max Hospital, Bangalore', status: 'normal', aiInsight: 'No abnormalities detected. Lungs are clear and heart size is normal.', details: 'Posteroanterior and lateral views' },
      { date: '2026-02-05', type: 'Consultation', title: 'Annual Health Checkup', doctor: 'Dr. Kavita Desai', hospital: 'AIIMS, New Delhi', status: 'completed', aiInsight: 'Overall health is good. Recommended to increase physical activity and maintain healthy diet.', details: 'General examination, vital signs assessment' },
      { date: '2026-01-28', type: 'Lab Report', title: 'Thyroid Function Test', doctor: 'Dr. Suresh Reddy', hospital: 'Apollo Hospital, Hyderabad', status: 'normal', aiInsight: 'Thyroid hormone levels are optimal. Continue regular monitoring every 6 months.', details: 'TSH, T3, T4 levels' },
    ]);
  }

  await AnalyticsSnapshot.updateOne(
    { slug: 'default' },
    {
      slug: 'default',
      weightData: [
        { month: 'Jan', weight: 75, target: 72 },
        { month: 'Feb', weight: 74, target: 72 },
        { month: 'Mar', weight: 73.5, target: 72 },
        { month: 'Apr', weight: 73, target: 72 },
        { month: 'May', weight: 72.5, target: 72 },
        { month: 'Jun', weight: 72, target: 72 },
      ],
      bloodPressureData: [
        { date: 'Week 1', systolic: 120, diastolic: 80 },
        { date: 'Week 2', systolic: 122, diastolic: 82 },
        { date: 'Week 3', systolic: 118, diastolic: 78 },
        { date: 'Week 4', systolic: 120, diastolic: 80 },
        { date: 'Week 5', systolic: 119, diastolic: 79 },
        { date: 'Week 6', systolic: 121, diastolic: 81 },
      ],
      bloodSugarData: [
        { time: '6 AM', level: 95 },
        { time: '9 AM', level: 110 },
        { time: '12 PM', level: 120 },
        { time: '3 PM', level: 105 },
        { time: '6 PM', level: 115 },
        { time: '9 PM', level: 100 },
      ],
      heartRateData: [
        { day: 'Mon', rate: 72 },
        { day: 'Tue', rate: 75 },
        { day: 'Wed', rate: 70 },
        { day: 'Thu', rate: 73 },
        { day: 'Fri', rate: 71 },
        { day: 'Sat', rate: 74 },
        { day: 'Sun', rate: 72 },
      ],
      activityData: [
        { name: 'Steps', value: 7500, color: '#1E90FF' },
        { name: 'Exercise', value: 30, color: '#00C851' },
        { name: 'Sleep', value: 7, color: '#FF6B6B' },
        { name: 'Water', value: 5, color: '#1E90FF' },
      ],
      stats: [
        { title: 'Average Heart Rate', value: '72 bpm', change: '+2%', trend: 'up', color: 'text-[#FF6B6B]' },
        { title: 'Blood Pressure', value: '120/80', change: 'Normal', trend: 'stable', color: 'text-[#00C851]' },
        { title: 'Blood Sugar', value: '95 mg/dL', change: '-5%', trend: 'down', color: 'text-[#1E90FF]' },
        { title: 'Weight', value: '72 kg', change: '-3 kg', trend: 'down', color: 'text-[#00C851]' },
      ],
    },
    { upsert: true }
  );

  await AIInsightsData.updateOne(
    { slug: 'default' },
    {
      slug: 'default',
      insights: [
        { id: 1, title: 'Cardiovascular Health', score: 85, status: 'good', icon: 'Heart', color: 'text-[#00C851]', bgColor: 'bg-[#00C851]/10', description: 'Your heart rate and blood pressure are stable. Continue your current exercise routine.', recommendations: ['Maintain 30 minutes of cardio exercise daily', 'Monitor blood pressure weekly', 'Include omega-3 rich foods in diet'] },
        { id: 2, title: 'Metabolic Health', score: 72, status: 'attention', icon: 'Activity', color: 'text-[#FF6B6B]', bgColor: 'bg-[#FF6B6B]/10', description: 'Blood sugar levels show minor fluctuations. Consider dietary adjustments.', recommendations: ['Reduce refined sugar intake', 'Increase fiber consumption', 'Schedule diabetes screening test'] },
        { id: 3, title: 'Hydration Level', score: 68, status: 'attention', icon: 'Droplets', color: 'text-[#1E90FF]', bgColor: 'bg-[#1E90FF]/10', description: 'Your water intake is below recommended levels. Aim for 8 glasses daily.', recommendations: ['Drink water every 2 hours', 'Use hydration reminder apps', 'Include water-rich fruits and vegetables'] },
        { id: 4, title: 'Weight Management', score: 92, status: 'excellent', icon: 'Scale', color: 'text-[#00C851]', bgColor: 'bg-[#00C851]/10', description: 'Excellent progress! You have reached your target weight goal.', recommendations: ['Maintain current diet plan', 'Continue regular exercise', 'Monitor weight weekly'] },
      ],
      healthAlerts: [
        { id: 1, priority: 'high', title: 'Medication Reminder', message: 'You have missed 2 doses of Metformin this week. Please maintain consistency.', time: '2 hours ago' },
        { id: 2, priority: 'medium', title: 'Lab Test Due', message: 'Your quarterly blood work is due in 5 days. Schedule an appointment soon.', time: '1 day ago' },
        { id: 3, priority: 'low', title: 'Exercise Milestone', message: 'Great job! You have completed 20 consecutive days of exercise.', time: '3 days ago' },
      ],
      aiPredictions: [
        { metric: 'Blood Pressure', prediction: 'Stable', confidence: 94, trend: 'Your BP is likely to remain within normal range for the next 3 months based on current lifestyle.' },
        { metric: 'Blood Sugar', prediction: 'Minor Increase', confidence: 78, trend: 'You may experience slight increase in fasting glucose. Consider dietary modifications.' },
        { metric: 'Weight', prediction: 'Stable', confidence: 91, trend: 'Weight is expected to remain stable with current exercise and diet routine.' },
      ],
      summary: {
        healthScore: 82,
        activeGoals: 15,
        complianceRate: 95,
        message: 'Based on comprehensive analysis of your health records, vitals, and lifestyle data, your overall health is in good condition. Keep maintaining your current healthy habits and follow the AI recommendations for optimal wellness.',
      },
    },
    { upsert: true }
  );

  await MedicineReminderData.updateOne(
    { slug: 'default' },
    {
      slug: 'default',
      medications: [
        { id: 1, name: 'Metformin', dosage: '500mg', frequency: ['morning', 'night'], timing: 'after-meal', duration: '30 days', status: 'active', progress: 60 },
        { id: 2, name: 'Vitamin D3', dosage: '60,000 IU', frequency: ['morning'], timing: 'after-meal', duration: '10 weeks', status: 'active', progress: 40 },
        { id: 3, name: 'Aspirin', dosage: '75mg', frequency: ['night'], timing: 'after-meal', duration: '90 days', status: 'active', progress: 75 },
        { id: 4, name: 'Atorvastatin', dosage: '10mg', frequency: ['night'], timing: 'before-meal', duration: '60 days', status: 'active', progress: 50 },
      ],
      todaySchedule: [
        { id: 1, time: '09:00 AM', medicines: [{ name: 'Metformin', dosage: '500mg', timing: 'after-meal' }, { name: 'Vitamin D3', dosage: '60,000 IU', timing: 'after-meal' }], period: 'morning', status: 'taken' },
        { id: 2, time: '02:00 PM', medicines: [{ name: 'Calcium', dosage: '500mg', timing: 'after-meal' }], period: 'afternoon', status: 'upcoming' },
        { id: 3, time: '09:00 PM', medicines: [{ name: 'Metformin', dosage: '500mg', timing: 'after-meal' }, { name: 'Aspirin', dosage: '75mg', timing: 'after-meal' }, { name: 'Atorvastatin', dosage: '10mg', timing: 'before-meal' }], period: 'night', status: 'upcoming' },
      ],
    },
    { upsert: true }
  );

  await HospitalAdminData.updateOne(
    { slug: 'default' },
    {
      slug: 'default',
      hospitalInfo: {
        name: 'Apollo Hospital',
        location: 'Mumbai, Maharashtra',
        established: '1995',
        departments: 12,
        totalDoctors: 45,
        totalPatients: 1250,
        rating: 4.8,
      },
      doctors: [
        { id: 1, name: 'Dr. Ramesh Sharma', specialty: 'Cardiologist', experience: '15 years', patients: 124, status: 'active', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop' },
        { id: 2, name: 'Dr. Priya Gupta', specialty: 'General Physician', experience: '10 years', patients: 156, status: 'active', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop' },
        { id: 3, name: 'Dr. Ankit Verma', specialty: 'Dermatologist', experience: '8 years', patients: 98, status: 'active', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop' },
        { id: 4, name: 'Dr. Kavita Desai', specialty: 'Endocrinologist', experience: '12 years', patients: 110, status: 'on-leave', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop' },
      ],
      recentActivities: [
        { type: 'appointment', message: 'New appointment booked - Dr. Ramesh Sharma', time: '10 mins ago' },
        { type: 'patient', message: '5 new patient registrations', time: '1 hour ago' },
        { type: 'report', message: 'Monthly analytics report generated', time: '2 hours ago' },
        { type: 'doctor', message: 'Dr. Priya Gupta updated availability', time: '3 hours ago' },
      ],
      monthlyStats: [
        { month: 'Jan', appointments: 450, patients: 320 },
        { month: 'Feb', appointments: 520, patients: 380 },
        { month: 'Mar', appointments: 480, patients: 350 },
      ],
      networkStats: {
        sharedRecords: 1245,
        accessGrantedHospitals: 8,
        appointmentsToday: 45,
      },
    },
    { upsert: true }
  );

  await DashboardHomeData.updateOne(
    { slug: 'default' },
    {
      slug: 'default',
      healthSummary: [
        { icon: 'Heart', label: 'Heart Rate', value: '72 bpm', color: 'text-[#FF6B6B]', bg: 'bg-[#FF6B6B]/10' },
        { icon: 'Activity', label: 'Blood Pressure', value: '120/80', color: 'text-[#1E90FF]', bg: 'bg-[#1E90FF]/10' },
        { icon: 'Droplets', label: 'Blood Sugar', value: '95 mg/dL', color: 'text-[#00C851]', bg: 'bg-[#00C851]/10' },
        { icon: 'Thermometer', label: 'Temperature', value: '98.6°F', color: 'text-[#FF6B6B]', bg: 'bg-[#FF6B6B]/10' },
      ],
      upcomingAppointments: [
        { id: 1, doctor: 'Dr. Ramesh Sharma', specialty: 'Cardiologist', date: '2026-02-25', time: '10:00 AM', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop' },
        { id: 2, doctor: 'Dr. Priya Gupta', specialty: 'General Physician', date: '2026-02-27', time: '02:30 PM', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop' },
        { id: 3, doctor: 'Dr. Ankit Verma', specialty: 'Dermatologist', date: '2026-03-01', time: '11:15 AM', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop' },
      ],
      aiRecommendations: [
        { title: 'Maintain Hydration', description: 'Your water intake is below recommended levels. Aim for 8 glasses daily.', priority: 'medium' },
        { title: 'Blood Pressure Check', description: 'Schedule a BP check-up. Last reading was 3 weeks ago.', priority: 'high' },
        { title: 'Exercise Routine', description: 'Your activity levels are great! Keep maintaining 30 mins daily.', priority: 'low' },
      ],
      medicineReminders: [
        { name: 'Metformin', time: '9:00 AM', status: 'taken' },
        { name: 'Vitamin D3', time: '12:00 PM', status: 'upcoming' },
        { name: 'Aspirin', time: '9:00 PM', status: 'upcoming' },
      ],
      quickActions: [
        { icon: 'FileText', label: 'Add Record', color: 'bg-[#1E90FF]', action: 'add-record' },
        { icon: 'Calendar', label: 'Schedule Appointment', color: 'bg-[#00C851]', action: 'schedule' },
        { icon: 'Upload', label: 'Upload Lab Results', color: 'bg-[#FF6B6B]', action: 'upload-lab' },
        { icon: 'Upload', label: 'Upload Prescription', color: 'bg-[#1E90FF]', action: 'upload-prescription' },
      ],
      goalsProgress: [
        { label: 'Daily Steps', current: '7,500 / 10,000', progress: 75 },
        { label: 'Water Intake', current: '5 / 8 glasses', progress: 62.5 },
        { label: 'Sleep Quality', current: '7 / 8 hours', progress: 87.5 },
      ],
    },
    { upsert: true }
  );
}
