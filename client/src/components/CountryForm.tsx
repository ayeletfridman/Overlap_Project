import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Box, Typography, CircularProgress, Stack, Fade, Chip, IconButton, } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';;
import { FormWrapper, StyledFormPaper, InputGroup } from './styles/CountryForm.styles';
import { fetchCountryById } from '../api/countryApi';
import { useCountryMutations } from '../api/queries';
import { countryValidationSchema } from '../utils/constant';
import { selectedCountryNameState } from '../store/atoms';
import { useSetRecoilState } from 'recoil';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CountryForm = () => {
  const { id } = useParams();
  const { saveMutation } = useCountryMutations();
  const setSelectedCountryName = useSetRecoilState(selectedCountryNameState);
  const navigate = useNavigate();
  const [editingCity, setEditingCity] = useState<{ _id?: string, name: string } | null>(null);
  const [cityInput, setCityInput] = useState('');


  const handleAddCity = (formik: any) => {
    if (cityInput.trim()) {
      formik.setFieldValue('cities', [...formik.values.cities, cityInput.trim()]);
      setCityInput('');
    }
  };

  const handleCityClick = (city: any) => {
    setEditingCity(city);
    setCityInput(typeof city === 'object' ? city.name : city);

    document.getElementById('city-input')?.focus();
  };

  const saveCityEdit = async (formik: any) => {
    if (editingCity) {
      if (editingCity._id) {
        const updatedCities = formik.values.cities.map((c: any) =>
          c._id === editingCity._id ? { ...c, name: cityInput.trim() } : c
        );
        formik.setFieldValue('cities', updatedCities);
      } else {
        const updatedCities = formik.values.cities.map((c: any) =>
          c === editingCity ? cityInput.trim() : c
        );
        formik.setFieldValue('cities', updatedCities);
      }
    }
    setEditingCity(null);
    setCityInput('');
  };


  const { data: country, isLoading } = useQuery({
    queryKey: ['country', id],
    queryFn: () => fetchCountryById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (country) setSelectedCountryName(country.name);
    return () => setSelectedCountryName('');
  }, [country, setSelectedCountryName]);

  interface FormValues {
    name: string;
    flag: string;
    population: number | string;
    region: string;
    cities: (string | { _id: string; name: string })[];
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      name: country?.name || '',
      flag: country?.flag || '',
      population: country?.population || 0,
      region: country?.region || '',
      cities: country?.cities || [],
    },
    enableReinitialize: true,
    validationSchema: countryValidationSchema,
    onSubmit: (values) => {
      saveMutation.mutate({ id, values });
    },
  });

  if (isLoading && id) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress size={50} />
    </Box>
  );

  return (
    <FormWrapper>
      <Fade in={true} timeout={600}>
        <StyledFormPaper elevation={0}>
          <Box textAlign="center" mb={2}>
            <Typography variant="h4" fontWeight="800" color="#2B3674">
              {id ? 'עריכת מדינה' : 'הוספת מדינה'}
            </Typography>
            <Typography variant="body2" color="#A3AED0">
              מלא את הפרטים למטה כדי לעדכן את מאגר המידע
            </Typography>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <InputGroup>
              <TextField
                fullWidth
                label="שם המדינה"
                variant="outlined"
                {...formik.getFieldProps('name')}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && (formik.errors.name as string)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <TextField
                fullWidth
                label="קישור לדגל (URL)"
                {...formik.getFieldProps('flag')}
                error={formik.touched.flag && Boolean(formik.errors.flag)}
                helperText={formik.touched.name && (formik.errors.name as string)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="אוכלוסייה"
                  type="number"
                  {...formik.getFieldProps('population')}
                  error={formik.touched.population && Boolean(formik.errors.population)}
                  helperText={formik.touched.name && (formik.errors.name as string)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
                <TextField
                  fullWidth
                  label="אזור"
                  {...formik.getFieldProps('region')}
                  error={formik.touched.region && Boolean(formik.errors.region)}
                  helperText={formik.touched.name && (formik.errors.name as string)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Stack>

              <Box sx={{ mt: 4 }}>
                <Box sx={{ mt: 3, p: 2, bgcolor: '#F4F7FE', borderRadius: '16px' }}>
                  <Typography variant="subtitle1" fontWeight="700" color="#2B3674" mb={1}>
                    ערים מרכזיוות
                  </Typography>

                  <Stack direction="row" spacing={1} mb={2}>
                    <TextField
                      id="city-input"
                      fullWidth
                      placeholder={editingCity ? "ערוך שם עיר..." : "הוסף עיר..."}
                      size="small"
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          editingCity ? saveCityEdit(formik) : handleAddCity(formik);
                        }
                      }}
                    />
                    <IconButton
                      color="primary"
                      onClick={() => editingCity ? saveCityEdit(formik) : handleAddCity(formik)}
                    >
                      {editingCity ? (
                        <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 35 }} />
                      ) : (
                        <AddCircleIcon sx={{ color: '#5770a5ff', fontSize: 35 }} />
                      )}
                    </IconButton>
                  </Stack>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formik.values.cities.map((city: any, index: number) => (
                      <Chip
                        key={city._id || index}
                        label={typeof city === 'object' ? city.name : city}
                        onClick={() => handleCityClick(city)}
                        onDelete={() => {
                          const newCities = formik.values.cities.filter((_: any, i: number) => i !== index);
                          formik.setFieldValue('cities', newCities);
                        }}
                        sx={{
                          bgcolor: editingCity === city ? '#2B3674' : '#5770a5ff',
                          color: 'white',
                          fontWeight: '600',
                          cursor: 'pointer',
                          border: editingCity === city ? '2px solid #4caf50' : 'none',
                          '& .MuiChip-deleteIcon': { color: 'white' },
                          '&:hover': { bgcolor: '#3a4b8f' }
                        }}
                      />
                    ))}
                    {formik.values.cities.length === 0 && (
                      <Typography variant="caption" color="#A3AED0">טרם נוספו ערים</Typography>
                    )}
                  </Box>

                  {editingCity && (
                    <Button
                      size="small"
                      onClick={() => { setEditingCity(null); setCityInput(''); }}
                      sx={{ mt: 1, color: '#A3AED0' }}
                    >
                      ביטול עריכה
                    </Button>
                  )}
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  size="large"

                  disabled={!formik.dirty || !formik.isValid}
                  sx={{
                    borderRadius: '16px',
                    py: 1.5,
                    fontWeight: '700',
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: '0px 10px 20px rgba(25, 118, 210, 0.2)',
                    backgroundColor: '#5770a5ff'

                  }}
                >
                  שמירת שינויים
                </Button>

                <Button
                  fullWidth
                  color="inherit"
                  onClick={() => navigate('/')}
                  sx={{ mt: 1, fontWeight: '600', textTransform: 'none', color: '#A3AED0' }}
                >
                  חזור לרשימה
                </Button>
              </Box>
            </InputGroup>
          </form>
        </StyledFormPaper>
      </Fade>
    </FormWrapper>
  );
};

export default CountryForm;