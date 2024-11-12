import React from 'react';

const OrderDetailsModal = ({ order, closeModal }) => {
  if (!order) return null; // Ensures modal only renders if there's an order

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        
        {/* Order details */}
        <p><strong>Retailer:</strong> {order.retailer}</p>
        <p><strong>Date:</strong> {order.date}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Amount:</strong> {order.totalAmount}</p>
        <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
        <p><strong>Contact:</strong> {order.contact}</p>
        
        <h3 className="mt-4 font-semibold">Items:</h3>
        <ul className="list-disc pl-5">
          {order.items.map((item, index) => (
            <li key={index}>{item.name} - {item.quantity} x {item.price}</li>
          ))}
        </ul>
        
        {/* Close button */}
        <button
          onClick={closeModal}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
