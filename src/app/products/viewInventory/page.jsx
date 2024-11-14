'use client'
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Edit2, Trash, Plus, Search, Download } from 'lucide-react';
import { CSVLink } from 'react-csv';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

// Base Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Button Component
const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    destructive: "bg-red-600 hover:bg-red-700 text-white"
  };
  
  return (
    <button 
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${styles[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
};

// Product Form Component
const ProductForm = ({ product, onSubmit, onCancel }) => (
  <form onSubmit={e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // Convert numeric fields
    ['price', 'stock', 'alertStock'].forEach(field => {
      data[field] = Number(data[field]);
    });
    onSubmit(data);
  }}>
    {['name', 'price', 'stock', 'alertStock'].map(field => (
      <div key={field} className="mb-4">
        <label className="block text-sm font-medium mb-2 capitalize">
          {field.replace(/([A-Z])/g, ' $1')}
        </label>
        <input
          name={field}
          type={field === 'name' ? 'text' : 'number'}
          defaultValue={product?.[field]}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          min={field !== 'name' ? 0 : undefined}
          step={field === 'price' ? '0.01' : 1}
        />
      </div>
    ))}
    <div className="flex justify-end gap-3">
      <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      <Button type="submit">Save</Button>
    </div>
  </form>
);

// Main Inventory Component
const InventoryView = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Goggles Frame A', stock: 50, alertStock: 20, price: 30 },
    { id: 2, name: 'Goggles Frame B', stock: 5, alertStock: 10, price: 35 },
    { id: 3, name: 'Goggles Frame C', stock: 100, alertStock: 30, price: 25 }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const itemsPerPage = 5;
  
  // Filter and pagination
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Product Actions
  const handleProductChange = (id, updates) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
    toast.success('Product updated successfully');
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setSelectedItems(selectedItems.filter(item => item !== id));
    toast.success('Product deleted');
  };

  const handleBulkDelete = () => {
    setProducts(products.filter(p => !selectedItems.includes(p.id)));
    setSelectedItems([]);
    toast.success('Selected products deleted');
  };

  const handleAddProduct = (formData) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, { ...formData, id: newId }]);
    setShowAddModal(false);
    toast.success('Product added successfully');
  };

  // Selection Handlers
  const handleSelectAll = (checked) => {
    setSelectedItems(checked ? products.map(p => p.id) : []);
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <DefaultLayout>
    <Card className="max-w-7xl mx-auto m-8">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Inventory Management</CardTitle>
          <p className="text-gray-500 mt-1">Manage your product inventory</p>
        </div>
        <div className="flex gap-3">
          <CSVLink data={products} filename="inventory.csv" className="no-underline">
            <Button variant="secondary">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </CSVLink>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          {selectedItems.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete Selected ({selectedItems.length})
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    onChange={e => handleSelectAll(e.target.checked)}
                    checked={selectedItems.length === products.length}
                    className="rounded"
                  />
                </th>
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map(product => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(product.id)}
                      onChange={() => handleSelectItem(product.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">${product.price.toFixed(2)}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock < product.alertStock
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock < product.alertStock ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => setEditingProduct(product)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" onClick={() => handleDelete(product.id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="self-center">Page {currentPage}</span>
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage * itemsPerPage >= filteredProducts.length}
          >
            Next
          </Button>
        </div>
      </CardContent>

      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="Edit Product"
      >
        <ProductForm
          product={editingProduct}
          onSubmit={(data) => {
            handleProductChange(editingProduct.id, data);
            setEditingProduct(null);
          }}
          onCancel={() => setEditingProduct(null)}
        />
      </Modal>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
      >
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </Card>
    </DefaultLayout>
  );
};

export default InventoryView;