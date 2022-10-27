import { companyName } from '@devugur/utilities';
import { Btn, TextInput } from '@devugur/webapp/ui-shared';
import { Box, Stack, Typography, Link as MLink, Alert } from '@mui/material';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../store/features/auth';

const SignupPage = () => {
  const navigate = useNavigate();
  const [registerMutation, { isSuccess }] = useRegisterMutation();
  return (
    <Box sx={{ maxWidth: 400, width: '100%' }}>
      <Typography variant="h2">Welcome to {companyName}!</Typography>
      <Typography variant="body2" gutterBottom>
        Already have an account?{' '}
        <Link to="/login">
          <MLink component="span">Sign In</MLink>
        </Link>
      </Typography>
      <br />
      <Formik
        initialValues={{
          email: 'balporsugu95@gmail.com',
          password: 'ugur1234',
          name: 'balporsugu',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          try {
            const payload = await registerMutation(values).unwrap();
            console.log('fulfilled', payload);

            navigate('/login');
          } catch (error) {
            console.error('rejected', error);
          }
        }}
      >
        {({ errors, touched, handleSubmit, isSubmitting, getFieldProps }) => (
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Stack spacing={2} maxWidth="sm">
              <TextInput
                label="Name"
                id="name"
                size="medium"
                {...getFieldProps('name')}
                err={errors.name && touched.name && errors.name}
              />
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
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default SignupPage;
