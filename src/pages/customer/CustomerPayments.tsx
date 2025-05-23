import React from 'react';

const CustomerPayments: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Payment History</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {/* Placeholder for payment history */}
          <p className="text-gray-600">Your payment history will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerPayments;