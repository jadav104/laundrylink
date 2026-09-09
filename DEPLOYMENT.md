# 🚀 LaundryHub Deployment Guide

This guide provides step-by-step instructions for deploying the **LaundryHub** full-stack marketplace (React Frontend + Java Spring Boot 3 Backend).

---

## 🏗️ Deployment Options Overview

| Component | Target Platform | Free Tier Available? | Build Configuration File |
| :--- | :--- | :--- | :--- |
| **Frontend (React/Vite)** | **Vercel** / **Netlify** | ✅ Yes | [vercel.json](file:///d:/lundry/vercel.json), [netlify.toml](file:///d:/lundry/netlify.toml) |
| **Backend (Spring Boot)** | **Render** / **Railway** | ✅ Yes | [backend/Dockerfile](file:///d:/lundry/backend/Dockerfile), `${PORT}` binding |
| **Full Stack Blueprint** | **Render** | ✅ Yes | [render.yaml](file:///d:/lundry/render.yaml) |

---

## ⚡ Quick Start Option 1: Vercel (Frontend) + Render (Backend)

### Step 1: Push Code to GitHub
1. Open terminal in the project root:
   ```bash
   git init
   git add .
   git commit -m "Prepare LaundryHub for production deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/laundryhub.git
   git push -u origin main
   ```

---

### Step 2: Deploy Spring Boot Backend to Render
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** ➔ **Web Service**.
2. Connect your GitHub repository (`laundryhub`).
3. Fill in the service configuration:
   - **Name**: `laundryhub-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Docker` (Render automatically uses `backend/Dockerfile`)
   - **Instance Type**: **Free**
4. Click **Create Web Service**.
5. Once deployment completes, copy your backend live URL (e.g. `https://laundryhub-backend.onrender.com`).

---

### Step 3: Deploy React Frontend to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/new) and import your `laundryhub` repository.
2. Configure settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**. Vercel will build and assign your domain (e.g. `https://laundryhub.vercel.app`).

---

## 🛠️ Quick Start Option 2: Render 1-Click Blueprint (`render.yaml`)

1. Go to [Render Blueprints](https://dashboard.render.com/blueprints).
2. Click **New Blueprint Instance**.
3. Select your GitHub repository. Render automatically reads [render.yaml](file:///d:/lundry/render.yaml) and provisions both the Spring Boot API backend and React static frontend together.
4. Click **Apply**.

---

## 🐳 Quick Start Option 3: Docker / Container Deployment

If deploying to Docker Desktop, AWS ECS, GCP Cloud Run, or Railway:

1. **Build Backend Container**:
   ```bash
   cd backend
   docker build -t laundryhub-backend .
   ```

2. **Run Backend Container**:
   ```bash
   docker run -p 8080:8080 -e PORT=8080 laundryhub-backend
   ```

3. Test backend endpoint: `http://localhost:8080/api/shops`

---

## 🔍 Verification & Post-Deployment Checklist

- [x] **CORS Configuration**: Dynamic headers allowed via `CorsConfig.java`.
- [x] **Port Binding**: `server.port=${PORT:8080}` bound in `application.yml`.
- [x] **Single Page App Rewrites**: Verified in `vercel.json` & `netlify.toml`.
- [x] **Embedded Database**: H2 in-memory DB runs automatically inside container.
