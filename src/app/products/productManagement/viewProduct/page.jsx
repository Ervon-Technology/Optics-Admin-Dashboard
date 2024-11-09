'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditProductModal from '../../../../components/Modals/EditProductModal'; // Assuming EditProductModal is created
import DeleteProductModal from '../../../../components/Modals/DeleteProductModal'; // Assuming DeleteProductModal is created
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ViewProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle edit product click
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  // Handle delete product click
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  return (
    <DefaultLayout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">View Products</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by product name"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Product Table */}
      <table className="w-full border-collapse border border-gray-200 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-200">Product Name</th>
            <th className="p-2 border border-gray-200">Price</th>
            <th className="p-2 border border-gray-200">Brand</th>
            <th className="p-2 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="p-2 border border-gray-200">{product.name}</td>
              <td className="p-2 border border-gray-200">{product.price}</td>
              <td className="p-2 border border-gray-200">{product.brand}</td>
              <td className="p-2 border border-gray-200 space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-4 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product)}
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
        <EditProductModal
          product={selectedProduct}
          closeModal={() => setEditModalOpen(false)}
          setProducts={setProducts} // Pass setProducts to update the product list after edit
        />
      )}

      {deleteModalOpen && (
        <DeleteProductModal
          product={selectedProduct}
          closeModal={() => setDeleteModalOpen(false)}
          setProducts={setProducts} // Pass setProducts to update the product list after delete
        />
      )}
    </div>
    </DefaultLayout>
  );
};

export default ViewProducts;
