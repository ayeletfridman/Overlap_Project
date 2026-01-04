// import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthMutations } from '../api/queries';

const Login = () => {
  const { loginMutation } = useAuthMutations();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('חובה להזין שם משתמש'),
      password: Yup.string().required('חובה להזין סיסמה'),
    }),
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>התחברות</Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              name="username"
              label="שם משתמש"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="סיסמה"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              sx={{ mt: 3, mb: 2 }}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'מתחבר...' : 'כניסה'}
            </Button>
            <Typography align="center">
              אין לך חשבון? <Link to="/signup">הרשם כאן</Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;