````markdown
# SIH 2026 PS 26070 — UI/UX DEVELOPMENT SPECIFICATION

## 0. PRIMARY OBJECTIVE

Build a **credible, human-designed meteorological operations interface** for an AI/ML-based Tropical Cyclone Identification, Classification, Temporal Analysis, and Prediction System.

The interface must look like a **real scientific/operational software product**, not an AI-generated dashboard, startup template, or "vibe-coded" prototype.

The visual language should resemble software used in:

- Meteorological operations centres
- Satellite monitoring facilities
- Scientific research laboratories
- Disaster-management control rooms
- Geospatial intelligence platforms

The application must prioritize:

1. Information hierarchy
2. Scientific readability
3. Operational usability
4. Geospatial visualization
5. Temporal analysis
6. Data provenance
7. Prediction uncertainty
8. Model validation
9. Consistent interaction patterns
10. Professional restraint

---

# 1. PRODUCT CONTEXT

## Product

**CYCLONE AI**

### Subtitle

**Multi-Source Tropical Cyclone Intelligence & Prediction**

### Product Type

Operational-style research and decision-support platform.

### Core Pipeline

```text
SATELLITE OBSERVATIONS
        ↓
DATA QUALITY CHECK
        ↓
PREPROCESSING
        ↓
IR + VISIBLE + MICROWAVE
        ↓
MULTI-SOURCE FUSION
        ↓
CYCLONE IDENTIFICATION
        ↓
CLASSIFICATION
        ↓
TEMPORAL ANALYSIS
        ↓
TRACK / INTENSITY / PATTERN PREDICTION
        ↓
UNCERTAINTY ESTIMATION
        ↓
HISTORICAL VALIDATION
````

The UI must make this workflow understandable without requiring the user to read documentation.

---

# 2. IMPORTANT DESIGN CONSTRAINT

## DO NOT MAKE THE UI LOOK AI-GENERATED

Avoid visual patterns commonly associated with automatically generated interfaces.

### Strictly avoid:

* Excessive rounded cards
* Every section inside a floating card
* Excessive glassmorphism
* Neon gradients
* Purple/blue AI gradients
* Large glowing buttons
* Huge typography
* Excessive icons
* Decorative 3D graphics
* Random abstract background shapes
* Excessive shadows
* Excessive blur
* Gradient text
* "AI-powered" marketing language
* Generic KPI-card layouts
* Excessive empty space
* Unnecessary animations
* Floating elements without functional purpose
* Repeated pill-shaped containers
* Excessive border-radius
* Stock weather illustrations
* Generic AI robot imagery
* Chatbot-style interfaces

The interface should appear to have been designed by a **professional product designer working with meteorologists and GIS engineers**.

---

# 3. HUMAN-DESIGNED VISUAL PRINCIPLES

Follow these principles throughout the application.

### 3.1 Functional over decorative

Every visual element must have a purpose.

If a component does not communicate:

* data
* state
* navigation
* interaction
* context

remove it.

### 3.2 Dense but readable

This is an operations interface.

Do not create excessive whitespace simply to make the UI look "modern".

Use compact spacing while maintaining clear hierarchy.

### 3.3 Flat visual hierarchy

Prefer:

```text
Application
    ↓
Section
    ↓
Subsection
    ↓
Data
```

rather than:

```text
Application
    ↓
Huge floating card
    ↓
Card inside card
    ↓
Card inside card
    ↓
Metric
```

### 3.4 Consistency over novelty

Use the same:

* spacing
* border treatment
* typography
* icon sizing
* control heights
* chart styles
* status indicators

throughout the application.

---

# 4. DESIGN LANGUAGE

## Visual character

The product should feel:

* Technical
* Scientific
* Quiet
* Precise
* Operational
* Trustworthy
* Data-centric
* Geospatial

It should NOT feel:

* Promotional
* Futuristic for the sake of being futuristic
* Cyberpunk
* Gaming-inspired
* Consumer-oriented

---

# 5. COLOR SYSTEM

Use a restrained dark palette.

## Background

```text
App Background       #0B1120
Primary Surface      #111827
Secondary Surface    #172033
Elevated Surface     #1E293B
```

## Borders

```text
Primary Border       #263449
Secondary Border     #334155
Subtle Divider       #1E293B
```

Use borders more frequently than shadows.

Default:

```css
border: 1px solid #263449;
```

Avoid heavy box shadows.

---

# 6. TEXT COLORS

```text
Primary Text         #F8FAFC
Secondary Text       #CBD5E1
Muted Text           #94A3B8
Disabled Text        #64748B
Data Text            #E2E8F0
```

Do not use pure white everywhere.

Use hierarchy through:

* size
* weight
* contrast
* spacing

rather than decorative styling.

---

# 7. SEMANTIC COLORS

```text
Normal               #22C55E
Information          #38BDF8
Prediction           #60A5FA
Warning              #F59E0B
Critical             #EF4444
Rapid Intensification #F43F5E
Observed             #22C55E
Predicted            #60A5FA
Reference            #A78BFA
Unavailable          #64748B
```

Never communicate meaning through colour alone.

Use:

```text
ICON + LABEL + COLOR
```

Example:

```text
● ACTIVE
```

instead of:

```text
green circle only
```

---

# 8. TYPOGRAPHY

## Primary font

Use:

**Inter**

Fallback:

```text
system-ui, sans-serif
```

## Data font

Use:

**JetBrains Mono**

Use monospace for:

* Latitude
* Longitude
* Wind speed
* Pressure
* Timestamps
* Coordinates
* Model values
* Percentages
* Errors
* Scientific measurements

Example:

```text
15.42°N
087.31°E
145 kt
920 hPa
16:42 UTC
```

Do not use monospace for ordinary paragraphs or navigation.

---

# 9. TYPOGRAPHIC SCALE

Keep typography compact.

```text
Page Title          20–24px
Section Title       13–15px
Panel Label         11–12px
Body                12–14px
Secondary           11–12px
Scientific Value    20–32px
Data Table          11–13px
```

Use uppercase primarily for:

* section labels
* operational status
* metadata

Do not write entire paragraphs in uppercase.

---

# 10. BORDER RADIUS

Use restrained rounding.

```text
Large containers     4–6px
Buttons              4–5px
Inputs               4–5px
Status badges        3–4px
```

Avoid:

```text
rounded-full
rounded-3xl
rounded-[32px]
```

except where genuinely appropriate.

The interface should feel like professional engineering software.

---

# 11. SHADOWS

Default:

```text
No shadow
```

Use extremely subtle shadows only for:

* dropdowns
* command menus
* floating map controls
* dialogs

Never use large soft shadows around every panel.

---

# 12. SPACING SYSTEM

Use a consistent 4px base scale.

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
```

Avoid random spacing values.

---

# 13. APPLICATION LAYOUT

Desktop-first.

Minimum target:

```text
1440 × 900
```

Primary layout:

```text
┌────────┬─────────────────────────────────────────────────────┐
│        │ HEADER                                              │
│        ├─────────────────────────────────────────────────────┤
│ SIDE   │                                                     │
│ BAR    │                  MAIN WORKSPACE                     │
│        │                                                     │
│        │                                                     │
│        │                                                     │
└────────┴─────────────────────────────────────────────────────┘
```

Sidebar:

```text
64–72px
```

Main workspace:

```text
Flexible
```

---

# 14. SIDEBAR

The sidebar must be simple and functional.

Navigation:

```text
Mission Control
Satellite Analysis
Prediction
Historical Cases
Model Performance
Data Sources
```

Use Lucide icons.

Icons should be:

```text
18–20px
```

Do not use large decorative icons.

Selected navigation item:

* subtle background
* thin left border
* brighter text
* icon highlight

Do not use a giant glowing selected state.

Bottom:

```text
SYSTEM

● PIPELINE ONLINE

MODEL
v0.1.0
```

---

# 15. HEADER

The header should be compact.

Left:

```text
CYCLONE AI
North Indian Ocean Monitoring
```

Centre/right:

```text
ACTIVE SYSTEMS  03
```

Right:

```text
● DATA STATUS
28 SEP 2026
16:42 UTC
```

If using mock data:

```text
DEMO MODE
SIMULATED DATA
```

must be visible.

---

# 16. MISSION CONTROL

Mission Control is the default landing page.

Use a 12-column grid.

Recommended:

```text
Left Panel       3 columns
Map              6 columns
Analytics        3 columns
```

However, the map must receive enough space to remain the dominant visual component.

---

# 17. MISSION CONTROL STRUCTURE

```text
┌─────────────────┬──────────────────────────────┬───────────────┐
│ ACTIVE SYSTEMS  │                              │ CURRENT       │
│                 │                              │ OBSERVATION   │
│ AI EVENTS       │         MAP                  │               │
│                 │                              │ STRUCTURE     │
│                 │                              │               │
├─────────────────┤                              ├───────────────┤
│ SELECTED        │                              │ PREDICTION    │
│ SYSTEM          │                              │ SUMMARY       │
└─────────────────┴──────────────────────────────┴───────────────┘
```

Use dividers and aligned headers rather than wrapping every section in a card.

---

# 18. ACTIVE CYCLONES

Title:

```text
ACTIVE SYSTEMS
```

Each item:

```text
● SYSTEM 01

Severe Cyclonic Storm
15.42°N 087.31°E

145 kt
NW / 14 kt
```

Use a compact list.

Do not create huge cyclone cards.

Selected system:

```text
border-left: 2px solid #38BDF8
background: #111827
```

---

# 19. AI EVENTS

Title:

```text
RECENT EVENTS
```

Example:

```text
16:02 UTC
RAPID INTENSIFICATION SIGNAL

Increasing convective organization
detected over observation window.

CONFIDENCE  --
```

Other events:

```text
15:47 UTC
EYE STRUCTURE DETECTED

15:31 UTC
PRESSURE DECREASE OBSERVED

15:12 UTC
NEW SATELLITE OBSERVATION
```

Do not use flashy alert banners for every event.

---

# 20. INTERACTIVE MAP

The map is the visual centrepiece.

Preferred:

**MapLibre GL**

Alternative:

**React-Leaflet**

Map controls must be compact and aligned.

Layers:

```text
Satellite
IR
Visible
Microwave
Wind Vectors
Precipitation
SST
Administrative Boundaries
Observed Track
Predicted Track
Uncertainty
```

---

# 21. MAP VISUAL LANGUAGE

Observed track:

```text
solid cyan line
```

Predicted track:

```text
dashed blue line
```

Reference track:

```text
thin violet/neutral line
```

Uncertainty:

```text
transparent blue polygon/cone
```

Current cyclone:

```text
small high-contrast marker
```

Do not use oversized glowing markers.

---

# 22. MAP LEGEND

Keep it compact.

```text
━━ OBSERVED
- - PREDICTED
░░ UNCERTAINTY
● CURRENT
○ FORECAST
```

Legend should not cover important map content.

---

# 23. CURRENT OBSERVATION

Use compact scientific data blocks instead of generic KPI cards.

```text
CURRENT OBSERVATION

MAX SUSTAINED WIND
145 kt

CENTRAL PRESSURE
920 hPa

LOCATION
15.42°N 087.31°E

MOVEMENT
NW / 14 kt
```

Values should use JetBrains Mono.

---

# 24. STRUCTURAL ANALYSIS

Display as a dense scientific checklist.

```text
STRUCTURAL ANALYSIS

CIRCULATION       DETECTED
CDO               STRONG
SPIRAL BANDS      ORGANIZED
EYE               DETECTED
EYE SYMMETRY      HIGH
CONVECTION        STRONG
```

Use small status indicators.

Do not turn every item into a large coloured pill.

---

# 25. SATELLITE ANALYSIS

Primary navigation:

```text
IR
VISIBLE
MICROWAVE
FUSED
```

The image viewer should occupy most of the available viewport.

Controls should sit directly above or over the image in a restrained toolbar.

---

# 26. SATELLITE IMAGE VIEWER

Viewer structure:

```text
┌─────────────────────────────────────────────┐
│ IR       28 SEP 2026 16:00 UTC              │
├─────────────────────────────────────────────┤
│                                             │
│                                             │
│           SATELLITE IMAGE                   │
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│ Temperature Scale       Coordinates        │
└─────────────────────────────────────────────┘
```

Do not put the satellite image inside multiple nested cards.

---

# 27. SATELLITE ANALYSIS PANEL

Show only relevant parameters.

For IR:

```text
CLOUD-TOP TEMP      --
CDO AREA            --
EYE                  --
CONVECTION           --
```

For Visible:

```text
CLOUD ORGANIZATION  --
SPIRAL STRUCTURE    --
EYE                  --
SYMMETRY             --
```

For Microwave:

```text
EYEWALL              --
LOW-LEVEL CENTRE     --
RAINBAND STRUCTURE   --
```

---

# 28. FUSED VIEW

Show the relationship between sources.

```text
IR
VISIBLE
MICROWAVE
   ↓
MULTI-SOURCE FUSION
   ↓
FEATURE REPRESENTATION
   ↓
CYCLONE ANALYSIS
```

The UI must make it clear that the system combines multiple observations.

Do not use decorative "AI" graphics.

---

# 29. TEMPORAL ANALYSIS

Temporal analysis must be a first-class feature.

Timeline:

```text
T-12h ─── T-9h ─── T-6h ─── T-3h ─── NOW
```

Controls:

```text
◀   PLAY   ▶   1×
```

Timeline must update:

* Satellite image
* Cyclone centre
* Track
* Wind
* Pressure
* Structure
* Extracted features

All panels must remain synchronized to the selected timestamp.

---

# 30. TEMPORAL EVOLUTION

Display changes as data, not decorative animations.

```text
6-HOUR CHANGE

WIND
132 → 145 kt

PRESSURE
934 → 920 hPa

CDO AREA
+18%

EYE SYMMETRY
+11%

CLOUD-TOP TEMP
-4°C
```

Use trend arrows.

---

# 31. PREDICTION PAGE

Navigation:

```text
TRACK
INTENSITY
PATTERN
```

---

# 32. TRACK PREDICTION

Main view:

```text
OBSERVED TRACK
───────────────

PREDICTED TRACK
- - - - - - - -

UNCERTAINTY
░░░░░░░░░░░░░░
```

Forecast table:

```text
TIME     LAT      LON      WIND      CONF.
+6h      --       --       --        --
+12h     --       --       --        --
+24h     --       --       --        --
+48h     --       --       --        --
```

Do not fabricate prediction values.

---

# 33. INTENSITY PREDICTION

Chart requirements:

* Observed line
* Predicted line
* Prediction interval
* Current marker
* Clear axis units
* Hover tooltip

Example:

```text
Wind Speed (kt)

160 ┤
150 ┤               - - - -
140 ┤        ●─────
130 ┤     ●
120 ┤  ●
    └────────────────────────
      NOW  6h  12h  24h  48h
```

Avoid unnecessary gradients.

---

# 34. PATTERN EVOLUTION

Show satellite snapshots across time.

```text
CURRENT       +6H          +12H         +24H

[ IMAGE ]    [ IMAGE ]    [ IMAGE ]    [ IMAGE ]

Spiral       Organized     Eye          Mature
Bands        CDO           Formation    Structure
```

This should communicate temporal structural evolution.

---

# 35. UNCERTAINTY

Uncertainty must be visually separated from prediction.

Use:

```text
Prediction
━━━━━━━

Uncertainty
░░░░░░░░░
```

For track:

```text
Prediction line
+
Uncertainty cone
```

For intensity:

```text
Prediction line
+
Confidence interval
```

Never present uncertain predictions as exact values.

---

# 36. MODEL EXPLAINABILITY

Create a dedicated section:

```text
MODEL INTERPRETATION
```

Show feature contributions:

```text
CLOUD ORGANIZATION    ████████
EYE STRUCTURE         ███████
CONVECTION             ███████
SST                    █████
WIND SHEAR             ████
```

If Grad-CAM is available:

```text
ORIGINAL
HEATMAP
OVERLAY
```

If SHAP is available:

```text
FEATURE
CONTRIBUTION
DIRECTION
```

If unavailable:

```text
EXPLAINABILITY DATA
NOT AVAILABLE
```

Never create fake explanations.

---

# 37. DATA QUALITY

Title:

```text
DATA INTEGRITY
```

Example:

```text
IR             VALID
VISIBLE        VALID
MICROWAVE      VALID
TIMESTAMP      SYNCHRONIZED
GEOLOCATION    VERIFIED
MISSING DATA   --
```

Possible states:

```text
VALID
DEGRADED
INVALID
UNAVAILABLE
```

---

# 38. PREPROCESSING PIPELINE

Provide a technical view of preprocessing.

```text
RAW DATA
   ↓
QUALITY CONTROL
   ↓
GEOREFERENCING
   ↓
IMAGE ALIGNMENT
   ↓
RESAMPLING
   ↓
NORMALIZATION
   ↓
MISSING DATA HANDLING
   ↓
TEMPORAL SYNCHRONIZATION
   ↓
FEATURE EXTRACTION
   ↓
MULTI-SOURCE FUSION
```

Each stage can display:

```text
STATUS
INPUT
OUTPUT
PROCESSING TIME
```

Keep this screen technical and compact.

---

# 39. FEATURE EXTRACTION

Use a table rather than a grid of oversized cards.

```text
PARAMETER                    VALUE

Centre Latitude              --
Centre Longitude             --
Cloud-top Temperature        --
CDO Area                     --
Cloud Symmetry               --
Spiral Band Curvature        --
Eye Presence                 --
Eye Diameter                 --
Eye Temperature              --
Eyewall Structure            --
Convection Strength          --
SST                          --
Vertical Wind Shear          --
Maximum Wind                 --
Central Pressure             --
```

---

# 40. HISTORICAL CASES

Provide:

```text
SEARCH
FILTER
SORT
```

Filters:

```text
Year
Region
Cyclone
Intensity
Date Range
```

Use a professional data table.

Columns:

```text
Cyclone
Date
Region
Maximum Wind
Minimum Pressure
Duration
Reference Source
```

Do not use oversized cards for historical cases.

---

# 41. HISTORICAL REPLAY

Allow the user to select a historical case and replay:

```text
SATELLITE
TRACK
INTENSITY
STRUCTURE
PREDICTION
REFERENCE
```

Timeline:

```text
◀ ─────────────── ● ─────────────── ▶
```

Playback speeds:

```text
1×
2×
4×
```

---

# 42. MODEL PERFORMANCE

Use a scientific evaluation page.

Metrics:

```text
DETECTION

Precision       --
Recall          --
F1              --

CLASSIFICATION

Accuracy        --
Precision       --
Recall          --
F1              --

TRACK

MAE             --
RMSE            --

INTENSITY

MAE             --
RMSE            --
```

Use charts for:

* Prediction error over time
* Performance by cyclone
* Performance by category
* Observed vs predicted intensity
* Track error distribution

Do not display fabricated metrics.

---

# 43. MODEL COMPARISON

Use a generic comparison architecture.

```text
CYCLONE AI
MODEL A
MODEL B
REFERENCE
```

Do not hard-code external models unless actual data is available.

The component should support dynamically configured models.

---

# 44. DATA SOURCES

Create a transparent source registry.

```text
DATA SOURCES

SATELLITE

IR
Source: --
Resolution: --
Coverage: --
Updated: --

VISIBLE
Source: --
Resolution: --
Coverage: --
Updated: --

MICROWAVE
Source: --
Resolution: --
Coverage: --
Updated: --
```

Historical/reference data:

```text
REFERENCE DATA
Source: --
Coverage: --
```

---

# 45. DATA PROVENANCE

Every important visualization should allow the user to inspect:

```text
SOURCE
TIMESTAMP
RESOLUTION
PROCESSING STATUS
```

Example:

```text
IR OBSERVATION

Source          --
Timestamp       28 SEP 2026 16:00 UTC
Resolution      --
Processing      Normalized
Geolocation     Verified
```

This is essential for scientific credibility.

---

# 46. INTERACTION RULES

## Hover

Hovering over a chart point:

```text
→ Show tooltip
→ Highlight corresponding timestamp
→ Highlight map point
→ Update relevant observation
```

## Map point click

```text
→ Select forecast point
→ Show forecast details
→ Highlight timeline position
```

## Timeline change

```text
→ Update all synchronized visualizations
```

## Cyclone selection

```text
→ Update entire workspace
```

---

# 47. CROSS-VIEW SYNCHRONIZATION

This is mandatory.

The following must share a common timestamp:

```text
Satellite Image
Map Position
Timeline
Intensity Chart
Structural Parameters
Feature Values
AI Events
```

If the user moves from:

```text
T-6h → NOW
```

all relevant views should update accordingly.

This creates a coherent scientific workflow.

---

# 48. LOADING STATES

Use skeleton loaders.

Example:

```text
SATELLITE IMAGE

████████████████████
████████████████████
████████████████████
```

Do not use giant spinning loaders.

---

# 49. ERROR STATES

Use concise operational messages.

```text
SATELLITE DATA UNAVAILABLE

Unable to retrieve observation
for the selected timestamp.

[ RETRY ]
```

Never expose raw API errors to the user.

---

# 50. EMPTY STATES

Example:

```text
NO CYCLONE SELECTED

Select an active system to begin analysis.
```

Keep empty states functional and minimal.

---

# 51. MICRO-INTERACTIONS

Use subtle transitions only.

```text
Duration:
150–200ms

Easing:
ease-out
```

Allowed:

* Panel transitions
* Timeline movement
* Map marker movement
* Chart hover
* Number changes
* Layer transitions

Avoid:

* Bounce
* Flash
* Particle effects
* Animated gradients
* Constant pulsing
* Decorative motion

---

# 52. BUTTON DESIGN

Buttons should be compact and utilitarian.

Primary:

```text
background: #1E40AF
```

Secondary:

```text
background: #172033
border: #334155
```

Danger:

```text
#7F1D1D
```

Button height:

```text
32–36px
```

Avoid oversized CTA buttons.

Use labels such as:

```text
LOAD CASE
PLAY
PAUSE
RESET
APPLY
EXPORT
RETRY
```

not:

```text
Explore AI
Discover Insights
Experience Intelligence
```

---

# 53. TABLE DESIGN

Tables should look like scientific/engineering data tables.

Use:

* compact row height
* subtle horizontal dividers
* aligned numerical columns
* monospace values
* sticky header when required
* hover row state

Avoid excessive card-like rows.

---

# 54. CHART DESIGN

Charts should be restrained.

Use:

* thin lines
* subtle grid
* clear axes
* scientific units
* meaningful colours
* interactive tooltips
* reference lines
* uncertainty regions

Avoid:

* 3D charts
* decorative gradients
* excessive legends
* unnecessary animation
* pie charts for scientific variables

---

# 55. ICON SYSTEM

Use:

**Lucide React**

Rules:

```text
Default size       16–18px
Navigation         18–20px
Large state icon   20–24px
Stroke             Consistent
```

Never mix multiple icon libraries.

Avoid emoji as primary UI icons.

---

# 56. RESPONSIVE DESIGN

## Desktop

Primary experience:

```text
Sidebar
+
Map
+
Analysis Panels
```

## Tablet

```text
Sidebar
+
Map
+
Bottom Analysis Drawer
```

## Mobile

Simplify to:

```text
Current System
↓
Map
↓
Observation
↓
Prediction
↓
Events
```

Do not attempt to compress the complete desktop dashboard into mobile.

---

# 57. ACCESSIBILITY

Implement:

* Keyboard navigation
* Visible focus states
* ARIA labels
* Accessible charts
* Accessible map controls
* Screen-reader labels
* Sufficient contrast
* Text + icon status indicators
* Non-colour-dependent warnings

---

# 58. DEMO MODE

The prototype must support a clearly identifiable demo mode.

Header:

```text
DEMO MODE
SIMULATED DATA
```

Mock data must never look identical to live data without an indication.

Use realistic sample data only for demonstration.

Do not claim that sample values are real-time observations.

---

# 59. MOCK DATA ARCHITECTURE

Separate frontend components from data sources.

```text
/mock
    cyclones.ts
    satellite.ts
    observations.ts
    predictions.ts
    temporal.ts
    events.ts
    validation.ts

/services
    cycloneService.ts
    satelliteService.ts
    predictionService.ts
    validationService.ts

/types
    cyclone.ts
    satellite.ts
    prediction.ts
    validation.ts
```

Components must consume typed data interfaces.

Suggested interfaces:

```text
Cyclone
SatelliteObservation
CycloneObservation
CycloneFeature
ForecastPoint
Prediction
PredictionInterval
TemporalObservation
ValidationMetric
AIEvent
DataQuality
```

---

# 60. COMPONENT ARCHITECTURE

```text
/components

/layout
    AppShell
    Sidebar
    Header

/dashboard
    ActiveSystems
    RecentEvents
    MissionMap
    CurrentObservation
    StructuralAnalysis
    PredictionSummary

/satellite
    SatelliteViewer
    IRViewer
    VisibleViewer
    MicrowaveViewer
    FusionViewer
    SatelliteToolbar
    DataQuality

/temporal
    Timeline
    ReplayControls
    EvolutionPanel

/prediction
    TrackPrediction
    IntensityPrediction
    PatternEvolution
    UncertaintyCone

/analytics
    ScientificMetric
    FeatureTable
    TimeSeriesChart
    ConfidenceIndicator
    FeatureContribution

/validation
    HistoricalCases
    ValidationMetrics
    PredictionComparison
    HistoricalReplay

/ui
    StatusIndicator
    DataTable
    Tooltip
    Skeleton
    EmptyState
    ErrorState
```

---

# 61. TECH STACK

## Framework

Use:

**Next.js App Router + TypeScript**

If project constraints require Vite, use:

**React + Vite + TypeScript**

Prefer Next.js.

---

# 62. STYLING

Use:

**Tailwind CSS**

Use CSS variables for design tokens.

Do not scatter arbitrary colours throughout components.

Example:

```css
--background
--surface
--surface-elevated
--border
--text-primary
--text-secondary
--text-muted
--status-normal
--status-warning
--status-critical
--status-info
```

---

# 63. COMPONENT LIBRARY

Use:

**shadcn/ui**

with:

**Radix UI**

Do not use:

* MUI
* Bootstrap
* Ant Design

Do not blindly use shadcn defaults.

Customize:

* radius
* spacing
* colours
* borders
* typography

to match this specification.

---

# 64. CHARTS

Preferred:

**Recharts**

Use D3 only where custom scientific visualization is necessary.

Charts must share the application's visual system.

---

# 65. MAPS

Preferred:

**MapLibre GL**

Alternative:

**React-Leaflet**

Map should support:

* GeoJSON
* Track lines
* Forecast points
* Uncertainty polygons
* Raster overlays
* Layer controls
* Coordinates
* Zoom controls

---

# 66. SATELLITE IMAGE HANDLING

Design the frontend to support:

```text
Raster Image
GeoTIFF-derived visualization
PNG/JPEG preview
Map tile overlay
Canvas/WebGL rendering
```

The UI should not assume that satellite data is simply a normal image.

Keep metadata available.

---

# 67. PERFORMANCE REQUIREMENTS

Prioritize:

* Fast initial render
* Lazy-loaded heavy visualizations
* Memoized charts
* Efficient map layers
* Canvas/WebGL for intensive rendering
* Avoid unnecessary React re-renders
* Virtualized large tables
* Image loading placeholders

The map and satellite viewer must remain responsive.

---

# 68. NO FAKE SCIENTIFIC DATA

Never fabricate:

* Satellite observations
* Official forecasts
* IMD warnings
* Model accuracy
* Prediction confidence
* External model outputs
* Validation metrics
* Data-source status

When data does not exist:

```text
--
```

or:

```text
NOT AVAILABLE
```

When using demonstration data:

```text
DEMO DATA
```

must be visible.

---

# 69. NO FAKE OFFICIAL INTEGRATION

Do not visually imply that the system is an official IMD operational platform unless such integration actually exists.

Use wording such as:

```text
AI DECISION SUPPORT
RESEARCH PROTOTYPE
```

rather than:

```text
OFFICIAL WARNING
OFFICIAL FORECAST
```

---

# 70. IMPLEMENTATION ORDER

Build in this order:

## Phase 1 — Foundation

```text
1. Next.js
2. TypeScript
3. Tailwind
4. Design tokens
5. shadcn/ui
6. Application shell
7. Sidebar
8. Header
```

## Phase 2 — Core Dashboard

```text
9. Mission Control
10. Active Systems
11. Map
12. Current Observation
13. Structural Analysis
14. Recent Events
```

## Phase 3 — Satellite

```text
15. Satellite Viewer
16. IR
17. Visible
18. Microwave
19. Fused View
20. Data Quality
```

## Phase 4 — Temporal Analysis

```text
21. Timeline
22. Replay
23. Evolution Metrics
24. Synchronized Views
```

## Phase 5 — Prediction

```text
25. Track Prediction
26. Intensity Prediction
27. Pattern Evolution
28. Uncertainty
```

## Phase 6 — Explainability

```text
29. Feature Contributions
30. Grad-CAM placeholder
31. SHAP placeholder
```

## Phase 7 — Validation

```text
32. Historical Cases
33. Historical Replay
34. Model Performance
35. Prediction vs Reference
```

## Phase 8 — Data Integration

```text
36. Data Services
37. API Interfaces
38. Real Satellite Data
39. Model API
40. Validation API
```

---

# 71. ANTIGRAVITY IMPLEMENTATION RULES

Before generating components:

1. Create the design-token system.
2. Create the application shell.
3. Create reusable primitives.
4. Create the map layout.
5. Create the satellite viewer.
6. Create the analytics components.
7. Create mock data interfaces.
8. Connect mock data through services.
9. Only then build individual screens.

Do not generate every page as an isolated component.

All pages must share:

* Header
* Sidebar
* Typography
* Spacing
* Borders
* Status system
* Data formatting
* Interaction patterns

---

# 72. DO NOT REPEAT COMPONENT PATTERNS

Avoid creating:

```text
Card
Card
Card
Card
Card
Card
```

for every section.

Use a combination of:

```text
Panel
Section
Divider
Data Table
Chart
Toolbar
List
Scientific Metric
```

Choose the appropriate structure based on content.

---

# 73. INFORMATION DENSITY

The UI should feel information-rich without becoming cluttered.

Use:

```text
small labels
compact rows
aligned numbers
thin dividers
consistent spacing
```

Prefer:

```text
PARAMETER        VALUE
Wind             145 kt
Pressure         920 hPa
Movement         NW
```

over:

```text
[ Huge Card ]
[ Huge Card ]
[ Huge Card ]
```

---

# 74. REAL-WORLD SOFTWARE FEEL

The application should contain practical details that make it feel engineered rather than generated.

Include:

* UTC timestamps
* Data-source indicators
* Resolution metadata
* Processing status
* Last update time
* Dataset identifiers
* Coordinate formats
* Units
* Model version
* Observation timestamp
* Reference timestamp
* Data quality state

These should be subtle and functional.

---

# 75. SCIENTIFIC UNIT RULES

Use consistent units:

```text
Wind Speed        kt
Pressure          hPa
Temperature       °C
Coordinates       °N / °E
Distance          km
Time              UTC
```

Never randomly switch units across screens.

---

# 76. FINAL VISUAL QUALITY CHECK

Before considering the UI complete, verify:

```text
[ ] Does it look like scientific software?
[ ] Does it avoid generic SaaS styling?
[ ] Does it avoid excessive rounded cards?
[ ] Does it avoid AI-generated visual clichés?
[ ] Is the map visually dominant?
[ ] Are satellite images prominent?
[ ] Is temporal analysis obvious?
[ ] Are observed and predicted values clearly separated?
[ ] Is uncertainty visible?
[ ] Are units consistent?
[ ] Are timestamps visible?
[ ] Is data provenance accessible?
[ ] Are mock values clearly identified?
[ ] Are charts readable?
[ ] Are tables compact?
[ ] Are interactions consistent?
[ ] Is the sidebar restrained?
[ ] Are animations subtle?
[ ] Is there no unnecessary decoration?
[ ] Does the interface remain usable at 1440×900?
```

---

# 77. FINAL UX PRINCIPLE

The entire product should communicate one continuous analytical workflow:

```text
OBSERVE
   ↓
VERIFY DATA
   ↓
UNDERSTAND STRUCTURE
   ↓
ANALYZE CHANGE
   ↓
PREDICT
   ↓
MEASURE UNCERTAINTY
   ↓
EXPLAIN
   ↓
VALIDATE
```

The final interface should feel like a **real meteorological analysis workstation built for trained users**, with the visual discipline of scientific and geospatial software.

It must prioritize **clarity, evidence, data provenance, and operational usefulness over visual effects**.

```
```
