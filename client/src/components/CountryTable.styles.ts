import { styled } from '@mui/material/styles';
import { Paper, Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const PageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#f4f7fe',
  minHeight: '100vh',
  padding: theme.spacing(4),
}));

export const StyledTableContainer = styled(Paper)(() => ({
  borderRadius: '20px',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
  border: 'none',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
}));

export const StyledDataGrid = styled(DataGrid)(() => ({
  border: 'none',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#FAFBFF',
    borderBottom: '1px solid #F1F4F9',
    color: '#A3AED0',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '0.75rem',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid #F1F4F9',
    color: '#3e3858ff',
    fontWeight: '500',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#F7F9FF',
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: 'none',
  },
}));

export const StatCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.03)',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  flex: 1,
}));