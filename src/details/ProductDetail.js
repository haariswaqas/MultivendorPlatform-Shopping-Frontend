import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useAuth } from '../authentication/AuthContext'; // Import AuthContext

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const { authState } = useAuth(); // Access the auth context
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8002/${id}`, {
          headers: {
            'Authorization': `Bearer ${authState.token}`, // Include the token in the headers
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch product details');
      }
    };

    fetchProduct();
  }, [id, authState.token]); // Dependency on token

  const handleEditClick = () => {
    navigate(`/edit-product/${id}`); // Navigate to the edit page
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-12 px-6 relative overflow-hidden">
      {/* Decorative Blurred Circles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto">
        <h2 className="text-5xl font-extrabold text-center mb-12 
        bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300">
          {product.name}
        </h2>
        <img src={product.img} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
        <p className="text-white text-lg mb-2">{product.desc}</p>
        <p className="text-2xl font-bold text-blue-300 mb-2">Price: ${product.price}</p>
        <p className="text-white mb-2">Available: {product.available ? 'Yes' : 'No'}</p>
        <p className="text-white mb-2">Stock: {product.stock}</p>
        <p className="text-white">Supplier: {product.seller}</p>
        {/* Edit Button */}
        <button
          onClick={handleEditClick}
          className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
        >
          Edit Product
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
