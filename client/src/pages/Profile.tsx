import { useFormik } from 'formik';
import { useRecoilState } from 'recoil';
import { authState } from '../store/authAtoms';
import { Box, TextField, Button, Typography, Avatar, Paper, Stack, CircularProgress } from '@mui/material';
import { getUserById, updateProfile, updateUserById } from '../api/userApi';import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import  { useEffect, useState } from 'react';



const Profile = () => {
  const { id } = useParams();
  const [auth, setAuth] = useRecoilState(authState);
  const [targetUser, setTargetUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); 
      try {
        if (id) {
          const data = await getUserById(id);
          setTargetUser(data);
        } else {
          setTargetUser(auth.user);
        }
      } catch (error) {
        toast.error('שגיאה בטעינת נתוני משתמש');
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, [id, auth.user]);

  const formik = useFormik({
  initialValues: {
    firstName: targetUser?.firstName || '',
    lastName: targetUser?.lastName || '',
    phone: targetUser?.phone || '',
    email: targetUser?.email || '', 
    username: targetUser?.username || '', 
    profileImage: targetUser?.profileImage||''
  },
  enableReinitialize: true, 
 
  
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('phone', values.phone);
        formData.append('email', values.email);
        formData.append('username', values.username);
        if (values.profileImage) {
          formData.append('profileImage', values.profileImage);
        }
        if (id) {
          await updateUserById(id, formData);
          toast.success('פרטי המשתמש עודכנו בהצלחה');
          navigate('/admin');
        } else {

        const updatedUser = await updateProfile(formData);
        
        const newAuth = { ...auth, user: updatedUser };
        setAuth(newAuth);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        toast.success('הפרופיל עודכן בהצלחה!');
        navigate('/');
        }
      } catch (error) {
        toast.error('שגיאה בעדכון הפרופיל');
      }
    },
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Paper sx={{ p: 4, borderRadius: '20px' }}>
        <Typography variant="h5" fontWeight="800" mb={3} textAlign="center">
          עדכון פרופיל
        </Typography>
        
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3} alignItems="center">
            <Avatar 
              src={`http://localhost:5000/${targetUser?.profileImage}`} 
              sx={{ width: 100, height: 100, mb: 2 }} 
            />
            
            <TextField fullWidth label="שם פרטי" {...formik.getFieldProps('firstName')} />
            <TextField fullWidth label="שם משפחה" {...formik.getFieldProps('lastName')} />
            <TextField fullWidth label="טלפון" {...formik.getFieldProps('phone')} />
            <TextField fullWidth label="אימייל" {...formik.getFieldProps('email')} />
            <TextField fullWidth label="שם משתמש" {...formik.getFieldProps('username')} />

            
            <Button variant="outlined" component="label" fullWidth>
              החלף תמונת פרופיל
              <input type="file" hidden onChange={(e) => formik.setFieldValue('profileImage', e.target.files?.[0])} />
            </Button>

            <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#5770a5ff', py: 1.5 }}
>
              שמור שינויים
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Profile;