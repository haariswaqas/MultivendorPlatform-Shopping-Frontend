import React, { useState } from 'react';
import { useAuth } from '../authentication/AuthContext';

const AddressForm = () => {
  const { authState } = useAuth();
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8001/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.token}`,
        },
        body: JSON.stringify({
          street,
          postalCode,
          city,
          country,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add address');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error.message || 'Failed to add address');
    }
  };

  return (
    <div>
      <h2>Add Address</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
            placeholder="Enter street"
          />
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            placeholder="Enter postal code"
          />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="Enter city"
          />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder="Enter country"
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Add Address</button>
      </form>
    </div>
  );
};

export default AddressForm;

