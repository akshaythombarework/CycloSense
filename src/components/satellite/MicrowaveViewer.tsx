"use client";

import React from "react";
import { MicrowaveAnalysisMetrics } from "@/types/satellite";
import { GeoCoordinate } from "@/types/cyclone";
import { Radio, Radar, ShieldCheck, Activity } from "lucide-react";
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
      <div className="flex-1 bg-[#060A12] border border-[#263449] rounded-[4px] relative overflow-hidden flex flex-col min-h-[380px]">
        <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#111827]/90 border border-[#263449] rounded-[3px] text-[10px] font-mono text-[#A78BFA] font-bold backdrop-blur-sm">
            GPM/GMI 89 GHz Polarization Corrected Temp (PCT)
          </span>
          <span className="px-2 py-0.5 bg-[#111827]/90 border border-[#263449] rounded-[3px] text-[10px] font-mono text-[#CBD5E1] backdrop-blur-sm">
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

        {/* Canvas Visual: Internal Precipitation Core (Deep Eyewall Ice Scattering) */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          <svg viewBox="0 0 500 400" className="w-full h-full max-h-[440px]">
            <defs>
              <radialGradient id="mwEyeRing" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0B1120" stopOpacity="0.9" /> {/* Clear Microwave Eye */}
                <stop offset="12%" stopColor="#EF4444" stopOpacity="1" /> {/* Heavy Ice Scattering / Intense Eyewall Rain */}
                <stop offset="28%" stopColor="#F59E0B" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#22C55E" stopOpacity="0.7" />
                <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0B1120" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background Radar Range Rings */}
            <g stroke="#162235" strokeWidth="0.8">
              <circle cx="250" cy="200" r="50" fill="none" strokeDasharray="3,3" />
              <circle cx="250" cy="200" r="100" fill="none" strokeDasharray="3,3" />
              <circle cx="250" cy="200" r="150" fill="none" strokeDasharray="3,3" />
              <line x1="100" y1="200" x2="400" y2="200" strokeDasharray="2,2" />
              <line x1="250" y1="50" x2="250" y2="350" strokeDasharray="2,2" />
            </g>

            {/* Internal Rainbands piercing high cirrus */}
            <path
              d="M 250 200 Q 320 130 380 180 Q 400 240 340 290 Q 250 330 180 290"
              fill="none"
              stroke="#EF4444"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 250 200 Q 180 140 150 210 Q 170 280 240 290"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Complete 360° Eyewall Ring */}
            <circle cx="250" cy="200" r="80" fill="url(#mwEyeRing)" />

            {/* Low-Level Circulation Center (LLCC) Indicator */}
            <g stroke="#38BDF8" strokeWidth="1.5">
              <circle cx="250" cy="200" r="12" fill="none" />
              <line x1="234" y1="200" x2="266" y2="200" />
              <line x1="250" y1="184" x2="250" y2="216" />
            </g>

            <text x="260" y="190" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold">
              LLCC (MICROWAVE): {centerCoord.formattedLat} • {centerCoord.formattedLon}
            </text>

            <text x="260" y="225" fill="#EF4444" fontSize="9" fontFamily="monospace">
              COMPLETE EYEWALL RING (360° CLOSED)
            </text>
          </svg>
        </div>

        {/* Bottom Microwave Color Scale */}
        <div className="p-2.5 bg-[#0B1120] border-t border-[#263449] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
          <span>PCT ICE SCATTERING: 280 K (WEAK) → 180 K (INTENSE CONVECTIVE CORE)</span>
          <span className="text-[#A78BFA]">PASS SENSOR: 89V / 89H POLARIZATION</span>
        </div>
      </div>

      {/* Right Analytics */}
      <div className="w-full lg:w-80 bg-[#111827] border border-[#263449] rounded-[4px] p-3 flex flex-col justify-between text-xs font-mono space-y-3 shrink-0">
        <div>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#263449]">
            <span className="font-bold text-[#F8FAFC] tracking-wider uppercase">
              MICROWAVE STRUCTURAL ANALYSIS
            </span>
            <span className="text-[10px] text-[#A78BFA]">✓ DEEP CORE PENETRATION</span>
          </div>

          <div className="space-y-2">
            <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                EYEWALL RING STRUCTURE
              </span>
              <span className="text-xl font-bold text-[#F43F5E]">
                {metrics.eyewallStructure.replace("_", " ")}
              </span>
              <span className="text-[10px] text-[#22C55E] block mt-0.5">
                360° continuous ring without dry slot gaps
              </span>
            </div>

            <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                LOW-LEVEL CIRCULATION CENTER (LLCC)
              </span>
              <span className="text-sm font-bold text-[#22C55E]">
                {metrics.lowLevelCenterDetected ? "✓ CLEARLY DETECTED" : "OBSCURED"}
              </span>
            </div>

            <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                CONVECTIVE CORE VERTICAL HEIGHT
              </span>
              <span className="text-xl font-bold text-[#38BDF8]">
                {metrics.deepConvectiveCoreHeightKm} km
              </span>
              <span className="text-[10px] text-[#94A3B8] block mt-0.5">
                Reaches Upper Troposphere / Tropopause (100 hPa)
              </span>
            </div>

            <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                VORTEX TILT (SHEAR INDUCED)
              </span>
              <span className="text-sm font-bold text-[#22C55E]">
                {metrics.shearInducedTiltKm} km (MINIMAL TILT &lt; 10 km)
              </span>
            </div>
          </div>
        </div>

        <div className="p-2 bg-[#070B14] border border-[#1E293B] rounded-[3px] text-[10px] text-[#64748B]">
          Microwave frequencies penetrate upper-level cirrus to expose internal rainbands and vortex tilt.
        </div>
      </div>
    </div>
  );
};
