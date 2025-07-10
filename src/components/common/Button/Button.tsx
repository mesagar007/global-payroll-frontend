import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
  styled,
} from '@mui/material';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'contained' | 'outlined' | 'text' | 'gradient';
  loading?: boolean;
  icon?: React.ReactNode;
  gradientType?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const GradientButton = styled(MuiButton)<{ gradientType?: string }>(
  ({ theme, gradientType = 'primary' }) => ({
    background: theme.custom.gradients[gradientType as keyof typeof theme.custom.gradients],
    color: '#ffffff',
    '&:hover': {
      background: theme.custom.gradients[gradientType as keyof typeof theme.custom.gradients],
      opacity: 0.9,
    },
    '&:disabled': {
      background: theme.palette.grey[300],
      color: theme.palette.grey[500],
    },
  })
);

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  loading = false,
  disabled,
  icon,
  gradientType = 'primary',
  startIcon,
  ...props
}) => {
  const ButtonComponent = variant === 'gradient' ? GradientButton : MuiButton;
  
  const buttonProps = {
    ...props,
    variant: variant === 'gradient' ? 'contained' : variant,
    disabled: disabled || loading,
    startIcon: loading ? (
      <CircularProgress size={16} color="inherit" />
    ) : icon || startIcon,
    ...(variant === 'gradient' && { gradientType }),
  };

  return (
    <ButtonComponent {...buttonProps}>
      {children}
    </ButtonComponent>
  );
};

export default Button;