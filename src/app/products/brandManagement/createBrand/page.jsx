'use client'
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify and ToastContainer
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify's CSS

const CreateBrand = () => {
  const [brandName, setBrandName] = useState('');
  const [status, setStatus] = useState('Active');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [yearEstablished, setYearEstablished] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock API request (replace with actual API call)
    try {
      // Fetch the existing brands data from localStorage
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
      // Add the new brand to local storage
      localStorage.setItem('brands', JSON.stringify([...storedBrands, newBrand]));
      
      console.log('Brand Created:', newBrand);
      
      // Show success message using Toastify (updated to use string for position)
      toast.success('Brand successfully created!', {
        position: 'top-right', // Use string instead of toast.POSITION
        autoClose: 3000,  // Show for 3 seconds
      });
      
      // Reset form fields
      setBrandName('');
      setStatus('Active');
      setLogo('');
      setDescription('');
      setCountry('');
      setYearEstablished('');
      setWebsiteURL('');
    } catch (err) {
      setError('Failed to create brand');
      toast.error('Error creating brand!', {
        position: 'top-right',  // Use string instead of toast.POSITION
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Create Brand</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Brand Name</label>
            <input
              type="text"
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter brand name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Brand Logo (Image URL)</label>
            <input
              type="text"
              id="logo"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter logo image URL"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter a short description of the brand"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter the country where the brand is based"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700">Year Established</label>
            <input
              type="number"
              id="yearEstablished"
              value={yearEstablished}
              onChange={(e) => setYearEstablished(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter the year the brand was established"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="websiteURL" className="block text-sm font-medium text-gray-700">Website URL</label>
            <input
              type="url"
              id="websiteURL"
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter brand's official website URL"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded mt-4"
          >
            {loading ? 'Saving...' : 'Create Brand'}
          </button>
        </form>
      </div>

      {/* Toast container to show notifications */}
      <ToastContainer />
    </DefaultLayout>
  );
};

export default CreateBrand;
