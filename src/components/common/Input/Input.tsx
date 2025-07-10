import React from 'react';
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
  styled,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard' | 'modern';
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const ModernTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    transition: 'all 0.3s ease',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
}));

const Input: React.FC<InputProps> = ({
  variant = 'outlined',
  type = 'text',
  icon,
  rightIcon,
  onRightIconClick,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const actualType = type === 'password' && showPassword ? 'text' : type;

  const startAdornment = icon ? (
    <InputAdornment position="start">{icon}</InputAdornment>
  ) : undefined;

  const endAdornment = (
    <InputAdornment position="end">
      {type === 'password' && (
        <IconButton
          onClick={handleTogglePassword}
          edge="end"
          size="small"
          aria-label="toggle password visibility"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      )}
      {rightIcon && (
        <IconButton
          onClick={onRightIconClick}
          edge="end"
          size="small"
        >
          {rightIcon}
        </IconButton>
      )}
    </InputAdornment>
  );

  const textFieldProps = {
    ...props,
    type: actualType,
    variant: variant === 'modern' ? 'outlined' : variant,
    InputProps: {
      ...props.InputProps,
      startAdornment,
      endAdornment: (startAdornment || rightIcon || type === 'password') ? endAdornment : undefined,
    },
  };

  return variant === 'modern' ? (
    <ModernTextField {...textFieldProps} />
  ) : (
    <TextField {...textFieldProps} />
  );
};

export default Input;