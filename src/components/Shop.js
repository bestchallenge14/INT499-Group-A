import React from 'react';
import list from '../data';
import ServiceCard from './ServiceCard';

const Shop = ({ handleClick, warning }) => {
  return (
    <div className="shop-container">
      <div className="shop-header">
        <h2>EZTechMovie Subscriptions & Merchandise</h2>
        <p>Select plans, add-ons, or merchandise to enhance your StreamList experience.</p>
      </div>

      {warning && (
        <div className="warning-banner">
          ⚠️ Item is already in your cart! You can adjust the quantity directly inside the Cart page.
        </div>
      )}

      <div className="services-grid">
        {list.map((item) => (
          <ServiceCard key={item.id} item={item} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default Shop;