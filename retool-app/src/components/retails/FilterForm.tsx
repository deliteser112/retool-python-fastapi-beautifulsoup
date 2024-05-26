import React, { ChangeEvent, FormEvent } from 'react';

interface FilterFormProps {
    zipCode: string;
    setZipCode: (zipCode: string) => void;
    filters: { minPrice: string; maxPrice: string; beds: string };
    setFilters: (filters: { minPrice: string; maxPrice: string; beds: string }) => void;
    handleSubmit: (e: FormEvent) => void;
    loading: boolean;
}

const FilterForm: React.FC<FilterFormProps> = ({ zipCode, setZipCode, filters, setFilters, handleSubmit, loading }) => {
    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="md:col-span-1 sticky top-4">
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter ZIP code"
                    className="border rounded-lg p-3 w-full mb-4"
                />
                <button
                    type="submit"
                    className={`bg-blue-500 text-white rounded-lg p-3 w-full ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Search...' : 'Search'}
                </button>
            </form>
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Filters</h3>
                <div className="space-y-4">
                    <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="Min Price"
                        className="border rounded-lg p-3 w-full"
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="Max Price"
                        className="border rounded-lg p-3 w-full"
                    />
                    <input
                        type="text"
                        name="beds"
                        value={filters.beds}
                        onChange={handleFilterChange}
                        placeholder="Beds"
                        className="border rounded-lg p-3 w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterForm;
