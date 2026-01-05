import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button, Typography, Paper, Container,Dialog,DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthMutations } from '../api/queries';
import  {  useState } from 'react';
import { toast } from 'react-hot-toast';
import { forgotPassword } from '../api/userApi';



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

            <Typography 
  variant="body2" 
  sx={{ cursor: 'pointer', color: '#5770a5ff', textAlign: 'left', mt: 1 }}
  onClick={() => setOpenForgot(true)}
>
  שכחתי סיסמה
</Typography>
          </form>
        </Paper>
      </Box>

      <Dialog open={openForgot} onClose={() => setOpenForgot(false)}>
  <DialogTitle>שחזור סיסמה</DialogTitle>
  <DialogContent>
    <Typography mb={2}>הזן את כתובת האימייל שלך ונשלח לך לינק לאיפוס.</Typography>
    <TextField
      fullWidth
      label="אימייל"
      value={forgotEmail}
      onChange={(e) => setForgotEmail(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenForgot(false)}>ביטול</Button>
    <Button onClick={handleForgotPassword} variant="contained" sx={{ bgcolor: '#5770a5ff' }}>שלח</Button>
  </DialogActions>
</Dialog>
    </Container>

    
  );
};

export default Login;