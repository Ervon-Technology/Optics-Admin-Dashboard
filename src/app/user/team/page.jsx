'use client';
import React, { useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast } from 'react-toastify';
import {
  MoreHorizontal,
  ChevronDown,
  Users,
  ActivityIcon,
  Shield,
  Mail,
  Edit2,
  Eye,
  Lock,
  UserMinus,
  UserX,
  UserCheck,
  Plus,
  Search,
  Filter,
  X,
  Download
} from 'lucide-react';

// Card Components with responsive classes
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 sm:p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "default", className = "", ...props }) => {
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    destructive: "bg-red-600 hover:bg-red-700 text-white"
  };

  return (
    <button
      className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm sm:text-base ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    destructive: "bg-red-100 text-red-800"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Enhanced Dropdown Components with better mobile support
const DropdownMenu = ({ children, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 z-40 w-48 sm:w-56">{children}</div>
        </>
      )}
    </div>
  );
};

const DropdownMenuContent = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg ring-1 ring-black/5 max-h-[80vh] overflow-auto ${className}`}>
    <div className="py-1">{children}</div>
  </div>
);

const DropdownMenuItem = ({ children, onClick, className = "" }) => (
  <button
    className={`w-full text-left flex items-center gap-2 px-4 py-2.5 sm:py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const DropdownMenuSeparator = () => <div className="h-px bg-gray-200 my-1" />;

// Filter Panel Component
const FilterPanel = ({ showFilters, setShowFilters }) => (
  <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ${showFilters ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowFilters(false)} />
    <div className="absolute right-0 h-full w-full max-w-md bg-white shadow-xl">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">
        {/* Add your filter controls here */}
        <p className="text-gray-500">Filter controls coming soon...</p>
      </div>
    </div>
  </div>
);



const AddMemberModal = ({ isOpen, onClose, onAdd }) => {
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Sales'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...newMember,
      id: Date.now(),
      status: 'Active',
      lastActive: 'Just now'
    });
    setNewMember({ name: '', email: '', role: 'Sales' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-4">Add New Team Member</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  >
                    <option value="Sales">Sales</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                  <Button type="submit">
                    Add Member
                  </Button>
                  <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



// Main Component
const TeamManagement = () => {
  const [team, setTeam] = useState([
    { id: 1, name: 'John Doe', role: 'Sales', status: 'Active', email: 'john@example.com', lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', role: 'Accountant', status: 'Suspended', email: 'jane@example.com', lastActive: '1 day ago' },
  ]);
  const [activityLog, setActivityLog] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const availableRoles = ['Sales', 'Accountant', 'Super Admin', 'Manager'];

  // Handler functions (keeping original functionality)
  const handleToggleSuspendUser = (userId) => {
    setTeam(team.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
        toast.success(`User ${newStatus === 'Active' ? 'unsuspended' : 'suspended'} successfully!`);
        addLog(userId, newStatus === 'Active' ? 'Unsuspended' : 'Suspended');
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const handleDeleteUser = (userId) => {
    const user = team.find(user => user.id === userId);
    if (user.status === 'Suspended') {
      setTeam(team.filter(user => user.id !== userId));
      addLog(userId, 'Deleted');
      toast.success('User deleted successfully!');
    } else {
      toast.error('Only suspended users can be deleted.');
    }
  };

  const handleChangeRole = (userId, newRole) => {
    const user = team.find(user => user.id === userId);
    if (user.role === 'Super Admin') {
      toast.error("Super Admin role can't be changed.");
      return;
    }
    setTeam(team.map(user => user.id === userId ? { ...user, role: newRole } : user));
    addLog(userId, `Role changed to ${newRole}`);
    toast.success('User role updated successfully!');
  };

  const handleAddNewMember = () => {
    setShowAddModal(true);
  };

  const handleAddMemberSubmit = (newMember) => {
    setTeam([newMember, ...team]);
    addLog(newMember.id, 'Added to team');
    toast.success('New team member added successfully!');
  };

  const handleExportTeam = () => {
    // Prepare the CSV data
    const headers = ['Name', 'Email', 'Role', 'Status', 'Last Active'];
    const csvData = team.map(member => [
      member.name,
      member.email,
      member.role,
      member.status,
      member.lastActive
    ]);
    
    // Convert to CSV format
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `team-members-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Team data exported successfully!');
    addLog(null, 'Exported team data');
  };

  const addLog = (userId, action) => {
    const user = team.find(user => user.id === userId);
    setActivityLog([
      { id: Date.now(), name: user.name, action, timestamp: new Date().toLocaleString() },
      ...activityLog
    ]);
  };

  const RoleDropdown = ({ user }) => (
    <DropdownMenu
      trigger={
        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium">
          <Shield className="w-4 h-4" />
          <span className="max-w-[100px] sm:max-w-none truncate">{user.role}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      }
    >
      <DropdownMenuContent>
        {availableRoles.map(role => (
          <DropdownMenuItem
            key={role}
            onClick={() => handleChangeRole(user.id, role)}
          >
            {role}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
  

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Team Management</h1>
                <p className="text-sm sm:text-base text-gray-500 mt-1">Manage your team members and their permissions</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={handleExportTeam} className="hidden sm:flex">
                Export Team
              </Button>
              <Button onClick={handleAddNewMember} className="flex-1 sm:flex-none justify-center">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add New Member</span>
                <span className="sm:hidden">Add Member</span>
              </Button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search team members..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className={`justify-center ${showFilters ? 'bg-blue-50 text-blue-600' : ''}`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[2fr,1fr]">
          {/* Team List */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span>Team Members</span>
                <Badge variant="secondary" className="ml-2">
                  {team.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.map(user => (
                  <div key={user.id} className="p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex items-start sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                        <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-base sm:text-lg font-medium flex-shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold flex flex-wrap items-center gap-2">
                            <span className="truncate">{user.name}</span>
                            <Badge variant={user.status === 'Active' ? 'success' : 'destructive'}>
                              {user.status}
                            </Badge>
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                            <RoleDropdown user={user} />
                            <span className="text-sm text-gray-500 flex items-center gap-1 truncate">
                              <Mail className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{user.email}</span>
                            </span>
                            <span className="text-sm text-gray-400 hidden sm:block">
                              Last active: {user.lastActive}
                            </span>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu
                        trigger={
                          <button className="p-1.5 sm:p-2 hover:bg-white rounded-full transition-colors flex-shrink-0">
                            <MoreHorizontal className="h-5 w-5 text-gray-400" />
                          </button>
                        }
                      >
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => toast.info(`Viewing ${user.name}'s details`)}>
                            <Eye className="w-4 h-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Editing ${user.name}'s details`)}>
                            <Edit2 className="w-4 h-4" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Password reset email sent to ${user.email}`)}>
                            <Lock className="w-4 h-4" /> Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleSuspendUser(user.id)}>
                            {user.status === 'Active' ? (
                              <>
                                <UserMinus className="w-4 h-4" /> Suspend User</>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4" /> Unsuspend User
                              </>
                            )}
                          </DropdownMenuItem>
                          {user.status === 'Suspended' && (
                            <DropdownMenuItem 
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <UserX className="w-4 h-4" /> Delete User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-2 sm:hidden text-sm text-gray-400">
                      Last active: {user.lastActive}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card className="lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivityIcon className="w-5 h-5 text-blue-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] sm:max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {activityLog.length ? (
                  activityLog.map(log => (
                    <div key={log.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 transition-all hover:bg-gray-100">
                      <p className="font-medium text-gray-900 truncate">{log.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{log.action}</p>
                      <p className="text-xs text-gray-400 mt-1">{log.timestamp}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ActivityIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <AddMemberModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddMemberSubmit}
          />

        {/* Mobile-friendly Filter Panel */}
        <FilterPanel showFilters={showFilters} setShowFilters={setShowFilters} />

        {/* Mobile Actions Menu */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:hidden">
          <div className="flex justify-between gap-4">
            <Button
              variant="secondary"
              onClick={handleExportTeam}
              className="flex-1 justify-center"
            >
              Export Team
            </Button>
            <Button
              onClick={handleAddNewMember}
              className="flex-1 justify-center"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TeamManagement;