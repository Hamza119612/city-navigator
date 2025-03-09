import axios from 'axios';
import { City } from '../types/city';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

interface CitiesResponse {
  cities: City[];
  total: number;
}

const getOffset = (page: number, limit: number): number => (page - 1) * limit;

export const fetchCities = async (
  page: number,
  limit = 10,
  sort = 'ASC'
): Promise<CitiesResponse> => {
  try {
    const offset = getOffset(page, limit);
    const { data } = await axios.get<CitiesResponse>(`${API_URL}/cities`, {
      params: { offset, limit, sort },
    });
    return data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const fetchCityById = async (id: number): Promise<City> => {
  try {
    const { data } = await axios.get<City>(`${API_URL}/cities/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching city with ID ${id}:`, error);
    throw error;
  }
};

export const searchCities = async (
  query: string,
  page: number,
  limit = 10,
  sort = 'ASC'
): Promise<CitiesResponse> => {
  try {
    const offset = getOffset(page, limit);
    const { data } = await axios.get<CitiesResponse>(`${API_URL}/cities/search`, {
      params: { q: query, offset, limit, sort },
    });
    return data;
  } catch (error) {
    console.error(`Error searching cities with query "${query}":`, error);
    throw error;
  }
};