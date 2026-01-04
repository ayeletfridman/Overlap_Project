import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/countries',
});

export const fetchCountries = async () => {
  const { data } = await api.get('/');
  return data;
}; 

export const fetchCountryById = async (id: string) => {
  const { data } = await api.get(`/${id}`);
  return data;
}; 

export const deleteCountry = async (id: string) => {
  return await api.delete(`/${id}`);
};

export const createCountry = async (countryData: any) => {
  const { data } = await api.post('/', countryData);
  return data;
};

export const updateCountry = async (id: string, countryData: any) => {
  const { data } = await api.put(`/${id}`, countryData);
  return data;
};

export const seedCountries = async () => {
  const { data } = await api.get('/seed');
  return data;
};

export const resetCountries = async () => {
  const { data } = await api.get('/reset');
  return data;
};