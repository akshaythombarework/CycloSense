import { DataQualityReport, IRAnalysisMetrics, MicrowaveAnalysisMetrics, MultiSourceFusionMetrics, PreprocessingStep, VisibleAnalysisMetrics } from "@/types/satellite";

export const MOCK_IR_METRICS: IRAnalysisMetrics = {
  cloudTopTempMinC: -76.4,
  cloudTopTempMeanC: -62.1,
  cdoAreaKm2: 18420,
  eyeDetected: true,
  eyeTempC: 14.2,
  convectionStrength: "STRONG",
  coldestPixelCoord: {
    latitude: 15.38,
    longitude: 87.35,
    formattedLat: "15.38° N",
    formattedLon: "087.35° E",
  },
};

export const MOCK_VISIBLE_METRICS: VisibleAnalysisMetrics = {
  cloudOrganization: "HIGH",
  spiralBandStructure: "STRONG",
  eyeDetected: true,
  symmetryIndex: 0.86,
  exposedCenter: false,
};

export const MOCK_MICROWAVE_METRICS: MicrowaveAnalysisMetrics = {
  eyewallStructure: "COMPLETE_RING",
  lowLevelCenterDetected: true,
  rainbandOrganization: "STRONG",
  deepConvectiveCoreHeightKm: 16.8,
  shearInducedTiltKm: 4.2,
};

export const MOCK_FUSION_METRICS: MultiSourceFusionMetrics = {
  irWeightPercent: 42,
  visWeightPercent: 28,
  microwaveWeightPercent: 30,
  fusionConfidencePercent: 91,
  structuralAgreementScore: 0.88,
  reconstructionMethod: "Multi-Modal Cross-Attention CNN-ViT",
};

export const MOCK_DATA_QUALITY: DataQualityReport = {
  irSensor: "VALID",
  visibleSensor: "VALID",
  microwaveSensor: "VALID",
  timestampSync: "SYNCHRONIZED",
  geolocation: "VERIFIED",
  overallQuality: "EXCELLENT",
  missingPixelsPct: 0.04,
  groundStation: "IMD Master Control Facility, New Delhi / Shadnagar NRSC",
  ingestionLatencySeconds: 142,
};

export const MOCK_PREPROCESSING_STEPS: PreprocessingStep[] = [
  {
    id: "step-1",
    name: "L1B Telemetry Ingestion & Decommutation",
    status: "COMPLETED",
    durationMs: 48,
    inputShape: "Raw HDF5 (INSAT-3DR TIR/VIS)",
    outputShape: "Calibrated Radiance Tensor [6, 1200, 1200]",
    description: "De-striping, dark count subtraction, and sensor gain calibration.",
  },
  {
    id: "step-2",
    name: "Georeferencing & Parallax Correction",
    status: "COMPLETED",
    durationMs: 82,
    inputShape: "Radiance Tensor",
    outputShape: "WGS84 Equirectangular Grid (0.04° res)",
    description: "Cloud-height parallax shift adjustment and land-sea mask alignment.",
  },
  {
    id: "step-3",
    name: "Multi-Sensor Spatial Resampling & Alignment",
    status: "COMPLETED",
    durationMs: 110,
    inputShape: "Multi-Source Swaths (INSAT + MetOp + GPM)",
    outputShape: "Unified Spatial Grid [1024, 1024, 4]",
    description: "Bicubic spline interpolation matching 89 GHz MW to 4 km IR grid.",
  },
  {
    id: "step-4",
    name: "Temporal Window Alignment",
    status: "COMPLETED",
    durationMs: 34,
    inputShape: "Observations (T-12h to T-0h)",
    outputShape: "5-Step Temporal Cube [5, 4, 256, 256]",
    description: "Synchronized 3-hourly time-step interpolation.",
  },
  {
    id: "step-5",
    name: "Multi-Modal Feature Fusion & Normalization",
    status: "COMPLETED",
    durationMs: 65,
    inputShape: "Temporal Cube",
    outputShape: "Latent Representation [512-dim Embedding]",
    description: "Cross-attention fusion between IR thermal gradients and MW rain rates.",
  },
];
