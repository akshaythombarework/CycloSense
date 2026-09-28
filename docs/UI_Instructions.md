````markdown
# SIH 2026 PS26070 — CYCLONE AI
## Professional UI/UX Development Specification for Antigravity IDE

---

# 0. CORE PRODUCT INSTRUCTION

Build a **production-quality meteorological AI decision-support platform** for SIH 2026 PS26070.

The platform is an AI/ML-based system for:

> **Tropical Cyclone Identification, Classification, Temporal Analysis, and Prediction using Multi-Source Satellite Data.**

The UI must feel like a:

- Meteorological Operations Centre
- Satellite Mission Control System
- Scientific Research Platform
- Disaster Management Decision-Support System

It must NOT look like:

- A consumer weather app
- A generic SaaS dashboard
- A finance dashboard
- A crypto dashboard
- A generic AI landing page
- A marketing website

The core visual workflow must be:

```text
MULTI-SOURCE SATELLITE DATA
        ↓
DATA QUALITY & PREPROCESSING
        ↓
IR + VISIBLE + MICROWAVE FUSION
        ↓
CYCLONE IDENTIFICATION
        ↓
CURRENT STRUCTURE & INTENSITY CLASSIFICATION
        ↓
TEMPORAL ANALYSIS
        ↓
TRACK + INTENSITY + PATTERN PREDICTION
        ↓
UNCERTAINTY & CONFIDENCE
        ↓
HISTORICAL VALIDATION
````

Prioritize:

1. Situational awareness
2. Scientific credibility
3. Information density
4. Satellite imagery
5. Interactive mapping
6. Temporal analysis
7. Prediction visualization
8. Explainability
9. Uncertainty
10. Historical validation

---

# 1. PRODUCT IDENTITY

Product name:

**CYCLONE AI**

Subtitle:

**Multi-Source Tropical Cyclone Intelligence & Prediction Platform**

Status label:

**AI DECISION SUPPORT • RESEARCH PROTOTYPE**

Do not claim that the system replaces IMD or issues official government warnings.

---

# 2. PRIMARY USERS

## Meteorological Analyst

Needs to:

* Monitor satellite observations
* Compare IR / Visible / Microwave imagery
* Inspect cyclone structure
* Analyze temporal evolution
* Inspect AI predictions
* Understand model confidence
* Compare predicted and observed behaviour

## Disaster Management Analyst

Needs to quickly understand:

* Active cyclone
* Current location
* Current intensity
* Predicted track
* Predicted intensity
* Affected regions
* Prediction uncertainty
* Expected evolution

## Research / Model Analyst

Needs:

* Historical cases
* Satellite sequences
* Model performance
* Prediction errors
* Data quality
* Feature importance
* Temporal replay
* Validation metrics

---

# 3. DESIGN PHILOSOPHY

Create a:

**Dark atmospheric + aerospace + meteorological operations centre aesthetic.**

Visual characteristics:

* Dark navy environment
* Crisp scientific data visualization
* Subtle depth
* Thin borders
* Dense but organized information
* Large map
* Real satellite imagery as a primary visual element
* Compact scientific metrics
* Minimal decorative elements
* Strong visual hierarchy

Avoid:

* Excessive gradients
* Excessive glassmorphism
* Giant rounded cards
* Excessive neon
* Excessive animations
* Decorative illustrations
* Generic dashboard aesthetics

---

# 4. COLOR SYSTEM

## Backgrounds

```text
Deep Background:       #070B14
Primary Surface:       #0D1422
Secondary Surface:     #111B2B
Elevated Surface:      #162235
```

## Borders

```text
Border:                #243247
Border Highlight:      #33445D
```

## Typography

```text
Primary Text:          #F1F5F9
Secondary Text:        #94A3B8
Muted Text:            #64748B
Data Text:             #CBD5E1
```

## Semantic Colors

```text
Normal:                #22C55E
Information:           #38BDF8
Prediction:            #60A5FA
Warning:               #F59E0B
Critical:              #EF4444
Rapid Intensification: #F43F5E
Observed:              #22C55E
Predicted:             #60A5FA
Uncertainty:           #64748B
```

Never use color as the only indicator of status.

Always combine:

```text
COLOR + ICON + TEXT
```

---

# 5. TYPOGRAPHY

Primary UI font:

**Inter**

Scientific/data font:

**JetBrains Mono**

Use JetBrains Mono for:

* Latitude
* Longitude
* Wind speed
* Pressure
* Timestamp
* Confidence
* Model metrics
* Coordinates
* Numerical predictions

Example:

```text
15.42° N
087.31° E
0920 hPa
145 kt
82.4%
```

---

# 6. APPLICATION SHELL

Use a fixed desktop-first application shell.

```text
┌──────────────────────────────────────────────────────────────┐
│ TOP HEADER                                                   │
├────────────┬─────────────────────────────────────────────────┤
│            │                                                 │
│ SIDEBAR    │              MAIN WORKSPACE                    │
│            │                                                 │
│            │                                                 │
│            │                                                 │
└────────────┴─────────────────────────────────────────────────┘
```

Target viewport:

```text
1440 × 900
```

Support:

```text
1920 × 1080
1280 × 800
Tablet
```

---

# 7. SIDEBAR

Width:

```text
Collapsed: 68px
Expanded: 220px
```

Navigation:

```text
◉ Mission Control
◉ Satellite Analysis
◉ Cyclone Prediction
◉ Historical Cases
◉ Model Performance
◉ Data Sources
```

Bottom section:

```text
SYSTEM STATUS

● DATA PIPELINE ONLINE

MODEL
v0.1.0
```

Use Lucide icons.

Sidebar should remain visually minimal.

---

# 8. TOP HEADER

Left:

```text
CYCLONE AI
North Indian Ocean Monitoring
```

Center:

```text
ACTIVE SYSTEMS: 03
```

Right:

```text
● DATA LIVE
28 SEP 2026
16:07 UTC
```

Data-source status:

```text
INSAT     ●
IR        ●
VIS       ●
MW        ●
```

If running mock data:

```text
DEMO MODE
SIMULATED DATA
```

must be clearly visible.

---

# 9. MISSION CONTROL DASHBOARD

Mission Control is the primary screen.

Use a 12-column CSS grid.

Recommended structure:

```text
┌───────────────┬───────────────────────────┬──────────────────┐
│ ACTIVE        │                           │ CURRENT          │
│ SYSTEMS       │                           │ ANALYSIS         │
│               │                           │                  │
│ AI EVENTS     │        LIVE MAP           │ STRUCTURE        │
│               │                           │                  │
├───────────────┤                           ├──────────────────┤
│ SELECTED      │                           │ PREDICTION       │
│ CYCLONE       │                           │                  │
│               │                           │                  │
└───────────────┴───────────────────────────┴──────────────────┘
```

Recommended proportions:

```text
Left:   2.5 columns
Center: 6 columns
Right:  3.5 columns
```

The map must remain the largest visual element.

---

# 10. ACTIVE CYCLONES PANEL

Title:

**ACTIVE SYSTEMS**

Example structure:

```text
● SYSTEM 01
  Severe Cyclonic Storm
  15.42°N 87.31°E
  145 kt
  ↗ NW

● SYSTEM 02
  Cyclonic Storm
  13.18°N 91.02°E
  72 kt
  → WNW
```

Selected system:

* Blue left border
* Slightly brighter background
* Clear selected state

Clicking a cyclone updates:

* Map
* Satellite imagery
* Current observations
* Temporal analysis
* Prediction
* Alerts
* Charts

---

# 11. AI EVENTS PANEL

Title:

**AI EVENTS**

Do not call these official warnings.

Example:

```text
⚠ RAPID INTENSIFICATION SIGNAL

Increasing convective organization
detected over the last 6 hours.

Confidence
82%

16:02 UTC
```

Other event types:

```text
● Eye formation detected

● Central pressure decreasing

● Track deviation detected

● Data quality warning

● Strong convective organization detected
```

Each event must contain:

* Icon
* Severity
* Description
* Timestamp
* Confidence when applicable

---

# 12. INTERACTIVE MAP

Use:

**MapLibre GL** or **React-Leaflet**

Preferred:

**MapLibre GL**

Map must support:

```text
Current Track
Predicted Track
Uncertainty Cone
Wind Field
Precipitation
SST
Administrative Boundaries
Satellite Overlay
```

Map controls:

```text
LAYERS

☑ Current Track
☑ Predicted Track
☑ Uncertainty Cone
☐ Wind Field
☐ Precipitation
☐ SST
☐ Administrative Boundaries
☐ Satellite Overlay
```

---

# 13. MAP TRACK VISUALIZATION

Observed track:

```text
Solid cyan/white line
```

Predicted track:

```text
Dashed blue line
```

Uncertainty:

```text
Semi-transparent blue cone/polygon
```

Forecast points:

```text
+6h
+12h
+24h
+48h
```

Clicking a forecast point displays:

```text
FORECAST +24H

LAT
17.23°N

LON
82.11°E

WIND
132 kt

CONFIDENCE
76%
```

---

# 14. MAP LEGEND

Always show:

```text
● Current Position
━━ Observed Track
- - Predicted Track
░░ Prediction Uncertainty
○ Forecast Point
↗ Movement Direction
```

---

# 15. CURRENT OBSERVATION PANEL

Title:

**CURRENT OBSERVATION**

Primary metrics:

```text
145 kt
MAX SUSTAINED WIND

920 hPa
CENTRAL PRESSURE
```

Location:

```text
15.42°N
LATITUDE

087.31°E
LONGITUDE
```

Additional:

```text
MOVEMENT       NW
SPEED          14 kt
CATEGORY       VERY SEVERE
```

Use large numerical typography.

---

# 16. CYCLONE STRUCTURAL ANALYSIS

Title:

**STRUCTURAL ANALYSIS**

Show:

```text
CIRCULATION       ✓ DETECTED
CDO               ✓ STRONG
SPIRAL BANDS      ✓ ORGANIZED
EYE               ✓ DETECTED
EYE SYMMETRY      ✓ HIGH
CONVECTION        ✓ STRONG
```

Use compact status chips.

Possible states:

```text
✓ DETECTED
✓ STRONG
◐ DEVELOPING
⚠ WEAK
— UNAVAILABLE
```

---

# 17. SATELLITE ANALYSIS PAGE

Create four primary tabs:

```text
[ IR ] [ VISIBLE ] [ MICROWAVE ] [ FUSED ]
```

The four tabs must use the same geographic region and synchronized timestamp.

---

# 18. IR SATELLITE VIEW

Display:

* Infrared satellite image
* Cloud-top temperature scale
* Cyclone centre
* CDO boundary
* Eye region
* Convection regions
* Geographic coordinates

Side analytics:

```text
IR ANALYSIS

Cloud-top Temperature
-72°C

CDO Area
18,420 km²

Eye
Detected

Convection
Strong
```

---

# 19. VISIBLE SATELLITE VIEW

Display:

* Visible satellite image
* Spiral bands
* Cloud organization
* Eye
* Symmetry
* Cyclone centre

Side analytics:

```text
VISIBLE ANALYSIS

Cloud Organization
High

Spiral Structure
Strong

Eye
Detected

Symmetry
0.86
```

---

# 20. MICROWAVE SATELLITE VIEW

Display:

* Microwave imagery
* Internal storm structure
* Eyewall
* Rainband structure
* Low-level circulation

Side analytics:

```text
MICROWAVE ANALYSIS

Eyewall
Organized

Low-Level Centre
Detected

Rainband Structure
Strong
```

---

# 21. FUSED SATELLITE VIEW

This is a core product feature.

Do not simply display three images side by side.

Visualize the fusion process:

```text
IR
       ──────────┐
VISIBLE           ├──→ MULTI-SOURCE FUSION
       ──────────┤
MICROWAVE        ┘
                       ↓
                AI FEATURE FUSION
                       ↓
              CYCLONE ANALYSIS
```

Display:

```text
FUSED SATELLITE ANALYSIS

IR
█████████░

VISIBLE
████████░░

MICROWAVE
█████████░
```

If source contribution values are not available from the backend, label them:

```text
CONTRIBUTION DATA UNAVAILABLE
```

Do not fabricate scientific values.

---

# 22. TEMPORAL ANALYSIS

Create a prominent timeline.

```text
T-12h       T-9h       T-6h       T-3h       NOW
  ●──────────●──────────●──────────●──────────●
```

Controls:

```text
◀
▶
PLAY
SPEED 1×
```

Moving through time must update:

* IR image
* Visible image
* Microwave image
* Cyclone centre
* Structural parameters
* Intensity
* Pressure
* Track
* Prediction context

All satellite views must remain time-synchronized.

---

# 23. TEMPORAL EVOLUTION PANEL

Title:

**6-HOUR EVOLUTION**

Display:

```text
WIND
132 → 145 kt
↑ +13 kt

PRESSURE
934 → 920 hPa
↓ -14 hPa

CDO AREA
+18%

EYE SYMMETRY
+11%

CLOUD-TOP TEMPERATURE
-4°C
```

Use trend arrows.

---

# 24. PREDICTION PAGE

Create three primary tabs:

```text
[ TRACK ] [ INTENSITY ] [ PATTERN EVOLUTION ]
```

---

# 25. TRACK PREDICTION

Show:

* Current position
* Historical track
* AI predicted track
* Uncertainty cone
* Forecast points
* Movement direction

Forecast table:

```text
TIME     LAT       LON       WIND       CONFIDENCE

+6h      --        --        --         --
+12h     --        --        --         --
+24h     --        --        --         --
+48h     --        --        --         --
```

Do not fabricate values.

Use real backend data when available.

---

# 26. INTENSITY PREDICTION

Use a professional scientific chart.

X-axis:

```text
NOW → 6h → 12h → 24h → 48h
```

Y-axis:

```text
Wind Speed
```

Display:

* Historical observations
* Current observation
* Model prediction
* Prediction interval

Example structure:

```text
Observed ─────
Prediction - - - -
Confidence band ░░░░
```

Metric summary:

```text
CURRENT
145 kt

PREDICTED +24h
--

PREDICTION INTERVAL
--
```

---

# 27. PATTERN EVOLUTION PREDICTION

Display satellite thumbnails across time:

```text
CURRENT
   ↓
+6 HOURS
   ↓
+12 HOURS
   ↓
+24 HOURS
```

Example pattern sequence:

```text
Spiral Bands
      ↓
Organized CDO
      ↓
Eye Development
      ↓
Mature Structure
```

Below:

```text
MODEL ASSESSMENT

Pattern Transition
ORGANIZING → INTENSIFYING

Confidence
--
```

Use actual model output when available.

---

# 28. AI EXPLAINABILITY

Create:

**WHY DID THE MODEL PREDICT THIS?**

Show feature contribution:

```text
CLOUD ORGANIZATION
█████████░

EYE STRUCTURE
████████░░

CONVECTION
████████░░

SST
██████░░░░

WIND SHEAR
█████░░░░░
```

For image explainability support:

```text
[ ORIGINAL ]
[ HEATMAP ]
[ OVERLAY ]
```

If supported by the backend, integrate:

* Grad-CAM
* SHAP
* Attention maps

Display:

```text
ORIGINAL SATELLITE IMAGE
          ↓
AI ATTENTION MAP
          ↓
IMPORTANT CYCLONE REGION
```

Do not fabricate explainability results.

If unavailable:

```text
EXPLAINABILITY DATA NOT AVAILABLE
```

---

# 29. DATA QUALITY PANEL

Title:

**DATA INTEGRITY**

Display:

```text
IR
✓ VALID

VISIBLE
✓ VALID

MICROWAVE
✓ VALID

TIMESTAMP
✓ SYNCHRONIZED

GEOLOCATION
✓ VERIFIED

MISSING PIXELS
--

RESOLUTION
--

SOURCE
--
```

Possible states:

```text
✓ VALID
⚠ DEGRADED
✕ INVALID
— UNAVAILABLE
```

---

# 30. PREPROCESSING STATUS

Create an expandable pipeline:

```text
RAW SATELLITE DATA
        ↓
QUALITY CHECK
        ↓
GEOREFERENCING
        ↓
IMAGE ALIGNMENT
        ↓
RESIZING
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

Each step must have:

```text
Status
Processing Time
Input
Output
```

---

# 31. FEATURE EXTRACTION PANEL

Display extracted cyclone parameters:

```text
CYCLONE FEATURES

Centre Latitude
--

Centre Longitude
--

Cloud-top Temperature
--

CDO Area
--

Cloud Symmetry
--

Spiral Band Curvature
--

Eye Presence
--

Eye Diameter
--

Eye Temperature
--

Eyewall Structure
--

Convection Strength
--

Dvorak T / CI
--

Maximum Sustained Wind
--

Central Pressure
--

SST
--

Vertical Wind Shear
--
```

---

# 32. HISTORICAL VALIDATION PAGE

Title:

**HISTORICAL VALIDATION**

Filters:

```text
REGION
[ North Indian Ocean ]

YEAR
[ All ]

CYCLONE
[ All ]

MODEL
[ CycloneAI ]
```

Metrics:

```text
TRACK ERROR
--

INTENSITY MAE
--

CLASSIFICATION F1
--

DETECTION F1
--
```

Do not show fake values.

Use:

```text
NOT CALCULATED
```

until backend evaluation is available.

---

# 33. PREDICTION VS REFERENCE

Show:

```text
AI PREDICTION
        VS
REFERENCE / BEST TRACK
```

Visualize:

```text
Observed Track
━━━━━━━━━━━━━━

Predicted Track
- - - - - - - -
```

Include:

* Position error
* Track deviation
* Intensity error
* Timing error

---

# 34. HISTORICAL CASE REPLAY

Allow:

```text
SELECT HISTORICAL CASE

[ Cyclone ]

[ LOAD CASE ]
```

Then show:

```text
◀──── TIMELINE ────▶

Satellite
Track
Intensity
Pattern
Prediction
Reference
```

Playback controls:

```text
◀
▶
PLAY
1×
2×
4×
```

---

# 35. DATA SOURCES PAGE

Title:

**DATA SOURCES**

Structure:

```text
SATELLITE SOURCES

IR
Status: --

VISIBLE
Status: --

MICROWAVE
Status: --

HISTORICAL REFERENCE

IBTrACS
Status: --

METEOROLOGICAL VARIABLES

SST
Status: --

WIND SHEAR
Status: --

PRESSURE
Status: --
```

Each source should support:

* Source name
* Data type
* Last update
* Resolution
* Temporal coverage
* Geographic coverage
* Status

---

# 36. MODEL PERFORMANCE PAGE

Show:

```text
MODEL PERFORMANCE

DETECTION

Precision     --
Recall        --
F1 Score      --

CLASSIFICATION

Accuracy      --
Precision     --
Recall        --
F1 Score      --

TRACK

MAE           --
RMSE          --

INTENSITY

MAE           --
RMSE          --
```

Add charts for:

```text
Prediction Error Over Time
Model Performance by Cyclone
Performance by Intensity Category
```

---

# 37. FORECAST / MODEL COMPARISON

Use a flexible component:

**MODEL COMPARISON**

Do not hard-code unavailable external models.

Example:

```text
CYCLONE AI
MODEL A
MODEL B
REFERENCE
```

Allow models to be dynamically added through backend configuration.

Use:

```text
Observed
Model Prediction
Reference
Uncertainty
```

Do not fabricate external forecast data.

---

# 38. AI EVENT DETAILS

Clicking an AI event opens:

```text
EVENT DETAILS

Rapid Intensification Signal

Detected:
16:02 UTC

Observation Window:
T-6h → NOW

Supporting Signals:

✓ Increased convection
✓ Increased cloud organization
✓ Pressure decrease
✓ Eye organization

Model Confidence:
--

Status:
ANALYSIS ONLY
```

---

# 39. SEARCH

Global search should support:

```text
Cyclone name
Cyclone ID
Region
Date
Historical case
Satellite observation
```

Example:

```text
Search cyclone, location, case...
```

---

# 40. NOTIFICATION CENTRE

Compact notification drawer:

```text
AI EVENTS
──────────────

● Eye formation detected
16:02 UTC

⚠ Rapid intensification signal
15:47 UTC

● New satellite observation
15:30 UTC

⚠ Data quality degraded
15:22 UTC
```

---

# 41. DEMO MODE

Provide a visible:

```text
DEMO MODE
```

indicator.

When active:

```text
SIMULATED DATA
```

must always be visible in the header.

Demo data must never be presented as live operational data.

---

# 42. MOCK DATA ARCHITECTURE

Separate UI from data.

Use:

```text
/mock
    cyclones.ts
    satellite.ts
    observations.ts
    predictions.ts
    temporal.ts
    validation.ts
    events.ts

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

The UI must consume typed interfaces.

Suggested interfaces:

```text
Cyclone
SatelliteObservation
CycloneObservation
CycloneFeature
Prediction
ForecastPoint
PredictionInterval
TemporalObservation
ValidationMetric
AIEvent
DataQuality
```

---

# 43. COMPONENT ARCHITECTURE

Use reusable components:

```text
/components

layout/
    AppShell
    Sidebar
    TopHeader

dashboard/
    ActiveCyclones
    AIEvents
    CurrentObservation
    StructuralAnalysis
    MissionMap

satellite/
    SatelliteViewer
    IRViewer
    VisibleViewer
    MicrowaveViewer
    FusionViewer
    SatelliteControls
    DataQuality

temporal/
    Timeline
    TemporalReplay
    EvolutionMetrics

prediction/
    TrackPrediction
    IntensityPrediction
    PatternEvolution
    UncertaintyCone

analytics/
    MetricCard
    TrendMetric
    FeatureContribution
    ConfidenceIndicator
    TimeSeriesChart

validation/
    ValidationMetrics
    PredictionComparison
    HistoricalReplay

ui/
    StatusBadge
    DataBadge
    ScientificTooltip
    EmptyState
    Skeleton
```

---

# 44. LOADING STATES

Use skeleton loaders.

Do not use large spinning loaders.

Example:

```text
Satellite image
████████████████
████████████████
████████████████
```

Use subtle shimmer.

---

# 45. ERROR STATES

Professional error messages.

Example:

```text
SATELLITE DATA UNAVAILABLE

Unable to retrieve microwave observation
for the selected timestamp.

[ Retry ]
```

Do not show raw API errors.

---

# 46. EMPTY STATES

Example:

```text
NO ACTIVE CYCLONE SELECTED

Select a system from the Active Systems
panel to begin analysis.
```

---

# 47. TOOLTIP SYSTEM

Scientific parameters must have explanatory tooltips.

Example:

```text
Central Pressure ⓘ
```

Tooltip:

```text
Atmospheric pressure near the cyclone centre.
```

Also support:

```text
Dvorak T-number
CDO
SST
Vertical Wind Shear
Cloud-top Temperature
Prediction Interval
```

---

# 48. RESPONSIVE DESIGN

Desktop-first.

## Desktop

```text
Sidebar
+
Main Map
+
Analytics
```

## Tablet

```text
Sidebar
+
Map
+
Bottom Analytics Drawer
```

## Mobile

Show:

```text
Current Cyclone
↓
Map
↓
Current Observation
↓
Prediction
↓
AI Events
```

Do not attempt to reproduce the entire desktop operations centre on mobile.

---

# 49. ACCESSIBILITY

Implement:

* Keyboard navigation
* Visible focus states
* ARIA labels
* Chart descriptions
* Sufficient contrast
* Screen-reader labels
* Icon + text status
* Color-independent warnings
* Accessible map controls
* Accessible timeline controls

Never communicate state with colour alone.

---

# 50. ANIMATION SYSTEM

Use:

```text
150–200ms
ease-out
```

Allowed:

* Fade
* Slide
* Number transitions
* Map marker movement
* Timeline transitions
* Panel transitions

Avoid:

* Bouncing
* Flashing
* Particle effects
* Large animated gradients
* Excessive motion
* Decorative animations

---

# 51. MAP PERFORMANCE

The map must remain responsive.

Use:

* Layer toggling
* Lazy-loaded satellite overlays
* Efficient GeoJSON
* Memoized markers
* Canvas rendering where appropriate
* Viewport-based rendering

Avoid rendering thousands of DOM markers.

---

# 52. CHART DESIGN

Charts must be scientific and minimal.

Use:

* Thin lines
* Subtle grid
* Clear axis labels
* Scientific units
* Interactive tooltips
* Reference lines
* Confidence intervals
* Observed vs predicted differentiation

Avoid:

* 3D charts
* Pie charts for scientific data
* Excessive colors
* Decorative chart effects

---

# 53. CORE HOME SCREEN INFORMATION HIERARCHY

The user's eye should follow:

```text
1. WHAT IS HAPPENING?
   ↓
Current cyclone + location

2. HOW STRONG IS IT?
   ↓
Wind + pressure + structure

3. WHAT IS IT DOING?
   ↓
Movement + temporal evolution

4. WHAT MAY HAPPEN?
   ↓
Track + intensity + pattern prediction

5. HOW CERTAIN IS THE MODEL?
   ↓
Confidence + uncertainty

6. WHY?
   ↓
Satellite evidence + explainability

7. HOW GOOD IS THE MODEL?
   ↓
Historical validation
```

---

# 54. MAIN DASHBOARD CONTENT ORDER

Top-to-bottom priority:

```text
HEADER
↓
ACTIVE SYSTEM + STATUS
↓
MAP + TRACK
↓
CURRENT OBSERVATION
↓
STRUCTURAL ANALYSIS
↓
SATELLITE SOURCES
↓
TEMPORAL EVOLUTION
↓
PREDICTION
↓
CONFIDENCE
↓
VALIDATION
```

---

# 55. SCIENTIFIC DATA RULES

Never fabricate:

* Live satellite observations
* IMD forecasts
* Official warnings
* Model accuracy
* Confidence values
* External forecast values
* Validation metrics
* Data-source status

If unavailable, display:

```text
--
```

or:

```text
NOT AVAILABLE
```

For demonstration-only data:

```text
DEMO DATA
```

must be clearly displayed.

---

# 56. IMPORTANT PRODUCT POSITIONING

The platform is:

```text
AI-ASSISTED CYCLONE ANALYSIS
```

It is not:

```text
OFFICIAL WARNING SYSTEM
```

It provides:

```text
OBSERVATION
+
CLASSIFICATION
+
TEMPORAL ANALYSIS
+
PREDICTION
+
UNCERTAINTY
+
EXPLAINABILITY
+
VALIDATION
```

---

# 57. FINAL DEMO FLOW

The complete demonstration should be possible in under 90 seconds.

## Step 1

Open:

**Mission Control**

Immediately show:

```text
Active Cyclone
Current Location
Current Intensity
Movement
```

## Step 2

Select cyclone.

Map zooms to cyclone.

## Step 3

Open:

**Satellite Analysis**

Show:

```text
IR
VISIBLE
MICROWAVE
FUSED
```

## Step 4

Start:

**Temporal Replay**

Show cyclone structure evolving over time.

## Step 5

Open:

**Prediction**

Show:

```text
Observed Track
+
AI Predicted Track
+
Uncertainty Cone
```

## Step 6

Open:

**Intensity Prediction**

Show:

```text
Historical
Current
Predicted
Prediction Interval
```

## Step 7

Open:

**Explainability**

Show:

```text
Satellite Image
+
AI Attention / Feature Contribution
```

## Step 8

Open:

**Historical Validation**

Show:

```text
AI Prediction
vs
Reference / Best Track
```

---

# 58. PRIMARY UX STORY

The interface must visually communicate:

```text
WHERE IS THE CYCLONE?
        ↓
WHAT DOES IT LOOK LIKE?
        ↓
HOW STRONG IS IT?
        ↓
HOW IS IT CHANGING?
        ↓
WHAT MAY HAPPEN NEXT?
        ↓
HOW CERTAIN IS THE PREDICTION?
        ↓
WHY DID THE MODEL SAY THAT?
        ↓
HOW WELL HAS IT PERFORMED?
```

---

# 59. FINAL DESIGN PRINCIPLE

Build the interface around:

**SOURCE → OBSERVE → UNDERSTAND → PREDICT → EXPLAIN → VALIDATE**

The final product must feel like a serious scientific monitoring platform rather than a generic AI dashboard.

The map, satellite imagery, temporal analysis, prediction visualization, uncertainty, and validation must be the visual centre of the application.

Use real backend values when available.

Use clearly labelled DEMO DATA when using mock data.

Never present fabricated scientific information as real.

```
```
