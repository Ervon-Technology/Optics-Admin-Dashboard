'use client';
import React, { useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast } from 'react-toastify';

const initialRoles = [
  { id: 1, name: 'Super Admin', permissions: ['Full Access', 'Manage Users', 'View Reports'] },
  { id: 2, name: 'Sales', permissions: ['View Sales Reports', 'Manage Orders'] },
  { id: 3, name: 'Accountant', permissions: ['View Financial Reports', 'Manage Invoices'] },
];

const availablePermissions = [
  'Full Access',
  'Manage Users',
  'View Reports',
  'Manage Orders',
  'View Sales Reports',
  'Manage Accounts',
  'View Financial Reports',
  'Manage Invoices'
];

const RolePermissions = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [newPermission, setNewPermission] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleAddPermission = (roleId) => {
    if (!newPermission) return toast.warn('Select a permission to add!');
    
    setRoles(prevRoles =>
      prevRoles.map(role => 
        role.id === roleId && !role.permissions.includes(newPermission)
          ? { ...role, permissions: [...role.permissions, newPermission] }
          : role
      )
    );
    toast.success(`Permission '${newPermission}' added!`);
    setNewPermission('');
  };

  const handleRemovePermission = (roleId, permission) => {
    setRoles(prevRoles =>
      prevRoles.map(role =>
        role.id === roleId
          ? { ...role, permissions: role.permissions.filter(perm => perm !== permission) }
          : role
      )
    );
    toast.success(`Permission '${permission}' removed.`);
  };

  const handleRoleChange = (e) => setSelectedRole(e.target.value);

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
    toast.success('Role deleted successfully!');
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Role Permissions Management</h1>

        {/* Role Permissions Management */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assign or Modify Permissions</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              onChange={handleRoleChange}
              value={selectedRole}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>

            <select
              onChange={(e) => setNewPermission(e.target.value)}
              value={newPermission}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Permission</option>
              {availablePermissions.map((perm, idx) => (
                <option key={idx} value={perm}>{perm}</option>
              ))}
            </select>

            <button
              onClick={() => handleAddPermission(parseInt(selectedRole))}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              disabled={!selectedRole || !newPermission}
            >
              Add Permission
            </button>
          </div>
        </div>

        {/* Display and Manage Roles with Permissions */}
        {roles.map(role => (
          <div key={role.id} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{role.name}</h3>
              <button
                onClick={() => handleDeleteRole(role.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete Role
              </button>
            </div>

            <ul className="list-disc pl-6 mb-4 mt-4">
              {role.permissions.length ? (
                role.permissions.map((perm, idx) => (
                  <li key={idx} className="text-gray-600 flex justify-between items-center">
                    {perm}
                    <button
                      onClick={() => handleRemovePermission(role.id, perm)}
                      className="ml-4 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-600 italic">No permissions assigned</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default RolePermissions;
