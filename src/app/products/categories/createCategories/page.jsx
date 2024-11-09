'use client'
import React, { useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast, ToastContainer } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify

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

  return (
    <DefaultLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Create New Category</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <label htmlFor="categoryName" className="block text-gray-700 font-semibold mb-1">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter category name"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-gray-700 font-semibold mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter description"
            />
          </div>

          {/* Price Range */}
          <div>
            <label htmlFor="priceRange" className="block text-gray-700 font-semibold mb-1">
              Price Range
            </label>
            <input
              type="text"
              id="priceRange"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter price range"
            />
          </div>

          {/* Popularity */}
          <div>
            <label htmlFor="popularity" className="block text-gray-700 font-semibold mb-1">
              Popularity
            </label>
            <input
              type="text"
              id="popularity"
              value={popularity}
              onChange={(e) => setPopularity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter popularity score"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Create Category
          </button>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </DefaultLayout>
  );
};

export default CreateCategory;
