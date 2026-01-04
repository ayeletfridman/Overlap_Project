import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Box, Typography, CircularProgress, Stack, Fade } from '@mui/material';
import { FormWrapper, StyledFormPaper, InputGroup } from './CountryForm.styles';
import { fetchCountryById } from '../api/countryApi';
import { useCountryMutations } from '../api/queries';
import { countryValidationSchema } from '../utils/constant';
import { selectedCountryNameState } from '../store/atoms';
import { useSetRecoilState } from 'recoil';

const CountryForm = () => {
  const { id } = useParams();
  const { saveMutation } = useCountryMutations();
  const setSelectedCountryName = useSetRecoilState(selectedCountryNameState);
  const navigate = useNavigate();

  const { data: country, isLoading } = useQuery({
    queryKey: ['country', id],
    queryFn: () => fetchCountryById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (country) setSelectedCountryName(country.name);
    return () => setSelectedCountryName('');
  }, [country, setSelectedCountryName]);

  const formik = useFormik({
    initialValues: {
      name: country?.name || '',
      flag: country?.flag || '',
      population: country?.population || 0,
      region: country?.region || '',
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