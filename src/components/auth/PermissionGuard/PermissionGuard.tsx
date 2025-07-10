import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, Box } from '@mui/material';

interface PermissionGuardProps {
  children: React.ReactNode;
  permissions?: string[];
  roles?: string[];
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  permissions = [],
  roles = [],
  fallback,
  showFallback = true,
}) => {
  const { hasPermission, hasRole } = useAuth();

  // Check permissions
  if (permissions.length > 0) {
    const hasRequiredPermission = permissions.some(permission => hasPermission(permission));
    if (!hasRequiredPermission) {
      if (fallback) return <>{fallback}</>;
      if (showFallback) {
        return (
          <Alert severity="warning">
            You don't have permission to access this feature.
          </Alert>
        );
      }
      return null;
    }
  }

  // Check roles
  if (roles.length > 0) {
    const hasRequiredRole = roles.some(role => hasRole(role));
    if (!hasRequiredRole) {
      if (fallback) return <>{fallback}</>;
      if (showFallback) {
        return (
          <Alert severity="warning">
            You don't have the required role to access this feature.
          </Alert>
        );
      }
      return null;
    }
  }

  return <>{children}</>;
};

export default PermissionGuard;