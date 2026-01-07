import api from './apiClient';
export const updateCity = async (id: string, name: string) => {
  const response = await api.put(`/cities/${id}`, { name });
  return response.data;
};

export const deleteCity = async (id: string) => {
  await api.delete(`/cities/${id}`);
};