import { useAuth } from '@/contexts/AuthContext';

export const usePermissions = () => {
  const { hasPermission, hasRole, user } = useAuth();

  const permissions = {
    // Employee permissions
    canViewEmployees: () => hasPermission('EMPLOYEE_READ'),
    canCreateEmployees: () => hasPermission('EMPLOYEE_CREATE'),
    canEditEmployees: () => hasPermission('EMPLOYEE_UPDATE'),
    canDeleteEmployees: () => hasPermission('EMPLOYEE_DELETE'),
    canManageEmployees: () => hasPermission('EMPLOYEE_MANAGE'),

    // Payroll permissions
    canViewPayroll: () => hasPermission('PAYROLL_READ'),
    canProcessPayroll: () => hasPermission('PAYROLL_PROCESS'),
    canApprovePayroll: () => hasPermission('PAYROLL_APPROVE'),
    canManagePayroll: () => hasPermission('PAYROLL_MANAGE'),

    // Component permissions
    canViewComponents: () => hasPermission('COMPONENT_READ'),
    canCreateComponents: () => hasPermission('COMPONENT_CREATE'),
    canEditComponents: () => hasPermission('COMPONENT_UPDATE'),
    canManageComponents: () => hasPermission('COMPONENT_MANAGE'),

    // Report permissions
    canViewReports: () => hasPermission('REPORT_READ'),
    canGenerateReports: () => hasPermission('REPORT_GENERATE'),
    canExportReports: () => hasPermission('REPORT_EXPORT'),

    // Admin permissions
    canManageSettings: () => hasPermission('SETTINGS_MANAGE'),
    canManageUsers: () => hasPermission('USER_MANAGE'),
    canManageOrganization: () => hasPermission('ORGANIZATION_MANAGE'),

    // Role checks
    isAdmin: () => hasRole('ADMIN'),
    isManager: () => hasRole('MANAGER'),
    isHR: () => hasRole('HR'),
    isPayrollManager: () => hasRole('PAYROLL_MANAGER'),
    isEmployee: () => hasRole('EMPLOYEE'),
  };

  return {
    ...permissions,
    hasPermission,
    hasRole,
    user,
  };
};