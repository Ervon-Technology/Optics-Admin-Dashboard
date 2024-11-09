'use client'
import React from 'react';

const DeleteBrandModal = ({ brand, closeModal }) => {
  const handleDelete = () => {
    // Perform delete operation here (e.g., API call)
    const storedBrands = JSON.parse(localStorage.getItem('brands')) || [];
    const updatedBrands = storedBrands.filter(b => b.id !== brand.id);
    localStorage.setItem('brands', JSON.stringify(updatedBrands));
    console.log('Deleted brand:', brand.name);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Delete Brand</h2>
        <p>Are you sure you want to delete the brand <strong>{brand.name}</strong>?</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Yes, Delete
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

export default DeleteBrandModal;
