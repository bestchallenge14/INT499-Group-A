/*  
    StreamList App
    Jose Hernandez, Stephen Foster
    The University of Arizona Global Campus
    INT499: Capstone for Information Technology
    Professor Amine Dehmani
    August 31, 2026
*/


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CreditCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expDate, setExpDate] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const savedCard = localStorage.getItem('eztech_credit_card');
    const savedName = localStorage.getItem('eztech_card_holder');
    const savedExp = localStorage.getItem('eztech_card_exp');

    if (savedCard) setCardNumber(savedCard);
    if (savedName) setCardHolder(savedName);
    if (savedExp) setExpDate(savedExp);
  }, []);

  const handleCardNumberChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = rawValue.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (cardNumber.length !== 19) {
      alert('Please enter a complete 16-digit credit card number.');
      return;
    }

    localStorage.setItem('eztech_credit_card', cardNumber);
    localStorage.setItem('eztech_card_holder', cardHolder);
    localStorage.setItem('eztech_card_exp', expDate);

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="checkout-page-container">
      <h2>Credit Card Management & Checkout</h2>

      {savedSuccess && (
        <div className="success-banner">
          ✓ Credit card details saved successfully to local storage!
        </div>
      )}

      <div className="checkout-card-box">
        <form onSubmit={handleSave} className="card-form">
          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              required
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Full Name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Credit Card Number (Format: 1234 5678 9012 3456)</label>
            <input
              type="text"
              required
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              className="form-input card-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiration Date</label>
              <input
                type="text"
                required
                maxLength="5"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                placeholder="MM/YY"
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="save-card-btn">
            Save Payment Information
          </button>
        </form>

        <div className="checkout-nav-links">
          <Link to="/cart" className="back-link">← Return to Cart</Link>
          <Link to="/shop" className="back-link">Return to Shop</Link>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;