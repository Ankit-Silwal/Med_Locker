import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getUserRole, getDashboardRoute, ROLE_KEYS } from '../utils/roleManager';
import { 
  Calendar, 
  FileText, 
  TrendingUp, 
  Clock, 
  Plus, 
  Upload, 
  Activity,
  Heart,
  Droplets,
  Thermometer
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';

export default function DashboardHome() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string>('patient');
  const [uploadLabDialogOpen, setUploadLabDialogOpen] = useState(false);
  const [uploadPrescriptionDialogOpen, setUploadPrescriptionDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recordTitle, setRecordTitle] = useState('');
  const [recordType, setRecordType] = useState('');
  const [doctorName, setDoctorName] = useState('');

  useEffect(() => {
    // Get user role and redirect to role-specific dashboard
    const role = getUserRole();
    setUserRole(role);
    
    // Redirect to role-specific dashboard
    if (role === ROLE_KEYS.DOCTOR) {
      navigate('/dashboard/doctor', { replace: true });
    } else if (role === ROLE_KEYS.HOSPITAL_ADMIN) {
      navigate('/dashboard/hospital-admin', { replace: true });
    }
  }, [navigate]);

  // Default: Show patient dashboard
  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Ramesh Sharma',
      specialty: 'Cardiologist',
      date: '2026-02-25',
      time: '10:00 AM',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      doctor: 'Dr. Priya Gupta',
      specialty: 'General Physician',
      date: '2026-02-27',
      time: '02:30 PM',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      doctor: 'Dr. Ankit Verma',
      specialty: 'Dermatologist',
      date: '2026-03-01',
      time: '11:15 AM',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop'
    }
  ];

  const aiRecommendations = [
    {
      title: 'Maintain Hydration',
      description: 'Your water intake is below recommended levels. Aim for 8 glasses daily.',
      priority: 'medium'
    },
    {
      title: 'Blood Pressure Check',
      description: 'Schedule a BP check-up. Last reading was 3 weeks ago.',
      priority: 'high'
    },
    {
      title: 'Exercise Routine',
      description: 'Your activity levels are great! Keep maintaining 30 mins daily.',
      priority: 'low'
    }
  ];

  const medicineReminders = [
    { name: 'Metformin', time: '9:00 AM', status: 'taken' },
    { name: 'Vitamin D3', time: '12:00 PM', status: 'upcoming' },
    { name: 'Aspirin', time: '9:00 PM', status: 'upcoming' }
  ];

  const quickActions = [
    { icon: FileText, label: 'Add Record', color: 'bg-[#1E90FF]', action: 'add-record' },
    { icon: Calendar, label: 'Schedule Appointment', color: 'bg-[#00C851]', action: 'schedule' },
    { icon: Upload, label: 'Upload Lab Results', color: 'bg-[#FF6B6B]', action: 'upload-lab' },
    { icon: Upload, label: 'Upload Prescription', color: 'bg-[#1E90FF]', action: 'upload-prescription' }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-record':
        navigate('/dashboard/health-records');
        break;
      case 'schedule':
        navigate('/dashboard/appointments');
        break;
      case 'upload-lab':
        setUploadLabDialogOpen(true);
        break;
      case 'upload-prescription':
        setUploadPrescriptionDialogOpen(true);
        break;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      toast.success(`File "${file.name}" selected`);
    }
  };

  const handleUploadSubmit = (type: 'lab' | 'prescription') => {
    if (!recordTitle || !doctorName || !selectedFile) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success(`${type === 'lab' ? 'Lab result' : 'Prescription'} uploaded successfully!`);
    // Reset form
    setRecordTitle('');
    setDoctorName('');
    setSelectedFile(null);
    setRecordType('');
    if (type === 'lab') {
      setUploadLabDialogOpen(false);
    } else {
      setUploadPrescriptionDialogOpen(false);
    }
  };

  const handleNewAppointment = () => {
    navigate('/dashboard/appointments');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Dikshya!</h1>
        <p className="text-gray-600">Here's your health overview for today</p>
      </motion.div>

      {/* Health Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Heart, label: 'Heart Rate', value: '72 bpm', color: 'text-[#FF6B6B]', bg: 'bg-[#FF6B6B]/10' },
          { icon: Activity, label: 'Blood Pressure', value: '120/80', color: 'text-[#1E90FF]', bg: 'bg-[#1E90FF]/10' },
          { icon: Droplets, label: 'Blood Sugar', value: '95 mg/dL', color: 'text-[#00C851]', bg: 'bg-[#00C851]/10' },
          { icon: Thermometer, label: 'Temperature', value: '98.6°F', color: 'text-[#FF6B6B]', bg: 'bg-[#FF6B6B]/10' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`${stat.bg} p-3 rounded-full`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled consultations</CardDescription>
                </div>
                <Button size="sm" className="bg-[#1E90FF] hover:bg-[#1873CC]" onClick={handleNewAppointment}>
                  <Plus className="w-4 h-4 mr-2" />
                  New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={appointment.avatar} />
                      <AvatarFallback>{appointment.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{appointment.doctor}</p>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{appointment.date}</p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Personalized health insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{rec.title}</h4>
                    <Badge
                      variant="outline"
                      className={
                        rec.priority === 'high'
                          ? 'border-[#FF6B6B] text-[#FF6B6B]'
                          : rec.priority === 'medium'
                          ? 'border-[#1E90FF] text-[#1E90FF]'
                          : 'border-[#00C851] text-[#00C851]'
                      }
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Medicine Reminders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Medicine Reminders</CardTitle>
              <CardDescription>Today's schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {medicineReminders.map((med, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      med.status === 'taken' ? 'bg-[#00C851]' : 'bg-[#1E90FF]'
                    }`}></div>
                    <div>
                      <p className="font-medium text-sm">{med.name}</p>
                      <p className="text-xs text-gray-600">{med.time}</p>
                    </div>
                  </div>
                  <Badge variant={med.status === 'taken' ? 'default' : 'outline'}>
                    {med.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Health Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Health Goals Progress</CardTitle>
              <CardDescription>Track your wellness journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Daily Steps</span>
                  <span className="text-sm text-gray-600">7,500 / 10,000</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Water Intake</span>
                  <span className="text-sm text-gray-600">5 / 8 glasses</span>
                </div>
                <Progress value={62.5} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Sleep Quality</span>
                  <span className="text-sm text-gray-600">7 / 8 hours</span>
                </div>
                <Progress value={87.5} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your health records efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${action.color} text-white p-6 rounded-lg flex flex-col items-center justify-center space-y-2 hover:opacity-90 transition-opacity`}
                    onClick={() => handleQuickAction(action.action)}
                  >
                    <Icon className="w-8 h-8" />
                    <span className="text-sm font-medium text-center">{action.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upload Lab Results Dialog */}
      <Dialog open={uploadLabDialogOpen} onOpenChange={setUploadLabDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Lab Results</DialogTitle>
            <DialogDescription>
              Upload your lab results to keep track of your health.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recordTitle">Record Title</Label>
              <Input
                id="recordTitle"
                placeholder="Enter record title"
                value={recordTitle}
                onChange={(e) => setRecordTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recordType">Record Type</Label>
              <Select
                value={recordType}
                onValueChange={setRecordType}
              >
                <SelectTrigger id="recordType">
                  <SelectValue placeholder="Select record type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blood-test">Blood Test</SelectItem>
                  <SelectItem value="urine-test">Urine Test</SelectItem>
                  <SelectItem value="ecg">ECG</SelectItem>
                  <SelectItem value="x-ray">X-Ray</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctorName">Doctor Name</Label>
              <Input
                id="doctorName"
                placeholder="Enter doctor name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              className="bg-[#FF6B6B] hover:bg-[#FF4545]"
              onClick={() => handleUploadSubmit('lab')}
            >
              Upload
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Prescription Dialog */}
      <Dialog open={uploadPrescriptionDialogOpen} onOpenChange={setUploadPrescriptionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Prescription</DialogTitle>
            <DialogDescription>
              Upload your prescription to keep track of your medications.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recordTitle">Record Title</Label>
              <Input
                id="recordTitle"
                placeholder="Enter record title"
                value={recordTitle}
                onChange={(e) => setRecordTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recordType">Record Type</Label>
              <Select
                value={recordType}
                onValueChange={setRecordType}
              >
                <SelectTrigger id="recordType">
                  <SelectValue placeholder="Select record type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prescription">Prescription</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctorName">Doctor Name</Label>
              <Input
                id="doctorName"
                placeholder="Enter doctor name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              className="bg-[#1E90FF] hover:bg-[#1873CC]"
              onClick={() => handleUploadSubmit('prescription')}
            >
              Upload
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}