'use client'
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
      
      console.log('Brand Created:', newBrand);
      
      toast.success('Brand successfully created!', {
        position: 'top-right',
        autoClose: 3000,
      });
      
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
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="border-b pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Create Brand</h1>
            <p className="mt-2 text-gray-600">Fill in the details to create a new brand</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brand Name */}
              <div className="space-y-2">
                <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brandName"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  placeholder="Enter brand name"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Logo URL */}
              <div className="space-y-2">
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                  Brand Logo (Image URL)
                </label>
                <input
                  type="text"
                  id="logo"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  placeholder="Enter logo image URL"
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  placeholder="Enter the country where the brand is based"
                />
              </div>

              {/* Year Established */}
              <div className="space-y-2">
                <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700">
                  Year Established
                </label>
                <input
                  type="number"
                  id="yearEstablished"
                  value={yearEstablished}
                  onChange={(e) => setYearEstablished(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  placeholder="Enter the year the brand was established"
                />
              </div>

              {/* Website URL */}
              <div className="space-y-2">
                <label htmlFor="websiteURL" className="block text-sm font-medium text-gray-700">
                  Website URL
                </label>
                <input
                  type="url"
                  id="websiteURL"
                  value={websiteURL}
                  onChange={(e) => setWebsiteURL(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  placeholder="Enter brand's official website URL"
                />
              </div>
            </div>

            {/* Description - Full Width */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow h-32 resize-none"
                placeholder="Enter a short description of the brand"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Create Brand'
              )}
            </button>
          </form>
        </div>

        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default CreateBrand;