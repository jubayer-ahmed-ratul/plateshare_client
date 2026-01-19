import React, { useContext, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeProvider';
import { 
  Home, 
  Plus, 
  List, 
  Heart, 
  User, 
  LogOut, 
  Menu, 
  X,
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const sidebarMenuItems = [
    { name: 'Dashboard Home', path: '/dashboard', icon: Home },
    { name: 'Add Food', path: '/dashboard/add-food', icon: Plus },
    { name: 'Manage Foods', path: '/dashboard/manage-foods', icon: List },
    { name: 'My Requests', path: '/dashboard/my-requests', icon: Heart },
    { name: 'Update Profile', path: '/dashboard/profile', icon: User },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-themed-secondary">
      {/* Top Navbar */}
      <nav className="bg-[#0c4428] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-full px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <NavLink to="/" className="flex items-center">
                <span className="text-xl font-bold text-white">PlateShare</span>
              </NavLink>
            </div>

            {/* Right side - Theme Toggle and Profile Dropdown */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email)}&background=ffffff&color=0c4428`}
                    alt={user?.displayName || 'User'}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                  <span className="hidden md:block text-white font-medium">
                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-white transition-transform duration-200 ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    
                    {/* Profile Link */}
                    <button
                      onClick={() => {
                        navigate('/dashboard/profile');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </button>
                    
                    {/* Dashboard Home */}
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                    >
                      <Home size={16} />
                      <span>Dashboard Home</span>
                    </button>
                    
                    {/* Logout */}
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-themed-card shadow-lg transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          mt-16 lg:mt-0
        `}>
          <div className="flex flex-col h-full pt-6">
            <div className="px-6 mb-8">
              <h2 className="text-lg font-semibold text-themed-primary">Dashboard</h2>
            </div>
            
            {/* Back to Main Site - At top */}
            <div className="px-4 mb-4 border-b border-themed pb-4">
              <NavLink
                to="/"
                className="flex items-center space-x-3 px-4 py-3 text-themed-secondary hover:bg-themed-tertiary hover:text-themed-primary rounded-lg transition-colors duration-200"
              >
                <Home size={20} />
                <span>Back to Main Site</span>
              </NavLink>
            </div>
            
            <nav className="flex-1 px-4 space-y-2">
              {sidebarMenuItems.map((item, index) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-green-100 text-green-800 font-semibold dark:bg-green-800 dark:text-green-100'
                        : 'text-themed-secondary hover:bg-themed-tertiary hover:text-themed-primary'
                    }`
                  }
                >
                  <span className="flex items-center justify-center w-6 h-6 text-xs font-bold bg-green-600 text-white rounded-full">
                    {index + 1}
                  </span>
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;