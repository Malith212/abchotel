import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendingOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'order_status', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  // Fetch data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/order'); // Update with your actual API endpoint
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders data:', error);
      }

      // Set current date and time
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-GB');
      const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      setCurrentDateTime(`Date: ${formattedDate} | Time: ${formattedTime}`);
    };

    fetchData();
  }, []);

  // Toggle order status between 'Pending' and 'Complete'
  const toggleOrderStatus = async (orderId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Pending' ? 'Complete' : 'Pending';
      // Update status on the backend
      await axios.patch(`http://localhost:4000/order/state/${orderId}`, { order_status: newStatus });

      // Update status in local state
      const updatedOrders = orders.map((order) => 
        order.order_id === orderId ? { ...order, order_status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Function to format order time in a more readable format
  const formatOrderTime = (orderTime) => {
    const date = new Date(orderTime);
    return date.toLocaleString('en-GB', {
      weekday: 'short', // Day of the week (e.g. Mon)
      day: '2-digit',   // Day (e.g. 22)
      month: 'short',   // Month (e.g. Dec)
      year: 'numeric',  // Year (e.g. 2024)
      hour: '2-digit',  // Hour (e.g. 03)
      minute: '2-digit',// Minute (e.g. 46)
      second: '2-digit',// Second (e.g. 09)
      hour12: false     // Use 24-hour time
    });
  };

  // Function to handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Function to sort orders based on the sort configuration
  const sortedOrders = [...orders].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the current orders to display based on pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  // Function to get the sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return '↕';
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl text-amber-950 font-bold">Pending Orders</h2>
        <p className="text-amber-950 font-bold">{currentDateTime}</p>
      </div>

      {/* Desktop View (Table) */}
      <div className="overflow-x-auto rounded-lg border border-orange-400 bg-orange-80 hidden md:block bg-white">
        <table className="w-full table-auto">
          <thead>
            <tr className="border border-gray-200 shadow-sm">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Order Time
                <span className="ml-2 cursor-pointer" onClick={() => handleSort('order_time')}>{getSortIcon('order_time')}</span>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Table No</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Ordered Items</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Status
                <span className="ml-2 cursor-pointer" onClick={() => handleSort('order_status')}>{getSortIcon('order_status')}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentOrders.map((order) => (
              <tr key={order.order_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{formatOrderTime(order.order_time)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.table_no}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.order_items.map((item) => `${item.dish_name} x${item.quantity}`).join(', ')}
                </td>
                <td className="px-6 py-4">
                  <button
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      order.order_status === 'Pending'
                        ? 'bg-orange-50 text-orange-600 ring-1 ring-orange-500/20'
                        : 'bg-green-50 text-green-600 ring-1 ring-green-500/20'
                    }`}
                    onClick={() => toggleOrderStatus(order.order_id, order.order_status)}
                  >
                    {order.order_status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-2 mb-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="mt-6 space-y-4 md:hidden">
        {sortedOrders.map((order) => (
          <div key={order.order_id} className="p-4 rounded-lg border border-gray-100 bg-white">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Order Time:</span>
                <span className="text-sm text-gray-600">{formatOrderTime(order.order_time)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Table No:</span>
                <span className="text-sm text-gray-600">{order.table_no}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Items:</span>
                <span className="text-sm text-gray-600">
                  {order.order_items.map((item) => `${item.dish_name} x${item.quantity}`).join(', ')}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-medium text-gray-500">Status:</span>
                <button
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    order.order_status === 'Pending'
                      ? 'bg-orange-50 text-orange-600 ring-1 ring-orange-500/20'
                      : 'bg-green-50 text-green-600 ring-1 ring-green-500/20'
                  }`}
                  onClick={() => toggleOrderStatus(order.order_id, order.order_status)}
                >
                  {order.order_status}
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
