import { companyName } from '@devugur/utilities';
import { Btn, TextInput } from '@devugur/webapp/ui-shared';
import { Box, Stack, Typography, Link as MLink } from '@mui/material';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../store/features/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginMutation] = useLoginMutation();
  return (
    <Box sx={{ maxWidth: 400, width: '100%' }}>
      <Typography variant="h2">Welcome to {companyName}!</Typography>
      <Typography variant="body2" gutterBottom>
        New to {companyName}?{' '}
        <Link to="/signup">
          <MLink component="span">Create an account</MLink>
        </Link>
      </Typography>
      <br />
      <Formik
        initialValues={{ email: 'yolo@gmail.com', password: 'yolo1234' }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const payload = await loginMutation(values).unwrap();
            console.log('fulfilled', payload);
            navigate('/dashboard');
          } catch (error) {
            console.error('rejected', error);
          }

          setSubmitting(false);
        }}
      >
        {({ errors, touched, handleSubmit, isSubmitting, getFieldProps }) => (
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Stack spacing={2} maxWidth="sm">
              <TextInput
                label="Email"
                id="email"
                size="medium"
                {...getFieldProps('email')}
                err={errors.email && touched.email && errors.email}
              />
              <TextInput
                type="password"
                label="Password"
                id="password"
                size="medium"
                {...getFieldProps('password')}
                err={errors.password && touched.password && errors.password}
              />
              <Btn type="submit" size="large" disabled={isSubmitting}>
                Submit
              </Btn>
              <Link to="/forgot-password">
                <MLink component="span" variant="body2">
                  Forgot password?
                </MLink>
              </Link>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default LoginPage;
