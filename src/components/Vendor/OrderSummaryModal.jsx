import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Phone, MapPin, Calendar, Clock, Sparkles, CheckCircle2, XCircle, Printer, Zap } from 'lucide-react';
import { StatusBadge } from '../Common/Badge';

export const OrderSummaryModal = ({ order, isOpen, onClose, onOpenReject }) => {
  const { acceptOrder, updateOrderStatus } = useApp();

  if (!isOpen || !order) return null;

  const isPending = order.status === 'Order Placed';
  const isRejected = order.status === 'Rejected';
  const isCompleted = order.status === 'Completed';

  const subtotal = (order.items || []).reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
  const surgeFee = order.deliveryMode === 'emergency' ? 99.00 : order.deliveryMode === 'express' ? 49.00 : 0;
  const platformFee = 15.00;
  const deliveryFee = 30.00;
  const netEarnings = Math.max(0, (subtotal + surgeFee + deliveryFee) * 0.85); // 15% platform commission

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '600px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-header"
          style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '1.3rem' }}>Order #{order.id} Breakdown</h3>
              <StatusBadge status={order.status} />
            </div>
            <p style={{ fontSize: '0.8rem', color: '#c7d2fe', marginTop: '2px' }}>
              Created: {order.createdAt || 'Just now'} | Delivery Speed: <strong>{order.deliveryMode === 'emergency' ? '🚨 3h Rush' : order.deliveryMode === 'express' ? '⚡ 24h Express' : 'Standard 48h'}</strong>
            </p>
          </div>
          <button
            className="close-btn"
            style={{ color: 'white', background: 'rgba(255,255,255,0.2)' }}
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '24px', maxHeight: '80vh', overflowY: 'auto' }}>
          {/* Customer Profile Box */}
          <div
            style={{
              background: 'var(--bg-main)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              marginBottom: '20px'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary)', marginBottom: '6px' }}>
              👤 Customer: {order.customerName}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} color="var(--primary)" />
                <a href={`tel:${order.customerPhone}`} style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600 }}>
                  {order.customerPhone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} color="var(--accent)" />
                <span>Slot: {order.deliverySlot || 'Standard Delivery'}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.85rem', marginTop: '8px', color: 'var(--text-muted)' }}>
              <MapPin size={16} color="var(--danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div><strong>Pickup & Delivery Address:</strong> {order.pickupAddress}</div>
            </div>
          </div>

          {/* Care Preferences */}
          {order.carePreferences?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                ✨ CUSTOMER CARE PREFERENCES:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {order.carePreferences.map((pref, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Sparkles size={12} /> {pref}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rejection Note if Rejected */}
          {isRejected && (
            <div
              style={{
                background: 'var(--danger-light)',
                color: 'var(--danger)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                fontSize: '0.85rem'
              }}
            >
              <strong>❌ Order Rejected:</strong> {order.rejectionReason || 'Declined by shop management'}
            </div>
          )}

          {/* Itemized Garment List */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', color: 'var(--text-main)' }}>
              👕 Itemized Garment Breakdown
            </h4>
            <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '8px 12px' }}>Service Garment</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right' }}>Rate</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right' }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {(order.items || []).map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>{item.name}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700 }}>
                        {item.qty} {item.unit}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right' }}>₹{(item.price || 0).toFixed(2)}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 800 }}>
                        ₹{((item.price || 0) * (item.qty || 1)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Calculation Box */}
          <div
            style={{
              background: 'var(--bg-main)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              marginBottom: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span>Items Garment Subtotal</span>
              <span style={{ fontWeight: 700 }}>₹{subtotal.toFixed(2)}</span>
            </div>
            {surgeFee > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: '#b45309', fontWeight: 600 }}>
                <span>Speed Express Surge ({order.deliveryMode.toUpperCase()})</span>
                <span>+₹{surgeFee.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--text-muted)' }}>
              <span>Doorstep Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContext: 'space-between', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-muted)' }}>
              <span>Platform Service Fee</span>
              <span>₹{platformFee.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '2px dashed var(--border-medium)',
                fontWeight: 800,
                fontSize: '1.1rem',
                color: 'var(--primary)'
              }}
            >
              <span>Total Customer Bill:</span>
              <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>
            <div
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                background: 'var(--secondary-light)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--secondary)'
              }}
            >
              <span>Est. Provider Net Payout (after 15% comm.):</span>
              <span>₹{netEarnings.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button
              className="filter-chip"
              onClick={() => window.print()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Printer size={14} /> Print Receipt
            </button>

            {isPending && (
              <>
                <button
                  className="filter-chip"
                  style={{ color: 'var(--danger)', borderColor: 'var(--danger-light)', background: 'var(--danger-light)', fontWeight: 700 }}
                  onClick={() => {
                    onClose();
                    onOpenReject(order);
                  }}
                >
                  <XCircle size={14} /> Reject Request
                </button>
                <button
                  className="view-btn"
                  style={{ background: 'var(--secondary)', fontWeight: 700 }}
                  onClick={() => {
                    acceptOrder(order.id);
                    onClose();
                  }}
                >
                  <CheckCircle2 size={14} /> Accept & Start Job
                </button>
              </>
            )}

            {!isPending && !isRejected && !isCompleted && (
              <button
                className="view-btn"
                onClick={() => {
                  const nextMap = {
                    "In Washing": "Ready",
                    "Ready": "Completed"
                  };
                  const next = nextMap[order.status] || "Completed";
                  updateOrderStatus(order.id, next);
                  onClose();
                }}
              >
                Advance to Next Step ➔
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
