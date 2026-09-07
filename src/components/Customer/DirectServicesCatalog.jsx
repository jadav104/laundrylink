import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Minus, Shirt, Sparkles } from 'lucide-react';

export const DirectServicesCatalog = () => {
  const { shops, cart, addToCart, updateCartQty } = useApp();

  // Aggregate all services across active shops
  const allServices = [];
  shops.forEach((shop) => {
    if (shop.status !== 'Delisted') {
      (shop.services || []).forEach((svc) => {
        allServices.push({
          ...svc,
          shopId: shop.id,
          shopName: shop.name,
          shopObject: shop
        });
      });
    }
  });

  const getQty = (shopId, serviceId) => {
    if (cart.shopId !== shopId) return 0;
    const item = (cart.items || []).find((i) => i.id === serviceId);
    return item ? item.qty : 0;
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '28px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shirt size={22} color="var(--primary)" /> Direct Selectable Services
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Select any service below to instantly add to your bag and view live cost breakdown
          </p>
        </div>
        <span
          className="badge badge-approved"
          style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '0.8rem', padding: '6px 12px' }}
        >
          {allServices.length} Services Ready
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
        {allServices.map((item) => {
          const qty = getQty(item.shopId, item.id);
          return (
            <div
              key={`${item.shopId}-${item.id}`}
              style={{
                padding: '16px',
                border: qty > 0 ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                background: qty > 0 ? 'var(--primary-light)' : 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.name}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      background: 'rgba(79, 70, 229, 0.12)',
                      color: 'var(--primary)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700
                    }}
                  >
                    {item.shopName}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.4' }}>
                  {item.desc}
                </p>
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
                <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.05rem' }}>
                  ₹{item.price.toFixed(2)}{' '}
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                    /{item.unit}
                  </span>
                </div>

                {qty === 0 ? (
                  <button
                    className="view-btn"
                    style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => addToCart(item.shopObject, item)}
                  >
                    <Plus size={14} /> Add Service
                  </button>
                ) : (
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => updateCartQty(item.id, -1)}>
                      <Minus size={14} />
                    </button>
                    <span style={{ fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                      {qty}
                    </span>
                    <button className="qty-btn" onClick={() => addToCart(item.shopObject, item)}>
                      <Plus size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
