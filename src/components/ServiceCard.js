/*  
    StreamList App
    Jose Hernandez
    The University of Arizona Global Campus
    INT499: Capstone for Information Technology
    Professor Amine Dehmani
    August 24, 2026
*/


import React from 'react';

const ServiceCard = ({ item, handleClick }) => {
  const { service, serviceInfo, price, img } = item;

  return (
    <div className="service-card">
      <div className="img-container">
        <img src={img} alt={service} />
      </div>
      <div className="service-details">
        <h3>{service}</h3>
        <p className="service-desc">{serviceInfo}</p>
        <p className="service-price">${price.toFixed(2)}</p>
        <button className="add-cart-btn" onClick={() => handleClick(item)}>
          + Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;