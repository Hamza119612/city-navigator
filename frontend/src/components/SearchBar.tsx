import React, { useState, useDeferredValue, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
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
      style={{
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        marginBottom: '10px',
      }}
    />
  );
};

export default SearchBar;
