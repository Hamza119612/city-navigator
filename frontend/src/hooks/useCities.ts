import { useQuery } from 'react-query';
import { fetchCities, searchCities } from '../services/cityService';
import { City } from '../types/city';

export const useCities = (
  query: string,
  page: number,
  limit = 10,
  sort = 'ASC'
) => {
  return useQuery<{ cities: City[]; total: number }>(
    ['cities', query, page, limit, sort],
    () =>
      query.length > 0
        ? searchCities(query, page, limit, sort)
        : fetchCities(page, limit, sort),
    {
      keepPreviousData: true,
      staleTime: 5000,
      refetchOnWindowFocus: false,
    }
  );
};
