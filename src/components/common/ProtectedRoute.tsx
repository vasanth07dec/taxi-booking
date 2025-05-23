import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import type { User } from '../../types';

interface ProtectedRouteProps {
  allowedRoles: User['role'][];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles, 
  children 
}) => {
  const { user } = useAppSelector((state) => state.auth);
  
  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    // User doesn't have required role
    // Redirect based on their role
    const roleRedirects: Record<User['role'], string> = {
      customer: '/customer',
      driver: '/dashboard',
      owner: '/fleet',
      admin: '/admin',
    };
    
    return <Navigate to={roleRedirects[user.role]} replace />;
  }
  
  // User has required role, render the children
  return <>{children}</>;
};

export default ProtectedRoute;