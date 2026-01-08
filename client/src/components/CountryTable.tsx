import { type GridColDef } from '@mui/x-data-grid';
import { Button, CircularProgress, Box, Typography, IconButton, Stack, Avatar, Chip, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router-dom';
import { PageWrapper, StyledTableContainer, StyledDataGrid, PageTitle } from './styles/CountryTable.styles';
import { useCountries, useCountryMutations } from '../api/queries/country';
import { useRecoilValue } from 'recoil';
import { authState } from '../store/authAtoms';

const CountryTable = () => {
  const { handleDelete, seedMutation } = useCountryMutations();
  const { data: countries, isLoading } = useCountries();
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  console.log("User Permissions:", auth.user?.permissions);
  console.log("User Role:", auth.user?.role);

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
      field: 'cities',
      headerName: 'ערים מרכזיות',
      width: 250,
      renderCell: (params) => {
        const cities = params.row.cities || [];
        if (cities.length === 0) return <Typography variant="caption" color="text.disabled">אין ערים</Typography>;
        const displayCities = cities.slice(0, 2);
        const remainingCount = cities.length - 2;

        return (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'nowrap', alignItems: 'center', height: '100%' }}>
            {displayCities.map((city: any) => (
              <Chip
                key={typeof city === 'object' ? city._id : city}
                label={typeof city === 'object' ? city.name : city}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  borderColor: '#E0E5F2',
                  color: '#2B3674',
                  maxWidth: '80px'
                }}
              />
            ))}
            {remainingCount > 0 && (
              <Tooltip title={cities.slice(2).map((c: any) => (typeof c === 'object' ? c.name : c)).join(', ')}>
                <Chip
                  label={`+${remainingCount}`}
                  size="small"
                  sx={{ bgcolor: '#F4F7FE', color: '#5770a5ff', fontSize: '0.70rem', fontWeight: 'bold' }}
                />
              </Tooltip>
            )}
          </Box>
        );
      }
    },

    {
      field: 'actions',
      headerName: 'פעולות',
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {auth.user?.permissions?.canEdit && (<IconButton size="small" color="primary" onClick={() => navigate(`/edit/${params.row._id}`)}><EditIcon /></IconButton>)}
          {auth.user?.permissions?.canDelete && (<IconButton size="small" color="error" onClick={() => handleDelete(params.row._id)}><DeleteIcon /></IconButton>)}
        </Stack>
      ),
    },
  ];

  if (isLoading) return <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>;

  return (
    <PageWrapper>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <PageTitle variant="h4" fontWeight="800" color="#2B3674">ניהול מדינות</PageTitle>
          <Typography variant="body2" color="#A3AED0">רשימת המדינות המעודכנת במערכת</Typography>
        </Box>

        <Stack direction="row" spacing={2}>

          {auth.user?.permissions?.canReset && (
            <Button
              variant="outlined"
              startIcon={seedMutation.isPending ? <CircularProgress size={20} /> : <RefreshIcon />}
              onClick={() => seedMutation.mutate()}
              sx={{ borderRadius: '12px', textTransform: 'none', color: '#5770a5ff', '& .MuiButton-startIcon': { marginLeft: '6px' } }}
            >
              אתחול נתונים
            </Button>)}

          {auth.user?.permissions?.canAdd && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/add')}
              sx={{ borderRadius: '12px', textTransform: 'none', px: 3, color: '#f0eef5ff', backgroundColor: '#5770a5ff', '& .MuiButton-startIcon': { marginLeft: '6px' } }}
            >
              הוספת מדינה
            </Button>)}
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