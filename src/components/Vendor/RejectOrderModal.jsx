import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertTriangle, ShieldAlert } from 'lucide-react';

export const RejectOrderModal = ({ order, isOpen, onClose }) => {
  const { rejectOrder } = useApp();
  const [selectedReason, setSelectedReason] = useState('Shop Capacity Full for Selected Slot');
  const [customNote, setCustomNote] = useState('');

  if (!isOpen || !order) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReason = selectedReason === 'Custom Reason'
      ? customNote || 'Order declined by provider'
      : customNote ? `${selectedReason} - ${customNote}` : selectedReason;

    rejectOrder(order.id, finalReason);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '480px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-header"
          style={{ background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: 'white' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={20} color="white" />
              <h3 style={{ color: 'white', fontSize: '1.2rem', margin: 0 }}>Decline Order #{order.id}</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#fee2e2', marginTop: '2px' }}>
              Decline service request from {order.customerName}
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

        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Order Rejection Notice:</strong> Declining this request will immediately notify the customer and release their hold payment. Please select a reason below.
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
              Reason for Rejection:
            </label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.875rem',
                background: 'white'
              }}
            >
              <option value="Shop Capacity Full for Selected Slot">Shop Capacity Full for Selected Time Slot</option>
              <option value="Out of Pickup/Delivery Coverage Radius">Out of Pickup/Delivery Coverage Radius</option>
              <option value="Equipment Maintenance / Machinery Down">Equipment Maintenance / Washer Down</option>
              <option value="Requested Emergency Speed Unavailable">Requested Emergency 3h Rush Unavailable</option>
              <option value="Special Garment Fabric Not Supported">Special Garment Fabric Not Supported</option>
              <option value="Custom Reason">Other / Custom Reason</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
              Additional Customer Note (Optional):
            </label>
            <textarea
              rows={3}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Next available pickup slot is tomorrow 10:00 AM..."
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="filter-chip"
              onClick={onClose}
              style={{ padding: '8px 16px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="view-btn"
              style={{ background: 'var(--danger)', color: 'white', padding: '8px 20px', fontWeight: 700 }}
            >
              Confirm Decline & Reject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
