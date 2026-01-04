import {  type GridColDef } from '@mui/x-data-grid';
import { Button, CircularProgress, Box, Typography, IconButton, Stack, Avatar  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router-dom';
import { PageWrapper, StyledTableContainer, StyledDataGrid } from './CountryTable.styles';
import { useCountries, useCountryMutations } from '../api/queries';

const CountryTable = () => {
  const { handleDelete, seedMutation} = useCountryMutations();
  const { data: countries, isLoading} = useCountries();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { 
      field: 'flag', 
      headerName: 'דגל', 
      width: 100,
      renderCell: (params) => <Avatar src={params.value} variant="rounded" sx={{ width: 40, height: 28, mt: 1 }} />
    },
    { field: 'name', headerName: 'שם המדינה', flex: 1 },
    { field: 'population', headerName: 'אוכלוסייה', width: 150, valueFormatter: (value: number) => value?.toLocaleString() },
    { field: 'region', headerName: 'אזור', width: 150 },
    {
      field: 'actions',
      headerName: 'פעולות',
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary" onClick={() => navigate(`/edit/${params.row._id}`)}><EditIcon /></IconButton>
          <IconButton size="small" color="error" onClick={() => handleDelete(params.row._id)}><DeleteIcon /></IconButton>
        </Stack>
      ),
    },
  ];

  if (isLoading) return <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>;

  return (
    <PageWrapper>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="800" color="#2B3674">ניהול מדינות</Typography>
          <Typography variant="body2" color="#A3AED0">רשימת המדינות המעודכנת במערכת</Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined" 
            startIcon={seedMutation.isPending ? <CircularProgress size={20} /> : <RefreshIcon />}
            onClick={() => seedMutation.mutate()}
            sx={{ borderRadius: '12px', textTransform: 'none' , color: '#5770a5ff'}}
          >
            אתחול נתונים
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={() => navigate('/add')}
            sx={{ borderRadius: '12px', textTransform: 'none', px: 3 ,color: '#f0eef5ff', backgroundColor: '#5770a5ff' }}
          >
            הוספת מדינה
          </Button>
        </Stack>
      </Box>

      <StyledTableContainer>
        <StyledDataGrid
          rows={countries || []}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 25]}
          disableRowSelectionOnClick
          autoHeight
        />
      </StyledTableContainer>
    </PageWrapper>
  );
};

export default CountryTable;