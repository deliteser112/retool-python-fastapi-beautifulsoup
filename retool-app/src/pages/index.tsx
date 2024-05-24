// src/pages/index.tsx

import React from 'react';

import Layout from '../components/layout/Layout';
import RealtorListings from '../components/retails/RealtorListings';

const HomePage: React.FC = () => {

  return (
    <Layout title="Retool | Home">
      <h1 className="text-2xl font-bold mb-4">Realtor Listings</h1>
      <RealtorListings />
    </Layout>
  );
};

export default HomePage;
