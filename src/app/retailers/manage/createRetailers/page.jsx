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
    <div className="mb-6">
      <label className="block text-lg font-medium text-gray-800 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </div>
    </div>
  )

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-semibold text-gray-800 mb-3">Create New Retailer</h1>
            <p className="text-gray-600 text-lg">Add a new retailer to your network</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Profile Picture */}
                <div>
                  <div className="bg-gradient-to-b from-blue-50 to-purple-50 p-6 rounded-xl text-center">
                    <div className="mb-6">
                      {profilePicture ? (
                        <img
                          src={URL.createObjectURL(profilePicture)}
                          alt="Profile Preview"
                          className="w-40 h-40 rounded-full object-cover mx-auto ring-4 ring-white shadow-lg"
                        />
                      ) : (
                        <div className="w-40 h-40 rounded-full bg-gray-100 mx-auto flex items-center justify-center shadow-inner">
                          <User className="w-20 h-20 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor="picture-upload"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                      <Upload className="w-5 h-5" />
                      <span className="font-medium">Upload Profile Picture</span>
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

                {/* Right Column - Form Fields */}
                <div>
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

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200"
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
