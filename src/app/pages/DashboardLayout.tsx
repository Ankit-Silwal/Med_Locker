import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  BarChart3, 
  Brain, 
  MessageSquare, 
  Pill, 
  Settings, 
  Heart,
  Bell,
  LogOut,
  Menu,
  X,
  Users,
  Stethoscope,
  Building2,
  UserPlus,
  Activity
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'motion/react';
import { getUserRole, clearAuth } from '../utils/roleManager';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>('patient');

  useEffect(() => {
    // Get user role from localStorage
    const role = getUserRole();
    setUserRole(role);
  }, []);

  // Role-specific menu items
  const patientMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Health Records', path: '/dashboard/health-records' },
    { icon: Calendar, label: 'Appointments', path: '/dashboard/appointments' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Brain, label: 'AI Insights', path: '/dashboard/ai-insights' },
    { icon: MessageSquare, label: 'AI Chat Bot', path: '/dashboard/ai-chatbot' },
    { icon: Pill, label: 'Medicine Reminder', path: '/dashboard/medicine-reminder' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const doctorMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/doctor' },
    { icon: Users, label: 'My Patients', path: '/dashboard/patients' },
    { icon: Calendar, label: 'Appointments', path: '/dashboard/appointments' },
    { icon: FileText, label: 'Medical Records', path: '/dashboard/records' },
    { icon: Brain, label: 'AI Assistant', path: '/dashboard/ai-assistant' },
    { icon: Activity, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const hospitalAdminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/hospital-admin' },
    { icon: Building2, label: 'Hospital Profile', path: '/dashboard/hospital-profile' },
    { icon: UserPlus, label: 'Manage Doctors', path: '/dashboard/manage-doctors' },
    { icon: Users, label: 'Patient Records', path: '/dashboard/patient-records' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case 'doctor':
        return doctorMenuItems;
      case 'hospital-admin':
        return hospitalAdminMenuItems;
      default:
        return patientMenuItems;
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case 'doctor':
        return 'Doctor';
      case 'hospital-admin':
        return 'Hospital Admin';
      default:
        return 'Patient';
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'doctor':
        return 'from-[#00C851] to-[#1E90FF]';
      case 'hospital-admin':
        return 'from-[#FF6B6B] to-[#1E90FF]';
      default:
        return 'from-[#1E90FF] to-[#00C851]';
    }
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    logout();
    clearAuth();
    navigate('/');
  };

  const handleSettings = () => {
    navigate('/dashboard/settings');
  };

  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'ML';

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-[#1E90FF] fill-[#1E90FF]" />
                <span className="text-2xl font-bold text-gray-900">Med Locker</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B6B] rounded-full"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRoleColor()} flex items-center justify-center text-white font-semibold`}>
                      {initials}
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-semibold">{user?.name || 'User'}</div>
                      <div className="text-xs text-gray-500">{getRoleLabel()}</div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSettings}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[#FF6B6B]" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg overflow-y-auto z-40"
            >
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <motion.div
                        whileHover={{ x: 4 }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-[#1E90FF] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}