'use client';
import React, { useState, useEffect } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CSVLink } from 'react-csv';

const RetailerShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [newShipment, setNewShipment] = useState({ retailerName: '', orderId: '', status: '' });

  useEffect(() => {
    // Mock shipment data for now
    const mockShipments = [
      { retailerName: 'Retailer A', orderId: '1001', status: 'Pending' },
      { retailerName: 'Retailer B', orderId: '1002', status: 'Shipped' },
      { retailerName: 'Retailer C', orderId: '1003', status: 'Delivered' },
    ];
    setShipments(mockShipments);
  }, []);

  const handleShipmentChange = (e) => {
    const { name, value } = e.target;
    setNewShipment({ ...newShipment, [name]: value });
  };

  const handleAddShipment = () => {
    setShipments([...shipments, newShipment]);
    setNewShipment({ retailerName: '', orderId: '', status: '' });
  };

  const data = shipments.map(({ retailerName, orderId, status }) => [retailerName, orderId, status]);

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Retailer Shipments</h1>

        {/* Add New Shipment Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Shipment</h3>
          <input
            type="text"
            name="retailerName"
            value={newShipment.retailerName}
            onChange={handleShipmentChange}
            placeholder="Retailer Name"
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          />
          <input
            type="text"
            name="orderId"
            value={newShipment.orderId}
            onChange={handleShipmentChange}
            placeholder="Order ID"
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          />
          <select
            name="status"
            value={newShipment.status}
            onChange={handleShipmentChange}
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button
            onClick={handleAddShipment}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Add Shipment
          </button>
        </div>

        {/* Shipment List */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment List</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Retailer Name</th>
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{shipment.retailerName}</td>
                  <td className="border px-4 py-2">{shipment.orderId}</td>
                  <td className="border px-4 py-2">{shipment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export Data */}
        <CSVLink
          data={[['Retailer Name', 'Order ID', 'Status'], ...data]}
          filename="retailer_shipments.csv"
          className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
        >
          Export to CSV
        </CSVLink>
      </div>
    </DefaultLayout>
  );
};

export default RetailerShipments;
