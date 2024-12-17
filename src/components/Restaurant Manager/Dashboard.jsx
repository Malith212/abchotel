import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineCheckCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { FiDollarSign } from "react-icons/fi";

const Dashboard = () => {
    const [data, setData] = useState({
        dailyCompletedOrder: 0,
        pendingOrder: 0,
        dailyIncome: 0,
        weekIncomeData: [],
    });
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/dashboard');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
    
            const now = new Date();
            const formattedDate = now.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
            const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }); // Format as HH:mm
            setCurrentDateTime(`Date: ${formattedDate} | Time: ${formattedTime}`);
        };
    
        fetchData();
    }, []);
    

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-orange-900">Dashboard</h2>
                <p className="text-gray-500">{currentDateTime}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Week Income Graph */}
                <div>
                    <h3 className="text-lg rounded-lg font-bold text-brown-900 mb-4 bg-gray-200 sm:p-6 md:p-8 lg:p-10 h-full mt-6">Week Income Graph</h3>
                    <div className="flex justify-between text-brown-900">
                        {data.weekIncomeData.map((item, index) => (
                            <div key={index} className="text-center">
                                <p className="font-bold">{item.day}</p>
                                <p className="font-bold">{item.income}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cards Section */}
                <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Daily Completed Order */}
                        <div className="flex flex-col justify-between border-orange-400 border-2 rounded-lg p-4 h-full">
                            <div className="flex items-center justify-between w-full">
                                <h3 className="text-lg font-bold text-orange-900">Daily Completed Order</h3>
                                <AiOutlineCheckCircle className="h-10 w-10 text-orange-900" />
                            </div>
                            <p className="text-4xl font-bold text-brown-900 mt-4">{data.dailyCompletedOrder}</p>
                        </div>

                        {/* Pending Order */}
                        <div className="flex flex-col justify-between border-orange-400 border-2 rounded-lg p-4 h-full">
                            <div className="flex items-center justify-between w-full">
                                <h3 className="text-lg font-bold text-orange-900">Pending Order</h3>
                                <AiOutlineShoppingCart className="h-10 w-10 text-orange-900" />
                            </div>
                            <button className="bg-gray-300 text-brown-900 px-4 py-4 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300 mt-4">
                                {data.pendingOrder}
                            </button>
                        </div>
                    </div>

                    {/* Daily Income and Buttons Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Daily Income */}
                        <div className="flex flex-col justify-between border-orange-400 border-2 rounded-lg p-4 h-full">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-orange-900">Daily Income</h3>
                                <FiDollarSign className="h-10 w-10 text-orange-900" />
                            </div>
                            <p className="text-4xl font-bold text-brown-900 mt-4">Rs. {data.dailyIncome.toLocaleString()}</p>
                        </div>
                    </div>
                        {/* Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-4">
                            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300 w-full">
                                Hotel Menu
                            </button>
                            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300 w-full">
                                Add New Table
                            </button>
                        </div>
                        </div>
                   
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
