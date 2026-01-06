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

    pageTitle: {
        fontWeight: '900',
        fontSize: { xs: '2rem', md: '2.5rem' },
        mb: 4,
        color: '#2B3674',
        letterSpacing: '-1.5px',
        width: '100%',
        maxWidth: '1100px', 
        textAlign: 'right',
        px: 1
    } as SxProps<Theme>,

    tablePaper: {
        borderRadius: '20px',
        boxShadow: '0px 10px 30px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '1100px',
        mx: 'auto',
        direction: 'rtl'
    } as SxProps<Theme>,

    tableHeader: {
        bgcolor: '#F4F7FE',
        '& .MuiTableCell-head': {
            color: '#A3AED0',
            fontWeight: '700',
            fontSize: '0.85rem',
            borderBottom: '1px solid #E9EDF7'
        }
    } as SxProps<Theme>,

    reasonCell: {
        maxWidth: 250,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#475467'
    } as SxProps<Theme>,

    // actionButton: (type: 'approve' | 'reject'): SxProps<Theme> => ({
    //     borderRadius: '10px',
    //     fontWeight: '700',
    //     px: 2,
    //     textTransform: 'none',
    //     boxShadow: 'none',
    //     '&:hover': {
    //         boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
    //     }
    // }),

    actionButton: (type: 'approve' | 'reject'): SxProps<Theme> => ({
        borderRadius: '10px',
        fontWeight: '700',
        px: 2,
        textTransform: 'none',
        boxShadow: 'none',
        // אפשר להוסיף צבעים שונים לפי ה-type אם רוצים
        backgroundColor: type === 'approve' ? '#4caf50' : '#f44336', 
        '&:hover': {
            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
            backgroundColor: type === 'approve' ? '#388e3c' : '#d32f2f',
        }
    }),

    notesField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            fontSize: '0.85rem',
            bgcolor: '#f8faff'
        }
    } as SxProps<Theme>
};