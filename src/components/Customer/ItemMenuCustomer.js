import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MenuItem Component
const MenuItem = ({ description, title, price, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-t-lg" />
      <h3 className="mt-2 font-semibold text-orange-700">{title}</h3>
      <h5 className="mt-2 font-normal text-slate-700 text-xs text-justify">{description}</h5>
      <p className="text-sm text-orange-700">Price: Rs. {price.toFixed(2)}</p>
    </div>
  );
};

// ItemMenuCustomer Component
const ItemMenuCustomer = () => {
  const [menuItems, setMenuItems] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('API_URL'); // Replace with actual API URL
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
      </div>

      <div className="ml-14 mr-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ItemMenuCustomer;
