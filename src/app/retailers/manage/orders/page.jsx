'use client';
import React, { useState, useEffect } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrderDetailsModal from '@/components/Modals/retailers/orderDetailModal';

const RetailerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const mockOrders = [
        {
          id: 1,
          retailer: 'Optics World',
          date: '2024-11-10',
          status: 'Pending',
          totalAmount: '$500',
          items: [
            { name: 'Aviator Frames', quantity: 10, price: '$50' },
            { name: 'Rectangle Frames', quantity: 5, price: '$100' },
          ],
          shippingAddress: '123 Main St, Optics City',
          contact: 'opticsworld@example.com',
        },
        {
          id: 2,
          retailer: 'Vision Pro',
          date: '2024-11-08',
          status: 'Shipped',
          totalAmount: '$300',
          items: [
            { name: 'Round Frames', quantity: 8, price: '$60' },
          ],
          shippingAddress: '456 Vision Ln, Vision Town',
          contact: 'visionpro@example.com',
        },
        {
          id: 3,
          retailer: 'Clear View',
          date: '2024-11-06',
          status: 'Delivered',
          totalAmount: '$420',
          items: [
            { name: 'Square Frames', quantity: 4, price: '$70' },
            { name: 'Cat Eye Frames', quantity: 2, price: '$105' },
          ],
          shippingAddress: '789 Clear St, Clear City',
          contact: 'clearview@example.com',
        },
        {
          id: 4,
          retailer: 'Frame House',
          date: '2024-11-05',
          status: 'Cancelled',
          totalAmount: '$200',
          items: [
            { name: 'Wayfarer Frames', quantity: 4, price: '$50' },
          ],
          shippingAddress: '321 Frame Rd, Frame Town',
          contact: 'framehouse@example.com',
        },
        {
          id: 5,
          retailer: 'OptiMax',
          date: '2024-11-04',
          status: 'Pending',
          totalAmount: '$350',
          items: [
            { name: 'Hexagon Frames', quantity: 5, price: '$70' },
          ],
          shippingAddress: '654 Opti St, Opti City',
          contact: 'optimax@example.com',
        },
        {
          id: 6,
          retailer: 'Lens Crafter',
          date: '2024-11-03',
          status: 'Shipped',
          totalAmount: '$640',
          items: [
            { name: 'Round Frames', quantity: 6, price: '$60' },
            { name: 'Oval Frames', quantity: 4, price: '$80' },
          ],
          shippingAddress: '789 Lens Ave, Lens Town',
          contact: 'lenscrafter@example.com',
        },
        {
          id: 7,
          retailer: 'Eyewear Express',
          date: '2024-11-02',
          status: 'Delivered',
          totalAmount: '$700',
          items: [
            { name: 'Pilot Frames', quantity: 7, price: '$70' },
          ],
          shippingAddress: '123 Express Rd, Eyewear City',
          contact: 'eyewearexpress@example.com',
        },
        {
          id: 8,
          retailer: 'Sharp Sight',
          date: '2024-10-30',
          status: 'Delivered',
          totalAmount: '$560',
          items: [
            { name: 'Square Frames', quantity: 8, price: '$70' },
          ],
          shippingAddress: '321 Sharp St, Sight Town',
          contact: 'sharpsight@example.com',
        },
        {
          id: 9,
          retailer: 'Bright Vision',
          date: '2024-10-28',
          status: 'Cancelled',
          totalAmount: '$400',
          items: [
            { name: 'Rectangle Frames', quantity: 4, price: '$100' },
          ],
          shippingAddress: '456 Bright Ln, Vision City',
          contact: 'brightvision@example.com',
        },
        {
          id: 10,
          retailer: 'Optical Hub',
          date: '2024-10-25',
          status: 'Pending',
          totalAmount: '$480',
          items: [
            { name: 'Aviator Frames', quantity: 6, price: '$80' },
          ],
          shippingAddress: '789 Optical Rd, Hub City',
          contact: 'opticalhub@example.com',
        },
        {
          id: 11,
          retailer: 'Lens Masters',
          date: '2024-10-24',
          status: 'Shipped',
          totalAmount: '$240',
          items: [
            { name: 'Oval Frames', quantity: 3, price: '$80' },
          ],
          shippingAddress: '123 Master St, Lens City',
          contact: 'lensmasters@example.com',
        },
        {
          id: 12,
          retailer: 'Clear Choice',
          date: '2024-10-22',
          status: 'Delivered',
          totalAmount: '$900',
          items: [
            { name: 'Cat Eye Frames', quantity: 10, price: '$90' },
          ],
          shippingAddress: '456 Choice Ave, Clear City',
          contact: 'clearchoice@example.com',
        },
      ];
      
    setOrders(mockOrders);
  }, []);

  const filteredOrders = orders.filter(order =>
    order.retailer.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'All' || order.status === statusFilter)
  );

  const StatusBadge = ({ status }) => {
    const getStatusClass = (status) => {
      switch (status) {
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(status)}`}>
        {status}
      </span>
    );
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Retailer Orders</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search by retailer..."
              className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Retailer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.retailer}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.totalAmount}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => openOrderModal(order)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                      onClick={() => alert(`Marking order #${order.id} as Cancelled`)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <p className="text-center text-gray-500 py-6">No orders found.</p>
          )}
        </div>

        {isModalOpen && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            closeModal={() => {
              setIsModalOpen(false);
              setSelectedOrder(null);
            }}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default RetailerOrders;
