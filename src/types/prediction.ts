import { CycloneIntensityCategory, GeoCoordinate } from "./cyclone";

export interface ForecastPoint extends GeoCoordinate {
  timeHorizon: "+6h" | "+12h" | "+24h" | "+48h" | "+72h";
  validTimestamp: string;
  predictedWindKts: number;
  predictedPressureHpa: number;
  predictedCategory: CycloneIntensityCategory;
  confidencePercent: number;
  uncertaintyRadiusKm: number; // For cone of uncertainty at this lead time
  trackProbabilityCone: {
    latNorth: number;
    lonNorth: number;
    latSouth: number;
    lonSouth: number;
  };
}

export interface IntensityForecastInterval {
  timeHorizon: string; // "NOW", "+6h", "+12h", "+24h", "+48h"
  timestamp: string;
  observedWindKts?: number;
  predictedWindKts?: number;
  lowerConfidenceBoundKts?: number; // 10th percentile
  upperConfidenceBoundKts?: number; // 90th percentile
  predictedPressureHpa?: number;
  observedPressureHpa?: number;
}

export interface PatternEvolutionSnapshot {
  leadTime: "CURRENT" | "+6 HOURS" | "+12 HOURS" | "+24 HOURS";
  timestamp: string;
  stageName: string; // e.g. "Spiral Bands", "Organized CDO", "Eye Development", "Mature Eyewall"
  morphologyDescription: string;
  predictedSymmetry: number;
  convectivePattern: "ASYMMETRIC" | "CURVED_BAND" | "PINHOLE_EYE" | "ANNULAR";
  thumbnailType: "IR_ENHANCED" | "MW_RAIN_CORE" | "SYNTHETIC_VIS";
}

export interface FeatureImportanceItem {
  featureName: string;
  importanceWeight: number; // 0.0 to 1.0 (e.g. 0.88)
  category: "SATELLITE_STRUCTURE" | "THERMODYNAMIC" | "ENVIRONMENTAL";
  trendDirection: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  valueDescription: string;
}

export interface ExplainabilityData {
  modelName: string;
  version: string;
  featureContributions: FeatureImportanceItem[];
  riProbabilityPercent: number; // Rapid intensification probability
  primaryIntensificationDriver: string;
  attentionHeatmapAvailable: boolean;
  gradCamRegions: {
    region: string;
    weight: number;
    description: string;
  }[];
}
