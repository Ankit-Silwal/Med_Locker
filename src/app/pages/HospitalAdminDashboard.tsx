import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  Users,
  UserPlus,
  Calendar,
  FileText,
  BarChart3,
  Bell,
  Settings,
  Trash2,
  Edit,
  Plus,
  Search,
  Database,
  Network,
  Shield,
  CheckCircle,
  QrCode,
  CreditCard,
  AlertTriangle,
  Share2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';
import NetworkVisualization from '../components/NetworkVisualization';
import EmergencyQRCode from '../components/EmergencyQRCode';

export default function HospitalAdminDashboard() {
  const [addDoctorOpen, setAddDoctorOpen] = useState(false);
  const [editHospitalOpen, setEditHospitalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [emergencyQROpen, setEmergencyQROpen] = useState(false);

  const [hospitalInfo, setHospitalInfo] = useState({
    name: 'Apollo Hospital',
    location: 'Mumbai, Maharashtra',
    established: '1995',
    departments: 12,
    totalDoctors: 45,
    totalPatients: 1250,
    rating: 4.8
  });

  useEffect(() => {
    // Load selected hospital from localStorage
    const selectedHospital = localStorage.getItem('selectedHospital');
    if (selectedHospital) {
      try {
        const hospital = JSON.parse(selectedHospital);
        setHospitalInfo({
          name: hospital.shortName || 'Apollo Hospital',
          location: hospital.location || 'Mumbai, Maharashtra',
          established: '1995',
          departments: 12,
          totalDoctors: 45,
          totalPatients: 1250,
          rating: hospital.rating || 4.8
        });
      } catch (error) {
        console.error('Error loading hospital data:', error);
      }
    }
  }, []);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Ramesh Sharma',
      specialty: 'Cardiologist',
      experience: '15 years',
      patients: 124,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Dr. Priya Gupta',
      specialty: 'General Physician',
      experience: '10 years',
      patients: 156,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Dr. Ankit Verma',
      specialty: 'Dermatologist',
      experience: '8 years',
      patients: 98,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      name: 'Dr. Kavita Desai',
      specialty: 'Endocrinologist',
      experience: '12 years',
      patients: 110,
      status: 'on-leave',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop'
    }
  ];

  const recentActivities = [
    { type: 'appointment', message: 'New appointment booked - Dr. Ramesh Sharma', time: '10 mins ago' },
    { type: 'patient', message: '5 new patient registrations', time: '1 hour ago' },
    { type: 'report', message: 'Monthly analytics report generated', time: '2 hours ago' },
    { type: 'doctor', message: 'Dr. Priya Gupta updated availability', time: '3 hours ago' }
  ];

  const monthlyStats = [
    { month: 'Jan', appointments: 450, patients: 320 },
    { month: 'Feb', appointments: 520, patients: 380 },
    { month: 'Mar', appointments: 480, patients: 350 }
  ];

  const handleAddDoctor = () => {
    toast.success('Doctor added successfully!');
    setAddDoctorOpen(false);
  };

  const handleRemoveDoctor = (doctorName: string) => {
    toast.success(`${doctorName} removed from hospital`);
  };

  const handleUpdateHospital = () => {
    toast.success('Hospital profile updated successfully!');
    setEditHospitalOpen(false);
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Admin Panel</h1>
            <p className="text-gray-600">{hospitalInfo.name} - Management Dashboard</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-[#00C851] text-[#00C851] hover:bg-[#00C851] hover:text-white"
              onClick={() => setEmergencyQROpen(true)}
            >
              <QrCode className="w-4 h-4 mr-2" />
              Emergency Access
            </Button>
            <Button variant="outline" onClick={() => setEditHospitalOpen(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <div className="bg-gradient-to-r from-[#1E90FF] to-[#00C851] p-4 rounded-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Network Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="bg-gradient-to-r from-[#00C851]/10 via-white to-[#1E90FF]/10 border-2 border-[#00C851]/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="bg-[#00C851] p-2 rounded-full animate-pulse">
                    <Network className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Network Status</p>
                    <p className="text-sm font-bold text-[#00C851]">Connected to Med Locker</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-[#1E90FF]" />
                  <div>
                    <p className="text-xs text-gray-600">Data Status</p>
                    <p className="text-sm font-bold text-[#1E90FF]">All Records Synced</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4 text-[#FF6B6B]" />
                  <div>
                    <p className="text-xs text-gray-600">Shared Records</p>
                    <p className="text-sm font-bold text-gray-900">1,245 Active</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-[#00C851]" />
                  <div>
                    <p className="text-xs text-gray-600">Access Granted</p>
                    <p className="text-sm font-bold text-gray-900">8 Hospitals</p>
                  </div>
                </div>
              </div>
              <Badge className="bg-[#00C851] text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Real-time Sync Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Hospital Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-[#1E90FF]/10 via-white to-[#00C851]/10">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Hospital Name</p>
                <p className="text-lg font-bold text-gray-900">{hospitalInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="text-lg font-semibold text-gray-900">{hospitalInfo.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Established</p>
                <p className="text-lg font-semibold text-gray-900">{hospitalInfo.established}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Rating</p>
                <p className="text-lg font-semibold text-[#00C851]">⭐ {hospitalInfo.rating}/5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { icon: Users, label: 'Total Doctors', value: hospitalInfo.totalDoctors.toString(), color: 'text-[#1E90FF]', bg: 'bg-[#1E90FF]/10' },
          { icon: Users, label: 'Total Patients', value: hospitalInfo.totalPatients.toString(), color: 'text-[#00C851]', bg: 'bg-[#00C851]/10' },
          { icon: Calendar, label: 'Appointments Today', value: '45', color: 'text-[#FF6B6B]', bg: 'bg-[#FF6B6B]/10' },
          { icon: Building2, label: 'Departments', value: hospitalInfo.departments.toString(), color: 'text-[#1E90FF]', bg: 'bg-[#1E90FF]/10' },
          { icon: Network, label: 'Network Access', value: '9 Hospitals', color: 'text-[#00C851]', bg: 'bg-[#00C851]/10', badge: true }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                {stat.badge && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-[#00C851] text-white text-xs">
                      <CheckCircle className="w-2 h-2 mr-1" />
                      Active
                    </Badge>
                  </div>
                )}
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
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-[#FF6B6B]" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Analytics Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-[#1E90FF]" />
                Monthly Overview
              </CardTitle>
              <CardDescription>Appointments and patient statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{stat.month} 2026</span>
                      <div className="flex gap-4">
                        <Badge variant="outline" className="border-[#1E90FF] text-[#1E90FF]">
                          {stat.appointments} Appts
                        </Badge>
                        <Badge variant="outline" className="border-[#00C851] text-[#00C851]">
                          {stat.patients} Patients
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#1E90FF] to-[#00C851] h-2 rounded-full"
                        style={{ width: `${(stat.appointments / 600) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Network Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <NetworkVisualization />
      </motion.div>

      {/* Doctors Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Manage Doctors</CardTitle>
                <CardDescription>Add, edit, or remove doctor accounts</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search doctors..."
                    className="pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="bg-[#1E90FF] hover:bg-[#1873CC]" onClick={() => setAddDoctorOpen(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Doctor
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={doctor.avatar} />
                        <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">
                          {doctor.specialty} • {doctor.experience} experience
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Managing {doctor.patients} patients
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={doctor.status === 'active' ? 'bg-[#00C851] text-white' : 'bg-gray-500 text-white'}>
                        {doctor.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-[#FF6B6B] border-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white"
                        onClick={() => handleRemoveDoctor(doctor.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Doctor Dialog */}
      <Dialog open={addDoctorOpen} onOpenChange={setAddDoctorOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
            <DialogDescription>
              Register a new doctor to your hospital
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="doctorName">Full Name</Label>
              <Input id="doctorName" placeholder="Dr. John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select>
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="general">General Medicine</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" placeholder="10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="doctor@hospital.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+91 98765 43210" />
            </div>
            <Button className="w-full bg-[#1E90FF] hover:bg-[#1873CC]" onClick={handleAddDoctor}>
              Add Doctor
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Hospital Dialog */}
      <Dialog open={editHospitalOpen} onOpenChange={setEditHospitalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Hospital Profile</DialogTitle>
            <DialogDescription>
              Update your hospital information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="hospitalName">Hospital Name</Label>
              <Input id="hospitalName" defaultValue={hospitalInfo.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue={hospitalInfo.location} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="departments">Number of Departments</Label>
              <Input id="departments" type="number" defaultValue={hospitalInfo.departments} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="established">Established Year</Label>
              <Input id="established" defaultValue={hospitalInfo.established} />
            </div>
            <Button className="w-full bg-[#1E90FF] hover:bg-[#1873CC]" onClick={handleUpdateHospital}>
              Update Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emergency Access QR Code Dialog */}
      <Dialog open={emergencyQROpen} onOpenChange={setEmergencyQROpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <AlertTriangle className="w-5 h-5 mr-2 text-[#FF6B6B]" />
              Emergency Access System
            </DialogTitle>
            <DialogDescription>
              Generate QR code or Health ID for emergency patient record access
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Tabs defaultValue="qr-code" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="qr-code">
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code Access
                </TabsTrigger>
                <TabsTrigger value="health-id">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Health ID Access
                </TabsTrigger>
              </TabsList>

              <TabsContent value="qr-code" className="space-y-4">
                <div className="bg-gradient-to-r from-[#FF6B6B]/10 to-[#1E90FF]/10 p-4 rounded-lg border-2 border-dashed border-[#FF6B6B]">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-[#FF6B6B] mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold text-gray-900 mb-1">Emergency Access Protocol</p>
                      <p className="text-xs">
                        This feature allows authorized medical personnel from any hospital in the Med Locker network
                        to access critical patient records during emergencies.
                      </p>
                    </div>
                  </div>
                </div>

                <EmergencyQRCode hospitalName={hospitalInfo.name} />
              </TabsContent>

              <TabsContent value="health-id" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patientHealthId">Patient Health ID</Label>
                  <Input
                    id="patientHealthId"
                    placeholder="Enter Patient Health ID for emergency access"
                  />
                  <p className="text-xs text-gray-500">
                    Enter a patient's Health ID to generate their emergency access credentials
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Database className="w-5 h-5 text-[#1E90FF] mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold text-gray-900 mb-1">Centralized Data Access</p>
                      <p className="text-xs">
                        Patient records uploaded in any hospital within the Med Locker network can be accessed
                        by authorized personnel with proper credentials or emergency access codes.
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-[#1E90FF] to-[#00C851] hover:opacity-90 text-white">
                  <Shield className="w-4 h-4 mr-2" />
                  Generate Emergency Access Code
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
