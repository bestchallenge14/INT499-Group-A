import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Cart from './components/Cart';
import './App.css';

function App() {
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

  const totalItemCount = cart.reduce((total, item) => total + item.amount, 0);

  return (
    <Router>
      <div className="App">
        <Navbar size={totalItemCount} />
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