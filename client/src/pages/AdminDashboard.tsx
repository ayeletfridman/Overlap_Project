import  { useEffect, useState } from 'react';
import { 
  Box, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Typography, Checkbox, Button, Avatar 
} from '@mui/material';
import { getAllUsers, adminUpdateUser } from '../api/userApi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
    const navigate = useNavigate();


  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error('שגיאה בטעינת משתמשים');
    }
  };

  const handlePermissionChange = (userId: string, field: string, value: boolean) => {
    setUsers(prev => prev.map(user => {
      if (user._id === userId) {
        return {
          ...user,
          permissions: { ...user.permissions, [field]: value }
        };
      }
      return user;
    }));
  };

  const saveChanges = async (user: any) => {
    try {
      await adminUpdateUser(user._id, { 
        permissions: user.permissions,
        role: user.role 
      });
      toast.success(`ההרשאות של ${user.firstName} עודכנו`);
    } catch (error) {
      toast.error('עדכון נכשל');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="800" mb={3} color="#2B3674">
        ניהול הרשאות משתמשים
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: '15px', boxShadow: '0px 10px 30px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F4F7FE' }}>
            <TableRow>
              <TableCell>משתמש</TableCell>
              <TableCell align="center">הוספה</TableCell>
              <TableCell align="center">עריכה</TableCell>
              <TableCell align="center">מחיקה</TableCell>
              <TableCell align="center">אתחול</TableCell>

              <TableCell align="center">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} hover>
               <TableCell>
  <Box 
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2, 
      cursor: 'pointer', 
      '&:hover': { opacity: 0.7 } 
    }}
    onClick={() => navigate(`/profile/${user._id}`)} 
  >
    <Avatar src={`http://localhost:5000/${user.profileImage}`} />
    <Box>
      <Typography fontWeight="600" sx={{ textDecoration: 'underline transparent', '&:hover': { textDecoration: 'underline' } }}>
        {user.firstName} {user.lastName}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {user.email}
      </Typography>
    </Box>
  </Box>
</TableCell>
                <TableCell align="center">
                  <Checkbox 
                    checked={user.permissions?.canAdd || false} 
                    onChange={(e) => handlePermissionChange(user._id, 'canAdd', e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox 
                    checked={user.permissions?.canEdit || false} 
                    onChange={(e) => handlePermissionChange(user._id, 'canEdit', e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox 
                    checked={user.permissions?.canDelete || false} 
                    onChange={(e) => handlePermissionChange(user._id, 'canDelete', e.target.checked)}
                  />
                </TableCell>

                <TableCell align="center">
                  <Checkbox 
                    checked={user.permissions?.canReset || false} 
                    onChange={(e) => handlePermissionChange(user._id, 'canReset', e.target.checked)}
                  />
                </TableCell>
              
                <TableCell align="center">
                  <Button variant="contained" size="small" onClick={() => saveChanges(user)} sx={{ bgcolor: '#5770a5ff' }}>
                    שמור
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;