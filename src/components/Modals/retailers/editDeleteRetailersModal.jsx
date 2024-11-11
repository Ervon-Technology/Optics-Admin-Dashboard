// EditModal.jsx
import React, { useState, useEffect } from 'react';

const EditModal = ({ retailer, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [storeNumber, setStoreNumber] = useState('');

  useEffect(() => {
    if (retailer) {
      setName(retailer.name);
      setEmail(retailer.email);
      setPhone(retailer.phone);
      setAddress(retailer.address);
      setCompanyName(retailer.companyName);
      setStoreNumber(retailer.storeNumber);
    }
  }, [retailer]);

  const handleSave = () => {
    const updatedRetailer = {
      ...retailer,
      name,
      email,
      phone,
      address,
      companyName,
      storeNumber
    };
    onSave(updatedRetailer);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg w-1/3 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Retailer</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Store Number"
          value={storeNumber}
          onChange={(e) => setStoreNumber(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded mb-4 w-full">
          Save
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded w-full">
          Close
        </button>
      </div>
    </div>
  );
};

// DeleteModal.jsx
const DeleteModal = ({ retailer, onDelete, onClose }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div className="modal-content bg-white p-6 rounded-lg w-1/3 shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        Are you sure you want to delete {retailer.name} from {retailer.companyName} (Store #{retailer.storeNumber})?
      </h2>
      <div className="flex justify-between">
        <button onClick={() => onDelete(retailer.id)} className="bg-red-500 text-white p-2 rounded w-full mr-2">
          Delete
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded w-full">
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export { EditModal, DeleteModal };
