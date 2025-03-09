import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { useCities } from '../../src/hooks/useCities';
import Home from '../../src/pages/Home';

vi.mock('../../src/hooks/useCities');

const mockUseCities = useCities as Mock;

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockUseCities.mockReturnValue({ data: null, isLoading: true });

    render(<Home />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders city table with data', async () => {
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

    mockUseCities.mockReturnValue({ data: mockData, isLoading: false });

    render(<Home />);

    expect(screen.getByText(/city navigator/i)).toBeInTheDocument();
    expect(screen.getByTestId('city-name')).toHaveTextContent('Paris');
  });

  it('renders no results message when no cities are found', async () => {
    mockUseCities.mockReturnValue({ data: { cities: [], total: 0 }, isLoading: false });

    render(<Home />);

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('calls handleSearch when search query is provided', async () => {
    mockUseCities.mockReturnValue({ data: null, isLoading: false });

    render(<Home />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'Berlin' } });

    await waitFor(() => {
      expect(mockUseCities).toHaveBeenCalledWith('Berlin', 1, 5, 'ASC');
    });
  });

  it('calls handlePageChange when page is changed', async () => {
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
      total: 10, 
    };

    mockUseCities.mockReturnValue({ data: mockData, isLoading: false });

    render(<Home />);

    const nextPageButton = screen.getByText(/next/i);
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(mockUseCities).toHaveBeenCalledWith('', 2, 5, 'ASC');
    });
  });
});