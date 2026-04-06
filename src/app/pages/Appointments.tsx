import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
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
import { Input } from '../components/ui/input';
import { Calendar } from '../components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { apiGet, apiPatch, apiPost } from '../utils/api';

interface AppointmentItem {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  location: string;
  avatar: string;
  status: string;
}

interface AppointmentData {
  upcomingAppointments: AppointmentItem[];
  pastAppointments: AppointmentItem[];
  availableDoctors: Array<{ name: string; specialty: string; avatar: string }>;
  timeSlots: string[];
}

export default function Appointments() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [visitReason, setVisitReason] = useState('');
  const [data, setData] = useState<AppointmentData>({
    upcomingAppointments: [],
    pastAppointments: [],
    availableDoctors: [],
    timeSlots: [],
  });

  const loadAppointments = () => {
    apiGet<AppointmentData>('/appointments')
      .then(setData)
      .catch(() => {
        toast.error('Unable to load appointments');
      });
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleBookAppointment = () => {
    if (!selectedDoctor || !appointmentType || !date || !selectedTime || !visitReason) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    apiPost('/appointments', {
      doctor: selectedDoctor,
      type: appointmentType,
      date: date.toISOString().slice(0, 10),
      time: selectedTime,
      reason: visitReason,
    })
      .then(() => {
        toast.success('Appointment booked successfully!');
        setSelectedDoctor('');
        setAppointmentType('');
        setSelectedTime('');
        setVisitReason('');
        setBookDialogOpen(false);
        loadAppointments();
      })
      .catch((error) => toast.error(error.message || 'Unable to book appointment'));
  };

  const handleReschedule = (appointmentId: number) => {
    apiPatch(`/appointments/${appointmentId}/reschedule`)
      .then(() => toast.info('Rescheduling request submitted'))
      .catch(() => toast.error('Unable to reschedule now'));
  };

  const handleCancel = (appointmentId: number) => {
    apiPatch(`/appointments/${appointmentId}/cancel`)
      .then(() => {
        toast.success('Appointment cancelled successfully');
        loadAppointments();
      })
      .catch(() => toast.error('Unable to cancel appointment'));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-[#00C851] text-white';
      case 'pending':
        return 'bg-[#FF6B6B] text-white';
      case 'completed':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={appointment.avatar} />
                <AvatarFallback>{appointment.doctor.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                <p className="text-sm text-gray-600">{appointment.specialty}</p>
              </div>
            </div>
            <Badge className={`${getStatusColor(appointment.status)} flex items-center gap-1`}>
              {getStatusIcon(appointment.status)}
              {appointment.status}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <CalendarIcon className="w-4 h-4 mr-2 text-[#1E90FF]" />
              {appointment.date}
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-[#1E90FF]" />
              {appointment.time}
            </div>
            <div className="flex items-center text-gray-600">
              {appointment.type === 'Video' ? (
                <Video className="w-4 h-4 mr-2 text-[#00C851]" />
              ) : (
                <MapPin className="w-4 h-4 mr-2 text-[#FF6B6B]" />
              )}
              {appointment.location}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleReschedule(appointment.id)}>
              Reschedule
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-[#FF6B6B] border-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white" onClick={() => handleCancel(appointment.id)}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
          <p className="text-gray-600">Manage your doctor consultations</p>
        </div>
        <Dialog open={bookDialogOpen} onOpenChange={setBookDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1E90FF] hover:bg-[#1873CC]">
              <Plus className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
              <DialogDescription>
                Schedule a consultation with your preferred doctor
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Select Doctor</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.availableDoctors.map((doctor, index) => (
                      <SelectItem key={index} value={doctor.name}>
                        <div className="flex items-center space-x-2">
                          <span>{doctor.name}</span>
                          <span className="text-xs text-gray-500">- {doctor.specialty}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Appointment Type</Label>
                <Select value={appointmentType} onValueChange={setAppointmentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-Person Visit</SelectItem>
                    <SelectItem value="video">Video Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>

              <div className="space-y-2">
                <Label>Available Time Slots</Label>
                <div className="grid grid-cols-3 gap-2">
                  {data.timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className={selectedTime === time ? 'bg-[#1E90FF]' : ''}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Reason for Visit</Label>
                <Textarea placeholder="Describe your symptoms or reason for consultation..." rows={4} value={visitReason} onChange={(e) => setVisitReason(e.target.value)} />
              </div>

              <div className="bg-gradient-to-r from-[#1E90FF]/10 to-[#00C851]/10 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">AI Suggestion</h4>
                <p className="text-sm text-gray-700">
                  Based on your recent health records, we recommend scheduling a follow-up with Dr. Ramesh Sharma for your cardiac health checkup.
                </p>
              </div>

              <Button className="w-full bg-[#1E90FF] hover:bg-[#1873CC]" onClick={handleBookAppointment}>
                Confirm Booking
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Appointments Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.pastAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}