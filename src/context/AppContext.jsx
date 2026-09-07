import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialShops, initialOrders, initialPendingVendors, initialUserDB } from '../data/mockData';

const AppContext = createContext();

const loadDB = (key, fallback) => {
  try {
    const data = localStorage.getItem(`laundryhub_${key}`);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const saveDB = (key, val) => {
  try {
    localStorage.setItem(`laundryhub_${key}`, JSON.stringify(val));
  } catch (e) {}
};

export const AppProvider = ({ children }) => {
  // Auth state persisted in LocalStorage
  const [currentUser, setCurrentUser] = useState(() => loadDB('currentUser', null));
  const [authView, setAuthView] = useState(() => loadDB('authView', 'welcome'));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => !loadDB('currentUser', null));

  // Database tables loaded from LocalStorage
  const [userDB, setUserDB] = useState(() => loadDB('userDB', initialUserDB));
  const [shops, setShops] = useState(() => loadDB('shops', initialShops));
  const [orders, setOrders] = useState(() => loadDB('orders', initialOrders));
  const [pendingVendors, setPendingVendors] = useState(() => loadDB('pendingVendors', initialPendingVendors));

  // Sync Database & Session Changes to LocalStorage
  useEffect(() => { saveDB('shops', shops); }, [shops]);
  useEffect(() => { saveDB('orders', orders); }, [orders]);
  useEffect(() => { saveDB('userDB', userDB); }, [userDB]);
  useEffect(() => { saveDB('pendingVendors', pendingVendors); }, [pendingVendors]);
  useEffect(() => { saveDB('currentUser', currentUser); }, [currentUser]);
  useEffect(() => { saveDB('authView', authView); }, [authView]);

  // Active Role and Vendor Selection
  const [currentRole, setCurrentRole] = useState(() => loadDB('currentRole', 'customer'));
  useEffect(() => { saveDB('currentRole', currentRole); }, [currentRole]);

  const [activeVendorId, setActiveVendorId] = useState(() => {
    const saved = loadDB('currentUser', null);
    return saved?.shopId || shops[0]?.id || 'shop-1';
  });

  // Cart State for Customer
  const [cart, setCart] = useState({
    shopId: null,
    shopName: '',
    items: [],
    carePreferences: ["Standard Detergent"],
    deliveryMode: "standard",
    pickupAddress: "Flat 302, Royal Residency, Alkapuri, Vadodara - 390007",
    pickupSlot: "Tomorrow, 9:00 AM - 11:00 AM",
    deliverySlot: "Tomorrow, 5:00 PM - 7:00 PM"
  });

  // Persistent User Location
  const [userLocation, setUserLocation] = useState(() => {
    try {
      return localStorage.getItem('laundryhub_userLocation') || "Flat 302, Royal Residency, Alkapuri, Vadodara - 390007";
    } catch(e) {
      return "Flat 302, Royal Residency, Alkapuri, Vadodara - 390007";
    }
  });

  const updateUserLocation = (newLocation) => {
    setUserLocation(newLocation);
    try {
      localStorage.setItem('laundryhub_userLocation', newLocation);
    } catch(e) {}
  };

  const [selectedShopModal, setSelectedShopModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrderTrackerId, setActiveOrderTrackerId] = useState(null);

  // Auth Functions
  const loginUser = (userType, email, name, extra = {}) => {
    // Search in userDB if registered
    const existing = userDB.find((u) => u.email.toLowerCase() === email?.toLowerCase());
    
    const user = existing || {
      id: `usr-${Date.now()}`,
      role: userType,
      name: name || (userType === 'customer' ? 'Priya Sharma' : userType === 'vendor' ? 'Rajesh Kumar' : 'Platform Admin'),
      email: email,
      phone: extra.phone || '+91 98765 43210',
      shopName: extra.shopName || (userType === 'vendor' ? 'Sparkle & Spin Laundry Hub' : ''),
      address: extra.address || 'Flat 302, Royal Residency, Alkapuri, Vadodara - 390007',
      shopId: extra.shopId || (userType === 'vendor' ? 'shop-1' : null)
    };

    if (!existing) {
      setUserDB((prev) => [user, ...prev]);
    }

    setCurrentUser(user);
    setCurrentRole(userType);

    if (userType === 'vendor') {
      const targetShopId = extra.shopId || user.shopId || shops[0]?.id || 'shop-1';
      setActiveVendorId(targetShopId);
    }

    setIsAuthModalOpen(false);
  };

  // REGISTER NEW VENDOR & AUTO-PUBLISH SHOP TO MARKETPLACE
  const registerVendorShop = (vendorData) => {
    const newShopId = `shop-${Date.now()}`;
    const newShopName = vendorData.shopName || 'New Laundry Hub';
    const ownerName = vendorData.name || 'Shop Owner';

    const newShop = {
      id: newShopId,
      name: newShopName,
      ownerName: ownerName,
      rating: 5.0,
      reviewsCount: 1,
      distance: "0.4 km away (Newly Partnered)",
      turnaround: "24 Hours",
      expressAvailable: true,
      emergencyAvailable: true,
      address: vendorData.address || "Alkapuri, Vadodara",
      phone: vendorData.phone || "+91 98765 43210",
      image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
      tags: ["Verified Vendor", "New Partner", "Express 24h", "Dry Cleaning"],
      status: "Approved", // Auto-published so it immediately shows in customer shop selection list!
      minOrder: "₹120.00",
      commissionRate: "15%",
      warnings: [],
      services: [
        { id: `s1-${Date.now()}`, name: "Wash & Fold (per kg)", price: 60.00, unit: "kg", category: "Wash & Fold", desc: "Clean, fresh washed daily wear" },
        { id: `s2-${Date.now()}`, name: "Wash & Steam Press (per piece)", price: 25.00, unit: "piece", category: "Ironing", desc: "Wrinkle-free steam press finish" },
        { id: `s3-${Date.now()}`, name: "Heavy Saree & Suit Dry Clean", price: 250.00, unit: "set", category: "Dry Cleaning", desc: "Eco-solvent solvent dry cleaning" },
        { id: `s4-${Date.now()}`, name: "Sneaker & Shoe Deep Wash", price: 249.00, unit: "pair", category: "Shoe Care", desc: "Foam cleansing & deodorizing" }
      ]
    };

    // Save shop to DB state
    setShops((prev) => [newShop, ...prev]);

    // Create vendor user in DB
    const newVendorUser = {
      id: `usr-v-${Date.now()}`,
      role: 'vendor',
      name: ownerName,
      email: vendorData.email,
      phone: vendorData.phone || '+91 98765 43210',
      address: vendorData.address,
      shopId: newShopId,
      shopName: newShopName,
      password: vendorData.password || '123'
    };

    setUserDB((prev) => [newVendorUser, ...prev]);

    // Log in as the new vendor and select their shop
    setCurrentUser(newVendorUser);
    setCurrentRole('vendor');
    setActiveVendorId(newShopId);
    setIsAuthModalOpen(false);

    return newShop;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsAuthModalOpen(true);
    setAuthView('welcome');
  };

  // Cart Handlers
  const addToCart = (shop, service) => {
    setCart((prev) => {
      if (prev.shopId && prev.shopId !== shop.id) {
        return {
          ...prev,
          shopId: shop.id,
          shopName: shop.name,
          items: [{ ...service, qty: 1 }]
        };
      }

      const existingIndex = prev.items.findIndex((item) => item.id === service.id);
      let updatedItems = [...prev.items];
      if (existingIndex > -1) {
        updatedItems[existingIndex].qty += 1;
      } else {
        updatedItems.push({ ...service, qty: 1 });
      }

      return {
        ...prev,
        shopId: shop.id,
        shopName: shop.name,
        items: updatedItems
      };
    });
  };

  const updateCartQty = (serviceId, delta) => {
    setCart((prev) => {
      const updatedItems = prev.items
        .map((item) => {
          if (item.id === serviceId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);

      return {
        ...prev,
        shopId: updatedItems.length > 0 ? prev.shopId : null,
        shopName: updatedItems.length > 0 ? prev.shopName : '',
        items: updatedItems
      };
    });
  };

  const assignShopToCart = (shopId, shopName) => {
    setCart((prev) => ({ ...prev, shopId, shopName }));
  };

  const clearCart = () => {
    setCart({
      shopId: null,
      shopName: '',
      items: [],
      carePreferences: ["Standard Detergent"],
      deliveryMode: "standard",
      pickupAddress: currentUser?.address || "Flat 302, Royal Residency, Alkapuri, Vadodara - 390007",
      pickupSlot: "Tomorrow, 9:00 AM - 11:00 AM",
      deliverySlot: "Tomorrow, 5:00 PM - 7:00 PM"
    });
  };

  // Place Order Dispatcher
  const placeOrder = (customerDetails = {}) => {
    const cartItems = cart?.items || [];
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const surgeFee = cart?.deliveryMode === 'emergency' ? 99.00 : cart?.deliveryMode === 'express' ? 49.00 : 0;
    const totalAmount = subtotal > 0 ? subtotal + 30.00 + 15.00 + surgeFee : 0;

    const targetShopId = customerDetails.selectedShopId || cart?.shopId || shops[0]?.id || "shop-1";
    const targetShop = shops.find((s) => s.id === targetShopId);

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerDetails.name || currentUser?.name || "Priya Patel",
      customerPhone: customerDetails.phone || currentUser?.phone || "+91 98765 43210",
      shopId: targetShopId,
      shopName: targetShop?.name || customerDetails.selectedShopName || cart?.shopName || "Sparkle & Spin Laundry Hub",
      status: "Order Placed", // Arrives in incoming requests queue!
      items: cartItems,
      deliveryMode: cart?.deliveryMode || "standard",
      totalAmount,
      pickupAddress: customerDetails.address || cart?.pickupAddress || userLocation,
      pickupSlot: customerDetails.pickupSlot || cart?.pickupSlot || "Tomorrow, 9:00 AM - 11:00 AM",
      deliverySlot: customerDetails.deliverySlot || (cart?.deliveryMode === 'emergency' ? 'Today (In 3 Hours Rush)' : cart?.deliverySlot || 'Tomorrow, 5:00 PM - 7:00 PM'),
      carePreferences: cart?.carePreferences || ["Standard Detergent"],
      createdAt: "Just Now",
      rejectionReason: null
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderTrackerId(newOrder.id);
    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  // Vendor Actions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const acceptOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? { ...ord, status: 'In Washing', acceptedAt: new Date().toLocaleTimeString() }
          : ord
      )
    );
  };

  const rejectOrder = (orderId, reason) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'Rejected',
              rejectionReason: reason || 'Shop Capacity Full for Selected Slot',
              rejectedAt: new Date().toLocaleTimeString()
            }
          : ord
      )
    );
  };

  const addShopService = (shopId, newService) => {
    setShops((prev) =>
      prev.map((s) => {
        if (s.id === shopId) {
          return {
            ...s,
            services: [...s.services, { ...newService, id: `s-${Date.now()}` }]
          };
        }
        return s;
      })
    );
  };

  // Admin Actions
  const approveVendor = (reqId) => {
    const req = pendingVendors.find((v) => v.id === reqId);
    if (!req) return;

    const newShop = {
      id: `shop-${Date.now()}`,
      name: req.shopName || req.name,
      ownerName: req.ownerName,
      rating: 5.0,
      reviewsCount: 1,
      distance: "1.2 km away",
      turnaround: "24 Hours",
      expressAvailable: true,
      emergencyAvailable: true,
      address: req.address,
      phone: req.phone,
      image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
      tags: ["Verified Vendor", "New Partner"],
      status: "Approved",
      minOrder: "₹150.00",
      commissionRate: "15%",
      warnings: [],
      services: [
        { id: `s1-${Date.now()}`, name: "Wash & Fold (per kg)", price: 60.00, unit: "kg", desc: "Washed & neatly folded" },
        { id: `s2-${Date.now()}`, name: "Steam Ironing", price: 25.00, unit: "piece", desc: "Crisp press finish" }
      ]
    };

    setShops((prev) => [newShop, ...prev]);
    setPendingVendors((prev) => prev.filter((v) => v.id !== reqId));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        authView,
        setAuthView,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginUser,
        registerVendorShop,
        logoutUser,
        currentRole,
        setCurrentRole,
        activeVendorId,
        setActiveVendorId,
        userDB,
        shops,
        orders,
        pendingVendors,
        cart,
        setCart,
        addToCart,
        updateCartQty,
        clearCart,
        placeOrder,
        updateOrderStatus,
        acceptOrder,
        rejectOrder,
        addShopService,
        approveVendor,
        selectedShopModal,
        setSelectedShopModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeOrderTrackerId,
        setActiveOrderTrackerId,
        userLocation,
        updateUserLocation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
