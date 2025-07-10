import React from 'react';
import { Box, CircularProgress, Typography, styled } from '@mui/material';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

const LoadingContainer = styled(Box)<{ fullScreen?: boolean; overlay?: boolean }>(
  ({ theme, fullScreen, overlay }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    ...(fullScreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      backgroundColor: overlay ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
    }),
    ...(overlay &&
      !fullScreen && {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 10,
      }),
  })
);

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  message = 'Loading...',
  fullScreen = false,
  overlay = false,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 60;
      default:
        return 40;
    }
  };

  return (
    <LoadingContainer fullScreen={fullScreen} overlay={overlay}>
      <CircularProgress size={getSize()} />
      {message && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </LoadingContainer>
  );
};

export default Loading;
