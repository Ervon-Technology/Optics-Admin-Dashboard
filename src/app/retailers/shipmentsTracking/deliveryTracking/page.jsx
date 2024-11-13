'use client';
import React, { useState, useEffect } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CSVLink } from 'react-csv';

const DeliveryTracking = () => {
  const [trackings, setTrackings] = useState([]);
  const [newTracking, setNewTracking] = useState({ orderId: '', trackingNumber: '', status: '' });

  useEffect(() => {
    // Mock tracking data for now
    const mockTrackings = [
      { orderId: '1001', trackingNumber: 'TN123', status: 'In Transit' },
      { orderId: '1002', trackingNumber: 'TN124', status: 'Delivered' },
      { orderId: '1003', trackingNumber: 'TN125', status: 'Pending' },
    ];
    setTrackings(mockTrackings);
  }, []);

  const handleTrackingChange = (e) => {
    const { name, value } = e.target;
    setNewTracking({ ...newTracking, [name]: value });
  };

  const handleAddTracking = () => {
    setTrackings([...trackings, newTracking]);
    setNewTracking({ orderId: '', trackingNumber: '', status: '' });
  };

  const data = trackings.map(({ orderId, trackingNumber, status }) => [orderId, trackingNumber, status]);

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Delivery Tracking</h1>

        {/* Add New Tracking Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Tracking</h3>
          <input
            type="text"
            name="orderId"
            value={newTracking.orderId}
            onChange={handleTrackingChange}
            placeholder="Order ID"
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          />
          <input
            type="text"
            name="trackingNumber"
            value={newTracking.trackingNumber}
            onChange={handleTrackingChange}
            placeholder="Tracking Number"
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          />
          <select
            name="status"
            value={newTracking.status}
            onChange={handleTrackingChange}
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button
            onClick={handleAddTracking}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Add Tracking
          </button>
        </div>

        {/* Tracking List */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking List</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Tracking Number</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {trackings.map((tracking, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{tracking.orderId}</td>
                  <td className="border px-4 py-2">{tracking.trackingNumber}</td>
                  <td className="border px-4 py-2">{tracking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export Data */}
        <CSVLink
          data={[['Order ID', 'Tracking Number', 'Status'], ...data]}
          filename="delivery_tracking.csv"
          className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
        >
          Export to CSV
        </CSVLink>
      </div>
    </DefaultLayout>
  );
};

export default DeliveryTracking;
