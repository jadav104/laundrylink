import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Plus, Minus, CheckCircle, Truck, ShieldCheck, Zap, AlertTriangle, Store } from 'lucide-react';
import { deliveryModes } from '../../data/mockData';

export const LiveBillPanel = () => {
  const { cart, setCart, updateCartQty, setIsCheckoutOpen, shops } = useApp();

  const cartItems = cart.items || [];
  const cartCount = cartItems.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = cartItems.reduce((acc, i) => acc + i.price * i.qty, 0);
  
  const currentMode = cart.deliveryMode || 'standard';
  const surgeFee = currentMode === 'emergency' ? 99.00 : currentMode === 'express' ? 49.00 : 0;
  
  const deliveryFee = 30.00;
  const platformFee = 15.00;
  const grandTotal = subtotal > 0 ? subtotal + deliveryFee + platformFee + surgeFee : 0;

  const activeShop = shops.find((s) => s.id === cart.shopId);

  const toggleCarePreference = (pref) => {
    setCart((prev) => {
      const exists = (prev.carePreferences || []).includes(pref);
      let updated = exists
        ? (prev.carePreferences || []).filter((p) => p !== pref)
        : [...(prev.carePreferences || []), pref];
      return { ...prev, carePreferences: updated };
    });
  };

  const setDeliveryMode = (modeId) => {
    setCart((prev) => ({ ...prev, deliveryMode: modeId }));
  };

  return (
    <div
      style={{
        position: 'sticky',
        top: '90px',
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        border: '2px solid var(--primary)',
        boxShadow: 'var(--shadow-md)',
        padding: '20px'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '12px',
          marginBottom: '16px'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>🧾 Live Bill Calculator</h3>
          {activeShop ? (
            <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Store size={12} /> Assigned Shop: {activeShop.name}
            </div>
          ) : (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-assigning nearby shop</div>
          )}
        </div>
        <div className="cart-btn" style={{ padding: '4px 12px', fontSize: '0.85rem' }}>
          <ShoppingBag size={14} />
          <span>{cartCount}</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>🧺</div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>Your Bag is Empty</h4>
          <p style={{ fontSize: '0.85rem', marginTop: '6px', lineHeight: '1.4' }}>
            Click <strong>"+ Add Service"</strong> on any item above to calculate your live subtotal & fees!
          </p>
        </div>
      ) : (
        <>
          {/* Selected Items List */}
          <div
            style={{
              maxHeight: '180px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '16px',
              paddingRight: '4px'
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 10px',
                  background: 'var(--bg-main)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.85rem'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    ₹{item.price.toFixed(2)} / {item.unit}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="qty-controls" style={{ scale: '0.85' }}>
                    <button className="qty-btn" onClick={() => updateCartQty(item.id, -1)}>
                      <Minus size={12} />
                    </button>
                    <span style={{ fontWeight: 700, minWidth: '14px', textAlign: 'center' }}>
                      {item.qty}
                    </span>
                    <button className="qty-btn" onClick={() => updateCartQty(item.id, 1)}>
                      <Plus size={12} />
                    </button>
                  </div>
                  <span style={{ fontWeight: 800, minWidth: '55px', textAlign: 'right' }}>
                    ₹{(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Speed / Emergency Mode Selection */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Zap size={14} color="var(--warning)" /> Delivery Speed & Surge Option:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {deliveryModes.map((mode) => {
                const isSelected = currentMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setDeliveryMode(mode.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.8rem',
                      fontWeight: isSelected ? 700 : 500,
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-medium)',
                      background: isSelected ? 'var(--primary-light)' : 'white',
                      color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{mode.label}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: mode.extra > 0 ? '#b45309' : 'var(--secondary)' }}>
                      {mode.extra > 0 ? `+₹${mode.extra.toFixed(2)}` : 'FREE'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Care Preferences */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
              ✨ Care Preferences:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {carePreferencesOptions.slice(0, 5).map((pref, idx) => {
                const isSel = (cart.carePreferences || []).includes(pref);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleCarePreference(pref)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      border: isSel ? '1px solid var(--primary)' : '1px solid var(--border-medium)',
                      background: isSel ? 'var(--primary-light)' : 'white',
                      color: isSel ? 'var(--primary)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    {isSel ? '✓ ' : ''}{pref}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bill Summary */}
          <div
            style={{
              background: 'var(--bg-main)',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              marginBottom: '16px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span>Items Subtotal</span>
              <span style={{ fontWeight: 700 }}>₹{subtotal.toFixed(2)}</span>
            </div>

            {surgeFee > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: '#b45309', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertTriangle size={12} /> Speed Rush Surcharge ({currentMode.toUpperCase()})
                </span>
                <span>+₹{surgeFee.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Truck size={12} /> Doorstep Pickup & Delivery
              </span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '10px', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} /> Platform & Care Fee
              </span>
              <span>₹{platformFee.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '2px dashed var(--border-medium)',
                fontWeight: 800,
                fontSize: '1.15rem',
                color: 'var(--primary)'
              }}
            >
              <span>Total Bill</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="view-btn"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1rem',
              textAlign: 'center',
              borderRadius: 'var(--radius-full)'
            }}
            onClick={() => setIsCheckoutOpen(true)}
          >
            💳 Schedule Pickup (₹{grandTotal.toFixed(2)})
          </button>
        </>
      )}
    </div>
  );
};
