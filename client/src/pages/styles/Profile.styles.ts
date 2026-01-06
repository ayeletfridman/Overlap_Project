import { styled } from '@mui/material/styles';
import { Box, Paper, TableCell, Typography,Button } from '@mui/material';

export const ProfileWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#f4f7fe',
  minHeight: '100vh',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
}));

export const ProfileCard = styled(Paper)(() => ({
  borderRadius: '24px',
  boxShadow: '0px 20px 50px rgba(0,0,0,0.05)',
  width: '100%',
  maxWidth: '850px',
  backgroundColor: '#ffffff',
  overflow: 'hidden',
  position: 'relative',
}));

export const ProfileHeaderGradient = styled(Box)(() => ({
  height: '160px',
  background: 'linear-gradient(135deg, #5770a5ff 0%, #3e3858ff 100%)',
  width: '100%',
}));

export const AvatarWrapper = styled(Box)(() => ({
  marginTop: '-60px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '24px',
}));

export const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 4, 4, 4),
}));

export const SectionTitle = styled(Typography)(() => ({
  fontWeight: '800',
  fontSize: '1.2rem',
  color: '#2B3674',
  marginBottom: '20px',
  marginTop: '32px',
  textAlign: 'right',
  borderBottom: '2px solid #f4f7fe',
  paddingBottom: '8px',
}));

export const StyledTableCell = styled(TableCell)(() => ({
  color: '#2B3674',
  fontWeight: '600',
  padding: '12px',
  borderBottom: '1px solid #F1F4F9',
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

export const RequestPermissionBtn = styled(Button)(() => ({
  fontWeight: '800',
  color: '#414c64ff',
  padding: '6px 16px',
  borderRadius: '12px',
  border: '1px dashed #5770a5ff',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f4f7fe',
    borderStyle: 'solid',
    borderColor: '#3e3858ff',
    color: '#302174ff',
  }
}));


export const SectionHeaderWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', 
  position: 'relative',    
  width: '100%',
  marginTop: '32px',
  marginBottom: '16px',
}));

export const SectionTitleCentered = styled(Typography)(() => ({
  fontWeight: '900',
  fontSize: '1.2rem',
  color: '#2B3674',
  textAlign: 'center', 
  width: '100%',
  borderBottom: '2px solid #f4f7fe',
  paddingBottom: '8px',
}));
