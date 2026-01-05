import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline, Typography, Button, Box } from '@mui/material';
import { useRecoilValue } from 'recoil'; 
import { authState } from './store/authAtoms'; 
import Profile from './pages/Profile';
import CountryTable from './components/CountryTable';
import CountryForm from './components/CountryForm'; 
import Navbar from './components/Navbar';
import Login from './pages/login'; 
import SignUp from './pages/signUp';
import AdminDashboard from './pages/AdminDashboard'; 
import ResetPassword from './pages/ResetPassword';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const auth = useRecoilValue(authState);
  
  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
    const auth = useRecoilValue(authState);

  return (
    
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <CssBaseline />
      <Navbar />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={
            <AuthGuard>
              <CountryTable />
            </AuthGuard>
          } />          
          
          <Route 
    path="/profile" 
    element={
      <AuthGuard>
        <Profile />
      </AuthGuard>
    } 
  />

  <Route path="/profile/:id" element={<AuthGuard><Profile /></AuthGuard>} />

  <Route 
  path="/admin" 
  element={
    <AuthGuard>
      {auth.user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
    </AuthGuard>
  } 
/>
          <Route path="/add" element={
            <AuthGuard>
              <CountryForm />
            </AuthGuard>
          } />         
          
          <Route path="/edit/:id" element={
            <AuthGuard>
              <CountryForm />
            </AuthGuard>
          } />

          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="*" element={
            <Box textAlign="center" mt={10}>
              <Typography variant="h4">הדף לא נמצא</Typography>
              <Button href="/" sx={{ mt: 2 }} variant="contained">חזרה לבית</Button>
            </Box>
          } />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;