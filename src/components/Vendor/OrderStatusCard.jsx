import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../Common/Badge';
import { MapPin, Phone, ArrowRight, Sparkles, Check, X, FileText, Zap } from 'lucide-react';

export const OrderStatusCard = ({ order, onOpenSummary, onOpenReject }) => {
  const { acceptOrder, updateOrderStatus } = useApp();

  const isPending = order.status === 'Order Placed';
  const isRejected = order.status === 'Rejected';
  const isCompleted = order.status === 'Completed';

  const nextStatusMap = {
    "Order Placed": "In Washing",
    "Picked Up": "In Washing",
    "In Washing": "Ready",
    "Ready": "Completed",
    "Out for Delivery": "Completed"
  };

  const nextStatus = nextStatusMap[order.status];

  return (
    <div
      className="order-item-card"
      style={{
        borderLeft: isPending ? '4px solid #f59e0b' : isRejected ? '4px solid #ef4444' : '4px solid #4f46e5',
        background: isPending ? '#fffbeb' : 'white',
        boxShadow: 'var(--shadow-sm)',
        padding: '14px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '12px'
      }}
    >
      {/* Header */}
      <div className="order-item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="order-id" style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.9rem' }}>
            #{order.id}
          </span>
          {order.deliveryMode === 'emergency' && (
            <span style={{ fontSize: '0.7rem', background: '#fee2e2', color: '#dc2626', fontWeight: 800, padding: '2px 6px', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
              <Zap size={10} /> 3h Rush
            </span>
          )}
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Customer info */}
      <div className="order-customer" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
        {order.customerName}
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
        <Phone size={12} color="var(--primary)" /> {order.customerPhone}
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px', marginBottom: '8px' }}>
        <MapPin size={12} color="var(--danger)" /> {order.pickupAddress}
      </div>

      {/* Care Preferences */}
      {order.carePreferences?.length > 0 && (
        <div style={{ fontSize: '0.73rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '3px 8px', borderRadius: 'var(--radius-sm)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
          <Sparkles size={11} /> {order.carePreferences.join(', ')}
        </div>
      )}

      {/* Items Summary */}
      <div className="order-items-summary" style={{ fontSize: '0.82rem', color: 'var(--text-main)', background: 'var(--bg-main)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', marginBottom: '10px' }}>
        {(order.items || []).map((i, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>• {i.name}</span>
            <span style={{ fontWeight: 700 }}>x{i.qty} {i.unit}</span>
          </div>
        ))}
      </div>

      {/* Rejection Note */}
      {isRejected && order.rejectionReason && (
        <div style={{ fontSize: '0.75rem', color: 'var(--danger)', background: 'var(--danger-light)', padding: '6px 8px', borderRadius: 'var(--radius-sm)', marginBottom: '8px', fontWeight: 600 }}>
          Reason: {order.rejectionReason}
        </div>
      )}

      {/* Pricing & Footer Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
        <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>
          ₹{(order.totalAmount || 0).toFixed(2)}
        </span>

        <button
          className="filter-chip"
          onClick={() => onOpenSummary(order)}
          style={{ padding: '4px 8px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
        >
          <FileText size={12} /> Summary
        </button>
      </div>

      {/* Accept / Reject Action Row for Pending Requests */}
      {isPending ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
          <button
            className="filter-chip"
            style={{ color: 'var(--danger)', borderColor: 'var(--danger-light)', background: 'var(--danger-light)', fontWeight: 700, padding: '6px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
            onClick={() => onOpenReject(order)}
          >
            <X size={14} /> Reject
          </button>
          <button
            className="view-btn"
            style={{ background: 'var(--secondary)', color: 'white', fontWeight: 700, padding: '6px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
            onClick={() => acceptOrder(order.id)}
          >
            <Check size={14} /> Accept Request
          </button>
        </div>
      ) : (
        nextStatus && !isRejected && !isCompleted && (
          <button
            className="view-btn"
            style={{ width: '100%', marginTop: '10px', padding: '6px 10px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
            onClick={() => updateOrderStatus(order.id, nextStatus)}
          >
            Mark {nextStatus} <ArrowRight size={14} />
          </button>
        )
      )}
    </div>
  );
};
