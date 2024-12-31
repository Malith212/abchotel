import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCheckCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { FiDollarSign } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState({
    dailyCompletedOrder: 0,
    pendingOrder: 0,
    dailyIncome: 0,
    weekIncomeData: [],  // Initially set to an empty array
  });
  const [currentDateTime, setCurrentDateTime] = useState("");
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/pendingOrderPage');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the necessary data from your backend
        const completedOrderResponse = await axios.get("http://localhost:4000/order/dailycompletedorderscount/count");
        const pendingOrderResponse = await axios.get("http://localhost:4000/order/pendingcount/count");
        const dailyIncomeResponse = await axios.get("http://localhost:4000/order/dailyincome/income");
        const weeklyIncomeResponse = await axios.get("http://localhost:4000/order/weeklyincome/byDays");  // Fetch the weekly income data

        console.log("Fetched data:", {
          completedOrder: completedOrderResponse.data,
          pendingOrder: pendingOrderResponse.data,
          dailyIncome: dailyIncomeResponse.data,
          weeklyIncome: weeklyIncomeResponse.data,  // Log the weekly income data
        });

        // Update the state with the fetched values
        setData({
          dailyCompletedOrder: completedOrderResponse.data,
          pendingOrder: pendingOrderResponse.data,
          dailyIncome: dailyIncomeResponse.data,
          weekIncomeData: weeklyIncomeResponse.data,  // Update the weekIncomeData state
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }

      // Get current date and time
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-GB"); 
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setCurrentDateTime(`Date: ${formattedDate} | Time: ${formattedTime}`);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="sm:p-8 md:p-10 relative">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-orange-950">Dashboard</h2>
          <p className="text-amber-800 font-bold">{currentDateTime}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Week Income Graph */}
          <div className="bg-gray-50 sm:p-6 md:p-8 lg:p-10 h-full mt-6 rounded-lg">
            <h3 className="text-lg font-bold text-amber-950 mb-4">
              Past Week Income Graph
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.weekIncomeData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E0440E" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FFBB28" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="url(#colorIncome)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cards Section */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 mt-6">
            {/* Daily Completed Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col justify-between border-orange-400 border-2 rounded-lg p-4 h-full">
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-bold text-orange-900">
                    Daily Completed Order
                  </h3>
                  <AiOutlineCheckCircle className="h-10 w-10 text-orange-900" />
                </div>
                <p className="text-3xl font-semibold text-brown-900 mt-4">
                  {data.dailyCompletedOrder}
                </p>
              </div>

              {/* Pending Order */}
              <button
                className="group flex flex-col justify-between border-orange-400 border-2 rounded-lg p-4 h-full hover:shadow-md focus:outline-none hover:bg-orange-600"
                onClick={handleClick}
              >
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-bold text-orange-900 group-hover:text-white">Pending Order</h3>
                  <AiOutlineShoppingCart className="h-10 w-10 text-orange-900 group-hover:text-white" />
                </div>
                <p className="text-4xl font-bold text-brown-900 mt-4 group-hover:text-white">
                  {data.pendingOrder}
                </p>
              </button>
            </div>

            {/* Daily Income */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col justify-between border-orange-400 border-2 rounded-lg p-4 h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-orange-900">
                    Daily Total Income
                  </h3>
                  <FiDollarSign className="h-10 w-10 text-orange-900" />
                </div>
                <p className="text-3xl font-semibold text-brown-900 mt-4">
                  Rs. {data.dailyIncome.toLocaleString()}.00
                </p>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-4">
                <Link to="/hotelMenuPage">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300 w-full">
                    Hotel Menu
                  </button>
                </Link>
                <Link to="/generate-qr">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300 w-full">
                    Add New Table
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
