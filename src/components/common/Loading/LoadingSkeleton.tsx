import React from 'react';
import { Skeleton, Box, Card, CardContent } from '@mui/material';

interface LoadingSkeletonProps {
  type?: 'text' | 'card' | 'table' | 'avatar' | 'rectangle';
  lines?: number;
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | false;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'text',
  lines = 3,
  width = '100%',
  height = 40,
  animation = 'wave',
}) => {
  if (type === 'card') {
    return (
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Skeleton
              animation={animation}
              variant="circular"
              width={40}
              height={40}
              sx={{ mr: 2 }}
            />
            <Box flex={1}>
              <Skeleton animation={animation} width="60%" height={20} />
              <Skeleton animation={animation} width="40%" height={16} />
            </Box>
          </Box>
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              animation={animation}
              width={index === lines - 1 ? '70%' : '100%'}
              height={16}
              sx={{ mb: 1 }}
            />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (type === 'table') {
    return (
      <Box>
        {Array.from({ length: lines }).map((_, index) => (
          <Box key={index} display="flex" gap={2} mb={1}>
            <Skeleton animation={animation} width="20%" height={height} />
            <Skeleton animation={animation} width="30%" height={height} />
            <Skeleton animation={animation} width="25%" height={height} />
            <Skeleton animation={animation} width="25%" height={height} />
          </Box>
        ))}
      </Box>
    );
  }

  if (type === 'avatar') {
    return (
      <Skeleton
        animation={animation}
        variant="circular"
        width={width}
        height={height}
      />
    );
  }

  if (type === 'rectangle') {
    return (
      <Skeleton
        animation={animation}
        variant="rectangular"
        width={width}
        height={height}
      />
    );
  }

  return (
    <Box>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          animation={animation}
          width={index === lines - 1 ? '70%' : width}
          height={height}
          sx={{ mb: 1 }}
        />
      ))}
    </Box>
  );
};

export default LoadingSkeleton;