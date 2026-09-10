# 🧺 LaundryHub - Local Laundry & Dry Cleaning Marketplace

LaundryHub is a modern, full-stack local laundry service marketplace connecting customers with nearby laundry shops, dry cleaners, and shoe care providers in Vadodara.

---

## 🔗 Live Production Links

- **🌐 Live Web Application (Vercel)**: [https://laundrylink-beryl.vercel.app/](https://laundrylink-beryl.vercel.app/)
- **⚙️ Live Backend REST API (Render)**: [https://laundryhub-backend-t9z2.onrender.com/api](https://laundryhub-backend-t9z2.onrender.com/api)
- **📋 Live Shops & Services Catalog**: [https://laundryhub-backend-t9z2.onrender.com/api/shops](https://laundryhub-backend-t9z2.onrender.com/api/shops)
- **🗄️ Live H2 Database Console**: [https://laundryhub-backend-t9z2.onrender.com/h2-console](https://laundryhub-backend-t9z2.onrender.com/h2-console) *(JDBC URL: `jdbc:h2:mem:laundryhubdb`, Username: `sa`)*
- **📁 GitHub Source Code Repository**: [https://github.com/jadav104/laundrylink](https://github.com/jadav104/laundrylink)

---

## 🌟 Key Features

### 🛍️ Customer View
- **Vadodara Locality Selection**: Choose delivery location across 17+ Vadodara localities with GPS auto-detection.
- **Selectable Service Catalog**: Direct itemized booking for Wash & Fold, Steam Ironing, Silk Saree Dry Clean, and Shoe Scrubbing.
- **Emergency & Express Speed Modes**: Support for 3-Hour Super Rush and 24-Hour Express options with live subtotal calculation.
- **Live Order Tracker**: Real-time progress updates (`Order Placed` ➔ `In Washing` ➔ `Ready` ➔ `Completed`).
- **My Placed Requests**: Customer account orders history modal.

### 🏪 Provider / Vendor Portal
- **Single-Shop Isolation**: Logged-in vendors access only their registered shop dashboard.
- **Incoming Request Alerts Queue**: Real-time notification banner with 1-click **Accept & Start Job** or **Decline Request** with custom rejection reasons.
- **Store Rates & Service Catalog Editor**: Manage store rates per kg or piece.
- **Operational Metrics**: Revenue tracking, active washing job count, and acceptance rate stats.

### 🛡️ Admin Panel
- **Platform Onboarding Queue**: Moderate provider license documents and tax IDs.
- **Customer Complaints & Warning Center**: Review customer feedback, issue official warning notes, or delist non-compliant shops.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System & Modern Aesthetics), React, Lucide Icons.
- **Backend**: Java 17 + Spring Boot 3.2 + Spring Data JPA
- **Database**: Embedded H2 Database with Web Console (`/h2-console`)
- **Server**: PowerShell Local Server (`server.ps1`) / Vite Dev Server

---

## 📁 Repository Structure

```
├── backend/                  # Java Spring Boot 3 REST API Backend
│   ├── pom.xml               # Maven configuration
│   └── src/main/java/com/laundryhub/
│       ├── LaundryHubApplication.java
│       ├── config/           # CorsConfig & DataSeeder
│       ├── controller/       # AuthController, ShopController, OrderController, ComplaintController
│       ├── dto/              # Request & Response DTOs
│       ├── model/            # User, Shop, Order, Service, Complaint JPA Entities
│       ├── repository/       # JPA Interfaces
│       └── service/          # Business logic services
├── src/                      # Vite React Application Components & State
├── standalone.html           # Self-contained HTML Single Page Application
├── server.ps1                # PowerShell Web Server for Port 8080
├── package.json
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Launch Web Application (Frontend)
Run the local PowerShell server:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
Open in browser: **`http://localhost:8080/`**

### 2. Launch Java Backend REST API
Navigate to the `backend` directory and compile with Maven:
```bash
cd backend
mvn spring-boot:run
```
- **REST API Endpoint**: `http://localhost:8080/api`
- **H2 Database Console**: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:laundryhubdb`, User: `sa`)
