import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CityTable from '../../../src/components/Table/CityTable';
import { City } from '../../../src/types/city';
import { describe, expect, it, vi } from 'vitest';

const mockCities: City[] = [
  { id: 1, name: 'Paris', nameNative: 'Paris', country: 'France', population: 2148000, founded: 300, landmarks: ['Eiffel Tower'] },
  { id: 2, name: 'London', nameNative: 'London', country: 'UK', population: 8908081, founded: 43, landmarks: ['Big Ben'] }
];

describe('CityTable Component', () => {
  const onPageChange = vi.fn();
  const pagination = {
    total: 10,
    currentPage: 1,
    pageSize: 2
  };

  it('renders city rows and pagination correctly', () => {
    const { getAllByText, getByText } = render(
      <CityTable
        cities={mockCities}
        pagination={pagination}
        onPageChange={onPageChange}
      />
    );

    const parisElements = getAllByText('Paris');
    expect(parisElements.length).toBeGreaterThan(0);

    const londonElements = getAllByText('London');
    expect(londonElements.length).toBeGreaterThan(0);

    expect(getByText(/Page 1 of 5/i)).toBeInTheDocument();
  });

  it('calls onPageChange when Next button is clicked', () => {
    const { getByText } = render(
      <CityTable
        cities={mockCities}
        pagination={pagination}
        onPageChange={onPageChange}
      />
    );

    const nextButton = getByText(/Next ➡/i);
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
