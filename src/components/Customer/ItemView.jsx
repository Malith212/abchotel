import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ItemView({ itemId }) {  // Accept itemId as a prop
    const [item, setItem] = useState(null); // To store the item details
    const [selectedSize, setSelectedSize] = useState(''); // Default size
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState(null); // To store error messages

    // Fetch item details from API
    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`/api/items/${itemId}`); // API endpoint to fetch item details
                if (!response.ok) {
                    throw new Error('Failed to fetch item details');
                }
                const data = await response.json();
                setItem(data);
                setSelectedSize(data.sizesWithPrices[0]?.size || ''); // Set default size
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchItemDetails();
    }, [itemId]); // Rerun when itemId changes

    // Handle adding the item to the cart (API call)
    const handleAddToCart = async () => {
        try {
            const response = await fetch(`/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemId: item.id,
                    size: selectedSize,
                    quantity,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            const result = await response.json();
            // Show success notification
            toast.success(`${quantity} x ${item.name} (Size: ${selectedSize}) added to cart!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            // Show error notification
            toast.error('Failed to add item to cart.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    // Loading and error handling
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Get the price of the selected size
    const selectedPrice = item.sizesWithPrices.find(sizeObj => sizeObj.size === selectedSize)?.price || 0;

    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className="container mx-auto p-8">
                {/* Item Image */}
                <div className="w-full flex justify-center mb-8">
                    <img src={item.image} alt={item.name} className="w-96 h-96 object-cover rounded-lg shadow-lg" />
                </div>

                {/* Item Details */}
                <div className="bg-white p-6 shadow-md rounded-lg">
                    {/* Name */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{item.name}</h2>

                    {/* Description */}
                    <p className="text-gray-700 mb-4">{item.description}</p>

                    {/* Size Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Size</label>
                        <div className="flex space-x-3 mt-2">
                            {item.sizesWithPrices.map((sizeObj) => (
                                <button
                                    key={sizeObj.size}
                                    onClick={() => setSelectedSize(sizeObj.size)}
                                    className={`px-4 py-2 border rounded-md ${selectedSize === sizeObj.size ? 'bg-orange-500 text-white' : 'bg-white text-gray-900 border-gray-300'} focus:outline-none hover:bg-orange-500 hover:text-white`}
                                >
                                    {sizeObj.size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <p className="text-xl font-semibold text-gray-800">Price: ${selectedPrice.toFixed(2)}</p>
                    </div>

                    {/* Quantity Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min="1"
                            className="mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
