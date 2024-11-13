'use client';
import React, { useState, useEffect } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast } from 'react-toastify'; // For notifications

const RetailerNotifications = () => {
  const [retailers, setRetailers] = useState([]);
  const [selectedRetailer, setSelectedRetailer] = useState('');
  const [notificationType, setNotificationType] = useState('order-update'); // order-update, new-product, discount-offer
  const [notificationContent, setNotificationContent] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');

  useEffect(() => {
    // Mock retailers data for now
    const mockRetailers = [
      { id: 1, name: 'Retailer A', email: 'retailerA@example.com' },
      { id: 2, name: 'Retailer B', email: 'retailerB@example.com' },
      { id: 3, name: 'Retailer C', email: 'retailerC@example.com' },
    ];
    setRetailers(mockRetailers);
  }, []);

  const handleSendNotification = () => {
    if (!selectedRetailer || !notificationContent) {
      toast.error('Please fill all fields.');
      return;
    }

    // Mock sending notification
    toast.success('Notification sent successfully!');
    setNotificationContent('');
    setSelectedRetailer('');
    setScheduleDate('');
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Retailer Notifications</h1>

        {/* Notification Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Notification</h3>

          {/* Select Retailer */}
          <select
            value={selectedRetailer}
            onChange={(e) => setSelectedRetailer(e.target.value)}
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          >
            <option value="">Select Retailer</option>
            {retailers.map(retailer => (
              <option key={retailer.id} value={retailer.id}>
                {retailer.name}
              </option>
            ))}
          </select>

          {/* Notification Type */}
          <div className="mb-4">
            <label className="mr-4 text-gray-700">Notification Type:</label>
            <select
              value={notificationType}
              onChange={(e) => setNotificationType(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="order-update">Order Status Update</option>
              <option value="new-product">New Product Arrival</option>
              <option value="discount-offer">Discount Offer</option>
            </select>
          </div>

          {/* Notification Content */}
          <textarea
            value={notificationContent}
            onChange={(e) => setNotificationContent(e.target.value)}
            placeholder="Notification content"
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
            rows="6"
          />

          {/* Schedule Date */}
          <div className="mb-4">
            <label className="text-gray-700">Schedule Date (Optional):</label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendNotification}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Send Notification
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RetailerNotifications;
