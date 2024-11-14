'use client';
import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';
import { FaDollarSign, FaUser, FaShoppingCart, FaChartLine } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // Added ArcElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // Ensure ArcElement is registered
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 500000,
    totalSales: 1500,
    totalProducts: 250,
    totalUsers: 1200,
    profileVisitors: [30, 50, 70, 60, 90, 120, 130], // Weekly profile visitors
    topChannels: [
      { name: 'Social Media', visits: 5000 },
      { name: 'Organic Search', visits: 3500 },
      { name: 'Referral', visits: 2500 },
      { name: 'Paid Ads', visits: 1200 },
    ],
    recentOrders: [
      { id: 1, date: '2024-11-01', product: 'Goggle Frame X', amount: 120.50 },
      { id: 2, date: '2024-11-02', product: 'Goggle Frame Y', amount: 220.00 },
      { id: 3, date: '2024-11-05', product: 'Goggle Frame Z', amount: 320.75 },
    ],
    monthlyRevenue: [50000, 60000, 70000, 80000, 75000, 90000], // Monthly Revenue for the past 6 months
    userGrowth: [200, 220, 250, 270, 300, 350], // User growth over the last 6 weeks
    salesDistribution: [40, 25, 15, 10, 10], // Percentage of sales by product category
    latestUsers: [
      { name: 'Alice Doe', email: 'alice@example.com', date: '2024-11-10' },
      { name: 'Bob Smith', email: 'bob@example.com', date: '2024-11-11' },
    ],
    topProducts: [
      { name: 'Goggle Frame A', sales: 300 },
      { name: 'Goggle Frame B', sales: 250 },
      { name: 'Goggle Frame C', sales: 200 },
    ],
  });

  // Line Chart Data for Weekly Profile Visitors
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Profile Visitors (Weekly)',
        data: dashboardData.profileVisitors,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Bar Chart Data for Monthly Revenue
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (Monthly)',
        data: dashboardData.monthlyRevenue,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data for Sales Distribution
  const pieChartData = {
    labels: ['Frames', 'Lenses', 'Accessories', 'Maintenance', 'Other'],
    datasets: [
      {
        label: 'Sales Distribution',
        data: dashboardData.salesDistribution,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#ff9f40'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100">

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Revenue', value: `$${dashboardData.totalRevenue.toFixed(2)}`, icon: <FaDollarSign className="w-8 h-8" />, color: 'bg-blue-500' },
          { title: 'Total Sales', value: dashboardData.totalSales, icon: <FaShoppingCart className="w-8 h-8" />, color: 'bg-green-500' },
          { title: 'Total Products', value: dashboardData.totalProducts, icon: <FaChartLine className="w-8 h-8" />, color: 'bg-orange-500' },
          { title: 'Total Users', value: dashboardData.totalUsers, icon: <FaUser className="w-8 h-8" />, color: 'bg-red-500' },
        ].map(({ title, value, icon, color }, index) => (
          <div key={index} className={`${color} text-white p-6 flex items-center gap-4 rounded-md shadow-md`}>
            {icon}
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-2xl">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Weekly Profile Visitors Line Chart */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-4">Weekly Profile Visitors</h3>
          <div className="w-full h-[300px]">
            <Line data={lineChartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Monthly Revenue Bar Chart */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-4">Monthly Revenue</h3>
          <div className="w-full h-[300px]">
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      {/* Sales Distribution Pie Chart */}
      <div className="bg-white p-6 rounded-md shadow-md mt-8">
        <h3 className="text-xl font-semibold mb-4">Sales Distribution</h3>
        <div className="w-full h-[300px]">
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Latest Orders Section */}
      <div className="mt-8 mb-8 bg-white p-6 rounded-md shadow-md">
        <h3 className="text-xl font-semibold mb-4">Latest Orders</h3>
        <ul className="space-y-4">
          {dashboardData.recentOrders.map(order => (
            <li key={order.id} className="flex justify-between items-center">
              <span>{order.date} - {order.product}</span>
              <span className="text-green-500">${order.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Export Data Button */}
      <div className="mt-8 text-right">
        <CSVLink
          data={[dashboardData.recentOrders]}
          filename="orders.csv"
          className="text-blue-600 hover:underline"
        >
          Export Orders as CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default DashboardPage;
