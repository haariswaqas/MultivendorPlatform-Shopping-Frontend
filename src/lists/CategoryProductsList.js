import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext'; // Import AuthContext

const CategoryProductsList = () => {
  const { type } = useParams();
  const { authState } = useAuth(); // Access the auth context
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:8002/category/${type}`, {
          headers: {
            'Authorization': `Bearer ${authState.token}`, // Include the token in the headers
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch products by category');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch products by category');
      }
    };

    fetchProductsByCategory();
  }, [type, authState.token]); // Dependency on token

  return (
    <div>
      <h2>Products in {type} Category</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <p>Price: ${product.price}</p>
            <p>Available: {product.available ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProductsList;