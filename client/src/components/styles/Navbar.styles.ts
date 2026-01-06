import type { SxProps, Theme } from '@mui/material';

export const styles = {
    appBar: {
        bgcolor: '#5770a5ff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        top: 0,
        zIndex: 1100,
        px: { xs: 2, md: 4 }
    } as SxProps<Theme>,

    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.02)' }
    } as SxProps<Theme>,

    logoIconBox: {
        bgcolor: '#3e3858ff',
        color: 'white',
        p: 1,
        borderRadius: '12px',
        display: 'flex',
        boxShadow: '0px 4px 20px rgba(67, 24, 255, 0.4)'
    } as SxProps<Theme>,

    navButton: (isActive: boolean): SxProps<Theme> => ({
        fontWeight: '700',
        textTransform: 'none',
        borderRadius: '12px',
        px: 2,
        py: 1,
        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
        bgcolor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }
    }),

    avatar: {
        width: 45,
        height: 45,
        border: '2px solid #3e3858ff',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        '&:hover': { opacity: 0.8 }
    } as SxProps<Theme>,

    logoutIconBtn: {
        color: '#3e3858ff',
        bgcolor: 'rgba(255,255,255,0.9)',
        '&:hover': { bgcolor: '#ffffff', transform: 'translateY(-2px)' },
        transition: 'all 0.2s'
    } as SxProps<Theme>,

    divider: {
        width: '1px',
        height: '30px',
        bgcolor: 'rgba(255,255,255,0.1)',
        mx: 1
    } as SxProps<Theme>
};