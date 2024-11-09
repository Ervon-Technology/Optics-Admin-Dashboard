'use client'
import React, { useState, useEffect } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EditCategoryModal from '../../../../components/Modals/editCategoriesModal';
import DeleteCategoryModal from '../../../../components/Modals/deleteCategoriesModal';

const ViewCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  // Load categories from localStorage on mount
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(storedCategories);
  }, []);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const updateCategory = (updatedCategory) => {
    const updatedCategories = categories.map(category =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setEditModalOpen(false);
  };

  const deleteCategory = () => {
    const updatedCategories = categories.filter(category => category.id !== selectedCategory.id);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setDeleteModalOpen(false);
  };

  return (
    <DefaultLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">View Categories</h1>
        <input
          type="text"
          placeholder="Search by category name"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-200">Category Name</th>
              <th className="p-2 border border-gray-200">Status</th>
              <th className="p-2 border border-gray-200">Description</th>
              <th className="p-2 border border-gray-200">Price Range</th>
              <th className="p-2 border border-gray-200">Popularity</th>
              <th className="p-2 border border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id} className="text-center">
                <td className="p-2 border border-gray-200">{category.name}</td>
                <td className="p-2 border border-gray-200">{category.status}</td>
                <td className="p-2 border border-gray-200">{category.description}</td>
                <td className="p-2 border border-gray-200">{category.priceRange}</td>
                <td className="p-2 border border-gray-200">{category.popularity}</td>
                <td className="p-2 border border-gray-200 space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="px-4 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
                    className="px-4 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modals */}
        {editModalOpen && (
          <EditCategoryModal
            category={selectedCategory}
            closeModal={() => setEditModalOpen(false)}
            saveCategory={updateCategory}
          />
        )}
        {deleteModalOpen && (
          <DeleteCategoryModal
            category={selectedCategory}
            closeModal={() => setDeleteModalOpen(false)}
            confirmDelete={deleteCategory}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default ViewCategories;
