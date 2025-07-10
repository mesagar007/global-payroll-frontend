// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  employees: {
    list: '/employees',
    create: '/employees',
    update: (id: string) => `/employees/${id}`,
    delete: (id: string) => `/employees/${id}`,
    details: (id: string) => `/employees/${id}`,
  },
  payroll: {
    cycles: '/payroll/cycles',
    process: '/payroll/process',
    results: '/payroll/results',
  },
  components: {
    list: '/components',
    create: '/components',
    update: (id: string) => `/components/${id}`,
    test: '/components/test',
  },
  reports: {
    generate: '/reports/generate',
    list: '/reports',
    download: (id: string) => `/reports/${id}/download`,
  },
};