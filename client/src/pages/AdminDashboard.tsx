import { useEffect, useState } from 'react';
import { 
  Box, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Typography, Checkbox,  Avatar 
} from '@mui/material';
import { getAllUsers, adminUpdateUser, getUserById } from '../api/userApi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles/AdminDashboard.styles'; 

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

  const handlePermissionChange = async (userId: string, field: string, value: boolean) => {
  const userToUpdate = users.find(u => u._id === userId);
  const updatedPermissions = { ...userToUpdate.permissions, [field]: value };

  setUsers(prev => prev.map(user => 
    user._id === userId ? { ...user, permissions: updatedPermissions } : user
  ));

 const user= await getUserById(userId);
  try {
    await adminUpdateUser(userId, { 
      permissions: updatedPermissions,
      role: userToUpdate.role 
    });
    toast.success(`ההרשאות של ${user.firstName} עודכנו בהצלחה`);
  } catch (error) {
    toast.error('שגיאה בעדכון');
  }
};

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.pageTitle}>
        ניהול הרשאות משתמשים
      </Typography>

      <TableContainer component={Paper} sx={styles.tablePaper}>
        <Table>
          <TableHead sx={styles.tableHeader}>
            <TableRow>
              <TableCell>משתמש</TableCell>
              <TableCell align="center">הוספה</TableCell>
              <TableCell align="center">עריכה</TableCell>
              <TableCell align="center">מחיקה</TableCell>
              <TableCell align="center">אתחול</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Box sx={styles.userCell} onClick={() => navigate(`/profile/${user._id}`)}>
                    <Avatar 
                      src={`http://localhost:5000/${user.profileImage}`} 
                      sx={{ width: 40, height: 40, border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                    />
                    <Box>
                      <Typography className="user-name" fontWeight="700" color="#2B3674">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#A3AED0', fontWeight: '500' }}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                {['canAdd', 'canEdit', 'canDelete', 'canReset'].map((field) => (
                  <TableCell align="center" key={field}>
                    <Checkbox 
                      sx={styles.checkbox}
                      checked={user.permissions?.[field] || false} 
                      onChange={(e) => handlePermissionChange(user._id, field, e.target.checked)}
                    />
                  </TableCell>
                ))}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;