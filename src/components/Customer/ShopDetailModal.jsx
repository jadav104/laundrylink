import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Minus, MapPin, Clock, ShoppingBag } from 'lucide-react';
import { RatingStars } from '../Common/RatingStars';

export const ShopDetailModal = () => {
  const {
    selectedShopModal,
    setSelectedShopModal,
    cart,
    addToCart,
    updateCartQty,
    setIsCartOpen
  } = useApp();

  if (!selectedShopModal) return null;

  const shop = selectedShopModal;

  // Get current quantity for a service item in cart
  const getItemQty = (serviceId) => {
    if (cart.shopId !== shop.id) return 0;
    const item = cart.items.find((i) => i.id === serviceId);
    return item ? item.qty : 0;
  };

  const totalCartCount = cart.items.reduce((acc, i) => acc + i.qty, 0);
  const totalCartPrice = cart.items.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <div className="modal-overlay" onClick={() => setSelectedShopModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{shop.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {shop.address}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {shop.turnaround}</span>
              <RatingStars rating={shop.rating} />
            </div>
          </div>
          <button className="close-btn" onClick={() => setSelectedShopModal(null)}>
            <X size={20} />
          </button>
        </div>

        {/* Services List */}
        <div className="services-list">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Available Laundry Services</h3>
          {shop.services.map((service) => {
            const qty = getItemQty(service.id);
            return (
              <div key={service.id} className="service-card">
                <div className="service-info">
                  <h4>{service.name}</h4>
                  <p>{service.desc}</p>
                  <div className="service-price" style={{ marginTop: '6px' }}>
                    ₹{service.price.toFixed(2)} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {service.unit}</span>
                  </div>
                </div>

                <div>
                  {qty === 0 ? (
                    <button
                      className="btn-outline"
                      style={{ borderRadius: 'var(--radius-full)', padding: '6px 16px', fontWeight: 600, color: 'var(--primary)', borderColor: 'var(--primary)' }}
                      onClick={() => addToCart(shop, service)}
                    >
                      <Plus size={16} /> Add
                    </button>
                  ) : (
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateCartQty(service.id, -1)}>
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>{qty}</span>
                      <button className="qty-btn" onClick={() => addToCart(shop, service)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer sticky cart quick view */}
        {totalCartCount > 0 && (
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--border-light)',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomLeftRadius: 'var(--radius-lg)',
              borderBottomRightRadius: 'var(--radius-lg)'
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: 'var(--primary)' }}>
                {totalCartCount} items selected
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Subtotal: <strong>₹{totalCartPrice.toFixed(2)}</strong>
              </div>
            </div>

            <button
              className="view-btn"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 22px' }}
              onClick={() => {
                setSelectedShopModal(null);
                setIsCartOpen(true);
              }}
            >
              <ShoppingBag size={18} /> View Cart & Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
