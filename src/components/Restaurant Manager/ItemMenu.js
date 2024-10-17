import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// MenuItem Component
const MenuItem = ({ title, price, imageUrl }) => {
  const [isAvailable, setIsAvailable] = useState(true);

  const toggleAvailability = async () => {
    try {
      const response = await axios.get(""); // Add actual API endpoint
      if (response) {
        setIsAvailable(!isAvailable);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-t-lg" />
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="text-sm text-orange-700">Price: Rs. {price.toFixed(2)}</p>
      <button
        onClick={toggleAvailability}
        className={`mt-2 w-full py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-200 ${
          isAvailable ? 'bg-orange-400 text-white hover:bg-orange-500' : 'bg-red-500 text-white hover:bg-red-600'
        }`}
      >
        <span className="mr-2">{isAvailable ? '□' : '■'}</span>
        {isAvailable ? 'Availability' : 'Not Available'}
      </button>
    </div>
  );
};

// ItemMenu Component
const ItemMenu = () => {
  const [menuItems, setMenuItems] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("API_URL"); // Replace with actual API URL
        setMenuItems(response.data.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-orange-900 py-3 ml-14">Fried Rice</h1>
          <p className="text-orange-700 ml-14">Enjoy a satisfying meal that’s full of flavor and perfectly crafted to please your taste buds.</p>
        </div>
        <button className="mr-14 bg-white text-orange-900 border border-orange-900 py-2 px-4 rounded-md hover:bg-orange-100">
          <Link to='/add-new-item'>Add New</Link>
          
        </button>
      </div>
      
      <div className="ml-14 mr-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ItemMenu;
