export type CycloneIntensityCategory =
  | "Low Pressure Area"
  | "Depression"
  | "Deep Depression"
  | "Cyclonic Storm"
  | "Severe Cyclonic Storm"
  | "Very Severe Cyclonic Storm"
  | "Extremely Severe Cyclonic Storm"
  | "Super Cyclonic Storm";

export type StructuralState =
  | "DETECTED"
  | "STRONG"
  | "ORGANIZED"
  | "DEVELOPING"
  | "WEAK"
  | "UNAVAILABLE";

export type SensorHealth = "ONLINE" | "DEGRADED" | "OFFLINE" | "CALIBRATING";

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
  formattedLat: string; // e.g. "15.42° N"
  formattedLon: string; // e.g. "087.31° E"
}

export interface TrackPoint extends GeoCoordinate {
  timestamp: string; // ISO or "28 SEP 12:00 UTC"
  windSpeedKts: number;
  centralPressureHpa: number;
  category: CycloneIntensityCategory;
  isObserved: boolean;
  dvorakT?: number;
  estimatedRMWKm?: number; // Radius of Maximum Wind
}

export interface CycloneStructuralAnalysis {
  circulation: StructuralState;
  cdo: StructuralState; // Central Dense Overcast
  spiralBands: StructuralState;
  eye: StructuralState;
  eyeSymmetry: StructuralState;
  convection: StructuralState;
  cdoAreaKm2: number;
  eyeDiameterKm: number | null;
  cloudTopTempMinC: number;
  dvorakTNumber: number;
  currentIntensityCI: number;
}

export interface CycloneObservation {
  id: string;
  cycloneId: string;
  timestamp: string;
  timeOffsetLabel: "T-12h" | "T-9h" | "T-6h" | "T-3h" | "NOW";
  coordinate: GeoCoordinate;
  maxSustainedWindKts: number;
  centralPressureHpa: number;
  movementDirection: "N" | "NNE" | "NE" | "ENE" | "E" | "ESE" | "SE" | "SSE" | "S" | "SSW" | "SW" | "WSW" | "W" | "WNW" | "NW" | "NNW";
  movementSpeedKts: number;
  category: CycloneIntensityCategory;
  structure: CycloneStructuralAnalysis;
  irImageUrl: string;
  visImageUrl: string;
  microwaveImageUrl: string;
  fusedImageUrl: string;
}

export interface AIEvent {
  id: string;
  timestamp: string;
  type:
    | "RAPID_INTENSIFICATION"
    | "EYE_FORMATION"
    | "PRESSURE_DROP"
    | "TRACK_DEVIATION"
    | "CONVECTIVE_BURST"
    | "DATA_DEGRADATION"
    | "LANDFALL_ALERT";
  title: string;
  description: string;
  severity: "CRITICAL" | "WARNING" | "INFO" | "NORMAL";
  confidencePercent: number | null;
  cycloneId: string;
  cycloneName: string;
  supportingSignals?: string[];
  statusLabel?: string; // e.g. "ANALYSIS ONLY"
}

export interface ActiveCyclone {
  id: string;
  code: string; // e.g. "BOB-04/2026"
  name: string; // e.g. "MAHASEN-II"
  basin: "Bay of Bengal" | "Arabian Sea";
  status: "ACTIVE" | "MONITORING" | "DISSIPATING";
  currentCategory: CycloneIntensityCategory;
  currentCoord: GeoCoordinate;
  maxSustainedWindKts: number;
  centralPressureHpa: number;
  movementDirection: string;
  movementSpeedKts: number;
  lastUpdatedUtc: string;
  temporalSequence: CycloneObservation[]; // T-12h to NOW
  observedTrack: TrackPoint[];
}
