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
  Filter
} from 'lucide-react';

// Card Components (kept from original)
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
    destructive: "bg-red-600 hover:bg-red-700 text-white"
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

// Dropdown Components (kept from original with minor styling updates)
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
          <div className="absolute right-0 mt-2 z-40">{children}</div>
        </>
      )}
    </div>
  );
};

const DropdownMenuContent = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg ring-1 ring-black/5 ${className}`}>
    <div className="py-1">{children}</div>
  </div>
);

const DropdownMenuItem = ({ children, onClick, className = "" }) => (
  <button
    className={`w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const DropdownMenuSeparator = () => <div className="h-px bg-gray-200 my-1" />;

// Main Component
const TeamManagement = () => {
  const [team, setTeam] = useState([
    { id: 1, name: 'John Doe', role: 'Sales', status: 'Active', email: 'john@example.com', lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', role: 'Accountant', status: 'Suspended', email: 'jane@example.com', lastActive: '1 day ago' },
  ]);
  const [activityLog, setActivityLog] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const availableRoles = ['Sales', 'Accountant', 'Super Admin', 'Manager'];

  // ... (keeping all the handler functions from the original)
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
    toast.info('Opening new member form...');
  };

  const handleExportTeam = () => {
    toast.info('Preparing team export...');
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
          <span>{user.role}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      }
    >
      <DropdownMenuContent className="w-48">
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
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
                <p className="text-gray-500 mt-1">Manage your team members and their permissions</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={handleExportTeam}>
                Export Team
              </Button>
              <Button onClick={handleAddNewMember}>
                <Plus className="w-4 h-4" />
                Add New Member
              </Button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-4">
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
              className={showFilters ? 'bg-blue-50 text-blue-600' : ''}
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
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
                  <div key={user.id} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            {user.name}
                            <Badge variant={user.status === 'Active' ? 'success' : 'destructive'}>
                              {user.status}
                            </Badge>
                          </h3>
                          <div className="flex items-center gap-4 mt-1">
                            <RoleDropdown user={user} />
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {user.email}
                            </span>
                            <span className="text-sm text-gray-400">
                              Last active: {user.lastActive}
                            </span>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu
                        trigger={
                          <button className="p-2 hover:bg-white rounded-full transition-colors">
                            <MoreHorizontal className="h-5 w-5 text-gray-400" />
                          </button>
                        }
                      >
                        <DropdownMenuContent className="w-48">
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
                                <UserMinus className="w-4 h-4" /> Suspend User
                              </>
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivityIcon className="w-5 h-5 text-blue-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {activityLog.length ? (
                  activityLog.map(log => (
                    <div key={log.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="font-medium text-gray-900">{log.name}</p>
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
      </div>
    </DefaultLayout>
  );
};

export default TeamManagement;