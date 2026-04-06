import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Calendar, 
  FileText, 
  Brain, 
  Clock,
  Activity,
  Stethoscope,
  Plus,
  Search,
  Filter
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
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { apiGet, apiPost } from '../utils/api';

interface DoctorDashboardData {
  stats: {
    totalPatients: number;
    todaysAppointments: number;
    pendingReports: number;
    criticalCases: number;
  };
  patients: any[];
  todayAppointments: Array<{ time: string; patient: string; type: string }>;
  aiSuggestions: Array<{ patient: string; suggestion: string; priority: string }>;
}

export default function DoctorDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [addDiagnosisOpen, setAddDiagnosisOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [dashboard, setDashboard] = useState<DoctorDashboardData | null>(null);

  useEffect(() => {
    apiGet<DoctorDashboardData>('/doctor-dashboard')
      .then(setDashboard)
      .catch(() => setDashboard(null));
  }, []);

  const handleAddDiagnosis = (patient: any) => {
    setSelectedPatient(patient);
    setAddDiagnosisOpen(true);
  };

  const handleSaveDiagnosis = () => {
    apiPost('/doctor-dashboard/notes', {
      patientId: selectedPatient?.id,
    })
      .then(() => {
        toast.success('Diagnosis and prescription saved successfully!');
        setAddDiagnosisOpen(false);
        setSelectedPatient(null);
      })
      .catch(() => toast.error('Failed to save diagnosis. Please try again.'));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-[#00C851] text-white';
      case 'attention':
        return 'bg-[#FF6B6B] text-white';
      case 'critical':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const filteredPatients = (dashboard?.patients || []).filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Panel</h1>
            <p className="text-gray-600">Welcome back, Dr. Ramesh Sharma</p>
          </div>
          <div className="bg-gradient-to-r from-[#1E90FF] to-[#00C851] p-4 rounded-lg">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Total Patients', value: String(dashboard?.stats?.totalPatients ?? 0), color: 'text-[#1E90FF]', bg: 'bg-[#1E90FF]/10' },
          { icon: Calendar, label: 'Today\'s Appointments', value: String(dashboard?.stats?.todaysAppointments ?? 0), color: 'text-[#00C851]', bg: 'bg-[#00C851]/10' },
          { icon: FileText, label: 'Pending Reports', value: String(dashboard?.stats?.pendingReports ?? 0), color: 'text-[#FF6B6B]', bg: 'bg-[#FF6B6B]/10' },
          { icon: Activity, label: 'Critical Cases', value: String(dashboard?.stats?.criticalCases ?? 0), color: 'text-red-600', bg: 'bg-red-100' }
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
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#1E90FF]" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Your appointments for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {(dashboard?.todayAppointments || []).map((apt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{apt.patient}</p>
                    <p className="text-xs text-gray-600">{apt.type}</p>
                  </div>
                  <Badge variant="outline" className="border-[#1E90FF] text-[#1E90FF]">
                    {apt.time}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Assistant Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-[#00C851]" />
                AI Medical Assistant
              </CardTitle>
              <CardDescription>Intelligent suggestions for patient care</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(dashboard?.aiSuggestions || []).map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-[#1E90FF]/5 to-[#00C851]/5 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-sm text-gray-900">{suggestion.patient}</p>
                    <Badge
                      variant="outline"
                      className={
                        suggestion.priority === 'high'
                          ? 'border-red-500 text-red-600'
                          : suggestion.priority === 'medium'
                          ? 'border-[#FF6B6B] text-[#FF6B6B]'
                          : 'border-[#00C851] text-[#00C851]'
                      }
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{suggestion.suggestion}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Patient List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Patients</CardTitle>
                <CardDescription>Manage and view patient records</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search patients..."
                    className="pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {filteredPatients.map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={patient.avatar} />
                        <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-600">
                          {patient.age} years • {patient.gender} • {patient.condition}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Last visit: {patient.lastVisit} • Next: {patient.nextAppointment}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAddDiagnosis(patient)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Add Notes
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Diagnosis Dialog */}
      <Dialog open={addDiagnosisOpen} onOpenChange={setAddDiagnosisOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Diagnosis & Prescription</DialogTitle>
            <DialogDescription>
              {selectedPatient && `Recording medical notes for ${selectedPatient.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Textarea 
                id="diagnosis" 
                placeholder="Enter diagnosis details..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prescription">Prescription</Label>
              <Textarea 
                id="prescription" 
                placeholder="Enter prescribed medications and dosage..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Any additional observations or instructions..."
                rows={3}
              />
            </div>
            <div className="bg-gradient-to-r from-[#1E90FF]/10 to-[#00C851]/10 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Brain className="w-5 h-5 text-[#1E90FF] mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">AI Suggestion</h4>
                  <p className="text-sm text-gray-700">
                    Based on patient history, consider prescribing anti-inflammatory medication along with the current treatment plan.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-[#1E90FF] hover:bg-[#1873CC]"
                onClick={handleSaveDiagnosis}
              >
                Save & Send to Patient
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setAddDiagnosisOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
