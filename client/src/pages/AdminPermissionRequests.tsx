import  { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Chip, TextField, Stack 
} from '@mui/material';
import { getAllAdminRequests, updateRequestStatus } from '../api/permissionApi';
import { toast } from 'react-hot-toast';

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="800" mb={4} color="#2B3674">
        ניהול בקשות הרשאה
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: '20px', boxShadow: '0px 10px 30px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F4F7FE' }}>
            <TableRow>
              <TableCell><b>משתמש</b></TableCell>
              <TableCell><b>הרשאה מבוקשת</b></TableCell>
              <TableCell><b>סיבה</b></TableCell>
              <TableCell><b>סטטוס</b></TableCell>
              <TableCell><b>הערת מנהל</b></TableCell>
              <TableCell align="center"><b>פעולות</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req: any) => (
              <TableRow key={req._id}>
                <TableCell>{req.userId?.firstName} {req.userId?.lastName}</TableCell>
                <TableCell>
                  <Chip label={req.requestedPermission} size="small" variant="outlined" />
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }}>{req.reason}</TableCell>
                <TableCell>
                  <Chip 
                    label={req.status === 'pending' ? 'ממתין' : req.status === 'approved' ? 'אושר' : 'נדחה'} 
                    color={req.status === 'approved' ? 'success' : req.status === 'rejected' ? 'error' : 'warning'}
                  />
                </TableCell>
                <TableCell>
                  {req.status === 'pending' ? (
                    <TextField 
                      size="small" 
                      placeholder="הערה (אופציונלי)"
                      value={adminNotes[req._id] || ''}
                      onChange={(e) => setAdminNotes({ ...adminNotes, [req._id]: e.target.value })}
                    />
                  ) : (
                    req.adminNotes
                  )}
                </TableCell>
                <TableCell align="center">
                  {req.status === 'pending' && (
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button 
                        variant="contained" 
                        color="success" 
                        size="small"
                        onClick={() => handleAction(req._id, 'approved')}
                      >
                        אשר
                      </Button>
                      <Button 
                        variant="contained" 
                        color="error" 
                        size="small"
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
                <TableCell colSpan={6} align="center">אין בקשות הרשאה כרגע</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminPermissionRequests;