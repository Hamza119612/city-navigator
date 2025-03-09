import React from "react";
import CityTableRow from "./CityTableRow";
import CityTablePagination from "./CityTablePagination";
import { City } from "../../types/city";
import "./Table.css";

interface CityTableProps {
  cities: City[];
  pagination: {
    total: number;
    currentPage: number;
    pageSize: number;
  };
  onPageChange: (page: number) => void;
}

const CityTable: React.FC<CityTableProps> = ({
  cities,
  pagination,
  onPageChange,
}) => {
  const { total, currentPage, pageSize } = pagination;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="table-container">
      <table className="city-table">
        <thead>
          <tr>
            <th></th>
            <th>City</th>
            <th>Native Name</th>
            <th>Country</th>
            <th>Population</th>
            <th>Founded</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <CityTableRow key={city.id} city={city} />
          ))}
        </tbody>
      </table>
      <CityTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default CityTable;
