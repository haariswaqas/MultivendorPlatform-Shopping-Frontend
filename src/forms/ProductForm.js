import React, { useState, useEffect } from 'react';
import { useAuth } from '../authentication/AuthContext'; // Adjust the path as necessary
import { useParams } from 'react-router-dom'; // Import useParams to get the product ID

const ProductForm = () => {
  const { authState } = useAuth();
  const { id } = useParams(); // Get the product ID from the URL
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [type, setType] = useState('');
  const [stock, setStock] = useState(0); // Changed from unit to stock
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(true);
  const [seller, setSeller] = useState(''); // Changed from supplier to seller
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // List of product categories
  const PRODUCT_CATEGORIES = [
    'Electronics',
    'Fashion',
    'Home and Kitchen',
    'Health and Personal Care',
    'Books and Stationery',
    'Sports and Outdoors',
    'Toys and Games',
    'Beauty and Cosmetics',
    'Automotive',
    'Jewelry and Accessories',
    'Groceries and Food',
    'Baby Products',
    'Pet Supplies',
    'Tools and Hardware',
    'Office Supplies',
    'Musical Instruments',
    'Furniture',
    'Art and Craft',
    'Industrial and Scientific',
    'Video Games and Consoles',
    'Music'
  ];

  // Fetch product details if editing
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:8002/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authState.token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch product details');
          }
          const product = await response.json();
          setName(product.name);
          setDesc(product.desc);
          setImg(product.img);
          setType(product.type);
          setStock(product.stock); // Changed from unit to stock
          setPrice(product.price);
          setAvailable(product.available);
          setSeller(product.seller); // Changed from supplier to seller
        } catch (error) {
          setError(error.message || 'Failed to fetch product details');
        }
      };
      fetchProduct();
    }
  }, [id, authState.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      desc,
      img,
      type,
      stock, // Changed from unit to stock
      price,
      available,
      seller, // Changed from supplier to seller
    };

    try {
      const url = id
        ? `http://localhost:8002/product/${id}`
        : 'http://localhost:8002/product/create';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(id ? 'Failed to update product' : 'Failed to create product');
      }

      const data = await response.json();
      setSuccess(id ? 'Product updated successfully!' : 'Product created successfully!');
      if (!id) {
        // Reset form only when creating a new product
        setName('');
        setDesc('');
        setImg('');
        setType('');
        setStock(0); // Reset stock
        setPrice(0);
        setAvailable(true);
        setSeller(''); // Reset seller
      }
    } catch (error) {
      setError(error.message || 'Failed to save product');
    }
  };

  if (authState.user?.role === 'Buyer') {
    return <p>You do not have permission to create or edit a product.</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Edit Product' : 'Create Product'}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="img" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            id="img"
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a category</option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            id="price"
            type="number"
          
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="available" className="block text-sm font-medium text-gray-700">
            Available
          </label>
          <input
            id="available"
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="h-5 w-5"
          />
        </div>

        <div>
          <label htmlFor="seller" className="block text-sm font-medium text-gray-700">
            Seller
          </label>
          <input
            id="seller"
            type="text"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
        >
          {id ? 'Update Product' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
