import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterForm from './FilterForm';
import ListingsTable from './ListingsTable';
import Pagination from '../common/Pagination';

const ITEMS_PER_PAGE = 10;

const RealtorListings: React.FC = () => {
  const [zipCode, setZipCode] = useState<string>('');
  const [allListings, setAllListings] = useState<any[]>([]);
  const [displayedListings, setDisplayedListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', beds: '' });

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchListings();
  };

  const applyFilters = (listings: any[]) => {
    return listings.filter((listing) => {
      const { minPrice, maxPrice, beds } = filters;
      const price = parseInt(listing.price.replace(/[^0-9]/g, ''), 10);
      return (
        (minPrice ? price >= parseInt(minPrice, 10) : true) &&
        (maxPrice ? price <= parseInt(maxPrice, 10) : true) &&
        (beds ? listing.beds.includes(beds) : true)
      );
    });
  };

  useEffect(() => {
    const filteredListings = applyFilters(allListings);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedListings(filteredListings.slice(startIndex, endIndex));
  }, [currentPage, allListings, filters]);

  useEffect(() => {
    setCurrentPage(1);  // Reset to first page whenever filters change
  }, [filters]);

  const totalPages = Math.ceil(applyFilters(allListings).length / ITEMS_PER_PAGE);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <FilterForm
        zipCode={zipCode}
        setZipCode={setZipCode}
        filters={filters}
        setFilters={setFilters}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <div className="md:col-span-3">
        <AnimatePresence>
          {loading && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="animate-pulse text-center text-lg"
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
              className="mt-2 text-center text-lg"
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
              className="text-red-500 text-center text-lg"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        {!loading && <ListingsTable listings={displayedListings} />}
        {!loading && displayedListings.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default RealtorListings;
