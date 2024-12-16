import React, { useEffect, useState } from 'react';
import { useAuth } from '../authentication/AuthContext';
import { Link } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  PackageIcon, 
  UserIcon, 
  LogOutIcon, 
  GridIcon 
} from 'lucide-react';

const FeatureCard = ({ icon, title, description, linkTo, linkText }) => (
  <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 space-y-4">
    <div className="flex items-center justify-between">
      <div className="bg-white/20 p-3 rounded-full">{icon}</div>
      <Link to={linkTo} className="text-blue-200 hover:text-white transition-colors">
        {linkText}
      </Link>
    </div>
    <div>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-white/75 text-sm">{description}</p>
    </div>
  </div>
);

const Home = () => {
  const { authState, dispatch } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8001/profile', {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch profile');
      }
    };

    if (authState.isAuthenticated) {
      fetchProfile();
    }
  }, [authState.token, authState.isAuthenticated]);

  const guestButtons = (
    <div className="flex justify-center space-x-6 mt-8">
      <Link 
        to="/login" 
        className="px-8 py-3 bg-white/20 backdrop-blur-lg text-white rounded-full 
        hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
      >
        <UserIcon className="w-5 h-5" />
        <span>Login</span>
      </Link>
      <Link 
        to="/register" 
        className="px-8 py-3 bg-blue-600/70 backdrop-blur-lg text-white rounded-full 
        hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2"
      >
        <GridIcon className="w-5 h-5" />
        <span>Register</span>
      </Link>
    </div>
  );

  const buyerFeatures = [
    {
      icon: <ShoppingCartIcon className="w-6 h-6 text-white" />,
      title: "Shopping Cart",
      description: "Manage your selected products and proceed to checkout.",
      linkTo: "/cart",
      linkText: "View Cart"
    },
    {
      icon: <HeartIcon className="w-6 h-6 text-white" />,
      title: "Wishlist",
      description: "Save and track your favorite products.",
      linkTo: "/wishlist",
      linkText: "My Wishlist"
    },
    {
      icon: <PackageIcon className="w-6 h-6 text-white" />,
      title: "Order Products",
      description: "Browse and order from a wide range of products.",
      linkTo: "/shop",
      linkText: "Shop Now"
    }
  ];

  const sellerFeatures = [
    {
      icon: <GridIcon className="w-6 h-6 text-white" />,
      title: "Product Listing",
      description: "Add and manage your product offerings.",
      linkTo: "/add-product",
      linkText: "Add Product"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
      <div className="container mx-auto px-6 py-12 relative">
        {/* Decorative Blurred Circles */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>

        <h1 className="text-6xl font-extrabold text-center mb-4 
        bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300 
        animate-gradient-x">MultiVendor App</h1>
        
        {authState.isAuthenticated ? (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">
                Welcome, {authState.user.email}
              </h2>
              <p className="text-white/75">
                {authState.user.role === 'seller' 
                  ? "Manage your seller dashboard" 
                  : "Discover and shop from multiple vendors"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* User-Specific Features */}
              {authState.user.role === 'buyer' && 
                buyerFeatures.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))
              }

              {authState.user.role === 'seller' && 
                sellerFeatures.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))
              }

              {/* Common Features */}
              <FeatureCard 
                icon={<UserIcon className="w-6 h-6 text-white" />}
                title="Profile Management"
                description="Update your personal information and settings."
                linkTo="/profile"
                linkText="Edit Profile"
              />
            </div>

            <div className="text-center mt-12">
              <button
                onClick={handleLogout}
                className="px-8 py-3 bg-red-600/70 backdrop-blur-lg text-white 
                rounded-full hover:bg-red-600 transition-all duration-300 
                flex items-center space-x-2 mx-auto"
              >
                <LogOutIcon className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xl text-white/75 mb-8">
              Explore a seamless multi-vendor shopping experience
            </p>
            {guestButtons}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;