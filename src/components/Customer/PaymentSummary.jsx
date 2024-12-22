import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const PaymentSummary = ({ setTotalAmount }) => {
  const [items, setItems] = useState([]);

  // Function to fetch cart data from localStorage
  const fetchCartItems = () => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const calculatedItems = cartData.map((item) => ({
      ...item,
      price: item.basePrice
        ? item.basePrice * item.quantity
        : item.price * item.quantity,
    }));
    setItems(calculatedItems);
  };

  // Calculate total amount
  const total = items.reduce((acc, item) => acc + item.price, 0);

  // Update the parent state with the total amount
  useEffect(() => {
    setTotalAmount(total);
  }, [total, setTotalAmount]);

  // Fetch cart items on mount and when localStorage changes
  useEffect(() => {
    fetchCartItems();
    const handleStorageChange = () => fetchCartItems();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
 
  return (
    <div className="p-4 sm:p-8 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">You're paying,</h2>
      <div className="text-3xl font-bold mb-6">Rs. {total.toFixed(2)}</div>
      <div className="mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <div>
              <p>{item.dish_name}</p>
              <p className="text-gray-500 text-sm">Size: {item.size}</p>
            </div>
            <div className="text-right">Rs. {item.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="flex justify-between font-semibold">
        <p>Total</p>
        <p>Rs. {total.toFixed(2)}</p>
      </div>

     
    </div>
  );
};

export default PaymentSummary;
