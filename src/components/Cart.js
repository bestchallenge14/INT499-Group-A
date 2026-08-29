import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart, handleChange }) => {
  const navigate = useNavigate();

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.amount * item.price, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty.</p>
          <Link to="/" className="continue-shopping-btn">Explore Subscriptions & Merchandise</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cart.map((item) => {
              const isSubscription = item.id <= 4;
              return (
                <div className="cart-item-card" key={item.id}>
                  <img src={item.img} alt={item.service} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4>{item.service}</h4>
                    <p className="cart-item-subinfo">{item.serviceInfo}</p>
                    <p className="cart-item-unit-price">${item.price.toFixed(2)} each</p>
                  </div>

                  <div className="quantity-controls">
                    {isSubscription ? (
                      <span className="sub-qty-tag">Plan (Qty: 1)</span>
                    ) : (
                      <>
                        <button 
                          className="qty-btn" 
                          onClick={() => handleChange(item, -1)}
                          disabled={item.amount <= 1}
                        >
                          -
                        </button>
                        <span className="qty-value">{item.amount}</span>
                        <button 
                          className="qty-btn" 
                          onClick={() => handleChange(item, 1)}
                        >
                          +
                        </button>
                      </>
                    )}
                  </div>

                  <div className="cart-item-actions">
                    <p className="item-subtotal">${(item.amount * item.price).toFixed(2)}</p>
                    <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary-box">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{cart.reduce((acc, item) => acc + item.amount, 0)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              className="checkout-btn" 
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
            <Link to="/" className="back-link">← Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;