export const env = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  ENV: process.env.REACT_APP_ENV || 'development',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  APP_NAME: process.env.REACT_APP_NAME || 'Global Payroll System',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};