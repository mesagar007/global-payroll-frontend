export const appConfig = {
  name: 'Global Payroll System',
  description: 'Comprehensive payroll management for global organizations',
  version: '1.0.0',
  author: 'Payroll Team',
  
  // UI Configuration
  ui: {
    sidebarWidth: 280,
    headerHeight: 64,
    footerHeight: 48,
    borderRadius: 8,
    cardElevation: 2,
  },
  
  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100],
  },
  
  // Date/Time
  dateTime: {
    defaultFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dateTimeFormat: 'DD/MM/YYYY HH:mm',
  },
  
  // Currency
  currency: {
    default: 'AED',
    precision: 2,
    supported: ['AED', 'SAR', 'OMR', 'USD', 'EUR'],
  },
  
  // Countries
  countries: {
    supported: ['AE', 'SA', 'OM'],
    default: 'AE',
  },
  
  // File Upload
  fileUpload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/csv'],
  },
};
