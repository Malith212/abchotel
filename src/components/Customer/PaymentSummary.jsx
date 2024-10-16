import React from 'react';

const PaymentSummary = () => {
  const items = [
    { name: 'Egg Fried Rice', size: 'm', price: 400.00 },
    { name: 'Egg Fried Rice', size: 'm', price: 50.00 }
  ];

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-8 bg-white rounded-md shadow-md max-w-md md:max-w-lg lg:max-w-xl mx-auto"> {/* Responsive width change */}
      <h2 className="text-lg font-semibold mb-4">You’re paying,</h2>
      <div className="text-3xl font-bold mb-6">${total.toFixed(2)}</div>
      <div className="mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <div>
              <p>{item.name}</p>
              <p className="text-gray-500 text-sm">Size: {item.size}</p>
            </div>
            <div className="text-right">${item.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="flex justify-between font-semibold">
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PaymentSummary;