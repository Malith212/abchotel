import React from 'react';
import ShoppingCart from '../components/Customer/ShoppingCart';
import PaymentSummary from '../components/Customer/PaymentSummary';

const ShoppingPage = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-4 max-w-7xl mx-auto p-4 lg:p-8">
      {/* Shopping Cart Section */}
      <div className="w-full lg:w-3/5 bg-white p-4 rounded-lg shadow-lg">
        <ShoppingCart />
      </div>

      {/* Payment Summary Section */}
      <div className="w-full lg:w-2/5 bg-white p-4 rounded-lg shadow-lg">
        <PaymentSummary />
      </div>
    </div>
  );
};

export default ShoppingPage;