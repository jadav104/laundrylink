import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { WelcomePage } from './components/Auth/WelcomePage';
import { ShopCard } from './components/Customer/ShopCard';
import { ShopDetailModal } from './components/Customer/ShopDetailModal';
import { CartDrawer } from './components/Customer/CartDrawer';
import { CheckoutModal } from './components/Customer/CheckoutModal';
import { OrderTracker } from './components/Customer/OrderTracker';
import { DirectServicesCatalog } from './components/Customer/DirectServicesCatalog';
import { LiveBillPanel } from './components/Customer/LiveBillPanel';
import { NearbyShopsMatching } from './components/Customer/NearbyShopsMatching';
import { VendorDashboard } from './components/Vendor/VendorDashboard';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { Search, Sparkles, Zap, ShieldCheck, Clock, Layers } from 'lucide-react';

const MainContent = () => {
  const { currentRole, shops } = useApp();
  const [pageView, setPageView] = useState('welcome'); // 'welcome' | 'app'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  if (pageView === 'welcome') {
    return <WelcomePage onNavigateToApp={() => setPageView('app')} />;
  }

  // Filter shops
  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'Express 24h') return shop.expressAvailable;
    if (activeFilter === 'Eco-Friendly') return shop.tags.includes('Eco-Friendly') || shop.tags.includes('Organic Detergents');
    if (activeFilter === 'Dry Cleaning') return shop.services.some((s) => s.name.toLowerCase().includes('dry clean'));

    return true;
  });

  return (
    <div className="app-container">
      <Navbar onGoToWelcome={() => setPageView('welcome')} />

      <main className="main-content">
        {currentRole === 'customer' && (
          <>
            {/* Hero Section */}
            <div className="hero-banner">
              <div className="hero-content">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px' }}>
                  <Sparkles size={14} color="#fde047" /> Local Laundry & Live Bill Calculator
                </div>
                <h1 className="hero-title">
                  Fresh Laundry Picked Up & Delivered from Local Shops
                </h1>
                <p className="hero-subtitle">
                  Select available services directly below, pick your emergency or express speed option, and watch your total bill compute live in real time.
                </p>

                {/* Search Bar */}
                <div className="search-bar">
                  <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search by shop name, service, or locality (e.g. Indiranagar, Saree Dry Clean)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="search-btn">
                    Find Services
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="filters-row">
              {['All', 'Express 24h', 'Eco-Friendly', 'Dry Cleaning'].map((filter) => (
                <button
                  key={filter}
                  className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === 'Express 24h' && <Zap size={14} />}
                  {filter === 'Eco-Friendly' && <Sparkles size={14} />}
                  {filter}
                </button>
              ))}
            </div>

            {/* 2-Column Layout for Services Catalog & Live Bill Calculator */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '24px', alignItems: 'start' }}>
              <div>
                {/* Direct Selectable Services Catalog */}
                <DirectServicesCatalog />

                {/* Nearby Laundry Shops Matching Order */}
                <NearbyShopsMatching />
              </div>

              {/* Live Bill & Subtotal Calculator Sidebar */}
              <LiveBillPanel />
            </div>
          </>
        )}

        {currentRole === 'vendor' && <VendorDashboard />}

        {currentRole === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Modals */}
      <ShopDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTracker />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
