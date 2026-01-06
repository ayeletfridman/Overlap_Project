import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button, Typography, Paper, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styles } from './styles/SignUp.styles';
import { useRegisterMutation } from '../api/queries';

const SignUp = () => {
  const navigate = useNavigate();

 const registerMutation = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      firstName: '', lastName: '', username: '', email: '', phone: '', password: '', profileImage: null
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('שם פרטי הוא שדה חובה'),
      lastName: Yup.string().required('שם משפחה הוא שדה חובה'),
      username: Yup.string().required('שם משתמש הוא שדה חובה'),
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

  return (
    <Box sx={styles.container}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={styles.paper}>
          <Typography variant="h4" align="center" sx={styles.title}>
            יצירת חשבון
          </Typography>
          <Typography variant="body1" sx={styles.subtitle}>
            הצטרף לקהילת CountriesHub והתחל לערוך
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2.5}>
              <Grid size ={{xs:12, sm:6}}>
                <TextField
                  fullWidth
                  
                  label="שם פרטי"
                  sx={styles.input}
                  {...formik.getFieldProps('firstName')}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid size ={{xs:12, sm:6}}>
                <TextField
                  fullWidth
                  
                  label="שם משפחה"
                  sx={styles.input}
                  {...formik.getFieldProps('lastName')}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              
              <Grid size ={{xs:12}}>
                <TextField
                  fullWidth
                  
                  label="שם משתמש"
                  sx={styles.input}
                  {...formik.getFieldProps('username')}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              
              <Grid size ={{xs:12}}>
                <TextField
                  fullWidth
                  
                  label="אימייל"
                  sx={styles.input}
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid size ={{xs:12}}>
                <TextField
                  fullWidth
                  
                  label="מספר טלפון"
                  sx={styles.input}
                  {...formik.getFieldProps('phone')}
                />
              </Grid>

              <Grid size ={{xs:12}}>
                <TextField
                  fullWidth
                  
                  type="password"
                  label="סיסמה"
                  sx={styles.input}
                  {...formik.getFieldProps('password')}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>

              <Grid size ={{xs:12}}>
                <Box sx={styles.fileInputWrapper} component="label">
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(event) => {
                      formik.setFieldValue("profileImage", event.currentTarget.files?.[0]);
                    }}
                  />
                  <CloudUploadIcon sx={{ color: '#5770a5ff', fontSize: 40, mb: 1 }} />
                  <Typography variant="body2" color="textSecondary">
                    {formik.values.profileImage 
                      ? (formik.values.profileImage as File).name 
                      : "לחץ כאן להעלאת תמונת פרופיל"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.submitButton}
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'יוצר חשבון...' : 'סיום הרשמה'}
            </Button>

            <Button 
              fullWidth 
              variant="text" 
              onClick={() => navigate('/login')}
              sx={{ mt: 2, color: '#3e3858ff', fontWeight: 600 }}
            >
              כבר יש לך חשבון? התחבר כאן
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;