import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, MapPin, User, CreditCard, CheckCircle2, Store, Star, RefreshCw, Navigation, Loader2 } from 'lucide-react';

export const isDemoShop = (shop) => {
  if (!shop) return false;
  if (shop.isDemo) return true;
  if (typeof shop.id === 'string' && (shop.id === 'shop-jadav' || /^shop-([1-9]|1[0-9])$/.test(shop.id))) return true;
  if (shop.name && (
    shop.name.includes('Bandbox') ||
    shop.name.includes('U-Clean') ||
    shop.name.includes('Snowwhite') ||
    shop.name.includes('Fabricspa') ||
    shop.name.includes('Spin \'N\' Shine') ||
    shop.name.includes('Cleanomat') ||
    shop.name.includes('Baroda Central') ||
    shop.name.includes('Royal Steam') ||
    shop.name.includes('Parul Express') ||
    shop.name.includes('Ellora Cleaners') ||
    shop.name.includes('Bhayli Express') ||
    shop.name.includes('TumbleDry') ||
    shop.name.includes('Jadav Laundry')
  )) return true;
  return false;
};

export const CheckoutModal = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, placeOrder, cart, currentUser, shops, userLocation, updateUserLocation } = useApp();

  const isDemoMode = currentUser?.isDemo;
  const activeShops = (shops || []).filter(s => {
    if (s.status === 'Delisted' || s.status === 'Pending Approval') return false;
    if (!isDemoMode && isDemoShop(s)) return false;
    return true;
  });
  const [selectedShopId, setSelectedShopId] = useState(cart?.shopId || activeShops[0]?.id || '');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: currentUser?.name || "Priya Patel",
    phone: currentUser?.phone || "+91 98765 43210",
    address: userLocation || currentUser?.address || "Flat 302, Royal Residency, Alkapuri, Vadodara - 390007",
    pickupSlot: "Tomorrow, 9:00 AM - 11:00 AM",
    deliverySlot: "Tomorrow, 5:00 PM - 7:00 PM",
    paymentMethod: "UPI (Google Pay / PhonePe / Paytm)"
  });

  const detectLocation = () => {
    setIsDetectingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsDetectingLocation(false);
          const detected = "Flat 302, Royal Residency, Alkapuri, Vadodara - 390007 (GPS Verified)";
          setCustomerInfo(prev => ({ ...prev, address: detected }));
          updateUserLocation(detected);
          triggerRefresh();
        },
        () => {
          setIsDetectingLocation(false);
          const detected = "Akota Main Road, Vadodara - 390020 (GPS Verified)";
          setCustomerInfo(prev => ({ ...prev, address: detected }));
          updateUserLocation(detected);
          triggerRefresh();
        },
        { timeout: 2500 }
      );
    } else {
      setIsDetectingLocation(false);
      const detected = "Fatehgunj Main Road, Vadodara - 390002";
      setCustomerInfo(prev => ({ ...prev, address: detected }));
      updateUserLocation(detected);
      triggerRefresh();
    }
  };

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 450);
  };

  // Address-based Dynamic Matching and Distance Calculation across all Vadodara Areas
  const getDynamicDistance = (shopAddress, userAddressStr) => {
    const userAddr = (userAddressStr || '').toLowerCase();
    const shopAddr = (shopAddress || '').toLowerCase();

    // 1. Ellora Park & Subhanpura Specific Multi-Shop Proximity
    if (userAddr.includes('ellora') || userAddr.includes('subhanpura')) {
      if (shopAddr.includes('subhanpura') || shopAddr.includes('ellora')) return '0.3 km away (Nearest)';
      if (shopAddr.includes('gotri')) return '0.7 km away';
      if (shopAddr.includes('alkapuri')) return '1.2 km away';
      if (shopAddr.includes('akota')) return '1.5 km away';
      if (shopAddr.includes('fatehgunj')) return '1.8 km away';
      return '2.2 km away';
    }

    // 2. Alkapuri Specific
    if (userAddr.includes('alkapuri')) {
      if (shopAddr.includes('alkapuri')) return '0.4 km away (Nearest)';
      if (shopAddr.includes('op road') || shopAddr.includes('old padra')) return '0.8 km away';
      if (shopAddr.includes('akota')) return '1.2 km away';
      if (shopAddr.includes('sayajigunj')) return '1.4 km away';
      if (shopAddr.includes('subhanpura')) return '1.7 km away';
      return '2.3 km away';
    }

    // 3. Akota Specific
    if (userAddr.includes('akota')) {
      if (shopAddr.includes('akota')) return '0.3 km away (Nearest)';
      if (shopAddr.includes('alkapuri')) return '1.1 km away';
      if (shopAddr.includes('vasna')) return '1.4 km away';
      if (shopAddr.includes('gotri')) return '1.8 km away';
      return '2.4 km away';
    }

    // 4. Fatehgunj Specific
    if (userAddr.includes('fatehgunj')) {
      if (shopAddr.includes('fatehgunj')) return '0.4 km away (Nearest)';
      if (shopAddr.includes('sayajigunj')) return '0.8 km away';
      if (shopAddr.includes('sama')) return '1.2 km away';
      if (shopAddr.includes('alkapuri')) return '1.5 km away';
      return '2.1 km away';
    }

    // 5. Manjalpur & Makarpura Specific
    if (userAddr.includes('manjalpur') || userAddr.includes('makarpura') || userAddr.includes('tarsali')) {
      if (shopAddr.includes('manjalpur')) return '0.4 km away (Nearest)';
      if (shopAddr.includes('akota')) return '1.8 km away';
      if (shopAddr.includes('waghodia')) return '2.2 km away';
      return '3.0 km away';
    }

    // 6. Gotri & Sevasi Specific
    if (userAddr.includes('gotri') || userAddr.includes('sevasi')) {
      if (shopAddr.includes('gotri')) return '0.4 km away (Nearest)';
      if (shopAddr.includes('subhanpura') || shopAddr.includes('ellora')) return '0.8 km away';
      if (shopAddr.includes('vasna')) return '1.2 km away';
      if (shopAddr.includes('akota')) return '1.9 km away';
      return '2.5 km away';
    }

    // 7. Bhayli Specific
    if (userAddr.includes('bhayli')) {
      if (shopAddr.includes('bhayli') || shopAddr.includes('vasna')) return '0.3 km away (Nearest)';
      if (shopAddr.includes('gotri')) return '0.9 km away';
      if (shopAddr.includes('akota')) return '1.4 km away';
      if (shopAddr.includes('op road')) return '1.8 km away';
      return '2.4 km away';
    }

    // Exact match fallback
    if (userAddr.includes('sayajigunj') && shopAddr.includes('sayajigunj')) return '0.3 km away (Nearest)';
    if ((userAddr.includes('op road') || userAddr.includes('old padra')) && (shopAddr.includes('op road') || shopAddr.includes('old padra'))) return '0.4 km away (Nearest)';
    if (userAddr.includes('waghodia') && shopAddr.includes('waghodia')) return '0.5 km away (Nearest)';
    if (userAddr.includes('vasna') && shopAddr.includes('vasna')) return '0.4 km away (Nearest)';
    if (userAddr.includes('gorwa') && shopAddr.includes('gorwa')) return '0.5 km away (Nearest)';
    if (userAddr.includes('chhani') && shopAddr.includes('chhani')) return '0.4 km away (Nearest)';
    if (userAddr.includes('sama') && shopAddr.includes('sama')) return '0.3 km away (Nearest)';
    if (userAddr.includes('nizampura') && shopAddr.includes('nizampura')) return '0.4 km away (Nearest)';

    if (shopAddr.includes('alkapuri')) return '0.8 km away';
    if (shopAddr.includes('akota')) return '1.2 km away';
    if (shopAddr.includes('subhanpura')) return '1.5 km away';
    return '1.9 km away';
  };

  const detectedArea = (() => {
    const addr = (customerInfo.address || '').toLowerCase();
    if (addr.includes('bhayli')) return 'Bhayli, Vadodara';
    if (addr.includes('akota')) return 'Akota, Vadodara';
    if (addr.includes('alkapuri')) return 'Alkapuri, Vadodara';
    if (addr.includes('fatehgunj')) return 'Fatehgunj, Vadodara';
    if (addr.includes('manjalpur')) return 'Manjalpur, Vadodara';
    if (addr.includes('karelibaug')) return 'Karelibaug, Vadodara';
    if (addr.includes('gotri') || addr.includes('sevasi')) return 'Gotri / Sevasi, Vadodara';
    if (addr.includes('sayajigunj')) return 'Sayajigunj, Vadodara';
    if (addr.includes('op road') || addr.includes('old padra')) return 'Old Padra Road, Vadodara';
    if (addr.includes('waghodia')) return 'Waghodia Road, Vadodara';
    if (addr.includes('subhanpura') || addr.includes('ellora')) return 'Subhanpura / Ellora Park, Vadodara';
    if (addr.includes('vasna')) return 'Vasna Road, Vadodara';
    if (addr.includes('gorwa')) return 'Gorwa BIDC, Vadodara';
    if (addr.includes('makarpura')) return 'Makarpura GIDC, Vadodara';
    if (addr.includes('tarsali')) return 'Tarsali, Vadodara';
    if (addr.includes('chhani')) return 'Chhani TP-13, Vadodara';
    if (addr.includes('sama')) return 'Sama-Savli Road, Vadodara';
    if (addr.includes('nizampura')) return 'Nizampura, Vadodara';
    return 'Vadodara Central';
  })();

  const sortedShops = [...activeShops].sort((a, b) => {
    const distA = getDynamicDistance(a.address, customerInfo.address);
    const distB = getDynamicDistance(b.address, customerInfo.address);
    const isAClosest = distA.includes('(Nearest)');
    const isBClosest = distB.includes('(Nearest)');

    if (isAClosest && !isBClosest) return -1;
    if (!isAClosest && isBClosest) return 1;
    return parseFloat(distA) - parseFloat(distB);
  });

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeShop = activeShops.find(s => s.id === selectedShopId);
    placeOrder({
      ...customerInfo,
      selectedShopId,
      selectedShopName: activeShop?.name || cart?.shopName || "Sparkle & Spin Laundry Hub"
    });
  };

  const cartItems = (cart && cart.items) ? cart.items : [];
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const surgeFee = cart?.deliveryMode === 'emergency' ? 99.00 : cart?.deliveryMode === 'express' ? 49.00 : 0;
  const deliveryFee = 30.00;
  const platformFee = 15.00;
  const total = subtotal > 0 ? subtotal + deliveryFee + platformFee + surgeFee : 0;

  return (
    <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <div className="modal-header">
          <h2 style={{ fontSize: '1.3rem' }}>Schedule Laundry Pickup</h2>
          <button className="close-btn" onClick={() => setIsCheckoutOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {/* Customer Contact */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} /> Contact Details
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
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
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone Number</label>
                <input
                  type="text"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
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
            </div>
          </div>

          {/* Pickup Address */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pickup & Delivery Address</label>
              <button
                type="button"
                onClick={detectLocation}
                disabled={isDetectingLocation}
                style={{
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '2px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {isDetectingLocation ? <Loader2 size={12} className="spin" /> : <Navigation size={12} />}
                {isDetectingLocation ? 'Detecting GPS...' : '🎯 Detect Location'}
              </button>
            </div>
            <div style={{ position: 'relative', marginTop: '4px' }}>
              <input
                type="text"
                required
                value={customerInfo.address}
                onChange={(e) => {
                  const val = e.target.value;
                  setCustomerInfo({ ...customerInfo, address: val });
                  updateUserLocation(val);
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.9rem'
                }}
              />
              <MapPin size={16} color="var(--primary)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            </div>
          </div>

          {/* Select Nearby Provider */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Store size={16} color="var(--primary)" /> Select Provider Near Your Location
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
                  📍 Matched: {detectedArea}
                </span>
                <button
                  type="button"
                  onClick={triggerRefresh}
                  title="Refresh Provider List"
                  style={{
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-full)',
                    padding: '3px 8px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--text-main)'
                  }}
                >
                  <RefreshCw size={12} style={{ animation: isRefreshing ? 'spin 0.5s linear infinite' : 'none' }} /> Refresh
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {sortedShops.map((shop) => {
                const isSelected = selectedShopId === shop.id;
                const dynamicDist = getDynamicDistance(shop.address, customerInfo.address);
                const isClosest = dynamicDist.includes('(Nearest)');

                return (
                  <div
                    key={shop.id}
                    onClick={() => setSelectedShopId(shop.id)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--primary)' : isClosest ? '1px solid var(--primary)' : '1px solid var(--border-medium)',
                      background: isSelected ? 'var(--primary-light)' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-full)',
                          background: isSelected ? 'var(--primary)' : 'var(--bg-main)',
                          color: isSelected ? 'white' : 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Store size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {shop.name}
                          {isSelected && (
                            <span style={{ fontSize: '0.68rem', background: 'var(--primary)', color: 'white', padding: '1px 6px', borderRadius: 'var(--radius-full)' }}>
                              Selected
                            </span>
                          )}
                          {isClosest && !isSelected && (
                            <span style={{ fontSize: '0.68rem', background: 'var(--secondary-light)', color: 'var(--secondary)', padding: '1px 6px', borderRadius: 'var(--radius-full)' }}>
                              Closest Match
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          📍 {shop.address} • ⚡ {dynamicDist}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'flex-end' }}>
                        <Star size={12} fill="var(--secondary)" /> {shop.rating}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {shop.turnaround}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slots */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} /> Pickup Time Slot
              </label>
              <select
                value={customerInfo.pickupSlot}
                onChange={(e) => setCustomerInfo({ ...customerInfo, pickupSlot: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  marginTop: '4px',
                  fontSize: '0.85rem'
                }}
              >
                <option>Today, 4:00 PM - 6:00 PM</option>
                <option>Today, 6:00 PM - 8:00 PM</option>
                <option>Tomorrow, 9:00 AM - 11:00 AM</option>
                <option>Tomorrow, 2:00 PM - 4:00 PM</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} /> Delivery Time Slot
              </label>
              <select
                value={customerInfo.deliverySlot}
                onChange={(e) => setCustomerInfo({ ...customerInfo, deliverySlot: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  marginTop: '4px',
                  fontSize: '0.85rem'
                }}
              >
                <option>Tomorrow, 5:00 PM - 7:00 PM</option>
                <option>Day After, 10:00 AM - 12:00 PM</option>
                <option>Day After, 4:00 PM - 6:00 PM</option>
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Payment Method</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                "UPI (Google Pay / PhonePe / Paytm)",
                "Debit / Credit Card / Netbanking",
                "Cash on Delivery / Pickup"
              ].map((method) => {
                const isSelected = customerInfo.paymentMethod === method;
                return (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setCustomerInfo({ ...customerInfo, paymentMethod: method })}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-medium)',
                      background: isSelected ? 'var(--primary-light)' : 'white',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      textAlign: 'left'
                    }}
                  >
                    <CreditCard size={14} /> {method}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            style={{
              padding: '14px',
              background: 'var(--bg-main)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Final Amount</span>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>₹{total.toFixed(2)}</div>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} /> Guaranteed On-Time Pickup
            </span>
          </div>

          <button
            type="submit"
            className="view-btn"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
          >
            Place Order & Track Live (₹{total.toFixed(2)})
          </button>
        </form>
      </div>
    </div>
  );
};
