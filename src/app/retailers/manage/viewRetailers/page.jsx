'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { EditModal, DeleteModal } from '../../../../components/Modals/retailers/editDeleteRetailersModal'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RetailerProfileModal from '../../../../components/Modals/retailers/retailerProfileModal'
import { Search, Edit2, Trash2, Store, Building2, ChevronRight, User, Phone, Mail } from 'lucide-react'

const ViewRetailers = () => {
  const [retailers, setRetailers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedRetailer, setSelectedRetailer] = useState(null)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedRetailers = JSON.parse(localStorage.getItem('retailers')) || []
    setRetailers(storedRetailers)
  }, [])

  const handleSearch = (e) => setSearchTerm(e.target.value)

  const filteredRetailers = retailers.filter((retailer) =>
    retailer.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (updatedRetailer) => {
    const updatedRetailers = retailers.map((r) => (r.id === updatedRetailer.id ? updatedRetailer : r))
    localStorage.setItem('retailers', JSON.stringify(updatedRetailers))
    setRetailers(updatedRetailers)
    setEditModalOpen(false)
    toast.success('Retailer updated successfully!')
  }

  const handleDelete = (retailerId) => {
    const updatedRetailers = retailers.filter((r) => r.id !== retailerId)
    localStorage.setItem('retailers', JSON.stringify(updatedRetailers))
    setRetailers(updatedRetailers)
    setDeleteModalOpen(false)
    toast.success('Retailer deleted successfully!')
  }

  const handleOpenProfile = (retailer) => {
    setSelectedRetailer(retailer)
    setProfileModalOpen(true)
  }

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">Retailers Directory</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage and view all your retailer accounts
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => router.push('/retailers/create')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Store className="h-4 w-4 mr-2" />
                  Add New Retailer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search retailers by name..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Retailers List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white rounded-xl shadow">
            {filteredRetailers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No retailers found matching your search.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredRetailers.map((retailer) => (
                  <div
                    key={retailer.id}
                    className="p-4 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {retailer.profilePicture ? (
                            <img
                              src={URL.createObjectURL(retailer.profilePicture)}
                              alt={retailer.name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div onClick={() => handleOpenProfile(retailer)} className="cursor-pointer">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {retailer.name}
                          </h3>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Building2 className="h-4 w-4 mr-1" />
                              {retailer.companyName}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Store className="h-4 w-4 mr-1" />
                              Store #{retailer.storeNumber}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => { setSelectedRetailer(retailer); setEditModalOpen(true); }}
                          className="p-2 text-gray-400 hover:text-yellow-500 transition-colors duration-150"
                          title="Edit Retailer"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => { setSelectedRetailer(retailer); setDeleteModalOpen(true); }}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-150"
                          title="Delete Retailer"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleOpenProfile(retailer)}
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-150"
                          title="View Profile"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
            onClose={() => setProfileModalOpen(false)}
          />
        )}
      </div>
    </DefaultLayout>
  )
}

export default ViewRetailers