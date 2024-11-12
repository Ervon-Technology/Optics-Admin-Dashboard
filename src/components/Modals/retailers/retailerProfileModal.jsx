import React from 'react';

const RetailerProfileModal = ({ retailer, onClose }) => {
  if (!retailer) return null;

  const profileImageUrl = retailer.profilePicture
    ? URL.createObjectURL(retailer.profilePicture)
    : '/default-profile.png';

  const DetailRow = ({ label, value }) => (
    <div className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
      <div className="flex justify-between items-center">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-900 font-medium">{value}</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Retailer Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Profile Section */}
        <div className="px-6 py-8 flex items-center gap-6 bg-gray-50">
          <img
            src={profileImageUrl}
            alt={retailer.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{retailer.name}</h3>
            <p className="text-gray-500">{retailer.companyName}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-6 divide-y divide-gray-100">
          <DetailRow label="Email" value={retailer.email} />
          <DetailRow label="Phone" value={retailer.phone} />
          <DetailRow label="Address" value={retailer.address} />
          <DetailRow label="Store Number" value={retailer.storeNumber} />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-100">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerProfileModal;