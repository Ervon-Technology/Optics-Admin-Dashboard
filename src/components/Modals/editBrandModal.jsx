'use client'
import React, { useState } from 'react';

const EditBrandModal = ({ brand, closeModal }) => {
  const [brandName, setBrandName] = useState(brand.name);
  const [status, setStatus] = useState(brand.status);
  const [logo, setLogo] = useState(brand.logo);
  const [description, setDescription] = useState(brand.description);
  const [country, setCountry] = useState(brand.country);
  const [yearEstablished, setYearEstablished] = useState(brand.yearEstablished);
  const [websiteURL, setWebsiteURL] = useState(brand.websiteURL);

  const handleSave = () => {
    const updatedBrand = {
      ...brand,
      name: brandName,
      status,
      logo,
      description,
      country,
      yearEstablished,
      websiteURL,
    };
    
    // Update the brand data in localStorage
    const storedBrands = JSON.parse(localStorage.getItem('brands')) || [];
    const updatedBrands = storedBrands.map(b => (b.id === brand.id ? updatedBrand : b));
    localStorage.setItem('brands', JSON.stringify(updatedBrands));

    console.log('Updated brand:', updatedBrand);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Edit Brand</h2>
        <div className="mb-4">
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Brand Name</label>
          <input
            type="text"
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo URL</label>
          <input
            type="text"
            id="logo"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700">Year Established</label>
          <input
            type="number"
            id="yearEstablished"
            value={yearEstablished}
            onChange={(e) => setYearEstablished(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="websiteURL" className="block text-sm font-medium text-gray-700">Website URL</label>
          <input
            type="url"
            id="websiteURL"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBrandModal;
