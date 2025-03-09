import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CityTableRow from '../../../src/components/Table/CityTableRow';
import { City } from '../../../src/types/city';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';

const mockCity: City = {
  id: 1,
  name: 'Paris',
  nameNative: 'Paris',
  country: 'France',
  population: 2148000,
  founded: 300,
  landmarks: ['Eiffel Tower', 'Louvre']
};

describe('CityTableRow', () => {
  it('renders city details correctly', () => {
    render(
      <table>
        <tbody>
          <CityTableRow city={mockCity} />
        </tbody>
      </table>
    );
    
    const cityName = screen.getByTestId('city-name');
    expect(cityName).toHaveTextContent('Paris');

    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('2148000')).toBeInTheDocument();
  });

  it('toggles landmarks row when button is clicked', () => {
    render(
      <table>
        <tbody>
          <CityTableRow city={mockCity} />
        </tbody>
      </table>
    );

    expect(screen.queryByText(/Landmarks:/)).not.toBeInTheDocument();

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Landmarks:/)).toBeInTheDocument();
    expect(screen.getByText(/Eiffel Tower, Louvre/)).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByText(/Landmarks:/)).not.toBeInTheDocument();
  });
});
