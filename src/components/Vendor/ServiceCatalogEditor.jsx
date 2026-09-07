import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, X, Tag, DollarSign } from 'lucide-react';

export const ServiceCatalogEditor = ({ shop, isOpen, onClose }) => {
  const { addShopService } = useApp();

  const [newService, setNewService] = useState({
    name: '',
    price: '',
    unit: 'piece',
    desc: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newService.name || !newService.price) return;

    addShopService(shop.id, {
      name: newService.name,
      price: parseFloat(newService.price),
      unit: newService.unit,
      desc: newService.desc || 'Quality professional care'
    });

    setNewService({ name: '', price: '', unit: 'piece', desc: '' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.2rem' }}>Add Service to {shop.name}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Service Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Leather Jacket Conditioning"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                marginTop: '4px',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Price (₹)</label>
              <input
                type="number"
                step="1.00"
                required
                placeholder="50.00"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  marginTop: '4px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pricing Unit</label>
              <select
                value={newService.unit}
                onChange={(e) => setNewService({ ...newService, unit: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  marginTop: '4px',
                  fontSize: '0.85rem'
                }}
              >
                <option value="piece">per Piece</option>
                <option value="kg">per Kg</option>
                <option value="set">per Set</option>
                <option value="pair">per Pair</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Description</label>
            <input
              type="text"
              placeholder="e.g. Eco-friendly solvent wash"
              value={newService.desc}
              onChange={(e) => setNewService({ ...newService, desc: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                marginTop: '4px',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <button
            type="submit"
            className="view-btn"
            style={{ width: '100%', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={18} /> Save New Service
          </button>
        </form>
      </div>
    </div>
  );
};
