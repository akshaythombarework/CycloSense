"use client";

import React, { useState, useRef, useEffect } from "react";
import { ActiveCyclone, TrackPoint } from "@/types/cyclone";
import { ForecastPoint } from "@/types/prediction";
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Crosshair,
  Compass,
  Radio,
  Eye,
  Wind,
  Droplets,
  Thermometer,
  ShieldAlert,
} from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

interface MissionMapProps {
  cyclone: ActiveCyclone;
  forecastPoints: ForecastPoint[];
  selectedPoint?: ForecastPoint | null;
  onSelectForecastPoint?: (point: ForecastPoint | null) => void;
  className?: string;
}

export const MissionMap: React.FC<MissionMapProps> = ({
  cyclone,
  forecastPoints,
  selectedPoint,
  onSelectForecastPoint,
  className = "",
}) => {
  // Map Layer States
  const [showObserved, setShowObserved] = useState(true);
  const [showPredicted, setShowPredicted] = useState(true);
  const [showUncertainty, setShowUncertainty] = useState(true);
  const [showWindField, setShowWindField] = useState(false);
  const [showPrecipitation, setShowPrecipitation] = useState(false);
  const [showSst, setShowSst] = useState(false);
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [showSatelliteOverlay, setShowSatelliteOverlay] = useState(false);

  // Zoom & Pan State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mouseCoords, setMouseCoords] = useState<{ lat: string; lon: string }>({
    lat: "15.42° N",
    lon: "087.31° E",
  });
  const [hoveredPoint, setHoveredPoint] = useState<ForecastPoint | TrackPoint | null>(null);

  // Map coordinate boundary for North Indian Ocean (60°E to 100°E, 5°N to 26°N)
  const MIN_LON = 62.0;
  const MAX_LON = 98.0;
  const MIN_LAT = 5.0;
  const MAX_LAT = 25.0;

  const latToY = (lat: number, height: number) => {
    return ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * height;
  };

  const lonToX = (lon: number, width: number) => {
    return ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * width;
  };

  const xyToGeo = (x: number, y: number, width: number, height: number) => {
    const lon = MIN_LON + (x / width) * (MAX_LON - MIN_LON);
    const lat = MAX_LAT - (y / height) * (MAX_LAT - MIN_LAT);
    return {
      lat: `${lat.toFixed(2)}° ${lat >= 0 ? "N" : "S"}`,
      lon: `${lon.toFixed(2)}° ${lon >= 0 ? "E" : "W"}`,
    };
  };

  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - panOffset.x) / zoomLevel;
      const y = (e.clientY - rect.top - panOffset.y) / zoomLevel;
      const coords = xyToGeo(x, y, rect.width, rect.height);
      setMouseCoords(coords);
    }

    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - panOffset.x,
        y: e.clientY - panOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Dimensions for coordinate calculation
  const width = 800;
  const height = 500;

  // Track points mapping
  const observedCoords = cyclone.observedTrack.map((pt) => ({
    x: lonToX(pt.longitude, width),
    y: latToY(pt.latitude, height),
    data: pt,
  }));

  const predictedCoords = [
    {
      x: lonToX(cyclone.currentCoord.longitude, width),
      y: latToY(cyclone.currentCoord.latitude, height),
    },
    ...forecastPoints.map((pt) => ({
      x: lonToX(pt.longitude, width),
      y: latToY(pt.latitude, height),
      data: pt,
    })),
  ];

  // Observed track path string
  const observedPath = observedCoords.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`,
    ""
  );

  // Predicted track path string
  const predictedPath = predictedCoords.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`,
    ""
  );

  // Uncertainty cone polygon points
  const currentX = lonToX(cyclone.currentCoord.longitude, width);
  const currentY = latToY(cyclone.currentCoord.latitude, height);

  const coneNorth = forecastPoints.map((pt) => ({
    x: lonToX(pt.trackProbabilityCone.lonNorth, width),
    y: latToY(pt.trackProbabilityCone.latNorth, height),
  }));

  const coneSouth = [...forecastPoints]
    .reverse()
    .map((pt) => ({
      x: lonToX(pt.trackProbabilityCone.lonSouth, width),
      y: latToY(pt.trackProbabilityCone.latSouth, height),
    }));

  const uncertaintyPolygon = [
    `M ${currentX} ${currentY}`,
    ...coneNorth.map((p) => `L ${p.x} ${p.y}`),
    ...coneSouth.map((p) => `L ${p.x} ${p.y}`),
    "Z",
  ].join(" ");

  return (
    <div
      className={`relative bg-[#070B14] border border-[#263449] rounded-[4px] overflow-hidden flex flex-col ${className}`}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Map Toolbar */}
      <div className="h-10 bg-[#0B1120] border-b border-[#263449] px-3 flex items-center justify-between z-10 select-none">
        <div className="flex items-center gap-2">
          <Crosshair className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span className="text-xs font-mono font-bold text-[#F8FAFC]">
            SITUATION MAP
          </span>
          <span className="text-[10px] font-mono text-[#64748B]">
            NIO BASIN (BAY OF BENGAL / ARABIAN SEA)
          </span>
        </div>

        {/* Live Cursor Coordinate Readout */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#111827] border border-[#263449] rounded-[3px] text-[#CBD5E1]">
            <span className="text-[#64748B]">CURSOR:</span>
            <span className="text-[#38BDF8] font-bold">{mouseCoords.lat}</span>
            <span className="text-[#64748B]">|</span>
            <span className="text-[#38BDF8] font-bold">{mouseCoords.lon}</span>
          </div>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 3))}
            className="p-1 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#172033] border border-[#263449] rounded-[3px]"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.3, 0.7))}
            className="p-1 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#172033] border border-[#263449] rounded-[3px]"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-0.5 text-[10px] font-mono text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#172033] border border-[#263449] rounded-[3px]"
            title="Reset Map View"
          >
            RESET
          </button>
        </div>
      </div>

      {/* Main Map SVG Area */}
      <div
        className="relative flex-1 bg-[#060A12] cursor-grab active:cursor-grabbing overflow-hidden min-h-[380px]"
        onMouseDown={handleMouseDown}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          onMouseMove={handleMouseMove}
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.15s ease-out",
          }}
        >
          <defs>
            {/* Graticule Pattern */}
            <pattern
              id="graticule"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#162235"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            </pattern>

            {/* SST Heatmap Gradient Simulation */}
            <linearGradient id="sstGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.45" />
            </linearGradient>

            {/* Satellite Raster Overlay simulation */}
            <radialGradient
              id="satelliteStormOverlay"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="25%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#1E3A8A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0B1120" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Graticule Grid */}
          <rect width={width} height={height} fill="url(#graticule)" />

          {/* SST Overlay if toggled */}
          {showSst && (
            <rect
              x="100"
              y="150"
              width="600"
              height="300"
              fill="url(#sstGrad)"
              className="transition-opacity duration-300"
            />
          )}

          {/* Geo Coastlines & Islands (India, Sri Lanka, Myanmar, Bangladesh, Andaman) */}
          {showBoundaries && (
            <g
              stroke="#2E4057"
              strokeWidth="1.2"
              fill="#0E1626"
              fillOpacity="0.85"
            >
              {/* Indian Subcontinent Coastline */}
              <path d="M 120 40 L 160 80 L 170 120 L 165 170 L 195 210 L 220 270 L 245 340 L 285 410 L 310 440 L 315 420 L 330 380 L 360 320 L 400 270 L 450 230 L 490 200 L 520 180 L 515 150 L 480 120 L 420 80 L 350 50 Z" />

              {/* Sri Lanka */}
              <path d="M 320 450 L 340 455 L 350 480 L 335 500 L 315 485 Z" />

              {/* Bangladesh & Myanmar Coastline */}
              <path d="M 520 180 L 550 170 L 580 190 L 610 230 L 640 290 L 670 370 L 680 430 L 660 440 L 630 360 L 590 280 L 560 220 Z" />

              {/* Andaman & Nicobar Islands Arc */}
              <path d="M 640 330 L 644 332 L 642 350 L 638 348 Z" />
              <path d="M 645 365 L 648 368 L 646 390 L 643 388 Z" />
              <path d="M 655 420 L 658 422 L 656 445 L 652 443 Z" />
            </g>
          )}

          {/* Latitude / Longitude Labels on Map */}
          <g fill="#475569" fontSize="9" fontFamily="monospace">
            <text x="10" y="50">
              25°N
            </text>
            <text x="10" y="150">
              20°N
            </text>
            <text x="10" y="260">
              15°N
            </text>
            <text x="10" y="370">
              10°N
            </text>
            <text x="10" y="480">
              5°N
            </text>

            <text x="120" y={height - 10}>
              65°E (Arabian Sea)
            </text>
            <text x="360" y={height - 10}>
              80°E
            </text>
            <text x="540" y={height - 10}>
              90°E (Bay of Bengal)
            </text>
            <text x="700" y={height - 10}>
              98°E
            </text>
          </g>

          {/* Simulated Satellite Multispectral Overlay */}
          {showSatelliteOverlay && (
            <circle
              cx={currentX}
              cy={currentY}
              r="140"
              fill="url(#satelliteStormOverlay)"
              className="animate-pulse"
            />
          )}

          {/* Wind Field Vectors Layer */}
          {showWindField && (
            <g stroke="#38BDF8" strokeWidth="0.8" opacity="0.6">
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const r1 = 50;
                const r2 = 90;
                const x1 = currentX + Math.cos(angle) * r1;
                const y1 = currentY + Math.sin(angle) * r1;
                const x2 = currentX + Math.cos(angle + 0.3) * r2;
                const y2 = currentY + Math.sin(angle + 0.3) * r2;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    markerEnd="url(#arrow)"
                    strokeDasharray="3,2"
                  />
                );
              })}
            </g>
          )}

          {/* Precipitation Radar Simulation */}
          {showPrecipitation && (
            <g opacity="0.5">
              <circle
                cx={currentX}
                cy={currentY}
                r="60"
                fill="#EF4444"
                opacity="0.3"
              />
              <circle
                cx={currentX}
                cy={currentY}
                r="95"
                fill="#F59E0B"
                opacity="0.2"
              />
              <circle
                cx={currentX}
                cy={currentY}
                r="135"
                fill="#22C55E"
                opacity="0.15"
              />
            </g>
          )}

          {/* 1. UNCERTAINTY CONE (Semi-transparent blue polygon) */}
          {showUncertainty && (
            <path
              d={uncertaintyPolygon}
              fill="#38BDF8"
              fillOpacity="0.12"
              stroke="#38BDF8"
              strokeWidth="1"
              strokeDasharray="4,4"
              strokeOpacity="0.4"
            />
          )}

          {/* 2. OBSERVED TRACK (Solid Cyan Line) */}
          {showObserved && (
            <g>
              <path
                d={observedPath}
                fill="none"
                stroke="#22C55E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {observedCoords.map((pt, idx) => (
                <circle
                  key={`obs-${idx}`}
                  cx={pt.x}
                  cy={pt.y}
                  r={idx === observedCoords.length - 1 ? 5 : 3.5}
                  fill="#0B1120"
                  stroke="#22C55E"
                  strokeWidth="2"
                  className="cursor-pointer hover:r-6 transition-all"
                  onMouseEnter={() => setHoveredPoint(pt.data)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              ))}
            </g>
          )}

          {/* 3. PREDICTED TRACK (Dashed Blue Line) */}
          {showPredicted && (
            <g>
              <path
                d={predictedPath}
                fill="none"
                stroke="#60A5FA"
                strokeWidth="2"
                strokeDasharray="6,4"
                strokeLinecap="round"
              />

              {/* Forecast Points (+6h, +12h, +24h, +48h) */}
              {forecastPoints.map((pt, idx) => {
                const px = lonToX(pt.longitude, width);
                const py = latToY(pt.latitude, height);
                const isSelected = selectedPoint?.timeHorizon === pt.timeHorizon;

                return (
                  <g
                    key={`fc-${idx}`}
                    className="cursor-pointer group"
                    onClick={() =>
                      onSelectForecastPoint &&
                      onSelectForecastPoint(isSelected ? null : pt)
                    }
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    {/* Forecast uncertainty halo ring */}
                    <circle
                      cx={px}
                      cy={py}
                      r={pt.uncertaintyRadiusKm * 0.15}
                      fill="#60A5FA"
                      fillOpacity="0.08"
                      stroke="#60A5FA"
                      strokeWidth="0.8"
                      strokeDasharray="2,2"
                    />

                    {/* Forecast Marker Point */}
                    <circle
                      cx={px}
                      cy={py}
                      r={isSelected ? 6 : 4.5}
                      fill={isSelected ? "#38BDF8" : "#111827"}
                      stroke="#60A5FA"
                      strokeWidth="2"
                      className="transition-all"
                    />

                    {/* Lead Time Label */}
                    <text
                      x={px + 8}
                      y={py - 6}
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {pt.timeHorizon} ({pt.predictedWindKts}kt)
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Current Storm Position Pulse Marker */}
          <g>
            <circle
              cx={currentX}
              cy={currentY}
              r="14"
              fill="#F43F5E"
              fillOpacity="0.25"
              className="animate-ping"
            />
            <circle
              cx={currentX}
              cy={currentY}
              r="7"
              fill="#F43F5E"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <text
              x={currentX + 12}
              y={currentY + 4}
              fill="#F8FAFC"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {cyclone.name} (NOW • {cyclone.maxSustainedWindKts} kt)
            </text>
          </g>
        </svg>

        {/* Hover / Selection Popup Details Card */}
        {(() => {
          const activePt = hoveredPoint || selectedPoint;
          if (!activePt) return null;

          const isForecast = "timeHorizon" in activePt;
          const title = isForecast ? `FORECAST ${(activePt as ForecastPoint).timeHorizon}` : "OBSERVED WAYPOINT";
          const time = isForecast ? (activePt as ForecastPoint).validTimestamp : (activePt as TrackPoint).timestamp;
          const wind = isForecast ? (activePt as ForecastPoint).predictedWindKts : (activePt as TrackPoint).windSpeedKts;
          const pressure = isForecast ? (activePt as ForecastPoint).predictedPressureHpa : (activePt as TrackPoint).centralPressureHpa;
          const confidence = isForecast ? (activePt as ForecastPoint).confidencePercent : null;

          return (
            <div className="absolute top-3 left-3 z-20 w-64 p-2.5 bg-[#111827]/95 border border-[#334155] rounded-[4px] shadow-2xl backdrop-blur-sm text-xs font-mono">
              <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-[#263449]">
                <span className="font-bold text-[#F8FAFC]">{title}</span>
                <span className="text-[10px] text-[#38BDF8]">{time}</span>
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">COORDINATES:</span>
                  <span className="text-[#F8FAFC]">
                    {activePt.formattedLat} • {activePt.formattedLon}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">WIND SPEED:</span>
                  <span className="text-[#F43F5E] font-bold">{wind} kt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">PRESSURE:</span>
                  <span className="text-[#CBD5E1]">{pressure} hPa</span>
                </div>
                {confidence !== null && (
                  <div className="flex justify-between pt-1 border-t border-[#1E293B]">
                    <span className="text-[#94A3B8]">CONFIDENCE:</span>
                    <span className="text-[#22C55E] font-bold">{confidence}%</span>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Map Legend (Bottom Right) */}
        <div className="absolute bottom-2 right-2 bg-[#111827]/90 border border-[#263449] rounded-[3px] p-2 text-[10px] font-mono text-[#CBD5E1] space-y-1 backdrop-blur-sm select-none pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
            <span>● Current Center</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-[#22C55E]" />
            <span>━━ Observed Track</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-b border-dashed border-[#60A5FA]" />
            <span>- - Predicted Track</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 bg-[#38BDF8]/20 border border-dashed border-[#38BDF8]" />
            <span>░░ Uncertainty Cone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full border border-[#60A5FA] bg-[#111827]" />
            <span>○ Forecast Point</span>
          </div>
        </div>
      </div>

      {/* Bottom Layer Toggle Ribbon */}
      <div className="px-3 py-1.5 bg-[#0B1120] border-t border-[#263449] flex items-center justify-between text-xs font-mono z-10 overflow-x-auto">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[#64748B] uppercase font-bold flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#38BDF8]" /> LAYERS:
          </span>

          <label className="flex items-center gap-1.5 cursor-pointer text-[#CBD5E1] hover:text-[#F8FAFC]">
            <input
              type="checkbox"
              checked={showObserved}
              onChange={(e) => setShowObserved(e.target.checked)}
              className="accent-[#22C55E] rounded-[2px]"
            />
            <span className="text-[11px]">Observed</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-[#CBD5E1] hover:text-[#F8FAFC]">
            <input
              type="checkbox"
              checked={showPredicted}
              onChange={(e) => setShowPredicted(e.target.checked)}
              className="accent-[#60A5FA] rounded-[2px]"
            />
            <span className="text-[11px]">Predicted</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-[#CBD5E1] hover:text-[#F8FAFC]">
            <input
              type="checkbox"
              checked={showUncertainty}
              onChange={(e) => setShowUncertainty(e.target.checked)}
              className="accent-[#38BDF8] rounded-[2px]"
            />
            <span className="text-[11px]">Uncertainty Cone</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-[#CBD5E1] hover:text-[#F8FAFC]">
            <input
              type="checkbox"
              checked={showWindField}
              onChange={(e) => setShowWindField(e.target.checked)}
              className="accent-[#38BDF8] rounded-[2px]"
            />
            <span className="text-[11px] flex items-center gap-1">
              <Wind className="w-2.5 h-2.5 text-[#38BDF8]" /> Wind Field
            </span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-[#CBD5E1] hover:text-[#F8FAFC]">
            <input
              type="checkbox"
              checked={showPrecipitation}
              onChange={(e) => setShowPrecipitation(e.target.checked)}
              className="accent-[#22C55E] rounded-[2px]"
            />
            <span className="text-[11px] flex items-center gap-1">
              <Droplets className="w-2.5 h-2.5 text-[#22C55E]" /> Precipitation
            </span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-[#CBD5E1] hover:text-[#F8FAFC]">
            <input
              type="checkbox"
              checked={showSst}
              onChange={(e) => setShowSst(e.target.checked)}
              className="accent-[#F59E0B] rounded-[2px]"
            />
            <span className="text-[11px] flex items-center gap-1">
              <Thermometer className="w-2.5 h-2.5 text-[#F59E0B]" /> SST
            </span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-[#CBD5E1] hover:text-[#F8FAFC]">
            <input
              type="checkbox"
              checked={showSatelliteOverlay}
              onChange={(e) => setShowSatelliteOverlay(e.target.checked)}
              className="accent-[#A78BFA] rounded-[2px]"
            />
            <span className="text-[11px] flex items-center gap-1">
              <Eye className="w-2.5 h-2.5 text-[#A78BFA]" /> Satellite Swath
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
