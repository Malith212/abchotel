import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import riceImg from '../../assets/delicious-chicken-fried-rice-with-vegetables-and-herbs-cut-out-stock-png.webp';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null); // Store the cart ID
  const [isProceeding, setIsProceeding] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Load the cart from localStorage and group items by dish_id and size
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const groupedCart = groupAndSummarizeCart(savedCart);
    setCartItems(groupedCart);
  }, []);

  const groupAndSummarizeCart = (items) => {
    const grouped = {};
    items.forEach((item) => {
      const key = `${item.dish_id}-${item.size}`; // Unique grouping key
      if (!grouped[key]) {
        grouped[key] = { 
          ...item, 
          quantity: item.quantity, // Store quantity in localStorage
        };
      } else {
        grouped[key].quantity += item.quantity; // Sum the quantities
      }
    });
    return Object.values(grouped); // Convert grouped items to array
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.quantity * item.price; // Calculate total price for each item
      return total + itemTotal;
    }, 0);
  };

  const handleQuantityChange = (dish_id, size, action) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.dish_id === dish_id && item.size === size) {
          const updatedQuantity = action === 'increment' ? item.quantity + 1 : item.quantity - 1;
          return {
            ...item,
            quantity: Math.max(updatedQuantity, 0), // Ensure quantity doesn't go negative
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // Remove items with 0 quantity

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  const handleRemoveItem = (dish_id, size) => {
    const updatedCart = cartItems.filter((item) => !(item.dish_id === dish_id && item.size === size));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  const handleProceedToPayment = async () => {
    try {
      setIsProceeding(true);

      // Get table_id from localStorage
      const tableId = localStorage.getItem('table_id');

      // Step 1: Create the cart in the backend
      const cartResponse = await axios.post('http://localhost:4000/carts', {
        cart_status: 'active',
        is_active: true,
        table_id: tableId, // Include table_id in the request
      });
      const newCartId = cartResponse.data.cart_id;
      setCartId(newCartId);

      // Step 2: Add items to the cart in the backend
      for (const item of cartItems) {
        await axios.post('http://localhost:4000/cart-items', {
          cart_id: newCartId,
          quantity: item.quantity,
          dish_id: item.dish_id,
          is_deleted: false,
        });
      }

      console.log('Cart and cart items successfully created!');

      // After successful cart creation, navigate to the payment page
      navigate(`/payment/${newCartId}`); // Redirect to the payment page with cartId
    } catch (error) {
      console.error('Error during proceed to payment:', error);
    } finally {
      setIsProceeding(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-white rounded-md shadow-md max-w-full sm:max-w-3xl mx-auto relative">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Shopping Cart</h1>
      <p className="text-gray-500 mb-6">Review your selected items and proceed to payment.</p>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={`${item.dish_id}-${item.size}`}
            className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-100 rounded-lg"
          >
            <div className="flex items-center mb-4 sm:mb-0">
              <img
                src={item.imageUrl || riceImg}
                alt={item.dish_name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="ml-4">
                <h2 className="font-semibold text-lg">{item.dish_name}</h2>
                <p className="text-gray-500 capitalize">{item.size}</p>
              </div>

            </div>


            <div className="flex items-center justify-between w-full sm:w-auto space-x-2 sm:space-x-4">
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item.dish_id, item.size, 'decrement')}
                  className="p-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.dish_id, item.size, 'increment')}
                  className="p-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <p className="text-lg font-semibold">Rs. {(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => handleRemoveItem(item.dish_id, item.size)}
                className="p-2 bg-gray-200 rounded"
              >
                <i className="fas fa-trash"></i>
              </button>
              
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <p className="text-lg font-semibold">Total: Rs. {calculateTotalPrice().toFixed(2)}</p>
        <button
          onClick={handleProceedToPayment}
          disabled={isProceeding}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 mt-6 w-full sm:w-auto"
        >
          {isProceeding ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
