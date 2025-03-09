import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useCities } from "../hooks/useCities";
import CityTable from "../components/Table/CityTable";
import SearchBar from "../components/SearchBar";
import "../App.css";
const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading } = useCities(searchQuery, page, pageSize, "ASC");

  const totalPages = useMemo(
    () => (data ? Math.ceil(data.total / pageSize) : 1),
    [data, pageSize]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
        setPage(newPage);
      }
    },
    [totalPages]
  );

  const handleSearch = useCallback(
    (query: string) => {
      if (query === searchQuery) return;
      setSearchQuery(query);
      setPage(1);
    },
    [searchQuery]
  );

  return (
    <div className="home-container">
      <h1>City Navigator</h1>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <p>Loading...</p>}
      {data && data.cities.length === 0 && !isLoading && (
        <p>No results found for "{searchQuery}".</p>
      )}
      {data && (
        <CityTable
          cities={data.cities}
          pagination={{ total: data.total, currentPage: page, pageSize }}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;
