import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import HospitalAdminDashboard from './HospitalAdminDashboard';

export default function Notifications() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'patient';

  useEffect(() => {
    // Redirect if not hospital admin
    if (userRole !== 'hospital-admin') {
      navigate('/dashboard');
    }
  }, [userRole, navigate]);

  // Show hospital admin dashboard (which includes notifications)
  return <HospitalAdminDashboard />;
}
