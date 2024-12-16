import React, { useState} from 'react';
import { useAuth } from '../authentication/AuthContext'; // Adjust the path as necessary

const ProductForm = () => {
  const { authState } = useAuth();// Access the auth context
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [type, setType] = useState('');
  const [unit, setUnit] = useState(0);
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(true);
  const [supplier, setSupplier] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      desc,
      img,
      type,
      unit,
      price,
      available,
      supplier,
    };

    try {
      const response = await fetch('http://localhost:8002/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.token}`, // Include the token in the headers
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const data = await response.json();
      setSuccess('Product created successfully!');
      // Optionally reset the form fields
      setName('');
      setDesc('');
      setImg('');
      setType('');
      setUnit(0);
      setPrice(0);
      setAvailable(true);
      setSupplier('');
    } catch (error) {
      setError(error.message || 'Failed to create product');
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="img">Image URL</label>
          <input
            id="img"
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="type">Type</label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="unit">Unit</label>
          <input
            id="unit"
            type="number"
            value={unit}
            onChange={(e) => setUnit(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="available">Available</label>
          <input
            id="available"
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="supplier">Supplier</label>
          <input
            id="supplier"
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
