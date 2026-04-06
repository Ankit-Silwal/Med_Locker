import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Pill, 
  Upload, 
  Clock, 
  Bell, 
  CheckCircle2, 
  XCircle, 
  Calendar,
  Sun,
  Sunset,
  Moon,
  UtensilsCrossed,
  Plus,
  AlarmClock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string[];
  timing: string;
  duration: string;
  status: 'active' | 'completed';
  progress: number;
}

export default function MedicineReminder() {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: 'Metformin',
      dosage: '500mg',
      frequency: ['morning', 'night'],
      timing: 'after-meal',
      duration: '30 days',
      status: 'active',
      progress: 60
    },
    {
      id: 2,
      name: 'Vitamin D3',
      dosage: '60,000 IU',
      frequency: ['morning'],
      timing: 'after-meal',
      duration: '10 weeks',
      status: 'active',
      progress: 40
    },
    {
      id: 3,
      name: 'Aspirin',
      dosage: '75mg',
      frequency: ['night'],
      timing: 'after-meal',
      duration: '90 days',
      status: 'active',
      progress: 75
    },
    {
      id: 4,
      name: 'Atorvastatin',
      dosage: '10mg',
      frequency: ['night'],
      timing: 'before-meal',
      duration: '60 days',
      status: 'active',
      progress: 50
    }
  ]);

  const todaySchedule = [
    {
      id: 1,
      time: '09:00 AM',
      medicines: [
        { name: 'Metformin', dosage: '500mg', timing: 'after-meal' },
        { name: 'Vitamin D3', dosage: '60,000 IU', timing: 'after-meal' }
      ],
      period: 'morning',
      status: 'taken'
    },
    {
      id: 2,
      time: '02:00 PM',
      medicines: [
        { name: 'Calcium', dosage: '500mg', timing: 'after-meal' }
      ],
      period: 'afternoon',
      status: 'upcoming'
    },
    {
      id: 3,
      time: '09:00 PM',
      medicines: [
        { name: 'Metformin', dosage: '500mg', timing: 'after-meal' },
        { name: 'Aspirin', dosage: '75mg', timing: 'after-meal' },
        { name: 'Atorvastatin', dosage: '10mg', timing: 'before-meal' }
      ],
      period: 'night',
      status: 'upcoming'
    }
  ];

  const nextDose = todaySchedule.find(s => s.status === 'upcoming');

  const handleMarkAsTaken = (scheduleId: number) => {
    toast.success('Medication marked as taken!');
  };

  const handleSnooze = (scheduleId: number) => {
    toast.info('Reminder snoozed for 30 minutes');
  };

  const handleUploadPrescription = () => {
    toast.success('Prescription uploaded successfully! AI is analyzing your medications...');
  };

  const getPeriodIcon = (period: string) => {
    switch (period) {
      case 'morning':
        return <Sun className="w-5 h-5 text-[#FF6B6B]" />;
      case 'afternoon':
        return <Sunset className="w-5 h-5 text-[#1E90FF]" />;
      case 'night':
        return <Moon className="w-5 h-5 text-[#00C851]" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getTimingIcon = (timing: string) => {
    return <UtensilsCrossed className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken':
        return 'bg-[#00C851] text-white';
      case 'upcoming':
        return 'bg-[#1E90FF] text-white';
      case 'missed':
        return 'bg-[#FF6B6B] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Pill className="w-8 h-8 text-[#1E90FF]" />
            <h1 className="text-3xl font-bold text-gray-900">Medicine Reminder</h1>
          </div>
          <p className="text-gray-600">Never miss a dose with smart reminders</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#1E90FF] hover:bg-[#1873CC]">
              <Upload className="w-4 h-4 mr-2" />
              Upload Prescription
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Prescription</DialogTitle>
              <DialogDescription>
                Upload your prescription and let AI automatically create medication schedule
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1E90FF] transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 10MB</p>
              </div>
              <div className="bg-[#1E90FF]/10 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">AI Auto-Detection</h4>
                <p className="text-sm text-gray-600">
                  Our AI will automatically extract medication names, dosages, timing, and create reminders for you.
                </p>
              </div>
              <Button className="w-full bg-[#1E90FF] hover:bg-[#1873CC]" onClick={handleUploadPrescription}>
                Upload & Generate Schedule
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Next Dose Countdown */}
      {nextDose && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="bg-gradient-to-r from-[#1E90FF] to-[#00C851] text-white border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="bg-white/20 p-4 rounded-full"
                  >
                    <AlarmClock className="w-8 h-8" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Next Dose</h3>
                    <p className="text-white/90">
                      {nextDose.medicines.length} medication{nextDose.medicines.length > 1 ? 's' : ''} at {nextDose.time}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {nextDose.medicines.map((med, idx) => (
                        <Badge key={idx} className="bg-white/20 text-white border-white/30">
                          {med.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">2h 30m</div>
                  <div className="text-sm text-white/80">remaining</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Your medication timeline for today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {todaySchedule.map((schedule, index) => (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 ${
                schedule.status === 'taken' 
                  ? 'bg-[#00C851]/5 border-[#00C851]/20' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    {getPeriodIcon(schedule.period)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{schedule.time}</h4>
                      <Badge className={getStatusColor(schedule.status)}>
                        {schedule.status === 'taken' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {schedule.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 capitalize">{schedule.period}</p>
                  </div>
                </div>
                {schedule.status === 'upcoming' && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSnooze(schedule.id)}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Snooze
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#00C851] hover:bg-[#00A844]"
                      onClick={() => handleMarkAsTaken(schedule.id)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Taken
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {schedule.medicines.map((med, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Pill className="w-5 h-5 text-[#1E90FF]" />
                      <div>
                        <p className="font-medium text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-600">{med.dosage}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-[#1E90FF] text-[#1E90FF]">
                      {getTimingIcon(med.timing)}
                      <span className="ml-1">
                        {med.timing === 'after-meal' ? 'After meal' : 'Before meal'}
                      </span>
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Active Medications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Medications</CardTitle>
              <CardDescription>Your current medication list and progress</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Medicine
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Medication</DialogTitle>
                  <DialogDescription>
                    Manually add a medication to your reminder list
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Medicine Name</Label>
                    <Input placeholder="e.g., Metformin" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Dosage</Label>
                      <Input placeholder="e.g., 500mg" />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input placeholder="e.g., 30 days" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Timing</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="before-meal">Before Meal</SelectItem>
                        <SelectItem value="after-meal">After Meal</SelectItem>
                        <SelectItem value="empty-stomach">Empty Stomach</SelectItem>
                        <SelectItem value="anytime">Anytime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label>Frequency</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="morning" />
                        <Label htmlFor="morning" className="cursor-pointer">Morning</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="afternoon" />
                        <Label htmlFor="afternoon" className="cursor-pointer">Afternoon</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="night" />
                        <Label htmlFor="night" className="cursor-pointer">Night</Label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-[#1E90FF] hover:bg-[#1873CC]">
                    Add Medication
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {medications.map((med, index) => (
              <motion.div
                key={med.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#1E90FF]/10 p-2 rounded-lg">
                      <Pill className="w-5 h-5 text-[#1E90FF]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{med.name}</h4>
                      <p className="text-sm text-gray-600">{med.dosage}</p>
                    </div>
                  </div>
                  <Badge className={med.status === 'active' ? 'bg-[#00C851]' : 'bg-gray-500'}>
                    {med.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{med.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {med.frequency.map((freq, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {freq}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="text-xs">
                      {med.timing === 'after-meal' ? 'After meal' : 'Before meal'}
                    </Badge>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{med.progress}%</span>
                    </div>
                    <Progress value={med.progress} className="h-1.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
