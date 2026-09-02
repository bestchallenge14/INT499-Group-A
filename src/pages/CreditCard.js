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
  const [savedCard, setSavedCard] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showLastDigit, setShowLastDigit] = useState(false);

  // Load previously saved payment information
  useEffect(() => {
    const storedCard = localStorage.getItem('eztech_credit_card');
    const savedName = localStorage.getItem('eztech_card_holder');
    const savedExp = localStorage.getItem('eztech_card_exp');

    if (storedCard) {
      setSavedCard(storedCard);
    }

    if (savedName) {
      setCardHolder(savedName);
    }

    if (savedExp) {
      setExpDate(savedExp);
    }
  }, []);

  // Display the card number with masking.
  // The newest digit remains visible while typing.
  const formatCardDisplay = (number) => {
    if (!number) {
      return '';
    }

    const maskedNumber = number
      .split('')
      .map((digit, index) => {
        // Show only the most recently entered digit
        if (
          showLastDigit &&
          index === number.length - 1
        ) {
          return digit;
        }

        return '•';
      })
      .join('');

    // Divide into groups of four
    return maskedNumber.match(/.{1,4}/g)?.join(' ') || '';
  };

  // Handle keyboard input for credit card number
  const handleCardKeyDown = (e) => {
    // Allow number keys
    if (/^\d$/.test(e.key)) {
      e.preventDefault();

      if (cardNumber.length < 16) {
        setCardNumber((previousNumber) => {
          return previousNumber + e.key;
        });

        setShowLastDigit(true);
      }

      return;
    }

    // Handle Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();

      setCardNumber((previousNumber) => {
        return previousNumber.slice(0, -1);
      });

      setShowLastDigit(true);

      return;
    }

    // Allow Tab for normal keyboard navigation
    if (e.key === 'Tab') {
      return;
    }

    // Allow keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    // Prevent letters and other characters
    e.preventDefault();
  };

  // Handle pasted card numbers
  const handleCardPaste = (e) => {
    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .substring(0, 16);

    setCardNumber(pastedValue);
    setShowLastDigit(true);
  };

  // Mask every digit when the user leaves the field
  const handleCardBlur = () => {
    setShowLastDigit(false);
  };

  // Format expiration date as MM/YY
  const handleExpDateChange = (e) => {
    let rawValue = e.target.value
      .replace(/\D/g, '')
      .substring(0, 4);

    if (rawValue.length > 2) {
      rawValue =
        rawValue.substring(0, 2) +
        '/' +
        rawValue.substring(2);
    }

    setExpDate(rawValue);
  };

  // Create the value that will actually be stored
  // Example: **** **** **** 3456
  const maskCardNumber = (number) => {
    const lastFour = number.slice(-4);

    return `**** **** **** ${lastFour}`;
  };

  // Save payment information
  const handleSave = (e) => {
    e.preventDefault();

    // Validate credit card number
    if (cardNumber.length !== 16) {
      alert(
        'Please enter a complete 16-digit credit card number.'
      );

      return;
    }

    // Validate expiration format
    if (!/^\d{2}\/\d{2}$/.test(expDate)) {
      alert(
        'Please enter the expiration date in MM/YY format.'
      );

      return;
    }

    // Validate expiration month
    const expirationMonth = parseInt(
      expDate.substring(0, 2),
      10
    );

    if (
      expirationMonth < 1 ||
      expirationMonth > 12
    ) {
      alert(
        'Please enter a valid expiration month between 01 and 12.'
      );

      return;
    }

    // Mask the card before saving it
    const maskedCard = maskCardNumber(cardNumber);

    // Store ONLY the masked card number
    localStorage.setItem(
      'eztech_credit_card',
      maskedCard
    );

    localStorage.setItem(
      'eztech_card_holder',
      cardHolder
    );

    localStorage.setItem(
      'eztech_card_exp',
      expDate
    );

    // Update the displayed saved payment method
    setSavedCard(maskedCard);

    // Remove the complete card number from React state
    setCardNumber('');
    setShowLastDigit(false);

    // Display success message
    setSavedSuccess(true);

    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  return (
    <div className="checkout-page-container">
      <h2>Credit Card Management & Checkout</h2>

      {savedSuccess && (
        <div className="success-banner">
          ✓ Payment information saved successfully!
        </div>
      )}

      <div className="checkout-card-box">

        {/* Saved Payment Method */}
        {savedCard && (
          <div className="saved-card-info">
            <p>Saved Payment Method</p>
            <strong>{savedCard}</strong>
          </div>
        )}

        <form
          onSubmit={handleSave}
          className="card-form"
        >

          {/* Cardholder Name */}
          <div className="form-group">
            <label htmlFor="cardHolder">
              Cardholder Name
            </label>

            <input
              id="cardHolder"
              type="text"
              required
              value={cardHolder}
              onChange={(e) =>
                setCardHolder(e.target.value)
              }
              placeholder="Full Name"
              className="form-input"
              autoComplete="cc-name"
            />
          </div>

          {/* Credit Card Number */}
          <div className="form-group">
            <label htmlFor="cardNumber">
              Credit Card Number
            </label>

            <input
              id="cardNumber"
              type="text"
              required
              value={formatCardDisplay(cardNumber)}
              onKeyDown={handleCardKeyDown}
              onPaste={handleCardPaste}
              onBlur={handleCardBlur}
              placeholder="1234 5678 9012 3456"
              className="form-input card-input"
              inputMode="numeric"
              autoComplete="off"
            />
          </div>

          {/* Expiration Date */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expDate">
                Expiration Date
              </label>

              <input
                id="expDate"
                type="text"
                required
                maxLength="5"
                value={expDate}
                onChange={handleExpDateChange}
                placeholder="MM/YY"
                className="form-input"
                inputMode="numeric"
                autoComplete="cc-exp"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="save-card-btn"
          >
            Save Payment Information
          </button>
        </form>

        {/* Navigation Links */}
        <div className="checkout-nav-links">
          <Link
            to="/cart"
            className="back-link"
          >
            ← Return to Cart
          </Link>

          <Link
            to="/shop"
            className="back-link"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;