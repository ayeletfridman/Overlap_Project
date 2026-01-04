import { Routes, Route} from 'react-router-dom';
import { Container, CssBaseline, Typography, Button, Box } from '@mui/material';

import CountryTable from './components/CountryTable';
import CountryForm from './components/CountryForm'; 
import Navbar from './components/Navbar'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <CssBaseline />
      <Navbar />
      
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<CountryTable />} />          
          <Route path="/add" element={<CountryForm />} />         
          <Route path="/edit/:id" element={<CountryForm />} />
          <Route path="*" element={
            <Box textAlign="center" mt={10}>
              <Typography variant="h4">הדף לא נמצא</Typography>
              <Button href="/" sx={{ mt: 2 }}>חזרה לבית</Button>
            </Box>
          } />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;