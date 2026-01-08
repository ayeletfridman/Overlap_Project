import api from './apiClient'; 
import type { Country, CountryFormValues } from '../types/country.types';
import type { AxiosResponse } from 'axios';

export const fetchCountries = async (): Promise<Country[]> => {
  const { data } = await api.get<Country[]>('/countries');
  return data;
};

export const fetchCountryById = async (id: string): Promise<Country> => {
  const { data } = await api.get<Country>(`/countries/${id}`);
  return data;
};

export const deleteCountry = async (id: string): Promise<AxiosResponse> => {
  return await api.delete(`/countries/${id}`);
};

export const createCountry = async (countryData: CountryFormValues): Promise<Country> => {
  const { data } = await api.post<Country>('/countries', countryData);
  return data;
};

export const updateCountry = async (id: string, countryData: CountryFormValues): Promise<Country> => {
  const { data } = await api.put<Country>(`/countries/${id}`, countryData);
  return data;
};

export const seedCountries = async (): Promise<Country[]> => {
  const { data } = await api.get<Country[]>('/countries/seed');
  return data;
};

export const resetCountries = async (): Promise<Country[]> => {
  const { data } = await api.get<Country[]>('/countries/reset');
  return data;
};