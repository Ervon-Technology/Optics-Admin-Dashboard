'use client'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { User, Mail, Phone, MapPin, Building2, Store, Upload, ArrowRight } from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css'

const CreateRetailer = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [storeNumber, setStoreNumber] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePicture(file)
    }
  }

  const handleSubmit = () => {
    const newRetailer = {
      id: new Date().getTime(),
      name,
      email,
      phone,
      address,
      companyName,
      storeNumber,
      profilePicture,
    }

    const storedRetailers = JSON.parse(localStorage.getItem('retailers')) || []
    storedRetailers.push(newRetailer)
    localStorage.setItem('retailers', JSON.stringify(storedRetailers))

    toast.success('Retailer created successfully!')
    setName('')
    setEmail('')
    setPhone('')
    setAddress('')
    setCompanyName('')
    setStoreNumber('')
    setProfilePicture(null)
  }

  const InputWithIcon = ({ icon: Icon, label, value, onChange, type = "text" }) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all duration-200"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </div>
    </div>
  )

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Retailer</h1>
            <p className="text-gray-600">Add a new retailer to your network</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl backdrop-filter">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left Column - Profile Picture */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-b from-blue-50 to-purple-50 p-6 rounded-xl">
                    <div className="text-center">
                      <div className="mb-6">
                        {profilePicture ? (
                          <img
                            src={URL.createObjectURL(profilePicture)}
                            alt="Profile Preview"
                            className="w-40 h-40 rounded-2xl object-cover mx-auto ring-4 ring-white shadow-lg"
                          />
                        ) : (
                          <div className="w-40 h-40 rounded-2xl bg-white mx-auto flex items-center justify-center shadow-inner">
                            <User className="w-20 h-20 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <label
                        htmlFor="picture-upload"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-blue-100 hover:border-blue-200"
                      >
                        <Upload className="w-5 h-5" />
                        <span className="font-medium">Upload Photo</span>
                      </label>
                      <input
                        id="picture-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Form Fields */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputWithIcon
                      icon={User}
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <InputWithIcon
                      icon={Mail}
                      label="Email"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputWithIcon
                      icon={Phone}
                      label="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <InputWithIcon
                      icon={MapPin}
                      label="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <InputWithIcon
                      icon={Building2}
                      label="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <InputWithIcon
                      icon={Store}
                      label="Store Number"
                      value={storeNumber}
                      onChange={(e) => setStoreNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200"
                >
                  Create Retailer
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </DefaultLayout>
  )
}

export default CreateRetailer