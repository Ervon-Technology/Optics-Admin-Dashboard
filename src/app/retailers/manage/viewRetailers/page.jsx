'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EditModal, DeleteModal } from '../../../../components/Modals/retailers/editDeleteRetailersModal';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RetailerProfileModal from '../../../../components/Modals/retailers/retailerProfileModal'; // Import the new modal component

const ViewRetailers = () => {
  const [retailers, setRetailers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false); // State to handle modal visibility
  const router = useRouter();

  useEffect(() => {
    const storedRetailers = JSON.parse(localStorage.getItem('retailers')) || [];
    setRetailers(storedRetailers);
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredRetailers = retailers.filter((retailer) =>
    retailer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (updatedRetailer) => {
    const updatedRetailers = retailers.map((r) => (r.id === updatedRetailer.id ? updatedRetailer : r));
    localStorage.setItem('retailers', JSON.stringify(updatedRetailers));
    setRetailers(updatedRetailers);
    setEditModalOpen(false);
    toast.success('Retailer updated successfully!');
  };

  const handleDelete = (retailerId) => {
    const updatedRetailers = retailers.filter((r) => r.id !== retailerId);
    localStorage.setItem('retailers', JSON.stringify(updatedRetailers));
    setRetailers(updatedRetailers);
    setDeleteModalOpen(false);
    toast.success('Retailer deleted successfully!');
  };

  const handleOpenProfile = (retailer) => {
    setSelectedRetailer(retailer);
    setProfileModalOpen(true); // Open the profile modal
  };

  return (
    <DefaultLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">View Retailers</h2>
        <input
          type="text"
          placeholder="Search Retailers..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 mb-4 w-full"
        />
        <div>
          {filteredRetailers.map((retailer) => (
            <div key={retailer.id} className="flex justify-between items-center mb-2 p-2 border-b">
              <span
                onClick={() => handleOpenProfile(retailer)} // Open profile modal on click
                className="cursor-pointer hover:text-blue-500"
              >
                {retailer.name} - {retailer.companyName} - Store #{retailer.storeNumber}
              </span>
              <div>
                <button
                  onClick={() => { setSelectedRetailer(retailer); setEditModalOpen(true); }}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => { setSelectedRetailer(retailer); setDeleteModalOpen(true); }}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
        {editModalOpen && (
          <EditModal
            retailer={selectedRetailer}
            onSave={handleEdit}
            onClose={() => setEditModalOpen(false)}
          />
        )}
        {deleteModalOpen && (
          <DeleteModal
            retailer={selectedRetailer}
            onDelete={handleDelete}
            onClose={() => setDeleteModalOpen(false)}
          />
        )}
        {profileModalOpen && (
          <RetailerProfileModal
            retailer={selectedRetailer}
            onClose={() => setProfileModalOpen(false)} // Close the modal
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default ViewRetailers;
