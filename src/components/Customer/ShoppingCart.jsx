import React from 'react';
import riceImg from '../../assets/delicious-chicken-fried-rice-with-vegetables-and-herbs-cut-out-stock-png.webp';

const ShoppingCart = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Italy Pizza',
      description: 'Extra cheese and topping',
      price: 681,
      quantity: 1,
      imageUrl: riceImg, // Add your image paths here
    },
    {
      id: 2,
      name: 'Combo Plate',
      description: 'Extra cheese and topping',
      price: 681,
      quantity: 1,
      imageUrl: riceImg,
    },
    {
      id: 3,
      name: 'Spanish Rice',
      description: 'Extra garlic',
      price: 681,
      quantity: 1,
      imageUrl: riceImg,
    },
  ];

  return (
    <div className="p-4 sm:p-8 bg-white rounded-md shadow-md max-w-3xl mx-auto relative">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Shopping Cart</h1>
      <p className="text-sm sm:text-base text-gray-500 mb-6">Lorem Inspirem butcu gersith hostemn</p>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between p-4 bg-gray-100 rounded-lg space-y-4 sm:space-y-0">

            <div className="flex flex-wrap items-center w-full sm:w-auto">

              <img src={item.imageUrl} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md" />
              
              <div className="ml-4">
                <h2 className="font-semibold text-base sm:text-lg">{item.name}</h2>
                <p className="text-sm sm:text-gray-500">{item.description}</p>
              </div>

            </div>


            <div className="flex items-center justify-between w-full sm:w-auto space-x-2 sm:space-x-4">
              <div className="flex items-center">
                <button className="p-1 bg-gray-200 rounded text-sm sm:text-base">-</button>
                <span className="px-2">{item.quantity}</span>
                <button className="p-1 bg-gray-200 rounded text-sm sm:text-base">+</button>
              </div>
              <p className="text-sm sm:text-lg font-semibold">${item.price}</p>
              <button className="p-2 bg-gray-200 rounded text-sm sm:text-base"><i className="fas fa-trash"></i></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
