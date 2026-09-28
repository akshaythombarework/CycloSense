````markdown
# PRD.md

# Cyclone AI — Product Requirements Document

## 1. Product Overview

Cyclone AI is an AI/ML-based tropical cyclone analysis and prediction platform designed to support meteorologists, researchers, and disaster-management authorities.

The platform combines multi-source satellite observations, temporal analysis, cyclone feature extraction, machine-learning predictions, explainability, historical validation, and data-quality information within a single operational workspace.

The product is intended to assist human analysis and decision-making. It does not replace official meteorological forecasts, warnings, or expert judgment.

---

# 2. Product Objectives

The platform must:

1. Identify and monitor tropical cyclone systems.
2. Display and analyze satellite observations from multiple sensing modes.
3. Combine infrared, visible, and microwave observations where available.
4. Track cyclone evolution over time.
5. Extract measurable structural and environmental features.
6. Predict cyclone track and intensity.
7. Detect signals associated with rapid intensification.
8. Represent prediction uncertainty explicitly.
9. Explain important model inputs and predictions.
10. Compare predictions with historical/reference observations.
11. Provide model-performance and validation views.
12. Expose data provenance and quality.
13. Clearly distinguish observations, predictions, reference data, and simulated/demo data.

---

# 3. Target Users

## 3.1 Meteorologists

Primary needs:

- Monitor active systems
- Inspect satellite observations
- Examine cyclone structure
- Compare temporal changes
- Review model predictions
- Inspect uncertainty
- Examine model explanations
- Compare predictions with reference data

---

## 3.2 Disaster Management Authorities

Primary needs:

- Identify active systems
- Understand current location
- View predicted movement
- Understand expected intensity evolution
- View uncertainty
- Identify potentially significant changes
- Access concise operational information

The interface must avoid overwhelming this user with unnecessary model-level details.

---

## 3.3 Researchers and Analysts

Primary needs:

- Inspect historical cases
- Replay cyclone evolution
- Compare datasets
- Examine extracted features
- Evaluate model performance
- Analyze prediction errors
- Compare models

---

# 4. Product Scope

The first version of the platform contains the following modules:

```text
1. Mission Control
2. Satellite Analysis
3. Temporal Analysis
4. Prediction
5. Explainability
6. Historical Cases
7. Model Performance
8. Data Sources
9. Data Quality & Provenance
````

---

# 5. Global Application Requirements

The application must provide:

* Persistent navigation
* Active-system selection
* Shared cyclone context
* Shared timestamp
* Consistent units
* Data-source identification
* System status
* Demo/simulation status
* Loading states
* Error states
* Empty states
* Data-quality indicators

Selecting a cyclone should update relevant modules without requiring the user to repeatedly select the same system.

---

# 6. Mission Control

Mission Control is the primary operational screen.

## 6.1 Purpose

Provide a consolidated view of:

* Active cyclone systems
* Current observations
* Satellite context
* Current position
* Recent events
* Structural analysis
* Prediction summary

---

## 6.2 Active Systems

Display currently available cyclone systems.

Each system should provide:

```text
System name
Current classification
Current position
Wind speed
Central pressure
Movement direction
Movement speed
Last observation time
Status
```

Example:

```text
SYSTEM 01

Severe Cyclonic Storm

15.42°N 087.31°E
145 kt
920 hPa
NW / 14 kt

OBSERVED
16:00 UTC
```

---

## 6.3 Current Observation

Display the latest available observation for the selected system.

Required fields:

```text
Latitude
Longitude
Maximum sustained wind
Central pressure
Movement direction
Movement speed
Observation timestamp
Observation source
```

---

## 6.4 Recent Events

Display important system events chronologically.

Possible events:

```text
New satellite observation
Rapid intensification signal
Pressure decrease
Wind increase
Eye detection
Structural change
Prediction update
Data-quality degradation
```

Events must include timestamps.

---

# 7. Interactive Map

The map is a core component of the platform.

## 7.1 Required Capabilities

The map must support:

* Pan
* Zoom
* Cyclone selection
* Layer selection
* Track visualization
* Forecast visualization
* Uncertainty visualization
* Satellite overlays
* Geographic boundaries
* Wind vectors where data exists
* Precipitation where data exists

---

## 7.2 Map Layers

Supported layers:

```text
Base Map
Satellite
Infrared
Visible
Microwave
Wind Vectors
Precipitation
Sea Surface Temperature
Observed Track
Predicted Track
Prediction Uncertainty
Administrative Boundaries
```

Unavailable layers must be disabled or explicitly marked unavailable.

---

## 7.3 Cyclone Track

Display:

```text
Observed track
Predicted track
Forecast points
Prediction uncertainty
Current centre
```

Observed and predicted tracks must be visually distinct.

---

# 8. Satellite Analysis

## 8.1 Purpose

Provide detailed access to satellite observations used by the platform.

The primary satellite modes are:

```text
Infrared
Visible
Microwave
```

An optional fused view may combine information from multiple sources.

---

# 9. Infrared Analysis

The infrared view should support analysis of cloud-top characteristics.

Possible parameters:

```text
Cloud-top temperature
Cold cloud area
Central dense overcast
Eye presence
Convection strength
Cloud symmetry
Spiral structure
```

The UI must display the observation timestamp and source.

---

# 10. Visible Analysis

Visible imagery should support assessment of:

```text
Cloud organization
Spiral band structure
Eye visibility
Cloud symmetry
Central dense overcast
Convective organization
```

Visible imagery may have temporal availability constraints.

When unavailable, the UI must communicate why or indicate that the observation is unavailable.

---

# 11. Microwave Analysis

Microwave observations should support analysis of internal cyclone structure.

Possible features:

```text
Low-level circulation
Eyewall structure
Rainband structure
Core organization
Precipitation structure
```

Microwave observations should not be presented as continuous imagery when the underlying data is only available intermittently.

---

# 12. Multi-Source Satellite Fusion

The system should support combining available satellite information.

Conceptually:

```text
IR
+
VISIBLE
+
MICROWAVE
+
ENVIRONMENTAL DATA
        ↓
FEATURE EXTRACTION
        ↓
MULTI-SOURCE REPRESENTATION
        ↓
MODEL INPUT
```

The UI must identify which sources contributed to the current analysis.

If one source is unavailable, the system must not imply that it contributed.

---

# 13. Satellite Metadata

Every displayed satellite observation must expose:

```text
Source
Timestamp
Spatial resolution
Coverage
Geolocation status
Processing status
Dataset identifier where available
```

This information may be shown in a metadata drawer or panel.

---

# 14. Preprocessing

The platform should represent the major preprocessing stages applied to satellite data.

Pipeline:

```text
Raw Observation
      ↓
Quality Control
      ↓
Georeferencing
      ↓
Image Alignment
      ↓
Resampling
      ↓
Normalization
      ↓
Missing Data Handling
      ↓
Temporal Synchronization
      ↓
Feature Extraction
```

Each stage should have a status.

Possible statuses:

```text
COMPLETED
IN PROGRESS
DEGRADED
FAILED
NOT APPLICABLE
```

The system must retain enough metadata to determine how the displayed data was processed.

---

# 15. Temporal Analysis

Temporal analysis is a core platform capability.

The system must allow users to inspect cyclone evolution rather than relying only on a single image.

---

## 15.1 Timeline

The timeline must allow users to move through available observations.

Example:

```text
T-12h ── T-9h ── T-6h ── T-3h ── NOW
```

Controls:

```text
Previous
Play
Pause
Next
Playback speed
```

---

## 15.2 Synchronized Timeline

Changing the timestamp should update available:

```text
Satellite image
Cyclone position
Observed track
Wind
Pressure
Structural features
Charts
Events
```

All modules must indicate their timestamp.

---

## 15.3 Temporal Comparison

Users should be able to compare two or more time points.

Example:

```text
T-6h
vs
NOW
```

Compare:

```text
Wind
Pressure
Cloud structure
Eye structure
Convection
CDO area
Other extracted features
```

---

# 16. Cyclone Feature Extraction

The platform should extract measurable features from available observations.

Potential features:

```text
Centre latitude
Centre longitude
Maximum wind
Central pressure
Cloud-top temperature
CDO area
Eye presence
Eye diameter
Eye temperature
Eye symmetry
Eyewall structure
Spiral band structure
Convection strength
SST
Vertical wind shear
```

Only features supported by the available data should be displayed as populated values.

---

# 17. Cyclone Classification

The system may classify cyclone systems according to the configured classification scheme.

The classification interface should display:

```text
Current classification
Classification basis
Relevant measured parameters
Timestamp
Model/reference source
```

Classification should not be presented as an official warning unless sourced from an official warning system.

---

# 18. Rapid Intensification Detection

The platform should identify model-derived signals associated with rapid intensification.

Potential inputs include:

```text
Wind-speed change
Pressure change
Cloud-top temperature change
CDO expansion
Eye formation
Eye symmetry
Convection
Environmental conditions
Temporal feature changes
```

The system should display:

```text
RI SIGNAL
Detected / Not detected / Insufficient data
```

If detected, provide supporting measurable indicators.

Example:

```text
RI SIGNAL DETECTED

Wind change      +13 kt / 6h
Pressure change  -14 hPa / 6h
Eye structure    Improving
Convection       Increasing
```

The interface must distinguish a model-derived RI signal from an official meteorological warning.

---

# 19. Prediction Module

The prediction module should provide:

```text
Track prediction
Intensity prediction
Pattern/structure evolution
Uncertainty
Prediction timestamp
Model/version
```

---

# 20. Track Prediction

Forecast points should contain:

```text
Forecast time
Latitude
Longitude
Predicted wind
Predicted pressure where available
Uncertainty
```

Example:

```text
+06h
LAT --
LON --
WIND --
UNCERTAINTY --

+12h
LAT --
LON --
WIND --
UNCERTAINTY --

+24h
LAT --
LON --
WIND --
UNCERTAINTY --
```

---

# 21. Intensity Prediction

Display predicted evolution of:

```text
Maximum wind
Central pressure where supported
```

The chart must distinguish:

```text
Observed values
Predicted values
Prediction interval
Current value
```

---

# 22. Pattern Evolution Prediction

Where supported, provide predicted structural evolution.

Possible stages:

```text
Current
+6h
+12h
+24h
+48h
```

For each stage, display the relevant prediction or generated representation.

Predicted imagery must never be visually indistinguishable from observed satellite imagery.

---

# 23. Uncertainty

All applicable predictions must communicate uncertainty.

Track:

```text
Forecast centre
+
Uncertainty region
```

Intensity:

```text
Predicted value
+
Prediction interval
```

The system must never imply that a forecast position or intensity is exact.

---

# 24. Model Information

Every prediction should expose:

```text
Model name
Model version
Prediction generation time
Input observation time
Forecast horizon
Available input sources
```

Example:

```text
MODEL
CycloneAI v0.1

GENERATED
28 Sep 2026 · 16:15 UTC

INPUT
Observation: 16:00 UTC
```

---

# 25. Explainability

The system should provide an explanation interface for model predictions.

Supported methods may include:

```text
Feature importance
SHAP
Grad-CAM
Attention maps
Spatial contribution maps
```

The exact method depends on the model implementation.

---

# 26. Explainability Requirements

For a prediction, the user should be able to determine:

```text
Which features influenced the prediction
Relative contribution where available
Which satellite regions were important
Which observation timestamp was used
Which model/version generated the output
```

Do not fabricate explanations when the model does not provide them.

---

# 27. Historical Cases

The historical module should allow users to inspect previous cyclone systems.

Filters:

```text
Year
Region
Cyclone
Intensity
Date range
```

Each case should contain, where available:

```text
Track
Intensity
Satellite observations
Temporal evolution
Reference observations
Prediction results
Validation results
```

---

# 28. Historical Replay

Users should be able to replay historical cyclone evolution.

Replay must synchronize:

```text
Satellite observations
Cyclone location
Track
Intensity
Structural features
Events
```

Available playback speeds:

```text
1×
2×
4×
```

---

# 29. Validation

The system should allow predictions to be compared against reference/observed data.

Validation views may include:

```text
Observed vs predicted track
Observed vs predicted intensity
Prediction error
Error over forecast horizon
Error by cyclone
Error by intensity
```

The reference dataset must be identified.

---

# 30. Model Performance

Performance metrics may include:

## Detection

```text
Precision
Recall
F1
```

## Classification

```text
Accuracy
Precision
Recall
F1
```

## Track Prediction

```text
MAE
RMSE
Track error
```

## Intensity Prediction

```text
MAE
RMSE
Bias
```

Metrics must include the evaluation dataset and evaluation period.

---

# 31. Model Comparison

The system may compare multiple configured models.

Comparison dimensions:

```text
Track error
Intensity error
Detection metrics
Classification metrics
Runtime
Forecast horizon
Data requirements
```

The UI should present measured values without assigning subjective rankings.

---

# 32. Data Quality

The platform must continuously communicate data quality.

Required states:

```text
VALID
DEGRADED
INVALID
UNAVAILABLE
```

Quality checks may include:

```text
Timestamp validity
Geolocation validity
Missing data
Image integrity
Expected coverage
Source availability
Temporal consistency
```

---

# 33. Data Provenance

For every major observation or model output, provide provenance.

Required information where available:

```text
Source
Dataset
Timestamp
Processing version
Model version
Observation/reference identifier
```

Users should be able to inspect provenance without leaving the analysis workflow.

---

# 34. Data Sources

The Data Sources module should provide an inventory of configured data providers.

For each source:

```text
Source name
Data type
Coverage
Resolution
Update frequency
Latest available timestamp
Status
```

Possible categories:

```text
Infrared
Visible
Microwave
Environmental
Historical
Reference
Model
```

---

# 35. Search and Filtering

Users should be able to filter relevant records.

Supported filters may include:

```text
Cyclone
Date
Time range
Satellite mode
Data source
Classification
Intensity
Region
Model
Prediction horizon
Data quality
```

Filters should be combinable.

---

# 36. Global Time Handling

All system timestamps must use UTC by default.

Display:

```text
28 Sep 2026 · 16:42 UTC
```

Do not silently convert timestamps between screens.

The currently selected analysis timestamp should remain visible.

---

# 37. Units

Use:

```text
Wind speed       knots
Pressure         hPa
Temperature      °C
Distance         km
Latitude         °N / °S
Longitude        °E / °W
Time             UTC
```

Units must remain consistent throughout the application.

---

# 38. Notifications and Alerts

The platform may generate application-level events such as:

```text
New observation available
Prediction updated
Data source unavailable
Rapid-intensification signal detected
Processing failed
Model output unavailable
```

These are system/model events.

They must not be represented as official public warnings unless integrated with an official warning source.

---

# 39. Export

Where implemented, users should be able to export:

```text
Observation data
Prediction data
Track data
Historical case data
Validation metrics
Charts
Analysis summaries
```

Exported data must retain relevant metadata and timestamps.

---

# 40. Demo and Simulation Mode

The platform must support development without live data.

Demo mode should provide:

```text
SIMULATED DATA
```

or:

```text
DEMO MODE
```

visible in the application shell.

Simulated values must never be represented as live official observations.

---

# 41. API Integration

The frontend should communicate with backend services through defined interfaces.

Potential API groups:

```text
/cyclones
/observations
/satellite
/features
/predictions
/explainability
/historical
/validation
/models
/data-sources
/quality
```

The exact endpoint structure may change with backend implementation.

Frontend components must not directly depend on hard-coded mock data.

---

# 42. Data Models

The frontend should use typed models for:

```text
Cyclone
Observation
SatelliteObservation
SatelliteMetadata
CycloneFeature
ForecastPoint
TrackPrediction
IntensityPrediction
PredictionInterval
ModelOutput
ExplainabilityResult
HistoricalCase
ValidationResult
DataSource
DataQuality
SystemEvent
```

---

# 43. State Management

Global application state should include, where required:

```text
Selected cyclone
Selected timestamp
Selected satellite mode
Selected map layers
Selected prediction model
Active filters
Playback state
Data quality state
```

Changing shared state must update dependent components consistently.

---

# 44. Error Handling

The application must gracefully handle:

```text
No data
Partial data
Unavailable satellite source
Failed prediction
Failed model explanation
Invalid timestamp
Network failure
Processing failure
```

Errors should explain:

1. What failed
2. Which data is affected
3. Whether other data remains usable
4. What action the user can take

---

# 45. Loading Behaviour

Loading states must preserve layout.

Examples:

```text
Satellite image loading
Chart loading
Prediction loading
Historical data loading
Model explanation loading
```

Use skeleton states where possible.

Avoid unnecessary full-screen loading screens.

---

# 46. Empty States

Examples:

```text
NO ACTIVE SYSTEMS

No active cyclone observations are currently available.
```

```text
NO MICROWAVE OBSERVATION

No microwave observation is available for the selected timestamp.
```

```text
NO MODEL EXPLANATION

Explainability output is not available for this prediction.
```

---

# 47. Performance Requirements

The application should:

* Load the main workspace quickly.
* Avoid unnecessary re-rendering.
* Keep map interactions responsive.
* Support efficient timeline navigation.
* Support large historical tables.
* Avoid loading all historical imagery at once.
* Lazy-load heavy analytical modules.
* Cache reusable observations where appropriate.

---

# 48. Security and Reliability

The application must:

* Avoid exposing API credentials in the client.
* Validate external data.
* Treat external data as untrusted input.
* Prevent malformed data from breaking visualizations.
* Clearly distinguish unavailable data from zero values.
* Maintain consistent timestamps and units.

---

# 49. Accessibility Requirements

The platform must support:

* Keyboard navigation
* Focus states
* Screen-reader labels
* Accessible controls
* Sufficient colour contrast
* Non-colour status indicators
* Chart descriptions
* Accessible tables
* Accessible map controls

---

# 50. MVP Definition

The MVP is complete when the user can:

1. Open Mission Control.
2. Select a cyclone.
3. View its current location on the map.
4. View the latest available satellite observation.
5. Switch between IR, visible, and microwave views where data exists.
6. Navigate through historical timestamps.
7. Observe cyclone changes over time.
8. View extracted cyclone features.
9. View predicted track.
10. View predicted intensity.
11. View prediction uncertainty.
12. Inspect model information.
13. View model-derived RI signals where implemented.
14. Inspect available model explanations.
15. Open historical cyclone cases.
16. Compare prediction with reference observations.
17. View validation metrics.
18. Inspect data-source and provenance information.
19. Understand whether displayed information is observed, predicted, reference, or simulated.

---

# 51. Out of Scope for MVP

The following are not required unless explicitly integrated:

```text
Official warning issuance
Automated public emergency messaging
Autonomous disaster-management decisions
Fully automated meteorological forecasting
Replacement of official meteorological systems
Unverified third-party forecasts
Real-time public notification infrastructure
```

---

# 52. Acceptance Criteria

A feature is considered complete only when:

```text
[ ] Functional interaction is implemented
[ ] Data state is represented correctly
[ ] Loading state exists
[ ] Empty state exists where applicable
[ ] Error state exists where applicable
[ ] Timestamp is visible
[ ] Units are visible
[ ] Source/provenance is accessible
[ ] Observed and predicted data are distinguishable
[ ] Uncertainty is represented where applicable
[ ] Demo data is clearly labelled
[ ] No unsupported values are fabricated
[ ] Keyboard accessibility is supported
[ ] Layout works at 1440×900
[ ] Component follows DESIGN.md
```

---

# 53. Product Success Criteria

The platform should enable a user to move from:

```text
CURRENT SYSTEM
      ↓
CURRENT OBSERVATION
      ↓
SATELLITE EVIDENCE
      ↓
TEMPORAL CHANGE
      ↓
STRUCTURAL FEATURES
      ↓
MODEL PREDICTION
      ↓
UNCERTAINTY
      ↓
MODEL EXPLANATION
      ↓
HISTORICAL VALIDATION
```

without losing context or needing to manually reconstruct the cyclone's history.

The product succeeds when the interface makes the relationship between **observations, extracted evidence, model outputs, uncertainty, and validation** clear and traceable.

```
```
