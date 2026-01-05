import { useFormik } from 'formik';
import { useRecoilState } from 'recoil';
import { authState } from '../store/authAtoms';
import { Box, TextField, Button, Typography, Avatar, Paper, Stack, CircularProgress,Dialog,DialogTitle, DialogActions, DialogContent,
  TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Chip
 } from '@mui/material';
import { getUserById, updateProfile, updateUserById } from '../api/userApi';import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import  { useEffect, useState } from 'react';
import { formatDate } from '../utils/formatters';
import {createPermissionRequest, getMyPermissionHistory} from '../api/permissionApi';


interface PermissionRequest {
  _id: string;
  requestedPermission: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const allPermissions = [
  { id: 'canAdd', label: 'הוספת תוכן (Add)' },
  { id: 'canEdit', label: 'עריכת תוכן (Edit)' },
  { id: 'canDelete', label: 'מחיקת תוכן (Delete)' },
  { id: 'canReset', label: 'איפוס נתונים (Reset)' },
]; 

const Profile = () => {
  const { id } = useParams();
  const [auth, setAuth] = useRecoilState(authState);
  const [targetUser, setTargetUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openRequestModal, setOpenRequestModal] = useState(false);
const [requestData, setRequestData] = useState({ requestedPermission: 'canEdit', reason: '' });
const [myRequests, setMyRequests] = useState<PermissionRequest[]>([]);
  const navigate = useNavigate();

const handleSendRequest = async () => {
  const isAlreadyPending = myRequests.some(
    (r: any) => r.requestedPermission === requestData.requestedPermission && r.status === 'pending'
  );

  if (isAlreadyPending) {
    return toast.error('כבר שלחת בקשה להרשאה זו, היא ממתינה לאישור מנהל');
  }

  try {
    const newRequest = await createPermissionRequest(requestData);
    
    toast.success('הבקשה נשלחה למנהל המערכת');
    
    setMyRequests((prevRequests) => [newRequest, ...prevRequests]);

    setOpenRequestModal(false);
    setRequestData({ requestedPermission: 'canEdit', reason: '' });
    
  } catch (error: any) {
    toast.error('שגיאה בשליחת הבקשה');
    console.error(error);
  }
};

const availableToRequest = allPermissions.filter(
  (perm) => !auth.user?.permissions?.[perm.id as keyof typeof auth.user.permissions]
);

useEffect(() => {
  if (availableToRequest.length > 0 && !availableToRequest.find(p => p.id === requestData.requestedPermission)) {
    setRequestData(prev => ({ ...prev, requestedPermission: availableToRequest[0].id }));
  }
}, [availableToRequest, requestData.requestedPermission]);

useEffect(() => {
  const fetchHistory = async () => {
    try {
      const data = await getMyPermissionHistory();
      setMyRequests(data);
    } catch (error) {
      console.error('Failed to fetch history');
    }
  };
  
  if (auth.user?.role !== 'admin') {
    fetchHistory();
  }
}, []);

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
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
  תאריך הצטרפות- {formatDate(targetUser?.createdAt)}
</Typography>
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

{auth.user?.role !== 'admin' && (
  <Button 
    variant="outlined" 
    onClick={() => setOpenRequestModal(true)}
    sx={{ 
      mt: 2, 
      borderRadius: '10px',
      borderColor: '#5770a5ff',
      color: '#5770a5ff',
      '&:hover': { borderColor: '#2B3674', color: '#2B3674' }
    }}
  >
    בקש הרשאות נוספות
  </Button>

)}
{auth.user?.role !== 'admin' && myRequests.length > 0 && (
  <Box sx={{ mt: 4, width: '100%' }}>
    <Typography variant="h6" mb={2} fontWeight="700" color="#2B3674">
      היסטוריית בקשות הרשאה
    </Typography>
    <TableContainer component={Paper} sx={{ borderRadius: '15px', boxShadow: 'none', border: '1px solid #eee' }}>
      <Table size="small">
        <TableHead sx={{ bgcolor: '#f4f7fe' }}>
          <TableRow>
            <TableCell><b>הרשאה</b></TableCell>
            <TableCell><b>סטטוס</b></TableCell>
            <TableCell><b>תאריך</b></TableCell>
            <TableCell><b>הערות מנהל</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myRequests.map((req: any) => (
            <TableRow key={req._id}>
              <TableCell>{req.requestedPermission}</TableCell>
              <TableCell>
                <Chip 
                  label={req.status === 'pending' ? 'ממתין' : req.status === 'approved' ? 'אושר' : 'נדחה'} 
                  color={req.status === 'approved' ? 'success' : req.status === 'rejected' ? 'error' : 'warning'}
                  size="small"
                  sx={{ fontWeight: '600' }}
                />
              </TableCell>
              <TableCell>{new Date(req.createdAt).toLocaleDateString('he-IL')}</TableCell>
              <TableCell sx={{ color: req.adminNotes ? 'text.primary' : 'text.disabled', fontStyle: req.adminNotes ? 'normal' : 'italic' }}>
                {req.adminNotes ? req.adminNotes : 'אין הערות'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
)}


<Dialog open={openRequestModal} onClose={() => setOpenRequestModal(false)} fullWidth maxWidth="sm">
    <DialogTitle>בקשת הרשאה חדשה</DialogTitle>
    <DialogContent>
      <Stack spacing={3} sx={{ mt: 1 }}>
        {availableToRequest.length > 0 ? (
          <>
            <TextField
              select
              label="סוג ההרשאה המבוקשת"
              value={requestData.requestedPermission}
              onChange={(e) => setRequestData({ ...requestData, requestedPermission: e.target.value })}
              SelectProps={{ native: true }}
              fullWidth
            >
              {availableToRequest.map((perm) => (
                <option key={perm.id} value={perm.id}>
                  {perm.label}
                </option>
              ))}
            </TextField>

            <TextField
              label="סיבת הבקשה"
              multiline
              rows={3}
              value={requestData.reason}
              onChange={(e) => setRequestData({ ...requestData, reason: e.target.value })}
              fullWidth
              placeholder="הסבר למנהל למה אתה זקוק להרשאה זו..."
            />
          </>
        ) : (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="success.main">
              כל הכבוד! יש לך כבר את כל ההרשאות האפשריות.
            </Typography>
          </Box>
        )}
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenRequestModal(false)}>ביטול</Button>
      {availableToRequest.length > 0 && (
        <Button 
          onClick={handleSendRequest} 
          variant="contained" 
          disabled={!requestData.reason}
          sx={{ bgcolor: '#5770a5ff' }}
        >
          שלח בקשה
        </Button>
      )}
    </DialogActions>
  </Dialog>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Profile;