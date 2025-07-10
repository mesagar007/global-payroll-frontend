import React from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from '@/components/common';
import { LoginCredentials } from '@/types/auth.types';
import { Email, Lock } from '@mui/icons-material';


interface LoginFormProps {
  onSubmit: (values: LoginCredentials, helpers: FormikHelpers<LoginCredentials>) => void;
  isLoading?: boolean;
  error?: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Box mb={3}>
            <Input
              fullWidth
              name="email"
              type="email"
              label="Email Address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              variant="modern"
              icon={<Email />}
              autoComplete="email"
              disabled={isLoading}
            />
          </Box>

          <Box mb={3}>
            <Input
              fullWidth
              name="password"
              type="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              variant="modern"
              icon={<Lock />}
              autoComplete="current-password"
              disabled={isLoading}
            />
          </Box>

          <Box mb={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={values.rememberMe}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Remember me"
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="gradient"
            gradientType="primary"
            size="large"
            loading={isSubmitting || isLoading}
            sx={{ py: 1.5 }}
          >
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;