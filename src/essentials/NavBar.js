import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';

const NavBar = () => {
  const { authState, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <Link to="/" className="text-white text-2xl font-bold">
          MultiVendorApp
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          {authState.isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-white font-semibold">{authState.user?.email}</span>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <button className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-md">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
