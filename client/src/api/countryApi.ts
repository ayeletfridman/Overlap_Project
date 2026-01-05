import api from './apiClient'; 

export const fetchCountries = async () => {
  const { data } = await api.get('/countries');
  return data;
};

export const fetchCountryById = async (id: string) => {
  const { data } = await api.get(`/countries/${id}`);
  return data;
};

export const deleteCountry = async (id: string) => {
  return await api.delete(`/countries/${id}`);
};

export const createCountry = async (countryData: any) => {
  const { data } = await api.post('/countries', countryData);
  return data;
};

export const updateCountry = async (id: string, countryData: any) => {
  const { data } = await api.put(`/countries/${id}`, countryData);
  return data;
};

export const seedCountries = async () => {
  const { data } = await api.get('/countries/seed');
  return data;
};

export const resetCountries = async () => {
  const { data } = await api.get('/countries/reset');
  return data;
};

export const loginUser = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (formData: FormData) => {
  const response = await api.post('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};