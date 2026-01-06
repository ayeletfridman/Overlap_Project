import type { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f4f7fe 0%, #e1e9ff 100%)',
    py: 6
  } as SxProps<Theme>,

  paper: {
    p: 4,
    borderRadius: '24px',
    boxShadow: '0px 20px 50px rgba(0,0,0,0.05)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)'
  } as SxProps<Theme>,

  title: {
    fontWeight: 900,
    color: '#3e3858ff',
    mb: 1,
    letterSpacing: '-1px'
  } as SxProps<Theme>,

  subtitle: {
    color: 'rgba(0,0,0,0.5)',
    mb: 4,
    textAlign: 'center'
  } as SxProps<Theme>,

  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#f8faff',
      '& fieldset': { borderColor: '#e0e5f2' },
      '&:hover fieldset': { borderColor: '#5770a5ff' },
      '&.Mui-focused fieldset': { borderColor: '#3e3858ff' }
    }
  } as SxProps<Theme>,

  submitButton: {
    mt: 4,
    py: 1.5,
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '1rem',
    background: 'linear-gradient(135deg, #5770a5ff 0%, #3e3858ff 100%)',
    boxShadow: '0px 10px 20px rgba(67, 24, 255, 0.23)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0px 12px 25px rgba(67, 24, 255, 0.3)'
    },
    transition: 'all 0.3s ease'
  } as SxProps<Theme>,

  fileInputWrapper: {
    mt: 2,
    p: 2,
    borderRadius: '12px',
    border: '2px dashed #e0e5f2',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': { bgcolor: '#f0f4ff' }
  } as SxProps<Theme>
};