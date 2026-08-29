import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ size, handleLogout }) => {
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
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;