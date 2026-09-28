export interface DataSourceFeed {
  id: string;
  name: string;
  type: "GEOSTATIONARY_SATELLITE" | "POLAR_ORBITING" | "MICROWAVE_IMAGER" | "SCATTEROMETER" | "OCEAN_REANALYSIS" | "HISTORICAL_ARCHIVE";
  agency: "ISRO / IMD" | "NASA / JAXA" | "EUMETSAT" | "NOAA / NESDIS" | "ECMWF";
  sensor: string;
  spatialResolution: string;
  temporalCadence: string;
  coverage: string;
  lastIngestionUtc: string;
  latencySeconds: number;
  status: "ONLINE" | "DEGRADED" | "STANDBY" | "OFFLINE";
  packetsProcessed24h: number;
  errorRatePercent: number;
}
