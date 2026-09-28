# Cyclone Intelligence Platform 🌪️🛰️

> **Operational-grade Tropical Cyclone Track, Intensity & Rapid Intensification (RI) Intelligence System for the North Indian Ocean Basin (Bay of Bengal & Arabian Sea).**

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 🧭 Overview

The **Cyclone Intelligence Platform** is an AI-assisted meteorological analysis and forecasting platform built specifically for the North Indian Ocean (NIO) basin. It bridges deep learning models (ConvLSTM spatio-temporal backbones, Deep Ensemble ResNet-50 intensity estimators, and Random Forest feature classifiers) with an operations-center UI designed for meteorological researchers and disaster mitigation specialists.

### 🌟 Core Workspaces

1. **Mission Control (`/`)**: Real-time basin situational awareness map showing active tropical systems, 48h ensemble forecast cones, observation metadata, temporal replay controls, and preprocessing mini-pipeline statuses.
2. **Satellite Analysis**: Multi-spectral imagery viewer with synced spatial grids across INSAT-3D/3DR Thermal IR ($10.8\,\mu\text{m}$), Visible Band ($0.65\,\mu\text{m}$), and SSMIS/GMI 89 GHz Microwave passive sensors with calibrated color scales (Dvorak/BD-curve).
3. **Cyclone Prediction**: Spatio-temporal AI trajectory forecasting ($+6\text{h}$ to $+48\text{h}$), intensity ensemble projections ($\pm 1\sigma$ uncertainty bounds), rapid intensification (RI) risk scoring, and SHAP explainability feature attribution.
4. **Historical Validation & Replay Mode**: Step-by-step playback comparing AI forecasts against IMD Best Track reference data for landmark cyclones (e.g., Super Cyclone *Amphan*, VSCS *Biparjoy*, ESCS *Fani*) with lead-time error growth curves (track error in km, intensity error in kt).
5. **Model Performance**: Quantitative benchmarking across operational baselines (IMD Official, ECMWF IFS, GFS, AI Ensemble) with seasonal error distributions and statistical skill scores ($R^2$, RMSE, MAE).
6. **Data Sources**: Live telemetry on satellite constellations, atmospheric reanalysis products (ERA5), ocean heat content (OISST/Argo), and IMD bulletins with latency and data provenance tracking.

---

## 🏛️ System Architecture & Visual Design Language

- **Operational Dark Palette**: Built on `#0B1120` canvas, `#111827` elevated surfaces, and `#263449` crisp structural borders.
- **Strict Data Distinction**:
  - 🟢 **Observed Track**: Solid Emerald (`#22C55E`)
  - 🔵 **AI Forecast Track**: Dashed Sky Blue (`#60A5FA`)
  - 🟣 **IMD Reference / Best Track**: Solid Lavender/Violet (`#A78BFA`)
  - 🟡 **Rapid Intensification (RI) Alert**: Amber (`#F59E0B`)
  - 🟠 **Demo Mode / Simulated Data**: Clearly labeled operational badges (`DEMO MODE • SIMULATED DATA`).
- **Typography**: Inter for interface elements and JetBrains Mono for coordinates ($^\circ\text{N}, ^\circ\text{E}$), pressure ($\text{hPa}$), wind speeds ($\text{kt}$), and UTC timestamps.

---

## 📂 Project Structure

```
cyclone/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Continuous integration workflow (build & lint)
├── docs/                          # Technical specs, PRD, and UI Design system
│   ├── design.md
│   ├── prd.md
│   ├── UI_Constraints.md
│   └── UI_Instructions.md
├── public/                        # Static assets and icons
├── src/
│   ├── app/                       # Next.js App Router root layout & global styles
│   │   ├── globals.css            # Design token CSS variables & Leaflet/Recharts overrides
│   │   ├── layout.tsx             # Root layout with metadata & fonts
│   │   └── page.tsx               # Main application entry point
│   ├── components/
│   │   ├── dashboard/             # Mission Control overview & Leaflet/SVG basin map
│   │   ├── layout/                # AppShell, TopHeader, Sidebar, SearchModal, AIDrawer
│   │   ├── prediction/            # AI Track, Intensity curves, SHAP explainability
│   │   ├── satellite/             # Multi-spectral sensor viewers (IR, VIS, MW, Fused)
│   │   ├── sources/               # Sensor & pipeline provenance panel
│   │   ├── temporal/              # Time-offset slider & evolution metrics
│   │   ├── ui/                    # Atomic primitives (StatusBadge, Provenance, Metric)
│   │   └── validation/            # Historical replay, error growth & benchmark matrix
│   ├── mock/                      # Calibrated North Indian Ocean cyclone mock datasets
│   ├── services/                  # Data service layers & query handlers
│   └── types/                     # TypeScript domain models (Cyclone, Sensor, Prediction)
├── package.json
├── tsconfig.json
├── next.config.ts
└── vercel.json                    # Vercel deployment configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `18.18.0` or later (Node 20+ recommended)
- **npm** or **pnpm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/cyclone-intelligence-platform.git
   cd cyclone-intelligence-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🧪 Production Build & Linting

```bash
# Lint source files
npm run lint

# Build optimized production bundle
npm run build

# Start production server
npm start
```

---

## ☁️ Deployment on Vercel

This repository is pre-configured for zero-friction continuous deployment on [Vercel](https://vercel.com/):

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. Push your repository to **GitHub**.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `cyclone-intelligence-platform` repository.
4. Framework preset will automatically be detected as **Next.js**.
5. Click **Deploy**.

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Authenticate & deploy
vercel
```

---

## ⚖️ Scientific & Operational Disclaimer

> **IMPORTANT NOTICE**: This platform is an advanced experimental research and decision-support prototype. It does not replace official warnings, bulletins, or landfall forecasts issued by the **India Meteorological Department (IMD)**, the **Joint Typhoon Warning Center (JTWC)**, or the **World Meteorological Organization (WMO)**. For active weather emergencies, always refer directly to official governmental disaster management authorities.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
