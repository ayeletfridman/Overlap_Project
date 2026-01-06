import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const FormWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#f4f7fe', 
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center',
  justifyContent: 'flex-start', 
  paddingTop: theme.spacing(8), 
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  margin: 0, 
}));

export const StyledFormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: '24px',
  boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.04)',
  width: '100%',
  maxWidth: '500px', 
  border: '1px solid #f0f0f0',
  backgroundColor: '#ffffff', 
}));

export const InputGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
}));