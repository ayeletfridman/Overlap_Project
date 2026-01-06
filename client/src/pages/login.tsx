import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button, Typography, Paper, Container, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { Link} from 'react-router-dom';
import { useAuthMutations } from '../api/queries';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { forgotPassword,getEmailByUsername } from '../api/userApi';
import { styles } from './styles/Login.styles'; 

const Login = () => {
  const { loginMutation } = useAuthMutations();
  const [openForgot, setOpenForgot] = useState(false);
  const [foundEmail, setFoundEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);

const handleOpenForgotDialog = async () => {
  if (!formik.values.username) {
    toast.error('אנא הזן שם משתמש בשדה ההתחברות');
    return;
  }

  setIsSearching(true);
  try {
    console.log(isSearching)
    const data = await getEmailByUsername(formik.values.username);
    setFoundEmail(data.email);
    setOpenForgot(true);
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'שם משתמש לא נמצא');
  } finally {
    setIsSearching(false);
  }
};

const handleForgotPasswordSubmit = async () => {
  try {
    await forgotPassword(foundEmail);
    toast.success('מייל נשלח בהצלחה!');
    setOpenForgot(false);
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'שגיאה בשליחת המייל');
  }
};

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
    <Box sx={styles.container}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={styles.paper}>
          <Typography variant="h4" align="center" sx={styles.title}>
            ברוך הבא
          </Typography>
          <Typography variant="body1" sx={styles.subtitle}>
            התחבר כדי לנהל את המדינות שלך
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              name="username"
              label="שם משתמש"
              sx={styles.input}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              name="password"
              label="סיסמה"
              type="password"
              sx={styles.input}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Typography sx={styles.forgotPasswordText} onClick={() => handleOpenForgotDialog()}>
              ?שכחת סיסמה
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.submitButton}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'מתחבר...' : 'כניסה למערכת'}
            </Button>

            <Typography sx={styles.signupLink}>
              אין לך חשבון? <Link to="/signup">הרשם עכשיו</Link>
            </Typography>
          </form>
        </Paper>
      </Container>

      <Dialog 
  open={openForgot} 
  onClose={() => setOpenForgot(false)}
  PaperProps={{ sx: { borderRadius: '20px', p: 1, maxWidth: '400px', width: '100%' } }}
>
  <DialogTitle sx={{ fontWeight: 'bold', color: '#3e3858ff', textAlign: 'center' }}>
    שחזור סיסמה
  </DialogTitle>
  <DialogContent>
    <Typography textAlign="center" mb={2} color="textSecondary">
      ישלח מייל לכתובת הבאה לאיפוס סיסמה:
    </Typography>
    
    <Box sx={{ 
      bgcolor: '#f4f7fe', 
      p: 2, 
      borderRadius: '12px', 
      border: '1px dashed #5770a5ff',
      textAlign: 'center' 
    }}>
      <Typography sx={{ fontWeight: 'bold', color: '#5770a5ff', wordBreak: 'break-all' }}>
        {foundEmail}
      </Typography>
    </Box>

    <Typography textAlign="center" mt={2} variant="body2" color="textSecondary">
      לחץ על "שלח" כדי לקבל קישור לאיפוס המשתמש שלך.
    </Typography>
  </DialogContent>
  
  <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'center', gap: 1 }}>
    <Button 
      onClick={() => setOpenForgot(false)} 
      sx={{ color: 'text.secondary', fontWeight: 'bold' }}
    >
      ביטול
    </Button>
    <Button 
      onClick={handleForgotPasswordSubmit} 
      variant="contained" 
      sx={{ 
        bgcolor: '#5770a5ff', 
        px: 4,
        borderRadius: '10px', 
        '&:hover': { bgcolor: '#3e3858ff' } 
      }}
    >
      שלח
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default Login;