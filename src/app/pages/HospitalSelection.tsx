import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  Building2,
  MapPin,
  ArrowRight,
  Shield,
  Database,
  Network,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface Hospital {
  id: string;
  name: string;
  shortName: string;
  location: string;
  city: string;
  state: string;
  established: string;
  type: string;
  departments: number;
  doctors: number;
  patients: number;
  rating: number;
  verified: boolean;
  networkStatus: 'active' | 'syncing' | 'offline';
}

const hospitals: Hospital[] = [
  {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences',
    shortName: 'AIIMS Delhi',
    location: 'Ansari Nagar, New Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    established: '1956',
    type: 'Government',
    departments: 42,
    doctors: 685,
    patients: 8500,
    rating: 4.9,
    verified: true,
    networkStatus: 'active'
  },
  {
    id: 'apollo-chennai',
    name: 'Apollo Hospitals',
    shortName: 'Apollo Chennai',
    location: 'Greams Road, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    established: '1983',
    type: 'Private',
    departments: 52,
    doctors: 450,
    patients: 6200,
    rating: 4.8,
    verified: true,
    networkStatus: 'active'
  },
  {
    id: 'fortis-gurgaon',
    name: 'Fortis Memorial Research Institute',
    shortName: 'Fortis Gurgaon',
    location: 'Sector 44, Gurgaon',
    city: 'Gurgaon',
    state: 'Haryana',
    established: '2007',
    type: 'Private',
    departments: 35,
    doctors: 380,
    patients: 4800,
    rating: 4.7,
    verified: true,
    networkStatus: 'active'
  },
  {
    id: 'medanta-gurgaon',
    name: 'Medanta - The Medicity',
    shortName: 'Medanta Gurgaon',
    location: 'Sector 38, Gurgaon',
    city: 'Gurgaon',
    state: 'Haryana',
    established: '2009',
    type: 'Private',
    departments: 45,
    doctors: 800,
    patients: 7200,
    rating: 4.8,
    verified: true,
    networkStatus: 'syncing'
  },
  {
    id: 'tata-mumbai',
    name: 'Tata Memorial Hospital',
    shortName: 'Tata Memorial Mumbai',
    location: 'Parel, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    established: '1941',
    type: 'Government',
    departments: 28,
    doctors: 520,
    patients: 5600,
    rating: 4.9,
    verified: true,
    networkStatus: 'active'
  },
  {
    id: 'cmc-vellore',
    name: 'Christian Medical College',
    shortName: 'CMC Vellore',
    location: 'Ida Scudder Road, Vellore',
    city: 'Vellore',
    state: 'Tamil Nadu',
    established: '1900',
    type: 'Private',
    departments: 38,
    doctors: 650,
    patients: 6800,
    rating: 4.9,
    verified: true,
    networkStatus: 'active'
  },
  {
    id: 'narayana-bangalore',
    name: 'Narayana Health City',
    shortName: 'Narayana Health Bangalore',
    location: 'Bommasandra, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    established: '2001',
    type: 'Private',
    departments: 31,
    doctors: 420,
    patients: 5200,
    rating: 4.7,
    verified: true,
    networkStatus: 'active'
  },
  {
    id: 'kokilaben-mumbai',
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    shortName: 'Kokilaben Hospital Mumbai',
    location: 'Andheri West, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    established: '2009',
    type: 'Private',
    departments: 36,
    doctors: 480,
    patients: 5800,
    rating: 4.8,
    verified: true,
    networkStatus: 'active'
  },
  {
    id: 'manipal-bangalore',
    name: 'Manipal Hospitals',
    shortName: 'Manipal Hospitals Bangalore',
    location: 'Old Airport Road, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    established: '1991',
    type: 'Private',
    departments: 33,
    doctors: 390,
    patients: 4600,
    rating: 4.7,
    verified: true,
    networkStatus: 'syncing'
  },
  {
    id: 'max-delhi',
    name: 'Max Super Speciality Hospital',
    shortName: 'Max Hospital Delhi',
    location: 'Saket, New Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    established: '2006',
    type: 'Private',
    departments: 40,
    doctors: 510,
    patients: 6100,
    rating: 4.8,
    verified: true,
    networkStatus: 'active'
  }
];

export default function HospitalSelection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hospital.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || hospital.type.toLowerCase() === selectedType;
    return matchesSearch && matchesType;
  });

  const handleHospitalSelect = (hospitalId: string) => {
    navigate(`/hospital-verify/${hospitalId}`);
  };

  const getNetworkStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#00C851] text-white';
      case 'syncing': return 'bg-[#FF6B6B] text-white';
      case 'offline': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getNetworkStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Data Synced';
      case 'syncing': return 'Syncing...';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-white to-[#1E90FF]/5">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-[#1E90FF] to-[#00C851] p-3 rounded-xl">
                <Network className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Med Locker Network</h1>
                <p className="text-gray-600 mt-1">Select your hospital to access the admin panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-[#00C851] text-white px-4 py-2">
                <Database className="w-4 h-4 mr-2" />
                {hospitals.filter(h => h.networkStatus === 'active').length} Hospitals Active
              </Badge>
              <Badge className="bg-[#1E90FF] text-white px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Secure Network
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Network Stats Banner */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-[#1E90FF] to-[#00C851] text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <Activity className="w-8 h-8 opacity-90" />
                  <div>
                    <p className="text-sm opacity-90">Total Network Hospitals</p>
                    <p className="text-2xl font-bold">{hospitals.length}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Database className="w-8 h-8 opacity-90" />
                  <div>
                    <p className="text-sm opacity-90">Shared Patient Records</p>
                    <p className="text-2xl font-bold">45,230</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8 opacity-90" />
                  <div>
                    <p className="text-sm opacity-90">Encrypted Transfers</p>
                    <p className="text-2xl font-bold">100%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Network className="w-8 h-8 opacity-90" />
                  <div>
                    <p className="text-sm opacity-90">Network Uptime</p>
                    <p className="text-2xl font-bold">99.9%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search hospitals by name, city, or state..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['all', 'government', 'private'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedType === type
                      ? 'bg-[#1E90FF] text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-[#1E90FF]'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Hospital Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital, index) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#1E90FF]">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-gradient-to-r from-[#1E90FF] to-[#00C851] p-3 rounded-lg">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getNetworkStatusColor(hospital.networkStatus)}>
                        {getNetworkStatusText(hospital.networkStatus)}
                      </Badge>
                      {hospital.verified && (
                        <Badge className="bg-[#00C851] text-white">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{hospital.shortName}</CardTitle>
                  <CardDescription className="text-sm">{hospital.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-[#1E90FF]" />
                      {hospital.location}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-500">Type</p>
                        <p className="font-semibold text-gray-900">{hospital.type}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-500">Est.</p>
                        <p className="font-semibold text-gray-900">{hospital.established}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-500">Doctors</p>
                        <p className="font-semibold text-gray-900">{hospital.doctors}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-500">Rating</p>
                        <p className="font-semibold text-[#00C851]">⭐ {hospital.rating}</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button
                        className="w-full bg-[#1E90FF] hover:bg-[#1873CC] text-white"
                        onClick={() => handleHospitalSelect(hospital.id)}
                      >
                        Access Panel
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hospitals found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
