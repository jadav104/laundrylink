export const initialUserDB = [
  { id: 'usr-1', role: 'customer', name: 'Priya Patel', email: 'priya@example.in', phone: '+91 98765 43210', address: 'Flat 302, Royal Residency, Alkapuri, Vadodara - 390007', password: '123' },
  { id: 'usr-2', role: 'vendor', name: 'Vikram Patel', email: 'vikram@bandboxvadodara.in', phone: '+91 265 233 4567', address: 'Opposite Alkapuri Club, RC Dutt Road, Alkapuri, Vadodara - 390007', shopId: 'shop-1', password: '123' },
  { id: 'usr-3', role: 'admin', name: 'Platform Admin', email: 'admin@laundryhub.in', phone: '+91 98000 11111', password: '123' }
];

export const initialShops = [
  {
    id: "shop-1",
    name: "Bandbox Dry Cleaners & Laundry",
    ownerName: "Rajesh Patel",
    rating: 4.9,
    reviewsCount: 142,
    distance: "0.8 km away",
    turnaround: "24-48 Hours",
    expressAvailable: true,
    emergencyAvailable: true,
    address: "Opposite Alkapuri Club, RC Dutt Road, Alkapuri, Vadodara - 390007",
    phone: "+91 265 233 4567",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80",
    tags: ["Eco-Friendly", "Express 24h", "Dry Cleaning", "Free Pickup"],
    status: "Approved",
    minOrder: "₹150.00",
    commissionRate: "15%",
    services: [
      { id: "s1", name: "Wash & Fold (per kg)", price: 60.00, unit: "kg", category: "Wash & Fold", desc: "Washed, dried & neatly folded daily wear" },
      { id: "s2", name: "Wash & Steam Press (per piece)", price: 25.00, unit: "piece", category: "Ironing", desc: "Crisp steam pressed shirts & trousers" },
      { id: "s3", name: "Heavy Saree & Suit Dry Clean", price: 250.00, unit: "set", category: "Dry Cleaning", desc: "Professional eco-solvent dry cleaning for festive wear" },
      { id: "s4", name: "Sneaker & Shoe Deep Wash", price: 299.00, unit: "pair", category: "Shoe Care", desc: "Deep foam cleansing, deodorizing & sole restoration" },
      { id: "s5", name: "Doorstep Home Steam Pressing (10 Shirts)", price: 199.00, unit: "bundle", category: "Home Ironing", desc: "Professional steam presser visits your location for 10 garments" }
    ]
  },
  {
    id: "shop-2",
    name: "U-Clean Laundry & Dry Cleaning",
    ownerName: "Anita Shah",
    rating: 4.8,
    reviewsCount: 98,
    distance: "1.4 km away",
    turnaround: "24 Hours",
    expressAvailable: true,
    emergencyAvailable: false,
    address: "Opposite Akota Garden, Productivity Road, Akota, Vadodara - 390020",
    phone: "+91 97250 88990",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
    tags: ["Organic Detergents", "Same Day Service", "Steam Press"],
    status: "Approved",
    minOrder: "₹120.00",
    commissionRate: "15%",
    services: [
      { id: "s1", name: "Wash & Fold (per kg)", price: 55.00, unit: "kg", category: "Wash & Fold", desc: "100% Organic plant-based detergent" },
      { id: "s2", name: "Shirt & Kurta Steam Press", price: 20.00, unit: "piece", category: "Ironing", desc: "Wrinkle-free precision finish" },
      { id: "s3", name: "Delicate Silk Saree & Chaniya Choli Wash", price: 220.00, unit: "piece", category: "Dry Cleaning", desc: "Gentle hand-wash cycle & flat dry" },
      { id: "s4", name: "Leather & Polish Shoe Care", price: 199.00, unit: "pair", category: "Shoe Care", desc: "Nourishing leather oil treatment & high-gloss buff" }
    ]
  },
  {
    id: "shop-3",
    name: "Snowhite Dry Cleaners & Steam Studio",
    ownerName: "Karan Amin",
    rating: 4.9,
    reviewsCount: 176,
    distance: "0.5 km away",
    turnaround: "3 Hours Super Rush",
    expressAvailable: true,
    emergencyAvailable: true,
    address: "Near Seven Seas Mall, Fatehgunj Main Road, Vadodara - 390002",
    phone: "+91 265 278 4432",
    image: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=800&q=80",
    tags: ["3h Emergency Rush", "Shoe Specialist", "Home Ironing"],
    status: "Approved",
    minOrder: "₹100.00",
    commissionRate: "15%",
    services: [
      { id: "s1", name: "Kurta & Shirt Express Steam Press", price: 30.00, unit: "piece", category: "Home Ironing", desc: "Fast wrinkle-free steam press delivered to your home" },
      { id: "s2", name: "Sneaker & Suede Stain Cleaning", price: 249.00, unit: "pair", category: "Shoe Care", desc: "Delicate water repellent spray & nap brushing" },
      { id: "s3", name: "Curtains & Bed Linen Heavy Press", price: 99.00, unit: "piece", category: "Home Ironing", desc: "High-temp sanitizing steam press for heavy drapery & linen" },
      { id: "s4", name: "Emergency 3-Hour Wash & Fold", price: 90.00, unit: "kg", category: "Wash & Fold", desc: "Priority fast-track wash, dry & fold within 3 hours" }
    ]
  },
  {
    id: "shop-4",
    name: "Fabricspa Laundry & Dry Cleaners",
    ownerName: "Jignesh Shah",
    rating: 4.8,
    reviewsCount: 114,
    distance: "1.1 km away",
    turnaround: "24 Hours",
    expressAvailable: true,
    emergencyAvailable: true,
    address: "Near Eva Mall, GIDC Main Road, Manjalpur, Vadodara - 390011",
    phone: "+91 98981 77665",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80",
    tags: ["Manjalpur Hub", "Express 24h", "Festive Dry Clean"],
    status: "Approved",
    minOrder: "₹120.00",
    commissionRate: "15%",
    services: [
      { id: "s1", name: "Wash & Fold (per kg)", price: 58.00, unit: "kg", category: "Wash & Fold", desc: "Hygienic wash & scented dry fold" },
      { id: "s2", name: "Heavy Kurta & Sherwani Dry Clean", price: 280.00, unit: "set", category: "Dry Cleaning", desc: "Solvent dry cleaning for wedding wear" }
    ]
  },
  {
    id: "shop-5",
    name: "Spin 'N' Shine Premium Laundromat",
    ownerName: "Sunita Parikh",
    rating: 4.7,
    reviewsCount: 89,
    distance: "0.9 km away",
    turnaround: "12-24 Hours",
    expressAvailable: true,
    emergencyAvailable: false,
    address: "VIP Road, Near Bright Day School, Karelibaug, Vadodara - 390018",
    phone: "+91 98241 66778",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
    tags: ["Karelibaug Hub", "Steam Press", "Doorstep Pickup"],
    status: "Approved",
    minOrder: "₹150.00",
    commissionRate: "15%",
    services: [
      { id: "s1", name: "Steam Ironing (10 Shirts)", price: 180.00, unit: "bundle", category: "Ironing", desc: "Crisp steam pressed daily wear" },
      { id: "s2", name: "Blanket & Quilt Deep Wash", price: 350.00, unit: "piece", category: "Dry Cleaning", desc: "Antimicrobial duvet sanitization" }
    ]
  },
  {
    id: "shop-6",
    name: "Cleanomat Eco Laundromat",
    ownerName: "Vikram Joshi",
    rating: 4.9,
    reviewsCount: 156,
    distance: "0.7 km away",
    turnaround: "24 Hours",
    expressAvailable: true,
    emergencyAvailable: true,
    address: "Gotri Main Road, Near Sevasi Canal, Gotri, Vadodara - 390021",
    phone: "+91 97241 55667",
    image: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=800&q=80",
    tags: ["Gotri & Sevasi Hub", "Sneaker Care", "3h Emergency"],
    status: "Approved",
    minOrder: "₹130.00",
    commissionRate: "15%",
    services: [
      { id: "s1", name: "Eco Wash & Fold (per kg)", price: 65.00, unit: "kg", category: "Wash & Fold", desc: "Soft eco-detergent wash" },
      { id: "s2", name: "Premium Sneaker Deep Cleansing", price: 299.00, unit: "pair", category: "Shoe Care", desc: "Sole scrubbing & deodorizing" }
    ]
  },
  {
    id: "shop-7",
    name: "Baroda Central Dhobi Ghat & Shoe Care",
    ownerName: "Mahesh Solanki",
    rating: 4.8,
    reviewsCount: 132,
    distance: "0.4 km away",
    turnaround: "12 Hours",
    expressAvailable: true,
    emergencyAvailable: true,
    address: "Railway Station Road, Sayajigunj, Vadodara - 390005",
    phone: "+91 98791 44332",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80",
    tags: ["Sayajigunj Hub", "Express 12h", "Station Express"],
    status: "Approved",
    minOrder: "₹100.00",
    commissionRate: "15%",
    services: [
      { id: "s1", name: "Fast Wash & Iron (per piece)", price: 22.00, unit: "piece", category: "Ironing", desc: "Quick turn-around express ironing" },
      { id: "s2", name: "Suit & Blazer Dry Cleaning", price: 290.00, unit: "set", category: "Dry Cleaning", desc: "Formals & coat deep solvent clean" }
    ]
  },
  {
    id: "shop-8",
    name: "Royal Steam Press & Dry Clean Hub",
    ownerName: "Hardik Pandya",
    rating: 4.9,
    reviewsCount: 165,
    distance: "0.5 km away",
    turnaround: "24 Hours",
    expressAvailable: true,
    emergencyAvailable: true,
    address: "Opposite Inox Cinema, Old Padra Road, Vadodara - 390007",
    phone: "+91 98253 99887",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
    tags: ["OP Road Hub", "Steam Press", "Shoe Polish"],
    status: "Approved",
    minOrder: "₹140.00",
    commissionRate: "15%",
    services: [
      { id: "s1", name: "Premium Steam Pressing", price: 25.00, unit: "piece", category: "Ironing", desc: "Crisp wrinkle-free steam finish" },
      { id: "s2", name: "Chaniya Choli & Dupatta Dry Clean", price: 320.00, unit: "set", category: "Dry Cleaning", desc: "Navratri & festive garment restoration" }
    ]
  },
  {
    id: "shop-9",
    name: "Parul Express Student Laundry",
    ownerName: "Bhavin Vora",
    rating: 4.7,
    reviewsCount: 94,
    distance: "0.6 km away",
    turnaround: "24 Hours",
    expressAvailable: true,
    emergencyAvailable: false,
    address: "Near L&T Knowledge City, Waghodia Road, Vadodara - 390019",
    phone: "+91 97230 66554",
    image: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=800&q=80",
    tags: ["Waghodia & Parul Hub", "Student Discounts", "Wash & Fold"],
    status: "Approved",
    minOrder: "₹110.00",
    commissionRate: "15%",
    services: [
      { id: "s1", name: "Bulk Student Wash & Fold (per kg)", price: 50.00, unit: "kg", category: "Wash & Fold", desc: "Budget friendly wash & dry for hostelers" },
      { id: "s2", name: "Jeans & Jacket Wash", price: 40.00, unit: "piece", category: "Wash & Fold", desc: "Heavy denim deep wash" }
    ]
  },
  {
    id: "shop-10",
    name: "Ellora Cleaners & Garment Care",
    ownerName: "Nitin Mehta",
    rating: 4.9,
    reviewsCount: 188,
    distance: "0.3 km away",
    turnaround: "24 Hours",
    expressAvailable: true,
    emergencyAvailable: true,
    address: "High Tank Road, Ellora Park, Subhanpura, Vadodara - 390023",
    phone: "+91 98240 77889",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80",
    tags: ["Subhanpura Hub", "Ellora Park", "Dry Cleaning"],
    status: "Approved",
    minOrder: "₹150.00",
    commissionRate: "15%",
    services: [
      { id: "s1", name: "Curtain & Sofa Cover Wash", price: 120.00, unit: "piece", category: "Dry Cleaning", desc: "Heavy upholstery dry wash" },
      { id: "s2", name: "Kurta Steam Ironing", price: 25.00, unit: "piece", category: "Ironing", desc: "Gentle steam press" }
    ]
  },
  {
    id: "shop-11",
    name: "Bhayli Express Steam Press & Dry Clean",
    ownerName: "Alpesh Patel",
    rating: 4.8,
    reviewsCount: 102,
    distance: "0.4 km away",
    turnaround: "24 Hours",
    expressAvailable: true,
    emergencyAvailable: true,
    address: "Vasna-Bhayli Main Road, Near Bright CBSE School, Bhayli, Vadodara - 391410",
    phone: "+91 98985 11223",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
    tags: ["Bhayli Hub", "Bright School Road", "Doorstep Pickup"],
    status: "Approved",
    minOrder: "₹130.00",
    commissionRate: "15%",
    services: [
      { id: "s1", name: "Daily Wear Wash & Fold", price: 58.00, unit: "kg", category: "Wash & Fold", desc: "Clean & folded daily clothes" },
      { id: "s2", name: "Sneaker Cleansing", price: 249.00, unit: "pair", category: "Shoe Care", desc: "Shoe foam scrubbing & drying" }
    ]
  },
  {
    id: "shop-12",
    name: "TumbleDry Laundry & Dry Clean Solution",
    ownerName: "Dharmesh Shah",
    rating: 4.8,
    reviewsCount: 121,
    distance: "0.4 km away",
    turnaround: "24 Hours",
    expressAvailable: true,
    emergencyAvailable: true,
    address: "Abhilasha Square, Sama Savli Road, Vadodara - 390008",
    phone: "+91 265 235 9988",
    image: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=800&q=80",
    tags: ["Sama & Chhani Hub", "TumbleDry Franchise", "Festive Wash"],
    status: "Approved",
    minOrder: "₹125.00",
    commissionRate: "15%",
    services: [
      { id: "s1", name: "Sama Special Wash & Fold", price: 60.00, unit: "kg", category: "Wash & Fold", desc: "Fresh scented wash" },
      { id: "s2", name: "Sherwani & Heavy Suit Dry Clean", price: 350.00, unit: "set", category: "Dry Cleaning", desc: "Wedding garment dry clean" }
    ]
  }
];

export const initialOrders = [
  {
    id: "ORD-9821",
    isDemo: true,
    customerName: "Sneha Kapadia",
    customerPhone: "+91 98251 44556",
    shopId: "shop-1",
    shopName: "Bandbox Dry Cleaners & Laundry",
    status: "Order Placed", // New Incoming Request waiting for Accept/Reject
    items: [
      { id: "s1", name: "Wash & Fold", qty: 5, unit: "kg", price: 60.00 },
      { id: "s3", name: "Heavy Saree & Suit Dry Clean", qty: 2, unit: "set", price: 250.00 },
      { id: "s4", name: "Sneaker & Shoe Deep Wash", qty: 1, unit: "pair", price: 299.00 }
    ],
    totalAmount: 1189.00,
    deliveryMode: "emergency", // Emergency 3h Rush
    pickupAddress: "Villa 14, Grand Monarch Bungalows, OP Road, Vadodara - 390007",
    pickupSlot: "Today (Immediate Express Pickup)",
    deliverySlot: "Today (In 3 Hours Rush)",
    carePreferences: ["Hypoallergenic Detergent", "Extra Softener", "Gentle Care"],
    createdAt: "Just Now (2 mins ago)",
    rejectionReason: null
  },
  {
    id: "ORD-9754",
    isDemo: true,
    customerName: "Rahul Verma",
    customerPhone: "+91 97129 88776",
    shopId: "shop-1",
    shopName: "Bandbox Dry Cleaners & Laundry",
    status: "Order Placed", // New Incoming Request
    items: [
      { id: "s2", name: "Wash & Steam Press", qty: 10, unit: "piece", price: 25.00 },
      { id: "s5", name: "Doorstep Home Steam Pressing", qty: 1, unit: "bundle", price: 199.00 }
    ],
    totalAmount: 494.00,
    deliveryMode: "express",
    pickupAddress: "Flat 501, Platinum Tower, RC Dutt Road, Alkapuri, Vadodara - 390007",
    pickupSlot: "Today, 2:00 PM - 4:00 PM",
    deliverySlot: "Tomorrow, 10:00 AM - 12:00 PM",
    carePreferences: ["Extra Starch"],
    createdAt: "15 mins ago",
    rejectionReason: null
  },
  {
    id: "ORD-9482",
    isDemo: true,
    customerName: "Priya Patel",
    customerPhone: "+91 98765 43210",
    shopId: "shop-1",
    shopName: "Bandbox Dry Cleaners & Laundry",
    status: "In Washing",
    items: [
      { id: "s1", name: "Wash & Fold", qty: 4, unit: "kg", price: 60.00 },
      { id: "s3", name: "Heavy Saree & Suit Dry Clean", qty: 1, unit: "set", price: 250.00 }
    ],
    totalAmount: 535.00,
    deliveryMode: "standard",
    pickupAddress: "Flat 302, Royal Residency, Alkapuri, Vadodara - 390007",
    pickupSlot: "Today, 4:00 PM - 6:00 PM",
    deliverySlot: "Tomorrow, 5:00 PM - 7:00 PM",
    carePreferences: ["Hypoallergenic Detergent", "Extra Starch"],
    createdAt: "2 hours ago",
    rejectionReason: null
  },
  {
    id: "ORD-9310",
    isDemo: true,
    customerName: "Amit Shah",
    customerPhone: "+91 98980 12345",
    shopId: "shop-1",
    shopName: "Bandbox Dry Cleaners & Laundry",
    status: "Ready",
    items: [
      { id: "s4", name: "Sneaker & Shoe Deep Wash", qty: 2, unit: "pair", price: 299.00 }
    ],
    totalAmount: 643.00,
    deliveryMode: "standard",
    pickupAddress: "B-12, Sun Pharma Road, Akota, Vadodara - 390020",
    pickupSlot: "Yesterday, 10:00 AM",
    deliverySlot: "Today, 6:00 PM",
    carePreferences: ["Standard Detergent"],
    createdAt: "Yesterday",
    rejectionReason: null
  },
  {
    id: "ORD-9102",
    isDemo: true,
    customerName: "Neha Joshi",
    customerPhone: "+91 94260 55443",
    shopId: "shop-1",
    shopName: "Bandbox Dry Cleaners & Laundry",
    status: "Completed",
    items: [
      { id: "s1", name: "Wash & Fold", qty: 3, unit: "kg", price: 60.00 },
      { id: "s2", name: "Wash & Steam Press", qty: 5, unit: "piece", price: 25.00 }
    ],
    totalAmount: 350.00,
    deliveryMode: "standard",
    pickupAddress: "14, Sampatrao Colony, Alkapuri, Vadodara - 390007",
    pickupSlot: "Aug 10, 9:00 AM",
    deliverySlot: "Aug 11, 4:00 PM",
    carePreferences: ["Organic Detergent"],
    createdAt: "3 days ago",
    rejectionReason: null
  },
  {
    id: "ORD-8940",
    isDemo: true,
    customerName: "Karan Parikh",
    customerPhone: "+91 98240 11223",
    shopId: "shop-1",
    shopName: "Bandbox Dry Cleaners & Laundry",
    status: "Rejected",
    items: [
      { id: "s3", name: "Heavy Saree & Suit Dry Clean", qty: 8, unit: "set", price: 250.00 }
    ],
    totalAmount: 2045.00,
    deliveryMode: "emergency",
    pickupAddress: "Flat 102, Shrimad Hall Road, Jetalpur, Vadodara - 390007",
    pickupSlot: "Aug 09, 8:00 PM",
    deliverySlot: "Aug 09, 11:00 PM",
    carePreferences: ["Gentle Solvent Clean"],
    createdAt: "4 days ago",
    rejectionReason: "High Order Volume - Express 3h slots full for today"
  }
];

export const initialPendingVendors = [];

export const serviceCategories = [
  "All Services",
  "Wash & Fold",
  "Ironing",
  "Home Ironing",
  "Shoe Care",
  "Dry Cleaning"
];

export const deliveryModes = [
  { id: "standard", label: "Standard Delivery (24-48h)", extra: 0, badge: "Standard" },
  { id: "express", label: "⚡ Express Delivery (12-24h)", extra: 49.00, badge: "+₹49 Express" },
  { id: "emergency", label: "🚨 Emergency Super Express (3h Rush)", extra: 99.00, badge: "+₹99 Rush" }
];

export const vadodaraLocations = [
  { area: "Alkapuri", pincode: "390007", landmark: "RC Dutt Road / Productivity Road", nearestShop: "Sparkle & Spin Laundry Hub" },
  { area: "Akota", pincode: "390020", landmark: "Productivity Road / Akota Stadium", nearestShop: "FreshPress Eco Cleaners" },
  { area: "Fatehgunj", pincode: "390002", landmark: "MS University / Seven Seas Mall", nearestShop: "Express Iron & Dhobi Studio" },
  { area: "Manjalpur", pincode: "390011", landmark: "GIDC Road / Eva Mall", nearestShop: "Shreeji Express Dry Cleaners" },
  { area: "Karelibaug", pincode: "390018", landmark: "VIP Road / Water Tank", nearestShop: "UrbanBubbles Premium Laundry" },
  { area: "Gotri", pincode: "390021", landmark: "Gotri Road / Sevasi Canal", nearestShop: "CleanWave Eco Laundromat" },
  { area: "Sayajigunj", pincode: "390005", landmark: "Vadodara Railway Station", nearestShop: "Express Iron & Dhobi Studio" },
  { area: "Old Padra Road", pincode: "390007", landmark: "Inox Cinema / Malhar Point", nearestShop: "Sparkle & Spin Laundry Hub" },
  { area: "Waghodia Road", pincode: "390019", landmark: "L&T Circle / Parul Road", nearestShop: "Shreeji Express Dry Cleaners" },
  { area: "Subhanpura", pincode: "390023", landmark: "Ellora Park / High Tank", nearestShop: "FreshPress Eco Cleaners" },
  { area: "Vasna Road", pincode: "390015", landmark: "Vasna D-Mart / Bhayli Road", nearestShop: "CleanWave Eco Laundromat" },
  { area: "Gorwa", pincode: "390016", landmark: "BIDC Estate / Refinery Road", nearestShop: "Express Iron & Dhobi Studio" },
  { area: "Makarpura", pincode: "390014", landmark: "GIDC Estate / Airforce Station", nearestShop: "Shreeji Express Dry Cleaners" },
  { area: "Tarsali", pincode: "390009", landmark: "NH 48 / Tarsali Ring Road", nearestShop: "Shreeji Express Dry Cleaners" },
  { area: "Chhani", pincode: "390024", landmark: "Chhani Jakat Naka / TP 13", nearestShop: "Express Iron & Dhobi Studio" },
  { area: "Sama", pincode: "390008", landmark: "Sama Savli Road / Abhilasha Square", nearestShop: "UrbanBubbles Premium Laundry" },
  { area: "Nizampura", pincode: "390002", landmark: "Nizampura Main Road", nearestShop: "Express Iron & Dhobi Studio" },
  { area: "Bhayli", pincode: "391410", landmark: "Vasna-Bhayli Main Road / Canal", nearestShop: "Vasna & Bhayli Eco Wash Studio" }
];

export const carePreferencesOptions = [
  "Standard Detergent",
  "Organic Detergent",
  "Hypoallergenic Detergent",
  "Extra Fabric Softener",
  "Extra Starch (Crisp)",
  "Gentle Solvent Clean",
  "Separate Color Wash"
];


