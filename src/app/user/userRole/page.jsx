'use client';
import React, { useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast } from 'react-toastify';

const UserRole = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', description: 'Full access to the system' },
    { id: 2, name: 'Sales', description: 'Manage sales and view related reports' },
    { id: 3, name: 'Accountant', description: 'Manage accounts and view financial reports' }
  ]);

  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [editRole, setEditRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 5;

  // Handle adding a new role
  const handleAddRole = () => {
    if (!newRole.name || !newRole.description) {
      toast.error('Please fill in both fields.');
      return;
    }
    const newId = roles.length ? roles[roles.length - 1].id + 1 : 1;
    setRoles([...roles, { id: newId, ...newRole }]);
    setNewRole({ name: '', description: '' });
    toast.success('New role added successfully!');
  };

  // Handle editing a role
  const handleEditRole = (roleId) => {
    const roleToEdit = roles.find(role => role.id === roleId);
    setEditRole(roleToEdit);
  };

  const handleSaveEdit = () => {
    setRoles(roles.map(role => (role.id === editRole.id ? editRole : role)));
    setEditRole(null);
    toast.success('Role updated successfully!');
  };

  // Handle deleting a role
  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
    toast.success('Role deleted successfully!');
  };

  // Handle search functionality
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">User Roles</h1>

        {/* Add New Role */}
        <div className="mb-6 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-4">Add New Role</h3>
          <input
            type="text"
            placeholder="Role Name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            className="border p-2 mr-2 rounded"
          />
          <input
            type="text"
            placeholder="Role Description"
            value={newRole.description}
            onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
            className="border p-2 mr-2 rounded"
          />
          <button
            onClick={handleAddRole}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Role
          </button>
        </div>

        {/* Search Roles */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Roles List */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {currentRoles.map(role => (
            <div key={role.id} className="flex items-center justify-between p-4 border-b">
              <div>
                {editRole && editRole.id === role.id ? (
                  <div>
                    <input
                      type="text"
                      value={editRole.name}
                      onChange={(e) => setEditRole({ ...editRole, name: e.target.value })}
                      className="border p-2 mr-2 rounded"
                    />
                    <input
                      type="text"
                      value={editRole.description}
                      onChange={(e) => setEditRole({ ...editRole, description: e.target.value })}
                      className="border p-2 mr-2 rounded"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditRole(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold">{role.name}</h3>
                    <p className="text-gray-600">{role.description}</p>
                  </>
                )}
              </div>
              <div>
                <button
                  onClick={() => handleEditRole(role.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={indexOfLastRole >= filteredRoles.length}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserRole;
