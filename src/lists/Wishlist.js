import React, { useEffect, useState } from 'react';
import { useAuth } from '../authentication/AuthContext'; // Import AuthContext

const Wishlist = () => {
  const { authState } = useAuth(); // Access the auth context
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`http://localhost:8002/wishlist`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authState.token}`, // Include the token in the headers
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch wishlist');
      }
    };

    if (authState.isAuthenticated) {
      fetchWishlist();
    }
  }, [authState]); // Dependency on authState

  return (
    <div>
      <h2>Your Wishlist</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {wishlist.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;