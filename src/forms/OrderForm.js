import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../authentication/AuthContext';

const OrderForm = () => {
    const { authState } = useAuth(); // Access user authentication state
    const [cart, setCart] = useState([]); // Cart items for the user
    const [error, setError] = useState(null); // Error handling

    // Fetch cart items on component mount
    useEffect(() => {
        if (authState.isAuthenticated) {
            fetchCart();
        }
    }, [authState.isAuthenticated]);

    // Fetch the user's cart items
    const fetchCart = async () => {
        try {
            const response = await axios.get('http://localhost:8003/cart', {
                headers: { Authorization: `Bearer ${authState.token}` },
            });
            setCart(response.data); // Set cart items to state
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch cart');
        }
    };

    // Handle placing the order
    const handlePlaceOrder = async () => {
        if (cart.length === 0) {
            setError('Your cart is empty. Please add items to the cart.');
            return;
        }

        const orderPayload = {
            items: cart[0].items, // Pass cart items to the order
            amount: cart[0].items.reduce((total, item) => total + item.product.price * item.unit, 0), // Calculate total amount
            status: 'Pending', // Order status
        };

        try {
            const response = await axios.post('http://localhost:8003/order', orderPayload, {
                headers: { Authorization: `Bearer ${authState.token}` },
            });
            alert('Order placed successfully!');
            fetchCart(); // Refresh cart after placing the order
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order');
        }
    };

    return (
        <div>
            <h1>Order Form</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}

            <h2>Cart Items</h2>
            {cart.length > 0 ? (
                cart.map((cartEntry) => (
                    <div key={cartEntry._id}>
                        <h4>Cart ID: {cartEntry._id}</h4>
                        <ul>
                            {cartEntry.items.map((item) => (
                                <li key={item._id}>
                                    <strong>{item.product.name}</strong> - Quantity: {item.unit}
                                    <p>Description: {item.product.desc}</p>
                                    <p>Price per unit: ${item.product.price}</p>
                                    <p>Total: ${item.product.price * item.unit}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No items in cart.</p>
            )}

            <h2>Place Order</h2>
            <button onClick={handlePlaceOrder} disabled={cart.length === 0}>
                Place Order
            </button>
        </div>
    );
};

export default OrderForm;
