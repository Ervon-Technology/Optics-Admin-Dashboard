import React from 'react';
import { FiX, FiEdit } from 'react-icons/fi';


const RetailerProfileModal = ({ retailer, onClose }) => {
  if (!retailer) return null;

  const profileImageUrl = retailer.profilePicture
    ? URL.createObjectURL(retailer.profilePicture)
    : '/default-profile.png';

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-60 flex justify-center mt-10 items-center z-50">
      <div className="bg-white p-8 rounded-lg w-11/12 max-w-3xl relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-red-500"
        >
          <FiX />
        </button>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Retailer Profile</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-gray-200"
            />
            <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full cursor-pointer">
              <FiEdit className="text-xl text-gray-600" />
              <input
                type="file"
                id="profilePicture"
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        {/* Retailer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="font-semibold text-gray-600 mb-2">Name:</div>
            <div className="text-lg text-gray-800">{retailer.name}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-600 mb-2">Email:</div>
            <div className="text-lg text-gray-800">{retailer.email}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-600 mb-2">Phone:</div>
            <div className="text-lg text-gray-800">{retailer.phone}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-600 mb-2">Address:</div>
            <div className="text-lg text-gray-800">{retailer.address}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-600 mb-2">Company Name:</div>
            <div className="text-lg text-gray-800">{retailer.companyName}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-600 mb-2">Store Number:</div>
            <div className="text-lg text-gray-800">{retailer.storeNumber}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetailerProfileModal;
