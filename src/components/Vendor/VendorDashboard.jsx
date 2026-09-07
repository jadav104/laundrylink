import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatusCard } from './OrderStatusCard';
import { ServiceCatalogEditor } from './ServiceCatalogEditor';
import { OrderSummaryModal } from './OrderSummaryModal';
import { RejectOrderModal } from './RejectOrderModal';
import { Store, DollarSign, PackageCheck, Star, Plus, Bell, CheckCircle2, XCircle, Clock, Zap } from 'lucide-react';

export const VendorDashboard = () => {
  const { shops, activeVendorId, setActiveVendorId, orders, currentUser } = useApp();
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pending' | 'washing' | 'ready' | 'completed' | 'rejected'
  const [selectedSummaryOrder, setSelectedSummaryOrder] = useState(null);
  const [selectedRejectOrder, setSelectedRejectOrder] = useState(null);

  // Lock to currentUser's registered shop if logged in as vendor
  const vendorShopId = currentUser?.shopId || activeVendorId || shops[0]?.id;
  const activeShop = shops.find((s) => s.id === vendorShopId) || shops[0];

  // Filter orders strictly belonging to this shop
  const shopOrders = orders.filter((o) => o.shopId === activeShop.id);

  // Status arrays
  const pendingOrders = shopOrders.filter((o) => o.status === 'Order Placed');
  const washingOrders = shopOrders.filter((o) => o.status === 'In Washing' || o.status === 'Picked Up' || o.status === 'Processing');
  const readyOrders = shopOrders.filter((o) => o.status === 'Ready' || o.status === 'Out for Delivery');
  const completedOrders = shopOrders.filter((o) => o.status === 'Completed' || o.status === 'Delivered');
  const rejectedOrders = shopOrders.filter((o) => o.status === 'Rejected');

  const totalRevenue = completedOrders.concat(washingOrders, readyOrders).reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  const activeJobsCount = washingOrders.length + readyOrders.length;
  const totalDecided = shopOrders.length - pendingOrders.length;
  const acceptanceRate = totalDecided > 0 ? Math.round(((totalDecided - rejectedOrders.length) / totalDecided) * 100) : 100;

  // Filtered orders for tab view
  const currentDisplayedOrders = activeTab === 'pending' ? pendingOrders
    : activeTab === 'washing' ? washingOrders
    : activeTab === 'ready' ? readyOrders
    : activeTab === 'completed' ? completedOrders
    : activeTab === 'rejected' ? rejectedOrders
    : shopOrders;

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header Banner */}
      <div className="vendor-header" style={{ background: 'white', padding: '20px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Provider Service Portal</h1>
            <span className="badge badge-approved">Verified Partner Shop</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
            Manage incoming service requests, accept/decline orders, and update customer laundry status for <strong>{activeShop.name}</strong>.
          </p>
        </div>

        {/* Shop Display / Lock Badge */}
        {currentUser?.role === 'vendor' ? (
          <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, padding: '8px 16px', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Store size={16} /> Logged in Store: <strong>{activeShop.name}</strong>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Selected Shop:
            </label>
            <select
              value={activeShop.id}
              onChange={(e) => setActiveVendorId(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.9rem',
                fontWeight: 700,
                background: 'var(--bg-main)',
                color: 'var(--primary)',
                cursor: 'pointer'
              }}
            >
              {shops.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* INCOMING SERVICE REQUEST ALERT BANNER */}
      {pendingOrders.length > 0 && (
        <div
          style={{
            background: 'linear-gradient(135deg, #fffbe6 0%, #fef3c7 100%)',
            border: '2px solid #f59e0b',
            padding: '18px 24px',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '28px',
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#f59e0b',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Bell size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#92400e', margin: 0 }}>
                  🚨 {pendingOrders.length} New Incoming Service Request{pendingOrders.length > 1 ? 's' : ''} Waiting!
                </h3>
                <span className="badge badge-warning" style={{ background: '#d97706', color: 'white' }}>Action Required</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#b45309', marginTop: '2px' }}>
                Review customer garment details, delivery speed, and click Accept or Reject below.
              </p>
            </div>
          </div>

          <button
            className="view-btn"
            style={{ background: '#b45309', color: 'white', padding: '10px 18px', fontWeight: 700 }}
            onClick={() => setActiveTab('pending')}
          >
            Review Requests Queue ➔
          </button>
        </div>
      )}

      {/* Operational Metrics Row */}
      <div className="stats-grid" style={{ marginBottom: '28px' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--warning-light)', color: '#b45309' }}>
            <Bell size={24} />
          </div>
          <div>
            <div className="stat-val">{pendingOrders.length}</div>
            <div className="stat-lbl">Incoming Requests Queue</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <div className="stat-val">₹{totalRevenue.toFixed(2)}</div>
            <div className="stat-lbl">Accepted Revenue</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <PackageCheck size={24} />
          </div>
          <div>
            <div className="stat-val">{activeJobsCount}</div>
            <div className="stat-lbl">Active Jobs in Washing</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="stat-val">{acceptanceRate}%</div>
            <div className="stat-lbl">Order Acceptance Rate</div>
          </div>
        </div>
      </div>

      {/* Service Catalog & Custom Pricing Box */}
      <div
        style={{
          background: 'white',
          padding: '20px 24px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>Store Catalog & Service Rates</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Configure your service menu rates per kg or piece visible to local customers
            </p>
          </div>
          <button
            className="view-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px' }}
            onClick={() => setIsAddServiceOpen(true)}
          >
            <Plus size={16} /> Add Custom Service
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
          {activeShop.services.map((svc) => (
            <div
              key={svc.id}
              style={{
                padding: '10px 14px',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bg-main)'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{svc.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{svc.desc}</div>
              </div>
              <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.9rem', flexShrink: 0 }}>
                ₹{svc.price.toFixed(2)} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>/{svc.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FILTER TABS & OPERATIONS BOARD */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Live Service Operations Control</h3>

        {/* Tab Filters */}
        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-main)', padding: '4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-medium)' }}>
          {[
            { id: 'all', label: `All (${shopOrders.length})` },
            { id: 'pending', label: `📥 Incoming Requests (${pendingOrders.length})` },
            { id: 'washing', label: `🫧 In Wash (${washingOrders.length})` },
            { id: 'ready', label: `🚚 Ready (${readyOrders.length})` },
            { id: 'completed', label: `✅ Completed (${completedOrders.length})` },
            { id: 'rejected', label: `❌ Rejected (${rejectedOrders.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: 'none',
                background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabbed view or 4-Column Board */}
      {activeTab !== 'all' ? (
        <div style={{ background: 'white', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '14px', color: 'var(--text-muted)' }}>
            Showing {activeTab.toUpperCase()} Orders ({currentDisplayedOrders.length})
          </h4>
          {currentDisplayedOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              No orders found in this category.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {currentDisplayedOrders.map((ord) => (
                <OrderStatusCard
                  key={ord.id}
                  order={ord}
                  onOpenSummary={(o) => setSelectedSummaryOrder(o)}
                  onOpenReject={(o) => setSelectedRejectOrder(o)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="orders-board">
          {/* Incoming Requests */}
          <div className="board-col">
            <div className="col-header" style={{ color: '#b45309', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📥 Incoming Requests ({pendingOrders.length})</span>
              {pendingOrders.length > 0 && <span style={{ fontSize: '0.7rem', background: '#f59e0b', color: 'white', padding: '2px 6px', borderRadius: 'var(--radius-full)' }}>PULSE</span>}
            </div>
            {pendingOrders.map((ord) => (
              <OrderStatusCard
                key={ord.id}
                order={ord}
                onOpenSummary={(o) => setSelectedSummaryOrder(o)}
                onOpenReject={(o) => setSelectedRejectOrder(o)}
              />
            ))}
            {pendingOrders.length === 0 && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No new pending requests</div>
            )}
          </div>

          {/* In Wash & Processing */}
          <div className="board-col">
            <div className="col-header" style={{ color: 'var(--primary)' }}>
              <span>🫧 In Wash & Care ({washingOrders.length})</span>
            </div>
            {washingOrders.map((ord) => (
              <OrderStatusCard
                key={ord.id}
                order={ord}
                onOpenSummary={(o) => setSelectedSummaryOrder(o)}
                onOpenReject={(o) => setSelectedRejectOrder(o)}
              />
            ))}
            {washingOrders.length === 0 && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No active washing jobs</div>
            )}
          </div>

          {/* Ready / Delivery */}
          <div className="board-col">
            <div className="col-header" style={{ color: '#0369a1' }}>
              <span>🚚 Ready / Out ({readyOrders.length})</span>
            </div>
            {readyOrders.map((ord) => (
              <OrderStatusCard
                key={ord.id}
                order={ord}
                onOpenSummary={(o) => setSelectedSummaryOrder(o)}
                onOpenReject={(o) => setSelectedRejectOrder(o)}
              />
            ))}
            {readyOrders.length === 0 && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No orders ready for delivery</div>
            )}
          </div>

          {/* Completed / Rejected */}
          <div className="board-col">
            <div className="col-header" style={{ color: 'var(--secondary)' }}>
              <span>✅ Completed / Logs ({completedOrders.length + rejectedOrders.length})</span>
            </div>
            {completedOrders.concat(rejectedOrders).map((ord) => (
              <OrderStatusCard
                key={ord.id}
                order={ord}
                onOpenSummary={(o) => setSelectedSummaryOrder(o)}
                onOpenReject={(o) => setSelectedRejectOrder(o)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Custom Service Modal */}
      <ServiceCatalogEditor
        shop={activeShop}
        isOpen={isAddServiceOpen}
        onClose={() => setIsAddServiceOpen(false)}
      />

      {/* Order Detailed Summary Modal */}
      <OrderSummaryModal
        order={selectedSummaryOrder}
        isOpen={!!selectedSummaryOrder}
        onClose={() => setSelectedSummaryOrder(null)}
        onOpenReject={(o) => setSelectedRejectOrder(o)}
      />

      {/* Reject Order Modal */}
      <RejectOrderModal
        order={selectedRejectOrder}
        isOpen={!!selectedRejectOrder}
        onClose={() => setSelectedRejectOrder(null)}
      />
    </div>
  );
};
