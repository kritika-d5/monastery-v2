import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasRole } from '@/utils/auth';

/**
 * A guard component that protects routes requiring admin privileges.
 * It checks the user's authentication status and role.
 */
const AdminRouteGuard = () => {
  // Get user details and loading state from your AuthContext.
  const { user, loading } = useAuth();

  // 1. If authentication state is still loading, show a simple loading message.
  //    This prevents a redirect flash before the user status is confirmed.
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Authenticating...</p>
      </div>
    );
  }

  // 2. Check if the user is authenticated and has the 'admin' role.
  const isAuthorized = user && hasRole(user, 'admin');

  // 3. If authorized, render the nested child route (e.g., the Admin Dashboard).
  //    The <Outlet /> component from react-router-dom acts as a placeholder.
  if (isAuthorized) {
    return <Outlet />;
  }

  // 4. If not authorized, redirect the user to the home page.
  //    The `replace` prop ensures the user can't use the back button to return
  //    to the protected admin page.
  return <Navigate to="/" replace />;
};

export default AdminRouteGuard;
