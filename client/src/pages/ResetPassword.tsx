import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography, Stack, Container } from '@mui/material';
import { resetPassword } from '../api/userApi';
import { toast } from 'react-hot-toast';
import LockResetIcon from '@mui/icons-material/LockReset';
import { styles } from './styles/ResetPassword.styles'; // ייבוא הסטייל המופרד

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('הסיסמאות שמהזנת אינן תואמות');
    }

    setLoading(true);
    try {
      await resetPassword(token!, password);
      toast.success('הסיסמה שונתה בהצלחה! כעת ניתן להתחבר');
      navigate('/login');
    } catch (error: any) {
      toast.error('הקישור פג תוקף או שאינו תקין. נסה לשלוח בקשה חדשה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={styles.paper}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ 
              bgcolor: '#f4f7fe', 
              p: 2, 
              borderRadius: '50%', 
              display: 'flex',
              color: '#3e3858ff' 
            }}>
              <LockResetIcon fontSize="large" />
            </Box>
          </Box>

          <Typography variant="h4" sx={styles.title}>
            איפוס סיסמה
          </Typography>
          <Typography variant="body1" sx={styles.subtitle}>
            הזן סיסמה חדשה ומאובטחת לחשבונך
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                type="password"
                label="סיסמה חדשה"
                sx={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                fullWidth
                type="password"
                label="אימות סיסמה חדשה"
                sx={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={styles.submitButton}
                disabled={loading}
              >
                {loading ? 'מעדכן...' : 'עדכן סיסמה וכנס למערכת'}
              </Button>
            </Stack>
          </form>

          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/login')}
            sx={{ mt: 3, color: 'text.secondary', fontWeight: 600 }}
          >
            חזרה להתחברות
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword;