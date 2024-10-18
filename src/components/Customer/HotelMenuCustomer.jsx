import React,{ useState,useEffect } from 'react'
import axios from "axios";

const MenuItem = ({ title, imageUrl }) => (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-gray-700 bg-opacity-50 text-white p-2">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );

  function HotelMenuCustomer() {

    const [menuItems,setMenuItems] = useState([]); 

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
        <h1 className="text-3xl font-bold text-orange-900 mb-2 ml-14">Hotel Menu</h1>
        <p className="text-orange-700 mb-6 ml-14 mr-14">
          Indulge in our wide selection of delicious and wholesome dishes, crafted to satisfy every craving. From savory meals to refreshing sides, each item is made with the freshest ingredients and packed with flavor, ensuring a delightful dining experience every time.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-14 mr-14">
          {/* assuming one item is an object and it has elements title and imageUrl */}
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
      </div>
    );
  }
  

export default HotelMenuCustomer