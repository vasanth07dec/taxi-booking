import React from 'react';
import TripHistoryList from '../../components/customer/TripHistoryList';

const CustomerTrips: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Trips</h1>
      <TripHistoryList />
    </div>
  );
};

export default CustomerTrips;