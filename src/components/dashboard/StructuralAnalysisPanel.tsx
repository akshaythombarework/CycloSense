"use client";

import React from "react";
import { CycloneStructuralAnalysis } from "@/types/cyclone";
import { Layers, CheckCircle2, AlertTriangle, Eye, Activity, ShieldCheck } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";
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
    <div className="bg-[#111827] border border-[#263449] rounded-[4px] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 bg-[#0B1120] border-b border-[#263449] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
          <h3 className="text-xs font-mono font-bold text-[#F8FAFC] tracking-wider uppercase">
            STRUCTURAL ANALYSIS
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#22C55E] flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          AI DERIVED
        </span>
      </div>

      {/* Structural Checklist */}
      <div className="p-3 space-y-2 overflow-y-auto flex-1 text-xs font-mono">
        <div className="space-y-1.5">
          {checkItems.map((item, idx) => (
            <div
              key={idx}
              className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px] flex items-center justify-between"
            >
              <ScientificTooltip term={item.label} definition={item.tooltip}>
                <span className="text-[11px] font-medium text-[#CBD5E1]">
                  {item.label}
                </span>
              </ScientificTooltip>
              <StatusBadge status={item.status} label={item.status} size="sm" />
            </div>
          ))}
        </div>

        {/* Quantified Structural Details Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#263449]">
          <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block">
              CDO AREA
            </span>
            <span className="text-sm font-bold text-[#F8FAFC]">
              {structure.cdoAreaKm2.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#64748B] ml-1">km²</span>
          </div>

          <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block">
              EYE DIAMETER
            </span>
            <span className="text-sm font-bold text-[#F8FAFC]">
              {structure.eyeDiameterKm ? `${structure.eyeDiameterKm} km` : "N/A"}
            </span>
          </div>

          <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block">
              MIN CLOUD-TOP TEMP
            </span>
            <span className="text-sm font-bold text-[#38BDF8]">
              {structure.cloudTopTempMinC}°C
            </span>
          </div>

          <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block">
              SYMMETRY SCORE
            </span>
            <span className="text-sm font-bold text-[#22C55E]">
              0.88 / 1.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
