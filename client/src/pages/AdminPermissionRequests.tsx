import { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Chip, TextField, Stack 
} from '@mui/material';
import { getAllAdminRequests, updateRequestStatus } from '../api/permissionApi';
import { toast } from 'react-hot-toast';
import { styles } from './styles/AdminPermissionRequests.styles'; // ייבוא הסטייל

const AdminPermissionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [adminNotes, setAdminNotes] = useState<{ [key: string]: string }>({});

  const fetchRequests = async () => {
    try {
      const data = await getAllAdminRequests();
      setRequests(data);
    } catch (error) {
      toast.error('שגיאה בטעינת בקשות');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateRequestStatus(id, status, adminNotes[id] || '');
      toast.success(status === 'approved' ? 'הבקשה אושרה וההרשאה עודכנה' : 'הבקשה נדחתה');
      fetchRequests(); 
    } catch (error) {
      toast.error('שגיאה בעדכון הסטטוס');
    }
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.pageTitle}>
        ניהול בקשות הרשאה
      </Typography>

      <TableContainer component={Paper} sx={styles.tablePaper}>
        <Table>
          <TableHead sx={styles.tableHeader}>
            <TableRow>
              <TableCell align="right">משתמש</TableCell>
              <TableCell align="center">הרשאה</TableCell>
              <TableCell align="right">סיבה</TableCell>
              <TableCell align="center">סטטוס</TableCell>
              <TableCell align="right">הערת מנהל</TableCell>
              <TableCell align="center">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req: any) => (
              <TableRow key={req._id} hover>
                <TableCell align="right">
                  <Typography fontWeight="700" color="#2B3674">
                    {req.userId?.firstName} {req.userId?.lastName}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={req.requestedPermission} 
                    size="small" 
                    sx={{ fontWeight: '600', bgcolor: '#E1E9FF', color: '#5770a5ff' }} 
                  />
                </TableCell>
                <TableCell align="right" sx={styles.reasonCell}>
                  {req.reason}
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={req.status === 'pending' ? 'ממתין' : req.status === 'approved' ? 'אושר' : 'נדחה'} 
                    color={req.status === 'approved' ? 'success' : req.status === 'rejected' ? 'error' : 'warning'}
                    variant={req.status === 'pending' ? 'outlined' : 'filled'}
                    sx={{ fontWeight: '700', minWidth: '80px' }}
                  />
                </TableCell>
                <TableCell align="right">
                  {req.status === 'pending' ? (
                    <TextField 
                      size="small" 
                      placeholder="הוסף הערה..."
                      sx={styles.notesField}
                      value={adminNotes[req._id] || ''}
                      onChange={(e) => setAdminNotes({ ...adminNotes, [req._id]: e.target.value })}
                    />
                  ) : (
                    <Typography variant="body2" color="textSecondary">{req.adminNotes || '-'}</Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  {req.status === 'pending' && (
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button 
                        variant="contained" 
                        color="success" 
                        size="small"
                        sx={styles.actionButton('approve')}
                        onClick={() => handleAction(req._id, 'approved')}
                      >
                        אשר
                      </Button>
                      <Button 
                        variant="contained" 
                        color="error" 
                        size="small"
                        sx={styles.actionButton('reject')}
                        onClick={() => handleAction(req._id, 'rejected')}
                      >
                        דחה
                      </Button>
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {requests.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="textSecondary">אין בקשות הרשאה הממתינות לטיפול</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminPermissionRequests;