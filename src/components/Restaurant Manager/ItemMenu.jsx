import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// MenuItem Component
const MenuItem = ({ dish_id, dish_name, dish_image_url , dishPrices }) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const selectedPrice = dishPrices[0]; // Select the first price in the array


  const toggleAvailability = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/dish/toggle-availability/${dish_id}`, {
        isAvailable: !isAvailable
      });
      if (response) {
        setIsAvailable(!isAvailable);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
      <img src={dish_image_url} alt={dish_name} className="w-full h-40 object-cover rounded-t-lg" />
      <h3 className="mt-2 font-semibold">{dish_name}</h3>
      <p className="text-sm text-orange-700">{selectedPrice.size} Price: Rs. {Number(selectedPrice.price).toFixed(2)}</p>
      <button
        onClick={toggleAvailability}
        className={`mt-2 w-full py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-200 ${
          isAvailable ? 'bg-orange-400 text-white hover:bg-orange-500' : 'bg-red-600 text-white hover:bg-red-600'
        }`}
      >
        {isAvailable ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
        {isAvailable ? 'Availability' : 'Not Available'}
      </button>
    </div>
  );
};

// ItemMenu Component
const ItemMenu = () => {
  const [menuItems, setMenuItems] = useState([]); 
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const categoryIdFromUrl = queryParams.get('category_id');
    setCategoryId(categoryIdFromUrl);
    console.log("categoryIdFromUrl", categoryIdFromUrl);
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/dish/category/" + categoryIdFromUrl);
        setMenuItems(response.data); 
        console.log('response', response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchCategoryName = async () => {
      try {
        const response = await axios.get("http://localhost:4000/category/" + categoryIdFromUrl);
        console.log('response', response);
        setCategoryName(response.data.name);
        setCategoryDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching category name:', error);
      }
    };

    fetchData();
    fetchCategoryName();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-orange-900 py-3 ml-14">
            {categoryName}
          </h1>
          <p className="text-orange-700 ml-14">{categoryDescription}</p>
        </div>
        <button className="mr-14 bg-orange-50 text-orange-900 border border-orange-400 py-2 px-4 rounded-md hover:bg-orange-400 hover:text-white">
          <Link to={`/add-new-item?category_id=${categoryId}`}>Add New</Link>
        </button>
      </div>
      
      <div className="ml-14 mr-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5">
      {menuItems && menuItems.map((item) => (
          <MenuItem key={item.dish_id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ItemMenu;
