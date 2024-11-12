'use client'
// pages/OrderStatistics.js
import React, { useState, useEffect } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { CSVLink } from 'react-csv';

// Registering ChartJS components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const OrderStatistics = () => {
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    averageOrderValue: '$0.00',
    completedOrdersData: [],
    cancelledOrdersData: [],
    dateLabels: [],
  });

  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    // Mock data for order statistics
    const mockData = {
      totalOrders: 200,
      completedOrders: 180,
      cancelledOrders: 20,
      averageOrderValue: '$50.00',
      completedOrdersData: [30, 35, 40, 50, 60],
      cancelledOrdersData: [5, 10, 8, 6, 7],
      dateLabels: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'],
    };
    setOrderStats(mockData);
  }, []);

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const filterOrdersByDate = () => {
    // Logic to filter the orders based on the date range
    // For now, the mock data is static, but this can be replaced with dynamic logic
    console.log(`Filtering from ${dateRange.startDate} to ${dateRange.endDate}`);
  };

  const data = {
    labels: orderStats.dateLabels,
    datasets: [
      {
        label: 'Completed Orders',
        data: orderStats.completedOrdersData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Cancelled Orders',
        data: orderStats.cancelledOrdersData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <DefaultLayout>
      <div className="max-w-full mx-auto py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Order Statistics</h1>

        {/* Filters Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateRangeChange}
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateRangeChange}
              className="p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={filterOrdersByDate}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Filter Orders
            </button>
          </div>
          <CSVLink
            data={[['Total Orders', 'Completed Orders', 'Cancelled Orders', 'Avg Order Value'], 
                   [orderStats.totalOrders, orderStats.completedOrders, orderStats.cancelledOrders, orderStats.averageOrderValue]]}
            filename="order_statistics.csv"
            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
          >
            Export to CSV
          </CSVLink>
        </div>

        {/* Order Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            <p className="text-xl font-bold text-gray-900">{orderStats.totalOrders}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Completed Orders</h3>
            <p className="text-xl font-bold text-gray-900">{orderStats.completedOrders}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Cancelled Orders</h3>
            <p className="text-xl font-bold text-gray-900">{orderStats.cancelledOrders}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Avg. Order Value</h3>
            <p className="text-xl font-bold text-gray-900">{orderStats.averageOrderValue}</p>
          </div>
        </div>

        {/* Order Trends Chart */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Trends (Completed vs Cancelled)</h3>
          <Line data={data} />
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Breakdown</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-gray-700">Completed Orders</p>
              <p className="text-xl font-bold text-green-800">{orderStats.completedOrders}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-gray-700">Cancelled Orders</p>
              <p className="text-xl font-bold text-yellow-800">{orderStats.cancelledOrders}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-gray-700">Total Orders</p>
              <p className="text-xl font-bold text-blue-800">{orderStats.totalOrders}</p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OrderStatistics;
