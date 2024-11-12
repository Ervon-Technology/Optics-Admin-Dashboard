'use client';
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ViewPerformance = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [performanceData, setPerformanceData] = useState({
    summary: {
      totalSales: 0,
      totalOrders: 0,
      repeatOrders: 0,
      averageOrderValue: 0,
      customerSatisfaction: 0,
      conversionRate: 0
    },
    trends: [],
    topProducts: [],
    customerMetrics: {
      newCustomers: 0,
      returningCustomers: 0,
      churnRate: 0
    }
  });

  useEffect(() => {
    fetchPerformanceData(timeRange);
  }, [timeRange]);

  const fetchPerformanceData = (range) => {
    // Simulate API call with mock data
    const mockData = {
      summary: {
        totalSales: 15780.50,
        totalOrders: 342,
        repeatOrders: 128,
        averageOrderValue: 46.14,
        customerSatisfaction: 4.6,
        conversionRate: 3.2
      },
      trends: generateTrendData(range),
      topProducts: [
        { name: "Product A", sales: 1200, orders: 45, revenue: 5400 },
        { name: "Product B", sales: 980, orders: 38, revenue: 4100 },
        { name: "Product C", sales: 850, orders: 32, revenue: 3600 },
        { name: "Product D", sales: 720, orders: 28, revenue: 2900 },
        { name: "Product E", sales: 650, orders: 25, revenue: 2400 }
      ],
      customerMetrics: {
        newCustomers: 156,
        returningCustomers: 186,
        churnRate: 2.4
      }
    };
    setPerformanceData(mockData);
  };

  const generateTrendData = (range) => {
    const periods = {
      '7days': 7,
      '30days': 30,
      '90days': 90
    };

    return Array.from({ length: periods[range] }, (_, i) => ({
      date: new Date(Date.now() - (periods[range] - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      sales: Math.floor(Math.random() * 1000) + 500,
      orders: Math.floor(Math.random() * 50) + 20,
      visitors: Math.floor(Math.random() * 1000) + 200
    }));
  };

  const SummaryCard = ({ title, value, icon, trend }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs previous period
            </p>
          )}
        </div>
        <div className="p-3 bg-gray-100 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <DefaultLayout>
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Performance Dashboard</h1>
        <div className="flex items-center gap-4">
          <Calendar className="text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-36 p-2 border rounded"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Total Sales"
          value={`$${performanceData.summary.totalSales.toLocaleString()}`}
          icon={<span className="text-2xl">💰</span>}
          trend={5.2}
        />
        <SummaryCard
          title="Total Orders"
          value={performanceData.summary.totalOrders.toLocaleString()}
          icon={<span className="text-2xl">📦</span>}
          trend={3.8}
        />
        <SummaryCard
          title="Average Order Value"
          value={`$${performanceData.summary.averageOrderValue.toFixed(2)}`}
          icon={<span className="text-2xl">📊</span>}
          trend={-1.5}
        />
      </div>

      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sales & Orders Trend</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData.trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#8884d8" name="Sales ($)" />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Products Performance</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData.topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard
            title="New Customers"
            value={performanceData.customerMetrics.newCustomers}
            icon={<span className="text-2xl">👥</span>}
            trend={2.8}
          />
          <SummaryCard
            title="Returning Customers"
            value={performanceData.customerMetrics.returningCustomers}
            icon={<span className="text-2xl">🔄</span>}
            trend={4.2}
          />
          <SummaryCard
            title="Churn Rate"
            value={`${performanceData.customerMetrics.churnRate}%`}
            icon={<span className="text-2xl">📉</span>}
            trend={-0.5}
          />
        </div>
      </div>
    </div>
    </DefaultLayout>
  );
};

export default ViewPerformance;
