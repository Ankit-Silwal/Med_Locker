import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import DoctorDashboard from './DoctorDashboard';

export default function Patients() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'patient';

  useEffect(() => {
    // Redirect if not doctor
    if (userRole !== 'doctor') {
      navigate('/dashboard');
    }
  }, [userRole, navigate]);

  // Show doctor dashboard (which includes patient list)
  return <DoctorDashboard />;
}
