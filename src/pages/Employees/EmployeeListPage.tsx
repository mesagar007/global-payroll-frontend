// src/pages/Employees/EmployeeListPage.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const EmployeeListPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Employee List
      </Typography>
      <Typography variant="body1">
        Employee list functionality will be implemented here.
      </Typography>
    </Box>
  );
};

export default EmployeeListPage;