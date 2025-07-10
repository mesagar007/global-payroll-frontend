import React from 'react';
import { CircularProgress, Box } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  color?: 'primary' | 'secondary' | 'inherit';
  centered?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  color = 'primary',
  centered = false,
}) => {
  const spinner = <CircularProgress size={size} color={color} />;

  if (centered) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        {spinner}
      </Box>
    );
  }

  return spinner;
};
export default LoadingSpinner;