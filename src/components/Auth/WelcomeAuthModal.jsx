import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shirt, User, Store, ShieldCheck, Mail, Lock, Phone, MapPin, ArrowRight, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';

export const WelcomeAuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authView,
    setAuthView,
    loginUser,
    registerVendorShop
  } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    shopName: '',
    licenseNo: '',
    password: ''
  });

  if (!isAuthModalOpen) return null;

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    loginUser('customer', formData.email || 'priya@example.in', formData.name || 'Priya Sharma', {
      phone: formData.phone,
      address: formData.address
    });
  };

  const handleVendorSubmit = (e) => {
    e.preventDefault();
    if (authView === 'vendor_signup') {
      registerVendorShop({
        name: formData.name,
        email: formData.email,
        shopName: formData.shopName,
        phone: formData.phone,
        address: formData.address,
        password: formData.password
      });
    } else {
      loginUser('vendor', formData.email || 'rajesh@sparklespin.in', formData.name || 'Rajesh Kumar', {
        shopName: formData.shopName || 'Sparkle & Spin Laundry Hub',
        phone: formData.phone,
        address: formData.address
      });
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 200, padding: '16px' }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '560px',
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Welcome Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
            color: 'white',
            padding: '32px 28px',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            <Shirt size={30} color="white" />
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
            Welcome to LaundryHub
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#c7d2fe', maxWidth: '420px', margin: '0 auto' }}>
            On-Demand Local Laundry Marketplace connecting neighborhood laundry shops with customers.
          </p>

          {authView !== 'welcome' && (
            <button
              onClick={() => setAuthView('welcome')}
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ArrowLeft size={14} /> Back
            </button>
          )}
        </div>

        {/* View 1: Welcome Role Selector */}
        {authView === 'welcome' && (
          <div style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Choose your role to get started:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {/* Customer Option */}
              <div
                onClick={() => setAuthView('customer_login')}
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--border-light)',
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'var(--primary-light)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.background = 'white'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
                    <User size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>I am a Customer 🛍️</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Book doorstep laundry pickup, custom care, & live order tracking
                    </p>
                  </div>
                </div>
                <ArrowRight size={20} color="var(--primary)" />
              </div>

              {/* Provider / Shop Owner Option */}
              <div
                onClick={() => setAuthView('vendor_login')}
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--border-light)',
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-light)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.background = 'white'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
                    <Store size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>I am a Laundry Provider 🏪</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      List your local shop, set custom prices, & manage daily orders
                    </p>
                  </div>
                </div>
                <ArrowRight size={20} color="var(--accent)" />
              </div>
            </div>

            {/* Quick Demo Access Bar */}
            <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Sparkles size={14} color="var(--warning)" /> QUICK DEMO ACCESS (1-CLICK)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => loginUser('customer', 'priya@example.in', 'Priya Sharma')}
                  style={{ padding: '8px', borderRadius: 'var(--radius-sm)', background: 'white', border: '1px solid var(--border-medium)', fontSize: '0.75rem', fontWeight: 600 }}
                >
                  ⚡ Demo Customer
                </button>
                <button
                  onClick={() => loginUser('vendor', 'rajesh@sparklespin.in', 'Rajesh Kumar', { shopId: 'shop-1' })}
                  style={{ padding: '8px', borderRadius: 'var(--radius-sm)', background: 'white', border: '1px solid var(--border-medium)', fontSize: '0.75rem', fontWeight: 600 }}
                >
                  ⚡ Demo Provider
                </button>
                <button
                  onClick={() => loginUser('admin', 'admin@laundryhub.in', 'Platform Admin')}
                  style={{ padding: '8px', borderRadius: 'var(--radius-sm)', background: 'white', border: '1px solid var(--border-medium)', fontSize: '0.75rem', fontWeight: 600 }}
                >
                  ⚡ Demo Admin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Customer Login / Signup */}
        {(authView === 'customer_login' || authView === 'customer_signup') && (
          <div style={{ padding: '28px' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '4px', borderRadius: 'var(--radius-full)', marginBottom: '20px' }}>
              <button
                style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.85rem', background: authView === 'customer_login' ? 'white' : 'transparent', color: authView === 'customer_login' ? 'var(--primary)' : 'var(--text-muted)' }}
                onClick={() => setAuthView('customer_login')}
              >
                Customer Log In
              </button>
              <button
                style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.85rem', background: authView === 'customer_signup' ? 'white' : 'transparent', color: authView === 'customer_signup' ? 'var(--primary)' : 'var(--text-muted)' }}
                onClick={() => setAuthView('customer_signup')}
              >
                Sign Up as Customer
              </button>
            </div>

            <form onSubmit={handleCustomerSubmit}>
              {authView === 'customer_signup' && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px', fontSize: '0.9rem' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email or Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="sarah@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px', fontSize: '0.9rem' }}
                />
              </div>

              {authView === 'customer_signup' && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Default Delivery Address</label>
                  <input
                    type="text"
                    placeholder="Flat 302, Royal Residency, Alkapuri, Vadodara"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px', fontSize: '0.9rem' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px', fontSize: '0.9rem' }}
                />
              </div>

              <button
                type="submit"
                className="view-btn"
                style={{ width: '100%', padding: '12px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                {authView === 'customer_login' ? 'Log In to Customer Account' : 'Create Customer Account'} <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}

        {/* View 3: Provider / Shop Owner Login / Signup */}
        {(authView === 'vendor_login' || authView === 'vendor_signup') && (
          <div style={{ padding: '28px' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '4px', borderRadius: 'var(--radius-full)', marginBottom: '20px' }}>
              <button
                style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.85rem', background: authView === 'vendor_login' ? 'white' : 'transparent', color: authView === 'vendor_login' ? 'var(--accent)' : 'var(--text-muted)' }}
                onClick={() => setAuthView('vendor_login')}
              >
                Shop Owner Log In
              </button>
              <button
                style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.85rem', background: authView === 'vendor_signup' ? 'white' : 'transparent', color: authView === 'vendor_signup' ? 'var(--accent)' : 'var(--text-muted)' }}
                onClick={() => setAuthView('vendor_signup')}
              >
                Register New Shop
              </button>
            </div>

            <form onSubmit={handleVendorSubmit}>
              {authView === 'vendor_signup' && (
                <>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Laundry Shop Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sparkle & Spin Laundry Hub"
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Owner Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px', fontSize: '0.9rem' }}
                    />
                  </div>
                </>
              )}

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Business Email or Phone</label>
                <input
                  type="text"
                  required
                  placeholder="rajesh@sparklespin.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px', fontSize: '0.9rem' }}
                />
              </div>

              {authView === 'vendor_signup' && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Shop Address</label>
                  <input
                    type="text"
                    placeholder="142 RC Dutt Road, Alkapuri, Vadodara"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px', fontSize: '0.9rem' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px', fontSize: '0.9rem' }}
                />
              </div>

              <button
                type="submit"
                className="view-btn"
                style={{ width: '100%', padding: '12px', fontSize: '1rem', background: 'var(--accent)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                {authView === 'vendor_login' ? 'Log In to Shop Dashboard' : 'Submit Shop Registration'} <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
