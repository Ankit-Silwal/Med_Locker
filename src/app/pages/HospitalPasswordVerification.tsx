import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router';
import {
  Building2,
  Lock,
  Shield,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

interface HospitalData {
  id: string;
  name: string;
  shortName: string;
  location: string;
  verified: boolean;
}

const hospitalData: Record<string, HospitalData> = {
  'aiims-delhi': {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences',
    shortName: 'AIIMS Delhi',
    location: 'Ansari Nagar, New Delhi',
    verified: true
  },
  'apollo-chennai': {
    id: 'apollo-chennai',
    name: 'Apollo Hospitals',
    shortName: 'Apollo Chennai',
    location: 'Greams Road, Chennai',
    verified: true
  },
  'fortis-gurgaon': {
    id: 'fortis-gurgaon',
    name: 'Fortis Memorial Research Institute',
    shortName: 'Fortis Gurgaon',
    location: 'Sector 44, Gurgaon',
    verified: true
  },
  'medanta-gurgaon': {
    id: 'medanta-gurgaon',
    name: 'Medanta - The Medicity',
    shortName: 'Medanta Gurgaon',
    location: 'Sector 38, Gurgaon',
    verified: true
  },
  'tata-mumbai': {
    id: 'tata-mumbai',
    name: 'Tata Memorial Hospital',
    shortName: 'Tata Memorial Mumbai',
    location: 'Parel, Mumbai',
    verified: true
  },
  'cmc-vellore': {
    id: 'cmc-vellore',
    name: 'Christian Medical College',
    shortName: 'CMC Vellore',
    location: 'Ida Scudder Road, Vellore',
    verified: true
  },
  'narayana-bangalore': {
    id: 'narayana-bangalore',
    name: 'Narayana Health City',
    shortName: 'Narayana Health Bangalore',
    location: 'Bommasandra, Bangalore',
    verified: true
  },
  'kokilaben-mumbai': {
    id: 'kokilaben-mumbai',
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    shortName: 'Kokilaben Hospital Mumbai',
    location: 'Andheri West, Mumbai',
    verified: true
  },
  'manipal-bangalore': {
    id: 'manipal-bangalore',
    name: 'Manipal Hospitals',
    shortName: 'Manipal Hospitals Bangalore',
    location: 'Old Airport Road, Bangalore',
    verified: true
  },
  'max-delhi': {
    id: 'max-delhi',
    name: 'Max Super Speciality Hospital',
    shortName: 'Max Hospital Delhi',
    location: 'Saket, New Delhi',
    verified: true
  }
};

export default function HospitalPasswordVerification() {
  const navigate = useNavigate();
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hospital, setHospital] = useState<HospitalData | null>(null);

  useEffect(() => {
    if (hospitalId && hospitalData[hospitalId]) {
      setHospital(hospitalData[hospitalId]);
    } else {
      toast.error('Invalid hospital selection');
      navigate('/hospital-selection');
    }
  }, [hospitalId, navigate]);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    setIsVerifying(true);

    // Simulate password verification
    setTimeout(() => {
      // For demo purposes, accept any password with at least 6 characters
      if (password.length >= 6) {
        toast.success('Access granted! Redirecting to dashboard...');
        localStorage.setItem('selectedHospital', JSON.stringify(hospital));
        setTimeout(() => {
          navigate('/dashboard/hospital-admin');
        }, 1500);
      } else {
        toast.error('Invalid password. Please try again.');
        setIsVerifying(false);
        setPassword('');
      }
    }, 1500);
  };

  const securityFeatures = [
    { icon: Shield, text: '256-bit Encryption', color: 'text-[#00C851]' },
    { icon: Lock, text: 'Two-Factor Authentication', color: 'text-[#1E90FF]' },
    { icon: CheckCircle, text: 'HIPAA Compliant', color: 'text-[#00C851]' },
    { icon: AlertCircle, text: 'Audit Trail Enabled', color: 'text-[#FF6B6B]' }
  ];

  if (!hospital) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-white to-[#1E90FF]/5 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="outline"
            className="mb-6"
            onClick={() => navigate('/hospital-selection')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hospital Selection
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Hospital Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-[#1E90FF] to-[#00C851] text-white">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                    <Building2 className="w-10 h-10" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white mb-1">
                      {hospital.shortName}
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      {hospital.name}
                    </CardDescription>
                  </div>
                </div>
                {hospital.verified && (
                  <Badge className="bg-white/20 text-white backdrop-blur-sm w-fit">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified Hospital
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-white/80 mb-1">Location</p>
                  <p className="text-white font-semibold">{hospital.location}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-white/80 mb-2">Access Level</p>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-5 h-5" />
                    <span className="font-semibold">Hospital Administrator</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Shield className="w-5 h-5 mr-2 text-[#1E90FF]" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {securityFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
                      >
                        <Icon className={`w-4 h-4 ${feature.color}`} />
                        <span className="text-xs font-medium text-gray-700">{feature.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Password Verification */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-xl border-2 border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-[#1E90FF] to-[#00C851] p-4 rounded-full">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center text-gray-900">
                  Secure Access Verification
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your administrator password to access the hospital dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerification} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">Administrator Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                        disabled={isVerifying}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        disabled={isVerifying}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      For demo: Use any password with at least 6 characters
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1E90FF] to-[#00C851] hover:opacity-90 text-white"
                    disabled={isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Verify & Access Dashboard
                      </>
                    )}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Need help?</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="text-sm"
                      disabled={isVerifying}
                    >
                      Forgot Password?
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="text-sm"
                      disabled={isVerifying}
                    >
                      Contact Support
                    </Button>
                  </div>
                </form>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-[#1E90FF] mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold text-gray-900 mb-1">Security Notice</p>
                      <p className="text-xs">
                        All access attempts are logged and monitored. Unauthorized access is strictly prohibited
                        and may result in legal action.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
