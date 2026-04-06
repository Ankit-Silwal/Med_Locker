import { motion } from 'motion/react';
import { QrCode, Shield, Copy, Download, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface EmergencyQRCodeProps {
  patientId?: string;
  hospitalName?: string;
}

export default function EmergencyQRCode({ patientId, hospitalName }: EmergencyQRCodeProps) {
  const emergencyCode = patientId || 'MED-LOCKER-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  const qrCodeData = `https://medlocker.health/emergency/${emergencyCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(emergencyCode);
    toast.success('Emergency code copied to clipboard!');
  };

  const handleDownloadQR = () => {
    toast.success('QR Code downloaded successfully!');
  };

  return (
    <div className="space-y-6">
      {/* QR Code Display */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow-lg border-2 border-[#1E90FF]"
      >
        <div className="flex flex-col items-center">
          <Badge className="bg-[#FF6B6B] text-white mb-4">
            <Shield className="w-3 h-3 mr-1" />
            Emergency Access Only
          </Badge>

          {/* Mock QR Code */}
          <div className="bg-white p-4 rounded-lg border-4 border-gray-900 mb-4">
            <div className="grid grid-cols-8 gap-1">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Emergency Access Code</p>
            <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <p className="font-mono font-bold text-lg text-gray-900">{emergencyCode}</p>
            </div>
          </div>

          {hospitalName && (
            <div className="text-xs text-gray-500">
              Issued by: {hospitalName}
            </div>
          )}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleCopyCode}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Code
        </Button>
        <Button
          className="w-full bg-[#1E90FF] hover:bg-[#1873CC]"
          onClick={handleDownloadQR}
        >
          <Download className="w-4 h-4 mr-2" />
          Download QR
        </Button>
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center">
          <CheckCircle className="w-4 h-4 mr-2 text-[#1E90FF]" />
          How to Use Emergency Access
        </h4>
        <ul className="space-y-1 text-xs text-gray-700">
          <li className="flex items-start">
            <span className="text-[#1E90FF] mr-2">1.</span>
            <span>Present QR code or provide emergency code to medical staff</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#1E90FF] mr-2">2.</span>
            <span>Staff scans QR code or enters code in Med Locker system</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#1E90FF] mr-2">3.</span>
            <span>Critical medical records are instantly accessible</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#1E90FF] mr-2">4.</span>
            <span>All emergency access attempts are logged for security</span>
          </li>
        </ul>
      </div>

      {/* Security Notice */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Shield className="w-4 h-4 text-[#FF6B6B] mt-0.5 flex-shrink-0" />
          <div className="text-xs text-gray-700">
            <p className="font-semibold text-gray-900 mb-1">Security Notice</p>
            <p>
              This emergency access code should only be shared with authorized medical personnel
              during emergencies. Unauthorized use is prohibited and monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
