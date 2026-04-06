import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import HospitalAdminDashboard from './HospitalAdminDashboard';

export default function ManageDoctors() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'patient';

  useEffect(() => {
    // Redirect if not hospital admin
    if (userRole !== 'hospital-admin') {
      navigate('/dashboard');
    }
  }, [userRole, navigate]);

  // Show hospital admin dashboard (which includes doctor management)
  return <HospitalAdminDashboard />;
}
