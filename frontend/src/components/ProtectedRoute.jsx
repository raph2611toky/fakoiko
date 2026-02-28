import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/components/protected-route.css';

export function ProtectedRoute({ children, requiredRoles = null }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="protected-route-loading">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
