import React from 'react';
import { useApp } from '../../context/AppContext';
import { Store, MapPin, Clock, Star, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { RatingStars } from '../Common/RatingStars';

export const NearbyShopsMatching = () => {
  const { shops, cart, setCart, setIsCheckoutOpen } = useApp();

  const cartItems = cart.items || [];
  const selectedShopId = cart.shopId;

  const selectShopForOrder = (shop) => {
    setCart((prev) => ({
      ...prev,
      shopId: shop.id,
      shopName: shop.name
    }));
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        marginTop: '28px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Store size={22} color="var(--primary)" /> Nearby Laundry Shops for Your Order
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Compare verified local providers near Alkapuri, Vadodara and choose your preferred shop for order processing
          </p>
        </div>
        <span
          className="badge badge-approved"
          style={{ background: 'var(--secondary-light)', color: 'var(--secondary)', fontSize: '0.8rem', padding: '6px 12px' }}
        >
          {shops.length} Verified Partners Nearby
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {shops.map((shop) => {
          const isAssigned = selectedShopId === shop.id;
          const supportsEmergency = shop.emergencyAvailable;

          return (
            <div
              key={shop.id}
              style={{
                border: isAssigned ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                background: isAssigned ? 'var(--primary-light)' : 'white',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease'
              }}
            >
              <div
                style={{
                  height: '110px',
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${shop.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}
              >
                <span className="shop-badge" style={{ background: 'rgba(15,23,42,0.85)', color: 'white' }}>
                  <MapPin size={12} /> {shop.distance}
                </span>

                {supportsEmergency ? (
                  <span className="shop-badge" style={{ background: '#b45309', color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Zap size={12} /> 3h Emergency Ready
                  </span>
                ) : (
                  <span className="shop-badge" style={{ background: 'var(--secondary)', color: 'white' }}>
                    Standard 24h
                  </span>
                )}
              </div>

              <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{shop.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <RatingStars rating={shop.rating} />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({shop.reviewsCount})</span>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    📍 {shop.address}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                    {shop.tags.map((tag, idx) => (
                      <span key={idx} className="tag" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Turnaround: <strong style={{ color: 'var(--text-main)' }}>{shop.turnaround}</strong>
                  </div>

                  {isAssigned ? (
                    <button
                      className="view-btn"
                      style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '6px 14px',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onClick={() => setIsCheckoutOpen(true)}
                    >
                      <CheckCircle2 size={14} /> Selected Shop
                    </button>
                  ) : (
                    <button
                      className="btn-outline"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.8rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        borderColor: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onClick={() => selectShopForOrder(shop)}
                    >
                      Select Shop <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
