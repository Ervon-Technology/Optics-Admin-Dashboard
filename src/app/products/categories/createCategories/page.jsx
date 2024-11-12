'use client'
import React, { useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [status, setStatus] = useState('Active');
  const [description, setDescription] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [popularity, setPopularity] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError('Category name is required');
      return;
    }

    setError('');

    const newCategory = {
      id: Date.now(),
      name: categoryName,
      status,
      description,
      priceRange,
      popularity,
    };

    // Save to localStorage
    const existingCategories = JSON.parse(localStorage.getItem('categories')) || [];
    localStorage.setItem('categories', JSON.stringify([...existingCategories, newCategory]));

    // Show success toast notification
    toast.success('Category created successfully!');

    // Reset form fields
    setCategoryName('');
    setStatus('Active');
    setDescription('');
    setPriceRange('');
    setPopularity('');
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
            <h1 className="text-2xl font-bold text-gray-900">Create New Category</h1>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
            {/* Category Name */}
            <div>
              <label htmlFor="categoryName" className="block text-gray-700 font-semibold mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter category name"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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

            {/* Price Range */}
            <div>
              <label htmlFor="priceRange" className="block text-gray-700 font-semibold mb-2">
                Price Range
              </label>
              <input
                type="text"
                id="priceRange"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter price range"
              />
            </div>

            {/* Popularity */}
            <div>
              <label htmlFor="popularity" className="block text-gray-700 font-semibold mb-2">
                Popularity
              </label>
              <input
                type="text"
                id="popularity"
                value={popularity}
                onChange={(e) => setPopularity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter popularity score"
              />
            </div>

            {/* Submit Button */}
            <div className="flex ">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Category
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

export default CreateCategory;
