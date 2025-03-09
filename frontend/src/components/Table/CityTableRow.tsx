// src/components/CityTableRow.tsx
import React, { useState } from 'react';
import { City } from '../../types/city';

interface CityTableRowProps {
  city: City;
}

const CityTableRow: React.FC<CityTableRowProps> = ({ city }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRow = () => setIsOpen((prev) => !prev);

  return (
    <>
      <tr>
        <td>
          <button onClick={toggleRow}>
            {isOpen ? '➖' : '➕'}
          </button>
        </td>
        <td data-testid="city-name">{city.name}</td>
        <td>{city.nameNative}</td>
        <td>{city.country}</td>
        <td>{city.population}</td>
        <td>{city.founded}</td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={6}>
            <strong>Landmarks:</strong> {city.landmarks.join(', ')}
          </td>
        </tr>
      )}
    </>
  );
};

export default CityTableRow;
