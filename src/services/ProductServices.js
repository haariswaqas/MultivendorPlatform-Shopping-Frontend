import axios from 'axios';

const API_URL = 'http://localhost:8002/';

export const fetchProducts = async (token) => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch products');
  }
};

export const fetchProductsByCategory = async (token, type) => {
  try {
    const response = await fetch(`${API_URL}category/${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products by category')
    }
    
    const data = await response.json();
    return data; // Directly return the data, not data.products
  } catch (error) {
    throw new Error(error.message || 'failed to fetch products by category')
  }
}

export const updateLocalStorageWishlist = (updatedWishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(Array.from(updatedWishlist)));
};

export const updateLocalStorageCart = (updatedCart) => {
  localStorage.setItem('cart', JSON.stringify(Array.from(updatedCart)));
};

export const addToWishlist = async (productId, token) => {
  try {
    const response = await axios.put(
      `${API_URL}wishlist`,
      { _id: productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error adding product to wishlist: ' + error.message);
  }
};

export const removeFromWishlist = async (productId, token) => {
  try {
    const response = await axios.delete(`${API_URL}wishlist/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error removing product from wishlist: ' + error.message);
  }
};

export const addToCart = async (productId, quantity, token) => {
  try {
    const response = await axios.put(
      `${API_URL}cart`,
      { product: { _id: productId }, amount: quantity },  // Corrected request body structure
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error adding product to cart: ' + error.message);
  }
};


export const removeFromCart = async (productId, token) => {
  try {
    const response = await axios.delete(`${API_URL}cart/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error removing product from cart: ' + error.message);
  }
};