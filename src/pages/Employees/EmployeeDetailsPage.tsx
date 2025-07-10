// src/pages/Employees/EmployeeDetailsPage.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const EmployeeDetailsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Employee Details
      </Typography>
      <Typography variant="body1">
        Employee details functionality will be implemented here.
      </Typography>
    </Box>
  );
};

export default EmployeeDetailsPage;