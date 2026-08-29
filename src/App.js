import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Login from './components/Login';
import CreditCard from './components/CreditCard';
import './App.css';

const GOOGLE_CLIENT_ID = "704894479211-g7d72u5sluqch55e92d3199ht25irete.apps.googleusercontent.com";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('eztech_auth') === 'true';
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('eztech_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [warning, setWarning] = useState(false);

  useEffect(() => {
    localStorage.setItem('eztech_cart', JSON.stringify(cart));
  }, [cart]);

  const handleClick = (item) => {
    const isSubscription = item.id <= 4;
    const existingIndex = cart.findIndex((product) => product.id === item.id);

    if (existingIndex !== -1) {
      if (isSubscription) {
        setWarning(true);
        setTimeout(() => setWarning(false), 3500);
        return;
      } else {
        const updatedCart = [...cart];
        updatedCart[existingIndex].amount += 1;
        setCart(updatedCart);
        return;
      }
    }

    setCart([...cart, { ...item, amount: 1 }]);
  };

  const handleChange = (item, d) => {
    const ind = cart.findIndex((product) => product.id === item.id);
    if (ind === -1) return;

    const arr = [...cart];
    arr[ind].amount += d;

    if (arr[ind].amount <= 0) {
      arr[ind].amount = 1;
    }
    setCart([...arr]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('eztech_auth');
  };

  const totalItemCount = cart.reduce((total, item) => total + item.amount, 0);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <div className="App">
          {isAuthenticated && (
            <Navbar size={totalItemCount} handleLogout={handleLogout} />
          )}

          <main className="content">
            <Routes>
              <Route 
                path="/login" 
                element={
                  !isAuthenticated ? (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />

              <Route 
                path="/" 
                element={
                  isAuthenticated ? (
                    <Shop handleClick={handleClick} warning={warning} />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />

              <Route 
                path="/cart" 
                element={
                  isAuthenticated ? (
                    <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />

              <Route 
                path="/checkout" 
                element={
                  isAuthenticated ? (
                    <CreditCard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />

              <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;