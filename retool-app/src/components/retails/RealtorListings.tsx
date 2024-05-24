import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 10;

const RealtorListings: React.FC = () => {
  const [zipCode, setZipCode] = useState<string>('');
  const [allListings, setAllListings] = useState<any[]>([]);
  const [displayedListings, setDisplayedListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchListings = async () => {
    setLoading(true);
    setError('');
    setAllListings([]);
    setStatus('');
    setCurrentPage(1);

    const eventSource = new EventSource(`http://127.0.0.1:8000/scrape-realtor?zip_code=${zipCode}`);

    eventSource.onmessage = (event) => {
      const data = event.data;
      if (data === "Scraping complete") {
        setStatus('');
        setLoading(false);
      } else if (data.startsWith("Scraping page")) {
        setStatus(data);
      } else {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.listings) {
            setAllListings(parsedData.listings);
            setLoading(false);
            setStatus('');
            eventSource.close();
          }
        } catch (err) {
          setError('Failed to parse data');
          setLoading(false);
          setStatus('');
          eventSource.close();
        }
      }
    };

    eventSource.onerror = (err) => {
      setError('Failed to fetch listings');
      setLoading(false);
      setStatus('');
      eventSource.close();
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings();
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedListings(allListings.slice(startIndex, endIndex));
  }, [currentPage, allListings]);

  const totalPages = Math.ceil(allListings.length / ITEMS_PER_PAGE);

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4 flex items-center">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter ZIP code"
          className="border rounded p-2 mr-2 flex-grow"
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white rounded p-2 flex items-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={loading}
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          )}
          Search
        </button>
      </form>
      <AnimatePresence>
        {loading && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="animate-pulse"
          >
            Loading...
          </motion.p>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {status && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-2"
          >
            {status}
          </motion.p>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beds</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Baths</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sqft</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {displayedListings.map((listing, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <td className="px-6 py-4 whitespace-nowrap">{listing.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{listing.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{listing.beds}</td>
              <td className="px-6 py-4 whitespace-nowrap">{listing.baths}</td>
              <td className="px-6 py-4 whitespace-nowrap">{listing.sqft}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-gray-500 text-white rounded p-2"
          disabled={currentPage === 1 || loading}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-gray-500 text-white rounded p-2"
          disabled={currentPage === totalPages || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RealtorListings;
