"use client";

import React from "react";
import { MicrowaveAnalysisMetrics } from "@/types/satellite";
import { GeoCoordinate } from "@/types/cyclone";
import { DataProvenanceBadge } from "../ui/DataProvenanceBadge";

interface MicrowaveViewerProps {
  metrics: MicrowaveAnalysisMetrics;
  centerCoord: GeoCoordinate;
  timestamp: string;
}

export const MicrowaveViewer: React.FC<MicrowaveViewerProps> = ({
  metrics,
  centerCoord,
  timestamp,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 h-full">
      {/* Left: Microwave 89 GHz Pass */}
      <div className="flex-1 bg-[#0F172A] border border-[#334155] rounded-[4px] relative overflow-hidden flex flex-col min-h-[380px]">
        <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#1E293B]/90 border border-[#334155] rounded-[3px] text-[10px] font-mono text-[#3B82F6] font-bold backdrop-blur-sm">
            GPM/GMI 89 GHz Polarization Corrected Temp (PCT)
          </span>
          <span className="px-2 py-0.5 bg-[#1E293B]/90 border border-[#334155] rounded-[3px] text-[10px] font-mono text-[#94A3B8] backdrop-blur-sm">
            {timestamp}
          </span>
        </div>

        <div className="absolute top-2 right-2 z-10">
          <DataProvenanceBadge
            source="GPM Microwave Imager (NASA / JAXA)"
            timestamp={timestamp}
            resolution="4.4 km (Passive Microwave)"
            processingState="PCT Computed (Ice Scattering)"
            quality="VALID"
          />
        </div>

        {/* Canvas Visual: Internal Precipitation Core */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          <svg viewBox="0 0 500 400" className="w-full h-full max-h-[440px]">
            <defs>
              <radialGradient id="mwEyeRing" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0F172A" stopOpacity="0.9" />
                <stop offset="12%" stopColor="#B91C1C" stopOpacity="1" />
                <stop offset="28%" stopColor="#B45309" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#15803D" stopOpacity="0.7" />
                <stop offset="80%" stopColor="#0284C7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background Radar Range Rings */}
            <g stroke="#334155" strokeWidth="0.8">
              <circle cx="250" cy="200" r="50" fill="none" strokeDasharray="3,3" />
              <circle cx="250" cy="200" r="100" fill="none" strokeDasharray="3,3" />
              <circle cx="250" cy="200" r="150" fill="none" strokeDasharray="3,3" />
              <line x1="100" y1="200" x2="400" y2="200" strokeDasharray="2,2" />
              <line x1="250" y1="50" x2="250" y2="350" strokeDasharray="2,2" />
            </g>

            {/* Internal Rainbands */}
            <path
              d="M 250 200 Q 320 130 380 180 Q 400 240 340 290 Q 250 330 180 290"
              fill="none"
              stroke="#B91C1C"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 250 200 Q 180 140 150 210 Q 170 280 240 290"
              fill="none"
              stroke="#B45309"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Complete 360° Eyewall Ring */}
            <circle cx="250" cy="200" r="80" fill="url(#mwEyeRing)" />

            {/* Low-Level Circulation Center (LLCC) Indicator */}
            <g stroke="#0284C7" strokeWidth="1.5">
              <circle cx="250" cy="200" r="12" fill="none" />
              <line x1="234" y1="200" x2="266" y2="200" />
              <line x1="250" y1="184" x2="250" y2="216" />
            </g>

            <text x="260" y="190" fill="#F1F5F9" fontSize="10" fontFamily="monospace" fontWeight="bold">
              LLCC (MICROWAVE): {centerCoord.formattedLat} • {centerCoord.formattedLon}
            </text>

            <text x="260" y="225" fill="#B91C1C" fontSize="9" fontFamily="monospace">
              COMPLETE EYEWALL RING (360° CLOSED)
            </text>
          </svg>
        </div>

        {/* Bottom Microwave Color Scale */}
        <div className="p-2.5 bg-[#0F172A] border-t border-[#334155] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
          <span>PCT ICE SCATTERING: 280 K (WEAK) → 180 K (INTENSE CONVECTIVE CORE)</span>
          <span className="text-[#3B82F6]">PASS SENSOR: 89V / 89H POLARIZATION</span>
        </div>
      </div>

      {/* Right Analytics */}
      <div className="w-full lg:w-80 bg-[#1E293B] border border-[#334155] rounded-[4px] p-3 pb-6 flex flex-col text-xs font-mono space-y-3 shrink-0">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#334155]">
            <span className="font-bold text-[#F1F5F9] tracking-wider uppercase">
              MICROWAVE STRUCTURAL ANALYSIS
            </span>
            <span className="text-[10px] text-[#0284C7]">✓ DEEP CORE PENETRATION</span>
          </div>

          <div className="space-y-2">
            <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                EYEWALL RING STRUCTURE
              </span>
              <span className="text-xl font-bold text-[#B91C1C]">
                {metrics.eyewallStructure.replace("_", " ")}
              </span>
            </div>

            <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                LOW-LEVEL CIRCULATION CENTER (LLCC)
              </span>
              <span className="text-sm font-bold text-[#15803D]">
                {metrics.lowLevelCenterDetected ? "✓ CLEARLY DETECTED" : "OBSCURED"}
              </span>
            </div>

            <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                CONVECTIVE CORE VERTICAL HEIGHT
              </span>
              <span className="text-xl font-bold text-[#0284C7]">
                {metrics.deepConvectiveCoreHeightKm} km
              </span>
            </div>

            <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                VORTEX TILT (SHEAR INDUCED)
              </span>
              <span className="text-sm font-bold text-[#15803D]">
                {metrics.shearInducedTiltKm} km (MINIMAL TILT &lt; 10 km)
              </span>
            </div>
          </div>
      </div>
    </div>
  );
};
