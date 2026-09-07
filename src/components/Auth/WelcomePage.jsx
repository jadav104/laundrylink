import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shirt, User, Store, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, MapPin, Truck, Clock, Lock, Mail, Phone } from 'lucide-react';

export const WelcomePage = ({ onNavigateToApp }) => {
  const { loginUser, setCurrentRole, setActiveVendorId } = useApp();
  const [activeAuthTab, setActiveAuthTab] = useState('none'); // 'none' | 'customer_login' | 'customer_signup' | 'vendor_login' | 'vendor_signup'

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    shopName: '',
    password: ''
  });

  const handleCustomerAuth = (e, isSignup) => {
    e.preventDefault();
    loginUser('customer', form.email || 'priya@example.in', form.name || 'Priya Sharma', {
      phone: form.phone,
      address: form.address
    });
    onNavigateToApp();
  };

  const handleVendorAuth = (e, isSignup) => {
    e.preventDefault();
    loginUser('vendor', form.email || 'rajesh@sparklespin.in', form.name || 'Rajesh Kumar', {
      shopName: form.shopName || 'Sparkle & Spin Laundry Hub',
      phone: form.phone,
      address: form.address,
      shopId: 'shop-1'
    });
    onNavigateToApp();
  };

  const handleQuickDemo = (role) => {
    if (role === 'customer') {
      loginUser('customer', 'priya@example.in', 'Priya Sharma');
    } else if (role === 'vendor') {
      loginUser('vendor', 'rajesh@sparklespin.in', 'Rajesh Kumar', { shopId: 'shop-1' });
    } else if (role === 'admin') {
      loginUser('admin', 'admin@laundryhub.in', 'Platform Admin');
    }
    onNavigateToApp();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', display: 'flex', flexDirection: 'column' }}>
      {/* Header Bar */}
      <header
        style={{
          padding: '18px 36px',
          background: 'white',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            <Shirt size={26} />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>LaundryHub</span>
            <span style={{ fontSize: '0.75rem', display: 'block', color: 'var(--primary)', fontWeight: 700, marginTop: '-4px' }}>
              LOCAL MARKETPLACE PLATFORM
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setActiveAuthTab('customer_login')}
            style={{ padding: '8px 18px', borderRadius: 'var(--radius-full)', background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }}
          >
            Customer Login
          </button>
          <button
            onClick={() => setActiveAuthTab('vendor_login')}
            style={{ padding: '8px 18px', borderRadius: 'var(--radius-full)', background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem' }}
          >
            Provider Login
          </button>
        </div>
      </header>

      {/* Main Hero & Role Selection Page */}
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '40px 24px' }}>
        {/* Full Hero Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0284c7 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px 40px',
            color: 'white',
            textAlign: 'center',
            marginBottom: '40px',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px' }}>
            <Sparkles size={16} color="#fde047" /> Connecting Customers & Local Laundry Service Providers
          </div>

          <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px', color: 'white' }}>
            On-Demand Local Laundry & Dry Cleaning Platform
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#e0e7ff', maxWidth: '720px', margin: '0 auto 28px' }}>
            Order doorstep wash & fold, steam ironing, and dry cleaning from verified neighborhood laundry shops — or list your laundry shop to grow orders!
          </p>

          {/* Quick Demo Access Pills */}
          <div style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)', padding: '14px 20px', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fde047' }}>⚡ 1-Click Instant Preview:</span>
            <button onClick={() => handleQuickDemo('customer')} style={{ background: 'white', color: 'var(--primary)', padding: '6px 16px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.8rem' }}>
              🛍️ Explore as Customer
            </button>
            <button onClick={() => handleQuickDemo('vendor')} style={{ background: 'var(--accent)', color: 'white', padding: '6px 16px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.8rem' }}>
              🏪 Explore as Provider
            </button>
            <button onClick={() => handleQuickDemo('admin')} style={{ background: '#334155', color: 'white', padding: '6px 16px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.8rem' }}>
              🛡️ Admin Dashboard
            </button>
          </div>
        </div>

        {/* Dual Dedicated Cards for Customer and Provider */}
        <h2 style={{ fontSize: '1.6rem', textAlign: 'center', marginBottom: '24px' }}>Choose How You Want to Get Started</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px', marginBottom: '48px' }}>
          {/* Card 1: Customer */}
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              border: '2px solid var(--border-light)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.25s ease'
            }}
          >
            <div>
              <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <User size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>For Customers 🛍️</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                Find top-rated laundry shops near you. Get doorstep pickup & 24h express delivery.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" /> Browse nearby verified local shops</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" /> Wash & Fold, Dry Clean, Steam Ironing</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" /> Live real-time order status tracking</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" /> Custom fabric care & detergent choices</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                className="view-btn"
                style={{ padding: '12px', fontSize: '0.9rem' }}
                onClick={() => setActiveAuthTab('customer_login')}
              >
                Customer Log In
              </button>
              <button
                className="btn-outline"
                style={{ padding: '12px', fontSize: '0.9rem', borderRadius: 'var(--radius-md)', fontWeight: 700 }}
                onClick={() => setActiveAuthTab('customer_signup')}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Card 2: Laundry Provider */}
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              border: '2px solid var(--border-light)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.25s ease'
            }}
          >
            <div>
              <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Store size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>For Laundry Providers 🏪</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                Register your local laundry business, get daily orders, & set custom service rates.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent)" /> List shop profile & operating hours</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent)" /> Set custom per-kg and per-item pricing</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent)" /> Manage daily order washing pipeline</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent)" /> View daily revenue & customer feedback</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                className="view-btn"
                style={{ padding: '12px', fontSize: '0.9rem', background: 'var(--accent)' }}
                onClick={() => setActiveAuthTab('vendor_login')}
              >
                Provider Log In
              </button>
              <button
                className="btn-outline"
                style={{ padding: '12px', fontSize: '0.9rem', borderRadius: 'var(--radius-md)', fontWeight: 700 }}
                onClick={() => setActiveAuthTab('vendor_signup')}
              >
                Register Shop
              </button>
            </div>
          </div>
        </div>

        {/* Features Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', textAlign: 'center' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <Truck size={28} color="var(--primary)" style={{ marginBottom: '8px' }} />
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Doorstep Pickup</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Choose convenient time slots for pickup & delivery.</p>
          </div>
          <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <ShieldCheck size={28} color="var(--secondary)" style={{ marginBottom: '8px' }} />
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Verified Partners</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>All local laundry shops are vetted and quality-checked.</p>
          </div>
          <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <Clock size={28} color="var(--warning)" style={{ marginBottom: '8px' }} />
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>24h Express Care</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Same day and 24-hour turnaround available.</p>
          </div>
        </div>
      </main>

      {/* Auth Modals based on selected tab */}
      {activeAuthTab !== 'none' && (
        <div className="modal-overlay" onClick={() => setActiveAuthTab('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem' }}>
                {activeAuthTab.startsWith('customer') ? 'Customer Portal' : 'Laundry Provider Portal'}
              </h3>
              <button className="close-btn" onClick={() => setActiveAuthTab('none')}>✕</button>
            </div>

            {/* Customer Auth */}
            {activeAuthTab.startsWith('customer') && (
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '4px', borderRadius: 'var(--radius-full)', marginBottom: '20px' }}>
                  <button
                    style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-full)', fontWeight: 700, background: activeAuthTab === 'customer_login' ? 'white' : 'transparent', color: activeAuthTab === 'customer_login' ? 'var(--primary)' : 'var(--text-muted)' }}
                    onClick={() => setActiveAuthTab('customer_login')}
                  >
                    Customer Log In
                  </button>
                  <button
                    style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-full)', fontWeight: 700, background: activeAuthTab === 'customer_signup' ? 'white' : 'transparent', color: activeAuthTab === 'customer_signup' ? 'var(--primary)' : 'var(--text-muted)' }}
                    onClick={() => setActiveAuthTab('customer_signup')}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={(e) => handleCustomerAuth(e, activeAuthTab === 'customer_signup')}>
                  {activeAuthTab === 'customer_signup' && (
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Sarah Jenkins"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px' }}
                      />
                    </div>
                  )}

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email or Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="sarah@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px' }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px' }}
                    />
                  </div>

                  <button className="view-btn" style={{ width: '100%', padding: '12px', fontSize: '1rem' }} type="submit">
                    {activeAuthTab === 'customer_login' ? 'Log In to Customer Account' : 'Create Customer Account'}
                  </button>
                </form>
              </div>
            )}

            {/* Provider Auth */}
            {activeAuthTab.startsWith('vendor') && (
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '4px', borderRadius: 'var(--radius-full)', marginBottom: '20px' }}>
                  <button
                    style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-full)', fontWeight: 700, background: activeAuthTab === 'vendor_login' ? 'white' : 'transparent', color: activeAuthTab === 'vendor_login' ? 'var(--accent)' : 'var(--text-muted)' }}
                    onClick={() => setActiveAuthTab('vendor_login')}
                  >
                    Provider Log In
                  </button>
                  <button
                    style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-full)', fontWeight: 700, background: activeAuthTab === 'vendor_signup' ? 'white' : 'transparent', color: activeAuthTab === 'vendor_signup' ? 'var(--accent)' : 'var(--text-muted)' }}
                    onClick={() => setActiveAuthTab('vendor_signup')}
                  >
                    Register Shop
                  </button>
                </div>

                <form onSubmit={(e) => handleVendorAuth(e, activeAuthTab === 'vendor_signup')}>
                  {activeAuthTab === 'vendor_signup' && (
                    <>
                      <div style={{ marginBottom: '14px' }}>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Laundry Shop Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Sparkle & Spin Laundry Hub"
                          value={form.shopName}
                          onChange={(e) => setForm({ ...form, shopName: e.target.value })}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px' }}
                        />
                      </div>
                      <div style={{ marginBottom: '14px' }}>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Owner Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Marcus Sterling"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px' }}
                        />
                      </div>
                    </>
                  )}

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Business Email or Phone</label>
                    <input
                      type="text"
                      required
                      placeholder="marcus@sparklespin.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px' }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', marginTop: '4px' }}
                    />
                  </div>

                  <button className="view-btn" style={{ width: '100%', padding: '12px', fontSize: '1rem', background: 'var(--accent)' }} type="submit">
                    {activeAuthTab === 'vendor_login' ? 'Log In to Shop Dashboard' : 'Register Laundry Shop'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
