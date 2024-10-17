import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from '../navbar';

export default function NewItem() {
    const[name, setName] = useState('');
    const[description, setDescription] = useState('');
    const[image, setImage] = useState('');
    const[sizes, setSizes] = useState([{ size: '', price: '' }]);
    const navigate = useNavigate();
    const [setError] = useState('');

    // Handle adding a new size input field
    const handleAddSize = () => {
        setSizes([...sizes, { size: '', price: '' }]);
    };

    // Handle removing a size input field
    const handleRemoveSize = (index) => {
        const updatedSizes = [...sizes];
        updatedSizes.splice(index, 1);
        setSizes(updatedSizes);
    };

    // Handle size and price changes
    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...sizes];
        updatedSizes[index][field] = value;
        setSizes(updatedSizes);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          await axios.post('', {
            name,
            description,
            image,
            sizes, // Send sizes with their respective prices
          });
    
          toast.success("New Product is added successfully! ");
          setTimeout(() => navigate(''), 2000);
        } catch (err) {
          const errorMessage = err.response?.data?.message || 'Product adding failed. Please try again.';
          setError(errorMessage);
          toast.error(errorMessage);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="p-6 bg-white shadow-md rounded-lg m-6 mt-10">
            {/* Title */}
            <div className="text-2xl font-bold text-[#5b3100] mb-4">Add New Item</div>
            <form onSubmit={handleRegister}>
                <div className='w-full flex m-5 mt-10'>
                    {/* Upload Photo Section */}
                    <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center w-1/2 ml-4">
                        <div className="text-center ">
                            <svg className="mx-auto h-12 w-12 text-gray-400 mt-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                            </svg>
                            <div className=" flex text-sm text-gray-600 ">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white font-semibold text-orange-500 hover:text-orange-600 rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2">
                                    <span>Upload a file</span>
                                    <input 
                                        id="file-upload" 
                                        name="file-upload" 
                                        type="file"  
                                        onChange={(e) => setImage(e.target.value)}
                                        required
                                        aria-label="Image" 
                                        className="sr-only" 
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>

                    {/* Name, Description, and Sizes */}
                    <div className="space-y-4 w-1/2 ml-4 mr-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                aria-label="Name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-[#fafafa]"
                                placeholder="Name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                aria-label="Description"
                                rows="3"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-[#fafafa]"
                                placeholder="Add a description..."
                            ></textarea>
                        </div>

                        {/* Sizes and Prices */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Sizes and Prices</label>
                            {sizes.map((size, index) => (
                                <div key={index} className="flex space-x-3 mt-2">
                                    <input
                                        type="text"
                                        value={size.size}
                                        onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                                        required
                                        aria-label="Size"
                                        className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-[#fafafa]"
                                        placeholder="Size (e.g., Small, Medium)"
                                    />
                                    <input
                                        type="text"
                                        value={size.price}
                                        onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                                        required
                                        aria-label="Price"
                                        className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-[#fafafa]"
                                        placeholder="Price (e.g., 29.99)"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSize(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddSize}
                                className="mt-2 text-orange-500 hover:text-orange-600"
                            >
                                + Add Size
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Save/Cancel Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#a85900] hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#e9902c] hover:bg-orange-600"
                    >
                        Save
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
        </>
    );
}
