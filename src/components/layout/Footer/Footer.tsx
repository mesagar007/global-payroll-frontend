import React from 'react';
import {
  Box,
  Typography,
  Container,
  Link,
  Divider,
  Grid,
  styled,
} from '@mui/material';
import { Business, Email, Phone, LocationOn } from '@mui/icons-material';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: 'auto',
}));

const Footer: React.FC = () => {
  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Box py={3}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Business color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  Global Payroll System
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Comprehensive payroll management for global organizations.
                Built with modern technology for UAE, Saudi Arabia, and Oman markets.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Quick Links
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <Link href="#" variant="body2" color="text.secondary">
                      Dashboard
                    </Link>
                    <Link href="#" variant="body2" color="text.secondary">
                      Employees
                    </Link>
                    <Link href="#" variant="body2" color="text.secondary">
                      Payroll
                    </Link>
                    <Link href="#" variant="body2" color="text.secondary">
                      Reports
                    </Link>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Support
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <Link href="#" variant="body2" color="text.secondary">
                      Help Center
                    </Link>
                    <Link href="#" variant="body2" color="text.secondary">
                      API Documentation
                    </Link>
                    <Link href="#" variant="body2" color="text.secondary">
                      Contact Support
                    </Link>
                    <Link href="#" variant="body2" color="text.secondary">
                      System Status
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 2 }} />
          
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Typography variant="body2" color="text.secondary">
              © 2024 Global Payroll System. All rights reserved.
            </Typography>
            
            <Box display="flex" gap={2}>
              <Link href="#" variant="body2" color="text.secondary">
                Privacy Policy
              </Link>
              <Link href="#" variant="body2" color="text.secondary">
                Terms of Service
              </Link>
              <Link href="#" variant="body2" color="text.secondary">
                Security
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;