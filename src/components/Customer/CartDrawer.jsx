import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, Plus, Minus, CheckCircle, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { carePreferencesOptions } from '../../data/mockData';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    setCart,
    updateCartQty,
    clearCart,
    setIsCheckoutOpen
  } = useApp();

  if (!isCartOpen) return null;

  const cartItems = (cart && cart.items) ? cart.items : [];
  const carePrefs = (cart && cart.carePreferences) ? cart.carePreferences : [];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = 30.00;
  const platformFee = 15.00;
  const grandTotal = subtotal > 0 ? subtotal + deliveryFee + platformFee : 0;

  const toggleCarePreference = (pref) => {
    setCart((prev) => {
      const currentPrefs = prev.carePreferences || [];
      const exists = currentPrefs.includes(pref);
      let updated = exists
        ? currentPrefs.filter((p) => p !== pref)
        : [...currentPrefs, pref];
      return { ...prev, carePreferences: updated };
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
      <div
        className="modal-content"
        style={{
          maxWidth: '480px',
          height: '100vh',
          maxHeight: '100vh',
          borderRadius: 0,
          marginLeft: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Your Laundry Bag</h2>
            {cart.shopName && (
              <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
                From: {cart.shopName}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {cartItems.length > 0 && (
              <button
                className="close-btn"
                title="Clear Cart"
                onClick={clearCart}
                style={{ color: 'var(--danger)' }}
              >
                <Trash2 size={16} />
              </button>
            )}
            <button className="close-btn" onClick={() => setIsCartOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🧺</div>
              <h3>Your Laundry Bag is Empty</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                Browse local laundry shops and add wash, iron or dry cleaning services.
              </p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Selected Items ({cartItems.reduce((s, i) => s + i.qty, 0)})
                </h4>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        ₹{item.price.toFixed(2)} / {item.unit}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="qty-controls">
                        <button className="qty-btn" onClick={() => updateCartQty(item.id, -1)}>
                          <Minus size={14} />
                        </button>
                        <span style={{ fontWeight: 700 }}>{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateCartQty(item.id, 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <span style={{ fontWeight: 700, minWidth: '55px', textAlign: 'right' }}>
                        ₹{(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Care Preferences */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="var(--primary)" /> Care Preferences
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(carePreferencesOptions || []).map((pref, idx) => {
                    const selected = carePrefs.includes(pref);
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleCarePreference(pref)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          border: selected ? '1px solid var(--primary)' : '1px solid var(--border-medium)',
                          background: selected ? 'var(--primary-light)' : 'white',
                          color: selected ? 'var(--primary)' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {selected && <CheckCircle size={12} />} {pref}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bill Breakdown */}
              <div
                style={{
                  background: 'var(--bg-main)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span>Items Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Truck size={14} /> Doorstep Pickup & Delivery</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ShieldCheck size={14} /> Service & Platform Fee</span>
                  <span>₹{platformFee.toFixed(2)}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border-medium)',
                    fontWeight: 800,
                    fontSize: '1.1rem'
                  }}
                >
                  <span>Total Amount</span>
                  <span style={{ color: 'var(--primary)' }}>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer CTA */}
        {cartItems.length > 0 && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-light)', background: 'white' }}>
            <button
              className="view-btn"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
            >
              Confirm Order & Schedule Pickup (₹{grandTotal.toFixed(2)})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
