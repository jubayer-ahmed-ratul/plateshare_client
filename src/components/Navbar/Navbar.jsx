import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"; 
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut, Plus, List, Heart } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // 3 routes when logged out
  const publicNavLinks = [
    { name: "Home", path: "/" },
    { name: "Available Foods", path: "/available-foods" },
    { name: "About", path: "/about" },
  ];

  // 5 routes when logged in (3 public + 2 protected)
  const protectedNavLinks = [
    { name: "Add Food", path: "/add-food", icon: Plus },
    { name: "Manage Foods", path: "/manage-foods", icon: List },
    { name: "My Requests", path: "/my-req", icon: Heart },
  ];

  const getActiveClass = ({ isActive }) =>
    isActive
      ? "text-white font-bold border-b-2 border-white"
      : "text-white/90 hover:text-white hover:border-b-2 hover:border-white/50 transition-all duration-200";

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="w-full bg-[#0c4428] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-full px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#0c4428] font-bold text-xl">P</span>
              </div>
              <span className="text-xl md:text-2xl font-bold text-white">PlateShare</span>
            </NavLink>
          </div>

          {/* Desktop Navigation - Public Routes */}
          <div className="hidden lg:flex items-center space-x-8">
            {publicNavLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={getActiveClass}>
                {link.name}
              </NavLink>
            ))}
            
            {/* Protected Routes - Only visible when logged in */}
            {user && protectedNavLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={({ isActive }) => 
                  `flex items-center space-x-1 px-3 py-2 transition-all duration-200 ${getActiveClass({ isActive })}`
                }
              >
                <link.icon size={16} />
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Side - Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              /* Advanced Profile Dropdown Menu */
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=ffffff&color=0c4428`}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                  <span className="hidden md:block text-white font-medium">
                    {user.displayName || user.email?.split('@')[0] || 'User'}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-white transition-transform duration-200 ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Advanced Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    {/* Profile Link */}
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                    >
                      <User size={16} />
                      <span>View Profile</span>
                    </button>
                    
                    {/* Mobile Protected Routes */}
                    <div className="lg:hidden border-t border-gray-200 mt-2 pt-2">
                      {protectedNavLinks.map((link) => (
                        <button
                          key={link.path}
                          onClick={() => {
                            navigate(link.path);
                            setIsProfileDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                        >
                          <link.icon size={16} />
                          <span>{link.name}</span>
                        </button>
                      ))}
                    </div>
                    
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
            ) : (
              /* Auth Buttons for Non-logged Users */
              <div className="flex items-center space-x-3">
                <NavLink
                  to="/login"
                  className="hidden md:block text-white hover:text-gray-200 transition-colors"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-white hover:bg-gray-100 text-[#0c4428] px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Register
                </NavLink>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 py-4">
            <div className="space-y-2">
              {/* Public Routes */}
              {publicNavLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `block px-4 py-2 text-white transition-colors ${
                      isActive ? 'bg-white/20 font-bold' : 'hover:bg-white/10'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              
              {/* Auth for Mobile */}
              {!user && (
                <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
                  <NavLink
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block mx-4 py-2 px-4 bg-white text-[#0c4428] rounded-lg font-semibold text-center"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
