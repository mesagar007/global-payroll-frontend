import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  styled,
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  CheckCircle,
  Delete,
} from '@mui/icons-material';
import Button from '../Button/Button';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  type?: 'warning' | 'error' | 'info' | 'success' | 'danger';
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    padding: theme.spacing(1),
    minWidth: 400,
  },
}));

const IconContainer = styled(Box)<{ type: string }>(({ theme, type }) => {
  const getTypeColors = () => {
    switch (type) {
      case 'warning':
        return {
          backgroundColor: theme.palette.warning.light + '20',
          color: theme.palette.warning.main,
        };
      case 'error':
      case 'danger':
        return {
          backgroundColor: theme.palette.error.light + '20',
          color: theme.palette.error.main,
        };
      case 'info':
        return {
          backgroundColor: theme.palette.info.light + '20',
          color: theme.palette.info.main,
        };
      case 'success':
        return {
          backgroundColor: theme.palette.success.light + '20',
          color: theme.palette.success.main,
        };
      default:
        return {
          backgroundColor: theme.palette.grey[100],
          color: theme.palette.grey[600],
        };
    }
  };

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: '50%',
    margin: '0 auto 16px',
    ...getTypeColors(),
  };
});

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <Warning fontSize="large" />;
      case 'error':
        return <Error fontSize="large" />;
      case 'danger':
        return <Delete fontSize="large" />;
      case 'info':
        return <Info fontSize="large" />;
      case 'success':
        return <CheckCircle fontSize="large" />;
      default:
        return <Warning fontSize="large" />;
    }
  };

  const getConfirmButtonProps = () => {
    switch (type) {
      case 'danger':
      case 'error':
        return { color: 'error' as const, variant: 'contained' as const };
      case 'warning':
        return { color: 'warning' as const, variant: 'contained' as const };
      case 'success':
        return { color: 'success' as const, variant: 'contained' as const };
      default:
        return { color: 'primary' as const, variant: 'contained' as const };
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
    >
      <DialogContent sx={{ textAlign: 'center', py: 3 }}>
        <IconContainer type={type}>{getIcon()}</IconContainer>
        
        {title && (
          <DialogTitle
            id="confirm-dialog-title"
            sx={{ p: 0, mb: 2, textAlign: 'center' }}
          >
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
          </DialogTitle>
        )}
        
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          loading={loading}
          {...getConfirmButtonProps()}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ConfirmDialog;