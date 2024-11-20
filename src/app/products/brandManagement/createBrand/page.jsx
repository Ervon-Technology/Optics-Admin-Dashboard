'use client'
import React, { useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const CreateBrand = () => {
  const [brandName, setBrandName] = useState('');
  const [status, setStatus] = useState('Active');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [yearEstablished, setYearEstablished] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!brandName.trim()) {
      setErrorMessage('Brand name is required');
      return;
    }

    setErrorMessage('');

    try {
      const storedBrands = JSON.parse(localStorage.getItem('brands')) || [];
      const newBrand = {
        id: Date.now(),
        name: brandName,
        status,
        logo,
        description,
        country,
        yearEstablished,
        websiteURL,
      };
      localStorage.setItem('brands', JSON.stringify([...storedBrands, newBrand]));
      
      // Show success toast notification
      toast.success('Brand created successfully!');
      
      // Reset form fields
      setBrandName('');
      setStatus('Active');
      setLogo('');
      setDescription('');
      setCountry('');
      setYearEstablished('');
      setWebsiteURL('');
    } catch (err) {
      setErrorMessage('Failed to create brand');
      toast.error('Error creating brand!');
    }
  };

  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'active':
          return 'bg-emerald-100 text-emerald-800';
        case 'inactive':
          return 'bg-gray-100 text-gray-800';
        default:
          return 'bg-blue-100 text-blue-800';
      }
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
        {status}
      </span>
    );
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Create New Brand</h1>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
            {/* Brand Name */}
            <div>
              <label htmlFor="brandName" className="block text-gray-700 font-semibold mb-2">
                Brand Name
              </label>
              <input
                type="text"
                id="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter brand name"
              />
              {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Logo URL */}
            <div>
              <label htmlFor="logo" className="block text-gray-700 font-semibold mb-2">
                Brand Logo (Image URL)
              </label>
              <input
                type="text"
                id="logo"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter logo image URL"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter description"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter the country where the brand is based"
              />
            </div>

            {/* Year Established */}
            <div>
              <label htmlFor="yearEstablished" className="block text-gray-700 font-semibold mb-2">
                Year Established
              </label>
              <input
                type="number"
                id="yearEstablished"
                value={yearEstablished}
                onChange={(e) => setYearEstablished(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter the year the brand was established"
              />
            </div>

            {/* Website URL */}
            <div>
              <label htmlFor="websiteURL" className="block text-gray-700 font-semibold mb-2">
                Website URL
              </label>
              <input
                type="url"
                id="websiteURL"
                value={websiteURL}
                onChange={(e) => setWebsiteURL(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter brand's official website URL"
              />
            </div>

            {/* Submit Button */}
            <div className="flex">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Brand
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </DefaultLayout>
  );
};

export default CreateBrand;