import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Cart from './components/Cart';
import './App.css';

function App() {
  // Load initial cart state from localStorage or default to empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('eztech_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [warning, setWarning] = useState(false);

  // Sync cart changes to localStorage
  useEffect(() => {
    localStorage.setItem('eztech_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle Adding Item to Cart with Duplicate Prevention
  const handleClick = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) isPresent = true;
    });

    if (isPresent) {
      setWarning(true);
      setTimeout(() => setWarning(false), 3500);
      return;
    }

    setCart([...cart, { ...item, amount: 1 }]);
  };

  // Handle Quantity Increment / Decrement
  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = [...cart];
    arr[ind].amount += d;

    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setCart([...arr]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar size={cart.length} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Shop handleClick={handleClick} warning={warning} />} />
            <Route 
              path="/cart" 
              element={<Cart cart={cart} setCart={setCart} handleChange={handleChange} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;