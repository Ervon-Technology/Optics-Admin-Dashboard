'use client';
import React, { useState, useEffect } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast } from 'react-toastify'; // For notification on send success

const RetailerCommunications = () => {
  const [retailers, setRetailers] = useState([]);
  const [selectedRetailer, setSelectedRetailer] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('email'); // 'email' or 'in-app'

  useEffect(() => {
    // Mock retailers data for now
    const mockRetailers = [
      { id: 1, name: 'Retailer A', email: 'retailerA@example.com' },
      { id: 2, name: 'Retailer B', email: 'retailerB@example.com' },
      { id: 3, name: 'Retailer C', email: 'retailerC@example.com' },
    ];
    setRetailers(mockRetailers);
  }, []);

  const handleSendMessage = () => {
    if (!selectedRetailer || !subject || !message) {
      toast.error('Please fill all fields.');
      return;
    }

    // Send the message (Mocking sending)
    toast.success('Message sent successfully!');
    setSubject('');
    setMessage('');
    setSelectedRetailer('');
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Send Messages/Emails to Retailers</h1>

        {/* Message Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compose Message</h3>
          
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

          {/* Message Type */}
          <div className="mb-4">
            <label className="mr-4 text-gray-700">Message Type:</label>
            <select
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="email">Email</option>
              <option value="in-app">In-App Message</option>
            </select>
          </div>

          {/* Subject Input */}
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          />

          {/* Message Body */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message content"
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
            rows="6"
          />

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Send {messageType === 'email' ? 'Email' : 'Message'}
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RetailerCommunications;
