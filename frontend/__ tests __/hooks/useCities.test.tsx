/// <reference types="vitest" />
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { describe, it, expect, afterEach, vi, Mock } from 'vitest';
import { useCities } from '../../src/hooks/useCities';
import * as cityService from '../../src/services/cityService';

vi.mock('../../src/services/cityService');

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('useCities hook', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls fetchCities when search query is empty', async () => {
    const mockData = {
      cities: [
        {
          id: 1,
          name: 'Paris',
          nameNative: 'Paris',
          country: 'France',
          population: 2148000,
          founded: 300,
          landmarks: ['Eiffel Tower'],
        },
      ],
      total: 1,
    };

    (cityService.fetchCities as Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useCities('', 1, 5, 'ASC'), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    }, { timeout: 3000 });

    expect(cityService.fetchCities).toHaveBeenCalledTimes(1);
    expect(cityService.searchCities).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(mockData);
  });

  it('calls searchCities when a search query is provided', async () => {
    const mockData = {
      cities: [
        {
          id: 2,
          name: 'London',
          nameNative: 'London',
          country: 'UK',
          population: 8908081,
          founded: 43,
          landmarks: ['Big Ben'],
        },
      ],
      total: 1,
    };

    (cityService.searchCities as Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useCities('London', 1, 5, 'ASC'), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    }, { timeout: 3000 });

    expect(cityService.searchCities).toHaveBeenCalledTimes(1);
    expect(cityService.fetchCities).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(mockData);
  });
});
