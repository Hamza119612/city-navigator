import React from 'react';

interface CityTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CityTablePagination: React.FC<CityTablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div style={{ marginTop: '10px', textAlign: 'center' }}>
    <button 
      onClick={() => onPageChange(currentPage - 1)} 
      disabled={currentPage === 1}
    >
      ⬅ Previous
    </button>
    <span style={{ margin: '0 10px' }}>
      Page {currentPage} of {totalPages}
    </span>
    <button 
      onClick={() => onPageChange(currentPage + 1)} 
      disabled={currentPage >= totalPages}
    >
      Next ➡
    </button>
  </div>
);

export default CityTablePagination;
