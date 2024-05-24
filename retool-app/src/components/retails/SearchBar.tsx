import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (zipCode: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [zipCode, setZipCode] = useState('');

  const handleSearch = () => {
    onSearch(zipCode);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-md"
        placeholder="Enter zip code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 ml-2 rounded-md"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
