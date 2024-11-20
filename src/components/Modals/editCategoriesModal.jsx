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
    // Modify priceRange to display it as a range string
    let priceRangeDisplay = '';
    switch (editedCategory.priceRange) {
      case 'Low':
        priceRangeDisplay = '$0 - $50';
        break;
      case 'Medium':
        priceRangeDisplay = '$51 - $200';
        break;
      case 'High':
        priceRangeDisplay = '$201 - $500';
        break;
      case 'Premium':
        priceRangeDisplay = '$501 and above';
        break;
      default:
        priceRangeDisplay = '';
        break;
    }

    // Update the priceRange with the display value
    editedCategory.priceRange = priceRangeDisplay;

    saveCategory(editedCategory); // Pass updated category to parent component
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Category</h2>
        
        {/* Category Name */}
        <input
          type="text"
          name="name"
          value={editedCategory.name}
          onChange={handleChange}
          placeholder="Category Name"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />

        {/* Status */}
        <input
          type="text"
          name="status"
          value={editedCategory.status}
          onChange={handleChange}
          placeholder="Status"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        
        {/* Category Description */}
        <input
          type="text"
          name="description"
          value={editedCategory.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        
        {/* Price Range Dropdown */}
        <select
          name="priceRange"
          value={editedCategory.priceRange}
          onChange={handleChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        >
          <option value="$0-$50">$0 - $50</option>
          <option value="$51-$200">$51 - $200</option>
          <option value="$201-$500">$201 - $500</option>
          <option value="$501 and above">$501 and above</option>
        </select>

        {/* Editable Rating */}
        <input
          type="number"
          name="rating"
          value={editedCategory.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Action Buttons */}
        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
          <button onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
