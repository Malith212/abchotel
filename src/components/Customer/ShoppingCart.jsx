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
    <div className="p-8 bg-white rounded-md shadow-md max-w-3xl mx-auto relative">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <p className="text-gray-500 mb-6">Lorem Inspirem butcu gersith hostemn</p>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
              <div className="ml-4">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <button className="p-1 bg-gray-200 rounded">-</button>
                <span className="px-2">{item.quantity}</span>
                <button className="p-1 bg-gray-200 rounded">+</button>
              </div>
              <p className="text-lg font-semibold">${item.price}</p>
              <button className="p-2 bg-gray-200 rounded"><i className="fas fa-trash"></i></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
