'use client'
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [frameType, setFrameType] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [frameWidth, setFrameWidth] = useState('');
  const [style, setStyle] = useState('');

  const handleSubmit = () => {
    const newProduct = {
      id: new Date().getTime(),
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

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    storedProducts.push(newProduct);
    localStorage.setItem('products', JSON.stringify(storedProducts));

    toast.success("Product created successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setProductName('');
    setDescription('');
    setPrice('');
    setBrand('');
    setImageURL('');
    setFrameType('');
    setMaterial('');
    setColor('');
    setSize('');
    setGender('');
    setFrameWidth('');
    setStyle('');
  };

  return (
    <DefaultLayout>
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Create Product</h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              id="imageURL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Frame Type */}
          <div>
            <label htmlFor="frameType" className="block text-sm font-medium text-gray-700 mb-2">
              Frame Type
            </label>
            <input
              type="text"
              id="frameType"
              value={frameType}
              onChange={(e) => setFrameType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Material */}
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-2">
              Material
            </label>
            <input
              type="text"
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Color */}
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <input
              type="text"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Size */}
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <input
              type="text"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Frame Width */}
          <div>
            <label htmlFor="frameWidth" className="block text-sm font-medium text-gray-700 mb-2">
              Frame Width
            </label>
            <input
              type="text"
              id="frameWidth"
              value={frameWidth}
              onChange={(e) => setFrameWidth(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Style */}
          <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
              Style
            </label>
            <input
              type="text"
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all font-medium"
          >
            Create Product
          </button>
        </div>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default CreateProduct;
