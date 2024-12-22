import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MenuItem = ({ category_name, category_image_url, category_id }) => (
  <Link to={`/itemMenuPageCustomer?category_id=${category_id}`}>
    <div className="relative rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105">
      <img
        src={category_image_url}
        alt={category_name}
        className="w-full h-40 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 text-white p-2">
        <h3 className="text-lg font-semibold">{category_name}</h3>
      </div>
    </div>
  </Link>
);

function HotelMenuCustomer() {
  const [menuItems, setMenuItems] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/category");
        console.log("response", response);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <h1 className="text-3xl font-bold text-orange-900 mb-2">
        Hotel Menu
      </h1>
      <div className="mb-6">
        <p
          className={`text-orange-700 ${
            showFullDescription ? "line-clamp-none" : "line-clamp-3"
          }`}
        >
          Indulge in our wide selection of delicious and wholesome dishes,
          crafted to satisfy every craving. From savory meals to refreshing
          sides, each item is made with the freshest ingredients and packed with
          flavor, ensuring a delightful dining experience every time.
        </p>
        <button
          onClick={toggleDescription}
          className="text-orange-900 mt-2 "
        >
          {showFullDescription ? "Show Less" : "Show More.."}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* assuming one item is an object and it has elements title and imageUrl */}
        {menuItems && menuItems.map((item) => (
          <MenuItem key={item.category_id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default HotelMenuCustomer;
