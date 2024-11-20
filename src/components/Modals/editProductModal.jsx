'use client'
import React, { useState, useEffect } from 'react';

const EditProductModal = ({ product, closeModal, setProducts }) => {
  // Initialize state based on product prop
  const [productName, setProductName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [brand, setBrand] = useState(product.brand);
  const [imageURL, setImageURL] = useState(product.imageURL);
  const [frameType, setFrameType] = useState(product.frameType);
  const [material, setMaterial] = useState(product.material);
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);
  const [gender, setGender] = useState(product.gender);
  const [frameWidth, setFrameWidth] = useState(product.frameWidth);
  const [style, setStyle] = useState(product.style);

  // Save product data when 'Save' button is clicked
  const handleSave = () => {
    const updatedProduct = {
      ...product,
      name: productName,
      description,
      price,
      brand,
      imageURL,
      frameType,
      material,
      color,
      size,
      gender,
      frameWidth,
      style,
    };

    // Update product in localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = storedProducts.map((p) =>
      p.id === product.id ? updatedProduct : p
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Update state in parent component
    setProducts(updatedProducts);

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Frame Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Frame Type</label>
          <input
            type="text"
            value={frameType}
            onChange={(e) => setFrameType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Material */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Material</label>
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Color */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Size */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Size</label>
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Frame Width */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Frame Width</label>
          <input
            type="text"
            value={frameWidth}
            onChange={(e) => setFrameWidth(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Style */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Style</label>
          <input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Save and Cancel Buttons */}
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProductModal;
