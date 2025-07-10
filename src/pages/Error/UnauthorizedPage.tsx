import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  Container,
} from '@mui/material';
import {
  Lock,
  ArrowBack,
  Home,
  ContactSupport,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getUserDisplayName = (user: any) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.name || user?.email || 'User';
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Card sx={{ maxWidth: 600, width: '100%' }}>
          <CardContent sx={{ p: 4 }}>
            <Box mb={3}>
              <Lock
                sx={{
                  fontSize: 80,
                  color: 'error.main',
                  mb: 2,
                }}
              />
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Access Denied
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                You don't have permission to access this page
              </Typography>
            </Box>

            <Alert severity="warning" sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="subtitle2" gutterBottom>
                Current User: {getUserDisplayName(user)}
              </Typography>
              <Typography variant="body2">
                Organization: {user?.organization?.name || 'ABC Company LLC'}
              </Typography>
            </Alert>

            <Typography variant="body1" color="text.secondary" paragraph>
              The page you're trying to access requires specific permissions that your account doesn't have. 
              Please contact your system administrator if you believe this is an error.
            </Typography>

            <Box display="flex" gap={2} justifyContent="center" mt={3}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
              <Button
                variant="contained"
                startIcon={<Home />}
                onClick={() => navigate('/')}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outlined"
                startIcon={<ContactSupport />}
                onClick={() => navigate('/support')}
              >
                Contact Support
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;