import { motion } from 'motion/react';
import {
  Network,
  Database,
  Share2,
  Shield,
  CheckCircle,
  Clock,
  Building2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface DataTransfer {
  from: string;
  to: string;
  recordsCount: number;
  status: 'completed' | 'pending' | 'syncing';
  timestamp: string;
}

const dataTransfers: DataTransfer[] = [
  {
    from: 'AIIMS Delhi',
    to: 'Apollo Chennai',
    recordsCount: 12,
    status: 'completed',
    timestamp: '2 mins ago'
  },
  {
    from: 'Fortis Gurgaon',
    to: 'Max Hospital Delhi',
    recordsCount: 8,
    status: 'syncing',
    timestamp: 'In progress'
  },
  {
    from: 'Tata Memorial Mumbai',
    to: 'CMC Vellore',
    recordsCount: 15,
    status: 'completed',
    timestamp: '15 mins ago'
  },
  {
    from: 'Narayana Health Bangalore',
    to: 'Manipal Hospitals',
    recordsCount: 5,
    status: 'pending',
    timestamp: 'Waiting for approval'
  }
];

export default function NetworkVisualization() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-[#00C851] text-white';
      case 'syncing': return 'bg-[#1E90FF] text-white';
      case 'pending': return 'bg-[#FF6B6B] text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'syncing': return Database;
      case 'pending': return Clock;
      default: return Shield;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900">
          <Network className="w-5 h-5 mr-2 text-[#1E90FF]" />
          Inter-Hospital Data Sharing
        </CardTitle>
        <CardDescription>
          Real-time patient record transfers across Med Locker network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Network Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gradient-to-r from-[#00C851]/10 to-[#00C851]/5 p-3 rounded-lg border border-[#00C851]/20">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#00C851]" />
                <div>
                  <p className="text-xs text-gray-600">Completed</p>
                  <p className="text-lg font-bold text-gray-900">
                    {dataTransfers.filter(t => t.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#1E90FF]/10 to-[#1E90FF]/5 p-3 rounded-lg border border-[#1E90FF]/20">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-[#1E90FF]" />
                <div>
                  <p className="text-xs text-gray-600">Active</p>
                  <p className="text-lg font-bold text-gray-900">
                    {dataTransfers.filter(t => t.status === 'syncing').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF6B6B]/5 p-3 rounded-lg border border-[#FF6B6B]/20">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#FF6B6B]" />
                <div>
                  <p className="text-xs text-gray-600">Pending</p>
                  <p className="text-lg font-bold text-gray-900">
                    {dataTransfers.filter(t => t.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transfer List */}
          {dataTransfers.map((transfer, index) => {
            const StatusIcon = getStatusIcon(transfer.status);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all border border-gray-200 hover:border-[#1E90FF]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Building2 className="w-5 h-5 text-[#1E90FF]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900 text-sm">{transfer.from}</span>
                        <Share2 className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-gray-900 text-sm">{transfer.to}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-600">
                        <span className="flex items-center">
                          <Database className="w-3 h-3 mr-1" />
                          {transfer.recordsCount} records
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>{transfer.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(transfer.status)}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                  </Badge>
                </div>

                {transfer.status === 'syncing' && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div
                        className="bg-gradient-to-r from-[#1E90FF] to-[#00C851] h-1.5 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                      ></motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Security Notice */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="w-4 h-4 text-[#1E90FF] mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-700">
                <p className="font-semibold text-gray-900 mb-1">Secure Transfer Protocol</p>
                <p>
                  All data transfers are encrypted end-to-end with 256-bit encryption and comply with HIPAA regulations.
                  Access is logged and monitored for security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
