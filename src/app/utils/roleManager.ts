/**
 * Role Management Utility
 * Centralizes user role logic for the Med Locker application
 */

export type UserRole = 'patient' | 'doctor' | 'hospital-admin';

export const ROLE_KEYS = {
  PATIENT: 'patient' as UserRole,
  DOCTOR: 'doctor' as UserRole,
  HOSPITAL_ADMIN: 'hospital-admin' as UserRole,
};

export const DASHBOARD_ROUTES = {
  patient: '/dashboard',
  doctor: '/dashboard/doctor',
  'hospital-admin': '/dashboard/hospital-admin',
};

/**
 * Get the current user role from localStorage
 */
export const getUserRole = (): UserRole => {
  return (localStorage.getItem('userRole') as UserRole) || ROLE_KEYS.PATIENT;
};

/**
 * Set user role in localStorage
 */
export const setUserRole = (role: UserRole): void => {
  localStorage.setItem('userRole', role);
};

/**
 * Get the dashboard route for a specific role
 */
export const getDashboardRoute = (role?: UserRole): string => {
  const userRole = role || getUserRole();
  return DASHBOARD_ROUTES[userRole] || DASHBOARD_ROUTES.patient;
};

/**
 * Check if user has a specific role
 */
export const hasRole = (role: UserRole): boolean => {
  return getUserRole() === role;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

/**
 * Clear all authentication data
 */
export const clearAuth = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  sessionStorage.clear();
};
