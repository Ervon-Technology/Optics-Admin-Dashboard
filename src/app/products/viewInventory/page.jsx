'use client';
import React, { useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast } from 'react-toastify';
import { Edit2, Trash, Plus, Search, Filter, ChevronDown } from 'lucide-react';
import { CSVLink } from 'react-csv';

// Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "default", className = "", ...props }) => {
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    destructive: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    alert: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Inventory View Components
const InventoryView = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Goggles Frame A', stock: 50, alertStock: 20, price: 30 },
    { id: 2, name: 'Goggles Frame B', stock: 5, alertStock: 10, price: 35 },
    { id: 3, name: 'Goggles Frame C', stock: 100, alertStock: 30, price: 25 },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [alertStock, setAlertStock] = useState(null);
  const [productIdForAlert, setProductIdForAlert] = useState(null);
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(5); // Items per page
  const [bulkDelete, setBulkDelete] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', alertStock: '' });

  const handleSetAlertStock = (productId) => {
    setProductIdForAlert(productId);
    const product = products.find((p) => p.id === productId);
    setAlertStock(product.alertStock);
  };

  const handleSaveAlertStock = () => {
    setProducts(products.map(product => 
      product.id === productIdForAlert
        ? { ...product, alertStock }
        : product
    ));
    setProductIdForAlert(null);
    toast.success('Alert stock number updated successfully!');
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    toast.success('Product deleted successfully!');
  };

  const handleBulkDelete = () => {
    setProducts(products.filter(product => !bulkDelete.includes(product.id)));
    setBulkDelete([]);
    toast.success('Selected products deleted successfully!');
  };

  const handleFilter = () => {
    toast.info('Filters applied.');
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleBulkSelect = (productId) => {
    setBulkDelete((prev) =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setShowAddProductForm(false);
    setNewProduct({ name: '', price: '', stock: '', alertStock: '' });
    toast.success('New product added successfully!');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

   // Modal visibility and the product being edited
   const [showEditProductForm, setShowEditProductForm] = useState(false);
   const [productToEdit, setProductToEdit] = useState(null);
 
   // Function to open the modal and set the product to edit
   const handleEditClick = (product) => {
     setProductToEdit(product);
     setShowEditProductForm(true);
   };
 
   // Function to close the modal
   const closeModal = () => {
     setShowEditProductForm(false);
     setProductToEdit(null);
   };
 
   // Handle changes made to the product fields in the modal
   const handleProductChange = (e) => {
     const { name, value } = e.target;
     setProductToEdit({ ...productToEdit, [name]: value });
   };
 
   // Function to save edited product details
   const saveProductChanges = () => {
     setProducts((prevProducts) =>
       prevProducts.map((product) =>
         product.id === productToEdit.id ? productToEdit : product
       )
     );
     closeModal();
   };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Plus className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-gray-500 mt-1">View and manage the products in your inventory</p>
              </div>
            </div>
            <div className="flex gap-3">
              {/* Export to CSV */}
              <CSVLink
                data={products}
                filename="inventory.csv"
                className="no-underline"
              >
                <Button variant="secondary">
                  Export Inventory
                </Button>
              </CSVLink>

              {/* Add Product Modal */}
              <Button onClick={() => setShowAddProductForm(true)}>
                <Plus className="w-4 h-4" />
                Add New Product
              </Button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-blue-50 text-blue-600' : ''}
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {bulkDelete.length > 0 && (
          <div className="mb-4 flex gap-4">
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete Selected
            </Button>
          </div>
        )}

        {/* Inventory Table */}
        <div className="overflow-x-auto shadow-sm bg-white rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-sm font-medium text-left text-gray-500">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (bulkDelete.length === 0) {
                        setBulkDelete(products.map(p => p.id));
                      } else {
                        setBulkDelete([]);
                      }
                    }}
                    checked={bulkDelete.length === products.length}
                  />
                </th>
                <th className="py-3 px-6 text-sm font-medium text-left text-gray-500">Product Name</th>
                <th className="py-3 px-6 text-sm font-medium text-left text-gray-500">Price</th>
                <th className="py-3 px-6 text-sm font-medium text-left text-gray-500">Stock</th>
                <th className="py-3 px-6 text-sm font-medium text-left text-gray-500">Alert Stock</th>
                <th className="py-3 px-6 text-sm font-medium text-left text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map(product => (
                <tr key={product.id} className="border-b">
                  <td className="py-3 px-6 text-center">
                    <input
                      type="checkbox"
                      checked={bulkDelete.includes(product.id)}
                      onChange={() => handleBulkSelect(product.id)}
                    />
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-900">{product.name}</td>
                  <td className="py-3 px-6 text-sm text-gray-900">${product.price}</td>
                  <td className="py-3 px-6 text-sm text-gray-900">{product.stock}</td>
                  <td className="py-3 px-6 text-sm text-gray-900">
                    {product.stock < product.alertStock ? (
                      <Badge variant="alert">Alert</Badge>
                    ) : (
                      <Badge variant="default">Normal</Badge>
                    )}
                  </td>
                  <td className="py-3 px-6 flex items-center space-x-2">
                    <Button variant="secondary" onClick={() => handleEditClick(product)}>
                      <Edit2 className="w-5 h-5" />
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash className="w-5 h-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <Button
            variant="secondary"
            className="rounded-full"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="mx-4 self-center text-gray-500">Page {page}</span>
          <Button
            variant="secondary"
            className="rounded-full"
            onClick={() => handlePageChange(page + 1)}
            disabled={page * productsPerPage >= filteredProducts.length}
          >
            Next
          </Button>
        </div>

        {showEditProductForm && productToEdit && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-96">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Edit Product
      </h3>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={productToEdit.name}
          onChange={handleProductChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Stock
        </label>
        <input
          type="number"
          name="stock"
          value={productToEdit.stock}
          onChange={handleProductChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={productToEdit.price}
          onChange={handleProductChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Alert Stock
        </label>
        <input
          type="number"
          name="alertStock"
          value={productToEdit.alertStock || ''}
          onChange={handleProductChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={closeModal}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={saveProductChanges}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}


        {/* Add Product Modal */}
        {showAddProductForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Product</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddProduct();
                }}
              >
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={newProduct.name}
                    onChange={handleProductInputChange}
                    required
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={newProduct.price}
                    onChange={handleProductInputChange}
                    required
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={handleProductInputChange}
                    required
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="alertStock" className="block text-sm font-medium text-gray-700">
                    Alert Stock
                  </label>
                  <input
                    id="alertStock"
                    name="alertStock"
                    type="number"
                    value={newProduct.alertStock}
                    onChange={handleProductInputChange}
                    required
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="secondary" onClick={() => setShowAddProductForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Product</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default InventoryView;
