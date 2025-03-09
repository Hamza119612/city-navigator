import { describe, it, expect, vi, Mocked } from 'vitest';
import axios from 'axios';
import { fetchCities, fetchCityById, searchCities } from '../../src/services/cityService';
import { City } from '../../src/types/city';

vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

describe('cityService', () => {
  const mockCity: City = {
    id: 1,
    name: 'Paris',
    nameNative: 'Paris',
    country: 'France',
    population: 2148000,
    founded: 300,
    landmarks: ['Eiffel Tower'],
  };

  const mockCitiesResponse = {
    cities: [mockCity],
    total: 1,
  };

  it('fetchCities should fetch cities with correct parameters', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockCitiesResponse });

    const result = await fetchCities(1, 10, 'ASC');

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3333/cities', {
      params: { offset: 0, limit: 10, sort: 'ASC' },
    });
    expect(result).toEqual(mockCitiesResponse);
  });

  it('fetchCityById should fetch city by ID', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockCity });

    const result = await fetchCityById(1);

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3333/cities/1');
    expect(result).toEqual(mockCity);
  });

  it('searchCities should search cities with correct parameters', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockCitiesResponse });

    const result = await searchCities('Paris', 1, 10, 'ASC');

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3333/cities/search', {
      params: { q: 'Paris', offset: 0, limit: 10, sort: 'ASC' },
    });
    expect(result).toEqual(mockCitiesResponse);
  });
});