'use client'
import React from 'react';

const DeleteProductModal = ({ product, closeModal, setProducts }) => {
  const handleDelete = () => {
    // Delete product from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = storedProducts.filter(p => p.id !== product.id);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Update state
    setProducts(updatedProducts);

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this product?</h2>

        <div className="mb-4 text-center">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded mr-2"
          >
            Yes, Delete
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
