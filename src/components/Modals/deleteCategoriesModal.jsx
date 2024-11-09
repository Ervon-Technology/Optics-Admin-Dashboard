// DeleteCategoryModal.js
import React from 'react';

const DeleteCategoryModal = ({ category, closeModal, confirmDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Delete Category</h2>
        <p>Are you sure you want to delete the category <strong>{category.name}</strong>?</p>
        <div className="flex justify-end mt-4">
          <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
          <button onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
