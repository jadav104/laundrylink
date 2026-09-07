import React from 'react';
import { RatingStars } from '../Common/RatingStars';
import { MapPin, Clock, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ShopCard = ({ shop }) => {
  const { setSelectedShopModal } = useApp();

  return (
    <div className="shop-card">
      <div
        className="shop-banner"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${shop.image})` }}
      >
        <span className="shop-badge">{shop.distance}</span>
        {shop.expressAvailable && (
          <span className="shop-badge" style={{ background: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={12} /> Express 24h
          </span>
        )}
      </div>

      <div className="shop-body">
        <div className="shop-header-row">
          <h3 className="shop-name">{shop.name}</h3>
          <div className="shop-rating">
            <RatingStars rating={shop.rating} />
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>({shop.reviewsCount})</span>
          </div>
        </div>

        <div className="shop-address">
          <MapPin size={14} /> {shop.address}
        </div>

        <div className="tags-row">
          <span className="tag" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} /> {shop.turnaround}
          </span>
          {shop.tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>

        <div className="shop-footer">
          <div className="price-start">
            Services from <span className="price-amount">₹{shop.services?.length ? Math.min(...shop.services.map(s => s.price)).toFixed(2) : '0.00'}</span>
          </div>
          <button className="view-btn" onClick={() => setSelectedShopModal(shop)}>
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};
