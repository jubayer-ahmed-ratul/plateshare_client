import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Available Foods", path: "/foods" },
  ];

  const getActiveClass = ({ isActive }) =>
    isActive
      ? "text-white font-bold text-lg mx-2 md:mx-4 border-b-2 border-white"
      : "text-white font-bold text-lg mx-2 md:mx-4 hover:border-b-2 hover:border-gray-300";

  return (
    <div className="bg-[#0c4428] shadow-sm px-4 ">
      <div className="flex items-center justify-between h-16 max-w-full md:max-w-11/12 mx-auto">
        
        <div className="flex items-center">
          <div className="lg:hidden mr-2">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content bg-[#0c4428] text-white rounded-box mt-2 w-48 p-2 shadow-lg"
              >
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink to={link.path} className={getActiveClass}>
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                
              </ul>
            </div>
          </div>

          <NavLink
            to="/"
            className="text-xl md:text-3xl font-bold text-white"
          >
            PlateShare
          </NavLink>
        </div>

        <div className="hidden lg:flex space-x-4">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={getActiveClass}>
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {!user ? (
            <div className="flex  gap-2 md:gap-4">
              <NavLink
                to="/login"
                className="bg-green-700 hover:bg-green-800 text-white px-4 md:px-6 py-2 rounded font-semibold"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-white hover:bg-gray-200 text-green-800 px-4 md:px-6 py-2 rounded font-semibold"
              >
                Register
              </NavLink>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-white">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-[#0c4428] text-white rounded-box w-52 mt-3 p-2 shadow-lg"
              >
                <li>
                  <NavLink to="/add-food">Add Food</NavLink>
                </li>
                <li>
                  <NavLink to="/manage-foods">Manage My Foods</NavLink>
                </li>
                <li>
                  <NavLink to="/my-requests">My Food Requests</NavLink>
                </li>
                <li>
                  <button onClick={logout} className="w-full text-left">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
