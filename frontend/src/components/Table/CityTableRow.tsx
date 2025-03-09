import React, { useState } from "react";
import { City } from "../../types/city";
import "./Table.css";

interface CityTableRowProps {
  city: City;
}

const CityTableRow: React.FC<CityTableRowProps> = ({ city }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRow = () => setIsOpen((prev) => !prev);

  return (
    <>
      <tr className="city-table-row">
        <td className="toggle-cell" data-label="">
          <button
            onClick={toggleRow}
            className="toggle-button"
            aria-label="Toggle landmarks"
          >
            {isOpen ? "➖" : "➕"}
          </button>
        </td>
        <td data-testid="city-name" className="city-name" data-label="City">
          {city.name}
        </td>
        <td className="city-name-native" data-label="Native Name">
          {city.nameNative}
        </td>
        <td className="city-country" data-label="Country">
          {city.country}
        </td>
        <td className="city-population" data-label="Population">
          {city.population}
        </td>
        <td className="city-founded" data-label="Founded">
          {city.founded}
        </td>
      </tr>
      {isOpen && (
        <tr className="city-landmarks-row">
          <td colSpan={6} className="landmarks-cell">
            <strong>Landmarks:</strong> {city.landmarks.join(", ")}
          </td>
        </tr>
      )}
    </>
  );
};

export default CityTableRow;
