import { AppBar, Toolbar, Typography, Box, Stack, Button, Chip, Avatar, IconButton, Tooltip } from '@mui/material';
import { useRecoilValue , useRecoilState} from 'recoil';
import { selectedCountryNameState } from '../store/atoms';
import { authState } from '../store/authAtoms';
import { useNavigate, useLocation } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const selectedCountryName = useRecoilValue(selectedCountryNameState) as string;
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
    navigate('/login');
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    const cleanPath = path.replace(/\\/g, '/');
    return `http://localhost:5000/${cleanPath}`;
  };

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
                            }}
                        />
                    )}
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                    
                    <Button
                        startIcon={<HomeIcon />}
                        onClick={() => navigate('/')}
                        sx={{
                            fontWeight: '700',
                            textTransform: 'none',
                            borderRadius: '12px',
                            px: 2,
                            py: 1,
                            color: isHomePage ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                            bgcolor: isHomePage ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }
                        }}
                    >
                        דף הבית
                    </Button>

                    <Box sx={{ width: '1px', height: '30px', bgcolor: 'rgba(255,255,255,0.1)', mx: 1 }} />

                    {auth.user ? (
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: '800', lineHeight: 1 }}>
                                    {auth.user.firstName} {auth.user.lastName}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                    מחובר
                                </Typography>
                            </Box>
                            
                            <Avatar 
                                src={getImageUrl(auth.user.profileImage)}
                                sx={{ 
                                    width: 45, 
                                    height: 45, 
                                    border: '2px solid #3e3858ff',
                                    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)'
                                }}
                            >
                                {auth.user.firstName[0]}
                            </Avatar>

                            <Tooltip title="התנתקות">
                                <IconButton 
                                    onClick={handleLogout}
                                    sx={{ 
                                        color: '#3e3858ff', 
                                        bgcolor: 'rgba(255,255,255,0.9)',
                                        '&:hover': { bgcolor: '#ffffff', transform: 'translateY(-2px)' },
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <LogoutIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    ) : (
                        <Button 
                            variant="contained" 
                            onClick={() => navigate('/login')}
                            sx={{ bgcolor: '#3e3858ff', borderRadius: '10px' }}
                        >
                            התחברות
                        </Button>
                    )}
                </Stack>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;