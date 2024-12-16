import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';

// Product categories configuration
const PRODUCT_CATEGORIES = [
  'Electronics', 'Fashion', 'Home & Kitchen', 
  'Health & Personal Care', 'Books & Stationery', 
  'Sports & Outdoors', 'Toys & Games', 
  'Beauty & Cosmetics', 'Automotive', 
  'Jewelry & Accessories', 'Groceries & Food', 
  'Baby Products', 'Pet Supplies', 
  'Tools & Hardware', 'Office Supplies', 
  'Musical Instruments', 'Furniture', 
  'Art & Craft', 'Industrial & Scientific', 
  'Video Games', 'Music'
];

const ProductDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-20"
      onMouseLeave={onClose}
    >
      <div className="grid grid-cols-3 gap-2 p-4">
        {PRODUCT_CATEGORIES.map((category) => (
          <Link 
            key={category} 
            to={`/products/${category.replace(/\s+/g, '-')}`} 
            className="text-xs text-gray-700 hover:bg-blue-50 p-1 rounded text-center"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

const NavBar = () => {
  const { authState, dispatch } = useAuth();
  const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          MultiVendorApp
        </Link>

        <div className="flex items-center space-x-4">
          {authState.isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-white font-semibold">
                {authState.user?.email}
              </span>

              <div className="relative">
                <button 
                  onMouseEnter={() => setProductDropdownOpen(true)}
                  className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md"
                >
                  Products
                </button>
                <ProductDropdown 
                  isOpen={isProductDropdownOpen}
                  onClose={() => setProductDropdownOpen(false)}
                />
              </div>

              <Link to="/cart" className="text-white hover:bg-blue-700 px-4 py-2 rounded-md">
                Cart
              </Link>

              <Link to="/make-order" className="text-white hover:bg-blue-700 px-4 py-2 rounded-md">
                My Orders
              </Link>

              <Link to="/make-order" className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-md">
                Create Order
              </Link>

              <Link to="/account" className="text-white hover:bg-blue-700 px-4 py-2 rounded-md">
                Account
              </Link>

              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
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