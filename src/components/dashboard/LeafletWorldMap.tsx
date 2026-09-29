"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import type { Map as LeafletMap, Polyline, CircleMarker, Polygon, Circle } from "leaflet";
import { ActiveCyclone } from "@/types/cyclone";
import { ForecastPoint } from "@/types/prediction";
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Wind,
  Droplets,
  Thermometer,
  RotateCcw,
} from "lucide-react";

interface LeafletWorldMapProps {
  cyclone: ActiveCyclone;
  forecastPoints: ForecastPoint[];
  selectedPoint?: ForecastPoint | null;
  onSelectForecastPoint?: (point: ForecastPoint | null) => void;
  className?: string;
}

const intensityColor = (windKts: number): string => {
  if (windKts >= 115) return "#B91C1C"; // Critical Alert (Muted Crimson) - Cat 4-5
  if (windKts >= 64) return "#B45309";  // Warning Alert (Muted Rust) - Cat 2-3
  return "#15803D";                     // Moderate/Normal Alert (Muted Forest Green) - Predicted Weakening
};

export const LeafletWorldMap: React.FC<LeafletWorldMapProps> = ({
  cyclone,
  forecastPoints,
  selectedPoint,
  onSelectForecastPoint,
  className = "",
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layersRef = useRef<{
    observedLine?: Polyline;
    predictedLine?: Polyline;
    conePoly?: Polygon;
    observedDots: CircleMarker[];
    forecastDots: CircleMarker[];
    currentMarker?: Circle;
    pulseMarker?: CircleMarker;
    windRings: Circle[];
    precipRings: Circle[];
  }>({ observedDots: [], forecastDots: [], windRings: [], precipRings: [] });

  const [, setMouseCoords] = useState<{ lat: string; lon: string }>({
    lat: `${cyclone.currentCoord.latitude.toFixed(2)}° N`,
    lon: `${cyclone.currentCoord.longitude.toFixed(2)}° E`,
  });
  const [, setZoomLevel] = useState(5);
  const [showObserved, setShowObserved] = useState(true);
  const [showPredicted, setShowPredicted] = useState(true);
  const [showUncertainty, setShowUncertainty] = useState(true);
  const [showWindField, setShowWindField] = useState(false);
  const [showPrecipitation, setShowPrecipitation] = useState(false);
  const [showSst, setShowSst] = useState(false);
  const [basemapStyle, setBasemapStyle] = useState<"dark" | "streets" | "satellite">("streets");

  const tileLayersRef = useRef<import("leaflet").TileLayer[]>([]);

  const clearLayers = useCallback((map: LeafletMap) => {
    const r = layersRef.current;
    [r.observedLine, r.conePoly, r.predictedLine, r.currentMarker, r.pulseMarker].forEach(
      (l) => { if (l) map.removeLayer(l); }
    );
    [...r.observedDots, ...r.forecastDots, ...r.windRings, ...r.precipRings].forEach((l) =>
      map.removeLayer(l)
    );
    layersRef.current = { observedDots: [], forecastDots: [], windRings: [], precipRings: [] };
  }, []);

  const drawAllLayers = useCallback(
    (L: typeof import("leaflet"), map: LeafletMap) => {
      clearLayers(map);
      const currentLatLng = L.latLng(cyclone.currentCoord.latitude, cyclone.currentCoord.longitude);

      // Uncertainty cone
      if (showUncertainty && forecastPoints.length > 0) {
        const northEdge = forecastPoints.map((pt) =>
          L.latLng(pt.trackProbabilityCone.latNorth, pt.trackProbabilityCone.lonNorth)
        );
        const southEdge = [...forecastPoints].reverse().map((pt) =>
          L.latLng(pt.trackProbabilityCone.latSouth, pt.trackProbabilityCone.lonSouth)
        );
        layersRef.current.conePoly = L.polygon([currentLatLng, ...northEdge, ...southEdge], {
          color: "#3B82F6",
          fillColor: "#3B82F6",
          fillOpacity: 0.20,
          weight: 1.5,
          dashArray: "4 4",
          opacity: 0.8,
        }).addTo(map);
      }

      // Observed track
      if (showObserved && cyclone.observedTrack.length > 0) {
        const obsLatLngs = cyclone.observedTrack.map((pt) => L.latLng(pt.latitude, pt.longitude));
        layersRef.current.observedLine = L.polyline(obsLatLngs, {
          color: "#15803D",
          weight: 3,
          lineCap: "round",
          lineJoin: "round",
          opacity: 0.95,
        }).addTo(map);

        layersRef.current.observedDots = cyclone.observedTrack.map((pt, idx) => {
          const isLast = idx === cyclone.observedTrack.length - 1;
          const dot = L.circleMarker([pt.latitude, pt.longitude], {
            radius: isLast ? 6 : 4,
            fillColor: "#15803D",
            color: "#0F172A",
            weight: 1.5,
            fillOpacity: 1,
          }).addTo(map);
          dot.bindPopup(
            `<div style="font-family:monospace;font-size:11px;line-height:1.6">
              <b style="color:#15803D">OBSERVED WAYPOINT</b><br/>
              <span style="color:#94A3B8">Time: </span>${pt.timestamp}<br/>
              <span style="color:#94A3B8">Wind: </span><span style="color:#B91C1C;font-weight:bold">${pt.windSpeedKts} kt</span><br/>
              <span style="color:#94A3B8">Pressure: </span>${pt.centralPressureHpa} hPa<br/>
              <span style="color:#94A3B8">Pos: </span>${pt.formattedLat} ${pt.formattedLon}
            </div>`
          );
          return dot;
        });
      }

      // Predicted track
      if (showPredicted && forecastPoints.length > 0) {
        const predLatLngs = [
          currentLatLng,
          ...forecastPoints.map((pt) => L.latLng(pt.latitude, pt.longitude)),
        ];
        layersRef.current.predictedLine = L.polyline(predLatLngs, {
          color: "#3B82F6",
          weight: 2.5,
          dashArray: "6 4",
          lineCap: "round",
          opacity: 0.95,
        }).addTo(map);

        layersRef.current.forecastDots = forecastPoints.map((pt) => {
          const isSelected = selectedPoint?.timeHorizon === pt.timeHorizon;
          const color = intensityColor(pt.predictedWindKts);
          const dot = L.circleMarker([pt.latitude, pt.longitude], {
            radius: isSelected ? 9 : 6.5,
            fillColor: color,
            color: "#0F172A",
            weight: 1.5,
            fillOpacity: 1,
          }).addTo(map);
          dot.bindTooltip(
            `<b style="color:#3B82F6">${pt.timeHorizon}</b> &nbsp;${pt.predictedWindKts} kt · ${pt.predictedPressureHpa} hPa`,
            { direction: "top", className: "cyclone-tooltip" }
          );
          dot.bindPopup(
            `<div style="font-family:monospace;font-size:11px;line-height:1.6">
              <b style="color:#3B82F6">FORECAST ${pt.timeHorizon}</b><br/>
              <span style="color:#94A3B8">Valid: </span>${pt.validTimestamp}<br/>
              <span style="color:#94A3B8">Wind: </span><span style="color:${color};font-weight:bold">${pt.predictedWindKts} kt</span><br/>
              <span style="color:#94A3B8">Pressure: </span>${pt.predictedPressureHpa} hPa<br/>
              <span style="color:#94A3B8">Category: </span>${pt.predictedCategory}<br/>
              <span style="color:#94A3B8">Confidence: </span><span style="color:#15803D">${pt.confidencePercent}%</span><br/>
              <span style="color:#94A3B8">Uncertainty: </span><span style="color:#0284C7">±${pt.uncertaintyRadiusKm} km</span>
            </div>`
          );
          dot.on("click", () => {
            if (onSelectForecastPoint) {
              onSelectForecastPoint(selectedPoint?.timeHorizon === pt.timeHorizon ? null : pt);
            }
          });
          return dot;
        });
      }

      // Wind rings
      if (showWindField) {
        const windData = [
          { r: 80000, color: "#B91C1C" },
          { r: 150000, color: "#B45309" },
          { r: 250000, color: "#0284C7" },
        ];
        layersRef.current.windRings = windData.map(({ r, color }) =>
          L.circle(currentLatLng, {
            radius: r, color, weight: 0.8, fillOpacity: 0, dashArray: "4 3", opacity: 0.5,
          }).addTo(map)
        );
      }

      // Precipitation rings
      if (showPrecipitation) {
        const precipData = [
          { r: 60000, color: "#B91C1C", fo: 0.25 },
          { r: 100000, color: "#B45309", fo: 0.18 },
          { r: 150000, color: "#15803D", fo: 0.12 },
        ];
        layersRef.current.precipRings = precipData.map(({ r, color, fo }) =>
          L.circle(currentLatLng, { radius: r, color, fillColor: color, weight: 0, fillOpacity: fo }).addTo(map)
        );
      }

      // SST (Sea Surface Temperature) thermal anomaly layer
      if (showSst) {
        const sstLat = cyclone.currentCoord.latitude - 1.2;
        const sstLon = cyclone.currentCoord.longitude + 0.8;
        layersRef.current.windRings.push(
          L.circle([sstLat, sstLon], {
            radius: 350000,
            color: "#B45309",
            fillColor: "#B45309",
            weight: 1,
            fillOpacity: 0.14,
            dashArray: "4 4",
          }).addTo(map)
        );
      }

      // Current storm position – outer pulse ring
      layersRef.current.currentMarker = L.circle(currentLatLng, {
        radius: 26000, color: "#B91C1C", fillColor: "#B91C1C", fillOpacity: 0.20, weight: 2, opacity: 0.8,
      }).addTo(map);

      // Inner dot
      layersRef.current.pulseMarker = L.circleMarker(currentLatLng, {
        radius: 8, fillColor: "#B91C1C", color: "#FFFFFF", weight: 2, fillOpacity: 1,
      }).addTo(map);

      layersRef.current.pulseMarker.bindPopup(
        `<div style="font-family:monospace;font-size:11px;line-height:1.7">
          <b style="color:#B91C1C;font-size:12px">⚡ ${cyclone.name} — ACTIVE</b><br/>
          <span style="color:#94A3B8">Code: </span>${cyclone.code}<br/>
          <span style="color:#94A3B8">Basin: </span>${cyclone.basin}<br/>
          <span style="color:#94A3B8">Category: </span><span style="color:#B91C1C">${cyclone.currentCategory}</span><br/>
          <span style="color:#94A3B8">Wind: </span><span style="color:#B91C1C;font-weight:bold">${cyclone.maxSustainedWindKts} kt</span><br/>
          <span style="color:#94A3B8">Pressure: </span>${cyclone.centralPressureHpa} hPa<br/>
          <span style="color:#94A3B8">Movement: </span>${cyclone.movementDirection} @ ${cyclone.movementSpeedKts} kt<br/>
          <span style="color:#94A3B8">Updated: </span><span style="color:#0284C7">${cyclone.lastUpdatedUtc}</span>
        </div>`
      );
    },
    [cyclone, forecastPoints, selectedPoint, showObserved, showPredicted, showUncertainty, showWindField, showPrecipitation, showSst, onSelectForecastPoint, clearLayers]
  );

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current || mapRef.current) return;

      // @ts-expect-error – private Leaflet internals
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapContainerRef.current!, {
        center: [cyclone.currentCoord.latitude, cyclone.currentCoord.longitude],
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
        maxZoom: 18,
        minZoom: 2,
        worldCopyJump: true,
      });

      // Natural colorful basemap (OpenStreetMap) - default
      const colorTile = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { subdomains: ["a", "b", "c"], maxZoom: 19, opacity: 1 }
      );

      colorTile.addTo(map);
      colorTile.bringToBack();
      tileLayersRef.current = [colorTile];

      mapRef.current = map;

      map.on("mousemove", (e) => {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;
        setMouseCoords({
          lat: `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? "N" : "S"}`,
          lon: `${Math.abs(lon).toFixed(2)}° ${lon >= 0 ? "E" : "W"}`,
        });
      });

      map.on("zoomend", () => setZoomLevel(map.getZoom()));

      drawAllLayers(L, map);
    });

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      tileLayersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redraw when data/toggles change
  useEffect(() => {
    if (!mapRef.current) return;
    import("leaflet").then((L) => {
      if (!mapRef.current) return;
      drawAllLayers(L, mapRef.current);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cyclone, forecastPoints, selectedPoint, showObserved, showPredicted, showUncertainty, showWindField, showPrecipitation, showSst]);

  // Switch basemap between Dark, Standard Colorful, and Satellite
  useEffect(() => {
    if (!mapRef.current) return;
    import("leaflet").then((L) => {
      if (!mapRef.current) return;
      tileLayersRef.current.forEach((layer) => {
        if (mapRef.current?.hasLayer(layer)) {
          mapRef.current.removeLayer(layer);
        }
      });
      tileLayersRef.current = [];

      if (basemapStyle === "satellite") {
        const satBase = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          { maxZoom: 18, opacity: 1 }
        );
        const satRef = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
          { maxZoom: 18, opacity: 0.9 }
        );
        satBase.addTo(mapRef.current);
        satRef.addTo(mapRef.current);
        satBase.bringToBack();
        satRef.bringToBack();
        tileLayersRef.current = [satBase, satRef];
      } else if (basemapStyle === "streets") {
        // OpenStreetMap colorful
        const streetTile = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          { subdomains: ["a", "b", "c"], maxZoom: 19, opacity: 1 }
        );
        streetTile.addTo(mapRef.current);
        streetTile.bringToBack();
        tileLayersRef.current = [streetTile];
      } else {
        // "dark" - ESRI Dark Gray Canvas
        const darkBase = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
          { maxZoom: 16, opacity: 1 }
        );
        const darkRef = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
          { maxZoom: 16, opacity: 0.85 }
        );
        darkBase.addTo(mapRef.current);
        darkRef.addTo(mapRef.current);
        darkBase.bringToBack();
        darkRef.bringToBack();
        tileLayersRef.current = [darkBase, darkRef];
      }
    });
  }, [basemapStyle]);

  const handleZoomIn = () => {
    mapRef.current?.setZoom(Math.min((mapRef.current.getZoom() || 5) + 1, 16));
  };
  const handleZoomOut = () => {
    mapRef.current?.setZoom(Math.max((mapRef.current.getZoom() || 5) - 1, 2));
  };
  const handleReset = () => {
    mapRef.current?.setView(
      [cyclone.currentCoord.latitude, cyclone.currentCoord.longitude],
      5,
      { animate: true }
    );
  };

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      className={`relative bg-[#0F172A] border border-[#334155] rounded-[4px] overflow-hidden flex flex-col ${className}`}
    >
      {/* Top Toolbar */}
      <div className="h-10 bg-[#1E293B] border-b border-[#334155] px-3 flex items-center justify-between z-10 select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          <Crosshair className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span className="text-xs font-mono font-bold text-[#F1F5F9]">SITUATION MAP</span>
          <span className="text-[10px] font-mono text-[#94A3B8]">WORLD — NIO BASIN</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomIn}
            className="p-1 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F172A] border border-[#334155] rounded-[4px] transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F172A] border border-[#334155] rounded-[4px] transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-0.5 text-[10px] font-mono text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F172A] border border-[#334155] rounded-[4px] transition-colors flex items-center gap-1"
            title="Reset View"
          >
            <RotateCcw className="w-3 h-3" />
            RESET
          </button>
        </div>
      </div>

      {/* Map Container - wrapped in isolation to contain Leaflet's internal z-indices */}
      <div className="map-isolation-wrapper flex-1 min-h-[380px]" onWheel={handleWheel}>
        <div
          ref={mapContainerRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: "#0F172A" }}
        />

        {/* Intensity & Track Legend (Clean Anchored Panel) */}
        <div className="absolute bottom-2 right-2 z-[1000] bg-[#1E293B]/95 border border-[#334155] rounded-[4px] p-2 text-[9px] font-mono text-[#94A3B8] space-y-1 backdrop-blur-sm select-none pointer-events-none shadow-md">
          <div className="text-[#F1F5F9] uppercase font-bold mb-1 tracking-wider">INTENSITY & TRACK</div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-[#B91C1C]" />
            <span className="text-[#F1F5F9]">Critical / Current (≥115 kt)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-[#B45309]" />
            <span className="text-[#F1F5F9]">Warning (64–114 kt)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-[#15803D]" />
            <span className="text-[#F1F5F9]">Weakening (&lt;64 kt)</span>
          </div>
          <div className="border-t border-[#334155] mt-1 pt-1 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-4 h-0.5 bg-[#15803D]" />
              <span>Observed Track</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-4 border-t-2 border-dashed border-[#3B82F6]" />
              <span>Forecast Track</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-2 bg-[#3B82F6]/30 border border-[#3B82F6]" />
              <span>Uncertainty Cone (20%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Layer Toggle Ribbon */}
      <div className="px-3 py-1.5 bg-[#1E293B] border-t border-[#334155] flex items-center justify-between gap-4 text-xs font-mono z-10 overflow-x-auto flex-shrink-0">
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-[10px] text-[#94A3B8] uppercase font-bold flex items-center gap-1 flex-shrink-0">
            <Layers className="w-3 h-3 text-[#3B82F6]" /> LAYERS:
          </span>
          {[
            { label: "Observed", state: showObserved, set: setShowObserved, accent: "#15803D" },
            { label: "Predicted", state: showPredicted, set: setShowPredicted, accent: "#3B82F6" },
            { label: "Cone", state: showUncertainty, set: setShowUncertainty, accent: "#0284C7" },
          ].map(({ label, state, set, accent }) => (
            <label key={label} className="flex items-center gap-1.5 cursor-pointer text-[#94A3B8] hover:text-[#F1F5F9] flex-shrink-0">
              <input
                type="checkbox" checked={state}
                onChange={(e) => set(e.target.checked)}
                className="rounded-[2px]"
                style={{ accentColor: accent }}
              />
              <span className="text-[11px]">{label}</span>
            </label>
          ))}
          <label className="flex items-center gap-1.5 cursor-pointer text-[#94A3B8] hover:text-[#F1F5F9] flex-shrink-0">
            <input type="checkbox" checked={showWindField} onChange={(e) => setShowWindField(e.target.checked)} className="rounded-[2px]" style={{ accentColor: "#0284C7" }} />
            <span className="text-[11px] flex items-center gap-1"><Wind className="w-2.5 h-2.5 text-[#0284C7]" /> Wind</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-[#94A3B8] hover:text-[#F1F5F9] flex-shrink-0">
            <input type="checkbox" checked={showPrecipitation} onChange={(e) => setShowPrecipitation(e.target.checked)} className="rounded-[2px]" style={{ accentColor: "#15803D" }} />
            <span className="text-[11px] flex items-center gap-1"><Droplets className="w-2.5 h-2.5 text-[#15803D]" /> Precip</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-[#94A3B8] hover:text-[#F1F5F9] flex-shrink-0">
            <input type="checkbox" checked={showSst} onChange={(e) => setShowSst(e.target.checked)} className="rounded-[2px]" style={{ accentColor: "#B45309" }} />
            <span className="text-[11px] flex items-center gap-1"><Thermometer className="w-2.5 h-2.5 text-[#B45309]" /> SST</span>
          </label>
        </div>

        {/* Basemap Style Switcher */}
        <div className="flex items-center gap-1 bg-[#0F172A] border border-[#334155] rounded-[4px] p-0.5 ml-auto flex-shrink-0">
          <span className="text-[10px] text-[#94A3B8] uppercase px-1 font-bold">STYLE:</span>
          {(
            [
              { id: "dark", label: "Dark" },
              { id: "streets", label: "Color" },
              { id: "satellite", label: "Satellite" },
            ] as const
          ).map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBasemapStyle(b.id)}
              className={`px-2 py-0.5 text-[11px] font-mono rounded-[2px] transition-colors ${
                basemapStyle === b.id
                  ? "bg-[#3B82F6] text-[#F1F5F9] font-bold shadow-sm"
                  : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B]"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
