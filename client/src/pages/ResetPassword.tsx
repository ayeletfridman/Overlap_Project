import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography, Stack } from '@mui/material';
import { resetPassword } from '../api/userApi';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error('הסיסמאות לא תואמות');
    
    try {
      await resetPassword(token!, password);
      toast.success('הסיסמה שונתה בהצלחה! כעת ניתן להתחבר');
      navigate('/login');
    } catch (error: any) {
      toast.error('הקישור פג תוקף או שאינו תקין');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
      <Paper sx={{ p: 4, borderRadius: '20px' }}>
        <Typography variant="h5" fontWeight="800" mb={3} textAlign="center">איפוס סיסמה חדשה</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField fullWidth type="password" label="סיסמה חדשה" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <TextField fullWidth type="password" label="אימות סיסמה" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#5770a5ff', py: 1.5 }}>עדכן סיסמה</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;