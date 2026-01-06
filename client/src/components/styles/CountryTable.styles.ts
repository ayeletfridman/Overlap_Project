import { styled } from '@mui/material/styles';
import { Paper, Box, Card,Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const PageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#f4f7fe',
  minHeight: '100vh',
  padding: theme.spacing(4),
  alignItems: 'center',
  display: 'flex',       
  flexDirection: 'column',
  '& > *': {
    width: '100%',
    maxWidth: '1100px',
    direction: 'rtl',  
  },
  '& .MuiStack-root': {
    gap: '24px !important',
  },

}));

export const StyledTableContainer = styled(Paper)(() => ({
  borderRadius: '20px',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
  border: 'none',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  maxWidth: '1100px',
  mx: 'auto', 
  margin: '0 auto',
  width: '100%',
        
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
    alignItems: 'center',
    
    
  },

  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#F7F9FF',
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: 'none',
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
     justifyContent: 'center', 
  },
  '& .MuiDataGrid-cell': {
     display: 'flex',
     justifyContent: 'center', 
     alignItems: 'center',

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
export const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: '800',
  color: '#2B3674',
  fontSize: '2rem', 
  
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem', 
  },
  marginBottom: '8px',
  textAlign: 'right',
}));
