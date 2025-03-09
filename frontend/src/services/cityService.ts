import axios from 'axios';
import { City } from '../types/city';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

export const fetchCities = async (
  page: number,
  limit = 10,
  sort = 'ASC'
): Promise<{ cities: City[]; total: number }> => {
  const offset = (page - 1) * limit;
  const response = await axios.get(`${API_URL}/cities`, {
    params: { offset, limit, sort },
  });
  return response.data;
};

export const fetchCityById = async (id: number) => {
  const response = await axios.get(`${API_URL}/cities/${id}`);
  return response.data;
};

export const searchCities = async (
  query: string,
  page: number,
  limit = 10,
  sort = 'ASC'
): Promise<{ cities: City[]; total: number }> => {
  const offset = (page - 1) * limit;
  const response = await axios.get(`${API_URL}/cities/search`, {
    params: { q: query, offset, limit, sort },
  });
  return response.data;
};
