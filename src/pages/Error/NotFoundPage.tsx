import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  styled,
} from '@mui/material';
import { Home, ArrowBack, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/config/routes.config';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const ErrorIllustration = styled(Box)(({ theme }) => ({
  fontSize: '8rem',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  background: theme.custom.gradients.primary,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
}));

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate(routes.dashboard);
  };

  return (
    <StyledContainer maxWidth="md">
      <Paper
        elevation={0}
        sx={{
          textAlign: 'center',
          p: 6,
          backgroundColor: 'transparent',
        }}
      >
        <ErrorIllustration>404</ErrorIllustration>
        
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Sorry, we couldn't find the page you're looking for. 
          The page might have been moved, deleted, or you might have entered the wrong URL.
        </Typography>

        <Box display="flex" gap={2} justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleGoBack}
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={handleGoHome}
          >
            Go to Dashboard
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          Need help? Contact our support team or check the documentation.
        </Typography>
      </Paper>
    </StyledContainer>
  );
};

export default NotFoundPage;