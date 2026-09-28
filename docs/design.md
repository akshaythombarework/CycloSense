````markdown
# DESIGN.md

# Cyclone AI — Platform Design System & UI Specification

## 1. Design Objective

Cyclone AI is a professional meteorological analysis and decision-support platform for tropical cyclone monitoring, satellite analysis, temporal analysis, prediction, explainability, and historical validation.

The interface must feel like **specialized scientific and geospatial software**, not a consumer application, marketing website, SaaS dashboard, or AI-generated prototype.

The design priorities are:

1. Scientific clarity
2. Information density
3. Operational usability
4. Accurate representation of uncertainty
5. Clear separation of observed and predicted data
6. Consistent geospatial visualization
7. Data provenance and transparency
8. Fast visual comprehension
9. Accessibility
10. Professional visual restraint

Do not add decorative UI elements unless they serve a clear functional purpose.

---

# 2. Product Character

The visual character should be:

- Technical
- Scientific
- Precise
- Calm
- Operational
- Data-centric
- Geospatial
- Professional

The product should resemble software used in:

- Meteorological operations centres
- Scientific research environments
- Geospatial analysis systems
- Disaster-management control rooms
- Earth-observation platforms

It should not resemble:

- A marketing website
- A generic analytics SaaS product
- A futuristic cyberpunk interface
- A gaming dashboard
- A cryptocurrency dashboard
- A generic "AI dashboard"

---

# 3. Core Design Principle

The interface must communicate the following workflow visually:

```text
OBSERVE
   ↓
VERIFY
   ↓
ANALYZE
   ↓
COMPARE
   ↓
PREDICT
   ↓
QUANTIFY UNCERTAINTY
   ↓
EXPLAIN
   ↓
VALIDATE
````

Every major screen should make it clear:

* What data is being viewed
* When it was observed
* Where it came from
* What has been calculated
* What is predicted
* What is uncertain
* What the model is using

---

# 4. Application Structure

The application uses a persistent desktop-oriented shell.

```text
┌───────┬────────────────────────────────────────────────────────────┐
│       │ Header                                                     │
│       ├────────────────────────────────────────────────────────────┤
│ Side  │                                                            │
│ bar   │                    Workspace                               │
│       │                                                            │
│       │                                                            │
└───────┴────────────────────────────────────────────────────────────┘
```

## Sidebar

Width:

```text
64px – 72px
```

## Header

Height:

```text
52px – 60px
```

## Main workspace

Use the remaining viewport without unnecessary outer whitespace.

The primary desktop target is:

```text
1440 × 900
```

The interface must also remain usable at:

```text
1280 × 800
```

---

# 5. Design Tokens

All colours, spacing, typography, borders, and component dimensions must be defined centrally.

Do not scatter arbitrary values throughout components.

---

## 5.1 Background Colours

```text
--background:          #0B1120
--surface:             #111827
--surface-secondary:   #172033
--surface-elevated:    #1E293B
```

Use:

```text
#0B1120
```

as the application background.

Use surfaces only where visual grouping is necessary.

---

## 5.2 Border Colours

```text
--border:              #263449
--border-strong:       #334155
--divider:             #1E293B
```

Borders should be subtle and sharp.

Default:

```css
border: 1px solid #263449;
```

Do not use heavy shadows as the primary method of separation.

---

## 5.3 Text Colours

```text
--text-primary:        #F8FAFC
--text-secondary:      #CBD5E1
--text-muted:          #94A3B8
--text-disabled:       #64748B
--text-data:           #E2E8F0
```

Do not use pure white for every element.

Hierarchy should come from:

* contrast
* size
* weight
* spacing

---

# 6. Semantic Colours

```text
--status-normal:       #22C55E
--status-info:         #38BDF8
--status-prediction:   #60A5FA
--status-warning:      #F59E0B
--status-critical:     #EF4444
--status-ri:           #F43F5E
--status-reference:    #A78BFA
--status-unavailable:  #64748B
```

Semantic colours must be consistent throughout the application.

Never use colour as the only indication of state.

Always combine:

```text
Icon + Label + Colour
```

Example:

```text
● ACTIVE
```

not just a green dot.

---

# 7. Typography

## Primary Typeface

Use:

```text
Inter
```

Fallback:

```text
system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

## Data Typeface

Use:

```text
JetBrains Mono
```

Use monospace for:

* Coordinates
* Wind
* Pressure
* Temperature
* Timestamps
* Model values
* Numerical tables
* Dataset identifiers
* Version numbers

Example:

```text
15.42°N
087.31°E
145 kt
920 hPa
16:42 UTC
```

---

# 8. Typography Scale

Keep typography compact.

```text
Application title     20–24px
Page title            18–22px
Section title         13–15px
Panel label           10–12px
Body                  12–14px
Secondary text        11–12px
Scientific value      20–32px
Table text            11–13px
```

Use font weights deliberately:

```text
400  Regular
500  Medium
600  Semibold
```

Avoid excessive bold text.

---

# 9. Text Treatment

Use uppercase selectively for:

* Section labels
* Operational states
* Metadata
* Data-source labels
* Status indicators

Do not write normal explanatory text in uppercase.

Use sentence case for descriptions.

---

# 10. Spacing

Use a consistent 4px spacing system.

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

Preferred internal panel padding:

```text
12px – 16px
```

Do not introduce random spacing values unless required for a specific visualization.

---

# 11. Border Radius

Use restrained rounding.

```text
Panels:        4–6px
Buttons:       4–5px
Inputs:        4–5px
Badges:        3–4px
```

Avoid highly rounded containers.

Do not use large pill-shaped containers for ordinary interface elements.

---

# 12. Shadows

Default:

```text
No shadow
```

Use very subtle shadows only for:

* Dropdown menus
* Context menus
* Dialogs
* Floating map controls

Do not place a shadow around every panel.

---

# 13. Panels

Panels are functional containers, not decorative cards.

Preferred structure:

```text
┌──────────────────────────────────────┐
│ SECTION TITLE                 ACTION │
├──────────────────────────────────────┤
│                                      │
│ Content                              │
│                                      │
└──────────────────────────────────────┘
```

Panel headers should have a consistent height and divider.

Avoid nested panels unless the content genuinely requires hierarchy.

Avoid:

```text
Card
  → Card
      → Card
```

---

# 14. Sidebar

The sidebar is persistent.

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

Icon size:

```text
18–20px
```

Selected navigation state:

* Slightly brighter background
* Brighter text
* Accent indicator on the left
* Accent icon

Do not use glowing effects.

Bottom section:

```text
SYSTEM

● PIPELINE ONLINE

MODEL
v0.1.0
```

If running with mock data:

```text
DEMO MODE
SIMULATED DATA
```

must remain visible.

---

# 15. Header

The header should be compact and information-oriented.

Left:

```text
CYCLONE AI
Multi-Source Tropical Cyclone Intelligence
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

The header should never become a marketing banner.

---

# 16. Navigation Architecture

Navigation should represent user tasks rather than technical implementation.

Primary sections:

```text
1. Mission Control
2. Satellite Analysis
3. Prediction
4. Historical Cases
5. Model Performance
6. Data Sources
```

Each section must retain the same global shell.

Do not redesign the navigation separately for each page.

---

# 17. Mission Control

Mission Control is the primary operational workspace.

Use a 12-column grid.

Preferred structure:

```text
┌────────────────┬──────────────────────────────┬────────────────┐
│ Active Systems │                              │ Current        │
│                │                              │ Observation   │
│ Recent Events  │            MAP               │                │
│                │                              │ Structure      │
│                │                              │                │
├────────────────┤                              ├────────────────┤
│ Selected       │                              │ Prediction     │
│ System         │                              │ Summary        │
└────────────────┴──────────────────────────────┴────────────────┘
```

The map must remain the dominant visual component.

---

# 18. Active Systems

Display active cyclones as a compact list.

Example:

```text
● SYSTEM 01

Severe Cyclonic Storm
15.42°N 087.31°E

145 kt
NW / 14 kt
```

Do not create oversized cyclone cards.

Selected system:

```text
border-left: 2px solid #38BDF8;
background: #111827;
```

---

# 19. Event Feed

Events should be chronological.

Example:

```text
16:02 UTC
RAPID INTENSIFICATION SIGNAL

Increasing convective organization
detected over observation window.
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

Use subtle status indicators.

Do not create large warning banners for every event.

---

# 20. Interactive Map

The map is the primary spatial visualization.

Preferred implementation:

```text
MapLibre GL
```

Alternative:

```text
React-Leaflet
```

Map controls must be compact.

Supported layers:

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

# 21. Map Visual Rules

## Observed track

```text
Solid cyan line
```

## Predicted track

```text
Dashed blue line
```

## Reference track

```text
Thin violet/neutral line
```

## Uncertainty

```text
Transparent blue polygon/cone
```

## Current cyclone

Use a small, high-contrast marker.

Do not use oversized glowing markers.

---

# 22. Map Legend

Keep the legend compact.

```text
━━ OBSERVED
- - PREDICTED
░░ UNCERTAINTY
● CURRENT
○ FORECAST
```

The legend must not obscure important geographic information.

---

# 23. Map Controls

Controls should include only necessary actions.

Example:

```text
+ 
−
Locate
Layers
Fullscreen
```

Use standard control placement.

Do not cover the map with multiple floating toolbars.

---

# 24. Current Observation

Use scientific data blocks.

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

Values use JetBrains Mono.

---

# 25. Structural Analysis

Use a compact analytical table.

```text
STRUCTURAL ANALYSIS

CIRCULATION       DETECTED
CDO               STRONG
SPIRAL BANDS      ORGANIZED
EYE               DETECTED
EYE SYMMETRY      HIGH
CONVECTION        STRONG
```

Avoid converting every parameter into a separate large card.

---

# 26. Satellite Analysis

Satellite Analysis is a dedicated workspace.

Primary modes:

```text
IR
VISIBLE
MICROWAVE
FUSED
```

The selected mode should be clearly indicated.

The satellite image must receive most of the available workspace.

---

# 27. Satellite Viewer

Structure:

```text
┌─────────────────────────────────────────────┐
│ IR                         16:00 UTC        │
├─────────────────────────────────────────────┤
│                                             │
│                                             │
│              SATELLITE IMAGE                │
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│ Scale                     Coordinates       │
└─────────────────────────────────────────────┘
```

Do not place the image inside multiple nested cards.

---

# 28. Satellite Toolbar

Toolbar may contain:

```text
Layer
Timestamp
Zoom
Contrast
Opacity
Fullscreen
Metadata
```

Controls must remain compact.

Do not turn the toolbar into a large control panel.

---

# 29. Satellite Metadata

Always provide access to:

```text
Source
Timestamp
Resolution
Coverage
Processing status
Geolocation status
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

---

# 30. Satellite Parameters

## Infrared

```text
Cloud-top Temperature
CDO Area
Eye Presence
Convection
```

## Visible

```text
Cloud Organization
Spiral Structure
Eye
Symmetry
```

## Microwave

```text
Eyewall
Low-level Centre
Rainband Structure
```

Values must come from actual data or clearly labelled demo data.

---

# 31. Multi-Source Fusion

The interface should communicate the relationship between the satellite sources.

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

Do not use decorative AI graphics.

The fusion interface should be explanatory and data-oriented.

---

# 32. Temporal Analysis

Temporal analysis is a core feature.

Use a persistent timeline.

```text
T-12h ─── T-9h ─── T-6h ─── T-3h ─── NOW
```

Controls:

```text
◀   PLAY   ▶   1×
```

Changing the timestamp must update synchronized views.

At minimum:

```text
Satellite Image
Map Position
Track
Wind
Pressure
Structure
Features
```

---

# 33. Temporal Synchronization

All relevant visualizations should reference a shared timestamp.

When the user moves:

```text
T-6h → NOW
```

the following should update together:

```text
Satellite image
Cyclone centre
Map marker
Observation values
Structural analysis
Feature values
Chart cursor
Event feed
```

Do not allow different screens to silently display different timestamps.

---

# 34. Temporal Evolution

Show changes numerically.

Example:

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

Use restrained trend indicators.

---

# 35. Prediction Workspace

Prediction should clearly separate:

```text
OBSERVED
PREDICTED
REFERENCE
UNCERTAINTY
```

Primary sections:

```text
Track
Intensity
Pattern
Uncertainty
```

---

# 36. Track Prediction

Show:

```text
Observed track
Predicted track
Uncertainty cone
Forecast points
```

Forecast table:

```text
TIME     LAT      LON      WIND      UNCERTAINTY
+6h      --       --       --        --
+12h     --       --       --        --
+24h     --       --       --        --
+48h     --       --       --        --
```

Never imply that predicted coordinates are exact.

---

# 37. Intensity Prediction

Chart requirements:

* Observed line
* Predicted line
* Prediction interval
* Current marker
* Axis units
* Tooltip
* Timestamp

Example structure:

```text
Wind Speed (kt)

160 ┤
150 ┤             - - - -
140 ┤       ●─────
130 ┤    ●
120 ┤ ●
    └────────────────────────
      NOW  6h  12h  24h  48h
```

Avoid decorative gradients.

---

# 38. Pattern Evolution

Show satellite snapshots over time.

```text
CURRENT       +6H          +12H         +24H

[ IMAGE ]    [ IMAGE ]    [ IMAGE ]    [ IMAGE ]

Spiral       Organized     Eye          Mature
Bands        CDO           Formation    Structure
```

This view should communicate structural evolution.

---

# 39. Uncertainty

Uncertainty must never be hidden.

Track prediction:

```text
Prediction line
+
Uncertainty cone
```

Intensity prediction:

```text
Prediction line
+
Prediction interval
```

Use transparent fills rather than opaque shapes.

Do not make uncertainty visually stronger than the prediction itself.

---

# 40. Explainability

Create a dedicated model interpretation section.

Example:

```text
MODEL INTERPRETATION

CLOUD ORGANIZATION    ████████
EYE STRUCTURE         ███████
CONVECTION             ███████
SST                    █████
WIND SHEAR             ████
```

Where available, support:

```text
SHAP
Grad-CAM
Feature contribution
Attention/importance maps
```

If explanation data is unavailable:

```text
EXPLAINABILITY DATA
NOT AVAILABLE
```

Never fabricate model explanations.

---

# 41. Feature Table

Use a scientific data table.

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

Numerical values should be right-aligned.

---

# 42. Data Quality

Create a dedicated integrity section.

```text
DATA INTEGRITY

IR             VALID
VISIBLE        VALID
MICROWAVE      VALID
TIMESTAMP      SYNCHRONIZED
GEOLOCATION    VERIFIED
MISSING DATA   --
```

Supported states:

```text
VALID
DEGRADED
INVALID
UNAVAILABLE
```

Use both text and colour.

---

# 43. Processing Status

The system should make preprocessing visible where relevant.

Pipeline:

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

Each stage may expose:

```text
Status
Input
Output
Processing time
```

Do not expose unnecessary engineering details in the main operational view.

---

# 44. Historical Cases

Historical cases should use a professional data table.

Filters:

```text
Year
Region
Cyclone
Intensity
Date Range
```

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

Use compact rows.

Avoid large historical-case cards.

---

# 45. Historical Replay

A historical cyclone should be replayable.

Views:

```text
Satellite
Track
Intensity
Structure
Prediction
Reference
```

Timeline:

```text
◀ ─────────────── ● ─────────────── ▶
```

Playback:

```text
1×
2×
4×
```

---

# 46. Model Performance

Use scientific metrics.

Detection:

```text
Precision
Recall
F1
```

Classification:

```text
Accuracy
Precision
Recall
F1
```

Track:

```text
MAE
RMSE
```

Intensity:

```text
MAE
RMSE
```

Charts may show:

* Prediction error over time
* Performance by cyclone
* Performance by intensity category
* Observed vs predicted intensity
* Track error distribution

Never display fabricated performance metrics.

---

# 47. Model Comparison

Support comparison between configured models.

Example:

```text
CYCLONE AI
MODEL A
MODEL B
REFERENCE
```

Comparison should use the same dataset and evaluation period where applicable.

Do not visually declare a "winner".

Present the measurements neutrally.

---

# 48. Data Sources

Provide a source registry.

```text
DATA SOURCES

INFRARED
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

Historical data:

```text
REFERENCE DATA
Source: --
Coverage: --
Period: --
```

---

# 49. Data Provenance

Important data must expose provenance.

Minimum metadata:

```text
Source
Timestamp
Resolution
Processing status
Geolocation status
Dataset/reference identifier
```

The user should be able to determine where a displayed observation originated.

---

# 50. Units

Use consistent scientific units.

```text
Wind speed       kt
Pressure         hPa
Temperature      °C
Distance         km
Latitude         °N / °S
Longitude        °E / °W
Time             UTC
```

Do not switch units between screens without explicit user selection.

---

# 51. Tables

Tables should feel like engineering/scientific software.

Requirements:

* Compact rows
* Clear headers
* Subtle horizontal dividers
* Right-aligned numerical values
* Monospace numerical data
* Sticky headers for long tables
* Hover state
* Sort controls where required
* Filter controls where required

Avoid turning every row into a card.

---

# 52. Charts

Charts must prioritize readability.

Use:

* Thin lines
* Subtle grid
* Clear axes
* Explicit units
* Clear legends
* Tooltips
* Reference markers
* Uncertainty regions

Avoid:

* 3D charts
* Decorative gradients
* Excessive animation
* Unnecessary chart decorations
* Large chart titles
* Excessive legends

---

# 53. Chart Interaction

Hovering over a chart point should:

```text
1. Show exact value
2. Show timestamp
3. Highlight the corresponding map position
4. Highlight the timeline position
5. Update related observation information
```

This synchronization should be consistent across analytical views.

---

# 54. Status Indicators

Use a standard status component.

Example:

```text
● ACTIVE
● VALID
● DEGRADED
● UNAVAILABLE
```

The status component should always use:

```text
Indicator
+
Label
```

Never rely on colour alone.

---

# 55. Buttons

Buttons should be compact and functional.

Height:

```text
32–36px
```

Primary:

```text
#1E40AF
```

Secondary:

```text
#172033
border: #334155
```

Danger:

```text
#7F1D1D
```

Use action-oriented labels:

```text
LOAD CASE
PLAY
PAUSE
RESET
APPLY
EXPORT
RETRY
```

Avoid marketing language such as:

```text
Discover Intelligence
Experience AI
Unlock Insights
```

---

# 56. Forms and Inputs

Inputs should be compact.

Use:

```text
Height: 32–36px
Border: #334155
Background: #111827
```

Labels should appear above inputs.

Placeholder text must not replace labels.

Use consistent date/time formatting.

---

# 57. Tooltips

Tooltips should explain technical terminology or provide exact values.

Keep them concise.

Example:

```text
Central Pressure
Minimum sea-level pressure at the cyclone centre.
```

For charts:

```text
28 Sep 2026 · 16:00 UTC
Wind: 145 kt
```

Do not put large paragraphs inside tooltips.

---

# 58. Loading States

Use skeletons for content that is loading.

Do not use full-screen spinners unless the entire application is unavailable.

Satellite loading:

```text
SATELLITE IMAGE

████████████████████
████████████████████
████████████████████
```

Charts should preserve their dimensions while loading.

---

# 59. Error States

Errors must be operational and actionable.

Example:

```text
SATELLITE DATA UNAVAILABLE

Unable to retrieve the observation
for the selected timestamp.

[ RETRY ]
```

Do not expose raw API stack traces.

---

# 60. Empty States

Example:

```text
NO CYCLONE SELECTED

Select an active system to begin analysis.
```

Keep empty states minimal.

Do not use decorative illustrations.

---

# 61. Demo Data

If backend data is unavailable, use realistic mock data.

Every simulated dataset must be identifiable.

Use:

```text
DEMO MODE
SIMULATED DATA
```

Do not present mock values as official observations.

Never fabricate:

* Official warnings
* Real-time satellite observations
* Forecasts
* Model accuracy
* External model outputs
* Validation results
* Confidence values

Unknown values should display:

```text
--
```

or:

```text
NOT AVAILABLE
```

---

# 62. Scientific Credibility

Do not use visual design to imply scientific certainty.

Observed data must be visually distinct from:

```text
Prediction
Reference
Simulation
Uncertainty
```

Recommended visual hierarchy:

```text
Observed      strongest
Predicted     strong but distinct
Reference     subdued
Uncertainty   transparent
Demo          explicitly labelled
```

---

# 63. Animation

Animation must support understanding.

Allowed:

* Map transitions
* Timeline movement
* Chart cursor movement
* Panel transitions
* Layer transitions
* Number transitions

Duration:

```text
150–200ms
```

Use:

```text
ease-out
```

Avoid:

* Bounce
* Flashing
* Particle effects
* Constant pulsing
* Animated gradients
* Decorative motion

---

# 64. Accessibility

The platform must support:

* Keyboard navigation
* Visible focus states
* ARIA labels
* Accessible chart descriptions
* Accessible map controls
* Screen-reader labels
* Sufficient colour contrast
* Text-based status indicators
* Non-colour-dependent warnings

Focus states must remain visible in dark mode.

---

# 65. Responsive Behaviour

Desktop is the primary experience.

## Desktop

```text
Sidebar
+
Map
+
Analysis panels
```

## Tablet

```text
Sidebar
+
Map
+
Analysis drawer
```

## Mobile

Use a simplified vertical workflow:

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

Do not attempt to squeeze the complete desktop dashboard into a mobile viewport.

---

# 66. Component Architecture

Build reusable components.

Suggested structure:

```text
components/
│
├── layout/
│   ├── AppShell
│   ├── Sidebar
│   └── Header
│
├── dashboard/
│   ├── ActiveSystems
│   ├── RecentEvents
│   ├── MissionMap
│   ├── CurrentObservation
│   ├── StructuralAnalysis
│   └── PredictionSummary
│
├── satellite/
│   ├── SatelliteViewer
│   ├── SatelliteToolbar
│   ├── IRViewer
│   ├── VisibleViewer
│   ├── MicrowaveViewer
│   ├── FusionViewer
│   └── SatelliteMetadata
│
├── temporal/
│   ├── Timeline
│   ├── ReplayControls
│   └── EvolutionPanel
│
├── prediction/
│   ├── TrackPrediction
│   ├── IntensityPrediction
│   ├── PatternEvolution
│   └── Uncertainty
│
├── analytics/
│   ├── ScientificMetric
│   ├── FeatureTable
│   ├── TimeSeriesChart
│   └── FeatureContribution
│
├── validation/
│   ├── HistoricalCases
│   ├── HistoricalReplay
│   ├── ValidationMetrics
│   └── PredictionComparison
│
└── ui/
    ├── StatusIndicator
    ├── DataTable
    ├── Tooltip
    ├── Skeleton
    ├── EmptyState
    └── ErrorState
```

---

# 67. Technology

Preferred stack:

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Radix UI
Lucide React
Recharts
MapLibre GL
```

Use D3 only when custom visualization requires it.

Do not use:

```text
MUI
Bootstrap
Ant Design
```

unless explicitly required by the project.

---

# 68. CSS Architecture

Create centralized design tokens.

Example:

```css
:root {
  --background: #0B1120;
  --surface: #111827;
  --surface-secondary: #172033;
  --surface-elevated: #1E293B;

  --border: #263449;
  --border-strong: #334155;

  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;

  --status-normal: #22C55E;
  --status-info: #38BDF8;
  --status-prediction: #60A5FA;
  --status-warning: #F59E0B;
  --status-critical: #EF4444;
}
```

Components should consume these tokens rather than hard-coded colours.

---

# 69. Data Architecture Expectations

The UI must remain independent from actual data providers.

Use typed interfaces for:

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

Mock data should be provided through services rather than embedded directly inside visual components.

---

# 70. Performance

The interface must remain responsive when displaying:

* Large maps
* Multiple satellite layers
* Time-series data
* Historical records
* Forecast tracks

Use:

* Lazy loading
* Memoization
* Efficient map layers
* Virtualized tables
* Image optimization
* Canvas/WebGL where appropriate
* Minimal unnecessary React re-renders

Do not trade usability for visual effects.

---

# 71. Visual Quality Rules

Before considering a screen complete, verify:

```text
[ ] Does it look like scientific software?
[ ] Is the hierarchy immediately understandable?
[ ] Is the map given appropriate importance?
[ ] Are satellite images prominent?
[ ] Are observed and predicted values clearly separated?
[ ] Is uncertainty visible?
[ ] Are timestamps visible?
[ ] Are units visible?
[ ] Is data provenance accessible?
[ ] Are numerical values aligned?
[ ] Are tables compact?
[ ] Are charts readable?
[ ] Are controls consistent?
[ ] Are mock values clearly identified?
[ ] Are animations restrained?
[ ] Are there unnecessary cards?
[ ] Are there unnecessary gradients?
[ ] Are there unnecessary rounded containers?
[ ] Is there any decorative element without a purpose?
[ ] Does the UI remain usable at 1440×900?
```

---

# 72. Final Design Standard

The finished platform should look like a **specialized meteorological workstation** rather than a collection of generated dashboard components.

The design should communicate:

```text
DATA
   ↓
EVIDENCE
   ↓
ANALYSIS
   ↓
PREDICTION
   ↓
UNCERTAINTY
   ↓
VALIDATION
```

The interface must remain visually restrained, technically credible, information-dense, and consistent across every workflow.

```
```
