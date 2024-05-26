import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  loading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage, loading }) => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        className="bg-gray-500 text-white rounded-lg p-3"
        disabled={currentPage === 1 || loading}
      >
        Previous
      </button>
      <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        className="bg-gray-500 text-white rounded-lg p-3"
        disabled={currentPage === totalPages || loading}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
