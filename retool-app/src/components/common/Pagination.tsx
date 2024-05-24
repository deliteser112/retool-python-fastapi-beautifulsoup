import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
}> = ({ children, onClick, disabled, isActive = false }) => {
  return (
    <button
      className={`py-2 px-4 rounded-full ${
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'hover:bg-gray-300'
      } ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-1">
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        {'<'}
      </PaginationButton>
      {pages.map((page) => (
        <PaginationButton
          key={page}
          onClick={() => onPageChange(page)}
          isActive={page === currentPage}
          aria-label={`Page ${page}`}
        >
          {page}
        </PaginationButton>
      ))}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        {'>'}
      </PaginationButton>
    </div>
  );
};

export default Pagination;
