import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authentication/AuthContext';
import './App.css';  // Or './tailwind.css', depending on your file name

import NavBar from './essentials/NavBar';
import Home from './essentials/Home';
import AddressForm from './forms/AddressForm';
import ProductForm from './forms/ProductForm';
import Wishlist from './lists/Wishlist';
import ProductList from './lists/ProductList';
import ProductDetail from './details/ProductDetail';
import CategoryProductsList from './lists/CategoryProductsList';
import OrderForm from './forms/OrderForm';
import Login from './authentication/Login';
import Register from './authentication/Register';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                {/* NavBar is displayed on all pages */}
                
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} exact />
                    <Route path="/register" element={<Register />} exact />

                    <Route path="/add-address" element={<AddressForm />} exact />
                    <Route path="/add-product" element={<ProductForm />} exact />

                    <Route path="/make-order" element={<OrderForm />} exact />
                    <Route path="/wishlist" element={<Wishlist />} exact />
                    <Route path="/all-products" element={<ProductList />} exact />
                    <Route path="/products/:type" element={<CategoryProductsList />} exact />
                    <Route path="/product/:id" element={<ProductDetail />} exact />
                    
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
