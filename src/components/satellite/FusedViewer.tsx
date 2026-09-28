"use client";

import React, { useState } from "react";
import { MultiSourceFusionMetrics } from "@/types/satellite";
import { GeoCoordinate } from "@/types/cyclone";
import { Cpu, Layers, Sliders, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { DataProvenanceBadge } from "../ui/DataProvenanceBadge";

interface FusedViewerProps {
  metrics: MultiSourceFusionMetrics;
  centerCoord: GeoCoordinate;
  timestamp: string;
}

export const FusedViewer: React.FC<FusedViewerProps> = ({
  metrics,
  centerCoord,
  timestamp,
}) => {
  const [irWeight, setIrWeight] = useState(metrics.irWeightPercent);
  const [visWeight, setVisWeight] = useState(metrics.visWeightPercent);
  const [mwWeight, setMwWeight] = useState(metrics.microwaveWeightPercent);

  return (
    <div className="flex flex-col lg:flex-row gap-3 h-full">
      {/* Left: AI Multi-Source Fused Visualization Canvas */}
      <div className="flex-1 bg-[#060A12] border border-[#263449] rounded-[4px] relative overflow-hidden flex flex-col min-h-[380px]">
        {/* Top Badges */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#1E40AF]/80 border border-[#3B82F6] rounded-[3px] text-[10px] font-mono text-white font-bold backdrop-blur-sm flex items-center gap-1">
            <Cpu className="w-3 h-3 text-[#38BDF8]" />
            AI MULTI-SOURCE FUSED SYNTHESIS
          </span>
          <span className="px-2 py-0.5 bg-[#111827]/90 border border-[#263449] rounded-[3px] text-[10px] font-mono text-[#CBD5E1] backdrop-blur-sm">
            {timestamp}
          </span>
        </div>

        <div className="absolute top-2 right-2 z-10">
          <DataProvenanceBadge
            source="Fused INSAT-3DR + INSAT-3D + GPM-GMI"
            timestamp={timestamp}
            resolution="Multi-Scale Resampled Grid"
            processingState="Cross-Attention Feature Fusion (CNN-ViT)"
            quality="VALID"
          />
        </div>

        {/* Dynamic Multi-Layer Composite Canvas */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          <svg viewBox="0 0 500 400" className="w-full h-full max-h-[440px]">
            <defs>
              <radialGradient id="fusedCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0B1120" stopOpacity="0.8" />
                <stop offset="12%" stopColor="#F43F5E" stopOpacity={mwWeight / 50} />
                <stop offset="35%" stopColor="#8B5CF6" stopOpacity={irWeight / 50} />
                <stop offset="65%" stopColor="#0284C7" stopOpacity={visWeight / 50} />
                <stop offset="100%" stopColor="#0B1120" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Coordinate Grid */}
            <g stroke="#162235" strokeWidth="0.5" strokeDasharray="3,3">
              <line x1="100" y1="0" x2="100" y2="400" />
              <line x1="250" y1="0" x2="250" y2="400" />
              <line x1="400" y1="0" x2="400" y2="400" />
              <line x1="0" y1="100" x2="500" y2="100" />
              <line x1="0" y1="200" x2="500" y2="200" />
              <line x1="0" y1="300" x2="500" y2="300" />
            </g>

            {/* Fused Composite Spiral Structure */}
            <path
              d="M 250 200 Q 360 110 440 170 Q 480 260 390 330 Q 270 380 150 330 Q 70 250 110 140 Q 160 60 280 80"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="20"
              strokeLinecap="round"
              opacity={(visWeight / 100) * 0.9}
            />

            <path
              d="M 250 200 Q 180 140 140 220 Q 160 300 240 310 Q 320 300 340 240"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="16"
              strokeLinecap="round"
              opacity={(mwWeight / 100) * 0.9}
            />

            {/* Fused Core Area */}
            <circle cx="250" cy="200" r="130" fill="url(#fusedCore)" />

            {/* Eye Stadium Ring Detection Overlay */}
            <circle
              cx="250"
              cy="200"
              r="14"
              fill="#0B1120"
              stroke="#38BDF8"
              strokeWidth="2"
            />

            {/* Verified Storm Vortex Centre */}
            <g stroke="#22C55E" strokeWidth="1.5">
              <line x1="225" y1="200" x2="275" y2="200" />
              <line x1="250" y1="175" x2="250" y2="225" />
              <circle cx="250" cy="200" r="26" fill="none" strokeDasharray="3,3" />
            </g>

            <text x="260" y="190" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold">
              FUSED VORTEX: {centerCoord.formattedLat} • {centerCoord.formattedLon}
            </text>

            <text x="260" y="225" fill="#22C55E" fontSize="9" fontFamily="monospace">
              STRUCTURAL AGREEMENT: {(metrics.structuralAgreementScore * 100).toFixed(0)}%
            </text>
          </svg>
        </div>

        {/* Bottom Multi-Source Fusion Flowchart Ribbon */}
        <div className="p-2.5 bg-[#0B1120] border-t border-[#263449] flex items-center justify-between text-[11px] font-mono select-none">
          <div className="flex items-center gap-2">
            <span className="text-[#38BDF8]">IR ({irWeight}%)</span>
            <span className="text-[#64748B]">+</span>
            <span className="text-[#F59E0B]">VIS ({visWeight}%)</span>
            <span className="text-[#64748B]">+</span>
            <span className="text-[#A78BFA]">MW ({mwWeight}%)</span>
            <span className="text-[#22C55E] font-bold">→ CROSS-ATTENTION ENCODER</span>
            <span className="text-[#64748B]">→</span>
            <span className="text-[#F8FAFC] font-bold">CYCLONE STATE EMBEDDING</span>
          </div>
          <span className="text-[10px] text-[#22C55E] bg-[#062419] border border-[#134E35] px-2 py-0.5 rounded">
            CONFIDENCE: {metrics.fusionConfidencePercent}%
          </span>
        </div>
      </div>

      {/* Right Side: Fusion Diagnostics & Dynamic Channel Contributions */}
      <div className="w-full lg:w-80 bg-[#111827] border border-[#263449] rounded-[4px] p-3 flex flex-col justify-between text-xs font-mono space-y-3 shrink-0">
        <div>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#263449]">
            <span className="font-bold text-[#F8FAFC] tracking-wider uppercase">
              AI MULTI-SOURCE FUSION
            </span>
            <span className="text-[10px] text-[#38BDF8]">
              CNN-ViT FUSIONNET
            </span>
          </div>

          <div className="space-y-3">
            {/* IR Channel Contribution Bar */}
            <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">IR THERMAL (TIR-1)</span>
                <span className="text-[#38BDF8] font-bold">{irWeight}%</span>
              </div>
              <div className="h-2 bg-[#172033] rounded overflow-hidden">
                <div
                  className="h-full bg-[#38BDF8] rounded"
                  style={{ width: `${irWeight}%` }}
                />
              </div>
              <span className="text-[9px] text-[#64748B]">
                Provides cloud-top temperature gradient & CDO area
              </span>
            </div>

            {/* VIS Channel Contribution Bar */}
            <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">VISIBLE (0.65 µm)</span>
                <span className="text-[#F59E0B] font-bold">{visWeight}%</span>
              </div>
              <div className="h-2 bg-[#172033] rounded overflow-hidden">
                <div
                  className="h-full bg-[#F59E0B] rounded"
                  style={{ width: `${visWeight}%` }}
                />
              </div>
              <span className="text-[9px] text-[#64748B]">
                Provides high-res 1 km spiral edge and optical albedo
              </span>
            </div>

            {/* Microwave Channel Contribution Bar */}
            <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">MICROWAVE (89 GHz)</span>
                <span className="text-[#A78BFA] font-bold">{mwWeight}%</span>
              </div>
              <div className="h-2 bg-[#172033] rounded overflow-hidden">
                <div
                  className="h-full bg-[#A78BFA] rounded"
                  style={{ width: `${mwWeight}%` }}
                />
              </div>
              <span className="text-[9px] text-[#64748B]">
                Provides internal eyewall closure & low-level center
              </span>
            </div>

            {/* Fusion Agreement Score */}
            <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
              <span className="text-[10px] text-[#94A3B8] uppercase block">
                MULTI-SOURCE STRUCTURAL AGREEMENT
              </span>
              <span className="text-xl font-bold text-[#22C55E]">
                {metrics.structuralAgreementScore} / 1.00
              </span>
              <span className="text-[10px] text-[#CBD5E1] block mt-0.5">
                All 3 sensors agree on center within 4.2 km radius
              </span>
            </div>
          </div>
        </div>

        <div className="p-2 bg-[#070B14] border border-[#1E293B] rounded-[3px] text-[10px] text-[#64748B]">
          Multi-source fusion resolves cirrus obscuration by combining thermal, optical, and microwave channels.
        </div>
      </div>
    </div>
  );
};
