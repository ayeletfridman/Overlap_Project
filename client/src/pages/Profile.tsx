import { useFormik } from 'formik';
import { useRecoilState } from 'recoil';
import { authState } from '../store/authAtoms';
import { Box, TextField, Button, Typography, Avatar, Stack, CircularProgress, Dialog, DialogTitle, DialogActions, DialogContent, Grid, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { getUserById, updateProfile, updateUserById } from '../api/userApi';
import { toast } from 'react-hot-toast';
import { useParams ,useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatDate } from '../utils/formatters';
import { createPermissionRequest, getMyPermissionHistory } from '../api/permissionApi';
import * as S from './styles/Profile.styles';
import { PermissionHistory } from '../components/PermissionHistory';


const allPermissions = [
  { id: 'canAdd', label: 'הוספת תוכן (Add)' },
  { id: 'canEdit', label: 'עריכת תוכן (Edit)' },
  { id: 'canDelete', label: 'מחיקת תוכן (Delete)' },
  { id: 'canReset', label: 'איפוס נתונים (Reset)' },
];

const Profile = () => {
    const navigate = useNavigate();
  
  const { id } = useParams();
  const [auth, setAuth] = useRecoilState(authState);
  const [targetUser, setTargetUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [requestData, setRequestData] = useState({ requestedPermission: 'canEdit', reason: '' });
  const [myRequests, setMyRequests] = useState<any[]>([]);

  const handleSendRequest = async () => {
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id) {
          const user = await getUserById(id);
          setTargetUser(user);
        } else {
          setTargetUser(auth.user);
          if (auth.user?.role !== 'admin') {
            const history = await getMyPermissionHistory();
            setMyRequests(history);
          }
        }
      } catch (error) { toast.error('שגיאה בטעינה'); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [id, auth.user]);

  const formik = useFormik({
    initialValues: {
      firstName: targetUser?.firstName || '',
      lastName: targetUser?.lastName || '',
      phone: targetUser?.phone || '',
      email: targetUser?.email || '',
      username: targetUser?.username || '',
      profileImage: null
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => { if (value) formData.append(key, value); });
      try {
        if (id) {
          await updateUserById(id, formData);
          toast.success('משתמש עודכן');
          navigate('/admin');

        } else {
          const updatedUser = await updateProfile(formData);
          setAuth({ ...auth, user: updatedUser });
          localStorage.setItem('user', JSON.stringify(updatedUser));
          toast.success('הפרופיל שלך עודכן');
          navigate('/');
        }
      } catch (e) { toast.error('עדכון נכשל'); }
    },
  });

  const availableToRequest = allPermissions.filter(p =>
    !auth.user?.permissions?.[p.id as keyof typeof auth.user.permissions] &&
    !myRequests.some(r => r.requestedPermission === p.id && r.status === 'pending')
  );

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <S.ProfileWrapper>
      <S.ProfileCard>
        <S.ProfileHeaderGradient />

        <S.AvatarWrapper>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={`http://localhost:5000/${targetUser?.profileImage}`}
              sx={{ width: 130, height: 130, border: '6px solid white', boxShadow: '0px 10px 25px rgba(0,0,0,0.1)' }}
            />
            <IconButton
              component="label"
              sx={{ position: 'absolute', bottom: 0, right: 5, bgcolor: '#5770a5ff', color: 'white', '&:hover': { bgcolor: '#3e3858ff' } }}
            >
              <PhotoCameraIcon fontSize="small" />
              <input type="file" hidden onChange={(e) => formik.setFieldValue('profileImage', e.target.files?.[0])} />
            </IconButton>
          </Box>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 800, color: '#2B3674' }}>
            {targetUser?.firstName} {targetUser?.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            חבר/ה מאז: {formatDate(targetUser?.createdAt)}
          </Typography>
        </S.AvatarWrapper>

        <S.FormSection>
          <form onSubmit={formik.handleSubmit}>
            <S.SectionTitle>פרטים אישיים</S.SectionTitle>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="שם פרטי" {...formik.getFieldProps('firstName')} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="שם משפחה" {...formik.getFieldProps('lastName')} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="שם משתמש" {...formik.getFieldProps('username')} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="טלפון" {...formik.getFieldProps('phone')} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="אימייל" {...formik.getFieldProps('email')} />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 4, py: 1.5, borderRadius: '12px', bgcolor: '#5770a5ff', fontWeight: 'bold' }}
            >
              שמור שינויים במערכת
            </Button>
          </form>

          {!id && auth.user?.role !== 'admin' && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                <S.SectionTitle sx={{ m: 0 }}>הרשאות וגישה</S.SectionTitle>
                <S.RequestPermissionBtn>
                <Button size="small" variant="text" onClick={() => setOpenRequestModal(true)} sx={{ fontWeight: 'bold' }}>
                  + בקש הרשאה
                </Button>
                </S.RequestPermissionBtn>
              </Box>
              {myRequests.length > 0 && <PermissionHistory requests={myRequests} />}
            </>
          )}
        </S.FormSection>
      </S.ProfileCard>

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
    </S.ProfileWrapper>
  );
};

export default Profile;