import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline, Typography, Button, Box } from '@mui/material';
import { useRecoilValue } from 'recoil'; 
import { authState } from './store/authAtoms'; 

import CountryTable from './components/CountryTable';
import CountryForm from './components/CountryForm'; 
import Navbar from './components/Navbar';
import Login from './pages/login'; 
import SignUp from './pages/signUp'; 

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const auth = useRecoilValue(authState);
  
  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
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

          {/* דף 404 */}
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