import React from 'react';
import { useApp } from '../../context/AppContext';
import { VendorApprovalTable } from './VendorApprovalTable';
import { ShieldCheck, TrendingUp, Store, Users, DollarSign, CheckCircle2 } from 'lucide-react';
import { RatingStars } from '../Common/RatingStars';
import { StatusBadge } from '../Common/Badge';

export const AdminDashboard = () => {
  const { shops, orders } = useApp();

  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const platformRevenue = totalGMV * 0.15; // 15% marketplace commission

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Admin Header */}
      <div className="vendor-header" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={28} color="#818cf8" />
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>Platform Super Admin Control</h1>
          </div>
          <p style={{ color: '#c7d2fe', fontSize: '0.9rem', marginTop: '4px' }}>
            Marketplace ecosystem metrics, vendor verification, & platform commission monitoring
          </p>
        </div>
        <span className="badge badge-approved" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
          Live System Operational
        </span>
      </div>

      {/* Metrics Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="stat-val">₹{totalGMV.toFixed(2)}</div>
            <div className="stat-lbl">Platform Total GMV</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <div className="stat-val">₹{platformRevenue.toFixed(2)}</div>
            <div className="stat-lbl">Platform Commission (15%)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <Store size={24} />
          </div>
          <div>
            <div className="stat-val">{shops.length} Active Shops</div>
            <div className="stat-lbl">Verified Vendors</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--warning-light)', color: '#b45309' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="stat-val">{orders.length} Total Orders</div>
            <div className="stat-lbl">Processed Transactions</div>
          </div>
        </div>
      </div>

      {/* Pending Vendor Approvals */}
      <div style={{ marginBottom: '32px' }}>
        <VendorApprovalTable />
      </div>

      {/* Active Vendors Registry */}
      <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Active Laundry Shop Partners ({shops.length})</h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-medium)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 18px' }}>Shop Name & Location</th>
                <th style={{ padding: '12px 18px' }}>Owner</th>
                <th style={{ padding: '12px 18px' }}>Rating</th>
                <th style={{ padding: '12px 18px' }}>Turnaround</th>
                <th style={{ padding: '12px 18px' }}>Commission</th>
                <th style={{ padding: '12px 18px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop) => (
                <tr key={shop.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{shop.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{shop.address}</div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>{shop.ownerName}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <RatingStars rating={shop.rating} />
                  </td>
                  <td style={{ padding: '14px 18px' }}>{shop.turnaround}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--primary)' }}>
                    {shop.commissionRate || '15%'}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <StatusBadge status={shop.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
