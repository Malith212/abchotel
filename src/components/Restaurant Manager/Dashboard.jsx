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
            setCurrentDateTime(now.toLocaleString());
        };

        fetchData();
    }, []);

    return (

        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-orange-900">Dashboard</h2>
                <p className="text-gray-500">{currentDateTime}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
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


                <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 mt-6">
                    {/* Daily Completed Order */}
                    <div className="flex justify-between items-center border-orange-400 border-2 rounded-lg p-4 sm:p-6 md:p-8 lg:p-10">
                        <div>
                            <h3 className="text-lg font-bold text-orange-900 mb-2">Daily Completed Order</h3>
                            <p className="text-4xl font-bold text-brown-900">{data.dailyCompletedOrder}</p>
                        </div>
                        <div className="flex-shrink-0">
                            <AiOutlineCheckCircle className="h-10 w-10 text-orange-900" />
                        </div>
                    </div>

                    {/* Pending Order */}
                    <div className="flex justify-between items-center border-orange-400 border-2 rounded-lg p-4 sm:p-6 md:p-8 lg:p-10">
                        <div>
                            <h3 className="text-lg font-bold text-orange-900 mb-2">Pending Order</h3>
                            <button className="bg-gray-300 text-brown-900 px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300">
                                {data.pendingOrder}
                            </button>
                        </div>
                        <div className="flex-shrink-0">
                            <AiOutlineShoppingCart className="h-10 w-10 text-orange-900" />
                        </div>
                    </div>

                    {/* Daily Income */}
                    <div className="flex justify-between items-center border-orange-400 border-2 rounded-lg p-4 sm:p-6 md:p-8 lg:p-10">
                        <div>
                            <h3 className="text-lg font-bold text-orange-900 mb-2">Daily Income</h3>
                            <p className="text-4xl font-bold text-brown-900">Rs. {data.dailyIncome.toLocaleString()}</p>
                        </div>
                        <div className="flex-shrink-0">
                            <FiDollarSign className="h-10 w-10 text-orange-900" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300">
                            Hotel Menu
                        </button>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300">
                            Add New Table
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;




// backend structure should like this
//{
//     dailyCompletedOrder: 22,
//     pendingOrder: 2,
//     dailyIncome: 32500,
//     weekIncomeData: [
//       { day: 'Sunday', income: 8 },
//       { day: 'Monday', income: 13 },
//       { day: 'Tuesday', income: 19 },
//       { day: 'Wednesday', income: 27 },
//       { day: 'Thursday', income: 22 },
//       { day: 'Friday', income: 18 },
//       { day: 'Saturday', income: 7 },
//     ],
//   }