import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  styled,
  Slide,
  Zoom,
  Fade,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  fullScreen?: boolean;
  animation?: 'slide' | 'zoom' | 'fade';
  showCloseButton?: boolean;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.primary.main}05 100%)`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  gap: theme.spacing(1),
}));

// Transition components
const SlideTransition = React.forwardRef<unknown, TransitionProps & { children: React.ReactElement }>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const ZoomTransition = React.forwardRef<unknown, TransitionProps & { children: React.ReactElement }>((props, ref) => (
  <Zoom ref={ref} {...props} />
));

const FadeTransition = React.forwardRef<unknown, TransitionProps & { children: React.ReactElement }>((props, ref) => (
  <Fade ref={ref} {...props} />
));

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  fullScreen = false,
  animation = 'slide',
  showCloseButton = true,
}) => {
  const getTransitionComponent = () => {
    switch (animation) {
      case 'zoom':
        return ZoomTransition;
      case 'fade':
        return FadeTransition;
      default:
        return SlideTransition;
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      TransitionComponent={getTransitionComponent()}
      aria-labelledby="modal-title"
    >
      {title && (
        <StyledDialogTitle id="modal-title">
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          {showCloseButton && (
            <IconButton
              onClick={onClose}
              size="small"
              aria-label="close modal"
              sx={{ color: 'text.secondary' }}
            >
              <Close />
            </IconButton>
          )}
        </StyledDialogTitle>
      )}
      
      <StyledDialogContent>{children}</StyledDialogContent>
      
      {actions && <StyledDialogActions>{actions}</StyledDialogActions>}
    </StyledDialog>
  );
};

export default Modal;
