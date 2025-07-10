export const routes = {
  // Public routes
  login: '/login',
  forgotPassword: '/forgot-password',
  
  // Protected routes
  dashboard: '/dashboard',
  
  // Employee routes
  employees: '/employees',
  employeeDetails: '/employees/:id',
  addEmployee: '/employees/add',
  editEmployee: '/employees/:id/edit',
  
  // Payroll routes
  payroll: '/payroll',
  payrollCycles: '/payroll/cycles',
  payrollProcessing: '/payroll/processing',
  payrollResults: '/payroll/results',
  
  // Component routes
  components: '/components',
  componentDetails: '/components/:id',
  formulaTesting: '/components/formula-testing',
  
  // Report routes
  reports: '/reports',
  reportDetails: '/reports/:id',
  
  // Settings routes
  settings: '/settings',
  profile: '/settings/profile',
  organization: '/settings/organization',
  
  // Error routes
  notFound: '/404',
  unauthorized: '/401',
  serverError: '/500',
} as const;