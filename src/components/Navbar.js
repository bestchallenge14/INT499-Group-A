import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ size }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎬 EZTechMovie <span>StreamList</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Store Services</Link>
          <Link to="/cart" className="cart-btn">
            🛒 Cart <span className="cart-badge">{size}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;