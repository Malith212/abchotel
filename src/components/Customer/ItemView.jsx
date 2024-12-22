import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar2 from "../navbar2";
import Footer from "../footer";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ItemView() {
  const { dish_id } = useParams();
  const [item, setItem] = useState(null);
  const [quantities, setQuantities] = useState({
    small: 0,
    medium: 0,
    large: 0,
  });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/dish/${dish_id}`
        );
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [dish_id]);

  const handleIncrement = (size) => {
    setQuantities({ ...quantities, [size]: (quantities[size] || 0) + 1 });
  };

  const handleDecrement = (size) => {
    setQuantities({ ...quantities, [size]: Math.max((quantities[size] || 0) - 1, 0) });
  };

  if (!item) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div
        className="absolute md:inset-0"
        style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg?t=st=1734521074~exp=1734524674~hmac=7b00696977e1fa6c8169ef3c5887450344265f9875995ffb44368c528f9e7520&w=1060)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}
      ></div>

      {/* Navbar */}
      <div className="sticky top-0 z-20 bg-orange-50">
        <Navbar2 />
      </div>

      {/* Main Content */}
      <div className="flex-grow container mx-auto py-8 px-4 md:py-24 md:px-8 relative z-10 mt-12">
        {/* Image and Title Section */}
        <div className="relative mt-4">
          {!imageLoaded && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
          )}
          <img
            src={item.dish_image_url} // Use the image URL from the fetched item
            alt={item.dish_name}
            className="w-full h-48 md:h-64 object-cover rounded-md"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-md">
            <h2 className="text-xl md:text-2xl font-bold">{item.dish_name}</h2>
            <p className="text-xs md:text-sm">{item.dish_description}</p>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Description</h3>
          <p className="text-gray-600 text-sm md:text-base">{item.dish_description}</p>
        </div>

        {/* Pricing and Quantity Section */}
        <div className="mt-6 flex flex-col items-center">
          <div className="space-y-4 w-full max-w-md">
            {item.dishPrices.map((price) => (
              <div
                key={price.size}
                className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
              >
                <div className="flex-1 text-center  md:text-base">
                  {price.size} {item.dish_name}
                </div>
                <div className="flex-1 text-center text md:text-base">
                  Rs. {Number(price.price).toFixed(2)}
                </div>
                <div className="flex-1 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handleDecrement(price.size)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
                  >
                    -
                  </button>
                  <span className="text md:text-base">{quantities[price.size]}</span>
                  <button
                    onClick={() => handleIncrement(price.size)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className=" text-center mt-5">
          <button className="bg-orange-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-orange-600">
            <Link to='/shopping'>
            Add to cart
            </Link>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 z-20 bg-orange-50">
        <Footer />
      </div>
    </div>
  );
}
