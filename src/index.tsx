import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { env } from '@/config/env';
import reportWebVitals from './reportWebVitals';

// Log environment info in development
if (env.isDevelopment) {
  console.log('🚀 Global Payroll System');
  console.log('Environment:', env.ENV);
  console.log('API URL:', env.API_URL);
  console.log('Version:', env.VERSION);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();