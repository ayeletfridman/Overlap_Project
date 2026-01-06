import { TableContainer, Table, TableHead, TableRow, TableBody, Chip, Paper, Box } from '@mui/material';
import { StyledTableCell, SectionTitle } from '../pages/styles/Profile.styles';


export const PermissionHistory = ({ requests }: { requests: any[] }) => (
  <Box sx={{ width: '100%', mt: 2 }}>
    <SectionTitle>היסטוריית בקשות הרשאה</SectionTitle>
    <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: 'none', border: '1px solid #eef2f6' }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f9faff' }}>
          <TableRow>
            <StyledTableCell align="right">הרשאה מבוקשת</StyledTableCell>
            <StyledTableCell align="center">סטטוס</StyledTableCell>
            <StyledTableCell align="right">תאריך</StyledTableCell>
            <StyledTableCell align="right">הערות</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req._id} hover>
              <StyledTableCell align="right">{req.requestedPermission}</StyledTableCell>
              <StyledTableCell align="center">
                <Chip 
                  label={req.status === 'pending' ? 'בטיפול' : req.status === 'approved' ? 'אושר' : 'נדחה'} 
                  color={req.status === 'approved' ? 'success' : req.status === 'rejected' ? 'error' : 'warning'}
                  variant="filled"
                  size="small"
                  sx={{ fontWeight: 'bold', minWidth: '80px' }}
                />
              </StyledTableCell>
              <StyledTableCell align="right">{new Date(req.createdAt).toLocaleDateString('he-IL')}</StyledTableCell>
              <StyledTableCell align="right" sx={{ color: '#A3AED0', fontSize: '0.85rem' }}>
                {req.adminNotes || '-'}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);