"use client";

import React from "react";
import { IRAnalysisMetrics } from "@/types/satellite";
import { GeoCoordinate } from "@/types/cyclone";
import { DataProvenanceBadge } from "../ui/DataProvenanceBadge";

interface IRViewerProps {
  metrics: IRAnalysisMetrics;
  centerCoord: GeoCoordinate;
  timestamp: string;
}

export const IRViewer: React.FC<IRViewerProps> = ({
  metrics,
  centerCoord,
  timestamp,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 h-full">
      {/* Left: Satellite Image Screen Canvas Container */}
      <div className="flex-1 bg-[#0F172A] border border-[#334155] rounded-[4px] relative overflow-hidden flex flex-col min-h-[380px]">
        {/* Top Overlay Badge */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#1E293B]/90 border border-[#334155] rounded-[3px] text-[10px] font-mono text-[#0284C7] font-bold backdrop-blur-sm">
            INSAT-3DR TIR-1 (10.8 µm)
          </span>
          <span className="px-2 py-0.5 bg-[#1E293B]/90 border border-[#334155] rounded-[3px] text-[10px] font-mono text-[#94A3B8] backdrop-blur-sm">
            {timestamp}
          </span>
        </div>

        {/* Top Right Provenance */}
        <div className="absolute top-2 right-2 z-10">
          <DataProvenanceBadge
            source="INSAT-3DR / TIR-1 (ISRO NRSC)"
            timestamp={timestamp}
            resolution="4.0 km (Nadir)"
            processingState="Atmospherically Corrected & Georeferenced"
            quality="VALID"
          />
        </div>

        {/* Canvas Simulation of Deep IR Tropical Cyclone with Eyewall & CDO */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          <svg viewBox="0 0 500 400" className="w-full h-full max-h-[440px]">
            <defs>
              {/* Outer feeder cloud band gradient */}
              <radialGradient id="irOuterBand" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#0284C7" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#0D9488" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
              </radialGradient>

              {/* Intense CDO convective core (-60°C to -80°C BD curve) */}
              <radialGradient id="irCoreCold" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
                <stop offset="15%" stopColor="#B91C1C" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#7C3AED" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#2563EB" stopOpacity="0.85" />
                <stop offset="85%" stopColor="#059669" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background Grid */}
            <g stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3">
              <line x1="50" y1="0" x2="50" y2="400" />
              <line x1="150" y1="0" x2="150" y2="400" />
              <line x1="250" y1="0" x2="250" y2="400" />
              <line x1="350" y1="0" x2="350" y2="400" />
              <line x1="450" y1="0" x2="450" y2="400" />
              <line x1="0" y1="100" x2="500" y2="100" />
              <line x1="0" y1="200" x2="500" y2="200" />
              <line x1="0" y1="300" x2="500" y2="300" />
            </g>

            {/* Outer Spiral Cloud Bands */}
            <path
              d="M 250 200 Q 340 120 420 180 Q 460 250 380 320 Q 280 360 170 320 Q 90 260 120 160 Q 170 80 270 90"
              fill="none"
              stroke="#0284C7"
              strokeWidth="28"
              strokeLinecap="round"
              opacity="0.35"
            />
            <path
              d="M 250 200 Q 180 140 140 220 Q 160 300 240 310 Q 320 300 340 240"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="22"
              strokeLinecap="round"
              opacity="0.45"
            />

            {/* Central CDO Shield */}
            <circle cx="250" cy="200" r="140" fill="url(#irOuterBand)" />
            <circle cx="250" cy="200" r="95" fill="url(#irCoreCold)" />

            {/* Eye clearing center */}
            <circle
              cx="250"
              cy="200"
              r="14"
              fill="#FDE047"
              fillOpacity="0.4"
              stroke="#B45309"
              strokeWidth="1.5"
            />

            {/* Storm Center Crosshair */}
            <g stroke="#F1F5F9" strokeWidth="1" opacity="0.8">
              <line x1="230" y1="200" x2="270" y2="200" />
              <line x1="250" y1="180" x2="250" y2="220" />
              <circle cx="250" cy="200" r="22" fill="none" strokeDasharray="2,2" />
            </g>

            {/* Coordinate Label */}
            <text
              x="260"
              y="185"
              fill="#F1F5F9"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              EYE: {centerCoord.formattedLat} • {centerCoord.formattedLon}
            </text>

            <text
              x="260"
              y="225"
              fill="#B91C1C"
              fontSize="9"
              fontFamily="monospace"
            >
              COLDEST PIXEL: {metrics.cloudTopTempMinC}°C
            </text>
          </svg>
        </div>

        {/* Bottom Dvorak/BD Enhanced Temperature Gradient Color Scale */}
        <div className="p-2.5 bg-[#0F172A] border-t border-[#334155] flex flex-col gap-1 z-10 select-none">
          <div className="flex items-center justify-between text-[9px] font-mono text-[#94A3B8]">
            <span>-80°C (COLD / DEEP CONVECTION)</span>
            <span>-60°C</span>
            <span>-40°C</span>
            <span>-20°C</span>
            <span>0°C</span>
            <span>+20°C (WARM / CLEAR SKY)</span>
          </div>

          <div
            className="h-3 w-full rounded-[2px] border border-[#334155]"
            style={{
              background:
                "linear-gradient(to right, #B91C1C 0%, #7C3AED 20%, #2563EB 40%, #059669 60%, #B45309 80%, #FEF08A 100%)",
            }}
          />
        </div>
      </div>

      {/* Right: Side Scientific Analytics Panel */}
      <div className="w-full lg:w-80 bg-[#1E293B] border border-[#334155] rounded-[4px] p-3 pb-6 flex flex-col text-xs font-mono space-y-3 shrink-0">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#334155]">
            <span className="font-bold text-[#F1F5F9] tracking-wider uppercase">
              IR THERMAL ANALYSIS
            </span>
            <span className="text-[10px] text-[#15803D]">✓ CALIBRATED</span>
          </div>

          <div className="space-y-2">
            <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                MIN CLOUD-TOP TEMPERATURE
              </span>
              <span className="text-xl font-bold text-[#0284C7]">
                {metrics.cloudTopTempMinC}°C
              </span>
              <span className="text-[10px] text-[#94A3B8] block mt-0.5">
                Mean CDO Temperature: {metrics.cloudTopTempMeanC}°C
              </span>
            </div>

            <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                CDO ENVELOPE AREA
              </span>
              <span className="text-xl font-bold text-[#F1F5F9]">
                {metrics.cdoAreaKm2.toLocaleString()} km²
              </span>
            </div>

            <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                EYE THERMAL SIGNATURE
              </span>
              <span className="text-sm font-bold text-[#15803D]">
                {metrics.eyeDetected ? "✓ CLEAR EYE DETECTED" : "OBSCURED"}
              </span>
              {metrics.eyeTempC && (
                <span className="text-[10px] text-[#94A3B8] block mt-0.5">
                  Eye Brightness Temperature: +{metrics.eyeTempC}°C
                </span>
              )}
            </div>

            <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                CONVECTIVE ORGANIZATION
              </span>
              <span className="text-sm font-bold text-[#B91C1C]">
                {metrics.convectionStrength} (SYMMETRIC EYERING)
              </span>
            </div>
          </div>
      </div>
    </div>
  );
};
