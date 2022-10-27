import { companyName } from '@devugur/utilities';
import { Btn, TextInput } from '@devugur/webapp/ui-shared';
import { Box, Stack, Typography, Link as MLink } from '@mui/material';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  return (
    <Box sx={{ maxWidth: 400, width: '100%' }}>
      <Typography gutterBottom variant="h2">
        Forgot password?
      </Typography>
      <Typography gutterBottom variant="body2">
        Please enter the email address associated with your account and We will
        email you a link to reset your password.
      </Typography>
      <br />
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
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
              <Btn type="submit" size="large" disabled={isSubmitting}>
                Submit
              </Btn>
              <Link to="/login" style={{ width: '100%', textAlign: 'center' }}>
                <MLink
                  component="span"
                  variant="body2"
                  color="secondary"
                  sx={{ textAlign: 'center', width: '100%', fontWeight: '400' }}
                >
                  Back to login
                </MLink>
              </Link>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default ForgotPasswordPage;
