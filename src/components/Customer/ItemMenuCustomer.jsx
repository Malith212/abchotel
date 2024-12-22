import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// MenuItem Component
const MenuItem = ({ dish_id, dish_name, dish_image_url, dishPrices, dish_description }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const selectedPrice = dishPrices[0]; // Select the first price in the array

  const handleClick = () => {
    navigate(`/item-view/${dish_id}`); // Navigate to ItemView page
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick} // Add onClick handler
    >
      <img
        src={dish_image_url}
        alt={dish_name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <h3 className="mt-2 font-semibold text-orange-700">{dish_name}</h3>
      <h5 className="mt-2 font-normal text-slate-700 text-xs text-justify">{dish_description}</h5>
      <p className="mt-2 text-sm text-orange-700">
        {selectedPrice.size} Price: Rs. {Number(selectedPrice.price).toFixed(2)}
      </p>
    </div>
  );
};

// ItemMenuCustomer Component
const ItemMenuCustomer = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const categoryIdFromUrl = queryParams.get("category_id");
    setCategoryId(categoryIdFromUrl);
    console.log("categoryIdFromUrl", categoryIdFromUrl);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/dish/category/" + categoryIdFromUrl
        );
        setMenuItems(response.data);
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCategoryName = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/category/" + categoryIdFromUrl
        );
        console.log("response", response);
        setCategoryName(response.data.name);
        setCategoryDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching category name:", error);
      }
    };

    fetchData();
    fetchCategoryName();
  }, []);

  return (
    <div className="container mx-auto py-8 relative z-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-orange-900 py-3">
            {categoryName}
          </h1>
          <p className="text-orange-700">{categoryDescription}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5">
        {menuItems &&
          menuItems.map((item) => <MenuItem key={item.dish_id} {...item} />)}
      </div>
    </div>
  );
};

export default ItemMenuCustomer;
