import { AppBar, Toolbar, Typography, Button, Box, Chip, Stack } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { selectedCountryNameState } from '../store/atoms';
import { useNavigate, useLocation } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
    const selectedCountryName = useRecoilValue(selectedCountryNameState) as string;
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: '#5770a5ff',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                top: 0,
                zIndex: 1100,
                px: { xs: 2, md: 4 }
            }}
        >
            <Toolbar disableGutters sx={{ height: 75, justifyContent: 'space-between' }}>

                <Stack direction="row" alignItems="center" spacing={3}>
                    <Box
                        onClick={() => navigate('/')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.02)' }
                        }}
                    >
                        <Box sx={{
                            bgcolor: '#3e3858ff',
                            color: 'white',
                            p: 1,
                            borderRadius: '12px',
                            display: 'flex',
                            boxShadow: '0px 4px 20px rgba(67, 24, 255, 0.4)'
                        }}>
                            <PublicIcon fontSize="medium" />
                        </Box>
                        <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: '-1px' }}>
                            COUNTRIES<span style={{ color: '#3e3858ff' }}>HUB</span>
                        </Typography>
                    </Box>

                    {selectedCountryName && (
                        <Chip
                            label={`עריכת: ${selectedCountryName}`}
                            size="small"
                            sx={{
                                fontWeight: '700',
                                bgcolor: '#3e3858ff',
                                color: 'white',
                                border: '1px solid rgba(117, 81, 255, 0.3)',
                                borderRadius: '8px',
                                px: 1,
                                display: { xs: 'none', sm: 'flex' },
                                direction: 'rtl',
                                unicodeBidi: 'plaintext',
                                '& .MuiChip-label': {
                                    display: 'block',
                                    direction: 'rtl',
                                }
                            }}
                        />
                    )}
                </Stack>

                <Box>
                    <Button
                        startIcon={<HomeIcon />}
                        onClick={() => navigate('/')}
                        sx={{
                            fontWeight: '700',
                            textTransform: 'none',
                            borderRadius: '12px',
                            px: 3,
                            py: 1,
                            fontSize: '1rem',
                            color: isHomePage ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                            bgcolor: isHomePage ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            border: isHomePage ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                color: '#ffffff'
                            }
                        }}
                    >
                        דף הבית
                    </Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;