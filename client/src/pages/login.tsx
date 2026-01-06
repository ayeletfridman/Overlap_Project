import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button, Typography, Paper, Container, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { Link} from 'react-router-dom';
import { useAuthMutations } from '../api/queries';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { forgotPassword } from '../api/userApi';
import { styles } from './styles/Login.styles'; 

const Login = () => {
  const { loginMutation } = useAuthMutations();
  const [forgotEmail, setForgotEmail] = useState('');
  const [openForgot, setOpenForgot] = useState(false);

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(forgotEmail);
      toast.success('מייל נשלח בהצלחה! בדוק את תיבת הדואר שלך');
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

            <Typography sx={styles.forgotPasswordText} onClick={() => setOpenForgot(true)}>
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
        PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#3e3858ff' }}>שחזור סיסמה</DialogTitle>
        <DialogContent>
          <Typography mb={2} color="textSecondary">
            הזן את כתובת האימייל שלך ונשלח לך לינק לאיפוס מיידי.
          </Typography>
          <TextField
            fullWidth
            label="אימייל"
            variant="outlined"
            sx={styles.input}
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenForgot(false)} sx={{ color: 'text.secondary' }}>ביטול</Button>
          <Button 
            onClick={handleForgotPassword} 
            variant="contained" 
            sx={{ bgcolor: '#5770a5ff', borderRadius: '10px', '&:hover': { bgcolor: '#3e3858ff' } }}
          >
            שלח לינק
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;