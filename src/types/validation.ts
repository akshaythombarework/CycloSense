import { CycloneIntensityCategory, GeoCoordinate, TrackPoint } from "./cyclone";

export interface HistoricalCase {
  id: string;
  name: string;
  year: number;
  basin: "Bay of Bengal" | "Arabian Sea";
  peakCategory: CycloneIntensityCategory;
  peakWindKts: number;
  lowestPressureHpa: number;
  landfallLocation: string;
  dateRange: string;
  referenceSource: "IBTrACS (NOAA/NCDC)" | "IMD Best Track" | "JTWC Archive";
  trackPointsCount: number;
  aiTrackMaeKm: number;
  aiIntensityMaeKts: number;
  observedTrack: TrackPoint[];
  predictedTrack: TrackPoint[];
}

export interface ValidationMetric {
  leadTime: "+6h" | "+12h" | "+24h" | "+48h" | "+72h";
  trackMaeKm: number;
  trackRmseKm: number;
  intensityMaeKts: number;
  intensityRmseKts: number;
  sampleCount: number;
  crossTrackErrorKm: number;
  alongTrackErrorKm: number;
}

export interface ModelPerformanceBenchmark {
  modelName: string;
  version: string;
  detectionPrecision: number;
  detectionRecall: number;
  detectionF1: number;
  classificationAccuracy: number;
  classificationPrecision: number;
  classificationRecall: number;
  classificationF1: number;
  track24hMaeKm: number;
  track48hMaeKm: number;
  intensity24hMaeKts: number;
  intensity48hMaeKts: number;
  rapidIntensificationBrierScore: number;
  isCurrentSystem: boolean;
}
