import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button, Typography, Paper, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/countryApi';
import toast from 'react-hot-toast';
// const Grid = Grid as any;
const SignUp = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('נרשמת בהצלחה! כעת ניתן להתחבר');
      navigate('/login');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'שגיאה בהרשמה');
    }
  });

  const formik = useFormik({
    initialValues: {
      firstName: '', lastName: '', username: '', email: '', phone: '', password: '', profileImage: null
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('חובה'),
      lastName: Yup.string().required('חובה'),
      username: Yup.string().required('חובה'),
      email: Yup.string().email('אימייל לא תקין').required('חובה'),
      password: Yup.string().min(6, 'לפחות 6 תווים').required('חובה'),
      phone: Yup.string().required('חובה'),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      registerMutation.mutate(formData);
    },
  });

  console.log('Formik Errors:', formik.errors);
console.log('Formik Values:', formik.values);
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>הרשמה</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid size ={{xs:12, sm:6}}>
                <TextField fullWidth name="firstName" label="שם פרטי" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && (formik.errors.firstName as string)} />
              </Grid>
              <Grid size ={{xs:12, sm:6}}>
                <TextField fullWidth name="lastName" label="שם משפחה" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && (formik.errors.lastName as string)}/>
              </Grid>
           
              <Grid size ={{xs:12}}>
                <TextField fullWidth name="username" label="שם משתמש" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && (formik.errors.username as string)}/>
              </Grid>
              <Grid size ={{xs:12}}>
                <TextField fullWidth name="email" label="אימייל" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && (formik.errors.email as string)}/>
              </Grid>
              <Grid size ={{xs:12}}>
                <TextField fullWidth name="phone" label="טלפון" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
              </Grid>
              <Grid size ={{xs:12}}>
                <TextField fullWidth name="password" type="password" label="סיסמה" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && (formik.errors.password as string)} />
              </Grid>
              <Grid size ={{xs:12}}>
                <Typography variant="body2" sx={{ mb: 1 }}>תמונת פרופיל:</Typography>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue("profileImage", event.currentTarget.files?.[0]);
                  }} 
                />
                {formik.errors.profileImage && (
        <Typography variant="caption" color="error">
          {formik.errors.profileImage as string}
        </Typography>
      )}
              </Grid>
            </Grid>
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              sx={{ mt: 3 }}
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'יוצר חשבון...' : 'סיום הרשמה'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUp;