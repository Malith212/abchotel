import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PaymentSummary = ({ setTotalAmount }) => {
  const items = [
    { name: "Egg Fried Rice", size: "m", price: 1000.0 },
    { name: "Egg Fried Rice", size: "m", price: 100.0 },
  ];

  const total = items.reduce((acc, item) => acc + item.price, 0);

  // Update the parent state with the total amount
  useEffect(() => {
    setTotalAmount(total);
  }, [total, setTotalAmount]);

  return (
    <div className="p-8 bg-white rounded-md shadow-md relative z-10">
      <h2 className="text-lg font-semibold mb-4">You're paying,</h2>
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

      <div className=" text-right mt-5">
          <button className="bg-orange-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-orange-600">
            <Link to='/payment'>
           Pay
            </Link>
          </button>
        </div>
    </div>
  );
};

export default PaymentSummary;
