import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CustomerOrdersModal } from './Customer/CustomerOrdersModal';
import { Shirt, ShoppingBag, MapPin, User, Store, ShieldCheck, Clock, LogOut, Home, Navigation, X, Check, Package } from 'lucide-react';
import { vadodaraLocations } from '../data/mockData';

export const Navbar = ({ onGoToWelcome }) => {
  const {
    currentRole,
    setCurrentRole,
    currentUser,
    logoutUser,
    cart,
    setIsCartOpen,
    orders,
    activeOrderTrackerId,
    setActiveOrderTrackerId,
    userLocation,
    updateUserLocation
  } = useApp();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMyOrdersOpen, setIsMyOrdersOpen] = useState(false);
  const [customAddress, setCustomAddress] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  const totalCartCount = cart.items.reduce((sum, item) => sum + item.qty, 0);

  // Active customer orders
  const customerOrders = orders.filter((o) => {
    if (!currentUser) return true;
    const matchEmail = currentUser.email && o.customerEmail && o.customerEmail.toLowerCase() === currentUser.email.toLowerCase();
    const matchPhone = currentUser.phone && o.customerPhone && o.customerPhone.includes(currentUser.phone);
    const matchName = currentUser.name && o.customerName && o.customerName.toLowerCase().includes(currentUser.name.toLowerCase());
    return matchEmail || matchPhone || matchName || !o.customerEmail;
  });

  const activeOrder = orders.find(o => o.id === activeOrderTrackerId || o.status !== 'Completed');

  const handleSelectArea = (areaObj) => {
    const formatted = `Flat 302, ${areaObj.area}, Vadodara - ${areaObj.pincode}`;
    updateUserLocation(formatted);
    setIsLocationModalOpen(false);
  };

  const handleGPSDetect = () => {
    setIsDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsDetecting(false);
          updateUserLocation("Flat 302, Royal Residency, Alkapuri, Vadodara - 390007 (GPS Verified)");
          setIsLocationModalOpen(false);
        },
        () => {
          setIsDetecting(false);
          updateUserLocation("Akota Main Road, Vadodara - 390020 (GPS Verified)");
          setIsLocationModalOpen(false);
        },
        { timeout: 2500 }
      );
    } else {
      setIsDetecting(false);
      updateUserLocation("Alkapuri Main Road, Vadodara - 390007");
      setIsLocationModalOpen(false);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customAddress.trim()) {
      updateUserLocation(customAddress.trim());
      setCustomAddress('');
      setIsLocationModalOpen(false);
    }
  };

  return (
    <header style={{ width: '100%' }}>
      {/* Top Banner Role Selector */}
      <div className="role-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 600 }}>Marketplace Mode:</span>
          {currentUser ? (
            <span style={{ color: '#818cf8', fontWeight: 600 }}>
              Logged in as {currentUser.name} ({currentUser.type.toUpperCase()})
            </span>
          ) : (
            <span style={{ opacity: 0.8 }}>Switch perspectives to test platform features</span>
          )}
        </div>
        <div className="role-switcher">
          <button
            className={`role-btn ${currentRole === 'customer' ? 'active' : ''}`}
            onClick={() => setCurrentRole('customer')}
          >
            <User size={14} /> Customer View
          </button>
          <button
            className={`role-btn ${currentRole === 'vendor' ? 'active' : ''}`}
            onClick={() => setCurrentRole('vendor')}
          >
            <Store size={14} /> Shop Owner Portal
          </button>
          <button
            className={`role-btn ${currentRole === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentRole('admin')}
          >
            <ShieldCheck size={14} /> Admin Panel
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar">
        <div className="brand" style={{ cursor: 'pointer' }} onClick={onGoToWelcome}>
          <div className="brand-icon">
            <Shirt size={24} />
          </div>
          <div>
            <span>LaundryHub</span>
            <span style={{ fontSize: '0.7rem', display: 'block', color: 'var(--primary)', fontWeight: 600, marginTop: '-4px' }}>
              LOCAL MARKETPLACE
            </span>
          </div>
        </div>

        {currentRole === 'customer' && (
          <div
            className="location-picker"
            onClick={() => setIsLocationModalOpen(true)}
            style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
            title="Click to change preferred Vadodara location"
          >
            <MapPin size={16} color="var(--primary)" />
            <span>Deliver to: <strong style={{ color: 'var(--primary)' }}>{userLocation.split(',')[0]}</strong></span>
            <span style={{ fontSize: '0.7rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '1px 6px', borderRadius: 'var(--radius-full)', marginLeft: '4px' }}>Change</span>
          </div>
        )}

        <div className="nav-actions">
          {/* Back to Welcome Page Button */}
          <button
            className="btn-outline"
            onClick={onGoToWelcome}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: 'var(--radius-full)', padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Home size={16} /> Welcome Page
          </button>

          {currentRole === 'customer' && (
            <button
              className="btn-outline"
              onClick={() => setIsMyOrdersOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: 'var(--radius-full)', padding: '8px 16px', fontSize: '0.85rem', background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700 }}
            >
              <Package size={16} color="var(--primary)" />
              <span>My Orders ({customerOrders.length})</span>
            </button>
          )}

          {currentRole === 'customer' && activeOrder && (
            <button
              className="btn-outline"
              onClick={() => setActiveOrderTrackerId(activeOrder.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: 'var(--radius-full)', padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <Clock size={16} color="var(--primary)" />
              <span>Track Order <strong>#{activeOrder.id}</strong></span>
            </button>
          )}

          {currentRole === 'customer' && (
            <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={18} />
              <span>Cart</span>
              {totalCartCount > 0 && (
                <span className="cart-count">{totalCartCount}</span>
              )}
            </button>
          )}

          {currentUser && (
            <button
              className="btn-outline"
              onClick={() => { logoutUser(); onGoToWelcome(); }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: 'var(--radius-full)', padding: '8px 16px', fontSize: '0.85rem' }}
              title="Logout"
            >
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>
      </nav>

      {/* Customer Orders Modal */}
      <CustomerOrdersModal
        isOpen={isMyOrdersOpen}
        onClose={() => setIsMyOrdersOpen(false)}
      />

      {/* Vadodara Location Selector Modal */}
      {isLocationModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLocationModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={18} color="var(--primary)" /> Choose Vadodara Location
              </h3>
              <button className="close-btn" onClick={() => setIsLocationModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              {/* GPS Button */}
              <button
                onClick={handleGPSDetect}
                disabled={isDetecting}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-light)',
                  border: '1px solid var(--primary)',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}
              >
                <Navigation size={16} />
                {isDetecting ? 'Detecting Live GPS Location...' : '🎯 Auto-Detect GPS Location'}
              </button>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Select Your Vadodara Locality (17 Areas Covered)
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxHeight: '240px', overflowY: 'auto', marginBottom: '16px', paddingRight: '4px' }}>
                {vadodaraLocations.map((loc, idx) => {
                  const isSelected = userLocation.toLowerCase().includes(loc.area.toLowerCase());
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectArea(loc)}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-medium)',
                        background: isSelected ? 'var(--primary-light)' : 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: isSelected ? 'var(--primary)' : 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>📍 {loc.area}</span>
                        {isSelected && <Check size={14} color="var(--primary)" />}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {loc.pincode} • {loc.landmark}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Input */}
              <form onSubmit={handleCustomSubmit} style={{ borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Or enter specific flat / street in Vadodara</label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <input
                    type="text"
                    placeholder="e.g. Flat 501, OP Road, Vadodara"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    style={{ flex: 1, padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="view-btn" style={{ padding: '9px 16px', fontSize: '0.85rem' }}>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
