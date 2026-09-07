import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Package, Clock, MapPin, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../Common/Badge';

export const CustomerOrdersModal = ({ isOpen, onClose }) => {
  const { orders, currentUser, setActiveOrderTrackerId } = useApp();

  if (!isOpen) return null;

  // Filter orders matching logged in customer email/phone/name or show recent customer requests
  const customerOrders = orders.filter((o) => {
    if (!currentUser) return true;
    const matchEmail = currentUser.email && o.customerEmail && o.customerEmail.toLowerCase() === currentUser.email.toLowerCase();
    const matchPhone = currentUser.phone && o.customerPhone && o.customerPhone.includes(currentUser.phone);
    const matchName = currentUser.name && o.customerName && o.customerName.toLowerCase().includes(currentUser.name.toLowerCase());
    return matchEmail || matchPhone || matchName || !o.customerEmail;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-header"
          style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={22} color="white" />
              <h3 style={{ color: 'white', margin: 0, fontSize: '1.3rem' }}>My Placed Service Requests</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#c7d2fe', marginTop: '2px' }}>
              Logged in Account: <strong>{currentUser?.name || 'Customer'}</strong> ({currentUser?.email || 'priya@example.in'})
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

        <div style={{ padding: '24px', maxHeight: '75vh', overflowY: 'auto' }}>
          {customerOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Package size={48} style={{ opacity: 0.4, marginBottom: '12px' }} />
              <h4>No Service Requests Placed Yet</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                Select services from the marketplace catalog and confirm booking to see your request here!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {customerOrders.map((ord) => {
                const isPending = ord.status === 'Order Placed';
                const isRejected = ord.status === 'Rejected';

                return (
                  <div
                    key={ord.id}
                    style={{
                      background: 'white',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px',
                      boxShadow: 'var(--shadow-sm)',
                      borderLeft: isPending ? '4px solid #f59e0b' : isRejected ? '4px solid #ef4444' : '4px solid var(--primary)'
                    }}
                  >
                    {/* Header row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div>
                        <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>
                          #{ord.id}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                          via <strong>{ord.shopName}</strong>
                        </span>
                      </div>
                      <StatusBadge status={ord.status} />
                    </div>

                    {/* Delivery & Address */}
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} color="var(--danger)" /> {ord.pickupAddress}
                    </div>

                    {/* Items */}
                    <div style={{ background: 'var(--bg-main)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', marginBottom: '10px' }}>
                      {(ord.items || []).map((i, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                          <span>• {i.name}</span>
                          <span style={{ fontWeight: 700 }}>x{i.qty} {i.unit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Rejection Note */}
                    {isRejected && (
                      <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', marginBottom: '10px' }}>
                        <strong>❌ Request Rejected by Provider:</strong> {ord.rejectionReason || 'Shop Capacity Full'}
                      </div>
                    )}

                    {/* Pending Approval Note */}
                    {isPending && (
                      <div style={{ background: '#fffbeb', color: '#b45309', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', marginBottom: '10px' }}>
                        📥 <strong>Waiting for Provider Acceptance:</strong> Your request has been sent to {ord.shopName}. You will receive a live status update as soon as they accept.
                      </div>
                    )}

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
                      <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>
                        ₹{(ord.totalAmount || 0).toFixed(2)}
                      </span>
                      <button
                        className="view-btn"
                        style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        onClick={() => {
                          onClose();
                          setActiveOrderTrackerId(ord.id);
                        }}
                      >
                        Track Live Status <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
