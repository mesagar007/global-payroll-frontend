import React from 'react';
import { Chip, ChipProps, styled } from '@mui/material';

interface StatusChipProps extends Omit<ChipProps, 'color'> {
  status: 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'processing' | 'completed' | 'draft';
  showDot?: boolean;
}

const StyledChip = styled(Chip)<{ status: string }>(({ theme, status }) => {
  const getStatusColors = () => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'completed':
        return {
          backgroundColor: '#e8f5e8',
          color: '#2e7d32',
          borderColor: '#4caf50',
        };
      case 'inactive':
      case 'rejected':
        return {
          backgroundColor: '#ffebee',
          color: '#d32f2f',
          borderColor: '#f44336',
        };
      case 'pending':
      case 'processing':
        return {
          backgroundColor: '#fff3e0',
          color: '#ed6c02',
          borderColor: '#ff9800',
        };
      case 'draft':
        return {
          backgroundColor: '#e3f2fd',
          color: '#0288d1',
          borderColor: '#03a9f4',
        };
      default:
        return {
          backgroundColor: theme.palette.grey[100],
          color: theme.palette.grey[700],
          borderColor: theme.palette.grey[300],
        };
    }
  };

  return {
    ...getStatusColors(),
    fontWeight: 500,
    fontSize: '0.75rem',
    height: 24,
    '& .MuiChip-label': {
      padding: '0 8px',
    },
  };
});

const StatusDot = styled('span')<{ status: string }>(({ status }) => {
  const getDotColor = () => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'completed':
        return '#4caf50';
      case 'inactive':
      case 'rejected':
        return '#f44336';
      case 'pending':
      case 'processing':
        return '#ff9800';
      case 'draft':
        return '#03a9f4';
      default:
        return '#9e9e9e';
    }
  };

  return {
    display: 'inline-block',
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: getDotColor(),
    marginRight: 6,
  };
});

const StatusChip: React.FC<StatusChipProps> = ({
  status,
  showDot = false,
  label,
  ...props
}) => {
  const statusLabel = label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <StyledChip
      {...props}
      status={status}
      label={
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {showDot && <StatusDot status={status} />}
          {statusLabel}
        </span>
      }
      size="small"
    />
  );
};

export default StatusChip;