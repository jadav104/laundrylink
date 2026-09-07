import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, Clock, Truck, ShieldCheck, MapPin, Phone, Sparkles } from 'lucide-react';
import { StatusBadge } from '../Common/Badge';

export const OrderTracker = () => {
  const { activeOrderTrackerId, setActiveOrderTrackerId, orders } = useApp();

  if (!activeOrderTrackerId) return null;

  const order = orders.find((o) => o.id === activeOrderTrackerId);
  if (!order) return null;

  const steps = [
    { title: "Order Placed", key: "Order Placed", icon: Clock },
    { title: "Driver Picked Up", key: "Picked Up", icon: Truck },
    { title: "Washing & Care", key: "In Washing", icon: ShieldCheck },
    { title: "Ready / Out for Delivery", key: "Out for Delivery", icon: Truck },
    { title: "Delivered", key: "Completed", icon: CheckCircle }
  ];

  // Map order status to step index
  const statusMap = {
    "Order Placed": 0,
    "Picked Up": 1,
    "In Washing": 2,
    "Processing": 2,
    "Ready": 3,
    "Out for Delivery": 3,
    "Completed": 4,
    "Delivered": 4
  };

  const currentStepIndex = statusMap[order.status] ?? 0;

  return (
    <div className="modal-overlay" onClick={() => setActiveOrderTrackerId(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.3rem' }}>Live Order Tracker</h2>
              <span style={{ fontWeight: 800, color: 'var(--primary)' }}>#{order.id}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Serviced by <strong>{order.shopName}</strong>
            </p>
          </div>
          <button className="close-btn" onClick={() => setActiveOrderTrackerId(null)}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Stepper Progress */}
          <div className="tracker-stepper">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isActive = idx === currentStepIndex;
              const StepIcon = step.icon;

              return (
                <div
                  key={idx}
                  className={`step-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                >
                  <div className="step-circle">
                    <StepIcon size={16} />
                  </div>
                  <span className="step-label">{step.title}</span>
                </div>
              );
            })}
          </div>

          {/* Status Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, #eef2ff 0%, #e0f2fe 100%)',
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #c7d2fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Current Status
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>
                {order.status}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Est. Delivery: <strong>{order.deliverySlot}</strong>
              </div>
            </div>
            <StatusBadge status={order.status} />
          </div>

          {/* Details Sections */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'var(--bg-main)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <MapPin size={14} /> Pickup Address
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{order.pickupAddress}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Slot: {order.pickupSlot}
              </div>
            </div>

            <div style={{ background: 'var(--bg-main)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <Sparkles size={14} color="var(--primary)" /> Care Preferences
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                {order.carePreferences?.length > 0 ? order.carePreferences.join(', ') : 'Standard Washing'}
              </div>
            </div>
          </div>

          {/* Itemized list */}
          <h4 style={{ fontSize: '0.95rem', marginBottom: '10px' }}>Items Summary</h4>
          <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '24px' }}>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderBottom: idx < order.items.length - 1 ? '1px solid var(--border-light)' : 'none',
                  fontSize: '0.875rem'
                }}
              >
                <span>{item.name} × {item.qty} ({item.unit})</span>
                <span style={{ fontWeight: 700 }}>₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'var(--bg-main)',
                fontWeight: 800,
                fontSize: '1rem',
                borderTop: '1px solid var(--border-medium)'
              }}
            >
              <span>Total Paid</span>
              <span style={{ color: 'var(--primary)' }}>₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Note on live syncing */}
          <div style={{ background: '#fef3c7', color: '#b45309', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', textAlign: 'center' }}>
            💡 <strong>Pro Tip:</strong> Switch to the <strong>Shop Owner Portal</strong> at the top of the page to update this order's status and see changes update live here!
          </div>
        </div>
      </div>
    </div>
  );
};
