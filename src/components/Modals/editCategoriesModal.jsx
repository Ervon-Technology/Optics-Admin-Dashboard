'use client'
// EditCategoryModal.js
import React, { useState, useEffect } from 'react';

const EditCategoryModal = ({ category, closeModal, saveCategory }) => {
  const [editedCategory, setEditedCategory] = useState(category);

  useEffect(() => {
    setEditedCategory(category); // Load selected category data into the modal when it opens
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    saveCategory(editedCategory); // Pass updated category to parent component
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Category</h2>
        <input
          type="text"
          name="name"
          value={editedCategory.name}
          onChange={handleChange}
          placeholder="Category Name"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="status"
          value={editedCategory.status}
          onChange={handleChange}
          placeholder="Status"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="description"
          value={editedCategory.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="priceRange"
          value={editedCategory.priceRange}
          onChange={handleChange}
          placeholder="Price Range"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="popularity"
          value={editedCategory.popularity}
          onChange={handleChange}
          placeholder="Popularity"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
        <button onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  );
};

export default EditCategoryModal;
