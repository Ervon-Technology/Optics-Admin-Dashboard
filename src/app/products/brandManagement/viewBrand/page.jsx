'use client'
import React, { useState, useEffect } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EditBrandModal from '../../../../components/Modals/editBrandModal';
import DeleteBrandModal from '../../../../components/Modals/deleteBrandModal';

const ViewBrands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brands, setBrands] = useState([]);

  // Fetch brands from localStorage whenever the component is mounted or updated
  useEffect(() => {
    const storedBrands = JSON.parse(localStorage.getItem('brands')) || [];
    setBrands(storedBrands);
  }, []); // Empty dependency array ensures this only runs once on component mount

  // Handle delete action and update state and localStorage
  const handleDeleteBrand = (brandId) => {
    const updatedBrands = brands.filter(brand => brand.id !== brandId);
    
    // Update localStorage with the new list
    localStorage.setItem('brands', JSON.stringify(updatedBrands));

    // Update the state to remove the deleted brand
    setBrands(updatedBrands);

    // Close the delete modal
    setDeleteModalOpen(false);
  };

  // Handle the save operation after editing the brand
  const handleEditBrand = (updatedBrand) => {
    const updatedBrands = brands.map(brand => 
      brand.id === updatedBrand.id ? updatedBrand : brand
    );

    // Update localStorage with the updated list
    localStorage.setItem('brands', JSON.stringify(updatedBrands));

    // Update the state with the new brands list
    setBrands(updatedBrands);

    // Close the edit modal
    setEditModalOpen(false);
  };

  // Filtering brands based on search term
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open edit modal and set selected brand
  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setEditModalOpen(true);
  };

  // Open delete modal and set selected brand
  const handleDelete = (brand) => {
    setSelectedBrand(brand);
    setDeleteModalOpen(true);
  };

  return (
    <DefaultLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">View Brands</h1>
        <input
          type="text"
          placeholder="Search by brand name"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-200">Brand Name</th>
              <th className="p-2 border border-gray-200">Status</th>
              <th className="p-2 border border-gray-200">Country</th>
              <th className="p-2 border border-gray-200">Year Established</th>
              <th className="p-2 border border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.map((brand) => (
              <tr key={brand.id} className="text-center">
                <td className="p-2 border border-gray-200">{brand.name}</td>
                <td className="p-2 border border-gray-200">{brand.status}</td>
                <td className="p-2 border border-gray-200">{brand.country}</td>
                <td className="p-2 border border-gray-200">{brand.yearEstablished}</td>
                <td className="p-2 border border-gray-200 space-x-2">
                  <button
                    onClick={() => handleEdit(brand)}
                    className="px-4 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(brand)}
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
          <EditBrandModal
            brand={selectedBrand}
            closeModal={() => setEditModalOpen(false)}
            onEdit={handleEditBrand} // Pass handleEditBrand to EditBrandModal
          />
        )}
        {deleteModalOpen && (
          <DeleteBrandModal
            brand={selectedBrand}
            closeModal={() => setDeleteModalOpen(false)}
            onDelete={() => handleDeleteBrand(selectedBrand.id)} // Pass handleDeleteBrand to DeleteBrandModal
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default ViewBrands;
