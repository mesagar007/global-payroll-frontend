import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ErrorOutline, ExpandMore, Refresh } from '@mui/icons-material';
import Button from '../Button/Button';

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box textAlign="center">
        <ErrorOutline
          sx={{
            fontSize: 80,
            color: 'error.main',
            mb: 2,
          }}
        />
        
        <Typography variant="h4" component="h1" gutterBottom>
          Something went wrong
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          We're sorry, but something unexpected happened. Please try refreshing the page.
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button onClick={resetError} variant="contained">
            Try Again
          </Button>
          <Button
            onClick={handleReload}
            variant="outlined"
            startIcon={<Refresh />}
          >
            Reload Page
          </Button>
        </Box>

        <Card sx={{ textAlign: 'left', maxWidth: 600, mx: 'auto' }}>
          <CardContent>
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="subtitle2">
                Error: {error.message}
              </Typography>
            </Alert>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle2">
                  Technical Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  component="pre"
                  sx={{
                    fontSize: '0.75rem',
                    backgroundColor: 'grey.100',
                    p: 2,
                    borderRadius: 1,
                    overflow: 'auto',
                    maxHeight: 200,
                  }}
                >
                  {error.stack}
                </Box>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ErrorFallback;