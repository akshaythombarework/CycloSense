import { GeoCoordinate } from "./cyclone";

export type SpectralBand = "IR" | "VISIBLE" | "MICROWAVE" | "FUSED";

export interface SatelliteObservation {
  id: string;
  satelliteName: string; // e.g., "INSAT-3DR", "INSAT-3D", "METOP-B ASCAT", "GPM/GMI"
  band: SpectralBand;
  channel: string; // e.g., "TIR-1 (10.8 µm)", "VIS (0.65 µm)", "89 GHz H-Pol"
  timestamp: string;
  resolutionKm: number;
  centerCoord: GeoCoordinate;
  qualityState: "VALID" | "DEGRADED" | "INVALID" | "UNAVAILABLE";
  missingPixelsPercent: number;
  geoReferencingStatus: "VERIFIED" | "CALIBRATED" | "UNCERTAIN";
  calibrationState: "NOMINAL" | "CORRECTED" | "DEGRADED";
}

export interface IRAnalysisMetrics {
  cloudTopTempMinC: number;
  cloudTopTempMeanC: number;
  cdoAreaKm2: number;
  eyeDetected: boolean;
  eyeTempC?: number;
  convectionStrength: "STRONG" | "MODERATE" | "WEAK";
  coldestPixelCoord: GeoCoordinate;
}

export interface VisibleAnalysisMetrics {
  cloudOrganization: "HIGH" | "MODERATE" | "LOOSE";
  spiralBandStructure: "STRONG" | "ORGANIZED" | "DEVELOPING" | "WEAK";
  eyeDetected: boolean;
  symmetryIndex: number; // 0.0 to 1.0 (e.g. 0.86)
  exposedCenter: boolean;
}

export interface MicrowaveAnalysisMetrics {
  eyewallStructure: "COMPLETE_RING" | "OPEN_EYEWALL" | "CONCENTRIC_RINGS" | "ILL_DEFINED";
  lowLevelCenterDetected: boolean;
  rainbandOrganization: "STRONG" | "MODERATE" | "WEAK";
  deepConvectiveCoreHeightKm: number;
  shearInducedTiltKm: number;
}

export interface MultiSourceFusionMetrics {
  irWeightPercent: number;
  visWeightPercent: number;
  microwaveWeightPercent: number;
  fusionConfidencePercent: number;
  structuralAgreementScore: number; // 0.0 - 1.0
  reconstructionMethod: "Multi-Modal Cross-Attention CNN-ViT";
}

export interface PreprocessingStep {
  id: string;
  name: string;
  status: "COMPLETED" | "RUNNING" | "PENDING" | "FAILED";
  durationMs: number;
  inputShape: string;
  outputShape: string;
  description: string;
}

export interface DataQualityReport {
  irSensor: "VALID" | "DEGRADED" | "INVALID";
  visibleSensor: "VALID" | "DEGRADED" | "INVALID";
  microwaveSensor: "VALID" | "DEGRADED" | "INVALID";
  timestampSync: "SYNCHRONIZED" | "DESYNCHRONIZED";
  geolocation: "VERIFIED" | "UNCERTAIN";
  overallQuality: "EXCELLENT" | "ACCEPTABLE" | "DEGRADED";
  missingPixelsPct: number;
  groundStation: string;
  ingestionLatencySeconds: number;
}
