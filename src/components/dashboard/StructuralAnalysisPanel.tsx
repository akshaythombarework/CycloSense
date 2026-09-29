"use client";

import React from "react";
import { CycloneStructuralAnalysis } from "@/types/cyclone";
import { Layers } from "lucide-react";
import { ScientificTooltip } from "../ui/ScientificTooltip";

interface StructuralAnalysisPanelProps {
  structure: CycloneStructuralAnalysis;
}

export const StructuralAnalysisPanel: React.FC<StructuralAnalysisPanelProps> = ({
  structure,
}) => {
  const checkItems = [
    {
      label: "CYCLONIC CIRCULATION",
      status: structure.circulation,
      tooltip: "Low-level cyclonic vortex detected and verified via scatterometer & multi-spectral wind vectors.",
    },
    {
      label: "CENTRAL DENSE OVERCAST (CDO)",
      status: structure.cdo,
      tooltip: "Compact dense shield of deep convective clouds covering the low-level circulation center.",
    },
    {
      label: "SPIRAL BAND STRUCTURE",
      status: structure.spiralBands,
      tooltip: "Logarithmic convective spiral bands wrapping more than 1.0 full revolution (360°).",
    },
    {
      label: "EYE FEATURE",
      status: structure.eye,
      tooltip: "Clear circular cloud-free center surrounded by deep eyewall convection.",
    },
    {
      label: "EYEWALL SYMMETRY",
      status: structure.eyeSymmetry,
      tooltip: "Azimuthal ring symmetry of cloud-top temperature gradient surrounding the center.",
    },
    {
      label: "DEEP CONVECTION CORE",
      status: structure.convection,
      tooltip: "Presence of intense convective updrafts with TIR brightness temperatures below -75°C.",
    },
  ];

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] flex flex-col h-full overflow-hidden">
      {/* Header (Clean, without AI DERIVED) */}
      <div className="px-3 py-2 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#0284C7]" />
          <h3 className="text-xs font-mono font-bold text-[#F1F5F9] tracking-wider uppercase">
            STRUCTURAL ANALYSIS
          </h3>
        </div>
      </div>

      {/* Structural Checklist with Clean Colored Dots */}
      <div className="p-3 space-y-2 overflow-y-auto flex-1 text-xs font-mono">
        <div className="space-y-1.5">
          {checkItems.map((item, idx) => {
            const isPositive =
              item.status === "DETECTED" ||
              item.status === "STRONG" ||
              item.status === "ORGANIZED";
            const colorClass = isPositive ? "text-[#15803D]" : "text-[#B45309]";
            const dotBg = isPositive ? "bg-[#15803D]" : "bg-[#B45309]";

            return (
              <div
                key={idx}
                className="p-2 bg-[#0F172A]/60 border border-[#334155] rounded-[4px] flex items-center justify-between"
              >
                <ScientificTooltip term={item.label} definition={item.tooltip}>
                  <span className="text-[11px] font-medium text-[#94A3B8]">
                    {item.label}
                  </span>
                </ScientificTooltip>
                <div className={`flex items-center gap-1.5 font-mono text-[11px] font-semibold ${colorClass}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${dotBg}`} />
                  <span>{item.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quantified Structural Details Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#334155]">
          <div className="p-2 bg-[#0F172A]/60 border border-[#334155] rounded-[4px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block">
              CDO AREA
            </span>
            <span className="text-sm font-mono font-bold text-[#F1F5F9]">
              {structure.cdoAreaKm2.toLocaleString()}
            </span>
            <span className="text-[10px] font-mono text-[#94A3B8] ml-1">km²</span>
          </div>

          <div className="p-2 bg-[#0F172A]/60 border border-[#334155] rounded-[4px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block">
              EYE DIAMETER
            </span>
            <span className="text-sm font-mono font-bold text-[#F1F5F9]">
              {structure.eyeDiameterKm ? `${structure.eyeDiameterKm} km` : "N/A"}
            </span>
          </div>

          <div className="p-2 bg-[#0F172A]/60 border border-[#334155] rounded-[4px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block">
              MIN CLOUD-TOP TEMP
            </span>
            <span className="text-sm font-mono font-bold text-[#0284C7]">
              {structure.cloudTopTempMinC}°C
            </span>
          </div>

          <div className="p-2 bg-[#0F172A]/60 border border-[#334155] rounded-[4px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block">
              SYMMETRY SCORE
            </span>
            <span className="text-sm font-mono font-bold text-[#15803D]">
              0.88 / 1.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
