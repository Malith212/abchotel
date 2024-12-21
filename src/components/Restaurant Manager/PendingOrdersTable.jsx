import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendingOrdersTable = () => {
  const [orders, setOrders] = useState([
    { orderTime: '5:30 PM', tableNo: 1, items: 'French Fries, Burger', status: 'Pending' },
    { orderTime: '6:00 PM', tableNo: 5, items: 'Salad, Pasta', status: 'Complete' },
    { orderTime: '6:15 PM', tableNo: 3, items: 'Pizza, Soda', status: 'Pending' },
    { orderTime: '6:45 PM', tableNo: 8, items: 'Steak, Mashed Potatoes', status: 'Pending' },
  ]);

  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }

      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-GB');
      const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      setCurrentDateTime(`Date: ${formattedDate} | Time: ${formattedTime}`);
    };

    fetchData();
  }, []);

  const toggleOrderStatus = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = updatedOrders[index].status === 'Pending' ? 'Complete' : 'Pending';
    setOrders(updatedOrders);
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12 mt-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Pending Orders</h2>
        <p className="text-gray-500">{currentDateTime}</p>
      </div>

      {/* Desktop View (Table) */}
      <div className="overflow-x-auto rounded-lg border border-orange-400 bg-orange-80 hidden md:block">
        <table className="w-full table-auto">
          <thead>
            <tr className="border border-gray-200 shadow-sm">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Order Time</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Table No</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Ordered Items</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders
              .sort((a, b) => a.status.localeCompare(b.status))
              .map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{order.orderTime}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.tableNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-6 py-4">
                    <button
                      className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                        order.status === 'Pending'
                          ? 'bg-orange-50 text-orange-600 ring-1 ring-orange-500/20'
                          : 'bg-green-50 text-green-600 ring-1 ring-green-500/20'
                      }`}
                      onClick={() => toggleOrderStatus(index)}
                    >
                      {order.status}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="mt-6 space-y-4 md:hidden">
        {orders
          .sort((a, b) => a.status.localeCompare(b.status))
          .map((order, index) => (
            <div key={index} className="p-4 rounded-lg border border-gray-100 bg-white">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Order Time:</span>
                  <span className="text-sm text-gray-600">{order.orderTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Table No:</span>
                  <span className="text-sm text-gray-600">{order.tableNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Items:</span>
                  <span className="text-sm text-gray-600">{order.items}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <button
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      order.status === 'Pending'
                        ? 'bg-orange-50 text-orange-600 ring-1 ring-orange-500/20'
                        : 'bg-green-50 text-green-600 ring-1 ring-green-500/20'
                    }`}
                    onClick={() => toggleOrderStatus(index)}
                  >
                    {order.status}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PendingOrdersTable;
