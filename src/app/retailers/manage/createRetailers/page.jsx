'use client'
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';

const CreateRetailer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [storeNumber, setStoreNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = () => {
    const newRetailer = {
      id: new Date().getTime(),
      name,
      email,
      phone,
      address,
      companyName,
      storeNumber,
      profilePicture,
    };

    const storedRetailers = JSON.parse(localStorage.getItem('retailers')) || [];
    storedRetailers.push(newRetailer);
    localStorage.setItem('retailers', JSON.stringify(storedRetailers));

    toast.success('Retailer created successfully!');
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setCompanyName('');
    setStoreNumber('');
    setProfilePicture(null);
  };

  return (
    <DefaultLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Create Retailer</h2>

        <div className="mb-4">
          <label className="block">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Store Number</label>
          <input
            type="text"
            value={storeNumber}
            onChange={(e) => setStoreNumber(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="border p-2 w-full"
          />
          {profilePicture && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full border"
              />
            </div>
          )}
        </div>

        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
          Create Retailer
        </button>
        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default CreateRetailer;
