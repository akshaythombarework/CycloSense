"use client";

import React from "react";
import { VisibleAnalysisMetrics } from "@/types/satellite";
import { GeoCoordinate } from "@/types/cyclone";
import { Eye, Sun, Layers, Compass } from "lucide-react";
import { DataProvenanceBadge } from "../ui/DataProvenanceBadge";

interface VisibleViewerProps {
  metrics: VisibleAnalysisMetrics;
  centerCoord: GeoCoordinate;
  timestamp: string;
}

export const VisibleViewer: React.FC<VisibleViewerProps> = ({
  metrics,
  centerCoord,
  timestamp,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 h-full">
      {/* Left: Visible Satellite Canvas */}
      <div className="flex-1 bg-[#060A12] border border-[#263449] rounded-[4px] relative overflow-hidden flex flex-col min-h-[380px]">
        <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#111827]/90 border border-[#263449] rounded-[3px] text-[10px] font-mono text-[#F59E0B] font-bold backdrop-blur-sm">
            INSAT-3D VIS (0.65 µm Optical)
          </span>
          <span className="px-2 py-0.5 bg-[#111827]/90 border border-[#263449] rounded-[3px] text-[10px] font-mono text-[#CBD5E1] backdrop-blur-sm">
            {timestamp} (DAYLIGHT)
          </span>
        </div>

        <div className="absolute top-2 right-2 z-10">
          <DataProvenanceBadge
            source="INSAT-3D / VIS (ISRO NRSC)"
            timestamp={timestamp}
            resolution="1.0 km (High-Res Nadir)"
            processingState="Reflectance Calibrated"
            quality="VALID"
          />
        </div>

        {/* Canvas Visual of Visible Cloud Banding and High Albedo Eyewall */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          <svg viewBox="0 0 500 400" className="w-full h-full max-h-[440px]">
            <defs>
              <radialGradient id="visAlbedo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0B1120" stopOpacity="0.8" /> {/* Dark Eye Void */}
                <stop offset="10%" stopColor="#FFFFFF" stopOpacity="1" /> {/* Bright White Eyewall */}
                <stop offset="40%" stopColor="#E2E8F0" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#94A3B8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0B1120" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background Texture & Lat/Lon lines */}
            <g stroke="#162235" strokeWidth="0.5" strokeDasharray="3,3">
              <line x1="50" y1="0" x2="50" y2="400" />
              <line x1="150" y1="0" x2="150" y2="400" />
              <line x1="250" y1="0" x2="250" y2="400" />
              <line x1="350" y1="0" x2="350" y2="400" />
              <line x1="450" y1="0" x2="450" y2="400" />
              <line x1="0" y1="100" x2="500" y2="100" />
              <line x1="0" y1="200" x2="500" y2="200" />
              <line x1="0" y1="300" x2="500" y2="300" />
            </g>

            {/* High-Contrast Spiral Optical Feeder Bands */}
            <path
              d="M 250 200 Q 360 110 440 170 Q 480 260 390 330 Q 270 380 150 330 Q 70 250 110 140 Q 160 60 280 80"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="24"
              strokeLinecap="round"
              opacity="0.75"
            />
            <path
              d="M 250 200 Q 160 130 120 210 Q 140 310 230 330 Q 330 320 360 230"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="18"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Bright Central Eyewall Albedo */}
            <circle cx="250" cy="200" r="120" fill="url(#visAlbedo)" />

            {/* Dark Eye Void */}
            <circle cx="250" cy="200" r="14" fill="#0B1120" stroke="#CBD5E1" strokeWidth="1" />

            {/* Center Crosshair */}
            <g stroke="#38BDF8" strokeWidth="1">
              <line x1="230" y1="200" x2="270" y2="200" />
              <line x1="250" y1="180" x2="250" y2="220" />
            </g>

            <text x="260" y="190" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold">
              OPTICAL CENTRE: {centerCoord.formattedLat} • {centerCoord.formattedLon}
            </text>
          </svg>
        </div>

        {/* Bottom Albedo Bar */}
        <div className="p-2.5 bg-[#0B1120] border-t border-[#263449] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
          <span>ALBEDO / OPTICAL REFLECTANCE: 0.0 (OCEAN) → 1.0 (THICK CLOUD TOP)</span>
          <span className="text-[#38BDF8]">SUN ELEVATION: 58.4°</span>
        </div>
      </div>

      {/* Right Analytics */}
      <div className="w-full lg:w-80 bg-[#111827] border border-[#263449] rounded-[4px] p-3 flex flex-col justify-between text-xs font-mono space-y-3 shrink-0">
        <div>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#263449]">
            <span className="font-bold text-[#F8FAFC] tracking-wider uppercase">
              VISIBLE OPTICAL ANALYSIS
            </span>
            <span className="text-[10px] text-[#22C55E]">✓ HIGH RESOLUTION</span>
          </div>

          <div className="space-y-2">
            <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                CLOUD ORGANIZATION
              </span>
              <span className="text-xl font-bold text-[#22C55E]">
                {metrics.cloudOrganization}
              </span>
              <span className="text-[10px] text-[#64748B] block mt-0.5">
                Tight logarithmic spiral wrapping verified
              </span>
            </div>

            <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                SPIRAL STRUCTURE
              </span>
              <span className="text-sm font-bold text-[#F8FAFC]">
                {metrics.spiralBandStructure}
              </span>
            </div>

            <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                AZIMUTHAL SYMMETRY
              </span>
              <span className="text-xl font-bold text-[#38BDF8]">
                {metrics.symmetryIndex} / 1.00
              </span>
              <span className="text-[10px] text-[#22C55E] block mt-0.5">
                High circular symmetry indicates mature storm
              </span>
            </div>

            <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                EXPOSED LOW-LEVEL CENTER
              </span>
              <span className="text-sm font-bold text-[#22C55E]">
                {metrics.exposedCenter ? "YES (SHEARED)" : "NO (FULLY EMBEDDED IN CDO)"}
              </span>
            </div>
          </div>
        </div>

        <div className="p-2 bg-[#070B14] border border-[#1E293B] rounded-[3px] text-[10px] text-[#64748B]">
          Optical channel provides finest 1 km spatial resolution for cloud boundary edge detection.
        </div>
      </div>
    </div>
  );
};
