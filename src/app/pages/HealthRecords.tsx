import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Calendar,
  User,
  Plus,
  ChevronDown,
  ChevronUp,
  Brain
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export default function HealthRecords() {
  const [expandedRecord, setExpandedRecord] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [recordTitle, setRecordTitle] = useState('');
  const [recordType, setRecordType] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const records = [
    {
      id: 1,
      date: '2026-02-20',
      type: 'Lab Report',
      title: 'Blood Test Results',
      doctor: 'Dr. Ramesh Sharma',
      hospital: 'Apollo Hospital, Mumbai',
      status: 'normal',
      aiInsight: 'All blood parameters are within normal range. Vitamin D levels are slightly low - consider supplementation.',
      details: 'Complete Blood Count, Lipid Profile, Liver Function Test'
    },
    {
      id: 2,
      date: '2026-02-15',
      type: 'Prescription',
      title: 'Diabetes Medication',
      doctor: 'Dr. Priya Gupta',
      hospital: 'Fortis Hospital, Delhi',
      status: 'active',
      aiInsight: 'Medication dosage is appropriate. Continue current treatment plan and monitor blood sugar levels.',
      details: 'Metformin 500mg - 2x daily, Vitamin D3 - 1x daily'
    },
    {
      id: 3,
      date: '2026-02-10',
      type: 'Scan',
      title: 'Chest X-Ray',
      doctor: 'Dr. Ankit Verma',
      hospital: 'Max Hospital, Bangalore',
      status: 'normal',
      aiInsight: 'No abnormalities detected. Lungs are clear and heart size is normal.',
      details: 'Posteroanterior and lateral views'
    },
    {
      id: 4,
      date: '2026-02-05',
      type: 'Consultation',
      title: 'Annual Health Checkup',
      doctor: 'Dr. Kavita Desai',
      hospital: 'AIIMS, New Delhi',
      status: 'completed',
      aiInsight: 'Overall health is good. Recommended to increase physical activity and maintain healthy diet.',
      details: 'General examination, vital signs assessment'
    },
    {
      id: 5,
      date: '2026-01-28',
      type: 'Lab Report',
      title: 'Thyroid Function Test',
      doctor: 'Dr. Suresh Reddy',
      hospital: 'Apollo Hospital, Hyderabad',
      status: 'normal',
      aiInsight: 'Thyroid hormone levels are optimal. Continue regular monitoring every 6 months.',
      details: 'TSH, T3, T4 levels'
    }
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || record.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleUpload = () => {
    if (!recordTitle || !recordType || !doctorName) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Record uploaded successfully!');
    // Reset form
    setRecordTitle('');
    setRecordType('');
    setDoctorName('');
    setSelectedFile(null);
    setUploadDialogOpen(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      toast.success(`File "${file.name}" selected`);
    }
  };

  const handleDownload = (recordTitle: string) => {
    toast.success(`Downloading ${recordTitle}...`);
    // In a real app, this would trigger an actual download
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-[#00C851] text-white';
      case 'active':
        return 'bg-[#1E90FF] text-white';
      case 'attention':
        return 'bg-[#FF6B6B] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Lab Report':
        return 'border-[#1E90FF] text-[#1E90FF]';
      case 'Prescription':
        return 'border-[#00C851] text-[#00C851]';
      case 'Scan':
        return 'border-[#FF6B6B] text-[#FF6B6B]';
      default:
        return 'border-gray-400 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Records</h1>
        <p className="text-gray-600">Manage and view all your medical records</p>
      </motion.div>

      {/* Actions Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search records, doctors..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Lab Report">Lab Reports</SelectItem>
                <SelectItem value="Prescription">Prescriptions</SelectItem>
                <SelectItem value="Scan">Scans</SelectItem>
                <SelectItem value="Consultation">Consultations</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#1E90FF] hover:bg-[#1873CC]">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Record
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload New Record</DialogTitle>
                  <DialogDescription>
                    Add a new medical record to your health profile
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="recordTitle">Record Title</Label>
                    <Input id="recordTitle" placeholder="e.g., Blood Test Results" value={recordTitle} onChange={(e) => setRecordTitle(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recordType">Type</Label>
                    <Select value={recordType} onValueChange={setRecordType}>
                      <SelectTrigger id="recordType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lab">Lab Report</SelectItem>
                        <SelectItem value="prescription">Prescription</SelectItem>
                        <SelectItem value="scan">Scan</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor Name</Label>
                    <Input id="doctor" placeholder="e.g., Dr. Ramesh Sharma" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file">Upload File</Label>
                    <label htmlFor="file" className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1E90FF] transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 10MB</p>
                      <input type="file" id="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileSelect} />
                    </label>
                  </div>
                  <Button className="w-full bg-[#1E90FF] hover:bg-[#1873CC]" onClick={handleUpload}>
                    Upload Record
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#1E90FF]/10 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-[#1E90FF]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{record.title}</h3>
                          <Badge variant="outline" className={getTypeColor(record.type)}>
                            {record.type}
                          </Badge>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {record.doctor}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {record.date}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{record.hospital}</p>
                      </div>
                    </div>

                    {expandedRecord === record.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t"
                      >
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Details</h4>
                            <p className="text-sm text-gray-600">{record.details}</p>
                          </div>
                          <div className="bg-gradient-to-r from-[#1E90FF]/10 to-[#00C851]/10 p-4 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Brain className="w-5 h-5 text-[#1E90FF] mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">AI Insight</h4>
                                <p className="text-sm text-gray-700">{record.aiInsight}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
                    >
                      {expandedRecord === record.id ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          Less
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(record.title)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No records found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}