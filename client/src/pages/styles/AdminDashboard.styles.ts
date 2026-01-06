import type { SxProps, Theme } from '@mui/material';

export const styles = {
    container: {
        p: { xs: 2, md: 4 },
        backgroundColor: '#f4f7fe',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        width: '100%'
    } as SxProps<Theme>,

    tablePaper: {
        borderRadius: '20px',
        boxShadow: '0px 10px 30px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        border: 'none',
        width: '100%',
        maxWidth: '1000px', 
        mx: 'auto', 
        direction: 'rtl' 
    } as SxProps<Theme>,

    pageTitle: {
        fontWeight: '900',
         fontSize: { xs: '2rem', md: '2.5rem' },
        mb: 6,
        color: '#2B3674',
        letterSpacing: '-0.5px',
        width: '100%',
        maxWidth: '1000px', 
        textAlign: 'right',
        px: 1
    } as SxProps<Theme>,

    tableHeader: {
        bgcolor: '#F4F7FE',
          alignItems: 'center',

        '& .MuiTableCell-head': {
            color: '#A3AED0',
            fontWeight: '700',
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            borderBottom: '1px solid #E9EDF7',
            textAlign: 'center',

        }
    } as SxProps<Theme>,

    userCell: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': { 
            '& .user-name': { color: '#5770a5ff', textDecoration: 'underline' }
        }
    } as SxProps<Theme>,

    checkbox: {
        color: '#CBD5E0',
        '&.Mui-checked': {
            color: '#5770a5ff',
        }
    } as SxProps<Theme>,

    saveButton: {
        bgcolor: '#5770a5ff',
        borderRadius: '12px',
        px: 3,
        fontWeight: '700',
        textTransform: 'none',
        boxShadow: '0px 4px 12px rgba(87, 112, 165, 0.2)',
        '&:hover': {
            bgcolor: '#3e3858ff',
            boxShadow: '0px 6px 15px rgba(62, 56, 88, 0.3)',
        }
    } as SxProps<Theme>
};