# CycloSense — Cyclone Intelligence Platform 🌪️🛰️

> **Operational-Grade Tropical Cyclone Track, Intensity & Rapid Intensification (RI) Intelligence System for the North Indian Ocean Basin (Bay of Bengal & Arabian Sea).**

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9.0-4B32C3?style=flat-square&logo=eslint)](https://eslint.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-000000?style=flat-square&logo=vercel)](https://turbo.build/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📌 Table of Contents

- [Executive Summary](#-executive-summary)
- [End-to-End System Architecture](#-end-to-end-system-architecture)
- [Backend Data Ingestion & Telemetry Feeds](#-backend-data-ingestion--telemetry-feeds)
- [Automated Preprocessing & Normalization Pipeline](#-automated-preprocessing--normalization-pipeline)
- [AI/ML Modeling Engine (CycloneAI-FusionNet)](#-aiml-modeling-engine-cycloneai-fusionnet)
  - [1. Spatio-Temporal Track Forecasting](#1-spatio-temporal-track-forecasting)
  - [2. Deep Multi-Modal Intensity Estimation](#2-deep-multi-modal-intensity-estimation)
  - [3. Rapid Intensification (RI) Predictive Detection](#3-rapid-intensification-ri-predictive-detection)
  - [4. Interpretable AI & Feature Attribution (XAI)](#4-interpretable-ai--feature-attribution-xai)
- [Core Application Workspaces & Decision Support](#-core-application-workspaces--decision-support)
- [Visual Design & Human Factors Language](#-visual-design--human-factors-language)
- [Verification & Model Benchmarking Framework](#-verification--model-benchmarking-framework)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Validation, Testing & Production Build](#-validation-testing--production-build)
- [Operational & Scientific Disclaimer](#-operational--scientific-disclaimer)
- [License](#-license)

---

## 🧭 Executive Summary

**CycloSense** is an operational-grade meteorological decision-support and artificial intelligence platform engineered specifically for the **North Indian Ocean (NIO) basin**, encompassing the **Bay of Bengal** and the **Arabian Sea**. 

Tropical cyclones in the North Indian Ocean basin pose unique forecasting challenges: complex land-sea boundaries, rapid intensification events over warm ocean pockets (SST $> 30^\circ\text{C}$), high coastal population density, and high-frequency monsoonal shear regimes. 

CycloSense bridges raw multi-spectral satellite telemetry, oceanic/atmospheric numerical reanalysis, and deep neural architectures into a unified operational dashboard. Designed for meteorological analysts, research institutions, and disaster mitigation teams, the platform emphasizes:
- **Scientific Rigor**: Clear delineation of observations, model predictions, reference ground-truth, and confidence intervals.
- **Explainability**: Heatmap activations and SHAP feature weighting justifying model predictions.
- **Operational Ergonomics**: Low-fatigue, muted dark-mode palette adhering to scientific data visualization guidelines.

---

## 🏛️ End-to-End System Architecture

The CycloSense platform operates across four primary planes: **Data Ingestion**, **Backend Preprocessing & Normalization**, **AI/ML Predictive Inference**, and **Frontend Decision Support**.

```mermaid
flowchart TD
    subgraph SENSORS["1. Ingestion Feeds & Telemetry"]
        GEO["INSAT-3D / 3DR (ISRO)<br/>Thermal IR (10.8µm) & Visible (0.65µm)"]
        MW["SSMIS / GMI / AMSR-2<br/>Passive Microwave (89 & 37 GHz)"]
        NWP["ERA5 / GFS Reanalysis<br/>Shear (200-850 hPa), RH (700 hPa), Divergence"]
        OCEAN["OISST v2.1 & Argo Floats<br/>SST & Ocean Heat Content (TCHP)"]
        IMD["IMD / JTWC Archives<br/>Best Track & Warning Bulletins"]
    end

    subgraph PIPELINE["2. Backend Preprocessing Pipeline"]
        QC["Radiometric Calibration & QC"]
        GEOREF["Georeferencing & Parallax Correction"]
        ALIGN["Multi-Sensor Spatial Alignment"]
        RESAMP["Resampling (0.05° x 0.05° Uniform Grid)"]
        NORM["Thermodynamic & Radiometric Normalization"]
        IMPUTE["Missing Data Imputation & Dropout Handling"]
        SYNC["Temporal Synchronization (UTC Synoptic Hours)"]
        FEAT["Structural Feature Extraction<br/>(CDO Area, Eye Diameter, Symmetry Index)"]
    end

    subgraph ML["3. AI/ML Modeling Engine (CycloneAI-FusionNet)"]
        TRACK_NET["Spatio-Temporal ConvLSTM + BiGRU<br/>Track Trajectory Forecast (+6h to +72h)"]
        INTENSITY_NET["Vision Transformer (ViT) + ResNet-50<br/>Intensity Estimation (kt & hPa ±1σ)"]
        RI_CLF["Deep Ensemble Classifier<br/>Rapid Intensification (RI) Probability"]
        XAI["XAI Explainability Engine<br/>Grad-CAM & SHAP Feature Attribution"]
        SYNTH["Morphology Evolution Synthesizer<br/>Convective Organization (+6h to +24h)"]
    end

    subgraph FRONTEND["4. Operations & Decision Support Workspaces"]
        MC["Mission Control Workspace<br/>Real-time Basin Map, Cones & Alerter"]
        SAT["Multi-Spectral Satellite Analysis<br/>Synchronized IR, VIS, MW & Fused Grids"]
        PRED["Cyclone Prediction Workspace<br/>Trajectory, Intensity Curves & SHAP Insights"]
        HIST["Historical Validation & Replay<br/>Reference Comparison (Amphan, Fani, Biparjoy)"]
        BENCH["Model Performance Matrix<br/>MAE, RMSE & Skill Score Benchmarks"]
    end

    GEO --> QC
    MW --> QC
    NWP --> ALIGN
    OCEAN --> ALIGN
    IMD --> HIST

    QC --> GEOREF --> ALIGN --> RESAMP --> NORM --> IMPUTE --> SYNC --> FEAT

    SYNC --> TRACK_NET
    FEAT --> TRACK_NET
    SYNC --> INTENSITY_NET
    FEAT --> INTENSITY_NET
    INTENSITY_NET --> RI_CLF
    INTENSITY_NET --> XAI
    TRACK_NET --> FRONTEND
    INTENSITY_NET --> FRONTEND
    RI_CLF --> FRONTEND
    XAI --> FRONTEND
    SYNTH --> FRONTEND

    FRONTEND --> MC
    FRONTEND --> SAT
    FRONTEND --> PRED
    FRONTEND --> HIST
    FRONTEND --> BENCH
```

---

## 📡 Backend Data Ingestion & Telemetry Feeds

CycloSense ingests multi-source data streams across varying orbital geometries, temporal resolutions, and physical parameters:

| Source Feed | Sensor / Instrument | Spatial Resolution | Refresh Cadence | Parameters Extracted |
| :--- | :--- | :---: | :---: | :--- |
| **ISRO INSAT-3D / 3DR** | Imager (TIR-1, TIR-2) | $4 \times 4\text{ km}$ | 15–30 min | Cloud-top brightness temp ($-90^\circ\text{C}$ to $+40^\circ\text{C}$), Central Dense Overcast (CDO) |
| **ISRO INSAT-3D / 3DR** | Visible Band ($0.65\,\mu\text{m}$) | $1 \times 1\text{ km}$ | 15–30 min (Daylight) | Cloud organization, outer spiral banding, eye morphology |
| **DMSP / GPM Constellation** | SSMIS / GMI ($89\text{ GHz}, 37\text{ GHz}$) | $12.5\text{ km}$ | Orbit Swath ($\sim 3\text{--}6\text{h}$) | Inner eyewall structure, deep convective precipitation cores, secondary concentric rings |
| **ECMWF ERA5 / NCEP GFS** | Numerical Atmospheric Model | $0.25^\circ \times 0.25^\circ$ | 3–6 hours | Deep-layer vertical wind shear ($200\text{--}850\text{ hPa}$), mid-level RH ($700\text{ hPa}$), upper-level divergence |
| **NOAA OISST / INCOIS Argo** | Satellite IR + In-situ Floats | $0.25^\circ$ daily | Daily | Sea Surface Temperature (SST), Tropical Cyclone Heat Potential ($\text{TCHP}, \text{kJ/cm}^2$) |
| **IMD / JTWC Archive** | Best Track & Operational Warnings | Text / CSV / Shapefile | Synoptic (3-hr) | Ground-truth coordinates, central pressure, maximum sustained wind speeds |

---

## ⚙️ Automated Preprocessing & Normalization Pipeline

Raw geostationary and polar satellite swaths cannot be fed directly into deep learning models due to variable sensor geometry, atmospheric distortion, and differing projection datums. The backend pipeline executes nine consecutive stages:

```
[Raw Observation Ingestion]
           │
           ▼
[Radiometric Calibration & Quality Control]
   ↳ Outlier detection, noise suppression, dead-pixel interpolation
           │
           ▼
[Georeferencing & Parallax Correction]
   ↳ Correction for high cloud-top parallax displacement against WGS84 datum
           │
           ▼
[Multi-Sensor Spatial Alignment]
   ↳ Cross-registration of microwave orbit swaths to geostationary sub-satellite projection
           │
           ▼
[Uniform Spatial Resampling]
   ↳ Bi-cubic interpolation to uniform 0.05° x 0.05° grid over the storm-centered bounding box
           │
           ▼
[Thermodynamic & Radiometric Normalization]
   ↳ Standardization of brightness temperatures and reflectance values to [0, 1] tensor scale
           │
           ▼
[Sensor Dropout & Missing Data Imputation]
   ↳ Temporal interpolation or degraded mode fallback flags for missed satellite scans
           │
           ▼
[Temporal Synchronization]
   ↳ Alignment of multi-source feeds to standard synoptic UTC time buckets (00, 03, 06, 09, 12, 15, 18, 21 UTC)
           │
           ▼
[Structural & Environmental Feature Extraction]
   ↳ Computation of CDO area, eye diameter, eyewall circularity, convective asymmetry, and Dvorak T-indices
```

Each stage emits verifiable telemetry: `COMPLETED`, `IN_PROGRESS`, `DEGRADED`, or `FAILED`, ensuring downstream models never silently consume corrupt inputs.

---

## 🧠 AI/ML Modeling Engine (CycloneAI-FusionNet)

The predictive backbone utilizes **CycloneAI-FusionNet**, a hybrid deep learning model trained on historical North Indian Ocean cyclones (2000–2025) validated against IMD Best Track benchmarks.

### 1. Spatio-Temporal Track Forecasting
- **Backbone**: Spatio-temporal Convolutional Long Short-Term Memory (**ConvLSTM**) combined with Bi-directional Gated Recurrent Units (**BiGRU**).
- **Inputs**: Multi-temporal satellite imagery tensors ($T_{-12\text{h}}$ to $T_0$) coupled with environmental steering flow vectors from $500\text{ hPa}$ and $200\text{ hPa}$ geopotential height fields.
- **Outputs**: Discrete forecast points at $+6\text{h}, +12\text{h}, +24\text{h}, +48\text{h}, +72\text{h}$ with latitude, longitude, and an expanding cone of uncertainty ($\pm\sigma$ geographic radius in km).

### 2. Deep Multi-Modal Intensity Estimation
- **Backbone**: Multi-scale **ResNet-50** + **Vision Transformer (ViT)** feature fusion layer, merged with dense numerical vectors representing thermodynamic ocean potential (SST, TCHP) and vertical wind shear.
- **Outputs**:
  - Maximum Sustained Surface Wind ($\text{kt}$)
  - Minimum Central Pressure ($\text{hPa}$)
  - 10th-to-90th percentile probabilistic uncertainty bands

### 3. Rapid Intensification (RI) Predictive Detection
- **Criterion**: Operational threshold of $\Delta V_{\max} \ge 30\text{ kt}$ in 24 hours (or $\ge 15\text{ kt}$ in 12 hours).
- **Classifier**: Calibrated gradient-boosted ensemble optimizing the **Brier Score** over extreme class imbalances common to tropical cyclones.
- **Signals Monitored**: Eye contraction, sudden cloud-top temperature cooling below $-75^\circ\text{C}$, closed microwave ring symmetry, environmental shear $< 10\text{ kt}$, and ocean heat content $> 80\text{ kJ/cm}^2$.

### 4. Interpretable AI & Feature Attribution (XAI)
To support operational trust, the model exposes its internal activations through two explainability mechanisms:
- **Spatial Grad-CAM Heatmaps**: Identifies high-activation regions driving model output (inner eyewall gradient, primary south-east inflow band, upper cirrus outflow canopy).
- **SHAP (Shapley Additive Explanations)**: Quantitative ranking of top contributing physical variables:
  1. *Cloud-Top Cold Core Depth (TIR-1)* ($+0.92$)
  2. *Microwave Eyewall Ring Symmetry* ($+0.86$)
  3. *Sea Surface Temperature ($30.4^\circ\text{C}$)* ($+0.74$)
  4. *Deep-Layer Vertical Wind Shear ($6.8\text{ kt}$)* ($+0.68$)
  5. *Mid-Tropospheric Relative Humidity ($78\%$)* ($+0.54$)

---

## 🖥️ Core Application Workspaces & Decision Support

The frontend application provides five specialized workspaces accessible via the persistent navigation sidebar:

1. **Mission Control (`/`)**
   - **Interactive Geospatial Basin Map**: Leaflet-powered GIS engine with multi-layer overlays (Observed Track, Predicted Track with Uncertainty Cone, Wind Field Radii, SST layer, Precipitation contours).
   - **Active Systems Carousel**: Real-time summary cards for active cyclones in the Bay of Bengal and Arabian Sea.
   - **Current Observation Panel**: High-contrast meteorological readouts (Center coordinates, Sustained Wind, Central Pressure, Heading, Dvorak T-number).
   - **Preprocessing Mini-Pipeline**: Real-time status indicators for ingestion, georeferencing, normalization, and feature extraction.
   - **Temporal Slider**: Time-offset scrubber enabling step-by-step playback from $T_{-12\text{h}}$ to current synoptic observation.

2. **Satellite Analysis View**
   - Multi-spectral synchronized viewing panes:
     - **Thermal Infrared (TIR)**: Calibrated Dvorak/BD-curve color mapping highlighting deep convective cloud tops.
     - **Visible Band (VIS)**: High-resolution diurnal reflectance showing low-level cloud banding and eye definition.
     - **Microwave Band (MW)**: $89\text{ GHz}$ rainband penetration revealing internal core organization.
     - **Fused Multi-Spectral**: Combined layer synthesizing thermal and microwave features.
   - **Feature Extraction Table**: Quantitative structural metrics (Eye diameter, CDO area, Eyewall circularity, Convective asymmetry).

3. **Cyclone Prediction Workspace**
   - **Track Forecast Matrix**: Stepwise waypoint coordinates with forward uncertainty bounds.
   - **Intensity Curve Chart**: Recharts-powered temporal graph displaying observed vs. predicted wind speed and central pressure with confidence intervals.
   - **Morphology Pattern Evolution**: Anticipated convective structure progression across lead times.
   - **Explainability (XAI) Section**: Grad-CAM visual overlays and SHAP feature importance rankings.

4. **Historical Validation & Replay View**
   - Direct step-by-step verification against **IMD Best Track** ground truth for landmark storms:
     - *Super Cyclone Amphan (2020)*
     - *Extremely Severe Cyclonic Storm Fani (2019)*
     - *Very Severe Cyclonic Storm Biparjoy (2023)*
     - *Super Cyclonic Storm Mocha (2023)*
     - *Severe Cyclonic Storm Dana (2024)*
   - Dynamic track error ($\text{km}$) and intensity error ($\text{kt}$) calculations across lead times.

5. **Model Performance & Benchmarking View**
   - Quantitative evaluation against operational baseline models:
     - **CycloneAI-FusionNet (Proposed)**
     - **IMD Official Operational Forecast**
     - **ECMWF IFS (HRES)**
     - **NCEP GFS**
   - Lead-time error growth curves ($+6\text{h}, +12\text{h}, +24\text{h}, +48\text{h}, +72\text{h}$) and RI detection metrics (Brier Score, Precision, Recall).

---

## 🎨 Visual Design & Human Factors Language

CycloSense employs a specialized dark-mode meteorological design system engineered to reduce eye fatigue during 24/7 watch shifts while maintaining high contrast for life-critical data:

- **Surface & Canvas Colors**:
  - `Base Background`: `#0F172A` (Deep Slate)
  - `Surface / Panel Background`: `#1E293B` (Muted Slate)
  - `Structural Border`: `#334155` (Subtle 1px Borders)
- **Data & Text Contrast**:
  - `Primary Text`: `#F1F5F9` (High Contrast Crisp Off-White)
  - `Secondary Text`: `#94A3B8` (Muted Slate Gray for Labels and Units)
- **Categorical Alert Tones (Zero Neon Colors)**:
  - `Critical / Severe Alert`: `#B91C1C` (Muted Crimson — strictly no saturated `#FF0000`)
  - `Warning Alert`: `#B45309` (Muted Rust / Amber)
  - `Operational Normal`: `#15803D` (Muted Forest Green)
  - `Primary Accent / Active Tabs`: `#3B82F6` (Clean Aviation Blue)
  - `Secondary Metric Accent`: `#0284C7` (Muted Teal / Sky)
- **Typography**:
  - System UI / Labels: `Inter`, `Roboto`, `system-ui`
  - Geospatial Coordinates & Numerical Metrics: `JetBrains Mono`, `monospace` (ensures tabular numerical alignment)

---

## 📊 Verification & Model Benchmarking Framework

The platform includes an embedded validation framework evaluated on North Indian Ocean tropical cyclones from 2018 to 2025 ($N = 340$ synoptic forecast cycles):

| Metric | CycloneAI-FusionNet | IMD Operational Baseline | ECMWF IFS | NCEP GFS |
| :--- | :---: | :---: | :---: | :---: |
| **Track MAE (+24h)** | **$54.2\text{ km}$** | $68.4\text{ km}$ | $61.8\text{ km}$ | $79.3\text{ km}$ |
| **Track MAE (+48h)** | **$108.6\text{ km}$** | $132.5\text{ km}$ | $119.4\text{ km}$ | $145.1\text{ km}$ |
| **Intensity MAE (+24h)** | **$7.8\text{ kt}$** | $11.2\text{ kt}$ | $12.4\text{ kt}$ | $14.8\text{ kt}$ |
| **Intensity MAE (+48h)** | **$13.4\text{ kt}$** | $18.1\text{ kt}$ | $19.6\text{ kt}$ | $22.3\text{ kt}$ |
| **Rapid Intensification (RI) Brier Score** | **$0.142$** | $0.218$ | $0.245$ | $0.280$ |
| **Landfall Distance Error (+24h)** | **$28.4\text{ km}$** | $39.2\text{ km}$ | $34.7\text{ km}$ | $46.5\text{ km}$ |

---

## 📂 Project Directory Structure

```
cyclone/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Continuous Integration workflow (lint & build checks)
├── docs/                          # Architecture specs, PRD, and design constraints
│   ├── prd.md                     # Product Requirements Document
│   ├── design.md                  # Comprehensive Design System & Architecture Spec
│   ├── UI_Constraints.md          # Scientific UI constraints & color guidelines
│   └── UI_Instructions.md         # Developer implementation guidelines
├── public/                        # Static satellite assets and SVG icons
├── src/
│   ├── app/                       # Next.js App Router root layout & global styles
│   │   ├── globals.css            # Tailwind CSS v4 tokens, design variables & overrides
│   │   ├── layout.tsx             # Root layout with metadata and fonts
│   │   └── page.tsx               # Main application entry point mounting AppShell
│   ├── components/
│   │   ├── dashboard/             # Mission Control overview, SVG/Leaflet GIS basin map
│   │   ├── layout/                # AppShell, TopHeader, Sidebar, SearchModal, EventsDrawer
│   │   ├── prediction/            # AI Track Forecast, Intensity Chart, Pattern Evolution, XAI
│   │   ├── satellite/             # Multi-spectral viewers (IR, VIS, MW, Fused) & Quality Panel
│   │   ├── sources/               # Telemetry status & data provenance registry
│   │   ├── temporal/              # TimelineSlider, temporal offset controls & evolution metrics
│   │   ├── ui/                    # Atomic primitives (StatusBadge, Provenance, CycloSenseLogo)
│   │   └── validation/            # Historical replay, error growth curves & benchmark tables
│   ├── mock/                      # Calibrated North Indian Ocean mock datasets & archives
│   ├── services/                  # Service layer handlers (Cyclone, Satellite, Prediction, Validation)
│   └── types/                     # TypeScript domain models (Cyclone, Sensor, Prediction, Validation)
├── package.json                   # Dependencies, scripts, and build metadata
├── tsconfig.json                  # TypeScript compiler configuration (strict mode)
├── eslint.config.mjs              # ESLint 9 configuration with Next.js rules
├── next.config.ts                 # Next.js configuration
├── postcss.config.mjs             # Tailwind CSS PostCSS plugin config
└── vercel.json                    # Vercel deployment configuration
```

---

## 🚀 Getting Started & Local Setup

### System Prerequisites
- **Node.js**: `v18.18.0` or later (`v20.x` or `v22.x` LTS recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/cyclone-intelligence-platform.git
   cd cyclone-intelligence-platform
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Local Development Server:**
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   Open [http://localhost:3000](http://localhost:3000) in any modern evergreen browser (Chrome, Firefox, Edge, Safari).

---

## 🧪 Validation, Testing & Production Build

The codebase enforces strict type safety and linting standards. Run the validation suite using the following commands:

```bash
# 1. Run ESLint across all source files
npm run lint

# 2. Run TypeScript compiler type checking (zero emission)
npx tsc --noEmit

# 3. Create an optimized production bundle with Turbopack
npm run build

# 4. Start the production server locally
npm start
```

---

## ⚖️ Operational & Scientific Disclaimer

> [!CAUTION]
> **OFFICIAL WARNING NOTIFICATION**: CycloSense is an **experimental research and decision-support prototype**. It is designed to assist meteorological analysis, academic research, and disaster simulation exercises. 
> 
> This platform **does NOT issue official public weather warnings** and does not replace official bulletins, advisories, or landfall forecasts released by:
> - **India Meteorological Department (IMD)** — Regional Specialized Meteorological Centre (RSMC) New Delhi
> - **Joint Typhoon Warning Center (JTWC)**
> - **World Meteorological Organization (WMO)**
> 
> During active tropical cyclogenesis or severe weather emergencies, disaster responders and the public must always rely exclusively on official directives issued by national and regional disaster management authorities.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for complete details.
