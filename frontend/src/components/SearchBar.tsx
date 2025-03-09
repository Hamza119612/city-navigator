import React, { useState, useDeferredValue, useEffect } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    onSearch(deferredQuery);
  }, [deferredQuery, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search City..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search-bar-input"
    />
  );
};

export default SearchBar;
